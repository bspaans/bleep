package generators

import (
	"github.com/bspaans/bs8bs/audio"
)

func NewTriangleWaveOscillator() Generator {
	g := NewBaseGenerator()
	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		if g.Pitch == 0.0 {
			return result
		}
		pitch := g.GetPitch()
		flipEvery := (float64(cfg.SampleRate)) / pitch / 2
		stepSize := 2.0 / flipEvery
		for i := 0; i < n; i++ {
			v := 0.0
			if float64(g.Phase) < flipEvery {
				v = -1.0 + float64(g.Phase)*stepSize
			} else {
				v = 1.0 - (float64(g.Phase)-flipEvery)*stepSize
			}
			SetResult(cfg, result, i, v)
			g.Phase++
			if g.Phase >= int(flipEvery*2) {
				g.Phase = 0
			}
		}
		return result
	}
	return g
}
