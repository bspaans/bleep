package channels

import (
	"fmt"

	"github.com/bspaans/bleep/instruments"
)

type ChannelsDef struct {
	Channels []*ChannelDef `json:"channels" yaml:"channels"`
}

type ChannelDef struct {
	Channel        int                           `json:"channel" yaml:"channel"`
	Instrument     int                           `json:"instrument" yaml:"instrument"`
	Bank           int                           `json:"bank" yaml:"bank"`
	Reverb         int                           `json:"reverb" yaml:"reverb"`
	ReverbTime     interface{}                   `json:"reverb_time" yaml:"reverb_time"`
	ReverbFeedback float64                       `json:"reverb_feedback" yaml:"reverb_feedback"`
	Tremelo        int                           `json:"tremelo" yaml:"tremelo"`
	Volume         int                           `json:"volume" yaml:"volume"`
	Panning        int                           `json:"panning" yaml:"panning"`
	LPF_Cutoff     int                           `json:"lpf_cuttoff" yaml:"lpf_cuttoff"`
	HPF_Cutoff     int                           `json:"hpf_cuttoff" yaml:"hpf_cuttoff"`
	Grain          *instruments.GrainsOptionsDef `json:"grain" yaml:"grain"`
	Generator      *instruments.GeneratorDef     `json:"generator" yaml:"generator"`
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
