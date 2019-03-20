package sequencer

type IntAutomation func(counter, t uint) int
type IntArrayAutomation func(counter, t uint) []int

func IntIdAutomation(id int) IntAutomation {
	return func(counter, t uint) int {
		return id
	}
}

func IntArrayIdAutomation(id []int) IntArrayAutomation {
	return func(counter, t uint) []int {
		return id
	}
}

func IntRangeAutomation(min, max int) IntAutomation {
	return func(counter, t uint) int {
		intRange := uint(max - min)
		v := min + int(t%intRange)
		return v
	}
}

func IntCycleAutomation(ints []int) IntAutomation {
	l := uint(len(ints))
	return func(counter, t uint) int {
		ix := counter % l
		v := ints[ix]
		return v
	}
}

func IntArrayCycleAutomation(f IntArrayAutomation) IntAutomation {
	return func(counter, t uint) int {
		ints := f(counter, t)
		return IntCycleAutomation(ints)(counter, t)
	}
}

func IntBackAndForthAutomation(ints []int) IntAutomation {
	l := uint(len(ints))
	return func(counter, t uint) int {
		ix := counter % (l*2 - 2)
		if ix < l {
			return ints[ix]
		} else {
			return ints[l-((ix+2)-l)]
		}
	}
}

func OffsetAutomation(offset uint, a IntAutomation) IntAutomation {
	return func(counter, t uint) int {
		return a(counter, t+offset)
	}
}

func IntNegativeOffsetAutomation(offset uint, a IntAutomation) IntAutomation {
	return func(counter, t uint) int {
		return a(counter-1, t-offset)
	}
}

func IntArrayNegativeOffsetAutomation(offset uint, a IntArrayAutomation) IntArrayAutomation {
	return func(counter, t uint) []int {
		return a(counter-1, t-offset)
	}
}

func ChordCycleArrayAutomation(changeEvery int, chords [][]int) IntArrayAutomation {
	return func(counter, t uint) []int {
		ix := counter % uint(changeEvery*len(chords))
		return chords[ix/uint(changeEvery)]
	}
}
