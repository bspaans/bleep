package generators

import (
	"testing"

	"github.com/bspaans/bleep/audio"
	"github.com/stretchr/testify/assert"
)

func TestNotesFromInt(t *testing.T) {
	tests := []struct {
		in       float64
		expected float64
	}{
		{
			0,
			0,
		},
		{
			153,
			153,
		},
		{
			-3,
			0,
		},
	}
	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			assert.Equal(t, tt.expected, cutNegative(tt.in))
		})
	}
}

func Test_getNthSample(t *testing.T) {
	cfg := audio.NewAudioConfig()
	tests := []struct {
		smp         []float64
		i           int
		expected    []float64
		needRecover bool
	}{
		{
			[]float64{1, 2, 2, 1, 5, 6},
			1,
			[]float64{2, 1},
			false,
		},
		{
			[]float64{},
			500,
			[]float64{},
			true,
		},
		{
			[]float64{1, 2, 2, 1, 5, 6},
			3,
			[]float64{},
			true,
		},
	}
	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			defer func() {
				r := recover()
				if tt.needRecover {
					assert.NotNil(t, r)
				} else {
					assert.Nil(t, r)
				}

			}()
			assert.Equal(t, tt.expected, getNthSample(cfg, tt.smp, tt.i))
		})
	}
}
