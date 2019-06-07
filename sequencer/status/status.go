package status

import (
	"github.com/bspaans/bleep/synth"
)

type Status struct {
	BPM               float64
	Granularity       int
	IntRegisters      []int
	IntArrayRegisters [][]int
	FloatRegisters    []float64
	ScheduledEvents   []*ScheduledEvent
}

func NewStatus(bpm float64, granularity int) Status {
	return Status{
		BPM:               bpm,
		Granularity:       granularity,
		IntRegisters:      make([]int, 128),
		IntArrayRegisters: make([][]int, 128),
		FloatRegisters:    make([]float64, 128),
		ScheduledEvents:   []*ScheduledEvent{},
	}
}

func (s *Status) ScheduleEvent(t uint, duration uint, ev *synth.Event) {
	when := t + duration
	event := NewScheduledEvent(when, ev)
	s.ScheduledEvents = append(s.ScheduledEvents, event)
}

func (s *Status) GetScheduledEvents(t uint) []*ScheduledEvent {
	result := []*ScheduledEvent{}
	newEvents := []*ScheduledEvent{}
	for _, ev := range s.ScheduledEvents {
		if ev.When <= t {
			result = append(result, ev)
		} else {
			newEvents = append(newEvents, ev)
		}
	}
	s.ScheduledEvents = newEvents
	return result
}

type ScheduledEvent struct {
	When  uint
	Event *synth.Event
}

func NewScheduledEvent(when uint, ev *synth.Event) *ScheduledEvent {
	return &ScheduledEvent{
		When:  when,
		Event: ev,
	}
}
