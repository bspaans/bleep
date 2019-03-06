package filters

import (
	"math"
	"testing"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
)

func almostEqual(a, b, threshold float64) bool {
	return math.Abs(a-b) <= threshold
}

func Test_DFTBaseFilter_picks_up_right_freq_with_N_equals_sample_rate(t *testing.T) {

	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 44100
	cfg.Stereo = false
	sine := generators.NewSineWaveOscillator()
	sine.SetPitch(440.0)
	samples := sine.GetSamples(cfg, 44100)

	filter := NewDFTBaseFilter()

	max := 0.0
	maxMagnitude := 0.0

	filter.FreqFilter = func(cfg *audio.AudioConfig, freqs []complex64) []complex64 {
		for k, c := range freqs {
			freq := float64(k) * (float64(cfg.SampleRate) / float64(len(freqs)))
			magnitude := math.Sqrt(math.Pow(float64(real(c)), 2) + math.Pow(float64(imag(c)), 2))
			if magnitude >= maxMagnitude {
				max = freq
				maxMagnitude = magnitude
			}
		}
		return freqs
	}
	newSamples := filter.Filter(cfg, samples)

	if max != 440 {
		t.Errorf("Expecting DFT to pick up sample pitch of 440Hz, got %fHz", max)
	}
	for i, _ := range newSamples {
		if !almostEqual(samples[i], newSamples[i], 1e-6) {
			t.Errorf("Expecting %dth sample to be %f but got %f (%v diff)\n", i, samples[i], newSamples[i], samples[i]-newSamples[i])
		}
	}
}

func Test_DFTBaseFilter_picks_up_right_freq_with_N_smaller_than_sample_rate(t *testing.T) {

	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 44100
	cfg.Stereo = false
	sine := generators.NewSineWaveOscillator()
	sine.SetPitch(4400.0)
	samples := sine.GetSamples(cfg, 441)

	filter := NewDFTBaseFilter()

	max := 0.0
	maxMagnitude := 0.0

	filter.FreqFilter = func(cfg *audio.AudioConfig, freqs []complex64) []complex64 {
		for k, c := range freqs {
			freq := float64(k) * (float64(cfg.SampleRate) / float64(len(freqs)))
			magnitude := math.Sqrt(math.Pow(float64(real(c)), 2) + math.Pow(float64(imag(c)), 2))
			if magnitude >= maxMagnitude {
				max = freq
				maxMagnitude = magnitude
			}
		}
		return freqs
	}
	newSamples := filter.Filter(cfg, samples)

	if max != 4400 {
		t.Errorf("Expecting DFT to pick up sample pitch of 4400Hz, got %fHz", max)
	}
	for i, _ := range newSamples {
		if !almostEqual(samples[i], newSamples[i], 1e-6) {
			t.Errorf("Expecting %dth sample to be %f but got %f (%v diff)\n", i, samples[i], newSamples[i], samples[i]-newSamples[i])
		}
	}
}
