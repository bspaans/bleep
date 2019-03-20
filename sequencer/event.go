package sequencer

type EventType int

const (
	RestartSequencer EventType = iota
	ReloadSequencer  EventType = iota
)

type SequencerEvent struct {
	Type EventType
}

func NewSequencerEvent(ty EventType) *SequencerEvent {
	return &SequencerEvent{
		Type: ty,
	}
}
