package instruments

import (
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
}
