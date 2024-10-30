package main

import (
	"fmt"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/channels"
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/sinks"
)

// A channel allows you to turn a Generator into a polyphonic thing;
// in other words: it allows you to play multiple notes at the same
// time and mix them together.
//
// Channels also have their own effects chain, as MIDI channels often
// do, which gives quick access to things like delay, distortion, etc.
func main() {
	cfg := audio.NewAudioConfig()
	g := generators.NewSineWaveOscillator

	channel := channels.NewPolyphonicChannel()
	channel.SetInstrument(g)
	channel.NoteOn(60, 1.0)
	channel.NoteOn(64, 1.0)
	channel.NoteOn(67, 1.0)

	samples := channel.GetSamples(cfg, 44000) // TODO this doesn't sound right? Scaling already happened?

	if err := sinks.WriteFloatSamplesToWavFile(cfg, samples, "test.wav"); err != nil {
		fmt.Println("Failed to write wav file:", err.Error())
	}
}
