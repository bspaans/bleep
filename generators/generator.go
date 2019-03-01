package generators

import "github.com/bspaans/bs8bs/audio"

type Generator interface {
	GetSamples(cfg *audio.AudioConfig, n int) []float64 // return samples between -1.0 and 1.0
	SetPitch(float64)
}

type GeneratorConfig struct {
	BitDepth   int
	SampleRate int
}
