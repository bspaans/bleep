// Global audio related configuration options.
package audio

type AudioConfig struct {
	// The bit depth of the output stream.
	BitDepth int

	// The sample rate of the output stream.
	SampleRate int

	Stereo bool

	// The number of times per second the Synth should
	// handle events of its event queue.
	HandleEventsPerSecond    int
	MidiEventInputBufferSize int
	Debug                    bool
}

func NewAudioConfig() *AudioConfig {
	return &AudioConfig{
		BitDepth:   16,
		SampleRate: 44100,
		Stereo:     true,

		// The step size
		HandleEventsPerSecond:    100,
		MidiEventInputBufferSize: 128,
		Debug:                    false,
	}
}
