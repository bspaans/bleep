package main

import (
	"time"

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

	go s.Start()
	PlaySong(s)
}

func PlaySong(s *synth.Synth) {
	s.NoteOn(0, 50)
	time.Sleep(500 * time.Millisecond)
	s.NoteOn(0, 54)
	time.Sleep(500 * time.Millisecond)
	s.NoteOn(0, 57)
	time.Sleep(500 * time.Millisecond)
	s.NoteOn(0, 62)
	time.Sleep(1000 * time.Millisecond)
	s.Close()
}
