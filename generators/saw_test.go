package generators

import (
	"testing"

	"github.com/bspaans/bs8bs/audio"
)

func Test_Sawtooth_GetSamples_sanity_check(t *testing.T) {
	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 100
	cfg.Stereo = false
	osc := NewSawtoothWaveOscillator()
	osc.SetPitch(1.0)
	samples := osc.GetSamples(cfg, 100)
	if len(samples) != 100 {
		t.Errorf("Want 100 samples, got %v", len(samples))
	}
	if samples[0] != -1.0 {
		t.Errorf("Expecting first sample to be -1.0, got: %v", samples[0])
	}
	if samples[100/4] != -0.5 {
		t.Errorf("Expecting peak at 1/4, got: %v", samples[100/4])
	}
	if samples[100/2] <= 0.0 && samples[100/2] > 0.0000000000000001 {
		t.Errorf("Expecting peak at 1/2, got: %v", samples[50])
	}
	if samples[100/4*3] != 0.5 {
		t.Errorf("Expecting peak at 3/4, got: %v", samples[100/4*3])
	}
}
