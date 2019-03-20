package midi

import (
	"fmt"
	"log"
	"time"

	"github.com/bspaans/bs8bs/synth"
	"github.com/gomidi/rtmididrv/imported/rtmidi"
	"github.com/xlab/midievent"
)

func Dispatch(s chan *synth.Event, ev *midievent.Event, et synth.EventType, value ...int) {
	ch, ok := midievent.ChanOf(*ev)
	if !ok {
		panic("Missing channel")
	}
	ch -= 1
	s <- synth.NewEvent(et, ch, value)
}

var started = false

func StartVirtualMIDIDevice(s chan *synth.Event) {
	if started {
		fmt.Println("MIDI device already started")
		return
	}
	started = true
	go startVirtualMIDIDevice(s)
}

func startVirtualMIDIDevice(s chan *synth.Event) {

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
				Dispatch(s, &ev, synth.NoteOn, int(msg[1]), int(msg[2]))
			} else if midievent.IsNoteOff(ev) {
				Dispatch(s, &ev, synth.NoteOff, int(msg[1]))
			} else if ev >= midievent.Chan1ControlModeChangeEvent && ev <= midievent.Chan16ControlModeChangeEvent {
				ctrl := midievent.Control(msg[1])
				if ctrl == midievent.ChannelVolumeMSB {
					Dispatch(s, &ev, synth.SetChannelVolume, int(msg[2]))
				} else if ctrl == midievent.PanMSB {
					Dispatch(s, &ev, synth.SetChannelPanning, int(msg[2]))
				} else if ctrl == midievent.ExpressionControllerMSB {
					Dispatch(s, &ev, synth.SetChannelExpressionVolume, int(msg[2]))
				} else if ctrl == midievent.Effects1Depth {
					Dispatch(s, &ev, synth.SetReverb, int(msg[2]))
				} else if ctrl == midievent.Effects2Depth {
					Dispatch(s, &ev, synth.SetTremelo, int(msg[2]))
				} else if ctrl == midievent.Effects3Depth {
					Dispatch(s, &ev, synth.SetChorus, int(msg[2]))
				} else if ctrl == midievent.Effects4Depth {
					Dispatch(s, &ev, synth.SetDetuneEffect, int(msg[2]))
				} else if ctrl == midievent.Effects5Depth {
					Dispatch(s, &ev, synth.SetPhaser, int(msg[2]))
				} else if ctrl == midievent.AllNotesOff {
					Dispatch(s, &ev, synth.SilenceChannel)
				} else {
					fmt.Printf("UNSUPPORTED CONTROL MODE CHANGE %x %x\n", msg[1], msg)
				}
			} else if ev >= midievent.Chan1PitchWheelRangeEvent && ev <= midievent.Chan16PitchWheelRangeEvent {
				Dispatch(s, &ev, synth.PitchBend, int(msg[2]))
			} else if ev >= midievent.Chan1ProgramChangeEvent && ev <= midievent.Chan16ProgramChangeEvent {
				Dispatch(s, &ev, synth.ProgramChange, int(msg[1]))
			} else {
				log.Println(msg, timeDelta, err)
			}
		}
	}
}
