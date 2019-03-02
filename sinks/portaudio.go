package sinks

import (
	"container/ring"
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
	Buffer     *ring.Ring
	WriteFrom  *ring.Ring
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
	buffer := ring.New(44096)
	for buffer.Value == nil {
		buffer.Value = 127
		buffer = buffer.Next()
	}
	streamParams := portaudio.LowLatencyParameters(nil, defaultHostApi.DefaultOutputDevice)
	p := &PortAudioSink{
		Buffer:     buffer,
		WriteFrom:  buffer,
		Recording:  false,
		TargetFile: "test.wav",
	}
	callback := p.Callback

	stream, err := portaudio.OpenStream(streamParams, callback)
	if err != nil {
		return nil, err
	}
	if err := stream.Start(); err != nil {
		return nil, err
	}
	p.Stream = stream
	return p, nil
}

func (p *PortAudioSink) Callback(in, out []uint8, timeInfo portaudio.StreamCallbackTimeInfo, flags portaudio.StreamCallbackFlags) {
	ix := 0
	for i := 0; i < len(out)/2; i++ {
		v := uint8(p.WriteFrom.Value.(int))
		out[ix] = v
		out[ix+1] = v
		ix += 2
		p.WriteFrom = p.WriteFrom.Next()
	}
}

func (p *PortAudioSink) Write(cfg *audio.AudioConfig, samples []int) error {
	for _, s := range samples {
		p.Buffer.Value = s
		p.Buffer = p.Buffer.Next()
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
