package sinks

import "github.com/bspaans/bs8bs/audio"

type Sink interface {
	Write(cfg *audio.AudioConfig, samples []int) error
	Close(cfg *audio.AudioConfig) error
}
