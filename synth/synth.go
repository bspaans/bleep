package synth

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/midi"
	"github.com/bspaans/bs8bs/sinks"
)

type Synth struct {
	Config *audio.AudioConfig
	Mixer  *midi.Mixer
	Sinks  []sinks.Sink
}

func NewSynth(cfg *audio.AudioConfig) *Synth {
	return &Synth{
		Config: cfg,
		Mixer:  midi.NewMixer(),
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

func (s *Synth) EnableWavSink(file string) {
	sink := sinks.NewWavSink(file)
	s.Sinks = append(s.Sinks, sink)
}

func (s *Synth) Start() {
	for {
		samples := s.Mixer.GetSamples(s.Config, s.Config.StepSize)
		for _, sink := range s.Sinks {
			sink.Write(s.Config, samples)
		}
	}
}

func (s *Synth) NoteOn(channel, note int) {
	s.Mixer.NoteOn(channel, note)
}

func (s *Synth) NoteOff(channel, note int) {
	s.Mixer.NoteOff(channel, note)
}
