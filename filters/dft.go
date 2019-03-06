package filters

import (
	"github.com/barnex/fftw"
	"github.com/bspaans/bs8bs/audio"
)

type DFTBaseFilter struct {
	InputBuffer   []float32
	OutputBuffer  []complex64
	InputPosition int
	FreqFilter    func(cfg *audio.AudioConfig, freq []complex64) []complex64
}

func NewDFTBaseFilter(n int) *DFTBaseFilter {
	in := make([]float32, n)
	out := make([]complex64, n)
	return &DFTBaseFilter{
		InputBuffer:   in,
		OutputBuffer:  out,
		InputPosition: 0,
	}
}

func (f *DFTBaseFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {

	plan := fftw.PlanR2C([]int{len(f.InputBuffer)}, f.InputBuffer, f.OutputBuffer, fftw.ESTIMATE)
	for _, s := range samples {
		f.InputBuffer[f.InputPosition] = float32(s)
		f.InputPosition += 1
		if f.InputPosition >= len(f.InputBuffer) {
			f.InputPosition = 0
		}
	}
	plan.Execute()

	f.FreqFilter(cfg, f.OutputBuffer)

	out := make([]float32, len(f.InputBuffer))
	plan = fftw.PlanC2R([]int{len(f.OutputBuffer)}, f.OutputBuffer, out, fftw.ESTIMATE)
	plan.Execute()
	//fmt.Println(f.OutputBuffer)
	return samples
}
