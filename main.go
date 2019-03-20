package main

import (
	"flag"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/controller"
	"github.com/nsf/termbox-go"
)

var virtualMidi = flag.Bool("midi", false, "Register as virtual MIDI input device (linux and mac only)")
var enableSequencer = flag.Bool("sequencer", false, "Enable sequencer (work in progress - demo mode)")
var record = flag.String("record", "", "Record .wav output")
var percussion = flag.String("percussion", "instruments/percussion_bank.yaml", "The instruments bank to load for the percussion channel.")

func QuitWithError(err error) {
	fmt.Println("Oh no:", err.Error())
	os.Exit(1)
}

func main() {

	flag.Parse()

	cfg := audio.NewAudioConfig()
	ctrl := controller.NewController(cfg)

	if *record != "" {
		if err := ctrl.EnableWavSink(*record); err != nil {
			QuitWithError(err)
		}
	}
	if err := ctrl.EnablePortAudioSink(); err != nil {
		QuitWithError(err)
	}
	if err := ctrl.LoadInstrumentBank("instruments/bank.yaml"); err != nil {
		QuitWithError(err)
	}
	if err := ctrl.LoadPercussionBank(*percussion); err != nil {
		QuitWithError(err)
	}
	defer ctrl.Quit()

	c := make(chan os.Signal)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-c
		ctrl.Quit()
		os.Exit(1)
	}()

	if *virtualMidi {
		ctrl.StartVirtualMIDIDevice()
	}
	if *enableSequencer {
		err := ctrl.LoadSequencerFromFile("sequencer/sequencer.yaml")
		if err != nil {
			QuitWithError(err)
		}
	}
	go WaitForUserInput(ctrl)
	ctrl.StartSynth()
}

func WaitForUserInput(ctrl *controller.Controller) {

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
				ctrl.Quit()
				os.Exit(0)
			} else if ev.Key == termbox.KeyCtrlR {
				if err := ctrl.ReloadInstrumentBank(); err != nil {
					fmt.Println("Error:", err.Error())
				}
				if err := ctrl.ReloadPercussionBank(); err != nil {
					fmt.Println("Error:", err.Error())
				}
				ctrl.ReloadSequencer()
			}
		case termbox.EventError:
			panic(ev.Err)
		}
	}
}
