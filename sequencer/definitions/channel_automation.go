package definitions

import (
	. "github.com/bspaans/bleep/sequencer/automations"
	. "github.com/bspaans/bleep/sequencer/sequences"
)

type ChannelAutomationDef struct {
	Channel       int `json:"channel" yaml:"channel"`
	AutomationDef `json:",inline" yaml:",inline"`
}

func (p *ChannelAutomationDef) GetSequence(automation func(int, IntAutomation) Sequence) (Sequence, error) {
	automationF, err := p.AutomationDef.GetAutomation()
	if err != nil {
		return nil, err
	}
	return automation(p.Channel, automationF), nil
}

type FloatChannelAutomationDef struct {
	Channel            int
	FloatAutomationDef `yaml:",inline"`
}

func (p *FloatChannelAutomationDef) GetSequence(automation func(int, FloatAutomation) Sequence) (Sequence, error) {
	automationF, err := p.FloatAutomationDef.GetAutomation()
	if err != nil {
		return nil, err
	}
	return automation(p.Channel, automationF), nil
}
