package synth

func LinearPanning(input1, input2, panning float64) (float64, float64) {
	left := input1*(1-panning) + input2*(1-panning)
	right := input1*panning + input2*panning
	return left, right
}
