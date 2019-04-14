package status

type Status struct {
	BPM               float64
	Granularity       int
	IntRegisters      []int
	IntArrayRegisters [][]int
	FloatRegisters    []float64
}

func NewStatus(bpm float64, granularity int) Status {
	return Status{
		BPM:               bpm,
		Granularity:       granularity,
		IntRegisters:      make([]int, 128),
		IntArrayRegisters: make([][]int, 128),
		FloatRegisters:    make([]float64, 128),
	}
}
