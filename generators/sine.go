package generators

import (
	"math"

	"github.com/bspaans/bs8bs/audio"
)

func NewSineWaveOscillator() Generator {
	g := NewBaseGenerator()
	var phase float64
	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		if g.Pitch == 0.0 {
			return result
		}
		pitch := g.GetPitch()
		stepSize := (pitch * math.Pi * 2) / float64(cfg.SampleRate)
		for i := 0; i < n; i++ {
			v := math.Sin(phase) * g.Gain
			SetResult(cfg, result, i, v)
			phase += stepSize
		}
		return result
	}
	return g
}
