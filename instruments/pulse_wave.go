package instruments

import (
	"github.com/bspaans/bleep/generators"
)

type PulseWaveDef struct {
	DutyCycle           float64       `json:"duty_cycle" yaml:"duty_cycle"`
	DutyCycleDepth      float64       `json:"duty_cycle_depth" yaml:"duty_cycle_depth"`
	DutyCycleModulator  *GeneratorDef `json:"duty_cycle_modulator" yaml:"duty_cycle_modulator"`
	GeneratorOptionsDef `json:",inline" yaml:",inline"`
}

func (p *PulseWaveDef) Generator(ctx *Context) generators.Generator {
	var mod generators.Generator
	if p.DutyCycleModulator != nil {
		mod = p.DutyCycleModulator.Generator(ctx)
	}
	g := generators.NewPulseWaveGenerator(p.DutyCycle, mod, p.DutyCycleDepth)
	return p.GeneratorOptionsDef.Generator(g)
}

func (g *PulseWaveDef) Validate(ctx *Context) error {
	if g.DutyCycleModulator != nil {
		if err := g.DutyCycleModulator.Validate(ctx); err != nil {
			return WrapError("pulse > duty_cycle_modulator", err)
		}
	}
	return g.GeneratorOptionsDef.Validate()
}
