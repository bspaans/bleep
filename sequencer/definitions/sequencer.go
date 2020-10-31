package definitions

import (
	"fmt"
	"io/ioutil"
	"path/filepath"

	"github.com/bspaans/bleep/channels"
	. "github.com/bspaans/bleep/sequencer/sequences"
	"github.com/bspaans/bleep/util"
	"gopkg.in/yaml.v2"
)

type SequencerDef struct {
	BPM                  float64       `json:"bpm" yaml:"bpm"`
	Granularity          int           `json:"granularity" yaml:"granularity"`
	Sequences            []SequenceDef `json:"sequences" yaml:"sequences"`
	Tracks               []TrackDef    `json:"tracks" yaml:"tracks"`
	channels.ChannelsDef `json:",inline" yaml:",inline"`
	FromFile             string `json:"-" yaml:"-"`
}

type context struct {
	BaseDir     string
	Granularity int
}

func (s *SequencerDef) getBaseDir() (string, error) {
	if s.FromFile != "" {
		fp, err := filepath.Abs(s.FromFile)
		if err != nil {
			return "", err
		}
		return filepath.Dir(fp), nil
	}
	return ".", nil
}

func (s *SequencerDef) GetSequences() ([]Sequence, error) {
	baseDir, err := s.getBaseDir()
	if err != nil {
		return nil, err
	}
	sequences := []Sequence{}
	ctx := &context{
		BaseDir:     baseDir,
		Granularity: s.Granularity,
	}
	for i, se := range s.Sequences {
		sequence, err := se.GetSequence(ctx)
		if err != nil {
			return nil, util.WrapError(fmt.Sprintf("sequence [%d]", i), err)
		}
		sequences = append(sequences, sequence)
	}
	for i, tr := range s.Tracks {
		for j, seq := range tr.Sequences {
			sequence, err := seq.GetSequence(ctx)
			if err != nil {
				return nil, util.WrapError(fmt.Sprintf("tracks [%d] -> sequences [%d]", i, j), err)
			}
			sequences = append(sequences, sequence)
		}
	}
	return sequences, nil
}

func (s *SequencerDef) YAML() (string, error) {
	b, err := yaml.Marshal(s)
	if err != nil {
		return "", err
	}
	return string(b), nil
}

func NewSequencerDefFromFile(file string) (*SequencerDef, error) {
	contents, err := ioutil.ReadFile(file)
	if err != nil {
		return nil, err
	}
	result := SequencerDef{}
	if err := yaml.Unmarshal(contents, &result); err != nil {
		return nil, err
	}
	if len(result.Sequences) == 0 {
		return nil, fmt.Errorf("No sequences in sequencer def %s", file)
	}
	result.FromFile = file
	return &result, nil
}
