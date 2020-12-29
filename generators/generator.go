// Generate audio samples
package generators

import (
	"github.com/bspaans/bleep/audio"
)

type Generator interface {
	// GetSamples is the meat of each Generator and returns `n` samples. each samble value can be any value
	//
	// There are two important variables in cfg that should be considered:
	// * cfg.SampleRate: the number of samples per second; affects pitch
	// * cfg.Stereo: whether or not the output is stereo - should return n*2 samples if so
	GetSamples(cfg *audio.AudioConfig, n int) []float64
}

//==========================================================================================================//
//                                              BaseGenerator                                               //
//==========================================================================================================//

// BaseGenerator is a simple struct which implements general stuff of any simple wave generator.
type BaseGenerator struct {
	Pitch  float64
	Gain   float64
	Phase  float64
	Offset float64

	// if true, total sample will be reversed. This is ALREADY implemented in GetSamples of generator
	Invert bool

	// specific phase of current generator, works like iteration number
	// currPhase can be from 0 to maximum n-th sample of generator.
	// For example, single wave of any type at 440hz and 44100 sample rate contains ≈ 100 samples, so
	// currPhase can be from 0 to 101
	currPhase int

	// lastSample is... last sample. It uses for continue generating wave without any crackles
	// default (saw, square, sine, triangle) doesn't use it, but you can make some stuff with it
	lastSample float64

	GetSamplesFunc func(cfg *audio.AudioConfig, n int) []float64
}

func NewBaseGenerator() *BaseGenerator {
	return &BaseGenerator{
		Pitch: 440.0,
		Gain:  1.0,
	}
}

func (s *BaseGenerator) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	if s.GetSamplesFunc == nil {
		return GetEmptySampleArray(cfg, n)
	}

	res := s.GetSamplesFunc(cfg, n)
	if s.Invert {
		for i, v := range res {
			res[i] = -v
		}
	}
	return res
}

func (s *BaseGenerator) getGeneralSampleGetter(wavefunc func(float64) float64) func(cfg *audio.AudioConfig, n int) []float64 {
	return func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		if s.Pitch == 0 || s.Gain == 0 {
			return result // already empty
		}

		g := cutNegative(s.Gain)
		o := s.Offset
		for i := 0; i < n; i++ {
			p := float64(s.currPhase+i)/float64(waveLengthInSamples(cfg, s.Pitch)) + s.Phase
			// wave phase times gain plus offset is result
			res := wavefunc(p)*g + o

			writeSampleToAll(cfg, result, i, res)
		}
		s.currPhase += n

		if s.currPhase > cfg.SampleRate {
			s.currPhase %= cfg.SampleRate
		}

		return result
	}
}

// AdvancedGenerator is a template (or if you want, a skeleton) of other generators including wav reader
// Main difference that BaseGenerator use constant main values, but AdvancedGenerator using another generators
// Generators in all properties are working like LFO, but you can set it as you want
type AdvancedGenerator struct {
	Pitch  Generator // Pitch of wave
	Gain   Generator // Well, it's a gain
	Phase  Generator // Phase is like offset of wave, if you want
	Offset Generator // Offset raw value which adds to total sample

	// if true, total sample will be reversed. This is ALREADY implemented in GetSamples of generator
	Invert bool

	// specific phase of current generator, works like iteration number
	// currPhase can be from 0 to maximum n-th sample of generator.
	// For example, single wave of any type at 440hz and 44100 sample rate contains ≈ 100 samples, so
	// currPhase can be from 0 to 101
	currPhase int

	// lastSample is... last sample. It uses for continue generating wave without any crackles
	lastSample float64

	GetSamplesFunc func(cfg *audio.AudioConfig, n int) []float64
}

func NewAdvancedGenerator() *AdvancedGenerator {
	return &AdvancedGenerator{
		Pitch:  NewConstantOscillator(440),
		Gain:   NewConstantOscillator(1),
		Phase:  NewConstantOscillator(0),
		Offset: NewConstantOscillator(0),
	}
}

func (s *AdvancedGenerator) GetCurrentPhase() int {
	return s.currPhase
}

func (s *AdvancedGenerator) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	res := GetEmptySampleArray(cfg, n)
	if s.GetSamplesFunc != nil {
		res = s.GetSamplesFunc(cfg, n)
	}
	if s.Invert {
		for i, v := range res {
			res[i] = -v
		}
	}
	return res
}

func (s *AdvancedGenerator) getGeneralSampleGetter(wavefunc func(float64) float64) func(cfg *audio.AudioConfig, n int) []float64 {
	return func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		pitch := s.Pitch.GetSamples(cfg, n)
		gain := s.Gain.GetSamples(cfg, n)
		phase := s.Phase.GetSamples(cfg, n)
		offset := s.Offset.GetSamples(cfg, n)
		if allElementsZero(pitch) || allElementsZero(gain) {
			return result // already empty
		}

		for i := 0; i < n; i++ {
			p := float64(s.currPhase)/float64(waveLengthInSamples(cfg, pitch[i])) + phase[i]
			g := cutNegative(gain[i])
			o := offset[i]

			// wave phase times gain plus offset is result
			res := wavefunc(p)*g + o

			writeSampleToAll(cfg, result, i, res)

			s.currPhase++
		}

		if s.currPhase > cfg.SampleRate {
			s.currPhase %= cfg.SampleRate
		}

		return result
	}
}
