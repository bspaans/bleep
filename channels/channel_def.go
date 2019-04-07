package channels

import (
	"fmt"

	"github.com/bspaans/bleep/instruments"
)

type ChannelsDef struct {
	Channels []*ChannelDef
}

type ChannelDef struct {
	Channel        int
	Instrument     int
	Bank           int
	Reverb         int
	ReverbTime     interface{} `yaml:"reverb_time"`
	ReverbFeedback float64     `yaml:"reverb_feedback"`
	Tremelo        int
	Volume         int
	Panning        int
	LPF_Cutoff     int `yaml:"lpf_cuttoff"`
	HPF_Cutoff     int `yaml:"hpf_cuttoff"`
	Grain          *instruments.GrainsOptionsDef
	Generator      *instruments.GeneratorDef
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
