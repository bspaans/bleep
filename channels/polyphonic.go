package channels

import (
	"sync"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
	"github.com/bspaans/bs8bs/midi/notes"
)

type PolyphonicChannel struct {
	Instruments []generators.Generator
	On          *sync.Map
	FX          ChannelFX
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

func (c *PolyphonicChannel) NoteOn(note int, velocity float64) {
	if c.Instruments[note] != nil {
		c.Instruments[note].SetPitch(notes.NoteToPitch[note])
		c.Instruments[note].SetGain(velocity)
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

	result := generators.GetEmptySampleArray(cfg, n)
	c.On.Range(func(on, value interface{}) bool {
		for i, s := range c.Instruments[on.(int)].GetSamples(cfg, n) {
			result[i] += s
		}
		return true
	})
	filter := c.FX.Filter()
	if filter == nil {
		return result
	}
	return filter.Filter(cfg, result)
}

func (c *PolyphonicChannel) SetPitchbend(pitchbendFactor float64) {
	for _, i := range c.Instruments {
		i.SetPitchbend(pitchbendFactor)
	}
}

func (c *PolyphonicChannel) SetFX(fx FX, value float64) {
	c.FX.Set(fx, value)
}
