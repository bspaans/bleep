package synth

type EventType int

const (
	NoteOn                     EventType = iota
	NoteOff                    EventType = iota
	SetChannelVolume           EventType = iota
	SetChannelExpressionVolume EventType = iota
	SetChannelPanning          EventType = iota
	SetReverb                  EventType = iota
	SetTremelo                 EventType = iota
	SetChorus                  EventType = iota
	SetDetuneEffect            EventType = iota
	SetPhaser                  EventType = iota
	ProgramChange              EventType = iota
	SilenceChannel             EventType = iota
	PitchBend                  EventType = iota
)

func (s EventType) String() string {
	if s == NoteOn {
		return "Note on"
	} else if s == NoteOff {
		return "Note off"
	} else if s == SetReverb {
		return "Set reverb"
	} else if s == SetTremelo {
		return "Set tremelo"
	} else if s == SetChorus {
		return "Set chorus"
	} else if s == SetDetuneEffect {
		return "Set detune effect"
	} else if s == SetPhaser {
		return "Set phaser"
	} else if s == ProgramChange {
		return "Program change"
	} else if s == SilenceChannel {
		return "Silence channel"
	} else if s == PitchBend {
		return "Pitch bend"
	} else if s == SetChannelVolume {
		return "Set channel volume"
	} else if s == SetChannelExpressionVolume {
		return "Set channel expression volume"
	} else if s == SetChannelPanning {
		return "Set channel panning"
	}
	return "Unknown event"
}

type Event struct {
	Type    EventType
	Channel int
	Values  []int
}

func NewEvent(ty EventType, channel int, values []int) *Event {
	return &Event{
		Type:    ty,
		Channel: channel,
		Values:  values,
	}
}
