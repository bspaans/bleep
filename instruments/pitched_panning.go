package instruments

import (
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/generators/derived"
)

type PitchedPanningDef struct {
	GeneratorDef `json:",inline" yaml:",inline"`
}

func (w *PitchedPanningDef) Generator(ctx *Context) generators.Generator {
	g := w.GeneratorDef.Generator(ctx)
	return derived.NewPitchControlledPanningGenerator(g)
}

func (w *PitchedPanningDef) Validate(ctx *Context) error {
	return w.GeneratorDef.Validate(ctx)
}
