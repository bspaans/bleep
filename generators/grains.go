package generators

import (
	"math"
	"math/rand"

	"github.com/bspaans/bs8bs/audio"
)

func NewGrainsGeneratorForWavFile(cfg *audio.AudioConfig, file string, grainSize, birthrate float64, density int, spread, speed, randomPosition, gain float64, repeat bool) (Generator, error) {
	data, err := LoadWavData(file)
	if err != nil {
		return nil, err
	}
	return NewGrainsGenerator(cfg, data, grainSize, birthrate, density, spread, speed, randomPosition, gain, repeat), nil
}

// grainsize: in milliseconds
// birthrate: in milliseconds
// density: number of grain generators
// spread: milliseconds between generators
// speed: default 1.0; negative for reverse
// repeat: whether or not to loop through the sample
// randomPosition: in milliseconds
//
func NewGrainsGenerator(cfg *audio.AudioConfig, sample []float64, grainSize, birthrate float64, density int, spread, speed, randomPosition, gain float64, repeat bool) Generator {

	g := NewBaseGenerator()

	sampleLength := len(sample) / 2

	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		if g.Pitch == 0.0 {
			return result
		}

		for i := 0; i < n; i++ {

			// TODO we can modulate the grain size, birth rate, generator spread, speed, etc.

			grainWaveLength := int(math.Ceil(float64(cfg.SampleRate) * (grainSize / 1000))) // eg. 441 samples
			nrOfGrains := int(math.Ceil(float64(sampleLength) / float64(grainWaveLength)))  // eg. 44100 / 441 => 100 stereo grain

			birthRateLength := int(float64(cfg.SampleRate) * (birthrate / 1000)) // eg one grain every 441

			loopLength := 0
			if birthRateLength >= grainWaveLength {
				loopLength = nrOfGrains*birthRateLength + (grainWaveLength - birthRateLength) // eg 100*441 + 0
			} else {
				loopLength = sampleLength
			}
			generatorSpread := int(math.Ceil(float64(cfg.SampleRate)) * spread / 1000)

			// FOR EACH GENERATOR {

			for generatorNr := 0; generatorNr < density; generatorNr++ {

				// phase modulo (len(sample)/2) == where in `sample` are we?
				phase := int(speed*float64(g.Phase)) + (generatorNr * generatorSpread)

				if randomPosition != 0.0 {
					randomPosLength := float64(sampleLength) * (randomPosition / 1000)
					pos := (randomPosLength * rand.Float64()) - (randomPosLength / 2.0)
					phase = phase + int(pos)
				}
				if repeat {
					phase = (phase % loopLength)
				} else if phase >= loopLength {
					continue
				}
				if phase < 0 {
					phase = loopLength + phase
				}

				// copy sample from grain to result
				grainIx := 0

				// offset is the start of the grain
				// a grain starts every `birthRateLength`
				//
				for offset := 0; offset < loopLength; offset += birthRateLength {

					// are we currently within the grains boundaries?
					if phase >= offset && phase < offset+grainWaveLength {
						ix := (grainIx*grainWaveLength + (phase - offset)) % sampleLength
						if cfg.Stereo {
							result[i*2] += sample[ix*2] * gain
							result[i*2+1] += sample[ix*2+1] * gain
						} else {
							result[i] += sample[ix*2] * gain
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
