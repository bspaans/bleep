package instruments

import (
	"errors"

	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/generators/derived"
)

type ConstantPitchDef struct {
	Pitch        float64 `json:"pitch" yaml:"pitch"`
	GeneratorDef `json:",inline" yaml:",inline"`
}

func (t *ConstantPitchDef) Generator(ctx *Context) generators.Generator {
	return derived.NewConstantPitchGenerator(
		t.GeneratorDef.Generator(ctx),
		t.Pitch,
	)
}

func (t *ConstantPitchDef) Validate(ctx *Context) error {
	if t.Pitch == 0.0 {
		return errors.New("Missing pitch in constant_pitch control")
	}
	return t.GeneratorDef.Validate(ctx)
}
