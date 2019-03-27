package theory

import "testing"

func Test_NoteFromInt(t *testing.T) {
	if NoteFromInt(C3).Name != C {
		t.Fatal("Expecting name to be C")
	}
	if NoteFromInt(C3).Accidentals != 0 {
		t.Fatal("Expecting 0 accidentals")
	}
	if NoteFromInt(C3).Octave != 3 {
		t.Fatal("Expecting 3th octace")
	}
	if NoteFromInt(C3).String() != "C3" {
		t.Fatal("Expecting 'C3' as string")
	}
	if NoteFromInt(C3).Int() != C3 {
		t.Fatal("Expecting 'C3' as int")
	}
	if NoteFromInt(Db4).Name != D {
		t.Fatal("Expecting name to be D, got", NoteFromInt(Db4).Name)
	}
	if NoteFromInt(Db4).Accidentals != -1 {
		t.Fatal("Expecting -1 accidentals")
	}
	if NoteFromInt(Db4).Octave != 4 {
		t.Fatal("Expecting 4th octace")
	}
	if NoteFromInt(Db4).String() != "Db4" {
		t.Fatal("Expecting 'Db4' as string")
	}
	if NoteFromInt(Db4).Int() != Db4 {
		t.Fatal("Expecting 'Db4' as string")
	}
}

func Test_MustNoteFromString(t *testing.T) {
	if MustNoteFromString("C3").Name != C {
		t.Fatal("Expecting name to be C")
	}
	if MustNoteFromString("C3").Accidentals != 0 {
		t.Fatal("Expecting 0 accidentals")
	}
	if MustNoteFromString("C3").Octave != 3 {
		t.Fatal("Expecting 3th octace")
	}
	if MustNoteFromString("C3").String() != "C3" {
		t.Fatal("Expecting 'C3' as string")
	}
	if MustNoteFromString("C3").Int() != C3 {
		t.Fatal("Expecting 'C3' as int")
	}
	if MustNoteFromString("c3").Int() != C3 {
		t.Fatal("Expecting 'c3' as int")
	}
	if MustNoteFromString("Db4").Name != D {
		t.Fatal("Expecting name to be D, got", MustNoteFromString("Db4").Name)
	}
	if MustNoteFromString("Db4").Accidentals != -1 {
		t.Fatal("Expecting -1 accidentals")
	}
	if MustNoteFromString("Db4").Octave != 4 {
		t.Fatal("Expecting 4th octace")
	}
	if MustNoteFromString("Db4").String() != "Db4" {
		t.Fatal("Expecting 'Db4' as string")
	}
	if MustNoteFromString("Db4").Int() != Db4 {
		t.Fatal("Expecting 'Db4' as string")
	}
}
