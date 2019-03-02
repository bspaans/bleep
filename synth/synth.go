package synth

import (
	"log"
	"time"

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

func (s *Synth) EnableWavSink(file string) error {
	sink, err := sinks.NewWavSink(s.Config, file)
	if err != nil {
		return err
	}
	s.Sinks = append(s.Sinks, sink)
	return nil
}

func (s *Synth) Start() {
	for {
		s.WriteSamples()
		time.Sleep(10 * time.Millisecond)
	}
}

func (s *Synth) WriteSamples() {
	samples := s.Mixer.GetSamples(s.Config, s.Config.StepSize)
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
