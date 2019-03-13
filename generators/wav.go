package generators

import (
	"fmt"
	"math"
	"os"

	"github.com/bspaans/bs8bs/audio"
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

var WavCache = map[string][]float64{}

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
