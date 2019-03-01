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
	result := make([]int, n)
	for channelNr, ch := range m.Channels {
		for i, sample := range ch.GetSamples(cfg, n) {
			result[i] += int(float64(sample) * m.Gain[channelNr])
		}
	}
	maxValue := math.Pow(2, float64(cfg.BitDepth))
	for i, sample := range result {
		maxClipped := math.Max(0, float64(sample))
		result[i] = int(math.Min(maxClipped, maxValue-1))
	}
	return result
}
