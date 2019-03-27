package generators

import (
	"testing"

	"github.com/bspaans/bleep/audio"
)

func Test_Sine_GetSamples_sanity_check(t *testing.T) {
	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 100
	cfg.Stereo = false
	osc := NewSineWaveOscillator()
	osc.SetPitch(1.0)
	samples := osc.GetSamples(cfg, 100)
	if len(samples) != 100 {
		t.Errorf("Want 100 samples, got %v", len(samples))
	}
	if samples[0] != 0.0 {
		t.Errorf("Expecting first sample to be 0, got: %v", samples[0])
	}
	if samples[100/4] != 1.0 {
		t.Errorf("Expecting peak at 1/4, got: %v", samples[100/4])
	}
	if samples[100/2] <= 0.0 && samples[100/2] > 0.0000000000000001 {
		t.Errorf("Expecting peak at 1/2, got: %v", samples[50])
	}
	if samples[100/4*3] != -1.0 {
		t.Errorf("Expecting peak at 3/4, got: %v", samples[100/4*3])
	}
}

func Test_Sine_GetSamples_number_of_peaks_equals_pitch(t *testing.T) {
	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 44000
	cfg.Stereo = false
	osc := NewSineWaveOscillator()
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
