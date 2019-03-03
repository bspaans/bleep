package generators

import (
	"github.com/bspaans/bs8bs/audio"
)

type SawtoothWaveOscillator struct {
	Pitch           float64
	PitchbendFactor float64
	Period          int
	Gain            float64
}

func NewSawtoothWaveOscillator() Generator {
	return &SawtoothWaveOscillator{
		Pitch:  440.0,
		Period: 0,
		Gain:   1.0,
	}
}

func (s *SawtoothWaveOscillator) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	result := make([]float64, n)
	if s.Pitch == 0.0 {
		return result
	}
	pitch := s.Pitch
	if s.PitchbendFactor != 0.0 {
		pitch *= s.PitchbendFactor
	}
	flipEvery := (float64(cfg.SampleRate)) / pitch
	stepSize := 2.0 / flipEvery
	for i := 0; i < n; i++ {
		v := -1.0 + float64(s.Period)*stepSize
		result[i] = v * s.Gain
		s.Period++
		if s.Period >= int(flipEvery) {
			s.Period = 0
		}
	}
	return result
}

func (s *SawtoothWaveOscillator) SetPitch(f float64) {
	s.Pitch = f
	s.Period = 0
}

func (s *SawtoothWaveOscillator) SetGain(f float64) {
	s.Gain = f
}

func (s *SawtoothWaveOscillator) SetPitchbend(f float64) {
	s.PitchbendFactor = f
}
