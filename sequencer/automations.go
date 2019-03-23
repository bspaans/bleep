package sequencer

type IntAutomation func(counter, t uint) int
type IntArrayAutomation func(counter, t uint) []int
type FloatAutomation func(counter, t uint) float64

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

func IntFadeInAutomation(from, to, changeEvery int) IntAutomation {
	l := to - from
	diff := 1.0 / float64(changeEvery)
	r := make([]int, l*changeEvery)
	for i := 0; i < l; i++ {
		r[i] = from + int(float64(i)*diff)
	}
	return func(counter, t uint) int {
		if counter >= uint(l) {
			return to
		}
		return r[counter]
	}
}

func IntSweepAutomation(min, max, changeEvery int) IntAutomation {
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

func FloatBackAndForthAutomation(floats []float64) FloatAutomation {
	l := uint(len(floats))
	return func(counter, t uint) float64 {
		ix := counter % (l*2 - 2)
		if ix < l {
			return floats[ix]
		} else {
			return floats[l-((ix+2)-l)]
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
