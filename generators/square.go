package generators

import "github.com/bspaans/bs8bs/audio"

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
	for i := 0; i < n; i++ {
		result[i] = 256
	}
	return result
}
