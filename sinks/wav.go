package sinks

import (
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
	return nil
}

func (w *WavSink) Close(cfg *audio.AudioConfig) error {
	return nil
}
