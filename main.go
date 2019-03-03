package main

import (
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/midi"
	"github.com/bspaans/bs8bs/midi/notes"
	"github.com/bspaans/bs8bs/synth"
)

func main() {

	cfg := audio.NewAudioConfig()
	s := synth.NewSynth(cfg)
	if err := s.EnableWavSink("test.wav"); err != nil {
		panic(err)
	}
	if err := s.EnablePortAudioSink(); err != nil {
		panic(err)
	}
	if err := s.LoadInstrumentBank("instruments/bank.yaml"); err != nil {
		panic(err)
	}

	defer s.Close()

	c := make(chan os.Signal)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-c
		s.Close()
		os.Exit(1)
	}()

	//go PlaySong(s)
	go midi.StartVirtualMIDIDevice(s)
	s.Start()
}

func PlaySong(s *synth.Synth) {
	time.Sleep(time.Second)
	s.NoteOn(0, notes.C4, 0.7)
	time.Sleep(500 * time.Millisecond)
	s.NoteOn(0, notes.E4, 0.6)
	time.Sleep(375 * time.Millisecond)
	s.NoteOn(0, notes.D4, 0.6)
	time.Sleep(125 * time.Millisecond)
	s.NoteOn(0, notes.G4, 0.7)
	time.Sleep(250 * time.Millisecond)
	s.NoteOn(0, notes.A4, 0.7)
	time.Sleep(250 * time.Millisecond)
	s.NoteOn(0, notes.C5, 0.7)
	time.Sleep(125 * time.Millisecond)
	s.NoteOn(0, notes.C3, 0.7)
	time.Sleep(375 * time.Millisecond)
	s.SilenceAllChannels()
}
