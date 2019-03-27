package sinks

import (
	"container/ring"
	"fmt"
	"math"

	"github.com/bspaans/bleep/audio"
	"github.com/gordonklaus/portaudio"
)

type PortAudioSink struct {
	Stream    *portaudio.Stream
	Buffer    *ring.Ring
	WriteFrom *ring.Ring
	Samples   []int
	Stereo    bool
}

func NewPortAudioSink(cfg *audio.AudioConfig) (*PortAudioSink, error) {
	if err := portaudio.Initialize(); err != nil {
		return nil, err
	}
	defaultHostApi, err := portaudio.DefaultHostApi()
	if err != nil {
		return nil, err
	}
	defaultValue := int(math.Pow(2, 15))
	if cfg.BitDepth == 8 {
		defaultValue = int(math.Pow(float64(cfg.BitDepth), 2.0)/2 - 1)
	}
	buffer := ring.New(44096)
	for buffer.Value == nil {
		buffer.Value = defaultValue
		buffer = buffer.Next()
	}
	streamParams := portaudio.LowLatencyParameters(nil, defaultHostApi.DefaultOutputDevice)
	streamParams.SampleRate = float64(cfg.SampleRate)
	fmt.Println(streamParams)
	p := &PortAudioSink{
		Buffer:    buffer,
		WriteFrom: buffer,
		Stereo:    cfg.Stereo,
	}
	var callback interface{}
	callback = p.Callback_8bit
	if cfg.BitDepth == 16 {
		callback = p.Callback_16bit
	}

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

func (p *PortAudioSink) Callback_8bit(in, out []uint8, timeInfo portaudio.StreamCallbackTimeInfo, flags portaudio.StreamCallbackFlags) {
	ix := 0
	for i := 0; i < len(out)/2; i++ {
		v := uint8(p.WriteFrom.Value.(int))
		out[ix] = v
		p.WriteFrom = p.WriteFrom.Next()

		if p.Stereo {
			v := uint8(p.WriteFrom.Value.(int))
			out[ix+1] = v
			p.WriteFrom = p.WriteFrom.Next()
		} else {
			out[ix+1] = v
		}
		ix += 2
	}
}

func (p *PortAudioSink) Callback_16bit(in, out []int16, timeInfo portaudio.StreamCallbackTimeInfo, flags portaudio.StreamCallbackFlags) {
	m := int16(math.Pow(2, 15))
	ix := 0
	for i := 0; i < len(out)/2; i++ {
		v := int16(p.WriteFrom.Value.(int)) - m
		out[ix] = v
		p.WriteFrom = p.WriteFrom.Next()

		if p.Stereo {
			v := int16(p.WriteFrom.Value.(int)) - m
			out[ix+1] = v
			p.WriteFrom = p.WriteFrom.Next()
		} else {
			out[ix+1] = v
		}
		ix += 2
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
	return p.Stream.Close()
}
