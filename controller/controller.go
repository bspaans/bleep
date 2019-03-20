package controller

import (
	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/midi"
	"github.com/bspaans/bs8bs/sequencer"
	"github.com/bspaans/bs8bs/synth"
)

type Controller struct {
	Config             *audio.AudioConfig
	Synth              *synth.Synth
	Sequencer          *sequencer.Sequencer
	InstrumentBankFile string
	PercussionBankFile string
}

func NewController(cfg *audio.AudioConfig) *Controller {
	return &Controller{
		Config: cfg,
		Synth:  synth.NewSynth(cfg),
	}
}

func (c *Controller) EnableWavSink(file string) error {
	return c.Synth.EnableWavSink(file)
}

func (c *Controller) EnablePortAudioSink() error {
	return c.Synth.EnablePortAudioSink()
}

func (c *Controller) LoadInstrumentBank(file string) error {
	c.InstrumentBankFile = file
	return c.ReloadInstrumentBank()
}

func (c *Controller) ReloadInstrumentBank() error {
	if c.InstrumentBankFile != "" {
		return c.Synth.LoadInstrumentBank(c.InstrumentBankFile)
	}
	return nil
}

func (c *Controller) LoadPercussionBank(file string) error {
	c.PercussionBankFile = file
	return c.ReloadPercussionBank()
}

func (c *Controller) ReloadPercussionBank() error {
	if c.PercussionBankFile != "" {
		return c.Synth.LoadPercussionBank(c.PercussionBankFile)
	}
	return nil
}

func (c *Controller) LoadSequencerFromFile(file string) error {
	seq, err := sequencer.NewSequencerFromFile(file)
	if err != nil {
		return err
	}
	c.Sequencer = seq
	c.StartSequencer()
	return nil
}

func (c *Controller) StartSynth() {
	c.Synth.Start()
}

func (c *Controller) StartSequencer() {
	c.Sequencer.Start(c.Synth.Inputs)
}

func (c *Controller) StartVirtualMIDIDevice() {
	midi.StartVirtualMIDIDevice(c.Synth.Inputs)
}

func (c *Controller) ReloadSequencer() {
	if c.Sequencer != nil {
		c.Sequencer.Reload()
	}
}

func (c *Controller) Quit() {
	c.Synth.Close()
}
