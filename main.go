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
	"github.com/bspaans/bs8bs/midi/notes"
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
					ch -= 1
					velocity := float64(int(msg[2])) / 127
					fmt.Println("NOTE ON", msg[1], velocity, ch)
					s.NoteOn(ch, int(msg[1]), velocity)
				}
			} else if midievent.IsNoteOff(ev) {
				ch, ok := midievent.ChanOf(ev)
				if ok {
					ch -= 1
					fmt.Println("NOTE OFF", msg[1], ch)
					s.NoteOff(ch, int(msg[1]))
				}
			} else if ev >= midievent.Chan1ProgramChangeEvent && ev <= midievent.Chan16ProgramChangeEvent {
				ch, ok := midievent.ChanOf(ev)
				if ok {
					ch -= 1
					fmt.Println("CHANGE INSTRUMENTS ", msg[1], ch)
					s.ChangeInstrument(ch, int(msg[1]))
				}

			} else {
				log.Println(msg, timeDelta, err)
			}
		}
	}
}
