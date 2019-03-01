package main

import (
	"fmt"
	"math"
)

type AudioConfig struct {
	BitRate    int
	SampleRate int
}

func NewAudioConfig() *AudioConfig {
	return &AudioConfig{
		BitRate:    256,
		SampleRate: 44000,
	}
}

type Generator interface {
	GetSamples(n int) []uint8
}

type SineWaveOscillator struct {
	Pitch  float64
	Period float64
}

func NewSineWaveOscillator() *SineWaveOscillator {
	return &SineWaveOscillator{
		Pitch:  1.0,
		Period: 0.0,
	}
}

func (s *SineWaveOscillator) GetSamples(cfg *AudioConfig, n int) []uint8 {
	result := make([]uint8, n)
	stepSize := (s.Pitch * math.Pi * 2) / float64(cfg.SampleRate)
	for i := 0; i < n; i++ {
		fmt.Println(math.Sin(s.Period))
		s.Period += stepSize
	}
	return result
}

func main() {
	cfg := NewAudioConfig()
	fmt.Println(NewSineWaveOscillator().GetSamples(cfg, 100))
}
