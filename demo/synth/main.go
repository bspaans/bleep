package main

import (
	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/synth"
)

// A Synth gives us event based control over a mixer.
// The synth typically runs in the background and reads events
// from its MIDI+ event queue, while generating samples and sending
// that to the sinks (.wav or SDL)
//
// Because of its event based nature, it's a bit more effort to
// set up a Synth programmatically, so this looks different
// from what we've been doing so far.
func main() {
	cfg := audio.NewAudioConfig()

	s := synth.NewSynth(cfg)
	s.Debug = true
	s.Inputs <- synth.NewInstrumentEvent(synth.SetInstrument, 0, generators.ToInstrument(generators.NewSineWaveOscillator))
	s.Inputs <- synth.NewInstrumentEvent(synth.SetInstrument, 1, generators.ToInstrument(generators.NewSquareWaveOscillator))
	s.Inputs <- synth.NewEvent(synth.NoteOn, 0, []int{60, 127})
	s.Inputs <- synth.NewEvent(synth.NoteOn, 0, []int{64, 127})
	s.Inputs <- synth.NewEvent(synth.NoteOn, 0, []int{67, 127})
	s.Inputs <- synth.NewEvent(synth.NoteOn, 1, []int{72, 127})

	s.EnableSDLSink()
	s.Start()
}
