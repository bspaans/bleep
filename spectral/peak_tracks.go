package spectral

import (
	"fmt"
	"sort"
)

type SpectralPeakTracks struct {
	Tracks []*SpectralPeakTrack
}

func (s *SpectralPeakTracks) String() string {
	result := "Spectral Peak Tracks:\n"
	for _, track := range s.Tracks {
		result += "  " + track.String() + "\n"
	}
	return result
}

func NewSpectralPeakTracksFromSpectralFrames(frames []*SpectralFrame) *SpectralPeakTracks {
	tracks := []*SpectralPeakTrack{}
	activeTracks := map[int]*SpectralPeakTrack{}

	amplitudeThreshold := 2.0
	limit := 20

	for i, frame := range frames {
		peaks := NewSpectralPeaksFromFrame(frame, amplitudeThreshold, limit)
		fmt.Println(i, peaks)
		seen := map[int]bool{}
		for _, peak := range peaks.Peaks {
			ix := peak.Index
			track, isActive := activeTracks[ix]
			if !isActive {
				track = NewSpectralPeakTrack(i, ix, peak.Frequency)
			}
			track.Add(peak)
			activeTracks[ix] = track
			seen[ix] = true
		}
		for ix, track := range activeTracks {
			_, ok := seen[ix]
			if !ok {
				tracks = append(tracks, track)
				delete(activeTracks, ix)
			}
		}
	}
	for _, track := range activeTracks {
		tracks = append(tracks, track)
	}
	sort.Slice(tracks, func(i, j int) bool {
		if tracks[i].FrameIndex == tracks[j].FrameIndex {
			return len(tracks[i].Track) > len(tracks[j].Track)
		}
		return tracks[i].FrameIndex < tracks[j].FrameIndex

	})
	return &SpectralPeakTracks{
		Tracks: tracks,
	}
}
