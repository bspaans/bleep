package instruments

import (
	"errors"
	"fmt"
	"io/ioutil"
	"strings"

	"github.com/bspaans/bleep/audio"
	"gopkg.in/yaml.v2"
)

type BankDef struct {
	Instruments []*InstrumentDef `json:"bank" yaml:"bank"`
	FromFile    string           `json:"-" yaml:"-"`
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
	result.FromFile = file
	return &result, nil
}

func (b *BankDef) Validate(cfg *audio.AudioConfig) error {
	ctx, err := NewContext(b.FromFile, cfg)
	if err != nil {
		return err
	}
	str := []string{}
	for _, instr := range b.Instruments {
		if err := instr.Validate(ctx); err != nil {
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
		Banks[bank][instr.Index] = BankDefToBankType(instr.Generator, b.FromFile)
	}
}
