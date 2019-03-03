package channels

import "github.com/bspaans/bs8bs/filters"

type FX int

const (
	Reverb  FX = iota
	Chorus  FX = iota
	Phaser  FX = iota
	Tremelo FX = iota
)

type ChannelFX struct {
	Reverb       float64 // fake supported (through delayfilter)
	Chorus       float64 // not supported
	Phaser       float64 // not supported
	Tremelo      float64 // not supported
	CachedFilter filters.Filter
}

func NewChannelFX() *ChannelFX {
	return &ChannelFX{}
}

func (f *ChannelFX) Filter() filters.Filter {
	if f.CachedFilter != nil {
		return f.CachedFilter
	}
	if f.Reverb == 0.0 {
		return nil
	}
	var filter filters.Filter
	if f.Reverb != 0.0 {
		filter = filters.NewDelayFilter(0.2, f.Reverb)
	}
	f.CachedFilter = filter
	return filter
}

func (f *ChannelFX) Set(fx FX, value float64) {
	if fx == Reverb {
		f.Reverb = value
		f.CachedFilter = nil
	}
}
