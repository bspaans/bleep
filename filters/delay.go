package filters

import (
	"container/ring"
	"fmt"

	"github.com/bspaans/bleep/audio"
)

type DelayFilter struct {
	LeftTime      float64
	LeftFactor    float64
	LeftFeedback  float64
	LeftDelayed   *ring.Ring
	RightTime     float64
	RightFactor   float64
	RightFeedback float64
	RightDelayed  *ring.Ring
}

func NewDelayFilter(time, factor, feedback float64) *DelayFilter {
	fmt.Println("feedback", feedback)
	return &DelayFilter{
		LeftTime:      time,
		LeftFactor:    factor,
		LeftDelayed:   nil,
		LeftFeedback:  feedback,
		RightTime:     time,
		RightFactor:   factor,
		RightDelayed:  nil,
		RightFeedback: feedback,
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

		s := Delay(samples[ix], f.LeftFactor, f.LeftFeedback, f.LeftDelayed)
		f.LeftDelayed = f.LeftDelayed.Next()
		samples[ix] = s

		if cfg.Stereo {
			s := Delay(samples[ix+1], f.RightFactor, f.RightFeedback, f.RightDelayed)
			f.RightDelayed = f.RightDelayed.Next()
			samples[ix+1] = s
		}
	}
	return samples
}

func Delay(s, factor, feedback float64, ring *ring.Ring) float64 {
	if ring.Value != nil {
		prev := ring.Value.(float64)
		ring.Value = s
		s += prev * factor
		ring.Value = ring.Value.(float64) + feedback*s
	} else {
		ring.Value = s
	}
	return s
}
