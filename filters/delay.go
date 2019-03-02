package filters

import (
	"container/ring"

	"github.com/bspaans/bs8bs/audio"
)

type DelayFilter struct {
	Time    float64
	Factor  float64
	Delayed *ring.Ring
}

func NewDelayFilter(time, factor float64) *DelayFilter {
	return &DelayFilter{
		Time:    time,
		Factor:  factor,
		Delayed: nil,
	}
}

func (f *DelayFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	delayTime := int(float64(cfg.SampleRate) * f.Time)
	if f.Delayed == nil {
		f.Delayed = ring.New(delayTime)
	}

	for i, s := range samples {
		if f.Delayed.Value != nil {
			prev := f.Delayed.Value.(float64)
			s += prev * f.Factor
		}
		f.Delayed.Value = s
		f.Delayed = f.Delayed.Next()
		samples[i] = s
	}
	return samples
}
