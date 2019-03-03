package generators

import (
	"github.com/bspaans/bs8bs/audio"
)

type TriangleWaveOscillator struct {
	Pitch           float64
	PitchbendFactor float64
	Period          int
	Gain            float64
}

func NewTriangleWaveOscillator() Generator {
	return &TriangleWaveOscillator{
		Pitch:  440.0,
		Period: 0,
		Gain:   1.0,
	}
}

func (s *TriangleWaveOscillator) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	result := make([]float64, n)
	if s.Pitch == 0.0 {
		return result
	}
	pitch := s.Pitch
	if s.PitchbendFactor != 0.0 {
		pitch *= s.PitchbendFactor
	}
	flipEvery := (float64(cfg.SampleRate)) / pitch / 2
	stepSize := 2.0 / flipEvery
	for i := 0; i < n; i++ {
		v := 0.0
		if float64(s.Period) < flipEvery {
			v = -1.0 + float64(s.Period)*stepSize
		} else {
			v = 1.0 - (float64(s.Period)-flipEvery)*stepSize
		}
		result[i] = v * s.Gain
		s.Period++
		if s.Period >= int(flipEvery*2) {
			s.Period = 0
		}
	}
	return result
}

func (s *TriangleWaveOscillator) SetPitch(f float64) {
	s.Pitch = f
}

func (s *TriangleWaveOscillator) SetGain(f float64) {
	s.Gain = f
}

func (s *TriangleWaveOscillator) SetPitchbend(f float64) {
	s.PitchbendFactor = f
}
