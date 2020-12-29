package generators

import (
	"math"
)

func NewTriangleWaveOscillator() *BaseGenerator {
	gen := NewBaseGenerator()
	gen.GetSamplesFunc = gen.getGeneralSampleGetter(triangleWave)
	return gen
}

func NewTriangleWaveOscillatorAdvanced() *AdvancedGenerator {
	gen := NewAdvancedGenerator()
	gen.GetSamplesFunc = gen.getGeneralSampleGetter(triangleWave)
	return gen
}

func triangleWave(phase float64) float64 {
	phase = fract(phase)
	if phase < 0.5 {
		return -math.Abs(math.Abs(2*phase)-0.5) + 0.5
	}
	return math.Abs(math.Abs(2*phase-2)-0.5) - 0.5
}
