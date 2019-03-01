package generators

import "github.com/bspaans/bs8bs/audio"

type Generator interface {
	GetSamples(cfg *audio.AudioConfig, n int) []int
	SetPitch(float64)
}

type GeneratorConfig struct {
	BitDepth   int
	SampleRate int
}
