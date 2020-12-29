package generators

import (
	"github.com/bspaans/bleep/audio"
)

// pitch is not supported due to fast performance
type SampleGenerator struct {
	Sample []float64

	// sampleConfig using only for checking its equality with GetSamples func. This is required, cause
	sampleCfg *audio.AudioConfig

	Gain   float64
	Phase  float64
	Offset float64
	Invert bool

	// if true, each GetSample() method will return sample starts with original sample
	SaveState bool

	// specific phase of current generator, works like iteration number
	// currPhase can be from 0 to maximum n-th sample of generator.
	// For example, single wave of any type at 440hz and 44100 sample rate contains ≈ 100 samples, so
	// currPhase at this config can be from 0 to 101
	currPhase int
}

func NewSampleGenerator(sampleConfig *audio.AudioConfig, sample []float64) *SampleGenerator {
	// TODO: use SoX resampler https://github.com/chirlu/sox
	return &SampleGenerator{
		Sample:    sample,
		sampleCfg: sampleConfig,
		Gain:      1.0,
		SaveState: true,
	}
}

func (s *SampleGenerator) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	if !s.sampleCfg.IsEqual(cfg) {
		panic("sample config is different!")
	}

	result := GetEmptySampleArray(cfg, n)

	if s.Sample == nil || s.Gain == 0 {
		return result
	}

	g := cutNegative(s.Gain)
	o := s.Offset

	for i := 0; i < n; i++ {
		samplesCount := len(s.Sample) / s.sampleCfg.GetNumberOfChannels()
		sampleIndex := limitedPhase((s.currPhase + s.phaseOffset() + i), samplesCount)
		sample := getNthSample(cfg, s.Sample, sampleIndex)
		for i, v := range sample {
			sample[i] = v*g + o
			if s.Invert {
				sample[i] = -sample[i]
			}
		}

		writeSample(cfg, result, i, sample)
	}
	if s.SaveState {
		s.currPhase += n
	} else {
		s.currPhase = 0
	}

	return result
}

func (s *SampleGenerator) phaseOffset() int {
	return int(fract(s.Phase) / float64(len(s.Sample)))
}

// f.e. you getting 302-th element of [3]T array. after limiting to len you've got i == 3
func limitedPhase(i, l int) int {
	return i % l
}
