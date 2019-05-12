package definitions

import (
	. "github.com/bspaans/bleep/sequencer/sequences"
	"github.com/bspaans/bleep/util"
)

type RepeatDef struct {
	Every    interface{}  `json:"every" yaml:"every"`
	Sequence *SequenceDef `json:"sequence" yaml:"sequence"`
}

func (e *RepeatDef) GetSequence(granularity int) (Sequence, error) {
	duration, err := parseDuration(e.Every, granularity)
	if err != nil {
		return nil, util.WrapError("repeat", err)
	}
	s, err := e.Sequence.GetSequence(granularity)
	if err != nil {
		return nil, util.WrapError("repeat", err)
	}
	return Every(duration, s), nil
}
