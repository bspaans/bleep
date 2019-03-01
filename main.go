package main

import (
	"fmt"
	"os"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
	go_audio "github.com/go-audio/audio"
	"github.com/go-audio/wav"
)

func WriteWavFile(cfg *audio.AudioConfig, samples []int, file string) error {

	out, err := os.Create(file)
	if err != nil {
		panic(fmt.Sprintf("couldn't create output file - %v", err))
	}
	numChans := 1
	audioFormat := 1 // PCM
	encoder := wav.NewEncoder(out, cfg.SampleRate, cfg.BitDepth, numChans, audioFormat)

	buf := &go_audio.IntBuffer{
		Format: &go_audio.Format{
			NumChannels: numChans,
			SampleRate:  cfg.SampleRate,
		},
		Data:           samples,
		SourceBitDepth: cfg.BitDepth,
	}

	if err := encoder.Write(buf); err != nil {
		return err
	}
	if err = encoder.Close(); err != nil {
		return err
	}
	return nil
}

func main() {
	cfg := audio.NewAudioConfig()
	samples := generators.NewSineWaveOscillator().GetSamples(cfg, cfg.SampleRate)
	WriteWavFile(cfg, samples, "test.wav")
}
