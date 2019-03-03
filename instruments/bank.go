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
		return generators.NewEnvelopeGenerator(generators.NewSineWaveOscillator(), 0.001, 4.0, 0.5, 0.24)
	}

	// Overdrive guitar
	Bank[29] = func() generators.Generator {
		return generators.NewFilteredGenerator(
			generators.NewEnvelopeGenerator(generators.NewSineWaveOscillator(), 0.001, 4.0, 0.8, 0.24),
			filters.NewOverdriveFilter(4.5),
		)
	}

	// Square wave
	Bank[80] = func() generators.Generator {
		return generators.NewEnvelopeGenerator(generators.NewSquareWaveOscillator(), 0.01, 4.0, 0.4, 0.25)
	}

	// Saw wave
	Bank[81] = func() generators.Generator {
		return generators.NewEnvelopeGenerator(generators.NewSawtoothWaveOscillator(), 0.01, 4.0, 0.4, 0.25)
	}

	// Fifths saw wave
	Bank[86] = func() generators.Generator {
		return generators.NewCombinedGenerators(
			generators.NewEnvelopeGenerator(generators.NewSawtoothWaveOscillator(), 0.01, 4.0, 0.4, 0.25),
			generators.NewTransposingGenerator(
				generators.NewEnvelopeGenerator(generators.NewSawtoothWaveOscillator(), 0.01, 4.0, 0.4, 0.25),
				5.0, // semitones
				0.5, // gain factor
			),
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
