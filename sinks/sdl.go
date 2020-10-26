package sinks

// typedef unsigned char Uint8;
// void BleepCallback_8bit(void *userdata, Uint8 *stream, int len);
// void BleepCallback_16bit(void *userdata, Uint8 *stream, int len);
import "C"
import (
	"encoding/binary"
	"math"
	"reflect"
	"unsafe"

	"github.com/bspaans/bleep/audio"
	"github.com/veandco/go-sdl2/sdl"
)

//export BleepCallback_8bit
func BleepCallback_8bit(userdata unsafe.Pointer, stream *C.Uint8, length C.int) {
	n := int(length)
	hdr := reflect.SliceHeader{Data: uintptr(unsafe.Pointer(stream)), Len: n, Cap: n}
	buf := *(*[]C.Uint8)(unsafe.Pointer(&hdr))

	samples := CurrentSDLSink.GetSamples_8bit(n)
	for i := 0; i < n; i += 1 {
		buf[i] = C.Uint8(samples[i])
	}
}

//export BleepCallback_16bit
func BleepCallback_16bit(userdata unsafe.Pointer, stream *C.Uint8, length C.int) {
	n := int(length)
	hdr := reflect.SliceHeader{Data: uintptr(unsafe.Pointer(stream)), Len: n, Cap: n}
	buf := *(*[]C.Uint8)(unsafe.Pointer(&hdr))

	samples := CurrentSDLSink.GetSamples_16bit(n)
	for i := 0; i < n; i += 1 {
		buf[i] = C.Uint8(samples[i])
	}
}

var CurrentSDLSink *SDLSink

type SDLSink struct {
	Config     *audio.AudioConfig
	GetSamples func(cfg *audio.AudioConfig, n int) []int
	WavSink    *WavSink
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

	callback := sdl.AudioCallback(C.BleepCallback_8bit)
	fmt := sdl.AudioFormat(sdl.AUDIO_U8)
	if s.Config.BitDepth == 16 {
		fmt = sdl.AUDIO_S16LSB
		callback = sdl.AudioCallback(C.BleepCallback_16bit)
	}

	spec := &sdl.AudioSpec{
		Freq:     int32(s.Config.SampleRate),
		Format:   fmt,
		Channels: uint8(s.Config.GetNumberOfChannels()),
		Samples:  uint16(1024),
		Callback: callback,
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
	if s.WavSink != nil {
		s.WavSink.Write(s.Config, samples)
	}
	return out
}

func (s *SDLSink) GetSamples_16bit(n int) []uint8 {
	out := make([]uint8, n)
	samples := s.GetSamples(s.Config, n/4)

	buf := make([]byte, 2)
	m := int16(math.Pow(2, 15))
	for i := 0; i < n/2; i++ {
		binary.LittleEndian.PutUint16(buf, uint16(int16(samples[i])-m))
		out[i*2] = buf[0]
		out[i*2+1] = buf[1]
	}
	if s.WavSink != nil {
		s.WavSink.Write(s.Config, samples)
	}
	return out
}

func (s *SDLSink) Close(cfg *audio.AudioConfig) error {
	sdl.CloseAudio()
	return nil
}
