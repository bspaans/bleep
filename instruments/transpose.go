package instruments

import (
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/generators/derived"
)

type TransposeDef struct {
	Semitones    float64 `json:"semitones" yaml:"semitones"`
	Gain         float64 `json:"gain" yaml:"gain"`
	GeneratorDef `json:",inline" yaml:",inline"`
}

func (t *TransposeDef) Generator(ctx *Context) generators.Generator {
	return derived.NewTransposingGenerator(
		t.GeneratorDef.Generator(ctx),
		t.Semitones,
		t.Gain,
	)
}

func (t *TransposeDef) Validate(ctx *Context) error {
	return t.GeneratorDef.Validate(ctx)
}
