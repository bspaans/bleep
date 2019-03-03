package channels

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
)

type Channel interface {
	NoteOn(note int, velocity float64)
	NoteOff(note int)
	SetPitchbend(pitchbendFactor float64)
	SetFX(fx FX, value float64)
	SetInstrument(func() generators.Generator)
	GetSamples(cfg *audio.AudioConfig, n int) []float64
}
