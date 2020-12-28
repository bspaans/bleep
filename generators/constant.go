package generators

import (
	"github.com/bspaans/bleep/audio"
)

// NewConstantOscillator creates generator with always constant value in sample out.
// You can use it as input for constant pitch, gain, etc. for setting dynamic parameters in other generators.
func NewConstantOscillator(value float64) Generator {
	g := NewBaseGenerator()
	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		for i := range result {
			result[i] = value
		}
		return result
	}
	return g
}
