package generators

import (
	"os"
	"testing"

	"github.com/bspaans/bleep/audio"
	"github.com/go-audio/wav"
)

func Test_WavGenerator(t *testing.T) {
	g, err := NewWavGenerator("testdata/kick.wav", 1.0)
	if err != nil {
		t.Errorf(err.Error())
		return
	}

	f, err := os.Open("testdata/kick.wav")
	if err != nil {
		t.Errorf(err.Error())
		return
	}
	decoder := wav.NewDecoder(f)
	buffer, err := decoder.FullPCMBuffer()
	if err != nil {
		t.Errorf(err.Error())
		return
	}

	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 44100
	cfg.Stereo = false

	samples := g.GetSamples(cfg, 1000)
	for i := 0; i < len(samples); i++ {
		scaled := samples[i] * (2 << 14)
		f := float64(buffer.Data[i])
		if scaled != f {
			t.Errorf("Expecting %dth sample to match %v; got %v", i, f, scaled)
		}
	}
}

func Test_WavGenerator_stereo(t *testing.T) {
	g, err := NewWavGenerator("testdata/nice-work.wav", 1.0)
	if err != nil {
		t.Errorf(err.Error())
		return
	}

	f, err := os.Open("testdata/nice-work.wav")
	if err != nil {
		t.Errorf(err.Error())
		return
	}
	decoder := wav.NewDecoder(f)
	buffer, err := decoder.FullPCMBuffer()
	if err != nil {
		t.Errorf(err.Error())
		return
	}

	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 44100
	cfg.Stereo = true

	samples := g.GetSamples(cfg, 10)
	for i := 0; i < len(samples); i++ {
		scaled := samples[i] * (2 << 14)
		f := float64(buffer.Data[i])
		if scaled != f {
			t.Errorf("Expecting %dth sample to match %v; got %v", i, f, scaled)
		}
	}
}

func Test_PitchedWavGenerator_base_freq_equals_non_pitched_generator(t *testing.T) {
	g, err := NewPitchedWavGenerator("testdata/kick.wav", 1.0, 440.0)
	if err != nil {
		t.Errorf(err.Error())
		return
	}

	f, err := os.Open("testdata/kick.wav")
	if err != nil {
		t.Errorf(err.Error())
		return
	}
	decoder := wav.NewDecoder(f)
	buffer, err := decoder.FullPCMBuffer()
	if err != nil {
		t.Errorf(err.Error())
		return
	}

	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 44100
	cfg.Stereo = false

	samples := g.GetSamples(cfg, 1000)
	for i := 0; i < len(samples); i++ {
		scaled := samples[i] * (2 << 14)
		f := float64(buffer.Data[i])
		if scaled != f {
			t.Errorf("Expecting %dth sample to match %v; got %v", i, f, scaled)
		}
	}
}

func Test_PitchedWavGenerator_octave_higher_is_twice_as_fast(t *testing.T) {
	g, err := NewPitchedWavGenerator("testdata/kick.wav", 1.0, 440.0)
	if err != nil {
		t.Errorf(err.Error())
		return
	}

	f, err := os.Open("testdata/kick.wav")
	if err != nil {
		t.Errorf(err.Error())
		return
	}
	decoder := wav.NewDecoder(f)
	buffer, err := decoder.FullPCMBuffer()
	if err != nil {
		t.Errorf(err.Error())
		return
	}

	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 44100
	cfg.Stereo = false

	g.SetPitch(880.0)
	samples := g.GetSamples(cfg, 1000)
	for i := 0; i < len(samples); i++ {
		scaled := samples[i] * (2 << 14)
		f := float64(buffer.Data[i*2])
		if scaled != f {
			t.Errorf("Expecting %dth sample to match %v; got %v", i, f, scaled)
		}
	}
}

func Test_PitchedWavGenerator_octave_lower_is_twice_as_slow(t *testing.T) {
	g, err := NewPitchedWavGenerator("testdata/kick.wav", 1.0, 440.0)
	if err != nil {
		t.Errorf(err.Error())
		return
	}

	f, err := os.Open("testdata/kick.wav")
	if err != nil {
		t.Errorf(err.Error())
		return
	}
	decoder := wav.NewDecoder(f)
	buffer, err := decoder.FullPCMBuffer()
	if err != nil {
		t.Errorf(err.Error())
		return
	}

	cfg := audio.NewAudioConfig()
	cfg.SampleRate = 44100
	cfg.Stereo = false

	g.SetPitch(220.0)
	samples := g.GetSamples(cfg, 1000)
	for i := 0; i < len(samples); i += 2 {
		scaled := samples[i] * (2 << 14)
		f := float64(buffer.Data[i/2])
		if scaled != f {
			t.Errorf("Expecting %dth sample to match %v; got %v", i, f, scaled)
		}
	}
}
