package generators

func CountPeaksInSamples(samples []float64) int {
	goingDown := false
	prev := 0.0
	peaks := 0
	for _, v := range samples {
		if !goingDown && v < prev {
			goingDown = true
			peaks++
		} else if goingDown && v > prev {
			goingDown = false
		}
		prev = v
	}
	return peaks
}
