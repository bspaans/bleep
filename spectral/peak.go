package spectral

import (
	"fmt"
	"math/cmplx"
)

// A SpectralPeak denotes a peak within a spectral frame. It is usually
// constructed by the NewSpectralPeaksFromFrame function.
type SpectralPeak struct {

	// The index into the FFT result; i.e. the SpectralFrame.Frame
	Index int

	// The low boundary of the frequency bin. To calculate a more accurate
	// frequency you'll have to use a SpectralPeakTrack.
	Frequency float64

	// The width of the frequency bin.
	Bandwidth float64

	// The Fourier series result for this frequency bin
	Value complex64
}

func newSpectralPeak(index int, freq, bandwidth float64, value complex64) *SpectralPeak {
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
