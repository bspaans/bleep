package filters

import (
	"math"
	"testing"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
)

func Test_DFTBaseFilter_sanity_check(t *testing.T) {

	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 44100
	cfg.Stereo = false
	sine := generators.NewSineWaveOscillator()
	sine.SetPitch(440.0)
	samples := sine.GetSamples(cfg, 1200)

	N := 44100
	filter := NewDFTBaseFilter(N)

	max := 0.0
	maxMagnitude := 0.0

	filter.FreqFilter = func(cfg *audio.AudioConfig, freqs []complex64) []complex64 {
		for k, c := range freqs {
			freq := float64(k) * (float64(cfg.SampleRate) / float64(N))
			magnitude := math.Sqrt(math.Pow(float64(real(c)), 2) + math.Pow(float64(imag(c)), 2))
			if magnitude >= maxMagnitude {
				max = freq
				maxMagnitude = magnitude
			}
		}
		return freqs
	}
	filter.Filter(cfg, samples)

	if max != 440 {
		t.Errorf("Expecting DFT to pick up sample pitch of 440Hz, got %fHz", max)
	}
}
