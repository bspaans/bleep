package sequences

import (
	"fmt"

	"github.com/bspaans/bleep/midi"
	. "github.com/bspaans/bleep/sequencer/status"
	"github.com/bspaans/bleep/synth"
	"gitlab.com/gomidi/midi/midimessage/channel"
)

func MidiSequence(mid *midi.MIDISequences, inputChannels, outputChannels []int, speed float64, loop bool) Sequence {
	inputCh := map[int]bool{}
	for _, i := range inputChannels {
		inputCh[i] = true
	}
	sendEvent := func(s chan *synth.Event, fromChannel int, ty synth.EventType, params []int) {
		if len(outputChannels) == 0 {
			s <- synth.NewEvent(ty, fromChannel, params)
		} else {
			for _, o := range outputChannels {
				s <- synth.NewEvent(ty, o, params)
			}
		}
	}
	if speed == 0.0 {
		speed = 1.0
	}
	return func(sequencer *Status, counter, t uint, s chan *synth.Event) {

		tickRatio := float64(mid.TimeFormat) / float64(sequencer.Granularity)
		length := mid.Length

		timeInTrack := int(float64(t) * tickRatio * speed)
		for channelNr, ch := range mid.Channels {
			if ch == nil {
				continue
			}
			if len(inputChannels) != 0 && !inputCh[channelNr] {
				continue
			}
			for _, ev := range ch.Events {
				if ev.Offset == timeInTrack || (loop && timeInTrack >= length && ((timeInTrack%length) == ev.Offset || ((timeInTrack%length) == 0 && ev.Offset == length))) {
					switch ev.Message.(type) {
					case channel.NoteOn:
						n := ev.Message.(channel.NoteOn)
						sendEvent(s, channelNr, synth.NoteOn, []int{int(n.Key()), int(n.Velocity())})
					case channel.NoteOff:
						n := ev.Message.(channel.NoteOff)
						sendEvent(s, channelNr, synth.NoteOff, []int{int(n.Key())})
					case channel.NoteOffVelocity:
						n := ev.Message.(channel.NoteOffVelocity)
						sendEvent(s, channelNr, synth.NoteOff, []int{int(n.Key()), int(n.Velocity())})
					default:
						fmt.Println("Do something", ev.Message)
					}
				}
			}
		}
	}
}
