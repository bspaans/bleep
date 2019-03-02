package instruments

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
)

var PercussionBank = make([]generators.Generator, 128)

type Percussion struct{}

func NewPercussion() *Percussion {
	return &Percussion{}
}

func (c *Percussion) NoteOn(note int) {
	if PercussionBank[note] != nil {
	}
}
func (c *Percussion) NoteOff(note int) {
}
func (c *Percussion) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	return nil
}
func (c *Percussion) SetInstrument(g func() generators.Generator) {
}

func init() {
	PercussionBank[39] = generators.NewWhiteNoiseGenerator()
}
