package theory

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
)

type Note struct {
	Tone        ToneName
	Accidentals int
	Octave      int
}

// SemitoneCount is a number of semitones in full octave.
//
// In simple words: this is count of white and black keys on piano in full octave.
const SemitoneCount = 12

// NoteFromInt generates Note object from midi note id. Valid n starts with 21 and ends with 108, tese are
// midi max and min values.
func NoteFromInt(n int) (*Note, error) {
	if n < 21 {
		return nil, errors.New("n is less than 21")
	}
	if n > 108 {
		return nil, errors.New("n is bigger than 108")
	}

	semitone := n % SemitoneCount // semitones starts with 1, 0 is unknown, BUT midi starts with 0
	octave := n/SemitoneCount - 1

	var toneName ToneName
	var accidentals int // it's # or b

	// how does this works:
	// we sure that "1 <= semitone+1 <= 12", so we have only 12 variants.
	// if semitone+1 doesnt contain in ToneNames, so semitone+1 == one of 2 4 7 9 or 11
	// for all of those variants, we choosing + 1 semitone and add to accidentals -1. Easy!
	if toneContains(ToneNames, ToneName(semitone+1)) {
		toneName = ToneName(semitone + 1)
	} else {
		toneName = ToneName(semitone + 2)
		accidentals -= 1
	}

	if toneName == ToneUnknown {
		panic(fmt.Sprintf("What??? n:%v semitone:%v octave:%v", n, semitone, octave))
	}

	return &Note{
		Tone:        toneName,
		Accidentals: accidentals,
		Octave:      octave,
	}, nil
}

func MustNoteFromInt(n int) *Note {
	note, err := NoteFromInt(n)
	if err != nil {
		panic(err)
	}
	return note
}

// MainOctave is octave, when you don't write octave number in note. For example, "C#" == "C4#", cause
// octave is empty
//
// Usually, main octave is 4
const MainOctave = 4

func NoteFromString(s string) (*Note, error) {
	if len(s) == 0 {
		return nil, errors.New("note is empty")
	}
	toneStr := s[:1]
	s = s[1:]

	tone := ToneNameFromString(toneStr)
	if tone == ToneUnknown {
		return nil, fmt.Errorf("invalid tone: %v", toneStr)
	}
	accidentals := 0
	octave := MainOctave

	for i, r := range s {
		if r == '#' {
			accidentals += 1
		} else if r == 'b' {
			accidentals -= 1
		} else if r >= '0' && r <= '9' {
			if i != len(s)-1 {
				return nil, fmt.Errorf("Wrong position of octave: %v", i)
			}
			octave = int(r) - int('0')
		} else {
			return nil, fmt.Errorf("Invalid symbol: %v", string(r))
		}
	}
	return &Note{
		Tone:        tone,
		Accidentals: accidentals,
		Octave:      octave,
	}, nil
}

func MustNoteFromString(s string) *Note {
	note, err := NoteFromString(s)
	if err != nil {
		panic(err)
	}
	return note
}

func (n *Note) accidentalsToString() string {
	if n.Accidentals == 0 {
		return ""
	}

	symbol := ""
	if n.Accidentals > 0 {
		symbol = "#"
	} else {
		symbol = "b"
	}

	return strings.Repeat(symbol, n.Accidentals)
}

func (n *Note) String() string {
	return n.Tone.String() + n.accidentalsToString() + strconv.Itoa(n.Octave)
}

func (n *Note) Int() int {
	return SemitoneCount*(n.Octave) + int(n.Tone) + n.Accidentals
}

func (n *Note) Augment() {
	n.Accidentals++
}

func (n *Note) Diminish() {
	n.Accidentals--
}

func (n *Note) Pitch() float64 {
	return NoteToPitch(n.Int() - MidiNoteOffset)
}

func (n *Note) Chord(chord string) Notes {
	return ChordOnNote(n, chord)
}

func toneContains(in []ToneName, item ToneName) bool {
	for _, tone := range in {
		if tone == item {
			return true
		}
	}

	return false
}
