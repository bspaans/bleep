package theory_test

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/bspaans/bleep/theory"
)

func TestNotesFromInt(t *testing.T) {
	tests := []struct {
		in       int
		expected *theory.Note
		wantErr  assert.ErrorAssertionFunc
	}{
		{
			in: C3,
			expected: &theory.Note{
				Tone:        theory.ToneC,
				Accidentals: 0,
				Octave:      3,
			},
		},
		{
			in: 41,
			expected: &theory.Note{
				Tone:        theory.ToneF,
				Accidentals: 0,
				Octave:      2,
			},
		},
		{
			in: 21,
			expected: &theory.Note{
				Tone:        theory.ToneA,
				Accidentals: 0,
				Octave:      0,
			},
		},
		{
			in: Db4,
			expected: &theory.Note{
				Tone:        theory.ToneD,
				Accidentals: -1,
				Octave:      4,
			},
		},
		{
			in:      -1,
			wantErr: assert.Error,
		},
	}
	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			tt.wantErr = noErrAsDefault(tt.wantErr)

			res, err := theory.NoteFromInt(tt.in)
			if !tt.wantErr(t, err) {
				return
			}

			if tt.expected != nil {
				assert.Equal(t, tt.expected, res)
			}
		})
	}
}

func TestNotesFromString(t *testing.T) {
	tests := []struct {
		in       string
		expected *theory.Note
		wantErr  assert.ErrorAssertionFunc
	}{
		{
			in: "c3",
			expected: &theory.Note{
				Tone:        theory.ToneC,
				Accidentals: 0,
				Octave:      3,
			},
		},
		{
			in: "Db3",
			expected: &theory.Note{
				Tone:        theory.ToneD,
				Accidentals: -1,
				Octave:      3,
			},
		},
		{
			in:      "dB3",
			wantErr: assert.Error,
		},
	}
	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			tt.wantErr = noErrAsDefault(tt.wantErr)

			res, err := theory.NoteFromString(tt.in)
			if !tt.wantErr(t, err) {
				return
			}

			if tt.expected != nil {
				assert.Equal(t, tt.expected, res)
			}
		})
	}
}
