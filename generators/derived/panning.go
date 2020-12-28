package derived

import (
	"math"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/theory"
)

func NewPitchControlledPanningGenerator(g generators.Generator) generators.Generator {
	result := NewWrappedGenerator(g)
	minPitch := theory.NoteC1.Pitch()
	maxPitch := theory.NoteA7.Pitch()
	maxPitchLog2 := math.Log2(maxPitch)
	pitch := 0.0
	result.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		if !cfg.Stereo {
			return g.GetSamples(cfg, n)
		}
		samples := g.GetSamples(cfg, n)

		panning := 0.5
		if pitch < minPitch {
			panning = 0.0
		} else if pitch > maxPitch {
			panning = 1.0
		} else {
			panning = math.Log2(pitch) / maxPitchLog2
		}

		result := generators.GetEmptySampleArray(cfg, n)
		for i := 0; i < n; i++ {
			v1, v2 := SinusoidalPanning(samples[i*2], samples[i*2+1], panning)
			result[i*2] = v1
			result[i*2+1] = v2
		}
		return samples
	}
	result.SetPitchFunc = func(f float64) {
		pitch = f
		g.SetPitch(f)
	}
	return result
}

func LinearPanning(input1, input2, panning float64) (float64, float64) {
	left := input1*(1-panning) + input2*(1-panning)
	right := input1*panning + input2*panning
	return left, right
}

func SquareRootPanning(input1, input2, panning float64) (float64, float64) {
	pan1 := math.Sqrt(1 - panning)
	pan2 := math.Sqrt(panning)
	left := input1*pan1 + input2*pan1
	right := input1*pan2 + input2*pan2
	return left, right
}

func SinusoidalPanning(input1, input2, panning float64) (float64, float64) {
	panning *= math.Pi / 2
	pan1 := math.Cos(panning)
	pan2 := math.Sin(panning)
	left := input1*pan1 + input2*pan1
	right := input1*pan2 + input2*pan2
	return left, right
}
