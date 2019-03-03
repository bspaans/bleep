package instruments

import (
	"github.com/bspaans/bs8bs/filters"
	"github.com/bspaans/bs8bs/generators"
	"github.com/bspaans/bs8bs/generators/derived"
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

	// Bright piano
	Bank[0] = func() generators.Generator {
		return derived.NewFilteredGenerator(
			generators.NewEnvelopeGenerator(
				derived.NewHarmonicsGenerator(generators.NewSineWaveOscillator, 5),
				0.1, 0.5, 0.4, 1.0,
			),
			filters.NewDelayFilter(0.01, 0.4),
		)
	}

	// Steel string guitar
	Bank[25] = func() generators.Generator {
		return generators.NewEnvelopeGenerator(generators.NewSineWaveOscillator(), 0.001, 4.0, 0.5, 0.24)
	}

	// Overdrive guitar
	Bank[29] = func() generators.Generator {
		return derived.NewFilteredGenerator(
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

	// Syn charang
	Bank[84] = func() generators.Generator {
		return generators.NewEnvelopeGenerator(generators.NewTriangleWaveOscillator(), 0.01, 4.0, 0.4, 0.25)
	}

	// Fifths saw wave
	Bank[86] = func() generators.Generator {
		return derived.NewCombinedGenerators(
			generators.NewEnvelopeGenerator(generators.NewSawtoothWaveOscillator(), 0.01, 4.0, 0.4, 0.25),
			derived.NewTransposingGenerator(
				generators.NewEnvelopeGenerator(generators.NewSawtoothWaveOscillator(), 0.01, 4.0, 0.4, 0.25),
				5.0, // semitones
				0.5, // gain factor
			),
		)
	}

	// Warm pad
	Bank[89] = func() generators.Generator {
		return derived.NewFilteredGenerator(
			generators.NewEnvelopeGenerator(generators.NewSineWaveOscillator(), 0.5, 4.0, 0.4, 0.25),
			filters.NewDelayFilter(1.0, 0.8),
		)
	}
}
