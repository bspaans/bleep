package filters

import "github.com/bspaans/bleep/audio"

type OverdriveFilter struct {
	Factor float64
}

func NewOverdriveFilter(factor float64) *OverdriveFilter {
	return &OverdriveFilter{
		Factor: factor,
	}
}

func (f *OverdriveFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	for i, s := range samples {
		samples[i] = s * f.Factor
	}
	return samples
}
