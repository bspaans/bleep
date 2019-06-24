package definitions

import (
	"errors"
	"fmt"

	. "github.com/bspaans/bleep/sequencer/automations"
	"github.com/bspaans/bleep/theory"
	"github.com/bspaans/bleep/util"
)

type IntArrayAutomationDef struct {
	CycleChords   *CycleChordsDef       `json:"cycle_chords,omitempty" yaml:"cycle_chords,omitempty"`
	Register      *int                  `json:"register,omitempty" yaml:"register,omitempty"`
	Transpose     *IntArrayTransposeDef `json:"transpose,omitempty" yaml:"transpose,omitempty"`
	Index         *IntArrayIndexDef     `json:"index,omitempty" yaml:"index,omitempty"`
	Constant      *IntArrayConstantDef  `json:"int_array_constant,omitempty" yaml:"int_array_constant,omitempty"`
	NotesConstant *IntArrayConstantDef  `json:"note_array_constant,omitempty" yaml:"note_array_constant,omitempty"`
	Chord         *ChordDef             `json:"chord,omitempty" yaml:"chord,omitempty"`
	Scale         *ScaleDef             `json:"scale,omitempty" yaml:"scale,omitempty"`
	ChordOnScale  *ChordOnScaleDef      `json:"chord_on_scale,omitempty" yaml:"chord_on_scale,omitempty"`
}

func (a *IntArrayAutomationDef) GetAutomation() (IntArrayAutomation, error) {
	if a.Register != nil {
		return IntArrayRegisterAutomation(*a.Register), nil
	} else if a.CycleChords != nil {
		return a.CycleChords.GetAutomation()
	} else if a.Chord != nil {
		return a.Chord.GetAutomation()
	} else if a.Scale != nil {
		return a.Scale.GetAutomation()
	} else if a.ChordOnScale != nil {
		return a.ChordOnScale.GetAutomation()
	} else if a.Constant != nil {
		return IntArrayIdAutomation(a.Constant.Value), nil
	} else if a.NotesConstant != nil {
		return IntArrayIdAutomation(a.NotesConstant.Value), nil
	} else if a.Transpose != nil {
		automation, err := a.Transpose.IntArrayAutomationDef.GetAutomation()
		if err != nil {
			return nil, err
		}
		return IntArrayTransposeAutomation(a.Transpose.Transpose, automation), nil
	} else if a.Index != nil {
		automation, err := a.Index.IntArrayAutomationDef.GetAutomation()
		if err != nil {
			return nil, util.WrapError("index", err)
		}
		indexF := IntIdAutomation(a.Index.Index)
		if a.Index.AutoIndex != nil {
			indexF_, err := a.Index.AutoIndex.GetAutomation()
			if err != nil {
				return nil, util.WrapError("index > auto_value", err)
			}
			indexF = indexF_
		}
		return IntArrayIndexAutomation(indexF, automation), nil
	}
	return nil, fmt.Errorf("Missing array automation")
}

type CycleChordsDef struct {
	Count  int     `json:"count" yaml:"count"`
	Chords [][]int `json:"chords" yaml:"chords"`
}

func (c *CycleChordsDef) GetAutomation() (IntArrayAutomation, error) {
	return ChordCycleArrayAutomation(c.Count, c.Chords), nil
}

type ScaleDef struct {
	Scale                string         `json:"scale" yaml:"scale"`
	BaseNote             int            `json:"base_note,omitempty" yaml:"base_note,omitempty"`
	Octaves              int            `json:"octaves,omitempty" yaml:"octaves,omitempty"`
	Inversions           int            `json:"inversions,omitempty" yaml:"inversions,omitempty"`
	BaseNoteAutomation   *AutomationDef `json:"auto_base_note,omitempty" yaml:"auto_base_note,omitempty"`
	OctavesAutomation    *AutomationDef `json:"auto_octaves,omitempty" yaml:"auto_octaves,omitempty"`
	InversionsAutomation *AutomationDef `json:"auto_inversions,omitempty" yaml:"auto_inversions,omitempty"`
}

func (c *ScaleDef) IsConstant() bool {
	return c.BaseNoteAutomation == nil && c.OctavesAutomation == nil && c.InversionsAutomation == nil
}

func (c *ScaleDef) GetAutomation() (IntArrayAutomation, error) {
	if c.IsConstant() {
		baseValues := theory.ScaleOnNoteInt(c.BaseNote, c.Scale)
		baseValues = theory.InvertChord(baseValues, c.Inversions)
		octaves := c.Octaves
		values := []int{}
		for octaves >= 1 {
			for _, note := range baseValues {
				values = append(values, note)
			}
			for i, _ := range baseValues {
				baseValues[i] += 12
			}
			octaves--
		}
		return IntArrayIdAutomation(values), nil
	}
	var noteA, octavesA, inversionsA IntAutomation
	if c.BaseNoteAutomation != nil {
		noteA_, err := c.BaseNoteAutomation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("auto_base_note", err)
		}
		noteA = noteA_
	} else {
		noteA = IntIdAutomation(c.BaseNote)
	}
	if c.OctavesAutomation != nil {
		octavesA_, err := c.OctavesAutomation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("auto_octaves", err)
		}
		octavesA = octavesA_
	} else {
		octavesA = IntIdAutomation(c.Octaves)
	}
	if c.InversionsAutomation != nil {
		inversionsA_, err := c.InversionsAutomation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("auto_inversions", err)
		}
		inversionsA = inversionsA_
	} else {
		inversionsA = IntIdAutomation(c.Inversions)
	}
	return Scale(c.Scale, noteA, octavesA, inversionsA), nil
}

