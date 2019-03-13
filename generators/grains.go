package generators

import (
	"math"

	"github.com/bspaans/bs8bs/audio"
)

func NewGrainsGeneratorForWavFile(cfg *audio.AudioConfig, file string, grainSize, birthrate float64, density int, spread, speed float64, repeat bool) (Generator, error) {
	data, err := LoadWavData(file)
	if err != nil {
		return nil, err
	}
	return NewGrainsGenerator(cfg, data, grainSize, birthrate, density, spread, speed, repeat), nil
}

// grainsize: in milliseconds
// birthrate: in milliseconds
// density: number of grain generators
// spread: milliseconds between generators
// speed: default 1.0; negative for reverse
// repeat: whether or not to loop through the sample
//
func NewGrainsGenerator(cfg *audio.AudioConfig, sample []float64, grainSize, birthrate float64, density int, spread, speed float64, repeat bool) Generator {

	g := NewBaseGenerator()

	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		if g.Pitch == 0.0 {
			return result
		}

		for i := 0; i < n; i++ {

			// TODO we can modulate the grain size, birth rate, generator spread, speed, etc.

			grainWaveLength := int(math.Ceil(float64(cfg.SampleRate) * (grainSize / 1000))) // eg. 441 samples
			nrOfGrains := int(math.Ceil(float64(len(sample)/2) / float64(grainWaveLength))) // eg. 44100 / 441 => 100 stereo grain

			birthRateLength := int(float64(cfg.SampleRate) * (birthrate / 1000))           // eg one grain every 441
			loopLength := nrOfGrains*birthRateLength + (grainWaveLength - birthRateLength) // eg 100*441 + 0

			generatorSpread := int(math.Ceil(float64(cfg.SampleRate)) * spread / 1000)

			// FOR EACH GENERATOR {

			for generatorNr := 0; generatorNr < density; generatorNr++ {

				// phase modulo (len(sample)/2) == where in `sample` are we?
				phase := int((speed*2)*float64(g.Phase)) + (generatorNr * generatorSpread)
				if repeat {
					phase = (phase % len(sample) / 2) % loopLength
				} else if phase*2 >= len(sample) {
					continue
				}
				if phase < 0 {
					phase = (len(sample) / 2) + phase
				}

				// copy sample from grain to result
				grainIx := 0

				// offset is the start of the grain
				for offset := 0; offset < loopLength; offset += birthRateLength {

					if phase >= offset && phase < offset+grainWaveLength {
						if cfg.Stereo {
							result[i*2] += sample[phase*2]
							result[i*2+1] += sample[phase*2+1]
						} else {
							result[i] += sample[phase*2]
						}
					}

					grainIx++
				}
			}

			g.Phase++
		}
		return result
	}
	g.SetPitchFunc = func(f float64) {
		g.Phase = 0
	}
	return g
}
