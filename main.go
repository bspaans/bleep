package main

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/synth"
)

func main() {
	cfg := audio.NewAudioConfig()
	s := synth.NewSynth(cfg)
	s.EnableWavSink("test.wav")
	if err := s.EnablePortAudioSink(); err != nil {
		panic(err)
	}

	s.NoteOn(0, 50)
	s.NoteOn(1, 54)
	s.NoteOn(2, 57)
	s.Start()
}
