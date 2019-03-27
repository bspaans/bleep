package theory

type Scale struct {
	Ascending  Notes
	Descending Notes
}

// The ascending and descending notes should be supplied in the key of C.
// If descending is nil then it will default to the reverse of ascending.
//
func NewScale(ascending, descending Notes) *Scale {
	return &Scale{
		Ascending:  ascending,
		Descending: descending,
	}
}

var Diatonic = Ionian
var MajorScale = Ionian

var Ionian = NewScale(
	MustNotesFromString("C D E F G A B"),
	MustNotesFromString("B A G F E D C"),
)

var Dorian = NewScale(
	MustNotesFromString("D E F G A B C"),
	MustNotesFromString("C B A G F E D"),
)

var Phrygian = NewScale(
	MustNotesFromString("E F G A B C D"),
	MustNotesFromString("D C B A G F E"),
)

var Lydian = NewScale(
	MustNotesFromString("F G A B C D E"),
	MustNotesFromString("C B A G F E D"),
)

var Mixolydian = NewScale(
	MustNotesFromString("G A B C D E F"),
	MustNotesFromString("B A G F E D C"),
)

var Aeolian = NewScale(
	MustNotesFromString("A B C D E F G"),
	MustNotesFromString("G F E D C B A"),
)

var Locrian = NewScale(
	MustNotesFromString("B C D E F G A"),
	MustNotesFromString("A G F E D C B"),
)

var HarmonicMajor = NewScale(
	MustNotesFromString("C D E F G Ab B"),
	MustNotesFromString("B Ab G F E D C"),
)
