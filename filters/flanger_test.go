package filters

import (
	"testing"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
)

func Test_Flanger_with_zero_rate_and_factor_one_leaves_input_unaffected(t *testing.T) {
	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 44100
	cfg.Stereo = false

	rate := 0.0
	factor := 0.5
	time := 0.1
	filter := NewFlangerFilter(time, factor, rate)

	sine := generators.NewSineWaveOscillator()
	sine.SetPitch(440.0)
	samples := sine.GetSamples(cfg, 44100)

	newSamples := filter.Filter(cfg, samples)
	for i, _ := range newSamples {
		if !almostEqual(samples[i], newSamples[i], 1e-5) {
			t.Errorf("Expecting %dth sample to be %f but got %f (%v diff)\n", i, samples[i], newSamples[i], samples[i]-newSamples[i])
		}
	}
}
