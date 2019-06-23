package synth

import (
	"fmt"
	"math"
	"time"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/channels"
	"github.com/bspaans/bleep/instruments"
	"github.com/bspaans/bleep/sinks"
	"github.com/bspaans/bleep/ui"
)

type Synth struct {
	Config   *audio.AudioConfig
	Mixer    *Mixer
	Sinks    []sinks.Sink
	Inputs   chan *Event
	Outputs  chan *ui.UIEvent
	Debug    bool
	Recorder *sinks.WavSink
}

func NewSynth(cfg *audio.AudioConfig) *Synth {
	s := &Synth{
		Config:  cfg,
		Mixer:   NewMixer(),
		Sinks:   []sinks.Sink{},
		Inputs:  make(chan *Event, cfg.MidiEventInputBufferSize),
		Outputs: make(chan *ui.UIEvent, 128),
		Debug:   cfg.Debug,
	}
	return s
}

func (s *Synth) EnablePortAudioSink() error {
	sink, err := sinks.NewPortAudioSink(s.Config)
	if err != nil {
		return err
	}
	s.Sinks = append(s.Sinks, sink)
	return nil
}

func (s *Synth) EnableWavSink(file string) error {
	sink, err := sinks.NewWavSink(s.Config, file)
	if err != nil {
		return err
	}
	s.Sinks = append(s.Sinks, sink)
	s.Recorder = sink
	return nil
}

func (s *Synth) Start() {
	stepsPerSecond := float64(s.Config.HandleEventsPerSecond)
	stepDuration := time.Duration(1000000000 / stepsPerSecond)

	for _, sink := range s.Sinks {
		if s.Recorder != nil {
			portAudio, ok := sink.(*sinks.PortAudioSink)
			if ok {
				portAudio.WavSink = s.Recorder
			}
		}
		sink.Start(s.Mixer.GetSamples)
	}

	for {
		start := time.Now()
		//s.writeSamples(s.Config.StepSize)
		canRead := true
		for canRead {
			select {
			case ev := <-s.Inputs:
				s.dispatchEvent(ev)
			default:
				canRead = false
			}
		}
		elapsed := time.Now().Sub(start)
		if elapsed > stepDuration {
			fmt.Println("Warning: synthesizer underrun")
		} else {
			sleep := stepDuration - elapsed
			time.Sleep(sleep)
		}
	}
}

func (s *Synth) dispatchEvent(ev *Event) {
	et := ev.Type
	ch := ev.Channel
	values := ev.Values
	if et == NoteOn {
		velocity := float64(int(values[1])) / 127
		s.Mixer.NoteOn(ch, values[0], velocity)
	} else if et == NoteOff {
		s.Mixer.NoteOff(ch, values[0])
	} else if et == SetReverb {
		s.Mixer.SetReverb(ch, values[0])
	} else if et == SetReverbTime {
		s.Mixer.SetReverbTime(ch, ev.FloatValues[0])
	} else if et == SetReverbFeedback {
		s.Mixer.SetReverbFeedback(ch, ev.FloatValues[0])
	} else if et == SetLPFCutoff {
		s.Mixer.SetLPFCutoff(ch, values[0])
	} else if et == SetHPFCutoff {
		s.Mixer.SetHPFCutoff(ch, values[0])
	} else if et == SetTremelo {
		s.Mixer.SetTremelo(ch, values[0])
	} else if et == ProgramChange {
		s.Mixer.ChangeInstrument(s.Config, ch, values[0])
	} else if et == SetInstrument {
		s.Mixer.SetInstrument(s.Config, ch, ev.Instrument)
	} else if et == SilenceChannel {
		s.Mixer.SilenceChannel(ch)
	} else if et == SetChannelVolume {
		s.Mixer.SetChannelVolume(ch, values[0])
	} else if et == SetChannelPanning {
		s.Mixer.SetChannelPanning(ch, values[0])
	} else if et == SetChannelExpressionVolume {
		s.Mixer.SetChannelExpressionVolume(ch, values[0])
	} else if et == SetGrain {
		s.Mixer.SetGrainOption(ch, channels.GrainFile, ev.Value)
	} else if et == SetGrainGain {
		s.Mixer.SetGrainOption(ch, channels.GrainGain, ev.FloatValues[0])
	} else if et == SetGrainSize {
		s.Mixer.SetGrainOption(ch, channels.GrainSize, ev.FloatValues[0])
	} else if et == SetGrainBirthRate {
		s.Mixer.SetGrainOption(ch, channels.GrainBirthRate, ev.FloatValues[0])
	} else if et == SetGrainDensity {
		s.Mixer.SetGrainOption(ch, channels.GrainDensity, values[0])
	} else if et == SetGrainSpread {
		s.Mixer.SetGrainOption(ch, channels.GrainSpread, ev.FloatValues[0])
	} else if et == SetGrainSpeed {
		s.Mixer.SetGrainOption(ch, channels.GrainSpeed, ev.FloatValues[0])
	} else if et == SilenceAllChannels {
		s.Mixer.SilenceAllChannels()
	} else if et == ToggleSoloChannel {
		s.Mixer.ToggleSoloChannel(ch)
	} else if et == SetMasterGain {
		s.Mixer.SetMasterGain(ev.FloatValues[0])
	} else if et == PitchBend {
		semitones := float64(values[0]-64) / 64.0 // -1.0 <-> 1.0
		semitones *= (64 / 5)
		pitchbendFactor := math.Pow(2, semitones/12)
		s.Mixer.SetPitchbend(ch, pitchbendFactor)
	} else if et == ForceUIReload {
		s.Outputs <- ui.NewUIEvent(ui.ForceReloadEvent)
	} else {
	}

	if s.Debug {
		if len(values) == 0 {
			fmt.Println(et, "on channel", ch)
		} else {
			fmt.Println(et, "on channel", ch, values)
		}
	}

}
func (s *Synth) SetMasterGain(v float64) {
	s.Inputs <- NewFloatEvent(SetMasterGain, 0, []float64{v})
}

func (s *Synth) ChangeInstrument(channel, instrument int) {
	s.Mixer.ChangeInstrument(s.Config, channel, instrument)
}

func (s *Synth) Close() {
	for _, sink := range s.Sinks {
		sink.Close(s.Config)
	}
}

func (s *Synth) LoadInstrumentBank(file string) error {
	bankDef, err := instruments.NewBankFromYamlFile(file)
	if err != nil {
		return err
	}
	if err := bankDef.Validate(s.Config); err != nil {
		return err
	}
	bankDef.Activate(0)
	return nil
}

func (s *Synth) LoadPercussionBank(file string) error {
	bankDef, err := instruments.NewBankFromYamlFile(file)
	if err != nil {
		return err
	}
	if err := bankDef.Validate(s.Config); err != nil {
		return err
	}
	bankDef.Activate(1)
	s.Mixer.Channels[9].(*channels.PercussionChannel).LoadInstrumentsFromBank(s.Config)
	return nil
}
