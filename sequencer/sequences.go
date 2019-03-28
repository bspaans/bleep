package sequencer

import (
	"github.com/bspaans/bleep/synth"
	"github.com/bspaans/bleep/theory"
)

func Every(n uint, seq Sequence) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		if t%n == 0 {
			seq(t/n, t, s)
		}
	}
}

func EuclidianRhythm(n, over int, tickDuration uint, seq Sequence) Sequence {
	rhythm := theory.EuclidianRhythm(n, over)
	length := uint(over) * tickDuration
	return func(counter, t uint, s chan *synth.Event) {
		ix := (t % length) / tickDuration
		if rhythm[ix] {
			seq(t/uint(n), t, s)
		}
	}
}

func EveryWithOffset(n, offset uint, seq Sequence) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		if t < offset {
			return
		}
		if (t-offset)%n == 0 {
			seq((t-offset)/n, t, s)
		}
	}
}

func Combine(seqs ...Sequence) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		for _, seq := range seqs {
			seq(counter, t, s)
		}
	}
}

func Offset(offset uint, seq Sequence) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		if t >= offset {
			seq(t-offset, t-offset, s)
		}
	}
}

func After(a uint, seq Sequence) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		if t >= a {
			seq(t-a, t-a, s)
		}
	}
}

func Before(b uint, seq Sequence) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		if t < b {
			seq(counter, t, s)
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
	return func(counter, t uint, s chan *synth.Event) {
		notes := noteF(counter, t)
		velocity := velocityF(counter, t)
		for i := 0; i < len(notes); i++ {
			note := notes[i]
			NoteOn(channel, note, velocity)(counter, t, s)
		}
	}
}
func NotesOffAutomation(channel int, noteF IntArrayAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		notes := noteF(counter, t)
		for i := 0; i < len(notes); i++ {
			note := notes[i]
			NoteOff(channel, note)(counter, t, s)
		}
	}
}

func NoteOff(channel, note int) Sequence {
	return NoteOffAutomation(
		channel,
		IntIdAutomation(note),
	)
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
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.NoteOn, channel, []int{noteF(counter, t), velocityF(counter, t)})
	}
}

func NoteOffAutomation(channel int, noteF IntAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.NoteOff, channel, []int{noteF(counter, t)})
	}
}

func PanningAutomation(channel int, panningF IntAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.SetChannelPanning, channel, []int{panningF(counter, t)})
	}
}

func ReverbAutomation(channel int, reverbF IntAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.SetReverb, channel, []int{reverbF(counter, t)})
	}
}

func ReverbTimeAutomation(channel int, reverbF FloatAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewFloatEvent(synth.SetReverbTime, channel, []float64{reverbF(counter, t)})
	}
}

func LPF_CutoffAutomation(channel int, cutoffF IntAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.SetLPFCutoff, channel, []int{cutoffF(counter, t)})
	}
}

func HPF_CutoffAutomation(channel int, cutoffF IntAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.SetHPFCutoff, channel, []int{cutoffF(counter, t)})
	}
}

func ChannelVolumeAutomation(channel int, volumeF IntAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.SetChannelVolume, channel, []int{volumeF(counter, t)})
	}
}

func TremeloAutomation(channel int, tremeloF IntAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.SetTremelo, channel, []int{tremeloF(counter, t)})
	}
}

func GrainSizeAutomation(channel int, sizeF FloatAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewFloatEvent(synth.SetGrainSize, channel, []float64{sizeF(counter, t)})
	}
}

func GrainBirthRateAutomation(channel int, sizeF FloatAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewFloatEvent(synth.SetGrainBirthRate, channel, []float64{sizeF(counter, t)})
	}
}

func GrainSpreadAutomation(channel int, sizeF FloatAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewFloatEvent(synth.SetGrainSpread, channel, []float64{sizeF(counter, t)})
	}
}

func GrainSpeedAutomation(channel int, sizeF FloatAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewFloatEvent(synth.SetGrainSpeed, channel, []float64{sizeF(counter, t)})
	}
}
