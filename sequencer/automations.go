package sequencer

import (
	"math"
)

type IntAutomation func(s *Sequencer, counter, t uint) int
type IntArrayAutomation func(s *Sequencer, counter, t uint) []int
type FloatAutomation func(s *Sequencer, counter, t uint) float64

func IntIdAutomation(id int) IntAutomation {
	return func(s *Sequencer, counter, t uint) int {
		return id
	}
}

func IntArrayIdAutomation(id []int) IntArrayAutomation {
	return func(s *Sequencer, counter, t uint) []int {
		return id
	}
}

func IntRangeAutomation(min, max, step int) IntAutomation {
	if step == 0 {
		step = 1
	}
	reverse := false
	if max < min {
		reverse = true
	}

	return func(s *Sequencer, counter, t uint) int {
		if reverse {
			intRange := uint(min - max)
			steps := uint(math.Ceil(float64(intRange) / float64(step)))
			v := min - step*int(counter%steps)
			return v
		} else {
			intRange := uint(max - min)
			steps := uint(math.Ceil(float64(intRange) / float64(step)))
			v := min + step*int(counter%steps)
			return v
		}
	}
}

func IntFadeInAutomation(from, to, changeEvery int) IntAutomation {
	l := to - from
	diff := 1.0 / float64(changeEvery)
	r := make([]int, l*changeEvery)
	for i := 0; i < l; i++ {
		r[i] = from + int(float64(i)*diff)
	}
	return func(s *Sequencer, counter, t uint) int {
		if counter >= uint(l) {
			return to
		}
		return r[counter]
	}
}

func IntSweepAutomation(min, max, changeEvery int) IntAutomation {
	if changeEvery == 0 {
		changeEvery = 1
	}
	l := max - min
	diff := 1.0
	if min > max {
		l = min - max
		diff = -1.0
	}
	diff *= 1.0 / float64(changeEvery)
	r := make([]int, l*changeEvery)
	for i := 0; i < l; i++ {
		r[i] = min + int(float64(i)*diff)
	}
	return IntBackAndForthAutomation(r)
}

func IntCycleAutomation(ints []int) IntAutomation {
	l := uint(len(ints))
	return func(s *Sequencer, counter, t uint) int {
		ix := counter % l
		v := ints[ix]
		return v
	}
}

func IntRegisterAutomation(register int) IntAutomation {
	return func(s *Sequencer, counter, t uint) int {
		return s.IntRegisters[register]
	}
}

func IntArrayRegisterAutomation(s *Sequencer, register int) IntArrayAutomation {
	return func(s *Sequencer, counter, t uint) []int {
		return s.IntArrayRegisters[register]
	}
}

func FloatRegisterAutomation(s *Sequencer, register int) FloatAutomation {
	return func(s *Sequencer, counter, t uint) float64 {
		return s.FloatRegisters[register]
	}
}

func IntArrayCycleAutomation(f IntArrayAutomation) IntAutomation {
	return func(s *Sequencer, counter, t uint) int {
		ints := f(s, counter, t)
		return IntCycleAutomation(ints)(s, counter, t)
	}
}

func IntBackAndForthAutomation(ints []int) IntAutomation {
	l := uint(len(ints))
	return func(s *Sequencer, counter, t uint) int {
		ix := counter % (l*2 - 2)
		if ix < l {
			return ints[ix]
		} else {
			return ints[l-((ix+2)-l)]
		}
	}
}

func FloatBackAndForthAutomation(floats []float64) FloatAutomation {
	l := uint(len(floats))
	return func(s *Sequencer, counter, t uint) float64 {
		ix := counter % (l*2 - 2)
		if ix < l {
			return floats[ix]
		} else {
			return floats[l-((ix+2)-l)]
		}
	}
}

func OffsetAutomation(offset uint, a IntAutomation) IntAutomation {
	return func(s *Sequencer, counter, t uint) int {
		return a(s, counter, t+offset)
	}
}

func IntNegativeOffsetAutomation(offset uint, a IntAutomation) IntAutomation {
	return func(s *Sequencer, counter, t uint) int {
		return a(s, counter-1, t-offset)
	}
}

func IntArrayNegativeOffsetAutomation(offset uint, a IntArrayAutomation) IntArrayAutomation {
	return func(s *Sequencer, counter, t uint) []int {
		return a(s, counter-1, t-offset)
	}
}

func ChordCycleArrayAutomation(changeEvery int, chords [][]int) IntArrayAutomation {
	return func(s *Sequencer, counter, t uint) []int {
		ix := counter % (uint(changeEvery * len(chords)))
		return chords[ix/uint(changeEvery)]
	}
}
