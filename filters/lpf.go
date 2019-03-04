package filters

import "github.com/bspaans/bs8bs/audio"

type LowPassFilter struct {
	Alpha         float64
	PreviousLeft  float64
	PreviousRight float64
}

func NewLowPassFilter(alpha float64) *LowPassFilter {
	return &LowPassFilter{
		Alpha:         alpha,
		PreviousLeft:  0.0,
		PreviousRight: 0.0,
	}
}

func (f *LowPassFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	n := len(samples)
	if cfg.Stereo {
		n = n / 2
	}
	for i := 0; i < n; i++ {
		if cfg.Stereo {
			samples[i*2] = f.PreviousLeft + f.Alpha*(samples[i]-f.PreviousLeft)
			samples[i*2+1] = f.PreviousRight + f.Alpha*(samples[i]-f.PreviousRight)
			f.PreviousLeft = samples[i*2]
			f.PreviousRight = samples[i*2+1]
		} else {
			samples[i] = f.PreviousLeft + f.Alpha*(samples[i]-f.PreviousLeft)
			f.PreviousLeft = samples[i]
		}
	}
	return samples
}
