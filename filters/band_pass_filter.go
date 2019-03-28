package filters

import (
	"math"

	"github.com/bspaans/bleep/audio"
)

// A FIR band pass filter.
type BandPassConvolutionFilter struct {
	// The lowest frequency to be included, in Hz.
	Lowest float64

	// The Highest frequency to be included, in Hz.
	Highest float64

	// The order of the filter. Should be odd.
	// The order can't be changed once set without resetting the convolution
	// filter.
	Order int

	// The underlying SimpleConvolutionFilter used.
	ConvolutionFilter *SimpleConvolutionFilter
}

func NewBandPassConvolutionFilter(lowest, highest float64, order int) *BandPassConvolutionFilter {
	return &BandPassConvolutionFilter{
		Lowest:  lowest,
		Highest: highest,
		Order:   order,
	}
}

func (f *BandPassConvolutionFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	coefficients := BandPassConvolution(float64(cfg.SampleRate), f.Lowest, f.Highest, f.Order)
	if f.ConvolutionFilter == nil {
		f.ConvolutionFilter = NewSimpleConvolutionFilter(coefficients)
	} else {
		f.ConvolutionFilter.Coefficients = coefficients
	}
	return f.ConvolutionFilter.Filter(cfg, samples)
}

// Order should be odd.
func BandPassConvolution(sampleRate, lowest, highest float64, order int) []float64 {
	result := make([]float64, order)
	fc1 := lowest / sampleRate
	fc2 := highest / sampleRate

	phase1 := 2 * math.Pi * fc1
	phase2 := 2 * math.Pi * fc2

	middle := order / 2
	for i := -middle; i < middle; i++ {
		if i == 0 {
			result[middle] = 2.0 * (fc2 - fc1)
		} else {
			result[i+middle] = math.Sin(phase2*float64(i))/(math.Pi*float64(i)) - math.Sin(phase1*float64(i)/math.Pi*float64(i))
		}
	}
	return result
}
