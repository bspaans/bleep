package theory

func EuclidianRhythm(n, over int) []bool {
	result := make([]bool, over)

	// Bjorklunds Algorithm
	// Generate the first buckets
	// e.g. [[1], [1], [1], [1], [1], [0], [0], ...., [0]]
	//
	nrOfBuckets := over
	buckets := make([][]bool, nrOfBuckets)
	zeroes := 0
	for i := 0; i < nrOfBuckets; i++ {
		v := i < n
		buckets[i] = []bool{v}
		if !v {
			zeroes++
		}
	}
	ix := 0
	for zeroes != 0 {
		if ix >= nrOfBuckets {
			ix = 0
		} else if !buckets[ix][0] {
			ix = 0
		} else {
			bix := nrOfBuckets - 1
			buckets[ix] = mergeBuckets(buckets[ix], buckets[bix])
			buckets[bix] = []bool{}
			ix++
			nrOfBuckets--
			zeroes--
			// no more zeroes left, but we may have some more buckets
			// we can distribute
			if zeroes == 0 {
				ix = 0
				l := len(buckets[0])
				for j := 1; j < nrOfBuckets; j++ {
					if len(buckets[j]) != l {
						zeroes++
					}
				}
				if zeroes == 1 { // only one remainder
					break
				}
			}
		}
	}

	ix = 0
	for i := 0; i < nrOfBuckets; i++ {
		for j := 0; j < len(buckets[i]); j++ {
			result[ix] = buckets[i][j]
			ix++
		}
	}
	return result
}

func mergeBuckets(b1, b2 []bool) []bool {
	for _, v := range b2 {
		b1 = append(b1, v)
	}
	return b1
}
