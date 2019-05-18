package sequencer

import "github.com/bspaans/bleep/sequencer/definitions"

type EventType int

const (
	RestartSequencer EventType = iota
	ReloadSequencer  EventType = iota
	SetSequencerDef  EventType = iota

	ForwardSequencer  EventType = iota
	BackwardSequencer EventType = iota
	IncreaseBPM       EventType = iota
	DecreaseBPM       EventType = iota

	QuitSequencer EventType = iota
)

type SequencerEvent struct {
	Type         EventType
	SequencerDef *definitions.SequencerDef
}

func NewSequencerEvent(ty EventType) *SequencerEvent {
	return &SequencerEvent{
		Type: ty,
	}
}
