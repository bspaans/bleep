package definitions

import (
	"fmt"

	. "github.com/bspaans/bleep/sequencer/automations"
	"github.com/bspaans/bleep/util"
)

type AutomationDef struct {
	BackAndForth *[]int           `json:"back_and_forth,omitempty" yaml:"back_and_forth"`
	Cycle        *[]int           `json:"cycle,omitempty" yaml:"cycle"`
	Range        *RangeDef        `json:"range,omitempty" yaml:"range"`
	Sweep        *RangeDef        `json:"sweep,omitempty" yaml:"sweep"`
	FadeIn       *RangeDef        `json:"fade_in,omitempty" yaml:"fade_in"`
	Random       *RandomDef       `json:"random,omitempty" yaml:"random"`
	Register     *int             `json:"register,omitempty" yaml:"register"`
	Transpose    *IntTransposeDef `json:"transpose,omitempty" yaml:"transpose"`
}

func (a *AutomationDef) GetAutomation() (IntAutomation, error) {
	if a.BackAndForth != nil {
		return IntBackAndForthAutomation(*a.BackAndForth), nil
	} else if a.Cycle != nil {
		return IntCycleAutomation(*a.Cycle), nil
	} else if a.Range != nil {
		return IntRangeAutomation(a.Range.From, a.Range.To, a.Range.Step), nil
	} else if a.Sweep != nil {
		return IntSweepAutomation(a.Sweep.From, a.Sweep.To, a.Sweep.ChangeEvery, a.Sweep.Step), nil
	} else if a.FadeIn != nil {
		return IntFadeInAutomation(a.FadeIn.From, a.FadeIn.To, a.FadeIn.ChangeEvery), nil
	} else if a.Register != nil {
		return IntRegisterAutomation(*a.Register), nil
	} else if a.Random != nil {
		return IntRandomAutomation(a.Random.Min, a.Random.Max), nil
	} else if a.Transpose != nil {
		automation, err := a.Transpose.AutomationDef.GetAutomation()
		if err != nil {
			return nil, err
		}
		return IntTransposeAutomation(a.Transpose.Transpose, automation), nil
	}
	return nil, fmt.Errorf("Missing automation")
}

type RandomDef struct {
	Max int
	Min int
}
type FloatRandomDef struct {
	Max float64
	Min float64
}

type FloatAutomationDef struct {
	BackAndForth *[]float64         `yaml:"back_and_forth"`
	Register     *int               `yaml:"register"`
	Transpose    *FloatTransposeDef `yaml:"transpose"`
	Random       *FloatRandomDef    `yaml:"random"`
}

func (a *FloatAutomationDef) GetAutomation() (FloatAutomation, error) {
	if a.BackAndForth != nil {
		return FloatBackAndForthAutomation(*a.BackAndForth), nil
	} else if a.Register != nil {
		return FloatRegisterAutomation(*a.Register), nil
	} else if a.Random != nil {
		return FloatRandomAutomation(a.Random.Min, a.Random.Min), nil
	} else if a.Transpose != nil {
		automation, err := a.Transpose.FloatAutomationDef.GetAutomation()
		if err != nil {
			return nil, err
		}
		return FloatTransposeAutomation(a.Transpose.Transpose, automation), nil
	}
	return nil, fmt.Errorf("Missing automation")
}

type RangeDef struct {
	From        int `json:"from" yaml:"from"`
	To          int `json:"to" yaml:"to"`
	Step        int `json:"step" yaml:"step"`
	ChangeEvery int `json:"change_every" yaml:"change_every"`
}

type CycleChordsDef struct {
	Count  int     `yaml:"count"`
	Chords [][]int `yaml:"chords"`
}

func (c *CycleChordsDef) GetAutomation() (IntArrayAutomation, error) {
	return ChordCycleArrayAutomation(c.Count, c.Chords), nil
}

type IntArrayAutomationDef struct {
	CycleChords *CycleChordsDef       `yaml:"cycle_chords"`
	Register    *int                  `yaml:"register"`
	Transpose   *IntArrayTransposeDef `yaml:"transpose"`
	Index       *IntArrayIndexDef     `yaml:"index"`
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

type IntArrayIndexDef struct {
	Index                 int            `json:"value" yaml:"value"`
	AutoIndex             *AutomationDef `json:"auto_value" yaml:"auto_value"`
	IntArrayAutomationDef `json:",inline" yaml:",inline"`
}

type IntTransposeDef struct {
	Transpose     int `json:"value" yaml:"value"`
	AutomationDef `json:",inline" yaml:",inline"`
}
type FloatTransposeDef struct {
	Transpose          float64 `json:"value" yaml:"value"`
	FloatAutomationDef `json:",inline" yaml:",inline"`
}
type IntArrayTransposeDef struct {
	Transpose             int `json:"value" yaml:"value"`
	IntArrayAutomationDef `json:",inline" yaml:",inline"`
}
