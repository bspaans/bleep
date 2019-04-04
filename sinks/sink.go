package sinks

import "github.com/bspaans/bleep/audio"

type Sink interface {
	Start(func(cfg *audio.AudioConfig, n int) []int) error
	Close(cfg *audio.AudioConfig) error
}
