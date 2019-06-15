package definitions

import (
	. "github.com/bspaans/bleep/sequencer/sequences"
	"github.com/bspaans/bleep/util"
)

type OffsetDef struct {
	Offset   interface{} `json:"offset" yaml:"offset"`
	Sequence SequenceDef `json:"sequence" yaml:"sequence"`
}

func (e *OffsetDef) GetSequence(ctx *context) (Sequence, error) {
	duration, err := parseDuration(e.Offset, ctx.Granularity)
	if err != nil {
		return nil, util.WrapError("offset", err)
	}
	s, err := e.Sequence.GetSequence(ctx)
	if err != nil {
		return nil, util.WrapError("offset", err)
	}
	return Offset(duration, s), nil
}
