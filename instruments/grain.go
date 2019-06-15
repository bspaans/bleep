package instruments

import (
	"os"
	"path/filepath"

	"github.com/bspaans/bleep/generators"
)

type GrainsOptionsDef struct {
	File           string  `json:"file" yaml:"file"`
	GrainSize      float64 `json:"grain_size" yaml:"grain_size"`
	BirthRate      float64 `json:"birth_rate" yaml:"birth_rate"`
	Gain           float64 `json:"gain" yaml:"gain"`
	Repeat         bool    `json:"repeat" yaml:"repeat"`
	Density        int     `json:"density" yaml:"density"`
	Spread         float64 `json:"spread" yaml:"spread"`
	Speed          float64 `json:"speed" yaml:"speed"`
	RandomPosition float64 `json:"random_position" yaml:"random_position"`
}

func (w *GrainsOptionsDef) Generator(ctx *Context) generators.Generator {
	file := ctx.GetPathFor(w.File)
	g, err := generators.NewGrainsGeneratorForWavFile(ctx.Config, file, w.GrainSize, w.BirthRate, w.Density, w.Spread, w.Speed, w.RandomPosition, w.Gain, w.Repeat)
	if err != nil {
		panic(err)
	}
	return g
}

func (w *GrainsOptionsDef) Validate(ctx *Context) error {
	file := w.File
	if !filepath.IsAbs(w.File) {
		file = filepath.Join(ctx.BaseDir, w.File)
	}
	_, err := os.Stat(file)
	if err != nil {
		return err
	}
	if w.Density == 0 {
		w.Density = 1
	}
	return nil
}
