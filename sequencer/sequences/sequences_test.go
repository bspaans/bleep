package sequences

import (
	"testing"

	. "github.com/bspaans/bleep/sequencer/status"
	"github.com/bspaans/bleep/synth"
)

func Test_Every(t *testing.T) {
	called := 0
	counterValue := uint(0)
	f := func(status *Status, counter, t uint, s chan *synth.Event) {
		called += 1
		counterValue = counter
	}
	unit := Every(4, f)
	expected := 0
	for i := 0; i < 1000; i += 4 {
		unit(nil, uint(i), uint(i), nil)
		expected++
		if called != expected {
			t.Errorf("Sequence should have been called %d times on t=%d (called=%d)", expected, i, called)
		}
		if counterValue != uint(expected)-1 {
			t.Errorf("Counter should be set to %d on t=%d (counter=%d)", expected-1, i, counterValue)
		}
	}
	unit(nil, 0, 1, nil)
	called = 0
	expected = 0
	for i := 1; i < 1000; i += 4 {
		unit(nil, uint(i), uint(i), nil)
		if called != 0 {
			t.Errorf("Sequence shouldn't have been called on t=%d", i)
		}
		unit(nil, uint(i+1), uint(i+1), nil)
		if called != 0 {
			t.Errorf("Sequence shouldn't have been called on t=%d", i+1)
		}
		unit(nil, uint(i+2), uint(i+2), nil)
		if called != 0 {
			t.Errorf("Sequence shouldn't have been called on t=%d", i+2)
		}
	}
}

func Test_Switch(t *testing.T) {
	called := 0
	f := func(status *Status, counter, t uint, s chan *synth.Event) {
		called += 1
	}
	unit := Switch(4, f)
	for i := 0; i < 4; i++ {
		unit(nil, 0, uint(i), nil)
		unit(nil, 0, uint(i+8), nil)
		unit(nil, 0, uint(i+16), nil)
		unit(nil, 0, uint(i+24), nil)
		if called != (i+1)*4 {
			t.Errorf("Sequence not called")
		}
	}
	for i := 0; i < 4; i++ {
		unit(nil, 0, uint(i+4), nil)
		unit(nil, 0, uint(i+12), nil)
		unit(nil, 0, uint(i+20), nil)
		unit(nil, 0, uint(i+28), nil)
		if called != 16 {
			t.Errorf("Sequence called, but shouldn't have been called")
		}
	}
}

func Test_EveryWithOffset(t *testing.T) {
	called := 0
	counterValue := uint(0)
	f := func(status *Status, counter, t uint, s chan *synth.Event) {
		called += 1
		counterValue = counter
	}
	offset := uint(7)
	unit := EveryWithOffset(4, offset, f)
	expected := 0
	for i := offset; i < 1000; i += 4 {
		unit(nil, uint(i), uint(i), nil)
		expected++
		if called != expected {
			t.Errorf("Sequence should have been called %d times on t=%d (called=%d)", expected, i, called)
		}
		if counterValue != uint(expected)-1 {
			t.Errorf("Counter should be set to %d on t=%d (counter=%d)", expected-1, i, counterValue)
		}
	}
	unit(nil, 0, 1, nil)
	called = 0
	expected = 0
	for i := 1 + offset; i < 100; i += 4 {
		unit(nil, uint(i), uint(i), nil)
		if called != 0 {
			t.Errorf("Sequence shouldn't have been called on t=%d", i)
		}
		unit(nil, uint(i+1), uint(i+1), nil)
		if called != 0 {
			t.Errorf("Sequence shouldn't have been called on t=%d", i+1)
		}
		unit(nil, uint(i+2), uint(i+2), nil)
		if called != 0 {
			t.Errorf("Sequence shouldn't have been called on t=%d", i+2)
		}
	}
}
