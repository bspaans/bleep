package definitions

import (
	. "github.com/bspaans/bleep/sequencer/automations"
	. "github.com/bspaans/bleep/sequencer/sequences"
)

type ChannelAutomationDef struct {
	Channel    int
	Automation AutomationDef `yaml:",inline"`
}

func (p *ChannelAutomationDef) GetSequence(automation func(int, IntAutomation) Sequence) (Sequence, error) {
	automationF, err := p.Automation.GetAutomation()
	if err != nil {
		return nil, err
	}
	return automation(p.Channel, automationF), nil
}

type FloatChannelAutomationDef struct {
	Channel    int
	Automation FloatAutomationDef `yaml:",inline"`
}

func (p *FloatChannelAutomationDef) GetSequence(automation func(int, FloatAutomation) Sequence) (Sequence, error) {
	automationF, err := p.Automation.GetAutomation()
	if err != nil {
		return nil, err
	}
	return automation(p.Channel, automationF), nil
}
