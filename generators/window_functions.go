package generators

import "math"

type WindowFunction func(length int) []float64

// No window function.
//
func NoWindowFunction(length int) []float64 {
	var result = make([]float64, length)
	for i := 0; i < length; i++ {
		result[i] = 1.0
	}
	return result
}

// The upper part of a sine wave.
//
func SineWindowFunction(length int) []float64 {
	var result = make([]float64, length)
	for i := 0; i < length; i++ {
		result[i] = math.Sin(math.Pi * float64(i) / float64(length))
	}
	return result
}

// Hann window
//
func HannWindowFunction(length int) []float64 {
	var result = make([]float64, length)
	for i := 0; i < length; i++ {
		result[i] = 0.5 * (1.0 - math.Cos(2*math.Pi*float64(i)/float64(length)))
	}
	return result
}

// Hamming window
//
func HammingWindowFunction(length int) []float64 {
	var result = make([]float64, length)
	for i := 0; i < length; i++ {
		result[i] = 0.54 - 0.46*math.Cos(2*math.Pi*float64(i)/float64(length))
	}
	return result
}

// Tukey window
//
func TukeyWindowFunction(length int) []float64 {
	var result = make([]float64, length)
	truncationHeight := 0.5
	for i := 0; i < length; i++ {
		result[i] = 1.0 / (2 * truncationHeight) * (1 - math.Cos(2*math.Pi*float64(i)/float64(length)))
	}
	return result
}

// Trapezoidal window
//
func TrapezoidalWindowFunction(length int) []float64 {
	var result = make([]float64, length)
	slope := 10.0
	for i := 0; i < length; i++ {
		x := float64(i) / float64(length)
		f1 := slope * x
		f2 := -1*slope*(x-((slope-1)/slope)) + 1
		if x < 0.5 {
			if f1 < 1 {
				result[i] = f1
			} else {
				result[i] = 1.0
			}
		} else if f2 < 1 {
			result[i] = f2
		} else {
			result[i] = 1.0
		}
	}
	return result
}
