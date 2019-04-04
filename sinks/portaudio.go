package sinks

import (
	"math"

	"github.com/bspaans/bleep/audio"
	"github.com/gordonklaus/portaudio"
)

type PortAudioSink struct {
	Stream     *portaudio.Stream
	Samples    []int
	Stereo     bool
	ChanBuffer chan int
	Config     *audio.AudioConfig
	GetSamples func(cfg *audio.AudioConfig, n int) []int
	WavSink    *WavSink
}

func NewPortAudioSink(cfg *audio.AudioConfig) (*PortAudioSink, error) {
	if err := portaudio.Initialize(); err != nil {
		return nil, err
	}
	p := &PortAudioSink{
		Stereo:     cfg.Stereo,
		ChanBuffer: make(chan int, cfg.SampleRate*2),
		Config:     cfg,
	}
	return p, nil
}

func (p *PortAudioSink) Start(f func(cfg *audio.AudioConfig, n int) []int) error {
	var callback interface{}
	callback = p.Callback_8bit
	if p.Config.BitDepth == 16 {
		callback = p.Callback_16bit
	}
	p.GetSamples = f

	defaultHostApi, err := portaudio.DefaultHostApi()
	if err != nil {
		return err
	}
	streamParams := portaudio.LowLatencyParameters(nil, defaultHostApi.DefaultOutputDevice)
	streamParams.SampleRate = float64(p.Config.SampleRate)
	stream, err := portaudio.OpenStream(streamParams, callback)
	if err != nil {
		return err
	}
	if err := stream.Start(); err != nil {
		return err
	}
	p.Stream = stream
	return nil
}

func (p *PortAudioSink) Callback_8bit(out []uint8, timeInfo portaudio.StreamCallbackTimeInfo, flags portaudio.StreamCallbackFlags) {
	var samples []int
	if p.Config.Stereo {
		samples = p.GetSamples(p.Config, len(out)/2)
	} else {
		samples = p.GetSamples(p.Config, len(out))
	}
	for i := 0; i < len(out); i++ {
		out[i] = uint8(samples[i])
	}
	if p.WavSink != nil {
		p.WavSink.Write(p.Config, samples)
	}
}

func (p *PortAudioSink) Callback_16bit(out []int16, timeInfo portaudio.StreamCallbackTimeInfo, flags portaudio.StreamCallbackFlags) {
	var samples []int
	if p.Config.Stereo {
		samples = p.GetSamples(p.Config, len(out)/2)
	} else {
		samples = p.GetSamples(p.Config, len(out))
	}
	m := int16(math.Pow(2, 15))
	for i := 0; i < len(out); i++ {
		out[i] = int16(samples[i]) - m
	}
	if p.WavSink != nil {
		p.WavSink.Write(p.Config, samples)
	}
}

func (p *PortAudioSink) Close(cfg *audio.AudioConfig) error {
	return p.Stream.Close()
}
