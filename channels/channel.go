package channels

import (
	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/generators"
)

type Channel interface {
	NoteOn(note int, velocity float64)
	NoteOff(note int)
	SetPitchbend(pitchbendFactor float64)
	SetFX(fx FX, value float64)
	SetGrainOption(opt GrainOption, value interface{})
	SetInstrument(func() generators.Generator)
	GetSamples(cfg *audio.AudioConfig, n int) []float64
}
