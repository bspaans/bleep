package generators

import (
	"math"
)

func NewSineWaveOscillator() *BaseGenerator {
	gen := NewBaseGenerator()
	gen.GetSamplesFunc = gen.getGeneralSampleGetter(sineWave)
	return gen
}

func NewSineWaveOscillatorAdvanced() *AdvancedGenerator {
	gen := NewAdvancedGenerator()
	gen.GetSamplesFunc = gen.getGeneralSampleGetter(sineWave)
	return gen
}

func sineWave(phase float64) float64 {
	return math.Sin(math.Pi*2*phase) / 2
}
