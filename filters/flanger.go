package filters

import (
	"math"

	"github.com/bspaans/bleep/audio"
)

type FlangerFilter struct {
	Time    float64
	Factor  float64
	LFORate float64

	LeftDelayed  []float64
	RightDelayed []float64
	Phase        int
}

func NewFlangerFilter(time, factor, rate float64) *FlangerFilter {
	return &FlangerFilter{
		Time:         time,
		Factor:       factor,
		LFORate:      rate,
		LeftDelayed:  nil,
		RightDelayed: nil,
	}
}

func (f *FlangerFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	time := int(float64(cfg.SampleRate) * f.Time)
	if f.LeftDelayed == nil {
		f.LeftDelayed = make([]float64, time)
		f.RightDelayed = make([]float64, time)
	}

	n := len(samples)
	if cfg.Stereo {
		n = n / 2
	}
	stepSize := (f.LFORate * math.Pi) / float64(cfg.SampleRate)
	result := make([]float64, len(samples))
	for i := 0; i < n; i++ {

		ix := i
		if cfg.Stereo {
			ix *= 2
		}

		currentDelay := time - int(math.Ceil(float64(time)*math.Abs(math.Sin(float64(f.Phase)*stepSize))))
		delayedIx := f.Phase - currentDelay
		if delayedIx < 0 {
			delayedIx += time
		}

		f.LeftDelayed[f.Phase] = samples[ix]
		if cfg.Stereo {
			f.RightDelayed[f.Phase] = samples[ix+1]
		}

		result[ix] = (1.0-f.Factor)*samples[ix] + f.Factor*f.LeftDelayed[delayedIx]
		if cfg.Stereo {
			result[ix+1] = (1.0-f.Factor)*samples[ix+1] + f.Factor*f.RightDelayed[delayedIx]
		}

		f.Phase += 1
		if f.Phase >= len(f.LeftDelayed) {
			f.Phase = 0
		}
	}
	return result
}
