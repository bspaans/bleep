package instruments

import (
	"fmt"

	"github.com/bspaans/bleep/generators"
)

type InstrumentDef struct {
	Index        int    `json:"index" yaml:"index"`
	Name         string `json:"name" yaml:"name"`
	GeneratorDef `json:",inline" yaml:",inline"`
}

func (i *InstrumentDef) Generator(ctx *Context) generators.Generator {
	return i.GeneratorDef.Generator(ctx)
}

func (i *InstrumentDef) Validate(ctx *Context) error {
	if err := i.GeneratorDef.Validate(ctx); err != nil {
		return fmt.Errorf("Error in instrument [%d] %s: %s", i.Index, i.Name, err.Error())
	}
	return nil
}
