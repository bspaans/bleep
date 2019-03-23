package filters

type Equalizer struct {
	Bands  int
	Values []float64
}

func NewEqualizer(bands int, values []float64) *Equalizer {
	return &Equalizer{
		Bands: bands,
	}
}
