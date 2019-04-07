package generators

import (
	"os"
	"testing"

	"github.com/bspaans/bleep/audio"
	"github.com/go-audio/wav"
)

func Test_LoadWavData_load_mono_sample(t *testing.T) {

	// Loading a mono sample -> should produce stereo
	data, err := LoadWavData("testdata/kick.wav")
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

	if len(buffer.Data)*2 != len(data) {
		t.Fatalf("Expecting same length")
	}
	for i := 0; i < len(buffer.Data); i++ {
		scaled := float64(buffer.Data[i]) / (2 << 14)
		if scaled != data[i*2] {
			t.Fatalf("Mismatch on sample %d: %f != %f", i, scaled, data[i*2])
		}
	}
}

func Test_WavGenerator(t *testing.T) {
	g, err := NewWavGenerator("testdata/kick.wav", 1.0)
	if err != nil {
		t.Errorf(err.Error())
		return
	}

	// This is a MONO audio file.
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
			t.Fatalf("Expecting %dth sample to match %v; got %v", i, f, scaled)
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
			t.Fatalf("Expecting %dth sample to match %v; got %v", i, f, scaled)
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
			t.Fatalf("Expecting %dth sample to match %v; got %v", i, f, scaled)
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
			t.Fatalf("Expecting %dth sample to match %v; got %v", i, f, scaled)
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
			t.Fatalf("Expecting %dth sample to match %v; got %v", i, f, scaled)
		}
	}
}

func Test_PitchedWavGenerator_stereo(t *testing.T) {
	g, err := NewPitchedWavGenerator("testdata/nice-work.wav", 1.0, 440.0)
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

	samples := g.GetSamples(cfg, 1000)
	for i := 0; i < len(samples); i++ {
		scaled := samples[i] * (2 << 14)
		f := float64(buffer.Data[i])
		if scaled != f {
			t.Errorf("Expecting %dth sample to match %v; got %v", i, f, scaled)
		}
	}
}

func Test_PitchedWavGenerator_stereo_octave_up(t *testing.T) {
	g, err := NewPitchedWavGenerator("testdata/nice-work.wav", 1.0, 440.0)
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

	g.SetPitch(880.0)
	samples := g.GetSamples(cfg, 1000)
	for i := 0; i < len(samples)/2; i++ {

		scaledL := samples[i*2] * (2 << 14)
		scaledR := samples[i*2+1] * (2 << 14)

		left := float64(buffer.Data[i*4])
		right := float64(buffer.Data[i*4+1])

		if scaledL != left {
			t.Errorf("Expecting %dth left sample to match %v; got %v", i, right, scaledL)
		}
		if scaledR != right {
			t.Errorf("Expecting %dth right sample to match %v; got %v", i, left, scaledR)
		}
	}
}
