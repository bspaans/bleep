package audio

type AudioConfig struct {
	BitDepth   int
	SampleRate int
	StepSize   int
	Stereo     bool
}

func NewAudioConfig() *AudioConfig {
	return &AudioConfig{
		BitDepth:   8,
		SampleRate: 44100,
		StepSize:   1024,
		Stereo:     true,
	}
}
