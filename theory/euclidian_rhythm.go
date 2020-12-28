package theory

func EuclidianRhythm(n, over int) []bool {
	result := make([]bool, over)

	if n == 0 {
		return result
	}

	// Bjorklunds Algorithm
	// Generate the first buckets
	// e.g. [[1], [1], [1], [1], [1], [0], [0], ...., [0]]
	//
	nrOfBuckets := over
	buckets := make([][]bool, nrOfBuckets)
	left_to_distribute := 0
	for i := 0; i < nrOfBuckets; i++ {
		v := i < n
		buckets[i] = []bool{v}
		if !v {
			left_to_distribute++
		}
	}
	ix := 0
	for left_to_distribute != 0 {
		if ix >= nrOfBuckets-1 || !buckets[ix][0] {
			ix = 0
		} else {
			bix := nrOfBuckets - 1
			buckets[ix] = append(buckets[ix], buckets[bix]...)
			buckets[bix] = []bool{}
			ix++
			nrOfBuckets--
			left_to_distribute--
			// see if there are more buckets left to distribute
			if left_to_distribute == 0 {
				ix = 0
				l := len(buckets[0])
				for j := 1; j < nrOfBuckets; j++ {
					if len(buckets[j]) != l {
						left_to_distribute++
					}
				}
				if left_to_distribute == 1 { // only one remainder
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
