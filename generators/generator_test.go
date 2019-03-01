package generators

func CountPeaksInSamples(samples []int) int {
	goingDown := false
	prev := 0
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
