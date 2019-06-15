package instruments

import (
	"errors"
	"fmt"
	"os"

	"github.com/bspaans/bleep/filters"
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/generators/derived"
)

type FilterDef struct {
	FilterOptionsDef `json:",inline" yaml:",inline"`
	GeneratorDef     `json:",inline" yaml:",inline"`
}

func (f *FilterDef) Generator(ctx *Context) generators.Generator {
	return derived.NewFilteredGenerator(f.GeneratorDef.Generator(ctx), f.FilterOptionsDef.Filter())
}

func (f *FilterDef) Validate(ctx *Context) error {
	if f.FilterOptionsDef.Validate() != nil {
		return f.FilterOptionsDef.Validate()
	}
	return f.GeneratorDef.Validate(ctx)
}

type FilterOptionsDef struct {
	Delay       *DelayOptionsDef       `json:"delay,omitempty" yaml:"delay"`
	Overdrive   *OverdriveOptionsDef   `json:"overdrive,omitempty" yaml:"overdrive"`
	Distortion  *DistortionOptionsDef  `json:"distortion,omitempty" yaml:"distortion"`
	Flanger     *FlangerOptionsDef     `json:"flanger,omitempty" yaml:"flanger"`
	Tremelo     *TremeloOptionsDef     `json:"tremelo,omitempty" yaml:"tremelo"`
	Convolution *ConvolutionOptionsDef `json:"convolution,omitempty" yaml:"convolution"`
	LPF         *LPFOptionsDef         `json:"lpf,omitempty" yaml:"lpf"`
	HPF         *LPFOptionsDef         `json:"hpf,omitempty" yaml:"hpf"`
	BPF         *BandOptionsDef        `json:"bpf,omitempty" yaml:"bpf"`
	Sum         []*FilterOptionsDef    `json:"sum,omitempty" yaml:"sum"`
	Average     []*FilterOptionsDef    `json:"average,omitempty" yaml:"average"`
}

func (f *FilterOptionsDef) Filter() filters.Filter {
	if f.Delay != nil {
		return filters.NewDelayFilter(f.Delay.Time, f.Delay.Factor, f.Delay.Feedback)
	} else if f.Overdrive != nil {
		return filters.NewOverdriveFilter(f.Overdrive.Factor)
	} else if f.LPF != nil {
		return filters.NewLowPassConvolutionFilter(f.LPF.Cutoff, 5)
	} else if f.HPF != nil {
		return filters.NewHighPassConvolutionFilter(f.HPF.Cutoff, 5)
	} else if f.BPF != nil {
		return filters.NewBandPassConvolutionFilter(f.BPF.Lowest, f.BPF.Highest, 13)
	} else if f.Distortion != nil {
		return filters.NewDistortionFilter(f.Distortion.Level)
	} else if f.Flanger != nil {
		return filters.NewFlangerFilter(f.Flanger.Time, f.Flanger.Factor, f.Flanger.Rate)
	} else if f.Tremelo != nil {
		return filters.NewTremeloFilter(f.Tremelo.Rate, f.Tremelo.Factor)
	} else if f.Convolution != nil {
		return filters.MustNewSimpleConvolutionFilterFromWav(f.Convolution.File)
	} else if f.Sum != nil {
		gs := []filters.Filter{}
		for _, filter := range f.Sum {
			gs = append(gs, filter.Filter())
		}
		return filters.SumFilter(gs...)
	} else if f.Average != nil {
		gs := []filters.Filter{}
		for _, filter := range f.Average {
			gs = append(gs, filter.Filter())
		}
		return filters.AverageFilter(gs...)
	}
	panic("unknown filter")
	return nil
}

