package definitions

import (
	"github.com/bspaans/bleep/midi"
	"github.com/bspaans/bleep/sequencer/sequences"
)

type MIDISequencesDef struct {
	File           string  `yaml:"file"`
	InputChannels  []int   `yaml:"input_channels"`
	OutputChannels []int   `yaml:"output_channels"`
	Speed          float64 `yaml:"speed"`
	Loop           bool    `yaml:"loop"`
}

func (m *MIDISequencesDef) GetSequence() (sequences.Sequence, error) {
	seqs, err := midi.ReadMidiFile(m.File)
	if err != nil {
		return nil, err
	}
	return sequences.MidiSequence(seqs, m.InputChannels, m.OutputChannels, m.Speed, m.Loop), nil
}
