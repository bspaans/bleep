package channels

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
)

type Channel interface {
	NoteOn(note int)
	NoteOff(note int)
	SetInstrument(func() generators.Generator)
	GetSamples(cfg *audio.AudioConfig, n int) []float64
}
