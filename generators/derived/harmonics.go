package derived

import (
	"math"

	"github.com/bspaans/bs8bs/generators"
)

func NewHarmonicsGenerator(g func() generators.Generator, harmonics int) generators.Generator {
	generators := []generators.Generator{g()}
	for i := 2; i < harmonics+2; i++ {
		generators = append(generators, NewTransposingGenerator(g(), float64(i), 1.0/float64(i*4)))
	}
	return NewCombinedGenerators(generators...)
}

func NewHarmonicGenerator(g generators.Generator, pitchFactor, gainFactor float64) generators.Generator {
	result := NewWrappedGenerator(g)
	result.SetPitchFunc = func(f float64) {
		g.SetPitch(f * pitchFactor)
	}
	result.SetGainFunc = func(f float64) {
		g.SetGain(f * gainFactor)
	}
	return result
}

func NewTransposingGenerator(g generators.Generator, semitones, gainFactor float64) generators.Generator {
	factor := math.Pow(2, semitones/12)
	return NewHarmonicGenerator(g, factor, gainFactor)
}
