// Primitive and high level music theory concepts to manipulate notes, chords,
// rhythms, etc.
package theory

import (
	"strings"

	"github.com/pkg/errors"
)

const (
	C4 = 60 // TODO: remove
)

type Notes []*Note

func NotesFromString(s string) (Notes, error) {
	strNotes := strings.Fields(s)
	result := make([]*Note, len(strNotes))
	for i, n := range strNotes {
		note, err := NoteFromString(n)
		if err != nil {
			return nil, errors.Wrapf(err, "parsing %v note", i)
		}
		result[i] = note
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
