package definitions

import (
	"fmt"

	. "github.com/bspaans/bleep/sequencer/automations"
)

type AutomationDef struct {
	BackAndForth *[]int           `json:"back_and_forth,omitempty" yaml:"back_and_forth,omitempty"`
	Cycle        *[]int           `json:"cycle,omitempty" yaml:"cycle,omitempty"`
	Range        *RangeDef        `json:"range,omitempty" yaml:"range,omitempty"`
	Sweep        *RangeDef        `json:"sweep,omitempty" yaml:"sweep,omitempty"`
	FadeIn       *RangeDef        `json:"fade_in,omitempty" yaml:"fade_in,omitempty"`
	Random       *RandomDef       `json:"random,omitempty" yaml:"random,omitempty"`
	Register     *int             `json:"register,omitempty" yaml:"register,omitempty"`
	Transpose    *IntTransposeDef `json:"transpose,omitempty" yaml:"transpose,omitempty"`
	IntConstant  *IntConstantDef  `json:"int_constant,omitempty" yaml:"int_constant,omitempty"`
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
	} else if a.IntConstant != nil {
		return IntIdAutomation(a.IntConstant.Value), nil
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
	Max int `json:"min" yaml:"min"`
	Min int `json:"max" yaml:"max"`
}

type RangeDef struct {
	From        int `json:"from" yaml:"from"`
	To          int `json:"to" yaml:"to"`
	Step        int `json:"step" yaml:"step"`
	ChangeEvery int `json:"change_every" yaml:"change_every"`
}

type IntTransposeDef struct {
	Transpose     int `json:"value" yaml:"value"`
	AutomationDef `json:",inline" yaml:",inline"`
}

type IntConstantDef struct {
	Value int `json:"value" yaml:"value"`
}
