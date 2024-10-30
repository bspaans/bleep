// Generate audio samples
package generators

import (
	"github.com/bspaans/bleep/audio"
)

type Generator interface {

	// GetSamples is the meat of each Generator and returns `n` samples.
	//
	// There are two important variables in cfg that should be considered:
	// * cfg.SampleRate: the number of samples per second; affects pitch
	// * cfg.Stereo: whether or not the output is stereo - should return n*2 samples if so
	//
	// `Pitch`, `PitchbendFactor` and `Gain` can in theory all be ignored
	// (see WhiteNoiseGenerator for one such generator).
	//
	GetSamples(cfg *audio.AudioConfig, n int) []float64 // return samples between -1.0 and 1.0
	SetPitch(float64)
	SetPitchbend(float64)
	SetGain(float64)
}

type BaseGenerator struct {
	Pitch           float64
	PitchbendFactor float64
	Gain            float64
	Phase           int // needs to be updated from GetSamplesFunc

	GetSamplesFunc func(cfg *audio.AudioConfig, n int) []float64
	SetPitchFunc   func(float64)
}

func NewBaseGenerator() *BaseGenerator {
	return &BaseGenerator{
		Pitch:           440.0,
		Gain:            1.0,
		PitchbendFactor: 0.0,
	}
}

func (s *BaseGenerator) GetPitch() float64 {
	if s.PitchbendFactor == 0.0 {
		return s.Pitch
	}
	return s.Pitch * s.PitchbendFactor
}

func (s *BaseGenerator) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	if s.GetSamplesFunc == nil {
		return GetEmptySampleArray(cfg, n)
	}
	return s.GetSamplesFunc(cfg, n)
}

func (s *BaseGenerator) SetPitch(f float64) {
	if s.SetPitchFunc != nil {
		s.SetPitchFunc(f)
	} else {
		s.Pitch = f
	}
}

func (s *BaseGenerator) SetGain(f float64) {
	s.Gain = f
}

func (s *BaseGenerator) SetPitchbend(f float64) {
	s.PitchbendFactor = f
}

func (g *BaseGenerator) IncrementPhase(waveLength int) {
	if g.Phase == MaxInt {
		g.Phase = MaxInt % waveLength
	}
	g.Phase++
}

func SetResult(cfg *audio.AudioConfig, result []float64, i int, v float64) {
	if !cfg.Stereo {
		result[i] = v
	} else {
		result[i*2] = v
		result[i*2+1] = v
	}
}

func GetEmptySampleArray(cfg *audio.AudioConfig, n int) []float64 {
	if cfg.Stereo {
		return make([]float64, n*2)
	}
	return make([]float64, n)
}

func ToInstrument(g func() Generator) func(cfg *audio.AudioConfig) Generator {
	return func(cfg *audio.AudioConfig) Generator {
		return g()
	}
}
