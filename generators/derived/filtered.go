package derived

import (
	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/filters"
	"github.com/bspaans/bleep/generators"
)

func NewFilteredGenerator(g generators.Generator, f filters.Filter) generators.Generator {
	result := NewWrappedGenerator(g)
	result.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		return f.Filter(cfg, g.GetSamples(cfg, n))
	}
	return result
}
