package main

import (
	"fmt"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/sinks"
)

// Generators are the basic building blocks of sound in bleep,
// generating floating point samples which can be saved as wav
// files or played using an audio library like SDL.
func main() {
	cfg := audio.NewAudioConfig()
	g := generators.NewSineWaveOscillator()
	g.SetPitch(440.0)
	samples := g.GetSamples(cfg, 44000)

	if err := sinks.WriteFloatSamplesToWavFile(cfg, samples, "test.wav"); err != nil {
		fmt.Println("Failed to write wav file:", err.Error())
	}
}
