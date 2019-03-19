package sequencer

import (
	"fmt"
	"time"

	"github.com/bspaans/bs8bs/synth"
)

type Sequence func(t uint, s chan *synth.Event)

func Quarter(seq *Sequencer) uint {
	return uint(seq.Granularity)
}
func Eight(seq *Sequencer) uint {
	return uint(seq.Granularity / 2)
}

func Every(n uint, seq Sequence) Sequence {
	return func(t uint, s chan *synth.Event) {
		if t%n == 0 {
			seq(t, s)
		}
	}
}

func NoteOn(note int) Sequence {
	return func(t uint, s chan *synth.Event) {
		channel := 1
		velocity := 127
		s <- synth.NewEvent(synth.NoteOn, channel, []int{note, velocity})
	}
}

func NoteOff(note int) Sequence {
	return func(t uint, s chan *synth.Event) {
		channel := 3
		s <- synth.NewEvent(synth.NoteOff, channel, []int{note})
	}
}

func PlayNoteEvery(n uint, duration uint, note int) Sequence {
	return func(t uint, s chan *synth.Event) {
		fmt.Println("playing note")
		Every(n, NoteOn(note))
		Every(n+duration, NoteOff(note))
	}
}

type Sequencer struct {
	BPM         float64
	Granularity int
	Sequences   []Sequence
}

func NewSequencer(bpm float64) *Sequencer {
	seq := &Sequencer{
		BPM:         bpm,
		Granularity: 16,
		Sequences:   []Sequence{},
	}
	s := PlayNoteEvery(Quarter(seq), Eight(seq), 60)
	seq.Sequences = append(seq.Sequences, s)
	return seq
}

func (seq *Sequencer) Start(s chan *synth.Event) {

	t := uint(0)

	for {

		for _, sequence := range seq.Sequences {
			sequence(t, s)
		}

		millisecondsPerBeat := 60000.0 / seq.BPM
		sleep := time.Duration(millisecondsPerBeat / float64(seq.Granularity))
		time.Sleep(sleep * time.Millisecond)

		t += 1
	}
}
