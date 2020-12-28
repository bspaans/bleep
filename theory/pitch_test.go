package theory_test

import (
	"math"
	"testing"

	"github.com/bspaans/bleep/theory"
	"github.com/stretchr/testify/assert"
)

func TestNoteToPitch(t *testing.T) {
	tests := []struct {
		in       int
		expected float64
	}{
		{
			in:       49,
			expected: 440.000,
		},
		{
			in:       40,
			expected: 261.625,
		},
		{
			in:       85,
			expected: 3520.000,
		},
	}
	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			// for test simplification, we're truncating pitch to 3 decimal places
			truncated := math.Floor(theory.NoteToPitch(tt.in)*1000) / 1000
			assert.Equal(t, tt.expected, truncated)
		})
	}
}
