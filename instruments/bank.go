package instruments

import (
	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/generators"
)

type BankType func(cfg *audio.AudioConfig) generators.Generator
type Instrument BankType

var Bank = make([]BankType, 128)
var PercussionBank = make([]BankType, 128)
var Banks = [][]BankType{Bank, PercussionBank}

func init() {
	withCfg := func(g func() generators.Generator) BankType {
		return func(cfg *audio.AudioConfig) generators.Generator {
			return g()
		}
	}
	for i := 0; i < len(Bank); i++ {
		if i%2 == 0 {
			Bank[i] = withCfg(generators.NewSineWaveOscillator)
		} else {
			Bank[i] = withCfg(generators.NewSquareWaveOscillator)
		}
	}
}
