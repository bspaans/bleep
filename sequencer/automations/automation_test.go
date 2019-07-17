package automations

import "testing"

func Test_IntSweepAutomation_basic(t *testing.T) {

	expected := []int{0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1, 0}

	unit := IntSweepAutomation(0, 3, 1, 1)

	for i, e := range expected {
		got := unit(nil, uint(i), uint(i))
		if e != got {
			t.Errorf("Expecting %dth element to be %d got %d", i, e, got)
		}
	}
}

func Test_IntSweepAutomation_basic_change_every_2(t *testing.T) {

	expected := []int{0, 0, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1, 1, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1, 1, 0, 0}

	unit := IntSweepAutomation(0, 3, 2, 1)

	for i, e := range expected {
		got := unit(nil, uint(i), uint(i))
		if e != got {
			t.Errorf("Expecting %dth element to be %d got %d", i, e, got)
		}
	}

}

func Test_IntCycleAutomation_basic(t *testing.T) {

	expected := []int{0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3}

	unit := IntCycleAutomation([]int{0, 1, 2, 3})

	for i, e := range expected {
		got := unit(nil, uint(i), uint(i))
		if e != got {
			t.Errorf("Expecting %dth element to be %d got %d", i, e, got)
		}
	}
}
