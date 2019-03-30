package sequencer

import (
	"fmt"
	"io/ioutil"

	"github.com/bspaans/bleep/channels"
	"gopkg.in/yaml.v2"
)

func WrapError(in string, err error) error {
	return fmt.Errorf("%s > %s", in, err.Error())
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

type EuclidianDef struct {
	Pulses   int
	Over     int
	Duration interface{}
	Sequence *SequenceDef
}

func (e *EuclidianDef) GetSequence(seq *Sequencer) (Sequence, error) {
	s, err := e.Sequence.GetSequence(seq)
	if err != nil {
		return nil, WrapError("euclidian", err)
	}
	duration, err := parseDuration(e.Duration, seq)
	if err != nil {
		return nil, WrapError("euclidian", err)
	}
	return EuclidianRhythm(e.Pulses, e.Over, duration, s), nil
}

type PlayNoteEveryDef struct {
	Note               int            `yaml:"note"`
	NoteAutomation     *AutomationDef `yaml:"auto_note"`
	Channel            int            `yaml:"channel"`
	Velocity           int            `yaml:"velocity"`
	VelocityAutomation *AutomationDef `yaml:"auto_velocity"`
	Duration           interface{}    `yaml:"duration"`
	Every              interface{}    `yaml:"every"`
	Offset             interface{}    `yaml:"offset"`
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
	if e.NoteAutomation == nil && e.Note == 0.0 {
		return nil, WrapError("play_note", fmt.Errorf("missing note or auto_note"))
	}
	velocityF := IntIdAutomation(e.Velocity)
	if e.VelocityAutomation != nil {
		velocityF_, err := e.VelocityAutomation.GetAutomation()
		if err != nil {
			return nil, WrapError("play_note > auto_velocity", err)
		}
		velocityF = velocityF_
	}
	if e.VelocityAutomation == nil && e.Velocity == 0.0 {
		return nil, WrapError("play_note", fmt.Errorf("missing velocity or auto_velocity"))
	}
	result := PlayNoteEveryAutomation(every, duration, e.Channel, noteF, velocityF)
	if e.Offset != nil {
		offset, err := parseDuration(e.Offset, seq)
		if err != nil {
			return nil, WrapError("play_note > offset", err)
		}
		return Offset(offset, result), nil
	}
	return result, nil
}

type PlayNotesEveryDef struct {
	Notes              []int                  `yaml:"notes"`
	NotesAutomation    *IntArrayAutomationDef `yaml:"auto_notes"`
	Channel            int                    `yaml:"channel"`
	Velocity           int                    `yaml:"velocity"`
	VelocityAutomation *AutomationDef         `yaml:"auto_velocity"`
	Duration           interface{}            `yaml:"duration"`
	Every              interface{}            `yaml:"every"`
	Offset             interface{}            `yaml:"offset"`
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
	result := PlayNotesEveryAutomation(every, duration, e.Channel, notesF, velocityF)
	if e.Offset != nil {
		offset, err := parseDuration(e.Offset, seq)
		if err != nil {
			return nil, WrapError("play_note > offset", err)
		}
		return Offset(offset, result), nil
	}
	return result, nil
}

type ChannelAutomationDef struct {
	Channel    int
	Automation AutomationDef `yaml:",inline"`
}

func (p *ChannelAutomationDef) GetSequence(seq *Sequencer, automation func(int, IntAutomation) Sequence) (Sequence, error) {
	automationF, err := p.Automation.GetAutomation()
	if err != nil {
		return nil, err
	}
	return automation(p.Channel, automationF), nil
}

type FloatChannelAutomationDef struct {
	Channel    int
	Automation FloatAutomationDef `yaml:",inline"`
}

func (p *FloatChannelAutomationDef) GetSequence(seq *Sequencer, automation func(int, FloatAutomation) Sequence) (Sequence, error) {
	automationF, err := p.Automation.GetAutomation()
	if err != nil {
		return nil, err
	}
	return automation(p.Channel, automationF), nil
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

type BeforeDef struct {
	Before   interface{} `yaml:"before"`
	Sequence SequenceDef `yaml:"sequence"`
}

func (e *BeforeDef) GetSequence(seq *Sequencer) (Sequence, error) {
	duration, err := parseDuration(e.Before, seq)
	if err != nil {
		return nil, WrapError("before", err)
	}
	s, err := e.Sequence.GetSequence(seq)
	if err != nil {
		return nil, WrapError("before", err)
	}
	return Before(duration, s), nil
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

type RegisterDef struct {
	Register   int            `yaml:"register"`
	Value      int            `yaml:"value"`
	Automation *AutomationDef `yaml:"auto_value"`
}

func (e *RegisterDef) GetSequence(seq *Sequencer) (Sequence, error) {

	valueF := IntIdAutomation(e.Value)
	if e.Automation != nil {
		valueF_, err := e.Automation.GetAutomation()
		if err != nil {
			return nil, WrapError("register", err)
		}
		valueF = valueF_
	}
	return SetIntRegisterAutomation(e.Register, valueF), nil
}

type FloatRegisterDef struct {
	Register   int                 `yaml:"register"`
	Value      float64             `yaml:"value"`
	Automation *FloatAutomationDef `yaml:"auto_value"`
}

func (e *FloatRegisterDef) GetSequence(seq *Sequencer) (Sequence, error) {

	valueF := FloatIdAutomation(e.Value)
	if e.Automation != nil {
		valueF_, err := e.Automation.GetAutomation()
		if err != nil {
			return nil, WrapError("float_register", err)
		}
		valueF = valueF_
	}
	return SetFloatRegisterAutomation(e.Register, valueF), nil
}

type IntArrayRegisterDef struct {
	Register   int                    `yaml:"register"`
	Value      []int                  `yaml:"value"`
	Automation *IntArrayAutomationDef `yaml:"auto_values"`
}

func (e *IntArrayRegisterDef) GetSequence(seq *Sequencer) (Sequence, error) {

	valueF := IntArrayIdAutomation(e.Value)
	if e.Automation != nil {
		valueF_, err := e.Automation.GetAutomation(seq)
		if err != nil {
			return nil, WrapError("int_array_register", err)
		}
		valueF = valueF_
	}
	return SetIntArrayRegisterAutomation(e.Register, valueF), nil
}

type SequenceDef struct {
	Every          *RepeatDef                 `yaml:"repeat"`
	Euclidian      *EuclidianDef              `yaml:"euclidian"`
	PlayNoteEvery  *PlayNoteEveryDef          `yaml:"play_note"`
	PlayNotesEvery *PlayNotesEveryDef         `yaml:"play_notes"`
	Panning        *ChannelAutomationDef      `yaml:"panning"`
	Reverb         *ChannelAutomationDef      `yaml:"reverb"`
	ReverbTime     *FloatChannelAutomationDef `yaml:"reverb_time"`
	Tremelo        *ChannelAutomationDef      `yaml:"tremelo"`
	LPF_Cutoff     *ChannelAutomationDef      `yaml:"lpf_cutoff"`
	HPF_Cutoff     *ChannelAutomationDef      `yaml:"hpf_cutoff"`
	Volume         *ChannelAutomationDef      `yaml:"volume"`
	GrainSize      *FloatChannelAutomationDef `yaml:"grain_size"`
	GrainBirthRate *FloatChannelAutomationDef `yaml:"grain_birth_rate"`
	GrainSpread    *FloatChannelAutomationDef `yaml:"grain_spread"`
	GrainSpeed     *FloatChannelAutomationDef `yaml:"grain_speed"`
	After          *AfterDef                  `yaml:"after"`
	Before         *BeforeDef                 `yaml:"before"`
	Offset         *OffsetDef                 `yaml:"offset"`
	Register       *RegisterDef               `yaml:"register"`
	FloatRegister  *FloatRegisterDef          `yaml:"float_register"`
	ArrayRegister  *IntArrayRegisterDef       `yaml:"array_register"`
	Combine        []*SequenceDef             `yaml:"combine"`
}

func (e *SequenceDef) GetSequence(seq *Sequencer) (Sequence, error) {
	if e == nil {
		return nil, fmt.Errorf("Missing sequence")
	}
	if e.Every != nil {
		return e.Every.GetSequence(seq)
	} else if e.Euclidian != nil {
		return e.Euclidian.GetSequence(seq)
	} else if e.PlayNoteEvery != nil {
		return e.PlayNoteEvery.GetSequence(seq)
	} else if e.PlayNotesEvery != nil {
		return e.PlayNotesEvery.GetSequence(seq)
	} else if e.Panning != nil {
		s, err := e.Panning.GetSequence(seq, PanningAutomation)
		if err != nil {
			return nil, WrapError("panning", err)
		}
		return s, nil
	} else if e.Reverb != nil {
		s, err := e.Reverb.GetSequence(seq, ReverbAutomation)
		if err != nil {
			return nil, WrapError("reverb", err)
		}
		return s, nil
	} else if e.ReverbTime != nil {
		s, err := e.ReverbTime.GetSequence(seq, ReverbTimeAutomation)
		if err != nil {
			return nil, WrapError("reverb_time", err)
		}
		return s, nil
	} else if e.LPF_Cutoff != nil {
		s, err := e.LPF_Cutoff.GetSequence(seq, LPF_CutoffAutomation)
		if err != nil {
			return nil, WrapError("lpf_cutoff", err)
		}
		return s, nil
	} else if e.HPF_Cutoff != nil {
		s, err := e.HPF_Cutoff.GetSequence(seq, HPF_CutoffAutomation)
		if err != nil {
			return nil, WrapError("lpf_cutoff", err)
		}
		return s, nil
	} else if e.Tremelo != nil {
		s, err := e.Tremelo.GetSequence(seq, TremeloAutomation)
		if err != nil {
			return nil, WrapError("tremelo", err)
		}
		return s, nil
	} else if e.Volume != nil {
		s, err := e.Volume.GetSequence(seq, ChannelVolumeAutomation)
		if err != nil {
			return nil, WrapError("volume", err)
		}
		return s, nil
	} else if e.GrainSize != nil {
		s, err := e.GrainSize.GetSequence(seq, GrainSizeAutomation)
		if err != nil {
			return nil, WrapError("grain_size", err)
		}
		return s, nil
	} else if e.GrainBirthRate != nil {
		s, err := e.GrainBirthRate.GetSequence(seq, GrainBirthRateAutomation)
		if err != nil {
			return nil, WrapError("grain_birth_rate", err)
		}
		return s, nil
	} else if e.GrainSpread != nil {
		s, err := e.GrainSpread.GetSequence(seq, GrainSpreadAutomation)
		if err != nil {
			return nil, WrapError("grain_spread", err)
		}
		return s, nil
	} else if e.GrainSpeed != nil {
		s, err := e.GrainSpeed.GetSequence(seq, GrainSpeedAutomation)
		if err != nil {
			return nil, WrapError("grain_speed", err)
		}
		return s, nil
	} else if e.Register != nil {
		s, err := e.Register.GetSequence(seq)
		if err != nil {
			return nil, WrapError("register", err)
		}
		return s, nil
	} else if e.FloatRegister != nil {
		s, err := e.FloatRegister.GetSequence(seq)
		if err != nil {
			return nil, WrapError("float_register", err)
		}
		return s, nil
	} else if e.ArrayRegister != nil {
		s, err := e.ArrayRegister.GetSequence(seq)
		if err != nil {
			return nil, WrapError("array_register", err)
		}
		return s, nil
	} else if e.After != nil {
		return e.After.GetSequence(seq)
	} else if e.Before != nil {
		return e.Before.GetSequence(seq)
	} else if e.Offset != nil {
		return e.Offset.GetSequence(seq)
	} else if e.Combine != nil {
		sequences := []Sequence{}
		for _, s := range e.Combine {
			s_, err := s.GetSequence(seq)
			if err != nil {
				return nil, WrapError("combine", err)
			}
			sequences = append(sequences, s_)
		}
		return Combine(sequences...), nil
	}
	return nil, WrapError("sequence", fmt.Errorf("Missing sequence"))
}

func parseDuration(d interface{}, seq *Sequencer) (uint, error) {
	switch d.(type) {
	case string:
		v := d.(string)
		if v == "Whole" {
			return Whole(seq), nil
		} else if v == "Half" {
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
	case float64:
		return uint(d.(float64) * float64(seq.Granularity)), nil
	}
	return 0, fmt.Errorf("Unknown duration type '%v'", d)
}

type SequencerDef struct {
	BPM         float64              `yaml:"bpm"`
	Granularity int                  `yaml:"granularity"`
	Channels    channels.ChannelsDef `yaml:",inline"`
	Sequences   []SequenceDef        `yaml:"sequences"`
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
