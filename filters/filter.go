package filters

import (
	"github.com/bspaans/bs8bs/audio"
)

type Filter interface {
	Filter(cfg *audio.AudioConfig, samples []float64) []float64
}

type BaseFilter struct {
	FilterFunc func(cfg *audio.AudioConfig, samples []float64) []float64
}

func NewBaseFilter(f func(cfg *audio.AudioConfig, samples []float64) []float64) Filter {
	return &BaseFilter{
		FilterFunc: f,
	}
}

func (f *BaseFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	if f.FilterFunc != nil {
		return f.FilterFunc(cfg, samples)
	}
	return samples
}

func ComposedFilter(f1 Filter, f2 Filter) Filter {
	if f1 == nil {
		return f2
	}
	if f2 == nil {
		return f1
	}
	return NewBaseFilter(
		func(cfg *audio.AudioConfig, samples []float64) []float64 {
			s1 := f2.Filter(cfg, samples)
			return f1.Filter(cfg, s1)
		},
	)
}
