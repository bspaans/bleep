package channels

import (
	"github.com/bspaans/bs8bs/filters"
)

type FX int

const (
	Reverb  FX = iota
	Chorus  FX = iota
	Phaser  FX = iota
	Tremelo FX = iota
)

type ChannelFX struct {
	Tremelo float64 // supported
	Reverb  float64 // fake supported (through delayfilter)
	Chorus  float64 // not supported
	Phaser  float64 // not supported

	CachedFilter filters.Filter

	reverb  filters.Filter
	tremelo filters.Filter
}

func NewChannelFX() *ChannelFX {
	return &ChannelFX{}
}

func (f *ChannelFX) Filter() filters.Filter {
	if f.CachedFilter != nil {
		return f.CachedFilter
	}
	var filter filters.Filter
	if f.Tremelo != 0.0 {
		filter = filters.ComposedFilter(f.tremelo, filter)
	}
	if f.Reverb != 0.0 {
		filter = filters.ComposedFilter(f.reverb, filter)
	}
	f.CachedFilter = filter
	return filter
}

func (f *ChannelFX) Set(fx FX, value float64) {
	if fx == Reverb {
		f.Reverb = value
		if f.reverb == nil {
			f.reverb = filters.NewDelayFilter(0.2, value)
		} else {
			f.reverb.(*filters.DelayFilter).LeftFactor = value
			f.reverb.(*filters.DelayFilter).RightFactor = value
		}
		f.CachedFilter = nil
	} else if fx == Tremelo {
		f.Tremelo = value
		if f.tremelo == nil {
			f.tremelo = filters.NewTremeloFilter(5.0, 0.5+(value/2))
		} else {
			f.tremelo.(*filters.TremeloFilter).Factor = 0.5 + (value / 2)
		}
		f.CachedFilter = nil
	}
}
