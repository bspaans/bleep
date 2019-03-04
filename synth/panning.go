package synth

import "math"

func LinearPanning(input1, input2, panning float64) (float64, float64) {
	left := input1*(1-panning) + input2*(1-panning)
	right := input1*panning + input2*panning
	return left, right
}

func SquareRootPanning(input1, input2, panning float64) (float64, float64) {
	pan1 := math.Sqrt(1 - panning)
	pan2 := math.Sqrt(panning)
	left := input1*pan1 + input2*pan1
	right := input1*pan2 + input2*pan2
	return left, right
}

func SinusoidalPanning(input1, input2, panning float64) (float64, float64) {
	panning *= math.Pi / 2
	pan1 := math.Cos(panning)
	pan2 := math.Sin(panning)
	left := input1*pan1 + input2*pan1
	right := input1*pan2 + input2*pan2
	return left, right
}
