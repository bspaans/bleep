package main

import (
	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/channels"
	"github.com/bspaans/bleep/controller"
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/synth"
	"github.com/bspaans/bleep/theory"
)

func main() {
	cfg := audio.NewAudioConfig()

	// Bleep uses generators as the fundamental building block;
	// generators have a configurable pitch, velocity, etc. and *generate*
	// a number of samples.
	// We want to play a sine wave so let's use a SineWaveOscillator
	instr := generators.NewSineWaveOscillator

	// By attaching it to a channel we can play multiple notes at once
	// Each note will have its own dedicated generator function.
	channel := channels.NewPolyphonicChannel()
	channel.SetInstrument(instr)

	// We can combine multiple channels into a Mixer, which allows us to set
	// volumes, etc. In this case it's a bit overkill, because we have
	// only one channel.
	mixer := synth.NewMixer()
	mixer.Channels[0] = channel

	// The Synth takes a mixer, handles input and output events, and is the
	// component that actually asks for samples to send to the output sinks.
	synth := synth.NewSynth(cfg)
	synth.Mixer = mixer
	synth.EnableSDLSink()

	// The Controller is a high level object that can be used to setup
	// and control the Synthesizer, Sequencer and the instrument banks.
	// In this case we'll just attach the Synth that we made previously.
	ctrl := controller.NewController(cfg)
	ctrl.Synth = synth

	// Now that we have everything setup, play a C5 note:
	mixer.NoteOn(0, theory.C5, 1.0)

	// And start the synthesizer in the background
	ctrl.StartSynth()
}
