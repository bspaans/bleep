package channels

import (
	"fmt"
	"sync"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/midi/notes"
)

type PolyphonicChannel struct {
	Instruments []generators.Generator
	On          *sync.Map
	FX          ChannelFX
	Grain       *ChannelGrain
}

func NewPolyphonicChannel() *PolyphonicChannel {
	instr := make([]generators.Generator, 128)
	return &PolyphonicChannel{
		Instruments: instr,
		On:          &sync.Map{},
		Grain:       NewChannelGrain(),
	}
}

func (c *PolyphonicChannel) SetInstrument(g func() generators.Generator) {
	for i := 0; i < 128; i++ {
		c.Instruments[i] = g()
	}
}

func (c *PolyphonicChannel) NoteOn(note int, velocity float64) {
	if note >= 0 && note < 128 && c.Instruments[note] != nil {
		if _, alreadyOn := c.On.Load(note); alreadyOn {
			// turn note off briefly to reset phase
			c.Instruments[note].SetPitch(0.0)
		}
		c.Instruments[note].SetPitch(notes.NoteToPitch[note])
		c.Instruments[note].SetGain(velocity)
		c.On.Store(note, true)
	}
	if note == 128 && c.Grain != nil {
		c.Grain.On = true
		//c.Grain.SetGain(velocity)
		c.On.Store(note, true)
	}
}

func (c *PolyphonicChannel) NoteOff(note int) {
	if note >= 0 && note < 128 && c.Instruments[note] != nil {
		c.Instruments[note].SetPitch(0.0)
		c.On.Delete(note)
	}
	if note == 128 && c.Grain != nil {
		c.Grain.On = false
		c.On.Delete(note)
	}
}

func (c *PolyphonicChannel) GetSamples(cfg *audio.AudioConfig, n int) []float64 {

	result := generators.GetEmptySampleArray(cfg, n)
	c.On.Range(func(on, value interface{}) bool {
		if on.(int) != 128 {
			for i, s := range c.Instruments[on.(int)].GetSamples(cfg, n) {
				result[i] += s
			}
		} else if c.Grain != nil {
			g, err := c.Grain.Generator(cfg)
			if err != nil {
				fmt.Println("Failed to load grain:", err.Error())
			} else if g == nil {
			} else {
				for i, s := range g.GetSamples(cfg, n) {
					result[i] += s
				}
			}
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

func (c *PolyphonicChannel) SetGrainOption(opt GrainOption, value interface{}) {
	c.Grain.Set(opt, value)
}
