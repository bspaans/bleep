package generators

import (
	"fmt"
	"math"
	"os"

	"github.com/bspaans/bs8bs/audio"
	"github.com/go-audio/wav"
)

func NewWavGenerator(file string) (Generator, error) {
	g := NewBaseGenerator()
	f, err := os.Open(file)
	if err != nil {
		return nil, err
	}
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
	max := 0
	min := 0
	for i := 0; i < len(buffer.Data); i++ {
		if buffer.Format.NumChannels == 2 {
			data[i] = float64(buffer.Data[i]) / maxV
		} else {
			if buffer.Data[j] > max {
				max = buffer.Data[j]
			}
			if buffer.Data[j] < min {
				min = buffer.Data[j]
			}
			data[i*2] = float64(buffer.Data[j]) / maxV
			data[i*2+1] = float64(buffer.Data[j]) / maxV
			j++
		}
	}
	fmt.Println(max, min, maxV)
	sampleLength := l / 2
	f.Close()

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
				result[i] = data[g.Phase*2]
				result[i+1] = data[g.Phase*2+1]
			} else {
				result[i] = data[i*2]
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
