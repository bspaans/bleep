package generators

import (
	"github.com/bspaans/bs8bs/audio"
)

func NewSawtoothWaveOscillator() Generator {
	g := NewBaseGenerator()
	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		if g.Pitch == 0.0 {
			return result
		}
		pitch := g.GetPitch()
		flipEvery := (float64(cfg.SampleRate)) / pitch
		stepSize := 2.0 / flipEvery
		for i := 0; i < n; i++ {
			v := -1.0 + float64(g.Phase)*stepSize*g.Gain
			SetResult(cfg, result, i, v)
			g.IncrementPhase(int(flipEvery))
		}
		return result
	}
	return g
}
