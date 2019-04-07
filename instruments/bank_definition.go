package instruments

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"strings"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/filters"
	"github.com/bspaans/bleep/generators"
	"github.com/bspaans/bleep/generators/derived"
	"gopkg.in/yaml.v2"
)

func WrapError(in string, err error) error {
	return fmt.Errorf("%s > %s", in, err.Error())
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

type FilterOptionsDef struct {
	Delay       *DelayOptionsDef       `json:"delay" yaml:"delay"`
	Overdrive   *OverdriveOptionsDef   `json:"overdrive" yaml:"overdrive"`
	Distortion  *DistortionOptionsDef  `json:"distortion" yaml:"distortion"`
	Flanger     *FlangerOptionsDef     `json:"flanger" yaml:"flanger"`
	Tremelo     *TremeloOptionsDef     `json:"tremelo" yaml:"tremelo"`
	Convolution *ConvolutionOptionsDef `json:"convolution" yaml:"convolution"`
	LPF         *LPFOptionsDef         `json:"lpf" yaml:"lpf"`
	HPF         *LPFOptionsDef         `json:"hpf" yaml:"hpf"`
	BPF         *BandOptionsDef        `json:"bpf" yaml:"bpf"`
	Sum         []*FilterOptionsDef    `json:"sum" yaml:"sum"`
	Average     []*FilterOptionsDef    `json:"average" yaml:"average"`
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

type FilterDef struct {
	Filter FilterOptionsDef `json:",inline" yaml:",inline"`
	On     GeneratorDef     `json:",inline" yaml:",inline"`
}

func (f *FilterDef) Generator(cfg *audio.AudioConfig) generators.Generator {
	return derived.NewFilteredGenerator(f.On.Generator(cfg), f.Filter.Filter())
}

func (f *FilterDef) Validate() error {
	if f.Filter.Validate() != nil {
		return f.Filter.Validate()
	}
	return f.On.Validate()
}

type ConstantPitchDef struct {
	Pitch        float64      `json:"pitch" yaml:"pitch"`
	GeneratorDef GeneratorDef `json:",inline" yaml:",inline"`
}

func (t *ConstantPitchDef) Generator(cfg *audio.AudioConfig) generators.Generator {
	return derived.NewConstantPitchGenerator(
		t.GeneratorDef.Generator(cfg),
		t.Pitch,
	)
}

func (t *ConstantPitchDef) Validate() error {
	if t.Pitch == 0.0 {
		return errors.New("Missing pitch in constant_pitch control")
	}
	return t.GeneratorDef.Validate()
}

type TransposeDef struct {
	Semitones    float64      `json:"semitones" yaml:"semitones"`
	Gain         float64      `json:"gain" yaml:"gain"`
	GeneratorDef GeneratorDef `json:",inline" yaml:",inline"`
}

func (t *TransposeDef) Generator(cfg *audio.AudioConfig) generators.Generator {
	return derived.NewTransposingGenerator(
		t.GeneratorDef.Generator(cfg),
		t.Semitones,
		t.Gain,
	)
}

func (t *TransposeDef) Validate() error {
	return t.GeneratorDef.Validate()
}

type GrainsOptionsDef struct {
	File           string  `json:"file" yaml:"file"`
	GrainSize      float64 `json:"grain_size" yaml:"grain_size"`
	BirthRate      float64 `json:"birth_rate" yaml:"birth_rate"`
	Gain           float64 `json:"gain" yaml:"gain"`
	Repeat         bool    `json:"repeat" yaml:"repeat"`
	Density        int     `json:"density" yaml:"density"`
	Spread         float64 `json:"spread" yaml:"spread"`
	Speed          float64 `json:"speed" yaml:"speed"`
	RandomPosition float64 `json:"random_position" yaml:"random_position"`
}

func (w *GrainsOptionsDef) Generator(cfg *audio.AudioConfig) generators.Generator {
	g, err := generators.NewGrainsGeneratorForWavFile(cfg, w.File, w.GrainSize, w.BirthRate, w.Density, w.Spread, w.Speed, w.RandomPosition, w.Gain, w.Repeat)
	if err != nil {
		panic(err)
	}
	return g
}

func (w *GrainsOptionsDef) Validate() error {
	_, err := os.Stat(w.File)
	if err != nil {
		return err
	}
	if w.Density == 0 {
		w.Density = 1
	}
	return nil
}

type WavOptionsDef struct {
	File    string              `json:"file" yaml:"file"`
	Gain    float64             `json:"gain" yaml:"gain"`
	Pitched bool                `json:"pitched" yaml:"pitched"`
	Options GeneratorOptionsDef `json:",inline" yaml:",inline"`
}

func (w *WavOptionsDef) Generator() generators.Generator {
	var g generators.Generator
	var err error
	if w.Pitched {
		g, err = generators.NewPitchedWavGenerator(w.File, w.Gain, 440.0)
	} else {
		g, err = generators.NewWavGenerator(w.File, w.Gain)
	}
	if err != nil {
		panic(err)
	}
	return g
}

func (w *WavOptionsDef) Validate() error {
	_, err := os.Stat(w.File)
	if err != nil {
		return err
	}
	if w.Gain == 0.0 {
		return fmt.Errorf("Missing 'gain' for wav generator")
	}
	return w.Options.Validate()
}

type VocoderDef struct {
	Source  *GeneratorDef `json:"source" yaml:"source"`
	Vocoder *GeneratorDef `json:"vocoder" yaml:"vocoder"`
}

func (w *VocoderDef) Generator(cfg *audio.AudioConfig) generators.Generator {
	sg := w.Source.Generator(cfg)
	vg := w.Vocoder.Generator(cfg)
	return derived.NewVocoder(sg, vg)
}

func (w *VocoderDef) Validate() error {
	if w.Source == nil {
		return WrapError("vocoder", fmt.Errorf("missing 'source' parameter"))
	} else if w.Vocoder == nil {
		return WrapError("vocoder", fmt.Errorf("missing 'vocoder' parameter"))
	}
	if err := w.Source.Validate(); err != nil {
		return WrapError("vocoder > source", err)
	}
	if err := w.Vocoder.Validate(); err != nil {
		return WrapError("vocoder > vocoder", err)
	}
	return nil
}

type PulseWaveDef struct {
	DutyCycle          float64             `json:"duty_cycle" yaml:"duty_cycle"`
	DutyCycleDepth     float64             `json:"duty_cycle_depth" yaml:"duty_cycle_depth"`
	DutyCycleModulator *GeneratorDef       `json:"duty_cycle_modulator" yaml:"duty_cycle_modulator"`
	Options            GeneratorOptionsDef `json:",inline" yaml:",inline"`
}

func (p *PulseWaveDef) Generator(cfg *audio.AudioConfig) generators.Generator {
	var mod generators.Generator
	if p.DutyCycleModulator != nil {
		mod = p.DutyCycleModulator.Generator(cfg)
	}
	g := generators.NewPulseWaveGenerator(p.DutyCycle, mod, p.DutyCycleDepth)
	return p.Options.Generator(g)
}

func (g *PulseWaveDef) Validate() error {
	if g.DutyCycleModulator != nil {
		if err := g.DutyCycleModulator.Validate(); err != nil {
			return WrapError("pulse > duty_cycle_modulator", err)
		}
	}
	return g.Options.Validate()
}

type GeneratorOptionsDef struct {
	Attack  *float64 `json:"attack" yaml:"attack"`
	Decay   *float64 `json:"decay" yaml:"decay"`
	Sustain *float64 `json:"sustain" yaml:"sustain"`
	Release *float64 `json:"release" yaml:"release"`
	Pitch   *float64 `json:"pitch" yaml:"pitch"`
}

func (g *GeneratorOptionsDef) Generator(gen generators.Generator) generators.Generator {
	if g.Attack != nil || g.Decay != nil || g.Sustain != nil || g.Release != nil {
		attack, decay, sustain, release := 0.1, 1.0, 0.5, 0.25
		if g.Attack != nil {
			attack = *g.Attack
		}
		if g.Decay != nil {
			decay = *g.Decay
		}
		if g.Sustain != nil {
			sustain = *g.Sustain
		}
		if g.Release != nil {
			release = *g.Release
		}
		gen = derived.NewEnvelopeGenerator(gen, attack, decay, sustain, release)
	}
	if g.Pitch != nil {
		gen.SetPitch(*g.Pitch)
	}
	return gen
}

func (g *GeneratorOptionsDef) Validate() error {
	return nil
}

type GeneratorDef struct {
	Filter        *FilterDef           `json:"filter" yaml:"filter"`
	Transpose     *TransposeDef        `json:"transpose" yaml:"transpose"`
	ConstantPitch *ConstantPitchDef    `json:"constant_pitch" yaml:"constant_pitch"`
	Sine          *GeneratorOptionsDef `json:"sine" yaml:"sine"`
	Square        *GeneratorOptionsDef `json:"square" yaml:"square"`
	Sawtooth      *GeneratorOptionsDef `json:"sawtooth" yaml:"sawtooth"`
	Triangle      *GeneratorOptionsDef `json:"triangle" yaml:"triangle"`
	WhiteNoise    *GeneratorOptionsDef `json:"white_noise" yaml:"white_noise"`
	Pulse         *PulseWaveDef        `json:"pulse" yaml:"pulse"`
	Wav           *WavOptionsDef       `json:"wav" yaml:"wav"`
	Grains        *GrainsOptionsDef    `json:"grains" yaml:"grains"`
	Combined      []*GeneratorDef      `json:"combined" yaml:"combined"`
	Vocoder       *VocoderDef          `json:"vocoder" yaml:"vocoder"`
}

func (d *GeneratorDef) Generator(cfg *audio.AudioConfig) generators.Generator {
	var g generators.Generator
	if d.Sine != nil {
		g = d.Sine.Generator(generators.NewSineWaveOscillator())
	} else if d.Square != nil {
		g = d.Square.Generator(generators.NewSquareWaveOscillator())
	} else if d.Sawtooth != nil {
		g = d.Sawtooth.Generator(generators.NewSawtoothWaveOscillator())
	} else if d.Triangle != nil {
		g = d.Triangle.Generator(generators.NewTriangleWaveOscillator())
	} else if d.Pulse != nil {
		g = d.Pulse.Generator(cfg)
	} else if d.WhiteNoise != nil {
		g = d.WhiteNoise.Generator(generators.NewWhiteNoiseGenerator())
	} else if d.Filter != nil {
		g = d.Filter.Generator(cfg)
	} else if d.Transpose != nil {
		g = d.Transpose.Generator(cfg)
	} else if d.Wav != nil {
		g = d.Wav.Generator()
	} else if d.ConstantPitch != nil {
		g = d.ConstantPitch.Generator(cfg)
	} else if d.Grains != nil {
		g = d.Grains.Generator(cfg)
	} else if d.Vocoder != nil {
		g = d.Vocoder.Generator(cfg)
	} else if len(d.Combined) > 0 {
		gs := []generators.Generator{}
		for _, gen := range d.Combined {
			gs = append(gs, gen.Generator(cfg))
		}
		g = derived.NewCombinedGenerators(gs...)
	} else {
		panic("unknown generator")
	}
	return g
}

func (d *GeneratorDef) Validate() error {
	if d.Sine != nil {
		return d.Sine.Validate()
	} else if d.Square != nil {
		return d.Square.Validate()
	} else if d.Sawtooth != nil {
		return d.Sawtooth.Validate()
	} else if d.Triangle != nil {
		return d.Triangle.Validate()
	} else if d.Filter != nil {
		return d.Filter.Validate()
	} else if d.Grains != nil {
		return d.Grains.Validate()
	} else if d.Pulse != nil {
		return d.Pulse.Validate()
	} else if d.Transpose != nil {
		return d.Transpose.Validate()
	} else if d.ConstantPitch != nil {
		return d.ConstantPitch.Validate()
	} else if d.WhiteNoise != nil {
		return d.WhiteNoise.Validate()
	} else if d.Wav != nil {
		return d.Wav.Validate()
	} else if d.Vocoder != nil {
		return d.Vocoder.Validate()
	} else if len(d.Combined) > 0 {
		gs := []string{}
		for _, gen := range d.Combined {
			if err := gen.Validate(); err != nil {
				gs = append(gs, err.Error())
			}
		}
		if len(gs) == 0 {
			return nil
		}
		return errors.New(strings.Join(gs, "\n"))
	} else {
		return errors.New("Missing generator")
	}
}

type InstrumentDef struct {
	Index        int          `json:"index" yaml:"index"`
	Name         string       `json:"name" yaml:"name"`
	GeneratorDef GeneratorDef `json:",inline" yaml:",inline"`
}

func (i *InstrumentDef) Generator(cfg *audio.AudioConfig) generators.Generator {
	return i.GeneratorDef.Generator(cfg)
}

func (i *InstrumentDef) Validate() error {
	if err := i.GeneratorDef.Validate(); err != nil {
		return fmt.Errorf("Error in instrument [%d] %s: %s", i.Index, i.Name, err.Error())
	}
	return nil
}

type BankDef struct {
	Instruments []*InstrumentDef `json:"bank" yaml:"bank"`
}

func NewBankFromYamlFile(file string) (*BankDef, error) {
	contents, err := ioutil.ReadFile(file)
	if err != nil {
		return nil, err
	}
	result := BankDef{}
	if err := yaml.Unmarshal(contents, &result); err != nil {
		return nil, err
	}
	if len(result.Instruments) == 0 {
		return nil, fmt.Errorf("No instruments in bank def %s", file)
	}
	return &result, nil
}

func (b *BankDef) Validate() error {
	str := []string{}
	for _, instr := range b.Instruments {
		if err := instr.Validate(); err != nil {
			str = append(str, err.Error())
		}
	}
	if len(str) == 0 {
		return nil
	}
	return errors.New(strings.Join(str, "\n"))
}

func (b *BankDef) Activate(bank int) {
	for _, instr := range b.Instruments {
		fmt.Printf("Loading [%d] %s\n", instr.Index, instr.Name)
		Banks[bank][instr.Index] = instr.Generator
	}
}
