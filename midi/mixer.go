package midi

import (
	"math"

	"github.com/bspaans/bs8bs/audio"
	"github.com/bspaans/bs8bs/generators"
)

type Mixer struct {
	Channels []Channel
	Gain     []float64
}

func NewMixer() *Mixer {
	m := &Mixer{
		Channels: []Channel{},
		Gain:     []float64{},
	}
	for i := 0; i < 16; i++ {
		g := generators.NewSquareWaveOscillator()
		g.SetPitch(0)
		m.AddChannel(NewMonophonicChannel(g))
	}
	return m
}

func (m *Mixer) AddChannel(ch Channel) {
	m.Channels = append(m.Channels, ch)
	m.Gain = append(m.Gain, 0.05)
}

func (m *Mixer) NoteOn(channel, note int) {
	if channel < len(m.Channels) {
		m.Channels[channel].NoteOn(note)
	}
}

func (m *Mixer) NoteOff(channel, note int) {
	if channel < len(m.Channels) {
		m.Channels[channel].NoteOff(note)
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
