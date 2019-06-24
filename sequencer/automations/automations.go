package automations

import (
	"fmt"
	"math"
	"math/rand"

	. "github.com/bspaans/bleep/sequencer/status"
	"github.com/bspaans/bleep/theory"
)

type IntAutomation func(s *Status, counter, t uint) int
type IntArrayAutomation func(s *Status, counter, t uint) []int
type FloatAutomation func(s *Status, counter, t uint) float64

func IntIdAutomation(id int) IntAutomation {
	return func(s *Status, counter, t uint) int {
		return id
	}
}

func FloatIdAutomation(id float64) FloatAutomation {
	return func(s *Status, counter, t uint) float64 {
		return id
	}
}

func IntArrayIdAutomation(id []int) IntArrayAutomation {
	return func(s *Status, counter, t uint) []int {
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

	return func(s *Status, counter, t uint) int {
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

func IntTransposeAutomation(transpose int, automation IntAutomation) IntAutomation {
	return func(s *Status, counter, t uint) int {
		return transpose + automation(s, counter, t)
	}
}
func FloatTransposeAutomation(transpose float64, automation FloatAutomation) FloatAutomation {
	return func(s *Status, counter, t uint) float64 {
		return transpose + automation(s, counter, t)
	}
}
func IntArrayTransposeAutomation(transpose int, automation IntArrayAutomation) IntArrayAutomation {
	return func(s *Status, counter, t uint) []int {
		values := automation(s, counter, t)
		result := make([]int, len(values))
		for i, v := range values {
			result[i] = v + transpose
		}
		return result
	}
}

func IntFadeInAutomation(from, to, changeEvery int) IntAutomation {
	if changeEvery == 0 {
		changeEvery = 1
	}
	width := to - from
	diff := 1.0 / float64(changeEvery)
	r := make([]int, int(float64(width+1)/diff))
	for i := 0; i < len(r); i++ {
		r[i] = from + int(float64(i)*diff)
	}
	return func(s *Status, counter, t uint) int {
		if counter >= uint(len(r)) {
			return to
		}
		fmt.Println(r[counter])
		return r[counter]
	}
}

func IntRandomAutomation(min, max int) IntAutomation {
	return func(s *Status, counter, t uint) int {
		if min > max {
			min, max = max, min
		}
		return rand.Intn(max-min) + min
	}
}

func FloatRandomAutomation(min, max float64) FloatAutomation {
	return func(s *Status, counter, t uint) float64 {
		if min > max {
			min, max = max, min
		}
		randomRange := max - min
		return rand.Float64()*randomRange + min
	}
}

func IntSweepAutomation(min, max, changeEvery, step int) IntAutomation {
	if changeEvery == 0 {
		changeEvery = 1
	}
	if step == 0 {
		step = 1
	}
	diff := float64(math.Abs(float64(step)))

	width := max - min
	if min > max {
		width = min - max
		diff = -diff
	}
	diff *= 1.0 / float64(changeEvery)

	r := make([]int, int((float64(width+1) / diff)))

	for i := 0; i < len(r); i++ {
		r[i] = min + int(float64(i)*diff)
	}
	return IntBackAndForthAutomation(r)
}

func IntCycleAutomation(ints []int) IntAutomation {
	l := uint(len(ints))
	return func(s *Status, counter, t uint) int {
		ix := counter % l
		v := ints[ix]
		return v
	}
}

func IntRegisterAutomation(register int) IntAutomation {
	return func(s *Status, counter, t uint) int {
		return s.IntRegisters[register]
	}
}

func IntArrayRegisterAutomation(register int) IntArrayAutomation {
	return func(s *Status, counter, t uint) []int {
		return s.IntArrayRegisters[register]
	}
}

func FloatRegisterAutomation(register int) FloatAutomation {
	return func(s *Status, counter, t uint) float64 {
		return s.FloatRegisters[register]
	}
}

func IntArrayCycleAutomation(f IntArrayAutomation) IntAutomation {
	return func(s *Status, counter, t uint) int {
		ints := f(s, counter, t)
		return IntCycleAutomation(ints)(s, counter, t)
	}
}

func IntArrayIndexAutomation(ixF IntAutomation, f IntArrayAutomation) IntArrayAutomation {
	return func(s *Status, counter, t uint) []int {
		ints := f(s, counter, t)
		if len(ints) == 0 {
			return ints
		}
		ix := ixF(s, counter, t)
		return []int{ints[ix%len(ints)]}
	}
}

func IntBackAndForthAutomation(ints []int) IntAutomation {
	l := uint(len(ints))
	return func(s *Status, counter, t uint) int {
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
	return func(s *Status, counter, t uint) float64 {
		ix := counter % (l*2 - 2)
		if ix < l {
			return floats[ix]
		} else {
			return floats[l-((ix+2)-l)]
		}
	}
}

func OffsetAutomation(offset uint, a IntAutomation) IntAutomation {
	return func(s *Status, counter, t uint) int {
		return a(s, counter, t+offset)
	}
}

func IntNegativeOffsetAutomation(offset uint, a IntAutomation) IntAutomation {
	return func(s *Status, counter, t uint) int {
		return a(s, counter-1, t-offset)
	}
}

func IntArrayNegativeOffsetAutomation(offset uint, a IntArrayAutomation) IntArrayAutomation {
	return func(s *Status, counter, t uint) []int {
		return a(s, counter-1, t-offset)
	}
}

func ChordCycleArrayAutomation(changeEvery int, chords [][]int) IntArrayAutomation {
	return func(s *Status, counter, t uint) []int {
		ix := counter % (uint(changeEvery * len(chords)))
		v := chords[ix/uint(changeEvery)]
		return v
	}
}
func Chord(chord string, baseNoteF, octavesF, inversionsF IntAutomation) IntArrayAutomation {
	return func(s *Status, counter, t uint) []int {
		baseNote := baseNoteF(s, counter, t)
		inversions := inversionsF(s, counter, t)
		octaves := octavesF(s, counter, t)
		baseValues := theory.ChordOnNoteInt(baseNote, chord)
		baseValues = theory.InvertChord(baseValues, inversions)

		values := []int{}
		for octaves >= 1 {
			for _, note := range baseValues {
				values = append(values, note)
			}
			for i, _ := range baseValues {
				baseValues[i] += 12
			}
			octaves--
		}
		return values
	}
}

func Scale(scale string, baseNoteF, octavesF, inversionsF IntAutomation) IntArrayAutomation {
	return func(s *Status, counter, t uint) []int {
		baseNote := baseNoteF(s, counter, t)
		inversions := inversionsF(s, counter, t)
		octaves := octavesF(s, counter, t)
		baseValues := theory.ScaleOnNoteInt(baseNote, scale)
		baseValues = theory.InvertChord(baseValues, inversions)

		values := []int{}
		for octaves >= 1 {
			for _, note := range baseValues {
				values = append(values, note)
			}
			for i, _ := range baseValues {
				baseValues[i] += 12
			}
			octaves--
		}
		return values
	}
}
