package controller

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/midi"
	"github.com/bspaans/bs8bs/sequencer"
	"github.com/bspaans/bs8bs/synth"
	"github.com/bspaans/bs8bs/ui"
)

// The Controller is a high level object that can be used to setup
// and control the Synthesizer, Sequencer and the instrument banks.
type Controller struct {
	Config             *audio.AudioConfig
	Synth              *synth.Synth
	Sequencer          *sequencer.Sequencer
	InstrumentBankFile string
	PercussionBankFile string
	UI                 ui.UI
}

func NewController(cfg *audio.AudioConfig) *Controller {
	return &Controller{
		Config: cfg,
		Synth:  synth.NewSynth(cfg),
	}
}

// Enables "real-time" audio output using the PortAudio library.
func (c *Controller) EnablePortAudioSink() error {
	return c.Synth.EnablePortAudioSink()
}

// Record all Synthesizer output in to a .wav file. The file gets written when
// the sink closes (usually when the program ends).
func (c *Controller) EnableWavSink(file string) error {
	return c.Synth.EnableWavSink(file)
}

// Load an instrument bank definition from a file.
func (c *Controller) LoadInstrumentBank(file string) error {
	c.InstrumentBankFile = file
	return c.ReloadInstrumentBank()
}

// Reload the instrument bank by reloading the file.
func (c *Controller) ReloadInstrumentBank() error {
	if c.InstrumentBankFile != "" {
		return c.Synth.LoadInstrumentBank(c.InstrumentBankFile)
	}
	return nil
}

// Load an percussion instrument bank definition from a file.
func (c *Controller) LoadPercussionBank(file string) error {
	c.PercussionBankFile = file
	return c.ReloadPercussionBank()
}

// Reload the instrument percussion bank by reloading the file.
func (c *Controller) ReloadPercussionBank() error {
	if c.PercussionBankFile != "" {
		return c.Synth.LoadPercussionBank(c.PercussionBankFile)
	}
	return nil
}

// Load a Sequencer definition from a file and start the sequencer in a
// go-routine.
func (c *Controller) LoadSequencerFromFile(file string) error {
	seq, err := sequencer.NewSequencerFromFile(file)
	if err != nil {
		return err
	}
	c.Sequencer = seq
	c.StartSequencer()
	return nil
}

// Reload the sequencer by reloading the file.
func (c *Controller) ReloadSequencer() {
	if c.Sequencer != nil {
		c.Sequencer.Reload()
	}
}

// Start Synthesizer. Note that this synthesizer isn't run in a go-routine by
// default.
func (c *Controller) StartSynth() {
	go func() {
		for {
			select {
			case ev := <-c.Synth.Outputs:
				if c.UI != nil {
					c.UI.HandleEvent(ev)
				}
			}
		}
	}()
	c.Synth.Start()
}

// Start Sequencer. The sequencer is started in its own go-routine.
func (c *Controller) StartSequencer() {
	c.Sequencer.Start(c.Synth.Inputs)
}

// Register this program as a Virtual MIDI device. Programs that support it
// can then output MIDI to the device.
func (c *Controller) StartVirtualMIDIDevice() {
	midi.StartVirtualMIDIDevice(c.Synth.Inputs)
}

// Close the Synthesizer and its sinks.
func (c *Controller) Quit() {
	c.Synth.Close()
}
