// Global audio related configuration options.
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
		BitDepth:                 16,
		SampleRate:               44100,
		StepSize:                 64,
		Stereo:                   true,
		MidiEventInputBufferSize: 128,
		Debug:                    false,
	}
}
