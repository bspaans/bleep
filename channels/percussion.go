package channels

import (
	"sync"

	"github.com/bspaans/bs8bs/filters"
	"github.com/bspaans/bs8bs/generators/derived"

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
	instr[35] = derived.NewFilteredGenerator(
		derived.NewCombinedGenerators(
			derived.NewEnvelopeGenerator(derived.NewConstantPitchGenerator(generators.NewSquareWaveOscillator(), 100.0), 0.01, 0.01, 0.2, 0.01),
			derived.NewEnvelopeGenerator(derived.NewConstantPitchGenerator(generators.NewSineWaveOscillator(), 80.0), 0.05, 0.01, 0.2, 0.01),
			derived.NewEnvelopeGenerator(derived.NewConstantPitchGenerator(generators.NewSineWaveOscillator(), 40.0), 0.1, 0.01, 0.2, 0.01),
		),
		filters.NewOverdriveFilter(3.5),
	)
	instr[36] = derived.NewEnvelopeGenerator(derived.NewConstantPitchGenerator(generators.NewSquareWaveOscillator(), 120.0), 0.01, 0.01, 0.4, 0.01)
	instr[40] = derived.NewCombinedGenerators(
		derived.NewEnvelopeGenerator(generators.NewWhiteNoiseGenerator(), 0.1, 0.01, 0.2, 0.01),
		derived.NewFilteredGenerator(
			derived.NewEnvelopeGenerator(generators.NewWhiteNoiseGenerator(), 0.1, 0.01, 0.2, 0.01),
			filters.NewOverdriveFilter(3.0),
		),
	)
	instr[42] = derived.NewEnvelopeGenerator(generators.NewWhiteNoiseGenerator(), 0.1, 0.01, 0.2, 0.01)
	instr[46] = derived.NewEnvelopeGenerator(generators.NewWhiteNoiseGenerator(), 0.1, 0.5, 0.8, 0.1)
	return &PercussionChannel{
		Instruments: instr,
		On:          &sync.Map{},
	}
}

func (c *PercussionChannel) SetInstrument(g func() generators.Generator) {
}

func (c *PercussionChannel) NoteOn(note int, velocity float64) {
	if c.Instruments[note] != nil {
		c.Instruments[note].SetPitch(notes.NoteToPitch[note])
		c.Instruments[note].SetGain(velocity)
		c.On.Store(note, true)
	}
}

func (c *PercussionChannel) NoteOff(note int) {
	if c.Instruments[note] != nil {
		c.Instruments[note].SetPitch(0.0)
		c.On.Delete(note)
	}
}

func (c *PercussionChannel) SetPitchbend(f float64) {
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
