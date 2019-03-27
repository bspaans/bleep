package filters

import (
	"math"

	"github.com/bspaans/bleep/audio"
)

// Cutoff frequency = Alpha / ((1 - Alpha) * 2 * Pi * dt
// Alpha = 2Pi * dt * Cutoff / (2Pi * dt * Cutoff + 1)
type LowPassFilter struct {
	Cutoff        float64
	PreviousLeft  float64
	PreviousRight float64
}

func NewLowPassFilter(cutoff float64) *LowPassFilter {
	return &LowPassFilter{
		Cutoff:        cutoff,
		PreviousLeft:  0.0,
		PreviousRight: 0.0,
	}
}

func (f *LowPassFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	n := len(samples)
	if cfg.Stereo {
		n = n / 2
	}
	waveLength := float64(n) / float64(cfg.SampleRate)
	rc := 1.0 / (2 * math.Pi * f.Cutoff)
	alpha := waveLength / (rc + waveLength)
	for i := 0; i < n; i++ {
		if cfg.Stereo {
			samples[i*2] = f.PreviousLeft + alpha*(samples[i*2]-f.PreviousLeft)
			samples[i*2+1] = f.PreviousRight + alpha*(samples[i*2+1]-f.PreviousRight)
			f.PreviousLeft = samples[i*2]
			f.PreviousRight = samples[i*2+1]
		} else {
			samples[i] = f.PreviousLeft + alpha*(samples[i]-f.PreviousLeft)
			f.PreviousLeft = samples[i]
		}
	}
	return samples
}
