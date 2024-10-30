package main

import (
	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/sequencer"
	"github.com/bspaans/bleep/sequencer/definitions"
	"github.com/bspaans/bleep/synth"
)

// Similar to how we can express generators and filters as data using
// InstrumentDef, we can represent Sequences and complete Sequencers
// with data as well.
//
// Again, this is more ergonomic in JSON/YAML.
func main() {
	cfg := audio.NewAudioConfig()

	s := synth.NewSynth(cfg)

	def := &definitions.SequencerDef{
		BPM:         120,
		Granularity: 16,
		Sequences: []definitions.SequenceDef{
			{
				PlayNoteEvery: &definitions.PlayNoteEveryDef{
					Note:     60,
					Velocity: 37,
					Channel:  0,
					Every:    "Quarter",
					Duration: "Quarter",
				},
			},
			{
				PlayNoteEvery: &definitions.PlayNoteEveryDef{
					Note:     64,
					Velocity: 37,
					Channel:  0,
					Every:    "Quarter",
					Duration: "Eight",
				},
			},
			{
				PlayNoteEvery: &definitions.PlayNoteEveryDef{
					Note:     67,
					Velocity: 37,
					Channel:  0,
					Every:    "Quarter",
					Duration: "Sixteenth",
				},
			},
			{
				PlayNoteEvery: &definitions.PlayNoteEveryDef{
					Note:     72,
					Velocity: 37,
					Channel:  1,
					Every:    "Quarter",
					Offset:   "Eight",
					Duration: "Sixteenth",
				},
			},
		},
	}
	seq := sequencer.NewSequencerFromDefinition(def)
	s.EnableSDLSink()
	seq.Start(s.Inputs)
	s.Start()
}
