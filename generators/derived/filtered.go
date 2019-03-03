package derived

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/filters"
	"github.com/bspaans/bs8bs/generators"
)

func NewFilteredGenerator(g generators.Generator, f filters.Filter) generators.Generator {
	result := NewWrappedGenerator(g)
	result.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		return f.Filter(cfg, g.GetSamples(cfg, n))
	}
	return result
}
