package generators

import (
	"math"

	"github.com/bspaans/bs8bs/audio"
)

type SineWaveOscillator struct {
	Pitch           float64
	PitchbendFactor float64
	Period          float64
	Gain            float64
}

func NewSineWaveOscillator() Generator {
	return &SineWaveOscillator{
		Pitch:  440.0,
		Period: 0.0,
		Gain:   1.0,
	}
}

func (s *SineWaveOscillator) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	result := make([]float64, n)
	if s.Pitch == 0.0 {
		return result
	}
	pitch := s.Pitch
	if s.PitchbendFactor != 0.0 {
		pitch *= s.PitchbendFactor
	}
	stepSize := (pitch * math.Pi * 2) / float64(cfg.SampleRate)
	for i := 0; i < n; i++ {
		v := math.Sin(s.Period)
		result[i] = s.Gain * v
		s.Period += stepSize
	}
	return result
}

func (s *SineWaveOscillator) SetPitch(f float64) {
	s.Pitch = f
	s.Period = 0.0
}

func (s *SineWaveOscillator) SetGain(f float64) {
	s.Gain = f
}

func (s *SineWaveOscillator) SetPitchbend(f float64) {
	s.PitchbendFactor = f
}
