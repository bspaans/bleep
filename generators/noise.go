package generators

import (
	"math/rand"

	"github.com/bspaans/bleep/audio"
)

func NewWhiteNoiseGenerator() *BaseGenerator {
	gen := NewBaseGenerator()
	gen.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		for i := 0; i < n; i++ {
			v := (rand.Float64()*2 - 1) * gen.Gain
			writeSampleToAll(cfg, result, i, v)
		}
		return result
	}

	return gen
}

func NewWhiteNoiseGeneratorAdvanced() *AdvancedGenerator {
	g := NewAdvancedGenerator()
	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		gain := g.Gain.GetSamples(cfg, n)
		if allElementsZero(gain) {
			return result // already empty
		}

		for i := 0; i <= n; i++ {
			writeSampleToAll(cfg, result, i, (rand.Float64()*2-1)*gain[i])
		}
		return result
	}

	return g
}
