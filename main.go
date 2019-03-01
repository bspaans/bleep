package main

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
	"github.com/bspaans/bs8bs/midi"
)

func main() {
	cfg := audio.NewAudioConfig()

	sine := generators.NewSineWaveOscillator()
	square := generators.NewSquareWaveOscillator()
	ch1 := midi.NewMonophonicChannel(sine)
	ch2 := midi.NewMonophonicChannel(square)
	ch3 := midi.NewMonophonicChannel(square)
	mixer := midi.NewMixer()
	mixer.AddChannel(ch1)
	mixer.AddChannel(ch2)
	mixer.AddChannel(ch3)
	mixer.NoteOn(0, 50)
	mixer.NoteOn(1, 54)
	mixer.NoteOn(2, 57)
	samples := mixer.GetSamples(cfg, cfg.SampleRate)
	audio.WriteWavFile(cfg, samples, "test.wav")
}
