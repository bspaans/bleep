package definitions

import (
	. "github.com/bspaans/bleep/sequencer/automations"
	. "github.com/bspaans/bleep/sequencer/sequences"
	"github.com/bspaans/bleep/util"
)

type PlayNotesEveryDef struct {
	Notes              []int                  `json:"notes,omitempty" yaml:"notes"`
	NotesAutomation    *IntArrayAutomationDef `json:"auto_notes,omitempty" yaml:"auto_notes"`
	Channel            int                    `json:"channel" yaml:"channel"`
	Velocity           int                    `json:"velocity,omitempty" yaml:"velocity"`
	VelocityAutomation *AutomationDef         `json:"auto_velocity,omitempty" yaml:"auto_velocity"`
	Duration           interface{}            `yaml:"duration"`
	Every              interface{}            `yaml:"every"`
	Offset             interface{}            `yaml:"offset"`
}

func (e *PlayNotesEveryDef) GetSequence(granularity int) (Sequence, error) {
	every, err := parseDuration(e.Every, granularity)
	if err != nil {
		return nil, util.WrapError("play_notes", err)
	}
	duration, err := parseDuration(e.Duration, granularity)
	if err != nil {
		return nil, util.WrapError("play_notes", err)
	}
	notesF := IntArrayIdAutomation(e.Notes)
	if e.NotesAutomation != nil {
		notesF_, err := e.NotesAutomation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("play_notes > auto_notes", err)
		}
		notesF = notesF_
	}
	velocityF := IntIdAutomation(e.Velocity)
	if e.VelocityAutomation != nil {
		velocityF_, err := e.VelocityAutomation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("play_note > auto_velocity", err)
		}
		velocityF = velocityF_
	}
	result := PlayNotesEveryAutomation(every, duration, e.Channel, notesF, velocityF)
	if e.Offset != nil {
		offset, err := parseDuration(e.Offset, granularity)
		if err != nil {
			return nil, util.WrapError("play_note > offset", err)
		}
		return Offset(offset, result), nil
	}
	return result, nil
}
