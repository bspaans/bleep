package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gomidi/rtmididrv/imported/rtmidi"
	"github.com/xlab/midievent"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/midi"
	"github.com/bspaans/bs8bs/synth"
)

func main() {

	cfg := audio.NewAudioConfig()
	s := synth.NewSynth(cfg)
	//if err := s.EnableWavSink("test.wav"); err != nil {
	//panic(err)
	//}
	if err := s.EnablePortAudioSink(); err != nil {
		panic(err)
	}

	go s.Start()
	defer s.Close()

	c := make(chan os.Signal)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-c
		s.Close()
		os.Exit(1)
	}()

	PlaySong(s)
}

func PlaySong(s *synth.Synth) {
	for i := 0; i < 100; i++ {
		s.NoteOn(0, i)
		time.Sleep(10 * time.Millisecond)
		s.NoteOff(0, i)
	}
	s.NoteOn(0, midi.C4)
	time.Sleep(500 * time.Millisecond)
	s.NoteOn(0, midi.E4)
	time.Sleep(375 * time.Millisecond)
	s.NoteOn(0, midi.D4)
	time.Sleep(125 * time.Millisecond)
	s.NoteOn(0, midi.G4)
	time.Sleep(250 * time.Millisecond)
	s.NoteOn(0, midi.A4)
	time.Sleep(250 * time.Millisecond)
	s.NoteOn(0, midi.C5)
	time.Sleep(125 * time.Millisecond)
	s.NoteOn(0, midi.C3)
	time.Sleep(375 * time.Millisecond)
	s.NoteOff(0, midi.C3)

	in, err := rtmidi.NewMIDIInDefault()
	if err != nil {
		panic(err)
	}
	defer in.Destroy()
	if err := in.OpenVirtualPort("bs8bs"); err != nil {
		panic(err)
	}
	defer in.Close()
	fmt.Println("Waiting for MIDI messages.")
	for {
		msg, timeDelta, err := in.Message()
		if len(msg) > 0 {
			ev := midievent.Event(msg[0])
			if midievent.IsNoteOn(ev) {
				ch, ok := midievent.ChanOf(ev)
				if ok {
					fmt.Println("NOTE ON", msg[1], ch)
					s.NoteOn(ch, int(msg[1]))
				}
			} else if midievent.IsNoteOff(ev) {
				ch, ok := midievent.ChanOf(ev)
				if ok {
					fmt.Println("NOTE OFF", msg[1], ch)
					s.NoteOff(ch, int(msg[1]))
				}
			}
			log.Println(msg, timeDelta, err)
		}
	}
}
