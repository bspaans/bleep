package main

import (
	"fmt"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/filters"
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/generators/derived"
	"github.com/bspaans/bleep/sinks"
)

// A Filter takes an array of samples, applies some kind of
// function to it, and then returns a new array of samples.
// Usually you will want to combine a generator, i.e. a
// thing that creates samples, with a filter. You can do this
// by taking the samples from the generator and passing them to
// the filter, which is what the `derived.NewFilteredGenerator` does.
func main() {
	cfg := audio.NewAudioConfig()
	filter := filters.NewFlangerFilter(0.5, 0.9, 0.7)
	g := derived.NewFilteredGenerator(generators.NewSineWaveOscillator(), filter)
	g.SetPitch(440.0)
	samples := g.GetSamples(cfg, 44000)

	if err := sinks.WriteFloatSamplesToWavFile(cfg, samples, "test.wav"); err != nil {
		fmt.Println("Failed to write wav file:", err.Error())
	}
}
