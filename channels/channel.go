package channels

import (
	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/generators"
)

// Channel is basically a wrapper of one or multiple generators, which provide additional methods for mixing
// waves and stuff like this.
//
// Main difference in responsibility: generators, well, generating monophone wave, but channels combine
// multiple generators, set low level effects like ADSR or even surrounding! Also, in contrast to Generator,
// Channel operate notes instead pitch, so you don't need to precalculate specific frequencies
type Channel interface {
	NoteOn(note int, velocity float64)
	NoteOff(note int)
	SetFX(fx FX, value float64)
	SetGrainOption(opt GrainOption, value interface{})
	SetInstrument(func() generators.Generator)
	GetSamples(cfg *audio.AudioConfig, n int) []float64
}
