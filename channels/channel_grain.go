package channels

import (
	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/generators"
)

type GrainOption int

const (
	GrainFile      GrainOption = iota
	GrainGain      GrainOption = iota
	GrainSize      GrainOption = iota
	GrainBirthRate GrainOption = iota
	GrainDensity   GrainOption = iota
	GrainSpread    GrainOption = iota
	GrainSpeed     GrainOption = iota
	GrainRepeat    GrainOption = iota
)

type ChannelGrain struct {
	File           string
	GrainSize      float64
	BirthRate      float64
	Density        int
	Spread         float64
	Speed          float64
	RandomPosition float64
	Gain           float64
	Repeat         bool
	On             bool

	CachedGenerator generators.Generator
}

func NewChannelGrain() *ChannelGrain {
	return &ChannelGrain{
		File:            "",
		GrainSize:       0.2,
		BirthRate:       0.2,
		Density:         1,
		Spread:          30,
		Speed:           1.0,
		RandomPosition:  0.0,
		Gain:            1.0,
		Repeat:          true,
		CachedGenerator: nil,
	}
}

func (f *ChannelGrain) Generator(cfg *audio.AudioConfig) (generators.Generator, error) {
	if !f.On {
		return nil, nil
	}
	if f.CachedGenerator != nil {
		return f.CachedGenerator, nil
	}
	if f.File == "" {
		return nil, nil
	}
	g, err := generators.NewGrainsGeneratorForWavFile(cfg, f.File, f.GrainSize, f.BirthRate, f.Density,
		f.Spread, f.Speed, f.RandomPosition, f.Gain, f.Repeat)
	if err != nil {
		return nil, err
	}
	f.CachedGenerator = g
	return f.CachedGenerator, nil
}

func (f *ChannelGrain) Set(opt GrainOption, value interface{}) {
	if opt == GrainFile {
		f.File = value.(string)
		f.CachedGenerator = nil
	} else if opt == GrainGain {
		f.Gain = value.(float64)
		if f.CachedGenerator != nil {
			f.CachedGenerator.(*generators.GrainsGenerator).GrainGain = f.Gain
		}
	} else if opt == GrainSize {
		f.GrainSize = value.(float64)
		if f.CachedGenerator != nil {
			f.CachedGenerator.(*generators.GrainsGenerator).GrainSize = f.GrainSize
		}
	} else if opt == GrainBirthRate {
		f.BirthRate = value.(float64)
		if f.CachedGenerator != nil {
			f.CachedGenerator.(*generators.GrainsGenerator).BirthRate = f.BirthRate
		}
	} else if opt == GrainDensity {
		f.Density = value.(int)
		if f.CachedGenerator != nil {
			f.CachedGenerator.(*generators.GrainsGenerator).Density = f.Density
		}
	} else if opt == GrainSpread {
		f.Spread = value.(float64)
		if f.CachedGenerator != nil {
			f.CachedGenerator.(*generators.GrainsGenerator).Spread = f.Spread
		}
	} else if opt == GrainSpeed {
		f.Speed = value.(float64)
		if f.CachedGenerator != nil {
			f.CachedGenerator.(*generators.GrainsGenerator).Speed = f.Speed
		}
	} else if opt == GrainRepeat {
		f.Repeat = value.(bool)
		if f.CachedGenerator != nil {
			f.CachedGenerator.(*generators.GrainsGenerator).Repeat = f.Repeat
		}
	}
}
