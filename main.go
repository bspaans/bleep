package main

import (
	"fmt"
	"log"
	"time"

	"github.com/gomidi/rtmididrv/imported/rtmidi"

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
	time.Sleep(375 * time.Millisecond)
	s.NoteOn(0, 52)
	time.Sleep(125 * time.Millisecond)
	s.NoteOn(0, 57)
	time.Sleep(250 * time.Millisecond)
	s.NoteOn(0, 59)
	time.Sleep(250 * time.Millisecond)
	s.NoteOn(0, 62)
	time.Sleep(125 * time.Millisecond)
	s.NoteOn(0, 38)
	time.Sleep(375 * time.Millisecond)
	s.NoteOff(0, 38)
	s.Close()

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
			if msg[0] == 0x90 {
				fmt.Println("NOTE ON", msg[1])
				s.NoteOn(0, int(msg[1]))
			} else if msg[0] == 0x80 {
				fmt.Println("NOTE OFF", msg[1])
				s.NoteOff(0, int(msg[1]))
			}
			log.Println(msg, timeDelta, err)
		}
	}
}
