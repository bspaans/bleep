package main

import (
	"flag"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/controller"
	"github.com/bspaans/bs8bs/termbox"
)

var virtualMidi = flag.Bool("midi", false, "Register as virtual MIDI input device (linux and mac only)")
var sequencer = flag.String("sequencer", "", "Load sequencer from file")
var record = flag.String("record", "", "Record .wav output")
var instruments = flag.String("instruments", "examples/bank.yaml", "The instruments bank to load")
var percussion = flag.String("percussion", "examples/percussion_bank.yaml", "The instruments bank to load for the percussion channel.")
var enableUI = flag.Bool("ui", false, "Enable terminal UI")

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
	if err := ctrl.LoadInstrumentBank(*instruments); err != nil {
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
	if *sequencer != "" {
		err := ctrl.LoadSequencerFromFile(*sequencer)
		if err != nil {
			QuitWithError(err)
		}
	}
	if *enableUI {
		ctrl.UI = termbox.NewTermBox().Start(ctrl)
	}
	ctrl.StartSynth()
}
