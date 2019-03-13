package generators

import (
	"math"

	"github.com/bspaans/bs8bs/audio"
)

func NewGrainsGeneratorForWavFile(cfg *audio.AudioConfig, file string, grainSize, birthrate float64, density int, spread float64, repeat bool) (Generator, error) {
	data, err := LoadWavData(file)
	if err != nil {
		return nil, err
	}
	return NewGrainsGenerator(cfg, data, grainSize, birthrate, density, spread, repeat), nil
}

func NewGrainsGenerator(cfg *audio.AudioConfig, sample []float64, grainSize, birthrate float64, density int, spread float64, repeat bool) Generator {

	g := NewBaseGenerator()

	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		if g.Pitch == 0.0 {
			return result
		}

		for i := 0; i < n; i++ {

			// TODO we can modulate the grain size, birth rate and generator spread

			grainWaveLength := int(math.Ceil(float64(cfg.SampleRate) * (grainSize / 1000))) // eg. 441 samples
			nrOfGrains := int(math.Ceil(float64(len(sample)/2) / float64(grainWaveLength))) // eg. 44100 / 441 => 100 stereo grain

			birthRateLength := int(float64(cfg.SampleRate) * (birthrate / 1000))
			loopLength := nrOfGrains * birthRateLength

			generatorSpread := int(math.Ceil(float64(cfg.SampleRate)) * spread / 1000)

			// FOR EACH GENERATOR {

			for generatorNr := 0; generatorNr < density; generatorNr++ {

				// phase modulo (len(sample)/2) == where in `sample` are we?
				phase := g.Phase + (generatorNr * generatorSpread)
				if repeat {
					phase = phase % loopLength
				}
				phase = phase % (len(sample) / 2)

				// copy sample from grain to result
				grainIx := 0
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