type ChordOnScaleDef struct {
	Chord                string                 `json:"chord" yaml:"chord"`
	Start                int                    `json:"start,omitempty" yaml:"start,omitempty"`
	Octaves              int                    `json:"octaves,omitempty" yaml:"octaves,omitempty"`
	Inversions           int                    `json:"inversions,omitempty" yaml:"inversions,omitempty"`
	Scale                *IntArrayAutomationDef `json:"auto_scale,omitempty" yaml:"auto_scale,omitempty"`
	StartAutomation      *AutomationDef         `json:"auto_start,omitempty" yaml:"auto_start,omitempty"`
	OctavesAutomation    *AutomationDef         `json:"auto_octaves,omitempty" yaml:"auto_octaves,omitempty"`
	InversionsAutomation *AutomationDef         `json:"auto_inversions,omitempty" yaml:"auto_inversions,omitempty"`
}

func (c *ChordOnScaleDef) GetAutomation() (IntArrayAutomation, error) {
	if c.Scale == nil {
		return nil, util.WrapError("scale", errors.New("Missing scale"))
	}
	scaleF, err := c.Scale.GetAutomation()
	if err != nil {
		return nil, util.WrapError("scale", err)
	}
	var startA, octavesA, inversionsA IntAutomation
	if c.StartAutomation != nil {
		startA_, err := c.StartAutomation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("auto_start", err)
		}
		startA = startA_
	} else {
		startA = IntIdAutomation(c.Start)
	}
	if c.OctavesAutomation != nil {
		octavesA_, err := c.OctavesAutomation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("auto_octaves", err)
		}
		octavesA = octavesA_
	} else {
		octavesA = IntIdAutomation(c.Octaves)
	}
	if c.InversionsAutomation != nil {
		inversionsA_, err := c.InversionsAutomation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("auto_inversions", err)
		}
		inversionsA = inversionsA_
	} else {
		inversionsA = IntIdAutomation(c.Inversions)
	}
	return ChordOnScale(c.Chord, scaleF, startA, octavesA, inversionsA), nil
}

type ChordDef struct {
	Chord                string         `json:"chord" yaml:"chord"`
	BaseNote             int            `json:"base_note,omitempty" yaml:"base_note,omitempty"`
	Octaves              int            `json:"octaves,omitempty" yaml:"octaves,omitempty"`
	Inversions           int            `json:"inversions,omitempty" yaml:"inversions,omitempty"`
	BaseNoteAutomation   *AutomationDef `json:"auto_base_note,omitempty" yaml:"auto_base_note,omitempty"`
	OctavesAutomation    *AutomationDef `json:"auto_octaves,omitempty" yaml:"auto_octaves,omitempty"`
	InversionsAutomation *AutomationDef `json:"auto_inversions,omitempty" yaml:"auto_inversions,omitempty"`
}

func (c *ChordDef) IsConstant() bool {
	return c.BaseNoteAutomation == nil && c.OctavesAutomation == nil && c.InversionsAutomation == nil
}

func (c *ChordDef) GetAutomation() (IntArrayAutomation, error) {
	if c.IsConstant() {
		baseValues := theory.ChordOnNoteInt(c.BaseNote, c.Chord)
		baseValues = theory.InvertChord(baseValues, c.Inversions)
		octaves := c.Octaves
		values := []int{}
		for octaves >= 1 {
			for _, note := range baseValues {
				values = append(values, note)
			}
			for i, _ := range baseValues {
				baseValues[i] += 12
			}
			octaves--
		}
		return IntArrayIdAutomation(values), nil
	}
	var noteA, octavesA, inversionsA IntAutomation
	if c.BaseNoteAutomation != nil {
		noteA_, err := c.BaseNoteAutomation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("auto_base_note", err)
		}
		noteA = noteA_
	} else {
		noteA = IntIdAutomation(c.BaseNote)
	}
	if c.OctavesAutomation != nil {
		octavesA_, err := c.OctavesAutomation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("auto_octaves", err)
		}
		octavesA = octavesA_
	} else {
		octavesA = IntIdAutomation(c.Octaves)
	}
	if c.InversionsAutomation != nil {
		inversionsA_, err := c.InversionsAutomation.GetAutomation()
		if err != nil {
			return nil, util.WrapError("auto_inversions", err)
		}
		inversionsA = inversionsA_
	} else {
		inversionsA = IntIdAutomation(c.Inversions)
	}
	return Chord(c.Chord, noteA, octavesA, inversionsA), nil
}

type IntArrayTransposeDef struct {
	Transpose             int `json:"value" yaml:"value"`
	IntArrayAutomationDef `json:",inline" yaml:",inline"`
}

type IntArrayIndexDef struct {
	Index                 int            `json:"value" yaml:"value"`
	AutoIndex             *AutomationDef `json:"auto_value" yaml:"auto_value"`
	IntArrayAutomationDef `json:",inline" yaml:",inline"`
}

type IntArrayConstantDef struct {
	Value []int `json:"value" yaml:"value"`
}
