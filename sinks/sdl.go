package sinks

// typedef unsigned char Uint8;
// void BleepCallback(void *userdata, Uint8 *stream, int len);
import "C"
import (
	"reflect"
	"unsafe"

	"github.com/bspaans/bleep/audio"
	"github.com/veandco/go-sdl2/sdl"
)

//export BleepCallback
func BleepCallback(userdata unsafe.Pointer, stream *C.Uint8, length C.int) {
	n := int(length)
	hdr := reflect.SliceHeader{Data: uintptr(unsafe.Pointer(stream)), Len: n, Cap: n}
	buf := *(*[]C.Uint8)(unsafe.Pointer(&hdr))

	samples := CurrentSDLSink.GetSamples_8bit(n)
	for i := 0; i < n; i += 1 {
		buf[i] = C.Uint8(samples[i])
	}
}

var CurrentSDLSink *SDLSink

type SDLSink struct {
	Config     *audio.AudioConfig
	GetSamples func(cfg *audio.AudioConfig, n int) []int
}

func NewSDLSink(cfg *audio.AudioConfig) (*SDLSink, error) {
	if err := sdl.Init(sdl.INIT_AUDIO); err != nil {
		return nil, err
	}
	s := &SDLSink{
		Config: cfg,
	}
	CurrentSDLSink = s
	return s, nil
}

func (s *SDLSink) Start(f func(cfg *audio.AudioConfig, n int) []int) error {

	spec := &sdl.AudioSpec{
		Freq:     int32(s.Config.SampleRate),
		Format:   sdl.AUDIO_U8,
		Channels: uint8(s.Config.GetNumberOfChannels()),
		Samples:  uint16(s.Config.SampleRate / 8),
		Callback: sdl.AudioCallback(C.BleepCallback),
	}
	if err := sdl.OpenAudio(spec, nil); err != nil {
		return err
	}
	s.GetSamples = f
	sdl.PauseAudio(false)
	return nil
}

func (s *SDLSink) GetSamples_8bit(n int) []uint8 {
	out := make([]uint8, n)
	samples := s.GetSamples(s.Config, n/2)
	if s.Config.Stereo {
		for i := 0; i < len(out); i++ {
			out[i] = uint8(samples[i])
		}
	} else {
		for i := 0; i < len(out)/2; i++ {
			out[i*2] = uint8(samples[i])
			out[i*2+1] = uint8(samples[i])
		}
	}
	return out
}

func (s *SDLSink) Close(cfg *audio.AudioConfig) error {
	sdl.CloseAudio()
	return nil
}
