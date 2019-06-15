package definitions

import (
	"fmt"

	. "github.com/bspaans/bleep/sequencer/sequences"
	"github.com/bspaans/bleep/util"
)

type SequenceDef struct {
	Every          *RepeatDef                 `json:"repeat,omitempty" yaml:"repeat,omitempty"`
	Euclidian      *EuclidianDef              `json:"euclidian,omitempty" yaml:"euclidian,omitempty"`
	PlayNoteEvery  *PlayNoteEveryDef          `json:"play_note,omitempty" yaml:"play_note,omitempty"`
	PlayNotesEvery *PlayNotesEveryDef         `json:"play_notes,omitempty" yaml:"play_notes,omitempty"`
	Panning        *ChannelAutomationDef      `json:"panning,omitempty" yaml:"panning,omitempty"`
	Reverb         *ChannelAutomationDef      `json:"reverb,omitempty" yaml:"reverb,omitempty"`
	ReverbTime     *FloatChannelAutomationDef `json:"reverb_time,omitempty" yaml:"reverb_time,omitempty"`
	Tremelo        *ChannelAutomationDef      `json:"tremelo,omitempty" yaml:"tremelo,omitempty"`
	LPF_Cutoff     *ChannelAutomationDef      `json:"lpf_cutoff,omitempty" yaml:"lpf_cutoff,omitempty"`
	HPF_Cutoff     *ChannelAutomationDef      `json:"hpf_cutoff,omitempty" yaml:"hpf_cutoff,omitempty"`
	Volume         *ChannelAutomationDef      `json:"volume,omitempty" yaml:"volume,omitempty"`
	GrainSize      *FloatChannelAutomationDef `json:"grain_size,omitempty" yaml:"grain_size,omitempty"`
	GrainBirthRate *FloatChannelAutomationDef `json:"grain_birth_rate,omitempty" yaml:"grain_birth_rate,omitempty"`
	GrainSpread    *FloatChannelAutomationDef `json:"grain_spread,omitempty" yaml:"grain_spread,omitempty"`
	GrainSpeed     *FloatChannelAutomationDef `json:"grain_speed,omitempty" yaml:"grain_speed,omitempty"`
	After          *AfterDef                  `json:"after,omitempty" yaml:"after,omitempty"`
	Before         *BeforeDef                 `json:"before,omitempty" yaml:"before,omitempty"`
	Offset         *OffsetDef                 `json:"offset,omitempty" yaml:"offset,omitempty"`
	Register       *RegisterDef               `json:"register,omitempty" yaml:"register,omitempty"`
	FloatRegister  *FloatRegisterDef          `json:"float_register,omitempty" yaml:"float_register,omitempty"`
	ArrayRegister  *IntArrayRegisterDef       `json:"array_register,omitempty" yaml:"array_register,omitempty"`
	MIDI           *MIDISequencesDef          `json:"midi,omitempty" yaml:"midi,omitempty"`
	Combine        []*SequenceDef             `json:"combine,omitempty" yaml:"combine,omitempty"`
}

func (e *SequenceDef) GetSequence(ctx *context) (Sequence, error) {
	if e == nil {
		return nil, fmt.Errorf("Missing sequence")
	}

	var result Sequence
	var err error
	var field string
	if e.Every != nil {
		field = "repeat"
		result, err = e.Every.GetSequence(ctx)
	} else if e.Euclidian != nil {
		field = "euclidian"
		result, err = e.Euclidian.GetSequence(ctx)
	} else if e.PlayNoteEvery != nil {
		field = "play_note"
		result, err = e.PlayNoteEvery.GetSequence(ctx)
	} else if e.PlayNotesEvery != nil {
		field = "play_notes"
		result, err = e.PlayNotesEvery.GetSequence(ctx)
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
		result, err = e.MIDI.GetSequence(ctx)
	} else if e.After != nil {
		field = "after"
		result, err = e.After.GetSequence(ctx)
	} else if e.Before != nil {
		field = "before"
		result, err = e.Before.GetSequence(ctx)
	} else if e.Offset != nil {
		field = "offset"
		result, err = e.Offset.GetSequence(ctx)
	} else if e.Combine != nil {
		field = "combine"
		sequences := []Sequence{}
		for _, s := range e.Combine {
			s_, err := s.GetSequence(ctx)
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
