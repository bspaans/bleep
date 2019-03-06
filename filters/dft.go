package filters

import (
	"github.com/barnex/fftw"
	"github.com/bspaans/bs8bs/audio"
)

type DFTBaseFilter struct {
	FreqFilter func(cfg *audio.AudioConfig, freq []complex64) []complex64
}

func NewDFTBaseFilter() *DFTBaseFilter {
	return &DFTBaseFilter{}
}

func (f *DFTBaseFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {

	N := len(samples)
	in := make([]float32, N)
	out := make([]complex64, N)

	plan := fftw.PlanR2C([]int{N}, in, out, fftw.ESTIMATE)

	for i, s := range samples {
		in[i] = float32(s)
	}

	plan.Execute()

	out = f.FreqFilter(cfg, out)

	newSamples := make([]float32, N)
	plan = fftw.PlanC2R([]int{N}, out, newSamples, fftw.ESTIMATE)
	plan.Execute()

	result := make([]float64, N)
	for i, s := range newSamples {
		result[i] = float64(s) / float64(N)
	}
	return result
}
