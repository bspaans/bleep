package sinks

import (
	"fmt"
	"log"
	"os"

	"github.com/bspaans/bs8bs/audio"
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

func NewWavSink(cfg *audio.AudioConfig, file string) (*WavSink, error) {
	out, err := os.Create(file)
	if err != nil {
		return nil, err
	}
	numChans := 1
	audioFormat := 1 // PCM
	encoder := wav.NewEncoder(out, cfg.SampleRate, cfg.BitDepth, numChans, audioFormat)
	return &WavSink{
		TargetFile:  file,
		AudioBuffer: nil,
		Encoder:     encoder,
		Samples:     []int{},
	}, nil
}

func (w *WavSink) Write(cfg *audio.AudioConfig, samples []int) error {
	for _, s := range samples {
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
	audioFormat := 1 // PCM
	encoder := wav.NewEncoder(out, cfg.SampleRate, cfg.BitDepth, numChans, audioFormat)
	if err := encoder.Write(&goaudio.IntBuffer{
		Format: &goaudio.Format{
			SampleRate:  cfg.SampleRate,
			NumChannels: 1,
		},
		Data:           w.Samples,
		SourceBitDepth: cfg.BitDepth,
	}); err != nil {
		return err
	}
	fmt.Println("Writing", w.TargetFile)
	return encoder.Close()
}
