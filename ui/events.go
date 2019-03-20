package ui

type UIEventType int

const (
	ChannelsOutputEvent UIEventType = iota
)

type UIEvent struct {
	Type   UIEventType
	Value  string
	Values []float64
}

func NewUIEvent(ty UIEventType) *UIEvent {
	return &UIEvent{
		Type: ty,
	}
}
