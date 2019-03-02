package midi

import (
	"math"
	"sync"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
)

type Channel interface {
	NoteOn(note int)
	NoteOff(note int)
	SetInstrument(func() generators.Generator)
	GetSamples(cfg *audio.AudioConfig, n int) []float64
}

type PolyphonicChannel struct {
	Instruments []generators.Generator
	On          *sync.Map
}

func NewPolyphonicChannel() *PolyphonicChannel {
	instr := make([]generators.Generator, 128)
	return &PolyphonicChannel{
		Instruments: instr,
		On:          &sync.Map{},
	}
}

func (c *PolyphonicChannel) SetInstrument(g func() generators.Generator) {
	for i := 0; i < 128; i++ {
		c.Instruments[i] = g()
	}
}

func (c *PolyphonicChannel) NoteOn(note int) {
	if c.Instruments[note] != nil {
		c.Instruments[note].SetPitch(NoteToPitch[note])
		c.On.Store(note, true)
	}
}

func (c *PolyphonicChannel) NoteOff(note int) {
	if c.Instruments[note] != nil {
		c.Instruments[note].SetPitch(0.0)
		c.On.Delete(note)
	}
}

func (c *PolyphonicChannel) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	result := make([]float64, n)
	c.On.Range(func(on, value interface{}) bool {
		for i, s := range c.Instruments[on.(int)].GetSamples(cfg, n) {
			result[i] += s
		}
		return true
	})
	return result
}

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
