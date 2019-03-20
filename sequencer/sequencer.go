package sequencer

import (
	"time"

	"github.com/bspaans/bs8bs/synth"
)

type Sequence func(counter, t uint, s chan *synth.Event)

func Half(seq *Sequencer) uint {
	return uint(seq.Granularity) * 2
}

func Quarter(seq *Sequencer) uint {
	return uint(seq.Granularity)
}

func Eight(seq *Sequencer) uint {
	return uint(seq.Granularity / 2)
}
func Sixteenth(seq *Sequencer) uint {
	return uint(seq.Granularity / 4)
}
func Thirtysecond(seq *Sequencer) uint {
	return uint(seq.Granularity / 8)
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
	/*
		s1 := PlayNoteEvery(Quarter(seq), Eight(seq), 1, 48, 60)
		s2 := PlayNoteEveryAutomation(Sixteenth(seq), Thirtysecond(seq), 2, IntCycleAutomation([]int{60, 64, 67, 69}), IntRangeAutomation(10, 127))
		s3 := Every(Sixteenth(seq), PanningAutomation(1, IntBackAndForthAutomation([]int{0, 30, 60, 80, 127})))
		s4 := Every(Eight(seq), PanningAutomation(2, IntBackAndForthAutomation([]int{0, 30, 60, 80, 127})))
		s5 := PlayNoteEvery(Quarter(seq), Eight(seq), 9, 35, 60)

		s6 := After(32*Quarter(seq), Offset(Quarter(seq), PlayNoteEvery(Half(seq), Eight(seq), 9, 40, 30)))
		s7 := After(16*Quarter(seq), Offset(Eight(seq), PlayNoteEvery(Quarter(seq), Sixteenth(seq), 9, 43, 40)))
		s8 := After(40*Quarter(seq), PlayNotesEveryAutomation(8*Quarter(seq), 1*Quarter(seq), 3, ChordCycleArrayAutomation(2, [][]int{
			[]int{60, 64, 67},
			[]int{60, 64, 67},
			[]int{64, 67, 70},
			[]int{60, 64, 67},
		}), IntRangeAutomation(30, 50)))
		s9 := Every(Eight(seq), PanningAutomation(3, IntBackAndForthAutomation([]int{50, 30, 67, 97, 80})))


		part1 := Before(128*Quarter(seq), Combine(s1, s2, s3, s4, s5, s6, s7, s8, s9))
		part2 := After(128*Quarter(seq), Combine(s1, s2, s3))
		seq.Sequences = append(seq.Sequences, part1)
		seq.Sequences = append(seq.Sequences, part2)
	*/
	s, err := NewSequencerDefFromFile("sequencer/sequencer.yaml")
	if err != nil {
		panic(err)
	}
	seqs, err := s.GetSequences(seq)
	if err != nil {
		panic(err)
	}
	seq.Sequences = seqs
	return seq
}

func (seq *Sequencer) Start(s chan *synth.Event) {

	t := uint(0)

	s <- synth.NewEvent(synth.ProgramChange, 3, []int{89})
	s <- synth.NewEvent(synth.SetTremelo, 3, []int{60})
	s <- synth.NewEvent(synth.SetReverb, 3, []int{60})
	for {

		for _, sequence := range seq.Sequences {
			sequence(t, t, s)
		}

		millisecondsPerBeat := 60000.0 / seq.BPM
		sleep := time.Duration(millisecondsPerBeat / float64(seq.Granularity))
		time.Sleep(sleep * time.Millisecond)

		t += 1
	}
}
