package definitions

import (
	"fmt"

	. "github.com/bspaans/bleep/sequencer/automations"
	"github.com/bspaans/bleep/util"
)

type FloatAutomationDef struct {
	BackAndForth *[]float64         `json:"back_and_forth,omitempty" yaml:"back_and_forth,omitempty"`
	Register     *int               `json:"register,omitempty" yaml:"register,omitempty"`
	Transpose    *FloatTransposeDef `json:"transpose,omitempty" yaml:"transpose,omitempty"`
	Random       *FloatRandomDef    `json:"random,omitempty" yaml:"random,omitempty"`
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
			return nil, util.WrapError("transpose", err)
		}
		return FloatTransposeAutomation(a.Transpose.Transpose, automation), nil
	}
	return nil, fmt.Errorf("Missing automation")
}

type FloatRandomDef struct {
	Max float64 `json:"max" yaml:"max"`
	Min float64 `json:"min" yaml:"min"`
}

type FloatTransposeDef struct {
	Transpose          float64 `json:"value" yaml:"value"`
	FloatAutomationDef `json:",inline" yaml:",inline"`
}
