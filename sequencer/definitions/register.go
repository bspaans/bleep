package definitions

import (
	. "github.com/bspaans/bleep/sequencer/automations"
	. "github.com/bspaans/bleep/sequencer/sequences"
	"github.com/bspaans/bleep/util"
)

type RegisterDef struct {
	Register   int            `json:"register" yaml:"register"`
	Value      int            `json:"value" yaml:"value"`
	Automation *AutomationDef `json:"auto_value,omitempty" yaml:"auto_value,omitempty"`
}

func (e *RegisterDef) GetSequence() (Sequence, error) {

	valueF := IntIdAutomation(e.Value)
	if e.Automation != nil {
		valueF_, err := e.Automation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("register", err)
		}
		valueF = valueF_
	}
	return SetIntRegisterAutomation(e.Register, valueF), nil
}

type FloatRegisterDef struct {
	Register   int                 `json:"register" yaml:"register"`
	Value      float64             `json:"value" yaml:"value"`
	Automation *FloatAutomationDef `json:"auto_value,omitempty" yaml:"auto_value,omitempty"`
}

func (e *FloatRegisterDef) GetSequence() (Sequence, error) {

	valueF := FloatIdAutomation(e.Value)
	if e.Automation != nil {
		valueF_, err := e.Automation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("float_register", err)
		}
		valueF = valueF_
	}
	return SetFloatRegisterAutomation(e.Register, valueF), nil
}

type IntArrayRegisterDef struct {
	Register   int                    `json:"register" yaml:"register"`
	Value      []int                  `json:"value" yaml:"value"`
	Automation *IntArrayAutomationDef `json:"auto_values,omitempty" yaml:"auto_values,omitempty"`
}

func (e *IntArrayRegisterDef) GetSequence() (Sequence, error) {

	valueF := IntArrayIdAutomation(e.Value)
	if e.Automation != nil {
		valueF_, err := e.Automation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("int_array_register", err)
		}
		valueF = valueF_
	}
	return SetIntArrayRegisterAutomation(e.Register, valueF), nil
}
