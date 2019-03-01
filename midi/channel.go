package midi

import (
	"math"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
)

type Channel interface {
	NoteOn(note int)
	NoteOff(note int)
	GetSamples(cfg *audio.AudioConfig, n int) []float64
}

type MonophonicChannel struct {
	Instrument generators.Generator
}

func NewMonophonicChannel(g generators.Generator) *MonophonicChannel {
	return &MonophonicChannel{
		Instrument: g,
	}
}

func (c *MonophonicChannel) NoteOn(note int) {
	if c.Instrument != nil {
		c.Instrument.SetPitch(NoteToPitch[note])
	}
}

func (c *MonophonicChannel) NoteOff(note int) {
	if c.Instrument != nil {
		c.Instrument.SetPitch(0.0)
	}
}

func (c *MonophonicChannel) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	return c.Instrument.GetSamples(cfg, n)
}

var NoteToPitch = make([]float64, 128)

func init() {
	a := 440.0
	for i := 0; i < 128; i++ {
		NoteToPitch[i] = (a / 32) * (math.Pow(2, ((float64(i) - 9) / 12)))
	}
}
