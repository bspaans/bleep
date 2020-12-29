package util

import (
	"math"
)

func DecibelsToTimes(decibels float64) (times float64) {
	return math.Pow(10, decibels/10.0)
}

func TimesToDecibels(times float64) (decibels float64) {
	return 10 * math.Log10(times)
}

func PercentsToDecibels(percent float64) (decibels float64) {
	if percent == 1 {
		return math.Inf(-1)
	}
	if percent > 1 || percent < 0 {
		panic("percent value must be in [0,1] inclusive")
	}
	return 10 / (math.Log10(percent))
}
