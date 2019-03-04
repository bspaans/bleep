package derived

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
)

func NewCombinedGenerators(g ...generators.Generator) generators.Generator {
	result := NewWrappedGenerator(g[0])
	result.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := generators.GetEmptySampleArray(cfg, n)
		for _, generator := range g {
			for i, sample := range generator.GetSamples(cfg, n) {
				result[i] += sample
			}
		}
		return result
	}
	result.SetPitchFunc = func(f float64) {
		for _, generator := range g {
			generator.SetPitch(f)
		}
	}
	result.SetPitchbendFunc = func(f float64) {
		for _, generator := range g {
			generator.SetPitchbend(f)
		}
	}
	result.SetGainFunc = func(f float64) {
		for _, generator := range g {
			generator.SetGain(f)
		}
	}
	return result
}
