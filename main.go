package main

import (
	"flag"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/controller"
	"github.com/bspaans/bleep/plot"
	"github.com/bspaans/bleep/termbox"
)

var virtualMidi = flag.Bool("midi", false, "Register as virtual MIDI input device (linux and mac only)")
var sequencer = flag.String("sequencer", "", "Load sequencer from file")
var debugPlots = flag.Bool("plot", false, "Plot outputs (debugging tool)")
var enable8bit = flag.Bool("8bit", false, "Set bit depth to 8bit")
var enableMono = flag.Bool("mono", false, "Mono output")
var record = flag.String("record", "", "Record .wav output")
var instruments = flag.String("instruments", "examples/bank.yaml", "The instruments bank to load")
var percussion = flag.String("percussion", "examples/percussion_bank.yaml", "The instruments bank to load for the percussion channel.")
var enableUI = flag.Bool("ui", false, "Enable terminal UI (experimental)")

func QuitWithError(err error) {
	fmt.Println("Oh no:", err.Error())
	os.Exit(1)
}

func main() {

	flag.Parse()

	cfg := audio.NewAudioConfig()

	if *enable8bit {
		cfg.BitDepth = 8
	}
	if *enableMono {
		cfg.Stereo = false
	}
	ctrl := controller.NewController(cfg)

	if *debugPlots {
		plot.DoPlots(cfg)
		os.Exit(0)
	}
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
		fmt.Println("Quitting")
		ctrl.Quit()
		os.Exit(0)
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
	go ctrl.StartSynth()
	<-c
}
