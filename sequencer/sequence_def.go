package sequencer

import (
	"fmt"
	"io/ioutil"

	"gopkg.in/yaml.v2"
)

func WrapError(in string, err error) error {
	return fmt.Errorf("%s > %s", in, err.Error())
}

type RangeDef struct {
	From int
	To   int
}

type AutomationDef struct {
	BackAndForth *[]int    `yaml:"back_and_forth"`
	Cycle        *[]int    `yaml:"cycle"`
	Range        *RangeDef `yaml:"range"`
}

func (a *AutomationDef) GetAutomation() (IntAutomation, error) {
	if a.BackAndForth != nil {
		return IntBackAndForthAutomation(*a.BackAndForth), nil
	} else if a.Cycle != nil {
		return IntCycleAutomation(*a.Cycle), nil
	} else if a.Range != nil {
		return IntRangeAutomation(a.Range.From, a.Range.To), nil
	}
	return nil, fmt.Errorf("Missing automation")
}

type CycleChordsDef struct {
	Every  interface{} `yaml:"every"`
	Chords [][]int     `yaml:"chords"`
}

func (c *CycleChordsDef) GetAutomation(seq *Sequencer) (IntArrayAutomation, error) {
	duration, err := parseDuration(c.Every, seq)
	if err != nil {
		return nil, WrapError("cycle_chords", err)
	}
	return ChordCycleArrayAutomation(int(duration), c.Chords), nil
}

type ArrayAutomationDef struct {
	CycleChords *CycleChordsDef `yaml:"cycle_chords"`
}

func (a *ArrayAutomationDef) GetAutomation(seq *Sequencer) (IntArrayAutomation, error) {
	if a.CycleChords != nil {
		return a.CycleChords.GetAutomation(seq)
	}
	return nil, fmt.Errorf("Missing array automation")
}

type RepeatDef struct {
	Every    interface{}
	Sequence *SequenceDef
}

func (e *RepeatDef) GetSequence(seq *Sequencer) (Sequence, error) {
	duration, err := parseDuration(e.Every, seq)
	if err != nil {
		return nil, WrapError("repeat", err)
	}
	s, err := e.Sequence.GetSequence(seq)
	if err != nil {
		return nil, WrapError("repeat", err)
	}
	return Every(duration, s), nil
}

type PlayNoteEveryDef struct {
	Note               int            `yaml:"note"`
	NoteAutomation     *AutomationDef `yaml:"auto_note"`
	Channel            int            `yaml:"channel"`
	Velocity           int            `yaml:"velocity"`
	VelocityAutomation *AutomationDef `yaml:"auto_velocity"`
	Duration           interface{}    `yaml:"duration"`
	Every              interface{}    `yaml:"every"`
}

func (e *PlayNoteEveryDef) GetSequence(seq *Sequencer) (Sequence, error) {
	every, err := parseDuration(e.Every, seq)
	if err != nil {
		return nil, WrapError("play_note", err)
	}
	duration, err := parseDuration(e.Duration, seq)
	if err != nil {
		return nil, WrapError("play_note", err)
	}
	noteF := IntIdAutomation(e.Note)
	if e.NoteAutomation != nil {
		noteF_, err := e.NoteAutomation.GetAutomation()
		if err != nil {
			return nil, WrapError("play_note > auto_note", err)
		}
		noteF = noteF_
	}
	velocityF := IntIdAutomation(e.Velocity)
	if e.VelocityAutomation != nil {
		velocityF_, err := e.VelocityAutomation.GetAutomation()
		if err != nil {
			return nil, WrapError("play_note > auto_velocity", err)
		}
		velocityF = velocityF_
	}
	return PlayNoteEveryAutomation(every, duration, e.Channel, noteF, velocityF), nil
}

type PlayNotesEveryDef struct {
	Notes              []int               `yaml:"notes"`
	NotesAutomation    *ArrayAutomationDef `yaml:"auto_notes"`
	Channel            int                 `yaml:"channel"`
	Velocity           int                 `yaml:"velocity"`
	VelocityAutomation *AutomationDef      `yaml:"auto_velocity"`
	Duration           interface{}         `yaml:"duration"`
	Every              interface{}         `yaml:"every"`
}

