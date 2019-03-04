package generators

import (
	"math/rand"

	"github.com/bspaans/bs8bs/audio"
)

func NewWhiteNoiseGenerator() Generator {
	g := NewBaseGenerator()
	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		if g.Pitch == 0.0 {
			return result
		}
		for i := 0; i < n; i++ {
			v := (rand.Float64()*2 - 1) * g.Gain
			SetResult(cfg, result, i, v)
		}
		return result
	}

	return g
}
