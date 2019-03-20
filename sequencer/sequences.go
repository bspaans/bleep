package sequencer

import (
	"github.com/bspaans/bs8bs/synth"
)

func Every(n uint, seq Sequence) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		if t%n == 0 {
			seq(t/n, t, s)
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
		seq(counter, t+offset, s)
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
			IntNegativeOffsetAutomation(duration+1, noteF)),
		),
	)
}

func PlayNotesEveryAutomation(n uint, duration uint, channel int, noteF IntArrayAutomation, velocityF IntAutomation) Sequence {
	return Combine(
		Every(n, NotesOnAutomation(channel, noteF, velocityF)),
		EveryWithOffset(n, duration+1, NotesOffAutomation(
			channel,
			IntArrayNegativeOffsetAutomation(duration+1, noteF)),
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

func ReverbTimeAutomation(channel int, reverbF IntAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.SetReverbTime, channel, []int{reverbF(counter, t)})
	}
}

func TremeloAutomation(channel int, tremeloF IntAutomation) Sequence {
	return func(counter, t uint, s chan *synth.Event) {
		s <- synth.NewEvent(synth.SetTremelo, channel, []int{tremeloF(counter, t)})
	}
}
