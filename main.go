package main

import (
	"fmt"
	"math"
	"os"

	"github.com/go-audio/audio"
	"github.com/go-audio/wav"
)

type AudioConfig struct {
	BitDepth   int
	SampleRate int
}

func NewAudioConfig() *AudioConfig {
	return &AudioConfig{
		BitDepth:   8,
		SampleRate: 44000,
	}
}

type Generator interface {
	GetSamples(n int) []int
}

type SineWaveOscillator struct {
	Pitch  float64
	Period float64
}

func NewSineWaveOscillator() *SineWaveOscillator {
	return &SineWaveOscillator{
		Pitch:  440.0,
		Period: 0.0,
	}
}

func (s *SineWaveOscillator) GetSamples(cfg *AudioConfig, n int) []int {
	result := make([]int, n)
	stepSize := (s.Pitch * math.Pi * 2) / float64(cfg.SampleRate)
	maxValue := math.Pow(2, float64(cfg.BitDepth))
	for i := 0; i < n; i++ {
		v := math.Sin(s.Period)
		scaled := (v + 1) * (maxValue / 2)
		clipped := math.Min(math.Max(0, math.Ceil(scaled)), maxValue)
		result[i] = int(clipped)
		s.Period += stepSize
	}
	return result
}

func WriteWavFile(cfg *AudioConfig, samples []int, file string) error {

	out, err := os.Create(file)
	if err != nil {
		panic(fmt.Sprintf("couldn't create output file - %v", err))
	}
	numChans := 1
	audioFormat := 1 // PCM
	encoder := wav.NewEncoder(out, cfg.SampleRate, cfg.BitDepth, numChans, audioFormat)

	buf := &audio.IntBuffer{
		Format: &audio.Format{
			NumChannels: numChans,
			SampleRate:  cfg.SampleRate,
		},
		Data:           samples,
		SourceBitDepth: cfg.BitDepth,
	}

	if err := encoder.Write(buf); err != nil {
		return err
	}
	if err = encoder.Close(); err != nil {
		return err
	}
	return nil
}

func main() {
	cfg := NewAudioConfig()
	samples := NewSineWaveOscillator().GetSamples(cfg, cfg.SampleRate)
	WriteWavFile(cfg, samples, "test.wav")
}
