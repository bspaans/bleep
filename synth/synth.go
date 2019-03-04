package synth

import (
	"log"
	"time"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/channels"
	"github.com/bspaans/bs8bs/instruments"
	"github.com/bspaans/bs8bs/sinks"
)

type Synth struct {
	Config *audio.AudioConfig
	Mixer  *Mixer
	Sinks  []sinks.Sink
}

func NewSynth(cfg *audio.AudioConfig) *Synth {
	return &Synth{
		Config: cfg,
		Mixer:  NewMixer(),
		Sinks:  []sinks.Sink{},
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
		s.WriteSamples(s.Config.StepSize)
		now := time.Now()
		sub := nextStep.Sub(now)
		time.Sleep(sub + (-1 * time.Millisecond))
		nextStep = nextStep.Add(stepDuration)
	}
}

func (s *Synth) WriteSamples(n int) {
	samples := s.Mixer.GetSamples(s.Config, n)
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
	s.Mixer.ChangeInstrument(channel, instrument)
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
	s.Mixer.Channels[9].(*channels.PercussionChannel).LoadInstrumentsFromBank()
	return nil
}
