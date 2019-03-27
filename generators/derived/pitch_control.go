package derived

import "github.com/bspaans/bleep/generators"

func NewGeneratorWithPitchControl(g generators.Generator, control func(float64) float64) generators.Generator {
	result := NewWrappedGenerator(g)
	result.SetPitchFunc = func(f float64) {
		g.SetPitch(control(f))
	}
	return result
}

func NewConstantPitchGenerator(g generators.Generator, c float64) generators.Generator {
	return NewGeneratorWithPitchControl(g, func(f float64) float64 {
		if f == 0.0 {
			g.SetPitch(f)
			return 0.0
		}
		return c
	})
}
