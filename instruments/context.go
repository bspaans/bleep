package instruments

import (
	"path/filepath"

	"github.com/bspaans/bleep/audio"
)

type Context struct {
	BaseDir string
	Config  *audio.AudioConfig
}

func NewContext(forFile string, cfg *audio.AudioConfig) (*Context, error) {
	file := "."
	if forFile != "" {
		fp, err := filepath.Abs(forFile)
		if err != nil {
			return nil, err
		}
		file = filepath.Dir(fp)
	}
	return &Context{
		BaseDir: file,
		Config:  cfg,
	}, nil
}

func (c *Context) GetPathFor(file string) string {
	if !filepath.IsAbs(file) {
		return filepath.Join(c.BaseDir, file)
	}
	return file
}
