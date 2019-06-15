package instruments

import (
	"errors"
	"strings"

	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/generators/derived"
)

type GeneratorDef struct {
	Filter        *FilterDef           `json:"filter,omitempty" yaml:"filter,omitempty"`
	Transpose     *TransposeDef        `json:"transpose,omitempty" yaml:"transpose,omitempty"`
	ConstantPitch *ConstantPitchDef    `json:"constant_pitch,omitempty" yaml:"constant_pitch,omitempty"`
	Sine          *GeneratorOptionsDef `json:"sine,omitempty" yaml:"sine,omitempty"`
	Square        *GeneratorOptionsDef `json:"square,omitempty" yaml:"square,omitempty"`
	Sawtooth      *GeneratorOptionsDef `json:"sawtooth,omitempty" yaml:"sawtooth,omitempty"`
	Triangle      *GeneratorOptionsDef `json:"triangle,omitempty" yaml:"triangle,omitempty"`
	WhiteNoise    *GeneratorOptionsDef `json:"white_noise,omitempty" yaml:"white_noise,omitempty"`
	Pulse         *PulseWaveDef        `json:"pulse,omitempty" yaml:"pulse,omitempty"`
	Wav           *WavOptionsDef       `json:"wav,omitempty" yaml:"wav,omitempty"`
	Grains        *GrainsOptionsDef    `json:"grains,omitempty" yaml:"grains,omitempty"`
	Combined      []*GeneratorDef      `json:"combined,omitempty" yaml:"combined,omitempty"`
	Vocoder       *VocoderDef          `json:"vocoder,omitempty" yaml:"vocoder,omitempty"`
	Panning       *PitchedPanningDef   `json:"panning,omitempty" yaml:"panning,omitempty"`
}

func (d *GeneratorDef) Generator(ctx *Context) generators.Generator {
	var g generators.Generator
	if d.Sine != nil {
		g = d.Sine.Generator(generators.NewSineWaveOscillator())
	} else if d.Square != nil {
		g = d.Square.Generator(generators.NewSquareWaveOscillator())
	} else if d.Sawtooth != nil {
		g = d.Sawtooth.Generator(generators.NewSawtoothWaveOscillator())
	} else if d.Triangle != nil {
		g = d.Triangle.Generator(generators.NewTriangleWaveOscillator())
	} else if d.Pulse != nil {
		g = d.Pulse.Generator(ctx)
	} else if d.WhiteNoise != nil {
		g = d.WhiteNoise.Generator(generators.NewWhiteNoiseGenerator())
	} else if d.Filter != nil {
		g = d.Filter.Generator(ctx)
	} else if d.Transpose != nil {
		g = d.Transpose.Generator(ctx)
	} else if d.Wav != nil {
		g = d.Wav.Generator(ctx)
	} else if d.ConstantPitch != nil {
		g = d.ConstantPitch.Generator(ctx)
	} else if d.Grains != nil {
		g = d.Grains.Generator(ctx)
	} else if d.Vocoder != nil {
		g = d.Vocoder.Generator(ctx)
	} else if d.Panning != nil {
		g = d.Panning.Generator(ctx)
	} else if len(d.Combined) > 0 {
		gs := []generators.Generator{}
		for _, gen := range d.Combined {
			gs = append(gs, gen.Generator(ctx))
		}
		g = derived.NewCombinedGenerators(gs...)
	} else {
		panic("unknown generator")
	}
	return g
}

func (d *GeneratorDef) Validate(ctx *Context) error {
	if d.Sine != nil {
		return d.Sine.Validate()
	} else if d.Square != nil {
		return d.Square.Validate()
	} else if d.Sawtooth != nil {
		return d.Sawtooth.Validate()
	} else if d.Triangle != nil {
		return d.Triangle.Validate()
	} else if d.Filter != nil {
		return d.Filter.Validate(ctx)
	} else if d.Grains != nil {
		return d.Grains.Validate(ctx)
	} else if d.Pulse != nil {
		return d.Pulse.Validate(ctx)
	} else if d.Transpose != nil {
		return d.Transpose.Validate(ctx)
	} else if d.ConstantPitch != nil {
		return d.ConstantPitch.Validate(ctx)
	} else if d.WhiteNoise != nil {
		return d.WhiteNoise.Validate()
	} else if d.Wav != nil {
		return d.Wav.Validate(ctx)
	} else if d.Vocoder != nil {
		return d.Vocoder.Validate(ctx)
	} else if d.Panning != nil {
		return d.Panning.Validate(ctx)
	} else if len(d.Combined) > 0 {
		gs := []string{}
		for _, gen := range d.Combined {
			if err := gen.Validate(ctx); err != nil {
				gs = append(gs, err.Error())
			}
		}
		if len(gs) == 0 {
			return nil
		}
		return errors.New(strings.Join(gs, "\n"))
	} else {
		return errors.New("Missing generator")
	}
}
