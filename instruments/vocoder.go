package instruments

import (
	"fmt"

	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/generators/derived"
	"github.com/bspaans/bleep/util"
)

type VocoderDef struct {
	Source  *GeneratorDef `json:"source" yaml:"source"`
	Vocoder *GeneratorDef `json:"vocoder" yaml:"vocoder"`
}

func (w *VocoderDef) Generator(ctx *Context) generators.Generator {
	sg := w.Source.Generator(ctx)
	vg := w.Vocoder.Generator(ctx)
	return derived.NewVocoder(sg, vg)
}

func (w *VocoderDef) Validate(ctx *Context) error {
	if w.Source == nil {
		return util.WrapError("vocoder", fmt.Errorf("missing 'source' parameter"))
	} else if w.Vocoder == nil {
		return util.WrapError("vocoder", fmt.Errorf("missing 'vocoder' parameter"))
	}
	if err := w.Source.Validate(ctx); err != nil {
		return util.WrapError("vocoder > source", err)
	}
	if err := w.Vocoder.Validate(ctx); err != nil {
		return util.WrapError("vocoder > vocoder", err)
	}
	return nil
}
