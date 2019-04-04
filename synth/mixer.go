package synth

import (
	"math"
	"sync"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/channels"
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/instruments"
	"github.com/bspaans/bleep/ui"
)

type Mixer struct {
	Channels         []channels.Channel
	Gain             []float64
	ExpressionVolume []float64
	Panning          []float64
	Solo             []bool
}

func NewMixer() *Mixer {
	m := &Mixer{
		Channels:         []channels.Channel{},
		Gain:             []float64{},
		ExpressionVolume: []float64{},
		Panning:          []float64{},
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
	m.Solo = append(m.Solo, false)
	m.Gain = append(m.Gain, 0.15)
	m.ExpressionVolume = append(m.ExpressionVolume, 1.0)
	m.Panning = append(m.Panning, 0.5)
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

func (m *Mixer) SetPitchbend(channel int, pitchbendFactor float64) {
	if channel < len(m.Channels) {
		m.Channels[channel].SetPitchbend(pitchbendFactor)
	}
}

func (m *Mixer) SetReverb(channel, reverb int) {
	if channel < len(m.Channels) {
		m.Channels[channel].SetFX(channels.Reverb, float64(reverb)/127.0-0.01)
	}
}

func (m *Mixer) SetReverbTime(channel int, time float64) {
	if channel < len(m.Channels) {
		m.Channels[channel].SetFX(channels.ReverbTime, time)
	}
}

func (m *Mixer) SetLPFCutoff(channel int, freq int) {
	if channel < len(m.Channels) {
		m.Channels[channel].SetFX(channels.LPF_Cutoff, float64(freq))
	}
}

func (m *Mixer) SetHPFCutoff(channel int, freq int) {
	if channel < len(m.Channels) {
		m.Channels[channel].SetFX(channels.HPF_Cutoff, float64(freq))
	}
}

func (m *Mixer) SetTremelo(channel, reverb int) {
	if channel < len(m.Channels) {
		m.Channels[channel].SetFX(channels.Tremelo, float64(reverb)/127.0)
	}
}

func (m *Mixer) SetGrainOption(channel int, opt channels.GrainOption, value interface{}) {
	if channel < len(m.Channels) {
		m.Channels[channel].SetGrainOption(opt, value)
	}
}

func (m *Mixer) ChangeInstrument(cfg *audio.AudioConfig, channel, instr int) {
	if channel < len(m.Channels) {
		m.Channels[channel].SetInstrument(func() generators.Generator { return instruments.Bank[instr](cfg) })
	}
}

func (m *Mixer) SetInstrument(cfg *audio.AudioConfig, channel int, instr instruments.Instrument) {
	if channel < len(m.Channels) {
		m.Channels[channel].SetInstrument(func() generators.Generator {
			return instr(cfg)
		})
	}
}

func (m *Mixer) GetSamples(cfg *audio.AudioConfig, n int) []int {
	samples := generators.GetEmptySampleArray(cfg, n)
	channelValues := make([][]float64, len(m.Channels))
	solo := m.HasSolo()

	latestValues := make([]float64, len(m.Channels))
	var wg sync.WaitGroup
	for channelNr, ch := range m.Channels {

		wg.Add(1)
		go func(channelNr int, ch channels.Channel) {
			defer wg.Done()
			chSamples := ch.GetSamples(cfg, n)
			if solo && !m.Solo[channelNr] {
				return
			}
			channelValues[channelNr] = make([]float64, len(chSamples))
			for i := 0; i < n; i++ {
				if cfg.Stereo {
					left := chSamples[i*2] * m.Gain[channelNr] * m.ExpressionVolume[channelNr] * 0.15
					right := chSamples[i*2+1] * m.Gain[channelNr] * m.ExpressionVolume[channelNr] * 0.15
					left, right = SinusoidalPanning(left, right, m.Panning[channelNr])
					channelValues[channelNr][i*2] = left
					channelValues[channelNr][i*2+1] = right
					latestValues[channelNr] = (left + right) / 2
				} else {
					v := chSamples[i] * m.Gain[channelNr] * m.ExpressionVolume[channelNr] * 0.15
					channelValues[channelNr][i] = v
					latestValues[channelNr] = v
				}
			}
		}(channelNr, ch)
	}
	wg.Wait()
	for _, channelSamples := range channelValues {
		for i, s := range channelSamples {
			samples[i] += s
		}
	}

	ev := ui.NewUIEvent(ui.ChannelsOutputEvent)
	ev.Values = latestValues
	//outputEvents <- ev

	result := make([]int, len(samples))
	maxValue := math.Pow(2, float64(cfg.BitDepth))
	for i, sample := range samples {
		scaled := (sample + 1) * (maxValue / 2)
		maxClipped := math.Max(0, math.Ceil(scaled))
		result[i] = int(math.Min(maxClipped, maxValue-1))
	}
	return result
}

func (m *Mixer) GetSamples_old(cfg *audio.AudioConfig, n int, outputEvents chan *ui.UIEvent) []int {
	samples := generators.GetEmptySampleArray(cfg, n)
	solo := m.HasSolo()

	latestValues := make([]float64, len(m.Channels))
	for channelNr, ch := range m.Channels {
		chSamples := ch.GetSamples(cfg, n)
		if solo && !m.Solo[channelNr] {
			continue
		}
		for i := 0; i < n; i++ {
			if cfg.Stereo {
				left := chSamples[i*2] * m.Gain[channelNr] * m.ExpressionVolume[channelNr] * 0.15
				right := chSamples[i*2+1] * m.Gain[channelNr] * m.ExpressionVolume[channelNr] * 0.15
				left, right = SinusoidalPanning(left, right, m.Panning[channelNr])
				samples[i*2] += left
				samples[i*2+1] += right
				latestValues[channelNr] = (left + right) / 2
			} else {
				v := chSamples[i] * m.Gain[channelNr] * m.ExpressionVolume[channelNr] * 0.15
				samples[i] += v
				latestValues[channelNr] = v
			}
		}
	}

	ev := ui.NewUIEvent(ui.ChannelsOutputEvent)
	ev.Values = latestValues
	outputEvents <- ev

	result := make([]int, len(samples))
	maxValue := math.Pow(2, float64(cfg.BitDepth))
	for i, sample := range samples {
		scaled := (sample + 1) * (maxValue / 2)
		maxClipped := math.Max(0, math.Ceil(scaled))
		result[i] = int(math.Min(maxClipped, maxValue-1))
	}
	return result
}

func (m *Mixer) HasSolo() bool {
	for _, s := range m.Solo {
		if s {
			return true
		}
	}
	return false
}

func (m *Mixer) SilenceChannel(ch int) {
	if ch < len(m.Channels) {
		for i := 0; i < 128; i++ {
			m.Channels[ch].NoteOff(i)
		}
	}
}

func (m *Mixer) SilenceAllChannels() {
	for _, ch := range m.Channels {
		for i := 0; i < 128; i++ {
			ch.NoteOff(i)
		}
	}
}

func (m *Mixer) SetChannelVolume(ch int, volume int) {
	if ch < len(m.Channels) {
		m.Gain[ch] = float64(volume) / 127.0
	}
}

func (m *Mixer) SetChannelExpressionVolume(ch int, volume int) {
	if ch < len(m.Channels) {
		m.ExpressionVolume[ch] = float64(volume) / 127.0
	}
}

func (m *Mixer) SetChannelPanning(ch int, panning int) {
	if ch < len(m.Channels) {
		m.Panning[ch] = float64(panning) / 127.0
	}
}

func (m *Mixer) ToggleSoloChannel(ch int) {
	if ch < len(m.Channels) {
		m.Solo[ch] = !m.Solo[ch]
	}
}
