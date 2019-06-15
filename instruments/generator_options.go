package instruments

import (
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/generators/derived"
)

type GeneratorOptionsDef struct {
	Attack  *float64 `json:"attack" yaml:"attack"`
	Decay   *float64 `json:"decay" yaml:"decay"`
	Sustain *float64 `json:"sustain" yaml:"sustain"`
	Release *float64 `json:"release" yaml:"release"`
	Pitch   *float64 `json:"pitch" yaml:"pitch"`
}

func (g *GeneratorOptionsDef) Generator(gen generators.Generator) generators.Generator {
	if g.Attack != nil || g.Decay != nil || g.Sustain != nil || g.Release != nil {
		attack, decay, sustain, release := 0.1, 1.0, 0.5, 0.25
		if g.Attack != nil {
			attack = *g.Attack
		}
		if g.Decay != nil {
			decay = *g.Decay
		}
		if g.Sustain != nil {
			sustain = *g.Sustain
		}
		if g.Release != nil {
			release = *g.Release
		}
		gen = derived.NewEnvelopeGenerator(gen, attack, decay, sustain, release)
	}
	if g.Pitch != nil {
		gen.SetPitch(*g.Pitch)
	}
	return gen
}

func (g *GeneratorOptionsDef) Validate() error {
	return nil
}
