package generators

type Generator interface {
	GetSamples(n int) []int
}

type GeneratorConfig struct {
	BitDepth   int
	SampleRate int
}
