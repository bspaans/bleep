package filters

import "github.com/bspaans/bs8bs/audio"

type LowPassFilter struct {
	Alpha    float64
	Previous float64
}

func NewLowPassFilter(alpha float64) *LowPassFilter {
	return &LowPassFilter{
		Alpha:    alpha,
		Previous: 0.0,
	}
}

func (f *LowPassFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	for i, s := range samples {
		samples[i] = f.Previous + f.Alpha*(samples[i]-f.Previous)
		f.Previous = s
	}
	return samples
}
