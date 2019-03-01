package generators

import (
	"math"

	"github.com/bspaans/bs8bs/audio"
)

type SquareWaveOscillator struct {
	Pitch  float64
	Period int
}

func NewSquareWaveOscillator() *SquareWaveOscillator {
	return &SquareWaveOscillator{
		Pitch:  440.0,
		Period: 0,
	}
}

func (s *SquareWaveOscillator) GetSamples(cfg *audio.AudioConfig, n int) []int {
	result := make([]int, n)
	flipEvery := (float64(cfg.SampleRate) / 2) / s.Pitch
	maxValue := int(math.Pow(2, float64(cfg.BitDepth)))
	for i := 0; i < n; i++ {
		v := maxValue - 1
		if int(math.Floor(float64(s.Period)/flipEvery))%2 == 1 {
			v = 0
		}
		result[i] = v
		s.Period++
	}
	return result
}

func (s *SquareWaveOscillator) SetPitch(f float64) {
	s.Pitch = f
}
