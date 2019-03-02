package generators

import (
	"math/rand"

	"github.com/bspaans/bs8bs/audio"
)

type WhiteNoiseGenerator struct {
	Pitch float64
}

func NewWhiteNoiseGenerator() Generator {
	return &WhiteNoiseGenerator{}
}

func (s *WhiteNoiseGenerator) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	result := make([]float64, n)
	if s.Pitch == 0.0 {
		return result
	}
	for i := 0; i < n; i++ {
		result[i] = rand.Float64()*2 - 1
	}
	return result
}

func (s *WhiteNoiseGenerator) SetPitch(f float64) {
	s.Pitch = f
}
