package synth

import (
	"fmt"
	"log"
	"math"
	"time"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/channels"
	"github.com/bspaans/bs8bs/instruments"
	"github.com/bspaans/bs8bs/sinks"
	"github.com/bspaans/bs8bs/ui"
)

type Synth struct {
	Config  *audio.AudioConfig
	Mixer   *Mixer
	Sinks   []sinks.Sink
	Inputs  chan *Event
	Outputs chan *ui.UIEvent
	Debug   bool
}

func NewSynth(cfg *audio.AudioConfig) *Synth {
	return &Synth{
		Config:  cfg,
		Mixer:   NewMixer(),
		Sinks:   []sinks.Sink{},
		Inputs:  make(chan *Event, cfg.MidiEventInputBufferSize),
		Outputs: make(chan *ui.UIEvent, 128),
		Debug:   cfg.Debug,
	}
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
	return nil
}

func (s *Synth) Start() {
	stepsPerSecond := float64(s.Config.SampleRate) / float64(s.Config.StepSize)
	stepDuration := time.Duration(1000.0/stepsPerSecond) * time.Millisecond

	nextStep := time.Now().Add(stepDuration)
	for {
		s.writeSamples(s.Config.StepSize)
		canRead := true
		for canRead {
			select {
			case ev := <-s.Inputs:
				s.dispatchEvent(ev)
			default:
				canRead = false
			}
		}
		now := time.Now()
		sub := nextStep.Sub(now)
		time.Sleep(sub + (-1 * time.Millisecond))
		nextStep = nextStep.Add(stepDuration)
	}
}

func (s *Synth) dispatchEvent(ev *Event) {
	et := ev.Type
	ch := ev.Channel
	values := ev.Values
	if et == NoteOn {
		velocity := float64(int(values[1])) / 127
		s.NoteOn(ch, values[0], velocity)
	} else if et == NoteOff {
		s.NoteOff(ch, values[0])
	} else if et == SetReverb {
		s.SetReverb(ch, values[0])
	} else if et == SetReverbTime {
		s.SetReverbTime(ch, ev.FloatValues[0])
	} else if et == SetTremelo {
		s.SetTremelo(ch, values[0])
	} else if et == ProgramChange {
		s.ChangeInstrument(ch, values[0])
	} else if et == SilenceChannel {
		s.SilenceChannel(ch)
	} else if et == SetChannelVolume {
		s.SetChannelVolume(ch, values[0])
	} else if et == SetChannelPanning {
		s.SetChannelPanning(ch, values[0])
	} else if et == SetChannelExpressionVolume {
		s.SetChannelExpressionVolume(ch, values[0])
	} else if et == PitchBend {
		semitones := float64(values[0]-64) / 64.0 // -1.0 <-> 1.0
		semitones *= (64 / 5)
		pitchbendFactor := math.Pow(2, semitones/12)
		s.SetPitchbend(ch, pitchbendFactor)
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

func (s *Synth) writeSamples(n int) {
	samples := s.Mixer.GetSamples(s.Config, n, s.Outputs)
	for _, sink := range s.Sinks {
		if err := sink.Write(s.Config, samples); err != nil {
			log.Println(err.Error())
		}
	}
}

func (s *Synth) NoteOn(channel, note int, velocity float64) {
	s.Mixer.NoteOn(channel, note, velocity)
}

func (s *Synth) NoteOff(channel, note int) {
	s.Mixer.NoteOff(channel, note)
}

func (s *Synth) ChangeInstrument(channel, instrument int) {
	s.Mixer.ChangeInstrument(s.Config, channel, instrument)
}

func (s *Synth) Close() {
	for _, sink := range s.Sinks {
		sink.Close(s.Config)
	}
}

func (s *Synth) SilenceChannel(ch int) {
	s.Mixer.SilenceChannel(ch)
}

func (s *Synth) SilenceAllChannels() {
	s.Mixer.SilenceAllChannels()
}

func (s *Synth) SetPitchbend(channel int, pitchbendFactor float64) {
	s.Mixer.SetPitchbend(channel, pitchbendFactor)
}

func (s *Synth) SetReverb(channel int, reverb int) {
	s.Mixer.SetReverb(channel, reverb)
}
func (s *Synth) SetReverbTime(channel int, time float64) {
	s.Mixer.SetReverbTime(channel, time)
}
func (s *Synth) SetTremelo(channel int, tremelo int) {
	s.Mixer.SetTremelo(channel, tremelo)
}

func (s *Synth) SetChannelVolume(channel int, volume int) {
	s.Mixer.SetChannelVolume(channel, volume)
}
func (s *Synth) SetChannelPanning(channel int, panning int) {
	s.Mixer.SetChannelPanning(channel, panning)
}

func (s *Synth) SetChannelExpressionVolume(channel int, volume int) {
	s.Mixer.SetChannelExpressionVolume(channel, volume)
}

func (s *Synth) LoadInstrumentBank(file string) error {
	bankDef, err := instruments.NewBankFromYamlFile(file)
	if err != nil {
		return err
	}
	if err := bankDef.Validate(); err != nil {
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
	if err := bankDef.Validate(); err != nil {
		return err
	}
	bankDef.Activate(1)
	s.Mixer.Channels[9].(*channels.PercussionChannel).LoadInstrumentsFromBank(s.Config)
	return nil
}
