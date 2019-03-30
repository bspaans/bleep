package derived

import (
	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/generators"
)

// A vocoder modulates a source generator.
// The pitch, pitchbend and gain of the source generator are
// never modified by this generator.
//
func NewVocoder(source, vocoder generators.Generator) generators.Generator {
	g := NewWrappedGenerator(vocoder)
	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		samples := source.GetSamples(cfg, n)
		vocoderSamples := vocoder.GetSamples(cfg, n)
		if cfg.Stereo {
			n = n * 2
		}
		for i := 0; i < n; i++ {
			samples[i] = vocoderSamples[i] * samples[i]
		}
		return samples
	}
	g.SetPitchFunc = func(pitch float64) {
		source.SetPitch(pitch)
		vocoder.SetPitch(pitch)
	}
	return g
}
