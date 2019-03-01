package sinks

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/gordonklaus/portaudio"
)

type PortAudioSink struct {
	Stream *portaudio.Stream
	Buffer []uint8
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
		Stream: stream,
		Buffer: buffer,
	}, nil
}

func (p *PortAudioSink) Write(cfg *audio.AudioConfig, samples []int) error {
	for i, s := range samples {
		p.Buffer[i] = uint8(s)
	}
	p.Stream.Write()
	return nil
}

func (p *PortAudioSink) Close(cfg *audio.AudioConfig) error {
	return nil
}
