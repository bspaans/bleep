package generators

import (
	"os"
	"testing"

	"github.com/bspaans/bs8bs/audio"
	"github.com/go-audio/wav"
)

func Test_WavGenerator(t *testing.T) {
	g, err := NewWavGenerator("testdata/kick.wav")
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
