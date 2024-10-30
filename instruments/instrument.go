package instruments

import (
	"encoding/json"
	"fmt"

	"github.com/bspaans/bleep/audio"
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

func (i *InstrumentDef) Instrument(ctx *Context) Instrument {
	return func(cfg *audio.AudioConfig) generators.Generator {
		return i.Generator(ctx)
	}
}

func (i *InstrumentDef) Validate(ctx *Context) error {
	if err := i.GeneratorDef.Validate(ctx); err != nil {
		return fmt.Errorf("error in instrument [%d] %s: %s", i.Index, i.Name, err.Error())
	}
	return nil
}

func FromJSON(txt string, ctx *Context) (InstrumentDef, error) {
	var result InstrumentDef
	if err := json.Unmarshal([]byte(txt), &result); err != nil {
		return result, fmt.Errorf("failed to parse JSON string into Instrument definition: %s", err.Error())
	}
	if err := result.Validate(ctx); err != nil {
		return result, fmt.Errorf("failed to validate parsed Instrument: %s", err.Error())
	}
	return result, nil
}
