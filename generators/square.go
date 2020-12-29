package generators

func NewSquareWaveOscillator() *BaseGenerator {
	gen := NewBaseGenerator()
	gen.GetSamplesFunc = gen.getGeneralSampleGetter(squareWave)
	return gen
}

func NewSquareWaveOscillatorAdvanced() *AdvancedGenerator {
	gen := NewAdvancedGenerator()
	gen.GetSamplesFunc = gen.getGeneralSampleGetter(squareWave)
	return gen
}

func squareWave(phase float64) float64 {
	if fract(phase) < 0.5 {
		return 0.5
	}
	return -0.5
}
