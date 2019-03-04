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
	NoteOn         EventType = iota
	NoteOff        EventType = iota
	SetReverb      EventType = iota
	ProgramChange  EventType = iota
	SilenceChannel EventType = iota
	PitchBend      EventType = iota
)

func (s EventType) String() string {
	if s == NoteOn {
		return "Note on"
	} else if s == NoteOff {
		return "Note off"
	} else if s == SetReverb {
		return "Set reverb"
	} else if s == ProgramChange {
		return "Program change"
	} else if s == SilenceChannel {
		return "Silence channel"
	} else if s == PitchBend {
		return "Pitch bend"
	}
	return "Unknown event"
}

func Dispatch(s *synth.Synth, ev *midievent.Event, et EventType, value ...int) {
	ch, ok := midievent.ChanOf(*ev)
	if !ok {
		panic("Missing channel")
	}
	ch -= 1
	if len(value) == 0 {
		fmt.Println(et, "on channel", ch)
	} else {
		fmt.Println(et, "on channel", ch, value)
	}
	if et == NoteOn {
		velocity := float64(int(value[1])) / 127
		s.NoteOn(ch, value[0], velocity)
	} else if et == NoteOff {
		s.NoteOff(ch, value[0])
	} else if et == SetReverb {
		s.SetReverb(ch, value[0])
	} else if et == ProgramChange {
		s.ChangeInstrument(ch, value[0])
	} else if et == SilenceChannel {
		s.SilenceChannel(ch)
	} else if et == PitchBend {
		semitones := float64(value[0]-64) / 64.0 // -1.0 <-> 1.0
		semitones *= (64 / 5)
		pitchbendFactor := math.Pow(2, semitones/12)
		s.SetPitchbend(ch, pitchbendFactor)
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
					//fmt.Println("CHANNEL VOLUME", msg[2])
				} else if ctrl == midievent.PanMSB {
					//fmt.Println("CHANNEL PANNING", msg[2])
				} else if ctrl == midievent.ExpressionControllerMSB {
					//fmt.Println("EXPRESSION CONTROLLER", msg[2])
				} else if ctrl == midievent.Effects1Depth {
					Dispatch(s, &ev, SetReverb, int(msg[2]))
				} else if ctrl == midievent.Effects2Depth {
					//fmt.Println("TREMELO", msg[2])
				} else if ctrl == midievent.Effects3Depth {
					//fmt.Println("CHORUS", msg[2])
				} else if ctrl == midievent.Effects4Depth {
					//fmt.Println("DETUNE", msg[2])
				} else if ctrl == midievent.Effects5Depth {
					//fmt.Println("PHASER", msg[2])
				} else if ctrl == midievent.AllNotesOff {
					Dispatch(s, &ev, SilenceChannel)
				} else {
					//fmt.Printf("UNSUPPORTED CONTROL MODE CHANGE %x %x\n", msg[1], msg)
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
