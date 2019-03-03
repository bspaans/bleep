package channels

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
	"github.com/bspaans/bs8bs/midi/notes"
)

type MonophonicChannel struct {
	Instrument generators.Generator
}

func NewMonophonicChannel(g generators.Generator) *MonophonicChannel {
	return &MonophonicChannel{
		Instrument: g,
	}
}

func (c *MonophonicChannel) SetInstrument(g func() generators.Generator) {
	c.Instrument = g()
}

func (c *MonophonicChannel) NoteOn(note int, velocity float64) {
	if c.Instrument != nil {
		c.Instrument.SetPitch(notes.NoteToPitch[note])
		c.Instrument.SetGain(velocity)
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

func (c *MonophonicChannel) SetPitchbend(pitchbendFactor float64) {
	if c.Instrument != nil {
		c.Instrument.SetPitchbend(pitchbendFactor)
	}
}

func (c *MonophonicChannel) SetFX(fx FX, value float64) {}
