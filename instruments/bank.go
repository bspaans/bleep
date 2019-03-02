package instruments

import (
	"github.com/bspaans/bs8bs/filters"
	"github.com/bspaans/bs8bs/generators"
)

var Bank = make([]func() generators.Generator, 128)

func init() {
	for i := 0; i < len(Bank); i++ {
		if i%2 == 0 {
			Bank[i] = generators.NewSineWaveOscillator
		} else {
			Bank[i] = generators.NewSquareWaveOscillator
		}
	}

	// Steel string guitar
	Bank[25] = func() generators.Generator {
		return generators.NewEnvelopeGenerator(generators.NewSineWaveOscillator(), 0.001, 1.0, 0.8, 0.24)
	}

	// Overdrive guitar
	Bank[29] = func() generators.Generator {
		return generators.NewFilteredGenerator(
			generators.NewEnvelopeGenerator(generators.NewSineWaveOscillator(), 0.001, 4.0, 0.8, 0.24),
			filters.NewOverdriveFilter(4.5),
		)
	}

	// Warm pad
	Bank[89] = func() generators.Generator {
		return generators.NewFilteredGenerator(
			generators.NewEnvelopeGenerator(generators.NewSineWaveOscillator(), 0.5, 4.0, 0.4, 0.25),
			filters.NewDelayFilter(1.0, 0.8),
		)
	}
}
