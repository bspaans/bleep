package definitions

import (
	"fmt"

	. "github.com/bspaans/bleep/sequencer/automations"
	. "github.com/bspaans/bleep/sequencer/sequences"
	"github.com/bspaans/bleep/util"
)

type PlayNoteEveryDef struct {
	Note               int            `yaml:"note"`
	NoteAutomation     *AutomationDef `yaml:"auto_note"`
	Channel            int            `yaml:"channel"`
	Velocity           int            `yaml:"velocity"`
	VelocityAutomation *AutomationDef `yaml:"auto_velocity"`
	Duration           interface{}    `yaml:"duration"`
	Every              interface{}    `yaml:"every"`
	Offset             interface{}    `yaml:"offset"`
}

func (e *PlayNoteEveryDef) GetSequence(granularity int) (Sequence, error) {
	every, err := parseDuration(e.Every, granularity)
	if err != nil {
		return nil, util.WrapError("play_note", err)
	}
	duration, err := parseDuration(e.Duration, granularity)
	if err != nil {
		return nil, util.WrapError("play_note", err)
	}
	noteF := IntIdAutomation(e.Note)
	if e.NoteAutomation != nil {
		noteF_, err := e.NoteAutomation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("play_note > auto_note", err)
		}
		noteF = noteF_
	}
	if e.NoteAutomation == nil && e.Note == 0.0 {
		return nil, util.WrapError("play_note", fmt.Errorf("missing note or auto_note"))
	}
	velocityF := IntIdAutomation(e.Velocity)
	if e.VelocityAutomation != nil {
		velocityF_, err := e.VelocityAutomation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("play_note > auto_velocity", err)
		}
		velocityF = velocityF_
	}
	if e.VelocityAutomation == nil && e.Velocity == 0.0 {
		return nil, util.WrapError("play_note", fmt.Errorf("missing velocity or auto_velocity"))
	}
	result := PlayNoteEveryAutomation(every, duration, e.Channel, noteF, velocityF)
	if e.Offset != nil {
		offset, err := parseDuration(e.Offset, granularity)
		if err != nil {
			return nil, util.WrapError("play_note > offset", err)
		}
		return Offset(offset, result), nil
	}
	return result, nil
}
