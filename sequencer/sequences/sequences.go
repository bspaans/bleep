package sequences

import (
	. "github.com/bspaans/bleep/sequencer/automations"
	. "github.com/bspaans/bleep/sequencer/status"
	"github.com/bspaans/bleep/synth"
	"github.com/bspaans/bleep/theory"
)

type Sequence func(seq *Status, counter, t uint, s chan *synth.Event)

func Every(n uint, seq Sequence) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		if t%n == 0 {
			seq(status, t/n, t, s)
		}
	}
}

func EuclidianRhythm(n, over int, tickDuration uint, seq Sequence) Sequence {
	rhythm := theory.EuclidianRhythm(n, over)
	length := uint(over) * tickDuration
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		ix := (t % length) / tickDuration
		if rhythm[ix] {
			seq(status, counter, t, s)
		}
	}
}

func EveryWithOffset(n, offset uint, seq Sequence) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		if t < offset {
			return
		}
		if (t-offset)%n == 0 {
			seq(status, (t-offset)/n, t, s)
		}
	}
}

func Combine(seqs ...Sequence) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		for _, seq := range seqs {
			seq(status, counter, t, s)
		}
	}
}

func Offset(offset uint, seq Sequence) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		if t >= offset {
			seq(status, t-offset, t-offset, s)
		}
	}
}

func After(a uint, seq Sequence) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		if t >= a {
			seq(status, t-a, t-a, s)
		}
	}
}

func Before(b uint, seq Sequence) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		if t < b {
			seq(status, counter, t, s)
		}
	}
}

func NoteOn(channel, note, velocity int) Sequence {
	return NoteOnAutomation(
		channel,
		IntIdAutomation(note),
		IntIdAutomation(velocity),
	)
}

func NotesOnAutomation(channel int, noteF IntArrayAutomation, velocityF IntAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		notes := noteF(status, counter, t)
		velocity := velocityF(status, counter, t)
		for i := 0; i < len(notes); i++ {
			note := notes[i]
			NoteOn(channel, note, velocity)(status, counter, t, s)
		}
	}
}
func NotesOffAutomation(channel int, noteF IntArrayAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		notes := noteF(status, counter, t)
		for i := 0; i < len(notes); i++ {
			note := notes[i]
			NoteOff(channel, note)(status, counter, t, s)
		}
	}
}

func NoteOff(channel, note int) Sequence {
	return NoteOffAutomation(
		channel,
		IntIdAutomation(note),
	)
}

func PlayNote(duration uint, channel, note, velocity int) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		NoteOn(channel, note, velocity)(status, counter, t, s)
		ev := synth.NewEvent(synth.NoteOff, channel, []int{note})
		status.ScheduleEvent(t, duration, ev)
	}
}
func PlayNoteAutomation(duration uint, channel int, noteF IntAutomation, velocityF IntAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		note := noteF(status, counter, t)
		vel := velocityF(status, counter, t)
		NoteOn(channel, note, vel)(status, counter, t, s)
		ev := synth.NewEvent(synth.NoteOff, channel, []int{note})
		status.ScheduleEvent(t, duration, ev)
	}
}
func PlayNotesAutomation(duration uint, channel int, noteF IntArrayAutomation, velocityF IntAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		NotesOnAutomation(channel, noteF, velocityF)(status, counter, t, s)
		for _, note := range noteF(status, counter, t) {
			ev := synth.NewEvent(synth.NoteOff, channel, []int{note})
			status.ScheduleEvent(t, duration, ev)
		}
	}
}

func PlayNoteEvery(n uint, duration uint, channel, note, velocity int) Sequence {
	return Combine(
		Every(n, NoteOn(channel, note, velocity)),
		EveryWithOffset(n, duration, NoteOff(channel, note)),
	)
}

func PlayNoteEveryAutomation(n uint, duration uint, channel int, noteF IntAutomation, velocityF IntAutomation) Sequence {
	return Combine(
		Every(n, NoteOnAutomation(channel, noteF, velocityF)),
		EveryWithOffset(n, duration-1, NoteOffAutomation(
			channel,
			noteF,
		),
		),
	)
}

func PlayNotesEveryAutomation(n uint, duration uint, channel int, noteF IntArrayAutomation, velocityF IntAutomation) Sequence {
	return Combine(
		Every(n, NotesOnAutomation(channel, noteF, velocityF)),
		EveryWithOffset(n, duration-1, NotesOffAutomation(
			channel,
			noteF,
		),
		),
	)
}

func NoteOnAutomation(channel int, noteF, velocityF IntAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.NoteOn, channel, []int{noteF(status, counter, t), velocityF(status, counter, t)})
	}
}

func NoteOffAutomation(channel int, noteF IntAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.NoteOff, channel, []int{noteF(status, counter, t)})
	}
}

func PanningAutomation(channel int, panningF IntAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.SetChannelPanning, channel, []int{panningF(status, counter, t)})
	}
}

func ReverbAutomation(channel int, reverbF IntAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.SetReverb, channel, []int{reverbF(status, counter, t)})
	}
}

func ReverbTimeAutomation(channel int, reverbF FloatAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		s <- synth.NewFloatEvent(synth.SetReverbTime, channel, []float64{reverbF(status, counter, t)})
	}
}

func LPF_CutoffAutomation(channel int, cutoffF IntAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.SetLPFCutoff, channel, []int{cutoffF(status, counter, t)})
	}
}

func HPF_CutoffAutomation(channel int, cutoffF IntAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.SetHPFCutoff, channel, []int{cutoffF(status, counter, t)})
	}
}

func ChannelVolumeAutomation(channel int, volumeF IntAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.SetChannelVolume, channel, []int{volumeF(status, counter, t)})
	}
}

func TremeloAutomation(channel int, tremeloF IntAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.SetTremelo, channel, []int{tremeloF(status, counter, t)})
	}
}

func GrainSizeAutomation(channel int, sizeF FloatAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		s <- synth.NewFloatEvent(synth.SetGrainSize, channel, []float64{sizeF(status, counter, t)})
	}
}

func GrainBirthRateAutomation(channel int, sizeF FloatAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		s <- synth.NewFloatEvent(synth.SetGrainBirthRate, channel, []float64{sizeF(status, counter, t)})
	}
}

func GrainSpreadAutomation(channel int, sizeF FloatAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		s <- synth.NewFloatEvent(synth.SetGrainSpread, channel, []float64{sizeF(status, counter, t)})
	}
}

func GrainSpeedAutomation(channel int, sizeF FloatAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		s <- synth.NewFloatEvent(synth.SetGrainSpeed, channel, []float64{sizeF(status, counter, t)})
	}
}

func SetIntRegisterAutomation(register int, valueF IntAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		status.IntRegisters[register] = valueF(status, counter, t)
	}
}
func SetFloatRegisterAutomation(register int, valueF FloatAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		status.FloatRegisters[register] = valueF(status, counter, t)
	}
}
func SetIntArrayRegisterAutomation(register int, valueF IntArrayAutomation) Sequence {
	return func(status *Status, counter, t uint, s chan *synth.Event) {
		status.IntArrayRegisters[register] = valueF(status, counter, t)
	}
}
