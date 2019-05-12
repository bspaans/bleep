package definitions

import (
	. "github.com/bspaans/bleep/sequencer/sequences"
	"github.com/bspaans/bleep/util"
)

type OffsetDef struct {
	Offset   interface{} `json:"offset" yaml:"offset"`
	Sequence SequenceDef `json:"sequence" yaml:"sequence"`
}

func (e *OffsetDef) GetSequence(granularity int) (Sequence, error) {
	duration, err := parseDuration(e.Offset, granularity)
	if err != nil {
		return nil, util.WrapError("offset", err)
	}
	s, err := e.Sequence.GetSequence(granularity)
	if err != nil {
		return nil, util.WrapError("offset", err)
	}
	return Offset(duration, s), nil
}
