package midi

import (
	"fmt"
	"log"
	"math"
	"time"

	"github.com/bspaans/bs8bs/synth"
	"github.com/gomidi/rtmididrv/imported/rtmidi"
	"github.com/xlab/midievent"
)

type EventType int

const (
	NoteOn                     EventType = iota
	NoteOff                    EventType = iota
	SetChannelVolume           EventType = iota
	SetChannelExpressionVolume EventType = iota
	SetChannelPanning          EventType = iota
	SetReverb                  EventType = iota
	SetTremelo                 EventType = iota
	SetChorus                  EventType = iota
	SetDetuneEffect            EventType = iota
	SetPhaser                  EventType = iota
	ProgramChange              EventType = iota
	SilenceChannel             EventType = iota
	PitchBend                  EventType = iota
)

func (s EventType) String() string {
	if s == NoteOn {
		return "Note on"
	} else if s == NoteOff {
		return "Note off"
	} else if s == SetReverb {
		return "Set reverb"
	} else if s == SetTremelo {
		return "Set tremelo"
	} else if s == SetChorus {
		return "Set chorus"
	} else if s == SetDetuneEffect {
		return "Set detune effect"
	} else if s == SetPhaser {
		return "Set phaser"
	} else if s == ProgramChange {
		return "Program change"
	} else if s == SilenceChannel {
		return "Silence channel"
	} else if s == PitchBend {
		return "Pitch bend"
	} else if s == SetChannelVolume {
		return "Set channel volume"
	} else if s == SetChannelExpressionVolume {
		return "Set channel expression volume"
	} else if s == SetChannelPanning {
		return "Set channel panning"
	}
	return "Unknown event"
}

func Dispatch(s *synth.Synth, ev *midievent.Event, et EventType, value ...int) {
	ch, ok := midievent.ChanOf(*ev)
	if !ok {
		panic("Missing channel")
	}
	ch -= 1
	supported := false
	if et == NoteOn {
		velocity := float64(int(value[1])) / 127
		s.NoteOn(ch, value[0], velocity)
		supported = true
	} else if et == NoteOff {
		s.NoteOff(ch, value[0])
		supported = true
	} else if et == SetReverb {
		s.SetReverb(ch, value[0])
		supported = true
	} else if et == ProgramChange {
		s.ChangeInstrument(ch, value[0])
		supported = true
	} else if et == SilenceChannel {
		s.SilenceChannel(ch)
		supported = true
	} else if et == SetChannelVolume {
		s.SetChannelVolume(ch, value[0])
		supported = true
	} else if et == SetChannelExpressionVolume {
		s.SetChannelExpressionVolume(ch, value[0])
		supported = true
	} else if et == PitchBend {
		semitones := float64(value[0]-64) / 64.0 // -1.0 <-> 1.0
		semitones *= (64 / 5)
		pitchbendFactor := math.Pow(2, semitones/12)
		s.SetPitchbend(ch, pitchbendFactor)
		supported = true
	}

	if !supported || false { // switch to true for debug mode
		if len(value) == 0 {
			fmt.Println(et, "on channel", ch)
		} else {
			fmt.Println(et, "on channel", ch, value)
		}
	}
}

func StartVirtualMIDIDevice(s *synth.Synth) {

	time.Sleep(time.Second)
	var api rtmidi.API
	for _, a := range rtmidi.CompiledAPI() {
		api = a
	}
	in, err := rtmidi.NewMIDIIn(api, "bs8bs", 1024)
	if err != nil {
		panic(err)
	}
	defer in.Destroy()
	if err := in.OpenVirtualPort("bs8bs"); err != nil {
		panic(err)
	}
	defer in.Close()
	fmt.Println("Waiting for MIDI messages.")
	for {
		msg, timeDelta, err := in.Message()
		if len(msg) > 0 {
			ev := midievent.Event(msg[0])
			if midievent.IsNoteOn(ev) {
				Dispatch(s, &ev, NoteOn, int(msg[1]), int(msg[2]))
			} else if midievent.IsNoteOff(ev) {
				Dispatch(s, &ev, NoteOff, int(msg[1]))
			} else if ev >= midievent.Chan1ControlModeChangeEvent && ev <= midievent.Chan16ControlModeChangeEvent {
				ctrl := midievent.Control(msg[1])
				if ctrl == midievent.ChannelVolumeMSB {
					Dispatch(s, &ev, SetChannelVolume, int(msg[2]))
				} else if ctrl == midievent.PanMSB {
					Dispatch(s, &ev, SetChannelPanning, int(msg[2]))
				} else if ctrl == midievent.ExpressionControllerMSB {
					Dispatch(s, &ev, SetChannelExpressionVolume, int(msg[2]))
				} else if ctrl == midievent.Effects1Depth {
					Dispatch(s, &ev, SetReverb, int(msg[2]))
				} else if ctrl == midievent.Effects2Depth {
					Dispatch(s, &ev, SetTremelo, int(msg[2]))
				} else if ctrl == midievent.Effects3Depth {
					Dispatch(s, &ev, SetChorus, int(msg[2]))
				} else if ctrl == midievent.Effects4Depth {
					Dispatch(s, &ev, SetDetuneEffect, int(msg[2]))
				} else if ctrl == midievent.Effects5Depth {
					Dispatch(s, &ev, SetPhaser, int(msg[2]))
				} else if ctrl == midievent.AllNotesOff {
					Dispatch(s, &ev, SilenceChannel)
				} else {
					fmt.Printf("UNSUPPORTED CONTROL MODE CHANGE %x %x\n", msg[1], msg)
				}
			} else if ev >= midievent.Chan1PitchWheelRangeEvent && ev <= midievent.Chan16PitchWheelRangeEvent {
				Dispatch(s, &ev, PitchBend, int(msg[2]))
			} else if ev >= midievent.Chan1ProgramChangeEvent && ev <= midievent.Chan16ProgramChangeEvent {
				Dispatch(s, &ev, ProgramChange, int(msg[1]))
			} else {
				log.Println(msg, timeDelta, err)
			}
		}
	}
}
