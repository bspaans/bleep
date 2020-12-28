package theory

import (
	"fmt"
	"strings"
)

// ToneName is letter of specific tone. Note that ToneName IS NOT name of specific note, cause name of note
// contains info about octave and accidental semitone.
//
// If you want understand what is this numbers, basically this is numbers of white keys on piano.
type ToneName int

const (
	ToneUnknown ToneName = 0
	ToneC       ToneName = 1
	ToneD       ToneName = 3
	ToneE       ToneName = 5
	ToneF       ToneName = 6
	ToneG       ToneName = 8
	ToneA       ToneName = 10
	ToneB       ToneName = 12
)

var ToneNames = []ToneName{ToneC, ToneD, ToneE, ToneF, ToneG, ToneA, ToneB}

func (n ToneName) String() string {
	str, ok := map[ToneName]string{
		ToneC: "C",
		ToneD: "D",
		ToneE: "E",
		ToneF: "F",
		ToneG: "G",
		ToneA: "A",
		ToneB: "B",
	}[n]
	if !ok {
		return "U" // like "Unknown"
	}
	return str
}

func ToneNameFromString(s string) ToneName {
	s = strings.ToUpper(s)
	tone, ok := map[string]ToneName{
		"C": ToneC,
		"D": ToneD,
		"E": ToneE,
		"F": ToneF,
		"G": ToneG,
		"A": ToneA,
		"B": ToneB,
	}[s]
	if !ok {
		return ToneUnknown
	}
	return tone
}

func MustToneNameFromString(s string) ToneName {
	n := ToneNameFromString(s)
	if n == ToneUnknown {
		panic(fmt.Sprintf("'%v' isn't valid name of tone", s))
	}
	return n
}
