package filters

import (
	"github.com/barnex/fftw"
)

func DFT(samples []float64, filter func([]complex64) []complex64) []float64 {

	N := len(samples)
	in := make([]float32, N)
	out := make([]complex64, N)

	plan := fftw.PlanR2C([]int{N}, in, out, fftw.ESTIMATE)

	for i, s := range samples {
		in[i] = float32(s)
	}

	plan.Execute()

	out = filter(out)

	newSamples := make([]float32, N)
	plan = fftw.PlanC2R([]int{N}, out, newSamples, fftw.ESTIMATE)
	plan.Execute()

	result := make([]float64, N)
	for i, s := range newSamples {
		result[i] = float64(s) / float64(N)
	}
	return result
}
