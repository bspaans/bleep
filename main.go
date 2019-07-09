package main

import (
	"flag"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/controller"
	"github.com/bspaans/bleep/termbox"
	"github.com/bspaans/bleep/ui/server"
)

var virtualMidi = flag.Bool("midi", false, "Register as virtual MIDI input device (linux and mac only)")
var sequencer = flag.String("sequencer", "", "Load sequencer from file")
var enable8bit = flag.Bool("8bit", false, "Set bit depth to 8bit")
var enableMono = flag.Bool("mono", false, "Mono output")
var enableSequencer = flag.Bool("enable-sequencer", false, "Enable sequencer")
var record = flag.String("record", "", "Record .wav output")
var instruments = flag.String("instruments", "", "The instruments bank to load")
var percussion = flag.String("percussion", "", "The instruments bank to load for the percussion channel.")
var enableUI = flag.Bool("ui", false, "Enable terminal UI (experimental)")
var enableWS = flag.Bool("ws", false, "Enable web socket endpoint (experimental)")

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

	if *record != "" {
		if err := ctrl.EnableWavSink(*record); err != nil {
			QuitWithError(err)
		}
	}
	if err := ctrl.EnableSDLSink(); err != nil {
		QuitWithError(err)
	}
	if *instruments != "" {
		if err := ctrl.LoadInstrumentBank(*instruments); err != nil {
			QuitWithError(err)
		}
	}
	if *percussion != "" {
		if err := ctrl.LoadPercussionBank(*percussion); err != nil {
			QuitWithError(err)
		}
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

	if *enableSequencer {
		ctrl.LoadEmptySequencer()
	}
	if *sequencer != "" {
		err := ctrl.LoadSequencerFromFile(*sequencer)
		if err != nil {
			QuitWithError(err)
		}
	}
	if *virtualMidi {
		ctrl.StartVirtualMIDIDevice()
	}
	if *enableUI {
		ctrl.UI = termbox.NewTermBox().Start(ctrl)
	}
	if *enableWS {
		ctrl.UI = server.NewServer().Start(ctrl)
	}
	ctrl.StartSynth()
}
