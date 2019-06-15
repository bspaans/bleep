package definitions

import (
	"github.com/bspaans/bleep/sequencer/sequences"
	"github.com/bspaans/bleep/util"
)

type AfterDef struct {
	After    interface{} `json:"after" yaml:"after"`
	Sequence SequenceDef `json:"sequence" yaml:"sequence"`
}

func (e *AfterDef) GetSequence(ctx *context) (sequences.Sequence, error) {
	duration, err := parseDuration(e.After, ctx.Granularity)
	if err != nil {
		return nil, util.WrapError("after", err)
	}
	s, err := e.Sequence.GetSequence(ctx)
	if err != nil {
		return nil, util.WrapError("after", err)
	}
	return sequences.After(duration, s), nil
}
