package generators

import (
	"testing"

	"github.com/bspaans/bleep/audio"
)

func Test_Triangle_GetSamples_sanity_check(t *testing.T) {
	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 100
	cfg.Stereo = false
	osc := NewTriangleWaveOscillator()
	osc.SetPitch(1.0)
	samples := osc.GetSamples(cfg, 101)
	if len(samples) != 101 {
		t.Errorf("Want 100 samples, got %v", len(samples))
	}
	if samples[0] != -1.0 {
		t.Errorf("Expecting first sample to be -1.0, got: %v", samples[0])
	}
	if samples[100/4] != 0.0 {
		t.Errorf("Expecting peak at 1/4, got: %v", samples[100/4])
	}
	if samples[100/2] != 1.0 {
		t.Errorf("Expecting peak at 1/2, got: %f", samples[100/2])
	}
	if samples[100/4*3] != 0.0 {
		t.Errorf("Expecting peak at 3/4, got: %v", samples[100/4*3])
	}
	if samples[100] != -1.0 {
		t.Errorf("Expecting first sample of new sequence to be -1.0, got: %v", samples[100])
	}
}

func Test_Triangle_GetSamples_stereo_sanity_check(t *testing.T) {
	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 100
	cfg.Stereo = true
	osc := NewTriangleWaveOscillator()
	osc.SetPitch(1.0)
	samples := osc.GetSamples(cfg, 101)
	if len(samples) != 202 {
		t.Errorf("Want 101x2 samples, got %v", len(samples))
	}
	if samples[0] != -1.0 {
		t.Errorf("Expecting first sample to be -1.0, got: %v", samples[0])
	}
	if samples[1] != -1.0 {
		t.Errorf("Expecting second sample to be -1.0, got: %v", samples[1])
	}
	if samples[200/4] != 0.0 {
		t.Errorf("Expecting peak at 1/4, got: %v", samples[200/4])
	}
	if samples[200/4+1] != 0.0 {
		t.Errorf("Expecting peak at 1/4+1, got: %v", samples[200/4+1])
	}
	if samples[200/2] != 1.0 {
		t.Errorf("Expecting peak at 1/2, got: %f", samples[200/2])
	}
	if samples[200/2+1] != 1.0 {
		t.Errorf("Expecting peak at 1/2+1, got: %f", samples[200/2+1])
	}
	if samples[200/4*3] != 0.0 {
		t.Errorf("Expecting peak at 3/4, got: %v", samples[200/4*3])
	}
	if samples[200/4*3+1] != 0.0 {
		t.Errorf("Expecting peak at 3/4+1, got: %v", samples[200/4*3+1])
	}
	if samples[200] != -1.0 {
		t.Errorf("Expecting first sample of new sequence to be -1.0, got: %v", samples[100])
	}
}
