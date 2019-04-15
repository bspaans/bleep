package spectral

import "fmt"

// Tracks a SpectralPeak over time
type SpectralPeakTrack struct {

	// The start frame index
	FrameIndex int

	// The index into the FT series
	Index int

	Frequency float64
	Track     []*SpectralPeak
}

func NewSpectralPeakTrack(frameIndex, index int, frequency float64) *SpectralPeakTrack {
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
