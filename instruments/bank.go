package instruments

import "github.com/bspaans/bs8bs/generators"

var Bank = make([]func() generators.Generator, 128)

func init() {
	for i := 0; i < len(Bank); i++ {
		if i%2 == 0 {
			Bank[i] = generators.NewSineWaveOscillator
		} else {
			Bank[i] = generators.NewSquareWaveOscillator
		}
	}
	Bank[25] = func() generators.Generator {
		return generators.NewEnvelopeGenerator(generators.NewSineWaveOscillator(), 0.001, 1.0, 0.8, 0.24)
	}
}
