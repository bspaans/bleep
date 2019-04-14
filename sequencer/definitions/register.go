package definitions

import (
	. "github.com/bspaans/bleep/sequencer/automations"
	. "github.com/bspaans/bleep/sequencer/sequences"
	"github.com/bspaans/bleep/util"
)

type RegisterDef struct {
	Register   int            `yaml:"register"`
	Value      int            `yaml:"value"`
	Automation *AutomationDef `yaml:"auto_value"`
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
	Register   int                 `yaml:"register"`
	Value      float64             `yaml:"value"`
	Automation *FloatAutomationDef `yaml:"auto_value"`
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
	Register   int                    `yaml:"register"`
	Value      []int                  `yaml:"value"`
	Automation *IntArrayAutomationDef `yaml:"auto_values"`
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
