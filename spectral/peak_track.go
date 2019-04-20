package spectral

import (
	"fmt"
	"math"
	"math/cmplx"
)

// Tracks a SpectralPeak over time. For example: this could track the
// frequency bin around 440.0Hz over time. It is usually constructed
// by the NewSpectralPeakTracksFromSpectralFrames function.
type SpectralPeakTrack struct {

	// The start frame index
	FrameIndex int

	// The index into the FT series
	Index int

	// The low boundary of the frequency bin. To calculate a more accurate value
	// see the FrequencyEnvelope method.
	Frequency float64

	// The tracked peaks themselves
	Track []*SpectralPeak
}

func newSpectralPeakTrack(frameIndex, index int, frequency float64) *SpectralPeakTrack {
	return &SpectralPeakTrack{
		FrameIndex: frameIndex,
		Index:      index,
		Frequency:  frequency,
		Track:      []*SpectralPeak{},
	}
}

func (s *SpectralPeakTrack) Add(peak *SpectralPeak) {
	s.Track = append(s.Track, peak)
}

func (s *SpectralPeakTrack) String() string {
	fmt.Println(s.FrequencyEnvelope())
	return fmt.Sprintf("Spectral Peak Track starting at frame %d %.2fHz [%d] - %d frames", s.FrameIndex, s.Frequency, s.Index, len(s.Track))
}

func (s *SpectralPeakTrack) FrequencyEnvelope() []float64 {
	result := make([]float64, len(s.Track))
	div := math.Pi * 2 * (1024.0 - 256.0)
	for i, peak := range s.Track {
		// skip the first value
		if i == 0 {
			continue
		}
		prevRadian := cmplx.Phase(complex128(s.Track[i-1].Value))
		radian := cmplx.Phase(complex128(peak.Value))
		// TODO: this doesn't work because we're dealing with wrapped phase (-pi <-> pi)
		// see: https://en.wikipedia.org/wiki/Instantaneous_phase
		diff := math.Abs(radian - prevRadian)
		velocty := diff / (1024.0 - 256.0)
		freq := velocty * 44100 / (math.Pi * 2)
		fmt.Printf("%.3f radian/sample %.2fHz %.2fHz\n", velocty, freq, freq+s.Frequency)
		result[i] = (radian - prevRadian) / div
	}
	return result
}

func (s *SpectralPeakTrack) AmplitudeEnvelope() []float64 {
	result := make([]float64, len(s.Track))
	for i, peak := range s.Track {
		result[i] = cmplx.Abs(complex128(peak.Value))
	}
	return result
}
