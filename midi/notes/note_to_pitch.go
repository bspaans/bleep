package notes

import "math"

var NoteToPitch = make([]float64, 128)

func init() {
	a := 440.0
	for i := 0; i < 128; i++ {
		NoteToPitch[i] = (a / 32) * (math.Pow(2, ((float64(i) - 9) / 12)))
	}
}
