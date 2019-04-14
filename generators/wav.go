package generators

import (
	"fmt"
	"math"
	"os"

	"github.com/bspaans/bleep/audio"
	"github.com/go-audio/wav"
)

func NewWavGenerator(file string, gain float64) (Generator, error) {
	g := NewBaseGenerator()
	data, err := LoadWavData(file)
	if err != nil {
		return nil, err
	}
	sampleLength := len(data) / 2

	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		result := GetEmptySampleArray(cfg, n)
		if g.Pitch == 0.0 {
			return result
		}
		for i := 0; i < n; i++ {
			if g.Phase >= sampleLength {
				continue
			}
			if cfg.Stereo {
				result[i*2] = data[g.Phase*2] * gain * g.Gain
				result[i*2+1] = data[g.Phase*2+1] * gain * g.Gain
			} else {
				result[i] = data[g.Phase*2] * gain
			}
			g.Phase++
		}
		return result
	}
	g.SetPitchFunc = func(f float64) {
		g.Phase = 0
	}
	return g, nil
}

func NewPitchedWavGenerator(file string, gain, sampleBasePitch float64) (Generator, error) {
	g := NewBaseGenerator()
	data, err := LoadWavData(file)
	if err != nil {
		return nil, err
	}
	if sampleBasePitch == 0.0 {
		sampleBasePitch = 440.0
	}
	sampleLength := len(data) / 2

	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {
		pitch := g.GetPitch()
		freqRatio := pitch / sampleBasePitch
		result := GetEmptySampleArray(cfg, n)
		if pitch == 0.0 {
			return result
		}
		for i := 0; i < n; i++ {
			ix := int(float64(g.Phase) * freqRatio)
			if ix >= sampleLength {
				continue
			}
			remainder := (float64(g.Phase) * freqRatio) - float64(ix)

			if cfg.Stereo {
				dx1 := 0.0
				dx2 := 0.0
				if ix*2+2 < len(data) {
					dx1 = data[ix*2+2]
				}
				if ix*2+3 < len(data) {
					dx2 = data[ix*2+3]
				}
				v1 := (1.0-remainder)*data[ix*2] + remainder*dx1
				v2 := (1.0-remainder)*data[ix*2+1] + remainder*dx2

				result[i*2] = v1 * gain * g.Gain
				result[i*2+1] = v2 * gain * g.Gain
			} else {
				v := (1.0-remainder)*data[ix*2] + remainder*data[ix*2+2]
				result[i] = v * gain * g.Gain
			}
			g.Phase++
		}
		return result
	}
	g.SetPitchFunc = func(f float64) {
		g.Pitch = f
		g.Phase = 0
	}
	return g, nil
}

var WavCache = map[string][]float64{}

// Loads file and returns a stereo sample
func LoadWavData(file string) ([]float64, error) {
	cached, ok := WavCache[file]
	if ok {
		return cached, nil
	}
	fmt.Println("Loading", file)
	f, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	decoder := wav.NewDecoder(f)
	buffer, err := decoder.FullPCMBuffer()
	if err != nil {
		return nil, err
	}
	l := len(buffer.Data)
	if buffer.Format.NumChannels == 1 {
		l = l * 2
	}
	data := make([]float64, l)
	maxV := math.Pow(2, float64(buffer.SourceBitDepth)-1)
	j := 0

	for i := 0; i < len(buffer.Data); i++ {
		if buffer.Format.NumChannels == 2 {
			data[i] = float64(buffer.Data[i]) / maxV
		} else {
			data[i*2] = float64(buffer.Data[j]) / maxV
			data[i*2+1] = float64(buffer.Data[j]) / maxV
			j++
		}
	}
	WavCache[file] = data
	return data, err
}
