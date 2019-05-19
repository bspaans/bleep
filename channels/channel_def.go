package channels

import (
	"fmt"

	"github.com/bspaans/bleep/instruments"
)

type ChannelsDef struct {
	Channels []*ChannelDef `json:"channels" yaml:"channels"`
}

type ChannelDef struct {
	Channel        int                           `json:"channel,omitempty" yaml:"channel,omitempty"`
	Instrument     int                           `json:"instrument,omitempty" yaml:"instrument,omitempty"`
	Bank           int                           `json:"bank,omitempty" yaml:"bank,omitempty"`
	Reverb         int                           `json:"reverb,omitempty" yaml:"reverb,omitempty"`
	ReverbTime     interface{}                   `json:"reverb_time,omitempty" yaml:"reverb_time,omitempty"`
	ReverbFeedback float64                       `json:"reverb_feedback,omitempty" yaml:"reverb_feedback,omitempty"`
	Tremelo        int                           `json:"tremelo,omitempty" yaml:"tremelo,omitempty"`
	Volume         int                           `json:"volume,omitempty" yaml:"volume,omitempty"`
	Panning        int                           `json:"panning,omitempty" yaml:"panning,omitempty"`
	LPF_Cutoff     int                           `json:"lpf_cuttoff,omitempty" yaml:"lpf_cuttoff,omitempty"`
	HPF_Cutoff     int                           `json:"hpf_cuttoff,omitempty" yaml:"hpf_cuttoff,omitempty"`
	Grain          *instruments.GrainsOptionsDef `json:"grain,omitempty" yaml:"grain,omitempty"`
	Generator      *instruments.GeneratorDef     `json:"generator,omitempty" yaml:"generator,omitempty"`
}

func ParseDuration(d interface{}, bpm float64) (float64, error) {
	secondsPerBeat := 60.0 / bpm
	switch d.(type) {
	case string:
		v := d.(string)
		if v == "Whole" {
			return secondsPerBeat * 4, nil
		} else if v == "Half" {
			return secondsPerBeat * 2, nil
		} else if v == "Quarter" {
			return secondsPerBeat, nil
		} else if v == "Eight" {
			return secondsPerBeat / 2, nil
		} else if v == "Sixteenth" {
			return secondsPerBeat / 4, nil
		} else if v == "Thirtysecond" {
			return secondsPerBeat / 8, nil
		}
	case int:
		return float64(d.(int)), nil
	case float64:
		return d.(float64), nil
	}
	return 0, fmt.Errorf("Unknown duration type '%v'", d)
}
