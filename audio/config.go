package audio

type AudioConfig struct {
	BitDepth                 int
	SampleRate               int
	StepSize                 int
	Stereo                   bool
	MidiEventInputBufferSize int
	Debug                    bool
}

func NewAudioConfig() *AudioConfig {
	return &AudioConfig{
		BitDepth:                 8,
		SampleRate:               44100,
		StepSize:                 441,
		Stereo:                   true,
		MidiEventInputBufferSize: 64,
		Debug:                    false,
	}
}
