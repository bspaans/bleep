package generators

import (
	"fmt"
	"math"

	"github.com/bspaans/bs8bs/audio"
)

func NewGrainsGeneratorForWavFile(cfg *audio.AudioConfig, file string, grainSize, birthrate float64, repeat bool) (Generator, error) {
	fmt.Println("New grains")
	data, err := LoadWavData(file)
	if err != nil {
		return nil, err
	}
	return NewGrainsGenerator(cfg, data, grainSize, birthrate, repeat), nil
}

// Create a new grains generator for the given stereo sample
// grainSize and birthrate in milliseconds
//
func NewGrainsGenerator(cfg *audio.AudioConfig, sample []float64, grainSize, birthrate float64, repeat bool) Generator {

	grains := CreateGrainsForSteroSample(cfg, sample, grainSize)
	offsets, loopLength := GetStartingOffsetsForGrains(cfg, birthrate, len(grains))
	grainWaveLength := int(float64(cfg.SampleRate) * (grainSize / 1000))

	g := NewBaseGenerator()

	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		if g.Pitch == 0.0 {
			return result
		}

		for i := 0; i < n; i++ {
			phase := g.Phase
			if repeat {
				phase = phase % loopLength
			}

			if cfg.Stereo {
				for grainIx, offset := range offsets {
					if phase >= offset && phase < offset+grainWaveLength {
						ix := phase - offset
						grain := grains[grainIx]
						result[i*2] += grain[ix*2]
						result[i*2+1] += grain[ix*2+1]
					}
				}
			} else {
				for grainIx, offset := range offsets {
					if phase >= offset && phase < offset+grainWaveLength {
						ix := phase - offset
						result[i] += grains[grainIx][ix*2]
					}
				}
			}

			g.Phase += 1
		}

		return result
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
	grainWaveLength := int(math.Ceil(float64(cfg.SampleRate) * (grainSize / 1000))) // eg. 441 samples
	nrOfGrains := int(math.Ceil(float64(len(sample)/2) / float64(grainWaveLength))) // eg. 44100 / 441 => 100 stereo grain
	grains := make([][]float64, nrOfGrains)

	for i := 0; i < nrOfGrains; i++ {
		grain := make([]float64, grainWaveLength*2) // eg. one stereo grain of 882 samples

		for j := 0; j < grainWaveLength*2; j++ { // read the next 882 samples
			ix := i*grainWaveLength*2 + j
			if ix < len(sample) {
				grain[j] = sample[ix]
			}
		}

		grains[i] = grain
	}
	return grains
}

// Returns an array containing the starting offset for each grain
// given the birth rate (= grains spawn period)
//
func GetStartingOffsetsForGrains(cfg *audio.AudioConfig, birthrate float64, grains int) ([]int, int) {
	birthRateLength := int(float64(cfg.SampleRate) * (birthrate / 1000))
	result := make([]int, grains)
	for i := 0; i < grains; i++ {
		result[i] = birthRateLength * i
	}
	return result, grains * birthRateLength
}
