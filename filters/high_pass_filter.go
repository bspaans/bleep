package filters

import (
	"math"

	"github.com/bspaans/bleep/audio"
)

type HighPassConvolutionFilter struct {
	Cutoff float64

	// The order of the filter. Should be odd.
	// The order can't be changed once set without resetting the convolution
	// filter.
	Order int

	// The underlying SimpleConvolutionFilter used.
	ConvolutionFilter *SimpleConvolutionFilter
}

func NewHighPassConvolutionFilter(cutoff float64, order int) *HighPassConvolutionFilter {
	return &HighPassConvolutionFilter{
		Cutoff: cutoff,
		Order:  order,
	}
}

func (f *HighPassConvolutionFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	coefficients := HighPassConvolution(float64(cfg.SampleRate), f.Cutoff, f.Order)
	if f.ConvolutionFilter == nil {
		f.ConvolutionFilter = NewSimpleConvolutionFilter(coefficients)
	} else {
		f.ConvolutionFilter.Coefficients = coefficients
	}
	return f.ConvolutionFilter.Filter(cfg, samples)
}

// Order should be odd.
func HighPassConvolution(sampleRate, cutoff float64, order int) []float64 {
	result := make([]float64, order)
	fc := cutoff / sampleRate
	phase := 2 * math.Pi * fc
	middle := order / 2
	for i := -middle; i < middle; i++ {
		if i == 0 {
			result[middle] = 1.0 - (2 * fc)
		} else {
			result[i+middle] = -math.Sin(phase*float64(i)) / (math.Pi * float64(i))
		}
	}
	return result
}
