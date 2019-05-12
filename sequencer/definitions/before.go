package definitions

import (
	"github.com/bspaans/bleep/sequencer/sequences"
	"github.com/bspaans/bleep/util"
)

type BeforeDef struct {
	Before   interface{} `json:"before" yaml:"before"`
	Sequence SequenceDef `json:"sequence" yaml:"sequence"`
}

func (e *BeforeDef) GetSequence(granularity int) (sequences.Sequence, error) {
	duration, err := parseDuration(e.Before, granularity)
	if err != nil {
		return nil, util.WrapError("before", err)
	}
	s, err := e.Sequence.GetSequence(granularity)
	if err != nil {
		return nil, util.WrapError("before", err)
	}
	return sequences.Before(duration, s), nil
}
