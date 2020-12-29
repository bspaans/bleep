package generators

import (
	"errors"
	"fmt"

	"github.com/bspaans/bleep/audio"
)

func fract(i float64) float64 {
	return i - float64(int(i))
}

// fast version of max() function
// TODO: find package which implements asm cutting negative for better performance
// like this onehttps://stackoverflow.com/questions/1375882
func cutNegative(i float64) float64 {
	if i < 0 {
		return 0
	}
	return i
}

// writeSample writes sample to result. This is a dedicated function, cause it's checks audio config
// Input sample v is splitted by channels. Note that channels doesn't have position (left, right, etc.), only
// numbers starts with zero.
func writeSample(cfg *audio.AudioConfig, result []float64, i int, v []float64) error {
	channels := cfg.GetNumberOfChannels()
	if len(v) > channels {
		return errors.New("input sample is larger than of channels count")
	}
	if len(result) < i*channels+channels {
		return errors.New("EOF")
	}

	for offset, value := range v {
		result[i*channels+offset] = value
	}

	return nil
}

// writeSampleToAll works as writeSample, but write one sample to all channels
func writeSampleToAll(cfg *audio.AudioConfig, result []float64, i int, v float64) error {
	vs := make([]float64, cfg.GetNumberOfChannels())
	for i := range vs {
		vs[i] = v
	}
	return writeSample(cfg, result, i, vs)
}

func GetEmptySampleArray(cfg *audio.AudioConfig, n int) []float64 {
	channels := cfg.GetNumberOfChannels()
	return make([]float64, n*channels)
}

func allElementsZero(in []float64) bool {
	for _, elem := range in {
		if elem != 0 {
			return false
		}
	}
	return true
}

func waveLengthInSamples(cfg *audio.AudioConfig, pitch float64) (samples int) {
	return int(float64(cfg.SampleRate) / pitch)
}

func getNthSample(cfg *audio.AudioConfig, from []float64, i int) []float64 {
	channels := cfg.GetNumberOfChannels()
	if len(from) < i*channels+channels {
		panic(fmt.Sprintf("from is too small: len %v, i %v, chans %v", len(from), i, channels))
	}
	return from[i*channels : i*channels+channels]
}
