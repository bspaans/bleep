package arpeggiator

import (
	"time"

	"github.com/bspaans/bs8bs/synth"
)

var Chords = map[string][]int{
	"m":   []int{3, 4, 5},
	"M":   []int{4, 3, 5},
	"m7":  []int{3, 4, 3, 2},
	"m67": []int{3, 4, 1, 2, 2},
	"M7":  []int{4, 3, 4, 1},
	"7":   []int{4, 3, 3, 2},
}

func Arpeggio(on, octaveUp, octaveDown int, chord []int) []int {
	result := []int{}
	i := on - (octaveDown * 12)
	chordIx := 0
	for i < on+(octaveUp*12) {
		result = append(result, i)
		i += chord[chordIx]
		chordIx++
		if chordIx >= len(chord) {
			chordIx = 0
		}
	}
	return result
}

func StartArpeggiator(on, octaveUp, octaveDown int, chord []int, s chan *synth.Event) {
	notes := Arpeggio(on, octaveUp, octaveDown, chord)
	i := 0
	direction := 1
	panning := -1.0
	backAndForth := true
	panningStep := 2.0 / float64(len(notes))
	s <- synth.NewEvent(synth.ProgramChange, 1, []int{39})
	s <- synth.NewEvent(synth.ProgramChange, 2, []int{40})
	s <- synth.NewEvent(synth.ProgramChange, 3, []int{89})
	s <- synth.NewEvent(synth.SetReverb, 1, []int{60})
	s <- synth.NewEvent(synth.SetTremelo, 1, []int{60})
	s <- synth.NewEvent(synth.SetTremelo, 2, []int{60})
	s <- synth.NewEvent(synth.SetReverb, 2, []int{60})
	s <- synth.NewEvent(synth.SetReverb, 3, []int{60})
	t := 0
	for {
		s <- synth.NewEvent(synth.SetChannelPanning, 1, []int{int((panning + 1.0) * 63.5)})
		s <- synth.NewEvent(synth.NoteOn, 1, []int{notes[i], 127})
		if t%64 == 0 {
			s <- synth.NewEvent(synth.NoteOn, 2, []int{notes[0], 127})
		}
		if t > 512 && t < 760 && t%64 == 0 {
			s <- synth.NewEvent(synth.NoteOn, 3, []int{notes[len(notes)-3], 50})
			s <- synth.NewEvent(synth.NoteOn, 3, []int{notes[len(notes)-2], 40})
			s <- synth.NewEvent(synth.NoteOn, 3, []int{notes[len(notes)-1], 30})
		}
		if t%4 == 0 {
			s <- synth.NewEvent(synth.NoteOn, 9, []int{35, 127})
		}
		if (t/32)%2 == 1 && t%7 == 0 {
			s <- synth.NewEvent(synth.NoteOn, 9, []int{35, 57})
		}
		if (t/128)%2 == 1 && t%4 == 2 {
			s <- synth.NewEvent(synth.NoteOn, 9, []int{42, 55})
		}
		if t%8 == 4 {
			s <- synth.NewEvent(synth.NoteOn, 9, []int{38, 120})
		}
		if (t/128)%2 == 1 && t%8 == 4 {
			s <- synth.NewEvent(synth.NoteOn, 9, []int{39, 120})
		}
		if t%32 == 2 {
			s <- synth.NewEvent(synth.NoteOn, 9, []int{30, 55})
		}
		panning += (float64(direction) * panningStep)
		time.Sleep(100 * time.Millisecond)
		s <- synth.NewEvent(synth.NoteOff, 1, []int{notes[i]})
		if t%64 == 1 {
			s <- synth.NewEvent(synth.NoteOff, 2, []int{notes[0]})
		}
		if t%64 == 63 {
			s <- synth.NewEvent(synth.NoteOff, 3, []int{notes[len(notes)-3], 50})
			s <- synth.NewEvent(synth.NoteOff, 3, []int{notes[len(notes)-2], 50})
			s <- synth.NewEvent(synth.NoteOff, 3, []int{notes[len(notes)-1], 50})
		}
		if t > 384 {
			notes = Arpeggio(on+1, octaveUp, octaveDown, chord)
		}
		if t > 384*2 {
			notes = Arpeggio(on-2, octaveUp, octaveDown, chord)
		}
		i = i + direction
		t += 1
		if i >= len(notes) {
			if backAndForth {
				direction = -1
				i = len(notes) - 2
			} else {
				i = 0
				panning = -1.0
			}
		} else if i < 0 {
			direction = 1
			i = 1
		}
	}
}
