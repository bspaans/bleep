package theory_test

import (
	"fmt"
	"testing"

	"github.com/bspaans/bleep/theory"
)

func Test_Scale_Diatonic_GetAscendingIntervals(t *testing.T) {
	unit := theory.Diatonic.GetAscendingIntervals()
	expected := []int{0, 2, 2, 1, 2, 2, 2}
	for i, e := range expected {
		if unit[i] != e {
			fmt.Println("Expecting", e, "got", unit[i], "in", unit)
		}
	}
}

func Test_Scale_Dorian_GetAscendingIntervals(t *testing.T) {
	unit := theory.Dorian.GetAscendingIntervals()
	expected := []int{2, 2, 1, 2, 2, 2, 1}
	for i, e := range expected {
		if unit[i] != e {
			fmt.Println("Expecting", e, "got", unit[i], "in", unit)
		}
	}
}

func Test_ScaleOnNoteInt(t *testing.T) {
	a4 := theory.NoteA4.Int()
	unit := theory.ScaleOnNoteInt(a4, "diatonic")
	expected := []int{a4, a4 + 2, a4 + 4, a4 + 5, a4 + 7, a4 + 9, a4 + 11}
	for i, e := range expected {
		if unit[i] != e {
			fmt.Println("Expecting", a4+e, "got", unit[i], "in", unit)
		}
	}
}
