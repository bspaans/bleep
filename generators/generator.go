package generators

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/filters"
)

type Generator interface {
	GetSamples(cfg *audio.AudioConfig, n int) []float64 // return samples between -1.0 and 1.0
	SetPitch(float64)
	SetGain(float64)
}

type PitchControlledGenerator struct {
	Generator       Generator
	PitchController func(float64) float64
}

func NewGeneratorWithPitchControl(g Generator, control func(float64) float64) Generator {
	return &PitchControlledGenerator{
		Generator:       g,
		PitchController: control,
	}
}

func (p *PitchControlledGenerator) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	return p.Generator.GetSamples(cfg, n)
}

func (p *PitchControlledGenerator) SetPitch(f float64) {
	p.Generator.SetPitch(p.PitchController(f))
}

func (p *PitchControlledGenerator) SetGain(f float64) {
	p.Generator.SetGain(f)
}

func NewConstantPitchGenerator(g Generator, c float64) Generator {
	return NewGeneratorWithPitchControl(g, func(f float64) float64 { return c })
}

type FilteredGenerator struct {
	Filter    filters.Filter
	Generator Generator
}

func NewFilteredGenerator(g Generator, f filters.Filter) Generator {
	return &FilteredGenerator{
		Filter:    f,
		Generator: g,
	}
}

func (p *FilteredGenerator) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	return p.Filter.Filter(cfg, p.Generator.GetSamples(cfg, n))
}

func (p *FilteredGenerator) SetPitch(f float64) {
	p.Generator.SetPitch(f)
}

func (p *FilteredGenerator) SetGain(f float64) {
	p.Generator.SetGain(f)
}
