// +build !linux, !windows, cgo darwin
package midi

import (
	"fmt"

	"github.com/bspaans/bleep/synth"
)

func StartVirtualMIDIDevice(s chan *synth.Event) {
	fmt.Println("Virtual MIDI device not supported in CGO builds on MacOS.")
}
