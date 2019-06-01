package definitions

import (
	"fmt"

	. "github.com/bspaans/bleep/sequencer/automations"
	"github.com/bspaans/bleep/util"
)

type IntArrayAutomationDef struct {
	CycleChords *CycleChordsDef       `json:"cycle_chords,omitempty" yaml:"cycle_chords,omitempty"`
	Register    *int                  `json:"register,omitempty" yaml:"register,omitempty"`
	Transpose   *IntArrayTransposeDef `json:"transpose,omitempty" yaml:"transpose,omitempty"`
	Index       *IntArrayIndexDef     `json:"index,omitempty" yaml:"index,omitempty"`
}

func (a *IntArrayAutomationDef) GetAutomation() (IntArrayAutomation, error) {
	if a.Register != nil {
		return IntArrayRegisterAutomation(*a.Register), nil
	} else if a.CycleChords != nil {
		return a.CycleChords.GetAutomation()
	} else if a.Transpose != nil {
		automation, err := a.Transpose.IntArrayAutomationDef.GetAutomation()
		if err != nil {
			return nil, err
		}
		return IntArrayTransposeAutomation(a.Transpose.Transpose, automation), nil
	} else if a.Index != nil {
		automation, err := a.Index.IntArrayAutomationDef.GetAutomation()
		if err != nil {
			return nil, err
		}
		indexF := IntIdAutomation(a.Index.Index)
		if a.Index.AutoIndex != nil {
			indexF_, err := a.Index.AutoIndex.GetAutomation()
			if err != nil {
				return nil, util.WrapError("index > auto_value", err)
			}
			indexF = indexF_
		}
		return IntArrayIndexAutomation(indexF, automation), nil
	}
	return nil, fmt.Errorf("Missing array automation")
}

type CycleChordsDef struct {
	Count  int     `json:"count" yaml:"count"`
	Chords [][]int `json:"chords" yaml:"chords"`
}

func (c *CycleChordsDef) GetAutomation() (IntArrayAutomation, error) {
	return ChordCycleArrayAutomation(c.Count, c.Chords), nil
}

type IntArrayTransposeDef struct {
	Transpose             int `json:"value" yaml:"value"`
	IntArrayAutomationDef `json:",inline" yaml:",inline"`
}

type IntArrayIndexDef struct {
	Index                 int            `json:"value" yaml:"value"`
	AutoIndex             *AutomationDef `json:"auto_value" yaml:"auto_value"`
	IntArrayAutomationDef `json:",inline" yaml:",inline"`
}
