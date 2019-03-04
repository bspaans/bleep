package generators

import (
	"testing"

	"github.com/bspaans/bs8bs/audio"
)

func Test_Square_GetSamples_sanity_check(t *testing.T) {
	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 100
	osc := NewSquareWaveOscillator()
	osc.SetPitch(1.0)
	samples := osc.GetSamples(cfg, 100)
	if len(samples) != 100 {
		t.Errorf("Want 100 samples, got %v", len(samples))
	}
	if samples[0] != 1.0 {
		t.Errorf("Expecting peak at first sample, got: %v", samples[0])
	}
	if samples[100/4] != 1.0 {
		t.Errorf("Expecting peak at 1/4, got: %v", samples[100/4])
	}
	if samples[100/2] != -1.0 {
		t.Errorf("Expecting -1 at 1/2, got: %v", samples[50])
	}
	if samples[100/4*3] != -1.0 {
		t.Errorf("Expecting -1 at 3/4, got: %v", samples[100/4*3])
	}
}

func Test_Square_GetSamples_stereo_sanity_check(t *testing.T) {
	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 100
	cfg.Stereo = true
	osc := NewSquareWaveOscillator()
	osc.SetPitch(1.0)
	samples := osc.GetSamples(cfg, 100)
	if len(samples) != 200 {
		t.Errorf("Want 100x2 samples, got %v", len(samples))
	}
	if samples[0] != 1.0 {
		t.Errorf("Expecting peak at first sample, got: %v", samples[0])
	}
	if samples[1] != 1.0 {
		t.Errorf("Expecting peak at second sample, got: %v", samples[1])
	}
	if samples[200/4] != 1.0 {
		t.Errorf("Expecting peak at 1/4, got: %v", samples[200/4])
	}
	if samples[200/4+1] != 1.0 {
		t.Errorf("Expecting peak at 1/4 + 1, got: %v", samples[200/4+1])
	}
	if samples[200/2] != -1.0 {
		t.Errorf("Expecting -1 at 1/2, got: %v", samples[100])
	}
	if samples[200/2+1] != -1.0 {
		t.Errorf("Expecting -1 at 1/2+1, got: %v", samples[101])
	}
	if samples[200/4*3] != -1.0 {
		t.Errorf("Expecting -1 at 3/4, got: %v", samples[200/4*3])
	}
	if samples[200/4*3+1] != -1.0 {
		t.Errorf("Expecting -1 at 3/4 + 1, got: %v", samples[200/4*3+1])
	}
}

func Test_Square_GetSamples_number_of_peaks_equals_pitch(t *testing.T) {
	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 44000
	osc := NewSquareWaveOscillator()
	osc.SetPitch(440.0)
	samples := osc.GetSamples(cfg, 44000)
	if len(samples) != 44000 {
		t.Errorf("Want 44000 samples, got %v", len(samples))
	}
	peaks := CountPeaksInSamples(samples)
	if float64(peaks) != 440.0 {
		t.Errorf("Expecting the number of peaks to correspond with the pitch; got %v peaks", peaks)
	}
}
