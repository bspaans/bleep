// Global audio related configuration options.
package audio

type AudioConfig struct {
	// The bit depth of the output stream.
	// Most sinks support both 8 and 16 bit. Default: 16.
	BitDepth int

	// The sample rate of the output stream.
	// Default: 44100.
	SampleRate int

	// Default: true
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

func (c *AudioConfig) GetNumberOfChannels() int {
	if c.Stereo {
		return 2
	}
	return 1
}
