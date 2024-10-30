package main

import (
	"fmt"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/sinks"
	"github.com/bspaans/bleep/synth"
)

// A mixer allows you to control and mix multiple channels together
func main() {
	cfg := audio.NewAudioConfig()

	mixer := synth.NewMixer()
	mixer.SetInstrument(cfg, 0, generators.ToInstrument(generators.NewSineWaveOscillator))
	mixer.SetInstrument(cfg, 1, generators.ToInstrument(generators.NewSquareWaveOscillator))

	mixer.NoteOn(0, 60, 1.0)
	mixer.NoteOn(0, 64, 1.0)
	mixer.NoteOn(0, 67, 1.0)
	mixer.NoteOn(1, 72, 1.0)

	samples := mixer.GetSamples(cfg, 44000)

	if err := sinks.WriteSamplesToWavFile(cfg, samples, "test.wav"); err != nil {
		fmt.Println("Failed to write wav file:", err.Error())
	}
}
