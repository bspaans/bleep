// Primitive and high level music theory concepts to manipulate notes, chords,
// rhythms, etc.
package theory

import (
	"math"
	"strings"
)

const (
	C1  = 24
	C2  = 36
	C3  = 48
	C4  = 60
	Db4 = 61
	D4  = 62
	E4  = 64
	F4  = 65
	G4  = 67
	A4  = 69
	B4  = 71
	C5  = 72
	C6  = 84
	C7  = 96
	A7  = 105
)

type Notes []*Note

func NotesFromString(s string) (Notes, error) {
	result := []*Note{}
	for _, n := range strings.Fields(s) {
		note, err := NoteFromString(n)
		if err != nil {
			return nil, err
		}
		result = append(result, note)
	}
	return result, nil
}

func MustNotesFromString(s string) Notes {
	notes, err := NotesFromString(s)
	if err != nil {
		panic(err)
	}
	return notes
}

func (n Notes) Augment() {
	for _, note := range n {
		note.Augment()
	}
}

func (n Notes) Diminish() {
	for _, note := range n {
		note.Diminish()
	}
}

var NoteToPitch = make([]float64, 128)

func init() {
	a := 440.0
	for i := 0; i < 128; i++ {
		NoteToPitch[i] = (a / 32) * (math.Pow(2, ((float64(i) - 9) / 12)))
	}
}
