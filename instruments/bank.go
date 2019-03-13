package instruments

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
)

type BankType func(cfg *audio.AudioConfig) generators.Generator

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
