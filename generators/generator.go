package generators

import (
	"math"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/filters"
)

type Generator interface {
	GetSamples(cfg *audio.AudioConfig, n int) []float64 // return samples between -1.0 and 1.0
	SetPitch(float64)
	SetPitchbend(float64)
	SetGain(float64)
}

type WrappedGenerator struct {
	GetSamplesFunc   func(cfg *audio.AudioConfig, n int) []float64
	SetPitchFunc     func(float64)
	SetPitchbendFunc func(float64)
	SetGainFunc      func(float64)
}

func NewWrappedGenerator(g Generator) *WrappedGenerator {
	return &WrappedGenerator{
		GetSamplesFunc:   g.GetSamples,
		SetPitchFunc:     g.SetPitch,
		SetPitchbendFunc: g.SetPitchbend,
		SetGainFunc:      g.SetGain,
	}
}

func (b *WrappedGenerator) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	if b.GetSamplesFunc != nil {
		return b.GetSamplesFunc(cfg, n)
	}
	return make([]float64, n)
}
func (b *WrappedGenerator) SetPitch(f float64) {
	if b.SetPitchFunc != nil {
		b.SetPitchFunc(f)
	}
}

func (b *WrappedGenerator) SetPitchbend(f float64) {
	if b.SetPitchbendFunc != nil {
		b.SetPitchbendFunc(f)
	}
}

func (b *WrappedGenerator) SetGain(f float64) {
	if b.SetGainFunc != nil {
		b.SetGainFunc(f)
	}
}

func NewGeneratorWithPitchControl(g Generator, control func(float64) float64) Generator {
	result := NewWrappedGenerator(g)
	result.SetPitchFunc = func(f float64) {
		g.SetPitch(control(f))
	}
	return result
}

func NewTransposingGenerator(g Generator, semitones, gainFactor float64) Generator {
	factor := math.Pow(2, semitones/12)
	result := NewWrappedGenerator(g)
	result.SetPitchFunc = func(f float64) {
		g.SetPitch(f * factor)
	}
	result.SetGainFunc = func(f float64) {
		g.SetGain(f * gainFactor)
	}
	return result
}

func NewConstantPitchGenerator(g Generator, c float64) Generator {
	return NewGeneratorWithPitchControl(g, func(f float64) float64 { return c })
}

func NewFilteredGenerator(g Generator, f filters.Filter) Generator {
	result := NewWrappedGenerator(g)
	result.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		return f.Filter(cfg, g.GetSamples(cfg, n))
	}
	return result
}

func NewCombinedGenerators(g ...Generator) Generator {
	result := NewWrappedGenerator(g[0])
	result.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := make([]float64, n)
		for _, generator := range g {
			for i, sample := range generator.GetSamples(cfg, n) {
				result[i] += sample
			}
		}
		return result
	}
	result.SetPitchFunc = func(f float64) {
		for _, generator := range g {
			generator.SetPitch(f)
		}
	}
	result.SetPitchbendFunc = func(f float64) {
		for _, generator := range g {
			generator.SetPitchbend(f)
		}
	}
	result.SetGainFunc = func(f float64) {
		for _, generator := range g {
			generator.SetGain(f)
		}
	}
	return result
}
