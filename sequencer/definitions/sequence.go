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

type SequenceGenerator interface {
	GetSequence(granularity int) (Sequence, error)
}

func (e *SequenceDef) GetSequence(granularity int) (Sequence, error) {
	if e == nil {
		return nil, fmt.Errorf("Missing sequence")
	}

	var result Sequence
	var err error
	var field string
	if e.Every != nil {
		field = "repeat"
		result, err = e.Every.GetSequence(granularity)
	} else if e.Euclidian != nil {
		field = "euclidian"
		result, err = e.Euclidian.GetSequence(granularity)
	} else if e.PlayNoteEvery != nil {
		field = "play_note"
		result, err = e.PlayNoteEvery.GetSequence(granularity)
	} else if e.PlayNotesEvery != nil {
		field = "play_notes"
		result, err = e.PlayNotesEvery.GetSequence(granularity)
	} else if e.Panning != nil {
		field = "panning"
		result, err = e.Panning.GetSequence(PanningAutomation)
	} else if e.Reverb != nil {
		field = "reverb"
		result, err = e.Reverb.GetSequence(ReverbAutomation)
	} else if e.ReverbTime != nil {
		field = "reverb_time"
		result, err = e.ReverbTime.GetSequence(ReverbTimeAutomation)
	} else if e.LPF_Cutoff != nil {
		field = "lpf_cutoff"
		result, err = e.LPF_Cutoff.GetSequence(LPF_CutoffAutomation)
	} else if e.HPF_Cutoff != nil {
		field = "hpf_cutoff"
		result, err = e.HPF_Cutoff.GetSequence(HPF_CutoffAutomation)
	} else if e.Tremelo != nil {
		field = "tremelo"
		result, err = e.Tremelo.GetSequence(TremeloAutomation)
	} else if e.Volume != nil {
		field = "volume"
		result, err = e.Volume.GetSequence(ChannelVolumeAutomation)
	} else if e.GrainSize != nil {
		field = "grain_size"
		result, err = e.GrainSize.GetSequence(GrainSizeAutomation)
	} else if e.GrainBirthRate != nil {
		field = "grain_birth_rate"
		result, err = e.GrainBirthRate.GetSequence(GrainBirthRateAutomation)
	} else if e.GrainSpread != nil {
		field = "grain_spread"
		result, err = e.GrainSpread.GetSequence(GrainSpreadAutomation)
	} else if e.GrainSpeed != nil {
		field = "grain_speed"
		result, err = e.GrainSpeed.GetSequence(GrainSpeedAutomation)
	} else if e.Register != nil {
		field = "register"
		result, err = e.Register.GetSequence()
	} else if e.FloatRegister != nil {
		field = "float_register"
		result, err = e.FloatRegister.GetSequence()
	} else if e.ArrayRegister != nil {
		field = "array_register"
		result, err = e.ArrayRegister.GetSequence()
	} else if e.MIDI != nil {
		field = "midi"
		result, err = e.MIDI.GetSequence()
	} else if e.After != nil {
		field = "after"
		result, err = e.After.GetSequence(granularity)
	} else if e.Before != nil {
		field = "before"
		result, err = e.Before.GetSequence(granularity)
	} else if e.Offset != nil {
		field = "offset"
		result, err = e.Offset.GetSequence(granularity)
	} else if e.Combine != nil {
		field = "combine"
		sequences := []Sequence{}
		for _, s := range e.Combine {
			s_, err := s.GetSequence(granularity)
			if err != nil {
				return nil, util.WrapError("combine", err)
			}
			sequences = append(sequences, s_)
		}
		result = Combine(sequences...)
	}
	if err != nil {
		return nil, util.WrapError(field, err)
	}
	if result != nil {
		return result, nil
	}
	return nil, util.WrapError("sequence", fmt.Errorf("Missing sequence"))
}
