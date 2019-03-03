package generators

import (
	"github.com/bspaans/bs8bs/audio"
)

type Generator interface {
	GetSamples(cfg *audio.AudioConfig, n int) []float64 // return samples between -1.0 and 1.0
	SetPitch(float64)
	SetPitchbend(float64)
	SetGain(float64)
}
