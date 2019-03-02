package midi

import (
	"math"

	"github.com/bspaans/bs8bs/midi/channels"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
	"github.com/bspaans/bs8bs/instruments"
)

type Mixer struct {
	Channels []channels.Channel
	Gain     []float64
}

func NewMixer() *Mixer {
	m := &Mixer{
		Channels: []channels.Channel{},
		Gain:     []float64{},
	}
	for i := 0; i < 16; i++ {
		ch := channels.NewPolyphonicChannel()
		ch.SetInstrument(func() generators.Generator {
			g := generators.NewSineWaveOscillator()
			g.SetPitch(0)
			return g
		})
		m.AddChannel(ch)
	}
	m.Channels[9] = channels.NewPercussionChannel()
	return m
}

func (m *Mixer) AddChannel(ch channels.Channel) {
	m.Channels = append(m.Channels, ch)
	m.Gain = append(m.Gain, 0.15)
}

func (m *Mixer) NoteOn(channel, note int, velocity float64) {
	if channel < len(m.Channels) {
		m.Channels[channel].NoteOn(note, velocity)
	}
}

func (m *Mixer) NoteOff(channel, note int) {
	if channel < len(m.Channels) {
		m.Channels[channel].NoteOff(note)
	}
}

func (m *Mixer) ChangeInstrument(channel, instr int) {
	if channel < len(m.Channels) {
		m.Channels[channel].SetInstrument(instruments.Bank[instr])
	}
}

func (m *Mixer) GetSamples(cfg *audio.AudioConfig, n int) []int {
	samples := make([]float64, n)

	for channelNr, ch := range m.Channels {
		for i, sample := range ch.GetSamples(cfg, n) {
			samples[i] += sample * m.Gain[channelNr]
		}
	}

	result := make([]int, n)
	maxValue := math.Pow(2, float64(cfg.BitDepth))
	for i, sample := range samples {
		scaled := (sample + 1) * (maxValue / 2)
		maxClipped := math.Max(0, math.Ceil(scaled))
		result[i] = int(math.Min(maxClipped, maxValue-1))
	}
	return result
}

func (m *Mixer) SilenceAllChannels() {
	for _, ch := range m.Channels {
		for i := 0; i < 128; i++ {
			ch.NoteOff(i)
		}
	}
}
