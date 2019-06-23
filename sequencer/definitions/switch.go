package definitions

import (
	. "github.com/bspaans/bleep/sequencer/sequences"
	"github.com/bspaans/bleep/util"
)

type SwitchDef struct {
	Every    interface{}  `json:"every" yaml:"every"`
	Sequence *SequenceDef `json:"sequence" yaml:"sequence"`
}

func (e *SwitchDef) GetSequence(ctx *context) (Sequence, error) {
	duration, err := parseDuration(e.Every, ctx.Granularity)
	if err != nil {
		return nil, util.WrapError("repeat", err)
	}
	s, err := e.Sequence.GetSequence(ctx)
	if err != nil {
		return nil, util.WrapError("repeat", err)
	}
	return Switch(duration, s), nil
}