func (f *FilterOptionsDef) Validate() error {
	if f.Delay != nil {
		return f.Delay.Validate()
	} else if f.Overdrive != nil {
		return f.Overdrive.Validate()
	} else if f.LPF != nil {
		return f.LPF.Validate()
	} else if f.HPF != nil {
		return f.HPF.Validate()
	} else if f.BPF != nil {
		return f.BPF.Validate()
	} else if f.Distortion != nil {
		return f.Distortion.Validate()
	} else if f.Flanger != nil {
		return f.Flanger.Validate()
	} else if f.Tremelo != nil {
		return f.Tremelo.Validate()
	} else if f.Convolution != nil {
		return f.Convolution.Validate()
	} else if f.Sum != nil {
		for _, filter := range f.Sum {
			err := filter.Validate()
			if err != nil {
				return WrapError("sum filter", err)
			}
		}
		return nil
	} else if f.Average != nil {
		for _, filter := range f.Average {
			err := filter.Validate()
			if err != nil {
				return WrapError("average filter", err)
			}
		}
		return nil
	}
	return errors.New("Unknown filter")
}

type DelayOptionsDef struct {
	Time     float64 `json:"time" yaml:"time"`
	Factor   float64 `json:"factor" yaml:"factor"`
	Feedback float64 `json:"feedback" yaml:"feedback"`
}

func (f *DelayOptionsDef) Validate() error {
	if f.Time == 0.0 {
		return fmt.Errorf("Missing 'time' in delay options")
	}
	if f.Factor == 0.0 {
		return fmt.Errorf("Missing 'factor' in delay options")
	}
	return nil
}

type OverdriveOptionsDef struct {
	Factor float64 `json:"factor" yaml:"factor"`
}

func (f *OverdriveOptionsDef) Validate() error {
	if f.Factor == 0.0 {
		return fmt.Errorf("Missing 'factor' in overdrive options")
	}
	return nil
}

type DistortionOptionsDef struct {
	Level float64 `json:"level" yaml:"level"`
}

func (f *DistortionOptionsDef) Validate() error {
	if f.Level == 0.0 {
		return fmt.Errorf("Missing 'level' in distortion options")
	}
	return nil
}

type FlangerOptionsDef struct {
	Time   float64 `json:"time" yaml:"time"`
	Factor float64 `json:"factor" yaml:"factor"`
	Rate   float64 `json:"rate" yaml:"rate"`
}

func (f *FlangerOptionsDef) Validate() error {
	if f.Time == 0.0 {
		return fmt.Errorf("Missing 'time' in flanger options [recommended < 0.015]")
	}
	if f.Factor == 0.0 {
		return fmt.Errorf("Missing 'factor' in flanger options [recommended ~0.7]")
	}
	if f.Rate == 0.0 {
		return fmt.Errorf("Missing 'rate' in flanger options [recommended range: 1-10]")
	}
	return nil
}

type TremeloOptionsDef struct {
	Factor float64 `json:"factor" yaml:"factor"`
	Rate   float64 `json:"rate" yaml:"rate"`
}

func (f *TremeloOptionsDef) Validate() error {
	if f.Factor == 0.0 {
		return fmt.Errorf("Missing 'factor' in tremelo options [recommended ~0.5]")
	}
	if f.Rate == 0.0 {
		return fmt.Errorf("Missing 'rate' in tremelo options [recommended range: 5-10]")
	}
	return nil
}

type ConvolutionOptionsDef struct {
	File string `json:"file" yaml:"file"`
}

func (f *ConvolutionOptionsDef) Validate() error {
	_, err := os.Stat(f.File)
	if err != nil {
		return err
	}
	return nil
}

type LPFOptionsDef struct {
	Cutoff float64 `json:"cutoff" yaml:"cutoff"`
}

func (f *LPFOptionsDef) Validate() error {
	if f.Cutoff == 0.0 {
		return fmt.Errorf("Missing 'cutoff' option")
	}
	return nil
}

type BandOptionsDef struct {
	Lowest  float64
	Highest float64
}

func (f *BandOptionsDef) Validate() error {
	if f.Lowest == 0.0 {
		return fmt.Errorf("Missing 'lowest' in lpf options")
	}
	if f.Highest == 0.0 {
		return fmt.Errorf("Missing 'highest' option")
	}
	return nil
}
