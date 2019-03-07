package filters

import (
	"math"
	"math/bits"

	"github.com/bspaans/bs8bs/audio"
)

type TremeloFilter struct {
	Rate   float64
	Factor float64
	Phase  float64
}

func NewTremeloFilter(rate, factor float64) *TremeloFilter {
	return &TremeloFilter{
		Factor: factor,
		Rate:   rate,
	}
}

const MaxInt int = (1<<bits.UintSize)/2 - 1

func (f *TremeloFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	n := len(samples)
	if cfg.Stereo {
		n = n / 2
	}
	result := make([]float64, len(samples))
	stepSize := 2 * math.Pi * (f.Rate / float64(cfg.SampleRate))
	for i := 0; i < n; i++ {

		tremelo := 1 + f.Factor*math.Sin(f.Phase)

		if cfg.Stereo {
			result[i*2] = samples[i*2] * tremelo
			result[i*2+1] = samples[i*2+1] * tremelo
		} else {
			result[i] = samples[i] * tremelo
		}

		f.Phase += stepSize
	}
	return result
}
