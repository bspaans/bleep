package generators

import (
	"math"
	"math/bits"

	"github.com/bspaans/bleep/audio"
)

const MaxInt int = (1<<bits.UintSize)/2 - 1

func NewSquareWaveOscillator() Generator {
	g := NewBaseGenerator()
	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {

		result := GetEmptySampleArray(cfg, n)
		if g.Pitch == 0.0 {
			return result
		}
		pitch := g.GetPitch()
		flipEvery := (float64(cfg.SampleRate) / 2) / pitch

		for i := 0; i < n; i++ {
			v := 1.0
			if int(math.Floor(float64(g.Phase)/flipEvery))%2 == 1 {
				v = -1.0
			}
			v *= g.Gain

			SetResult(cfg, result, i, v)
			g.IncrementPhase(int(flipEvery))
		}
		return result

	}
	return g
}
