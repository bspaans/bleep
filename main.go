package main

import (
	"flag"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/midi"
	"github.com/bspaans/bs8bs/synth"
	"github.com/nsf/termbox-go"
)

var record = flag.Bool("record", false, "Record .wav output")
var percussion = flag.String("percussion", "instruments/percussion_bank.yaml", "The instruments bank to load for the percussion channel.")

func main() {

	flag.Parse()

	cfg := audio.NewAudioConfig()
	s := synth.NewSynth(cfg)
	if *record {
		if err := s.EnableWavSink("test.wav"); err != nil {
			panic(err)
		}
	}
	if err := s.EnablePortAudioSink(); err != nil {
		panic(err)
	}
	if err := s.LoadInstrumentBank("instruments/bank.yaml"); err != nil {
		panic(err)
	}
	if err := s.LoadPercussionBank(*percussion); err != nil {
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

	go midi.StartVirtualMIDIDevice(s.Inputs)
	go WaitForUserInput(s)
	s.Start()
}

func WaitForUserInput(s *synth.Synth) {

	err := termbox.Init()
	if err != nil {
		panic(err)
	}
	termbox.SetInputMode(termbox.InputCurrent)
	fmt.Println("Started bs8bs; press [Ctrl-R] to reload instrument banks; press [Ctrl-C] to quit")
	defer termbox.Close()
	for {
		switch ev := termbox.PollEvent(); ev.Type {
		case termbox.EventKey:
			if ev.Key == termbox.KeyCtrlC {
				fmt.Println("Goodbye!")
				termbox.Close()
				s.Close()
				os.Exit(0)
			} else if ev.Key == termbox.KeyCtrlR {
				fmt.Println("Reloading MIDI banks")
				if err := s.LoadInstrumentBank("instruments/bank.yaml"); err != nil {
					fmt.Println("Error:", err.Error())
				}
				if err := s.LoadPercussionBank(*percussion); err != nil {
					fmt.Println("Error:", err.Error())
				}
			}
		case termbox.EventError:
			panic(ev.Err)
		}
	}
}
