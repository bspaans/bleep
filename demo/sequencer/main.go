package main

import (
	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/sequencer"
	"github.com/bspaans/bleep/sequencer/sequences"
	"github.com/bspaans/bleep/synth"
)

// The Sequencer is by far the most complicated structure in
// Bleep. It is able to control a Synth, loop through Sequences,
// change Instruments and process scheduled events.
func main() {
	cfg := audio.NewAudioConfig()

	s := synth.NewSynth(cfg)

	seq := sequencer.NewSequencer(120.0, 16)

	seq.Sequences = []sequences.Sequence{
		sequences.PlayNoteEvery(32, 4, 0, 60, 37),
		sequences.PlayNoteEvery(32, 16, 0, 64, 37),
		sequences.PlayNoteEvery(16, 8, 0, 67, 47),
		sequences.PlayNoteEvery(64, 4, 1, 64, 37),
	}

	s.EnableSDLSink()
	seq.Start(s.Inputs)
	s.Start()
}
