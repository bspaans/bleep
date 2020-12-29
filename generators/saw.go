package generators

func NewSawtoothWaveOscillator() *BaseGenerator {
	gen := NewBaseGenerator()
	gen.GetSamplesFunc = gen.getGeneralSampleGetter(sawtoothWave)
	return gen
}

func NewSawtoothWaveOscillatorAdvanced() *AdvancedGenerator {
	gen := NewAdvancedGenerator()
	gen.GetSamplesFunc = gen.getGeneralSampleGetter(sawtoothWave)
	return gen
}

func sawtoothWave(phase float64) float64 {
	return fract(phase) - 0.5
}
