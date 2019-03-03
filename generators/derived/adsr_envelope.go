package derived

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
)

type EnvelopeGenerator struct {
	Generator   generators.Generator
	Pitch       float64
	Attack      float64
	Decay       float64
	Sustain     float64
	SustainHold float64
	Release     float64
	Period      int
}

func NewEnvelopeGenerator(g generators.Generator, attack, decay, sustain, release float64) *EnvelopeGenerator {
	return &EnvelopeGenerator{
		Generator:   g,
		Attack:      attack,
		Decay:       decay,
		Sustain:     sustain,
		SustainHold: 0.1,
		Release:     release,
		Period:      0,
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
	sustainLength := float64(cfg.SampleRate) * e.SustainHold
	sustainEnd := decayEnd + sustainLength
	releaseLength := float64(cfg.SampleRate) * e.Release
	releaseEnd := sustainEnd + releaseLength

	samples := e.Generator.GetSamples(cfg, n)
	for i, s := range samples {
		if float64(e.Period) < attackLength {
			p := float64(e.Period)
			s = s * p * (1.0 / attackLength)
		} else if float64(e.Period) < decayEnd {
			p := float64(e.Period) - attackLength
			decayDomain := e.Sustain - 1.0
			decayPerPeriod := decayDomain / decayLength
			s = s * (decayPerPeriod*p + 1.0)
		} else if float64(e.Period) < sustainEnd {
			s = s * e.Sustain
		} else if float64(e.Period) < releaseEnd {
			p := float64(e.Period) - sustainEnd
			releasePerPeriod := (0 - e.Sustain) / releaseLength
			s = s * (releasePerPeriod*p + e.Sustain)
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

func (e *EnvelopeGenerator) SetGain(f float64) {
	e.Generator.SetGain(f)
}

func (e *EnvelopeGenerator) SetPitchbend(f float64) {
	e.Generator.SetPitchbend(f)
}
