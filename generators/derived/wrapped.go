package derived

import (
	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/generators"
)

type WrappedGenerator struct {
	GetSamplesFunc   func(cfg *audio.AudioConfig, n int) []float64
	SetPitchFunc     func(float64)
	SetPitchbendFunc func(float64)
	SetGainFunc      func(float64)
}

func NewWrappedGenerator(g generators.Generator) *WrappedGenerator {
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
