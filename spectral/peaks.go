package spectral

import "math/cmplx"

type SpectralPeaks struct {
	Peaks []*SpectralPeak
}

func NewSpectralPeaks(peaks []*SpectralPeak) *SpectralPeaks {
	return &SpectralPeaks{
		Peaks: peaks,
	}
}

// Returns the peak frequencies present in the frame.
func NewSpectralPeaksFromFrame(s *SpectralFrame, threshold float64, limit int) *SpectralPeaks {
	frame := make([]complex64, len(s.Frame))
	for i, c := range s.Frame {
		frame[i] = c
	}

	removeMax := func() *SpectralPeak {
		index := -1
		max := 0.0
		for i, c := range frame {
			v := cmplx.Abs(complex128(c))
			if v > max && v > threshold {
				max = v
				index = i
			}
		}
		if index == -1 {
			return nil
		}
		result := NewSpectralPeak(index, float64(index)*s.Bandwidth, s.Bandwidth, frame[index])
		frame[index] = 0
		return result
	}

	result := []*SpectralPeak{}
	for i := 0; i < limit; i++ {
		peak := removeMax()
		if peak == nil {
			break
		}
		result = append(result, peak)
	}
	return NewSpectralPeaks(result)
}
