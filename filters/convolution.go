package filters

import (
	"container/ring"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/generators"
)

// The simple convolution filter is efficient when the number
// of coefficients is small (on my desktop: <300), and works
// by multiplying the coefficients with the values in the
// delay line.
//
// This filter should be appropriate for implementing low pass,
// high pass, band pass and band stop filters.
//
type SimpleConvolutionFilter struct {
	Coefficients   []float64
	LeftDelayLine  *ring.Ring
	RightDelayLine *ring.Ring
}

func NewSimpleConvolutionFilter(coefficients []float64) Filter {
	return &SimpleConvolutionFilter{
		Coefficients: coefficients,
	}
}

func NewSimpleConvolutionFilterFromWav(wav string) (Filter, error) {
	values, err := generators.LoadWavData(wav)
	if err != nil {
		return nil, err
	}
	coefficients := []float64{}
	// convert to mono
	for i := 0; i < len(values); i += 2 {
		coefficients = append(coefficients, values[i])
	}
	return NewSimpleConvolutionFilter(coefficients), nil
}

func MustNewSimpleConvolutionFilterFromWav(wav string) Filter {
	f, err := NewSimpleConvolutionFilterFromWav(wav)
	if err != nil {
		panic(err)
	}
	return f
}

func (s *SimpleConvolutionFilter) Filter(cfg *audio.AudioConfig, samples []float64) []float64 {
	order := len(s.Coefficients)
	if s.LeftDelayLine == nil {
		s.LeftDelayLine = ring.New(order)
	}
	if cfg.Stereo {
		if s.RightDelayLine == nil {
			s.RightDelayLine = ring.New(order)
		}
	}

	n := len(samples)
	if cfg.Stereo {
		n = n / 2
	}
	for i := 0; i < n; i++ {
		ix := i
		if cfg.Stereo {
			ix *= 2
		}

		s.LeftDelayLine.Value = samples[ix]
		sample := 0.0
		for j := 0; j < order; j++ {
			v := s.LeftDelayLine.Move(-j).Value
			value := 0.0
			if v != nil {
				value = v.(float64)
				sample += s.Coefficients[j] * value
			}
		}
		samples[ix] = sample
		s.LeftDelayLine = s.LeftDelayLine.Next()

		if cfg.Stereo {
			ix += 1
			s.RightDelayLine.Value = samples[ix]
			sample = 0.0
			for j := 0; j < order; j++ {
				v := s.RightDelayLine.Move(-j).Value
				value := 0.0
				if v != nil {
					value = v.(float64)
					sample += s.Coefficients[j] * value
				}
			}
			samples[ix] = sample
			s.RightDelayLine = s.RightDelayLine.Next()
		}
	}
	return samples
}
