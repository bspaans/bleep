package definitions

import (
	"fmt"

	. "github.com/bspaans/bleep/sequencer/sequences"
	"github.com/bspaans/bleep/util"
)

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
	MIDI           *MIDISequencesDef          `yaml:"midi"`
	Combine        []*SequenceDef             `yaml:"combine"`
}

func (e *SequenceDef) GetSequence(granularity int) (Sequence, error) {
	if e == nil {
		return nil, fmt.Errorf("Missing sequence")
	}
	if e.Every != nil {
		return e.Every.GetSequence(granularity)
	} else if e.Euclidian != nil {
		return e.Euclidian.GetSequence(granularity)
	} else if e.PlayNoteEvery != nil {
		return e.PlayNoteEvery.GetSequence(granularity)
	} else if e.PlayNotesEvery != nil {
		return e.PlayNotesEvery.GetSequence(granularity)
	} else if e.Panning != nil {
		s, err := e.Panning.GetSequence(PanningAutomation)
		if err != nil {
			return nil, util.WrapError("panning", err)
		}
		return s, nil
	} else if e.Reverb != nil {
		s, err := e.Reverb.GetSequence(ReverbAutomation)
		if err != nil {
			return nil, util.WrapError("reverb", err)
		}
		return s, nil
	} else if e.ReverbTime != nil {
		s, err := e.ReverbTime.GetSequence(ReverbTimeAutomation)
		if err != nil {
			return nil, util.WrapError("reverb_time", err)
		}
		return s, nil
	} else if e.LPF_Cutoff != nil {
		s, err := e.LPF_Cutoff.GetSequence(LPF_CutoffAutomation)
		if err != nil {
			return nil, util.WrapError("lpf_cutoff", err)
		}
		return s, nil
	} else if e.HPF_Cutoff != nil {
		s, err := e.HPF_Cutoff.GetSequence(HPF_CutoffAutomation)
		if err != nil {
			return nil, util.WrapError("lpf_cutoff", err)
		}
		return s, nil
	} else if e.Tremelo != nil {
		s, err := e.Tremelo.GetSequence(TremeloAutomation)
		if err != nil {
			return nil, util.WrapError("tremelo", err)
		}
		return s, nil
	} else if e.Volume != nil {
		s, err := e.Volume.GetSequence(ChannelVolumeAutomation)
		if err != nil {
			return nil, util.WrapError("volume", err)
		}
		return s, nil
	} else if e.GrainSize != nil {
		s, err := e.GrainSize.GetSequence(GrainSizeAutomation)
		if err != nil {
			return nil, util.WrapError("grain_size", err)
		}
		return s, nil
	} else if e.GrainBirthRate != nil {
		s, err := e.GrainBirthRate.GetSequence(GrainBirthRateAutomation)
		if err != nil {
			return nil, util.WrapError("grain_birth_rate", err)
		}
		return s, nil
	} else if e.GrainSpread != nil {
		s, err := e.GrainSpread.GetSequence(GrainSpreadAutomation)
		if err != nil {
			return nil, util.WrapError("grain_spread", err)
		}
		return s, nil
	} else if e.GrainSpeed != nil {
		s, err := e.GrainSpeed.GetSequence(GrainSpeedAutomation)
		if err != nil {
			return nil, util.WrapError("grain_speed", err)
		}
		return s, nil
	} else if e.Register != nil {
		s, err := e.Register.GetSequence()
		if err != nil {
			return nil, util.WrapError("register", err)
		}
		return s, nil
	} else if e.FloatRegister != nil {
		s, err := e.FloatRegister.GetSequence()
		if err != nil {
			return nil, util.WrapError("float_register", err)
		}
		return s, nil
	} else if e.ArrayRegister != nil {
		s, err := e.ArrayRegister.GetSequence()
		if err != nil {
			return nil, util.WrapError("array_register", err)
		}
		return s, nil
	} else if e.MIDI != nil {
		s, err := e.MIDI.GetSequence()
		if err != nil {
			return nil, util.WrapError("midi", err)
		}
		return s, nil
	} else if e.After != nil {
		return e.After.GetSequence(granularity)
	} else if e.Before != nil {
		return e.Before.GetSequence(granularity)
	} else if e.Offset != nil {
		return e.Offset.GetSequence(granularity)
	} else if e.Combine != nil {
		sequences := []Sequence{}
		for _, s := range e.Combine {
			s_, err := s.GetSequence(granularity)
			if err != nil {
				return nil, util.WrapError("combine", err)
			}
			sequences = append(sequences, s_)
		}
		return Combine(sequences...), nil
	}
	return nil, util.WrapError("sequence", fmt.Errorf("Missing sequence"))
}
