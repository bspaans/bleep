package generators

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/bspaans/bleep/audio"
)

func TestSampleGenerator_GetSamples(t *testing.T) {
	testedCfg := audio.NewAudioConfig()
	tests := []struct {
		in         []float64
		sampleSize int // times of expected
		saveState  bool
		expected   []float64
	}{
		{
			in:         []float64{1, 1, 2, 2, 3, 3},
			sampleSize: 5,
			saveState:  true,
			expected:   []float64{1, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 3, 1, 1},
		},
		{
			in:         []float64{1, 1, 2, 2, 3, 3},
			sampleSize: 2,
			saveState:  false,
			expected:   []float64{1, 1, 2, 2, 1, 1, 2, 2},
		},
	}
	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			g := NewSampleGenerator(testedCfg, tt.in)
			g.SaveState = tt.saveState
			out1 := g.GetSamples(testedCfg, tt.sampleSize)
			out2 := g.GetSamples(testedCfg, tt.sampleSize)

			assert.Equal(t, tt.expected, append(out1, out2...))
		})
	}
}
