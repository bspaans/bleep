package spectral

import (
	"fmt"
	"math/cmplx"
)

// A SpectralPeak denotes a peak within a spectral frame. See GetPeaks() for
// more information.
type SpectralPeak struct {

	// The index into the FFT result; i.e. the SpectralFrame.Frame
	Index     int
	Frequency float64
	Bandwidth float64
	Value     complex64
}

func NewSpectralPeak(index int, freq, bandwidth float64, value complex64) *SpectralPeak {
	return &SpectralPeak{
		Index:     index,
		Frequency: freq,
		Bandwidth: bandwidth,
		Value:     value,
	}
}

func (s *SpectralPeak) String() string {
	return fmt.Sprintf(
		"Peak at %.2f-%.2fHz [%d] (amp: %.2f, phase: %.2f)",
		s.Frequency,
		s.Frequency+s.Bandwidth,
		s.Index,
		cmplx.Abs(complex128(s.Value)),
		cmplx.Phase(complex128(s.Value)),
	)
}
