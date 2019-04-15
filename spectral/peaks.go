package spectral

import "math/cmplx"

// A list of peaks found in a spectral frame. To track peaks across frames see
// the SpectralTrack.
type SpectralPeaks struct {
	Peaks []*SpectralPeak
}

func newSpectralPeaks(peaks []*SpectralPeak) *SpectralPeaks {
	return &SpectralPeaks{
		Peaks: peaks,
	}
}

/*

Returns the peak frequencies present in the frame by repeatedly:

			* selecting the frame with the greatest magnitude
			* adding it to the result if the magnitude is above the threshold and we've not reached the limit.
			* zeroing out the bin, so that the next peak will get found in the next round.

*/
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
		result := newSpectralPeak(index, float64(index)*s.Bandwidth, s.Bandwidth, frame[index])
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
	return newSpectralPeaks(result)
}
