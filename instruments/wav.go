package instruments

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/theory"
)

type WavOptionsDef struct {
	File                string      `json:"file" yaml:"file"`
	Gain                float64     `json:"gain" yaml:"gain"`
	Pitched             bool        `json:"pitched" yaml:"pitched"`
	BasePitch           interface{} `json:"base_pitch" yaml:"base_pitch"`
	GeneratorOptionsDef `json:",inline" yaml:",inline"`
}

func (w *WavOptionsDef) Generator(ctx *Context) generators.Generator {
	var g generators.Generator
	var err error
	file := ctx.GetPathFor(w.File)
	if w.Pitched {
		basePitch := 440.0
		if w.BasePitch != nil {
			switch w.BasePitch.(type) {
			case string:
				n, _ := theory.NoteFromString(w.BasePitch.(string))
				basePitch = n.Pitch()
			case float64:
				basePitch = w.BasePitch.(float64)
			}
		}
		g, err = generators.NewPitchedWavGenerator(file, w.Gain, basePitch)
	} else {
		g, err = generators.NewWavGenerator(file, w.Gain)
	}
	if err != nil {
		panic(err)
	}
	return g
}

func (w *WavOptionsDef) Validate(ctx *Context) error {
	file := w.File
	if !filepath.IsAbs(w.File) {
		file = filepath.Join(ctx.BaseDir, w.File)
	}
	_, err := os.Stat(file)
	if err != nil {
		return err
	}
	if w.Gain == 0.0 {
		return fmt.Errorf("Missing 'gain' for wav generator")
	}
	return w.GeneratorOptionsDef.Validate()
}
