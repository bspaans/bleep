package theory

import (
	"fmt"
	"testing"
)

func Test_Scale_Diatonic_GetAscendingIntervals(t *testing.T) {
	unit := Diatonic.GetAscendingIntervals()
	expected := []int{0, 2, 2, 1, 2, 2, 2}
	for i, e := range expected {
		if unit[i] != e {
			fmt.Println("Expecting", e, "got", unit[i], "in", unit)
		}
	}
}

func Test_Scale_Dorian_GetAscendingIntervals(t *testing.T) {
	unit := Dorian.GetAscendingIntervals()
	expected := []int{2, 2, 1, 2, 2, 2, 1}
	for i, e := range expected {
		if unit[i] != e {
			fmt.Println("Expecting", e, "got", unit[i], "in", unit)
		}
	}
}

func Test_ScaleOnNoteInt(t *testing.T) {
	unit := ScaleOnNoteInt(A4, "diatonic")
	expected := []int{A4, A4 + 2, A4 + 4, A4 + 5, A4 + 7, A4 + 9, A4 + 11}
	for i, e := range expected {
		if unit[i] != e {
			fmt.Println("Expecting", A4+e, "got", unit[i], "in", unit)
		}
	}
}
