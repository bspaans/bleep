package main

import (
	"fmt"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
)

func main() {
	cfg := audio.NewAudioConfig()
	samples := generators.NewSquareWaveOscillator().GetSamples(cfg, cfg.SampleRate)
	fmt.Println(samples)
	audio.WriteWavFile(cfg, samples, "test.wav")
}
