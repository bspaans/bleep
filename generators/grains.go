package generators

import (
	"github.com/bspaans/bs8bs/audio"
)

func NewGrainsGeneratorForWavFile(cfg *audio.AudioConfig, file string) (Generator, error) {
	data, err := LoadWavData(file)
	if err != nil {
		return nil, err
	}
	return NewGrainsGenerator(cfg, data), nil
}

// Create a new grains generator for the given stereo sample
//
func NewGrainsGenerator(cfg *audio.AudioConfig, sample []float64) Generator {

	grainSize := 10.0  // ms
	birthrate := 100.0 // ms
	grains := CreateGrainsForSteroSample(cfg, sample, grainSize)
	offsets := GetStartingOffsetsForGrains(cfg, birthrate, len(grains))
	grainWaveLength := int(float64(cfg.SampleRate) * (grainSize / 1000))

	g := NewBaseGenerator()

	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		if g.Pitch == 0.0 {
			return result
		}

		for i := 0; i < n; i++ {

			if cfg.Stereo {
				for grainIx, offset := range offsets {
					if g.Phase >= offset && g.Phase < offset+grainWaveLength {
						ix := g.Phase - offset
						grain := grains[grainIx]
						result[i*2] += grain[ix*2]
						result[i*2+1] += grain[ix*2+1]
					}
				}
			} else {
				for grainIx, offset := range offsets {
					if g.Phase >= offset && g.Phase < offset+grainWaveLength {
						ix := g.Phase - offset
						result[i] += grains[grainIx][ix*2]
					}
				}
			}

			g.Phase += 1
		}

		return []float64{}
	}
	g.SetPitchFunc = func(f float64) {
		g.Phase = 0
	}
	return g
}

// sample is a stereo sample
// grainSize in milliseconds
//
func CreateGrainsForSteroSample(cfg *audio.AudioConfig, sample []float64, grainSize float64) [][]float64 {
	grainWaveLength := int(float64(cfg.SampleRate) * (grainSize / 1000))
	nrOfGrains := len(sample) / 2
	grains := make([][]float64, nrOfGrains)

	for i := 0; i < nrOfGrains; i++ {
		grain := make([]float64, grainWaveLength*2)
		for j := 0; j < grainWaveLength*2; j++ {
			ix := i*grainWaveLength + j
			grain[j] = sample[ix]
		}
		grains[i] = grain
	}
	return grains
}

// Returns an array containing the starting offset for each grain
// given the birth rate (= grains spawn period)
//
func GetStartingOffsetsForGrains(cfg *audio.AudioConfig, birthrate float64, grains int) []int {
	birthRateLength := int(float64(cfg.SampleRate) * (birthrate / 1000))
	result := make([]int, grains)
	for i := 0; i < grains; i++ {
		result[i] = birthRateLength * i
	}
	return result
}
