package derived

import (
	"math"
	"testing"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
)

func testADSRSection(samples []float64, offset, n int, expect func(int) float64, t *testing.T) {
	for i := 0; i < n; i++ {
		e := expect(i)
		v := samples[i+offset]
		epsilon := math.Abs(v - e)
		if epsilon >= 0.000000000000001 {
			t.Errorf("Expecting %dth sample to be %v, got: %v", i+offset, e, samples[i+offset])
		}
	}
}

func Test_ADSR_Sanity_check(t *testing.T) {
	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 100
	g := generators.NewSquareWaveOscillator()
	env := NewEnvelopeGenerator(g, 0.1, 0.1, 0.5, 0.1)
	env.SustainHold = 0.1
	env.SetPitch(0.5) // all 1s

	samples := env.GetSamples(cfg, 100)
	if len(samples) != 100 {
		t.Errorf("Want 100 samples, got %v", len(samples))
	}
	if samples[0] != 0.0 {
		t.Errorf("Expecting first sample to be 0, got: %v", samples[0])
	}
	testADSRSection(samples, 0, 10, func(i int) float64 { return float64(i) * 0.1 }, t)
	testADSRSection(samples, 10, 10, func(i int) float64 { return 1.0 - float64(i)*0.05 }, t)
	testADSRSection(samples, 20, 10, func(i int) float64 { return env.Sustain }, t)
	testADSRSection(samples, 30, 10, func(i int) float64 { return 0.5 - float64(i)*0.05 }, t)
}

func Test_ADSR_stereo_Sanity_check(t *testing.T) {
	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 100
	cfg.Stereo = true
	g := generators.NewSquareWaveOscillator()
	env := NewEnvelopeGenerator(g, 0.1, 0.1, 0.5, 0.1)
	env.SustainHold = 0.1
	env.SetPitch(0.5) // all 1s

	samples := env.GetSamples(cfg, 100)
	if len(samples) != 200 {
		t.Errorf("Want 100x2 samples, got %v", len(samples))
	}
	testADSRSection(samples, 0, 20, func(i int) float64 { return float64(i/2) * 0.1 }, t)
	testADSRSection(samples, 20, 20, func(i int) float64 { return 1.0 - float64(i/2)*0.05 }, t)
	testADSRSection(samples, 40, 20, func(i int) float64 { return env.Sustain }, t)
	testADSRSection(samples, 60, 20, func(i int) float64 { return 0.5 - float64(i/2)*0.05 }, t)
}

func Test_ADSR_Sanity_check_attack(t *testing.T) {
	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 100
	g := generators.NewSquareWaveOscillator()
	env := NewEnvelopeGenerator(g, 0.2, 0.1, 0.5, 0.1)
	env.SustainHold = 0.1
	env.SetPitch(0.5) // all 1s

	samples := env.GetSamples(cfg, 100)
	if len(samples) != 100 {
		t.Errorf("Want 100 samples, got %v", len(samples))
	}
	if samples[0] != 0.0 {
		t.Errorf("Expecting first sample to be 0, got: %v", samples[0])
	}
	testADSRSection(samples, 0, 20, func(i int) float64 { return float64(i) * 0.05 }, t)
	testADSRSection(samples, 20, 10, func(i int) float64 { return 1.0 - float64(i)*0.05 }, t)
	testADSRSection(samples, 30, 10, func(i int) float64 { return env.Sustain }, t)
	testADSRSection(samples, 40, 10, func(i int) float64 { return 0.5 - float64(i)*0.05 }, t)
}

func Test_ADSR_Sanity_check_sustain_level(t *testing.T) {
	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 100
	g := generators.NewSquareWaveOscillator()
	env := NewEnvelopeGenerator(g, 0.1, 0.1, 0.8, 0.1)
	env.SustainHold = 0.1
	env.SetPitch(0.5) // all 1s

	samples := env.GetSamples(cfg, 100)
	if len(samples) != 100 {
		t.Errorf("Want 100 samples, got %v", len(samples))
	}
	if samples[0] != 0.0 {
		t.Errorf("Expecting first sample to be 0, got: %v", samples[0])
	}
	testADSRSection(samples, 0, 10, func(i int) float64 { return float64(i) * 0.1 }, t)
	testADSRSection(samples, 10, 10, func(i int) float64 { return 1.0 - float64(i)*0.02 }, t)
	testADSRSection(samples, 20, 10, func(i int) float64 { return env.Sustain }, t)
	testADSRSection(samples, 30, 10, func(i int) float64 { return 0.8 - float64(i)*0.08 }, t)
}

func Test_ADSR_Sanity_check_release(t *testing.T) {
	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 100
	g := generators.NewSquareWaveOscillator()
	env := NewEnvelopeGenerator(g, 0.1, 0.1, 0.5, 0.2)
	env.SustainHold = 0.1
	env.SetPitch(0.5) // all 1s

	samples := env.GetSamples(cfg, 100)
	if len(samples) != 100 {
		t.Errorf("Want 100 samples, got %v", len(samples))
	}
	if samples[0] != 0.0 {
		t.Errorf("Expecting first sample to be 0, got: %v", samples[0])
	}
	testADSRSection(samples, 0, 10, func(i int) float64 { return float64(i) * 0.1 }, t)
	testADSRSection(samples, 10, 10, func(i int) float64 { return 1.0 - float64(i)*0.05 }, t)
	testADSRSection(samples, 20, 10, func(i int) float64 { return env.Sustain }, t)
	testADSRSection(samples, 30, 20, func(i int) float64 { return 0.5 - float64(i)*0.025 }, t)
}
