package definitions

import "github.com/bspaans/bleep/channels"

type TrackDef struct {
	Name          string                `json:"name" yaml:"name"`
	Sequences     []SequenceDef         `json:"sequences" yaml:"sequences"`
	Register      *int                  `json:"register,omitempty" yaml:"register,omitempty"`
	ArrayRegister *int                  `json:"array_register,omitempty" yaml:"array_register,omitempty"`
	FloatRegister *int                  `json:"float_register,omitempty" yaml:"float_register,omitempty"`
	Channel       *channels.ChannelsDef `json:"channel,omitempty" yaml:"channel,omitempty"`
}
