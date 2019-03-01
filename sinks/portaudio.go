package sinks

import (
	"fmt"
	"log"
	"os"

	"github.com/bspaans/bs8bs/audio"
	goaudio "github.com/go-audio/audio"
	"github.com/go-audio/wav"
	"github.com/gordonklaus/portaudio"
)

type PortAudioSink struct {
	Stream     *portaudio.Stream
	Buffer     []uint8
	Samples    []int
	Recording  bool
	TargetFile string
}

func NewPortAudioSink(cfg *audio.AudioConfig) (*PortAudioSink, error) {
	if err := portaudio.Initialize(); err != nil {
		return nil, err
	}
	defaultHostApi, err := portaudio.DefaultHostApi()
	if err != nil {
		return nil, err
	}
	buffer := make([]uint8, cfg.StepSize)
	streamParams := portaudio.HighLatencyParameters(nil, defaultHostApi.DefaultOutputDevice)
	stream, err := portaudio.OpenStream(streamParams, buffer)
	if err != nil {
		return nil, err
	}
	if err := stream.Start(); err != nil {
		return nil, err
	}
	return &PortAudioSink{
		Stream:     stream,
		Buffer:     buffer,
		Recording:  false,
		TargetFile: "test.wav",
	}, nil
}

func (p *PortAudioSink) Write(cfg *audio.AudioConfig, samples []int) error {
	for i, s := range samples {
		p.Buffer[i] = uint8(s)
	}
	p.Stream.Write()
	if p.Recording {
		for _, s := range samples {
			p.Samples = append(p.Samples, s)
		}
	}
	return nil
}

func (p *PortAudioSink) Close(cfg *audio.AudioConfig) error {
	if p.Recording {
		log.Println("Writing", len(p.Samples), "samples")
		out, err := os.Create(p.TargetFile)
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
			Data:           p.Samples,
			SourceBitDepth: cfg.BitDepth,
		}); err != nil {
			return err
		}
		fmt.Println("Writing", p.TargetFile)
		return encoder.Close()
	} else {
		return p.Stream.Close()
	}
}
