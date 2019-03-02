package generators

import (
	"fmt"

	"github.com/bspaans/bs8bs/audio"
)

type EnvelopeGenerator struct {
	Generator Generator
	Pitch     float64
	Attack    float64
	Decay     float64
	Sustain   float64
	Release   float64
	Period    int
}

func NewEnvelopeGenerator(g Generator) *EnvelopeGenerator {
	return &EnvelopeGenerator{
		Generator: g,
		Attack:    0.5,
		Decay:     0.5,
		Sustain:   0.25,
		Release:   1.0,
		Period:    0,
	}
}

func (e *EnvelopeGenerator) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	result := make([]float64, n)
	if e.Pitch == 0.0 {
		return result
	}

	attackLength := float64(cfg.SampleRate) * e.Attack
	decayLength := float64(cfg.SampleRate) * e.Decay
	decayEnd := attackLength + decayLength
	sustainLength := float64(cfg.SampleRate) * 0.01
	sustainEnd := decayEnd + sustainLength
	releaseLength := float64(cfg.SampleRate) * e.Release
	releaseEnd := sustainEnd + releaseLength
	fmt.Println(attackLength)

	for i, s := range e.Generator.GetSamples(cfg, n) {
		if float64(e.Period) < attackLength {
			p := float64(e.Period)
			s = s * p * (1.0 / attackLength)
		} else if float64(e.Period) < decayEnd {
			p := float64(e.Period) - attackLength
			s = s * (decayLength - p) * ((1.0 - e.Sustain) / decayLength)
		} else if float64(e.Period) < sustainEnd {
			s = s * e.Sustain
		} else if float64(e.Period) < releaseEnd {
			p := float64(e.Period) - sustainEnd
			s = s * (sustainLength - p) * (1.0 / sustainLength)
		} else {
			s = 0.0
		}
		e.Period++

		result[i] = s
	}
	return result
}

func (e *EnvelopeGenerator) SetPitch(f float64) {
	e.Pitch = f
	e.Generator.SetPitch(f)
	if f == 0.0 {
		e.Period = 0
	}
}