func (e *PlayNotesEveryDef) GetSequence(seq *Sequencer) (Sequence, error) {
	every, err := parseDuration(e.Every, seq)
	if err != nil {
		return nil, WrapError("play_notes", err)
	}
	duration, err := parseDuration(e.Duration, seq)
	if err != nil {
		return nil, WrapError("play_notes", err)
	}
	notesF := IntArrayIdAutomation(e.Notes)
	if e.NotesAutomation != nil {
		notesF_, err := e.NotesAutomation.GetAutomation(seq)
		if err != nil {
			return nil, WrapError("play_notes > auto_notes", err)
		}
		notesF = notesF_
	}
	velocityF := IntIdAutomation(e.Velocity)
	if e.VelocityAutomation != nil {
		velocityF_, err := e.VelocityAutomation.GetAutomation()
		if err != nil {
			return nil, WrapError("play_note > auto_velocity", err)
		}
		velocityF = velocityF_
	}
	return PlayNotesEveryAutomation(every, duration, e.Channel, notesF, velocityF), nil
}

type PanningDef struct {
	Channel           int
	PanningAutomation AutomationDef `yaml:",inline"`
}

func (p *PanningDef) GetSequence(seq *Sequencer) (Sequence, error) {
	panningF, err := p.PanningAutomation.GetAutomation()
	if err != nil {
		return nil, WrapError("panning", err)
	}
	return PanningAutomation(p.Channel, panningF), nil
}

type AfterDef struct {
	After    interface{} `yaml:"after"`
	Sequence SequenceDef `yaml:"sequence"`
}

func (e *AfterDef) GetSequence(seq *Sequencer) (Sequence, error) {
	duration, err := parseDuration(e.After, seq)
	if err != nil {
		return nil, WrapError("after", err)
	}
	s, err := e.Sequence.GetSequence(seq)
	if err != nil {
		return nil, WrapError("after", err)
	}
	return After(duration, s), nil
}

type OffsetDef struct {
	Offset   interface{} `yaml:"offset"`
	Sequence SequenceDef `yaml:"sequence"`
}

func (e *OffsetDef) GetSequence(seq *Sequencer) (Sequence, error) {
	duration, err := parseDuration(e.Offset, seq)
	if err != nil {
		return nil, WrapError("offset", err)
	}
	s, err := e.Sequence.GetSequence(seq)
	if err != nil {
		return nil, WrapError("offset", err)
	}
	return Offset(duration, s), nil
}

type SequenceDef struct {
	Every          *RepeatDef         `yaml:"repeat"`
	PlayNoteEvery  *PlayNoteEveryDef  `yaml:"play_note"`
	PlayNotesEvery *PlayNotesEveryDef `yaml:"play_notes"`
	Panning        *PanningDef        `yaml:"panning"`
	After          *AfterDef          `yaml:"after"`
	Offset         *OffsetDef         `yaml:"offset"`
}

func (e *SequenceDef) GetSequence(seq *Sequencer) (Sequence, error) {
	if e.Every != nil {
		return e.Every.GetSequence(seq)
	} else if e.PlayNoteEvery != nil {
		return e.PlayNoteEvery.GetSequence(seq)
	} else if e.PlayNotesEvery != nil {
		return e.PlayNotesEvery.GetSequence(seq)
	} else if e.Panning != nil {
		return e.Panning.GetSequence(seq)
	} else if e.After != nil {
		return e.After.GetSequence(seq)
	} else if e.Offset != nil {
		return e.Offset.GetSequence(seq)
	}
	return nil, WrapError("sequence", fmt.Errorf("Missing sequence"))
}

func parseDuration(d interface{}, seq *Sequencer) (uint, error) {
	switch d.(type) {
	case string:
		v := d.(string)
		if v == "Half" {
			return Half(seq), nil
		} else if v == "Quarter" {
			return Quarter(seq), nil
		} else if v == "Eight" {
			return Eight(seq), nil
		} else if v == "Sixteenth" {
			return Sixteenth(seq), nil
		} else if v == "Thirtysecond" {
			return Thirtysecond(seq), nil
		}
	case int:
		return uint(d.(int) * seq.Granularity), nil
	}
	return 0, fmt.Errorf("Unknown duration type '%v'", d)
}

type SequencerDef struct {
	Sequences []SequenceDef `yaml:"sequences"`
}

func (s *SequencerDef) GetSequences(seq *Sequencer) ([]Sequence, error) {
	sequences := []Sequence{}
	for i, se := range s.Sequences {
		sequence, err := se.GetSequence(seq)
		if err != nil {
			return nil, WrapError(fmt.Sprintf("sequence [%d]", i), err)
		}
		sequences = append(sequences, sequence)
	}
	return sequences, nil
}

func NewSequencerDefFromFile(file string) (*SequencerDef, error) {
	contents, err := ioutil.ReadFile(file)
	if err != nil {
		return nil, err
	}
	result := SequencerDef{}
	if err := yaml.Unmarshal(contents, &result); err != nil {
		return nil, err
	}
	if len(result.Sequences) == 0 {
		return nil, fmt.Errorf("No sequences in sequencer def %s", file)
	}
	return &result, nil
}
