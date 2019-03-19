package sequencer

import (
	"time"

	"github.com/bspaans/bs8bs/synth"
)

type Sequence func(t uint, s chan *synth.Event)
type IntAutomation func(t uint) int
type FloatAutomation func(t uint) float64

func IntIdAutomation(id int) IntAutomation {
	return func(t uint) int {
		return id
	}
}
func IntRangeAutomation(min, max int) IntAutomation {
	return func(t uint) int {
		intRange := uint(max - min)
		v := min + int(t%intRange)
		return v
	}
}

func OffsetAutomation(offset uint, a IntAutomation) IntAutomation {
	return func(t uint) int {
		return a(t + offset)
	}
}

func NegativeOffsetAutomation(offset uint, a IntAutomation) IntAutomation {
	return func(t uint) int {
		return a(t - offset)
	}
}

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
func Offset(offset uint, seq Sequence) Sequence {
	return func(t uint, s chan *synth.Event) {
		seq(t+offset, s)
	}
}
func EveryWithOffset(n, offset uint, seq Sequence) Sequence {
	return func(t uint, s chan *synth.Event) {
		if (t+offset)%n == 0 {
			seq(t, s)
		}
	}
}

func NoteOnAutomation(channelF, noteF, velocityF IntAutomation) Sequence {
	return func(t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.NoteOn, channelF(t), []int{noteF(t), velocityF(t)})
	}
}

func NoteOn(channel, note, velocity int) Sequence {
	return NoteOnAutomation(
		IntIdAutomation(channel),
		IntIdAutomation(note),
		IntIdAutomation(velocity),
	)
}

func NoteOffAutomation(channelF, noteF IntAutomation) Sequence {
	return func(t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.NoteOff, channelF(t), []int{noteF(t)})
	}
}

func NoteOff(channel, note int) Sequence {
	return NoteOffAutomation(
		IntIdAutomation(channel),
		IntIdAutomation(note),
	)
}

func Combine(seqs ...Sequence) Sequence {
	return func(t uint, s chan *synth.Event) {
		for _, seq := range seqs {
			seq(t, s)
		}
	}
}

func PlayNoteEvery(n uint, duration uint, channel, note, velocity int) Sequence {
	return Combine(
		Every(n, NoteOn(channel, note, velocity)),
		EveryWithOffset(n, duration, NoteOff(channel, note)),
	)
}

func PlayNoteEveryAutomation(n uint, duration uint, channel int, noteF IntAutomation, velocityF IntAutomation) Sequence {
	return Combine(
		Every(n, NoteOnAutomation(IntIdAutomation(channel), noteF, velocityF)),
		EveryWithOffset(n, duration, NoteOffAutomation(
			NegativeOffsetAutomation(duration, IntIdAutomation(channel)),
			NegativeOffsetAutomation(duration, noteF)),
		),
	)
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
	//s1 := PlayNoteEvery(Quarter(seq), Eight(seq), 1, 60, 127)
	s2 := PlayNoteEveryAutomation(Quarter(seq), Eight(seq), 2, IntRangeAutomation(60, 80), IntRangeAutomation(10, 127))
	//seq.Sequences = append(seq.Sequences, s1)
	seq.Sequences = append(seq.Sequences, s2)
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
