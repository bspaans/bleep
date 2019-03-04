package filters

import "github.com/bspaans/bs8bs/audio"

type DistortionFilter struct {
	Level float64
}

func NewDistortionFilter(level float64) *DistortionFilter {
	return &DistortionFilter{
		Level: level,
	}
}

func (f *DistortionFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	for i, s := range samples {
		if s >= f.Level {
			s = f.Level
		} else if s <= -1*f.Level {
			s = -1 * f.Level
		}
		samples[i] = s
	}
	return samples
}
