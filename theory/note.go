package theory

import "fmt"

type Note struct {
	Name        NoteName
	Accidentals int
	Octave      int
}

func NoteFromInt(n int) *Note {
	nmod := n % 12
	noteName := 0
	accidentals := 0
	for _, name := range NoteNames {
		if name == nmod || name-1 == nmod {
			noteName = name
			accidentals = nmod - name
		}
	}
	octave := n/12 - 1
	return &Note{
		Name:        noteName,
		Accidentals: accidentals,
		Octave:      octave,
	}
}

func NoteFromString(s string) (*Note, error) {
	name, err := NewNoteNameFromString(s)
	if err != nil {
		return nil, err
	}
	accidentals := 0
	octave := 4
	for _, r := range s[1:] {
		if r == '#' {
			accidentals += 1
		} else if r == 'b' {
			accidentals -= 1
		} else if r >= '0' && r <= '9' {
			octave = int(r) - int('0')
		}
	}
	return &Note{
		Name:        name,
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
	result := ""
	if n.Accidentals == 0 {
		return result
	} else if n.Accidentals > 0 {
		for i := 0; i < n.Accidentals; i++ {
			result += "#"
		}
	} else if n.Accidentals < 0 {
		for i := 0; i > n.Accidentals; i-- {
			result += "b"
		}
	}
	return result
}

func (n *Note) String() string {
	return fmt.Sprintf("%s%s%d", NoteNameToString(n.Name), n.accidentalsToString(), n.Octave)
}

func (n *Note) Int() int {
	return 12*(n.Octave+1) + n.Name + n.Accidentals
}

func (n *Note) Augment() {
	n.Accidentals++
}
func (n *Note) Diminish() {
	n.Accidentals--
}
func (n *Note) Pitch() float64 {
	return NoteToPitch[n.Int()]
}
func (n *Note) Chord(chord string) Notes {
	return ChordOnNote(n, chord)
}
