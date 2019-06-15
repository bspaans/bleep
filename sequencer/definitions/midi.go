package definitions

import (
	"path/filepath"

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

func (m *MIDISequencesDef) GetSequence(ctx *context) (sequences.Sequence, error) {
	file := m.File
	if !filepath.IsAbs(m.File) {
		file = filepath.Join(ctx.BaseDir, m.File)
	}
	seqs, err := midi.ReadMidiFile(file)
	if err != nil {
		return nil, err
	}
	return sequences.MidiSequence(seqs, m.InputChannels, m.OutputChannels, m.Speed, m.Loop), nil
}
