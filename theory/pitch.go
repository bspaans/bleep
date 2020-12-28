package theory

import "math"

// ISO16PitchValue Is standartized frequency of A4 note.
//
// This value referenced from ISO 16:1975 https://www.iso.org/standard/3601.html
const ISO16PitchValue = 440.0

// MidiNoteOffset is offset of all tones.
// why 20? you don't belive it: midi starts from 21, and minimum int for note to pitch is 1
//
// referenced http://newt.phys.unsw.edu.au/jw/notes.html
const MidiNoteOffset = 20

// precalculated semitones count of A4 key. all other semitones are calculating by accending or descending
// semitones
const a4NoteSemitones = 49
const twelthRootOfTwo = 1.0594630943593 // sqrt(12, 2) // TODO: find more accurate value, just for fun

func NoteToPitch(n int) float64 {
	// formula got from https://en.wikipedia.org/wiki/Piano_key_frequencies
	return math.Pow(twelthRootOfTwo, float64(n-a4NoteSemitones)) * ISO16PitchValue
}
