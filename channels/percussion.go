package channels

import (
	"sync"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/instruments"
	"github.com/bspaans/bleep/theory"
)

type PercussionChannel struct {
	On          *sync.Map
	Instruments []generators.Generator
	FX          ChannelFX
}

func NewPercussionChannel() *PercussionChannel {
	p := &PercussionChannel{
		On: &sync.Map{},
	}
	return p
}

func (c *PercussionChannel) LoadInstrumentsFromBank(cfg *audio.AudioConfig) {
	instr := make([]generators.Generator, 128)
	for i, gen := range instruments.Banks[1] {
		if gen != nil {
			instr[i] = gen(cfg)
		}
	}
	c.Instruments = instr
}

func (c *PercussionChannel) getInstrument(note int) generators.Generator {
	if note < 0 || note >= len(c.Instruments) {
		return nil
	}
	return c.Instruments[note]
}

func (c *PercussionChannel) SetInstrument(g func() generators.Generator) {
}

func (c *PercussionChannel) NoteOn(note int, velocity float64) {
	instr := c.getInstrument(note)
	if instr != nil {
		instr.SetPitch(theory.NoteToPitch(note - theory.MidiNoteOffset))
		instr.SetGain(velocity)
		c.On.Store(note, true)
	}
}

func (c *PercussionChannel) NoteOff(note int) {
	instr := c.getInstrument(note)
	if instr != nil {
		instr.SetPitch(0.0)
		c.On.Delete(note)
	}
}

func (c *PercussionChannel) SetPitchbend(f float64) {
}

func (c *PercussionChannel) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
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

func (c *PercussionChannel) SetFX(fx FX, value float64) {
	c.FX.Set(fx, value)
}
func (c *PercussionChannel) SetGrainOption(opt GrainOption, value interface{}) {}
