package spectral

import "fmt"

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
	return fmt.Sprintf("Spectral Peak Track starting at frame %d %.2fHz [%d] - %d frames", s.FrameIndex, s.Frequency, s.Index, len(s.Track))
}

func (s *SpectralPeakTrack) FrequencyEnvelope() []float64 {
	return []float64{}
}

func (s *SpectralPeakTrack) AmplitudeEnvelope() []float64 {
	return []float64{}
}
