package channels

import (
	"sync"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
	"github.com/bspaans/bs8bs/midi/notes"
)

type PercussionChannel struct {
	Instruments []generators.Generator
	On          *sync.Map
}

func NewPercussionChannel() *PercussionChannel {
	instr := make([]generators.Generator, 128)
	instr[35] = generators.NewConstantPitchGenerator(generators.NewSineWaveOscillator(), 80.0)
	instr[40] = generators.NewWhiteNoiseGenerator()
	return &PercussionChannel{
		Instruments: instr,
		On:          &sync.Map{},
	}
}

func (c *PercussionChannel) SetInstrument(g func() generators.Generator) {
}

func (c *PercussionChannel) NoteOn(note int) {
	if c.Instruments[note] != nil {
		c.Instruments[note].SetPitch(notes.NoteToPitch[note])
		c.On.Store(note, true)
	}
}

func (c *PercussionChannel) NoteOff(note int) {
	if c.Instruments[note] != nil {
		c.Instruments[note].SetPitch(0.0)
		c.On.Delete(note)
	}
}

func (c *PercussionChannel) GetSamples(cfg *audio.AudioConfig, n int) []float64 {
	result := make([]float64, n)
	c.On.Range(func(on, value interface{}) bool {
		for i, s := range c.Instruments[on.(int)].GetSamples(cfg, n) {
			result[i] += s
		}
		return true
	})
	return result
}
