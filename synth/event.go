package synth

import "github.com/bspaans/bleep/instruments"

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

	// Non-midi; require float value(s)
	SetReverbTime     EventType = iota
	SetReverbFeedback EventType = iota
	SetLPFCutoff      EventType = iota
	SetHPFCutoff      EventType = iota
	SetGrain          EventType = iota
	SetGrainGain      EventType = iota
	SetGrainSize      EventType = iota
	SetGrainBirthRate EventType = iota
	SetGrainDensity   EventType = iota
	SetGrainSpread    EventType = iota
	SetGrainSpeed     EventType = iota

	ToggleSoloChannel  EventType = iota
	SilenceAllChannels EventType = iota
	SetInstrument      EventType = iota
)

type Event struct {
	Type        EventType
	Channel     int
	Value       string
	Values      []int
	FloatValues []float64
	Instrument  instruments.Instrument
}

func NewEvent(ty EventType, channel int, values []int) *Event {
	return &Event{
		Type:    ty,
		Channel: channel,
		Values:  values,
	}
}

func NewFloatEvent(ty EventType, channel int, values []float64) *Event {
	return &Event{
		Type:        ty,
		Channel:     channel,
		FloatValues: values,
	}
}

func NewStringEvent(ty EventType, channel int, value string) *Event {
	return &Event{
		Type:    ty,
		Channel: channel,
		Value:   value,
	}
}

func NewInstrumentEvent(ty EventType, channel int, value instruments.Instrument) *Event {
	return &Event{
		Type:       ty,
		Channel:    channel,
		Instrument: value,
	}
}
