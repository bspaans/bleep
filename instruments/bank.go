package instruments

import "github.com/bspaans/bs8bs/generators"

var Bank = make([]generators.Generator, 256)

func init() {
	for i := 0; i < 256; i++ {
		if i%2 == 0 {
			Bank[i] = generators.NewSineWaveOscillator()
		} else {
			Bank[i] = generators.NewSquareWaveOscillator()
		}

	}
}
