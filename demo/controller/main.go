package main

import (
	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/controller"
	"github.com/bspaans/bleep/sequencer/definitions"
)

// The Controller is basically a container for a Synth and a Sequencer.
// It does some of the wiring and reloading, but it's mostly a convenience
// thing.
func main() {

	cfg := audio.NewAudioConfig()
	ctrl := controller.NewController(cfg)
	ctrl.EnableSDLSink()

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
		},
	}
	ctrl.LoadSequencerFromDefinition(def)
	ctrl.StartSynth()
}
