package filters

import (
	"math"

	"github.com/bspaans/bleep/audio"
)

// Cutoff frequency = Alpha / ((1 - Alpha) * 2 * Pi * dt
// Alpha = 2Pi * dt * Cutoff / (2Pi * dt * Cutoff + 1)
type LowPassFilter struct {
	Cutoff        float64
	PreviousLeft  float64
	PreviousRight float64
}

func NewLowPassFilter(cutoff float64) *LowPassFilter {
	return &LowPassFilter{
		Cutoff:        cutoff,
		PreviousLeft:  0.0,
		PreviousRight: 0.0,
	}
}

func (f *LowPassFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	n := len(samples)
	if cfg.Stereo {
		n = n / 2
	}
	waveLength := float64(n) / float64(cfg.SampleRate)
	rc := 1.0 / (2 * math.Pi * f.Cutoff)
	alpha := waveLength / (rc + waveLength)
	for i := 0; i < n; i++ {
		if cfg.Stereo {
			samples[i*2] = f.PreviousLeft + alpha*(samples[i*2]-f.PreviousLeft)
			samples[i*2+1] = f.PreviousRight + alpha*(samples[i*2+1]-f.PreviousRight)
			f.PreviousLeft = samples[i*2]
			f.PreviousRight = samples[i*2+1]
		} else {
			samples[i] = f.PreviousLeft + alpha*(samples[i]-f.PreviousLeft)
			f.PreviousLeft = samples[i]
		}
	}
	return samples
}

type LowPassConvolutionFilter struct {
	Cutoff float64

	// The order of the filter. Should be odd.
	// The order can't be changed once set without resetting the convolution
	// filter.
	Order int

	// The underlying SimpleConvolutionFilter used.
	ConvolutionFilter *SimpleConvolutionFilter
}

func NewLowPassConvolutionFilter(cutoff float64, order int) *LowPassConvolutionFilter {
	return &LowPassConvolutionFilter{
		Cutoff: cutoff,
		Order:  order,
	}
}

func (f *LowPassConvolutionFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	coefficients := LowPassConvolution(float64(cfg.SampleRate), f.Cutoff, f.Order)
	if f.ConvolutionFilter == nil {
		f.ConvolutionFilter = NewSimpleConvolutionFilter(coefficients)
	} else {
		f.ConvolutionFilter.Coefficients = coefficients
	}
	return f.ConvolutionFilter.Filter(cfg, samples)
}

// Order should be odd.
func LowPassConvolution(sampleRate, cutoff float64, order int) []float64 {
	result := make([]float64, order)
	fc := cutoff / sampleRate
	phase := 2 * math.Pi * fc
	middle := order / 2
	for i := -middle; i < middle; i++ {
		if i == 0 {
			result[middle] = 2 * fc
		} else {
			result[i+middle] = math.Sin(phase*float64(i)) / (math.Pi * float64(i))
		}
	}
	return result
}
