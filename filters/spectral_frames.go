package filters

import (
	"fmt"
	"math"

	"github.com/barnex/fftw"
	"github.com/bspaans/bleep/audio"
)

type SpectralFrame struct {
	Start                  int
	Length                 int
	Frame                  []complex64
	Bandwidth              float64
	Duration               float64
	DurationWithoutOverlap float64
}

func NewSpectralFrame(sampleRate, start, length int, frame []complex64) *SpectralFrame {
	return &SpectralFrame{
		Start:     start,
		Length:    length,
		Frame:     frame,
		Bandwidth: float64(sampleRate) / float64(length),
		Duration:  float64(length) / float64(sampleRate),
	}
}

func (s *SpectralFrame) String() string {
	return fmt.Sprintf("Spectral Frame %d bands of %.2f Hz", s.Length, s.Bandwidth)
}

// If stereo data is passed, only the left channel is used.
//
func GetSpectralFrames(cfg *audio.AudioConfig, samples []float64, windowWidth, overlap int) []*SpectralFrame {

	sampleWidth := len(samples)
	if cfg.Stereo {
		sampleWidth = sampleWidth / 2
	}
	nrOfFrames := int(math.Ceil(float64(sampleWidth) / float64(windowWidth-overlap)))
	result := make([]*SpectralFrame, nrOfFrames)
	i := 0
	for start := 0; start < sampleWidth; start += windowWidth - overlap {

		in := make([]float32, windowWidth)
		out := make([]complex64, windowWidth)
		plan := fftw.PlanR2C([]int{windowWidth}, in, out, fftw.ESTIMATE)

		end := start + windowWidth
		if end >= sampleWidth {
			end = sampleWidth - 1
		}
		for j := start; j < end; j++ {
			if cfg.Stereo {
				in[(j - start)] = float32(samples[j*2])
			} else {
				in[j-start] = float32(samples[j])
			}
		}
		plan.Execute()

		frame := NewSpectralFrame(cfg.SampleRate, start, windowWidth, out)
		frame.DurationWithoutOverlap = frame.Duration - (float64(overlap) / float64(cfg.SampleRate))
		result[i] = frame
		i++
	}
	return result
}
