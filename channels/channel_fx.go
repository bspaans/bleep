package channels

import (
	"github.com/bspaans/bleep/filters"
)

type FX int

const (
	Reverb     FX = iota
	ReverbTime FX = iota
	Chorus     FX = iota
	Phaser     FX = iota
	Tremelo    FX = iota
	LPF_Cutoff FX = iota
	HPF_Cutoff FX = iota
)

type ChannelFX struct {
	Tremelo    float64 // supported
	Reverb     float64 // fake supported (through delayfilter)
	ReverbTime float64
	LPF_Cutoff float64
	HPF_Cutoff float64
	Chorus     float64 // not supported
	Phaser     float64 // not supported

	CachedFilter filters.Filter

	reverb  filters.Filter
	tremelo filters.Filter
	lpf     filters.Filter
	hpf     filters.Filter
}

func NewChannelFX() *ChannelFX {
	return &ChannelFX{}
}

func (f *ChannelFX) Filter() filters.Filter {
	if f.CachedFilter != nil {
		return f.CachedFilter
	}
	var filter filters.Filter
	if f.HPF_Cutoff != 0.0 {
		filter = filters.ComposedFilter(f.hpf, filter)
	}
	if f.LPF_Cutoff != 0.0 {
		filter = filters.ComposedFilter(f.lpf, filter)
	}
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
			time := f.ReverbTime
			if time == 0.0 {
				time = 0.2
			}
			f.reverb = filters.NewDelayFilter(time, value)
		} else {
			f.reverb.(*filters.DelayFilter).LeftFactor = value
			f.reverb.(*filters.DelayFilter).RightFactor = value
		}
		f.CachedFilter = nil
	} else if fx == ReverbTime {
		f.ReverbTime = value
		if f.reverb == nil {
			time := f.ReverbTime
			if time == 0.0 {
				time = 0.2
			}
			f.reverb = filters.NewDelayFilter(time, value)
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
	} else if fx == LPF_Cutoff {
		f.LPF_Cutoff = value
		if f.lpf == nil {
			f.lpf = filters.NewLowPassConvolutionFilter(f.LPF_Cutoff, 25)
		} else {
			f.lpf.(*filters.LowPassConvolutionFilter).Cutoff = f.LPF_Cutoff
		}
		f.CachedFilter = nil
	} else if fx == HPF_Cutoff {
		f.HPF_Cutoff = value
		if f.hpf == nil {
			f.hpf = filters.NewHighPassConvolutionFilter(f.HPF_Cutoff, 51)
		} else {
			f.hpf.(*filters.HighPassConvolutionFilter).Cutoff = f.HPF_Cutoff
		}
		f.CachedFilter = nil
	}
}
