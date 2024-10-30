package sinks

import (
	"fmt"
	"log"
	"math"
	"os"

	"github.com/bspaans/bleep/audio"
	goaudio "github.com/go-audio/audio"
	"github.com/go-audio/wav"
)

type WavSink struct {
	TargetFile  string
	AudioBuffer *goaudio.IntBuffer
	Encoder     *wav.Encoder
	Samples     []int
	Closed      bool
}

func WriteFloatSamplesToWavFile(cfg *audio.AudioConfig, samples []float64, file string) error {
	result := make([]int, len(samples))
	maxValue := math.Pow(2, float64(cfg.BitDepth))
	for i, sample := range samples {
		scaled := (sample + 1) * (maxValue / 2)
		maxClipped := math.Max(0, math.Ceil(scaled))
		result[i] = int(math.Min(maxClipped, maxValue-1))
	}
	return WriteSamplesToWavFile(cfg, result, file)
}

func WriteSamplesToWavFile(cfg *audio.AudioConfig, samples []int, file string) error {
	sink, err := NewWavSink(cfg, file)
	if err != nil {
		return err
	}
	if err := sink.Write(cfg, samples); err != nil {
		return err
	}
	return sink.Close(cfg)
}

func NewWavSink(cfg *audio.AudioConfig, file string) (*WavSink, error) {
	return &WavSink{
		TargetFile:  file,
		AudioBuffer: nil,
		Samples:     []int{},
	}, nil
}

func (w *WavSink) Start(f func(cfg *audio.AudioConfig, n int) []int) error {
	return nil
}

func (w *WavSink) Write(cfg *audio.AudioConfig, samples []int) error {
	for _, s := range samples {
		if cfg.BitDepth == 16 {
			s = s - (2 << 14)
		}
		w.Samples = append(w.Samples, s)
	}
	return nil
}

func (w *WavSink) Close(cfg *audio.AudioConfig) error {
	log.Println("Writing", len(w.Samples), "samples")
	out, err := os.Create(w.TargetFile)
	if err != nil {
		return err
	}

	numChans := 1
	if cfg.Stereo {
		numChans = 2
	}
	audioFormat := 1 // PCM
	encoder := wav.NewEncoder(out, cfg.SampleRate, cfg.BitDepth, numChans, audioFormat)
	if err := encoder.Write(&goaudio.IntBuffer{
		Format: &goaudio.Format{
			SampleRate:  cfg.SampleRate,
			NumChannels: numChans,
		},
		Data:           w.Samples,
		SourceBitDepth: cfg.BitDepth,
	}); err != nil {
		return err
	}
	fmt.Println("Writing", w.TargetFile)
	return encoder.Close()
}
