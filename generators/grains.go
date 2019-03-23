package generators

import (
	"math"
	"math/rand"

	"github.com/bspaans/bs8bs/audio"
)

type GrainsGenerator struct {
	*BaseGenerator
	GrainGain float64
	// grainsize: in milliseconds. Recommended value between 10-50.
	GrainSize float64
	// birthrate: in milliseconds
	BirthRate float64
	// density: number of grain generators
	Density int
	// spread: milliseconds between generators
	Spread float64
	// speed: default 1.0; negative for reverse
	Speed float64
	// repeat: whether or not to loop through the sample
	Repeat bool
	// randomPosition: in milliseconds
	RandomPosition float64
	// The window function
	WindowFunction WindowFunction
}

// grainsize: in milliseconds
// birthrate: in milliseconds
// density: number of grain generators
// spread: milliseconds between generators
// speed: default 1.0; negative for reverse
// repeat: whether or not to loop through the sample
// randomPosition: in milliseconds
//
func NewGrainsGeneratorForWavFile(cfg *audio.AudioConfig, file string, grainSize, birthrate float64, density int, spread, speed, randomPosition, gain float64, repeat bool) (Generator, error) {
	data, err := LoadWavData(file)
	if err != nil {
		return nil, err
	}
	return NewGrainsGenerator(cfg, data, grainSize, birthrate, density, spread, speed, randomPosition, gain, repeat), nil
}

// Synchronous Granular Synthesis.
//
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
	gen := GrainsGenerator{
		BaseGenerator:  g,
		GrainGain:      gain,
		GrainSize:      grainSize,
		BirthRate:      birthrate,
		Density:        density,
		Spread:         spread,
		Speed:          speed,
		RandomPosition: randomPosition,
		Repeat:         repeat,
		WindowFunction: TrapezoidalWindowFunction,
	}

	sampleLength := len(sample) / 2

	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		if g.Pitch == 0.0 {
			return result
		}

		grainWaveLength := int(math.Ceil(float64(cfg.SampleRate) * (gen.GrainSize / 1000))) // eg. 441 samples
		nrOfGrains := int(math.Ceil(float64(sampleLength) / float64(grainWaveLength)))      // eg. 44100 / 441 => 100 stereo grain
		birthRateLength := int(float64(cfg.SampleRate) * (gen.BirthRate / 1000))            // eg one grain every 441
		loopLength := 0
		if birthRateLength >= grainWaveLength {
			loopLength = nrOfGrains*birthRateLength + (grainWaveLength - birthRateLength) // eg 100*441 + 0
		} else {
			loopLength = sampleLength
		}
		generatorSpread := int(math.Ceil(float64(cfg.SampleRate)) * gen.Spread / 1000)

		windowValues := gen.WindowFunction(grainWaveLength)

		for i := 0; i < n; i++ {

			// FOR EACH GENERATOR {

			for generatorNr := 0; generatorNr < gen.Density; generatorNr++ {

				// phase modulo (len(sample)/2) == where in `sample` are we?
				phase := int(gen.Speed*float64(g.Phase)) + (generatorNr * generatorSpread)

				if gen.RandomPosition != 0.0 {
					randomPosLength := float64(sampleLength) * (gen.RandomPosition / 1000)
					pos := (randomPosLength * rand.Float64()) - (randomPosLength / 2.0)
					phase = phase + int(pos)
				}
				if gen.Repeat {
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
						window := windowValues[(phase - offset)]
						if cfg.Stereo {
							result[i*2] += sample[ix*2] * g.Gain * window
							result[i*2+1] += sample[ix*2+1] * g.Gain * window
						} else {
							result[i] += sample[ix*2] * g.Gain * window
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
	return &gen
}
