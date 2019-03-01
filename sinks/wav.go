package sinks

import (
	"fmt"
	"os"

	"github.com/bspaans/bs8bs/audio"
	goaudio "github.com/go-audio/audio"
	"github.com/go-audio/wav"
)

type WavSink struct {
	TargetFile  string
	AudioBuffer *goaudio.IntBuffer
}

func NewWavSink(file string) *WavSink {
	return &WavSink{
		TargetFile:  file,
		AudioBuffer: nil,
	}
}

func (w *WavSink) Write(cfg *audio.AudioConfig, samples []int) error {
	numChans := 1
	if w.AudioBuffer == nil {
		w.AudioBuffer = &goaudio.IntBuffer{
			Format: &goaudio.Format{
				NumChannels: numChans,
				SampleRate:  cfg.SampleRate,
			},
			Data:           samples,
			SourceBitDepth: cfg.BitDepth,
		}
	} else {
		for _, s := range samples {
			w.AudioBuffer.Data = append(w.AudioBuffer.Data, s)
		}
	}

	return nil
}

func (w *WavSink) Close(cfg *audio.AudioConfig) error {
	out, err := os.Create(w.TargetFile)
	if err != nil {
		panic(fmt.Sprintf("couldn't create output file %v - %v", w.TargetFile, err))
	}
	numChans := 1
	audioFormat := 1 // PCM
	encoder := wav.NewEncoder(out, cfg.SampleRate, cfg.BitDepth, numChans, audioFormat)
	if err := encoder.Write(w.AudioBuffer); err != nil {
		return err
	}
	if err = encoder.Close(); err != nil {
		return err
	}
	return nil
}
