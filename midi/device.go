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
				ch, ok := midievent.ChanOf(ev)
				if ok {
					ch -= 1
					velocity := float64(int(msg[2])) / 127
					//fmt.Println("NOTE ON", msg[1], velocity, ch)
					s.NoteOn(ch, int(msg[1]), velocity)
				}
			} else if midievent.IsNoteOff(ev) {
				ch, ok := midievent.ChanOf(ev)
				if ok {
					ch -= 1
					//fmt.Println("NOTE OFF", msg[1], ch)
					s.NoteOff(ch, int(msg[1]))
				}
			} else if ev >= midievent.Chan1ControlModeChangeEvent && ev <= midievent.Chan16ControlModeChangeEvent {
				ctrl := midievent.Control(msg[1])
				if ctrl == midievent.ChannelVolumeMSB {
					//fmt.Println("CHANNEL VOLUME", msg[2])
				} else if ctrl == midievent.PanMSB {
					//fmt.Println("CHANNEL PANNING", msg[2])
				} else if ctrl == midievent.ExpressionControllerMSB {
					//fmt.Println("EXPRESSION CONTROLLER", msg[2])
				} else if ctrl == midievent.Effects1Depth {
					//fmt.Println("REVERB", msg[2])
				} else if ctrl == midievent.Effects2Depth {
					//fmt.Println("TREMELO", msg[2])
				} else if ctrl == midievent.Effects3Depth {
					//fmt.Println("CHORUS", msg[2])
				} else if ctrl == midievent.Effects4Depth {
					//fmt.Println("DETUNE", msg[2])
				} else if ctrl == midievent.Effects5Depth {
					//fmt.Println("PHASER", msg[2])
				} else if ctrl == midievent.AllNotesOff {
					ch, _ := midievent.ChanOf(ev)
					ch -= 1
					//fmt.Println("ALL NOTES OFF", ch)
					s.SilenceChannel(ch)
				} else {
					//fmt.Printf("UNSUPPORTED CONTROL MODE CHANGE %x %x\n", msg[1], msg)
				}
			} else if ev >= midievent.Chan1PitchWheelRangeEvent && ev <= midievent.Chan16PitchWheelRangeEvent {
				ch, _ := midievent.ChanOf(ev)
				ch -= 1
				semitones := float64(int(msg[2])-64) / 64.0 // -1.0 <-> 1.0
				semitones *= (64 / 5)
				pitchbendFactor := math.Pow(2, semitones/12)
				//fmt.Println("PITCH WHEEL RANGE EVENT", ch, msg[1], msg[2], semitones, pitchbendFactor)
				s.SetPitchbend(ch, pitchbendFactor)
			} else if ev >= midievent.Chan1ProgramChangeEvent && ev <= midievent.Chan16ProgramChangeEvent {
				ch, ok := midievent.ChanOf(ev)
				if ok {
					ch -= 1
					fmt.Println("CHANGE INSTRUMENTS ", msg[1], ch)
					s.ChangeInstrument(ch, int(msg[1]))
				}
			} else {
				log.Println(msg, timeDelta, err)
			}
		}
	}
}
