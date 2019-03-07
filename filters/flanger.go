package filters

import (
	"math"

	"github.com/bspaans/bs8bs/audio"
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
	stepSize := (f.LFORate * math.Pi * 2) / float64(cfg.SampleRate)
	for i := 0; i < n; i++ {

		ix := i
		if cfg.Stereo {
			ix *= 2
		}
		s := samples[ix]

		currentDelay := time - int(math.Ceil(float64(time)*math.Abs(math.Sin(float64(f.Phase)*stepSize))))
		delayedIx := f.Phase - currentDelay
		if delayedIx <= 0 {
			delayedIx += time
		}

		samples[ix] = f.Factor*samples[ix] + f.Factor*samples[delayedIx]

		f.LeftDelayed[f.Phase] = s
		f.RightDelayed[f.Phase] = s
		f.Phase += 1
		if f.Phase >= len(f.LeftDelayed) {
			f.Phase = 0
		}
	}
	return samples
}
