package theory

var Chords = map[string][]int{
	"m":   []int{3, 4, 5},
	"M":   []int{4, 3, 5},
	"m7":  []int{3, 4, 3, 2},
	"m67": []int{3, 4, 1, 2, 2},
	"M7":  []int{4, 3, 4, 1},
	"7":   []int{4, 3, 3, 2},
}

func ChordOnNoteInt(note int, chord string) []int {
	result := []int{note}
	notes := Chords[chord]
	current := note
	for _, n := range notes {
		current += n
		result = append(result, current)
	}
	return result
}

func InvertChord(chord []int, inversions int) []int {
	result := make([]int, len(chord))
	copy(result, chord)
	for inversions >= 0 {
		result = append(result, result[0]+12)
		result = result[1:]
		inversions--
	}
	return result
}

func ChordOnNote(note *Note, chord string) Notes {
	result := []*Note{note}
	notes := Chords[chord]
	current := note.Int()
	for _, n := range notes {
		current += n
		result = append(result, MustNoteFromInt(current))
	}
	return result
}
