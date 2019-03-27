package theory

import (
	"fmt"
	"strings"
)

type NoteName = int

const (
	C NoteName = 0
	D NoteName = 2
	E NoteName = 4
	F NoteName = 5
	G NoteName = 7
	A NoteName = 9
	B NoteName = 11
)

var NoteNames = []NoteName{C, D, E, F, G, A, B}

func NoteNameToString(n NoteName) string {
	switch n {
	case C:
		return "C"
	case D:
		return "D"
	case E:
		return "E"
	case F:
		return "F"
	case G:
		return "G"
	case A:
		return "A"
	case B:
		return "B"
	}
	return ""
}

func NewNoteNameFromString(s string) (NoteName, error) {
	if len(s) == 0 {
		return 0, fmt.Errorf("Missing note name")
	}

	switch strings.ToUpper(s)[0:1] {
	case "C":
		return C, nil
	case "D":
		return D, nil
	case "E":
		return E, nil
	case "F":
		return F, nil
	case "G":
		return G, nil
	case "A":
		return A, nil
	case "B":
		return B, nil
	}
	return 0, fmt.Errorf("Invalid note name '%s'", s[0:1])
}

func MustNewNoteNameFromString(s string) NoteName {
	n, err := NewNoteNameFromString(s)
	if err != nil {
		panic(err)
	}
	return n
}
