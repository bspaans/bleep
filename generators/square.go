package generators

import (
	"math"

	"github.com/bspaans/bs8bs/audio"
)

type SquareWaveOscillator struct {
	Pitch  float64
	Period int
	Gain   float64
}

func NewSquareWaveOscillator() Generator {
	return &SquareWaveOscillator{
		Pitch:  440.0,
		Period: 0,
		Gain:   1.0,
	}
}

func (s *SquareWaveOscillator) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	result := make([]float64, n)
	if s.Pitch == 0.0 {
		return result
	}
	flipEvery := (float64(cfg.SampleRate) / 2) / s.Pitch
	for i := 0; i < n; i++ {
		v := 1.0
		if int(math.Floor(float64(s.Period)/flipEvery))%2 == 1 {
			v = -1.0
		}
		result[i] = v * s.Gain
		s.Period++
	}
	return result
}

func (s *SquareWaveOscillator) SetPitch(f float64) {
	s.Pitch = f
}

func (s *SquareWaveOscillator) SetGain(f float64) {
	s.Gain = f
}
