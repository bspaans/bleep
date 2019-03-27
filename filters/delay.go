package filters

import (
	"container/ring"

	"github.com/bspaans/bleep/audio"
)

type DelayFilter struct {
	LeftTime     float64
	LeftFactor   float64
	LeftDelayed  *ring.Ring
	RightTime    float64
	RightFactor  float64
	RightDelayed *ring.Ring
}

func NewDelayFilter(time, factor float64) *DelayFilter {
	return &DelayFilter{
		LeftTime:     time,
		LeftFactor:   factor,
		LeftDelayed:  nil,
		RightTime:    time,
		RightFactor:  factor,
		RightDelayed: nil,
	}
}

func (f *DelayFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	leftDelayTime := int(float64(cfg.SampleRate) * f.LeftTime)
	if f.LeftDelayed == nil {
		f.LeftDelayed = ring.New(leftDelayTime)
	}
	if cfg.Stereo {
		rightDelayTime := int(float64(cfg.SampleRate) * f.LeftTime)
		if f.RightDelayed == nil {
			f.RightDelayed = ring.New(rightDelayTime)
		}
	}

	n := len(samples)
	if cfg.Stereo {
		n = n / 2
	}
	for i := 0; i < n; i++ {

		ix := i
		if cfg.Stereo {
			ix *= 2
		}

		s := Delay(samples[ix], f.LeftFactor, f.LeftDelayed)
		f.LeftDelayed = f.LeftDelayed.Next()
		samples[ix] = s

		if cfg.Stereo {
			s := Delay(samples[ix+1], f.RightFactor, f.RightDelayed)
			f.RightDelayed = f.RightDelayed.Next()
			samples[ix+1] = s
		}
	}
	return samples
}

func Delay(s, factor float64, ring *ring.Ring) float64 {
	if ring.Value != nil {
		prev := ring.Value.(float64)
		s += prev * factor
	}
	ring.Value = s
	return s
}
