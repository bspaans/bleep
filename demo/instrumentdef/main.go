package main

import (
	"fmt"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/instruments"
	"github.com/bspaans/bleep/sinks"
	"github.com/bspaans/bleep/synth"
)

// InstrumentDefs allow us to express generators and filters as data
// instead of code. This means we can load them from disk or a web
// request for example. As you will see the data structures are a
// bit unwieldy to produce by hand, but parsing from JSON works very
// nicely and is even shorter than expressing the generator directly
// in code.
//
// The downside to this design is that when we add a new filter or
// generator, we also need to add a data representation, but this is
// just part and parcel of data exchange. The upside is that we can
// load, save and exchange instrument files in an somewhat
// implementation-agnostic format.
func main() {
	cfg := audio.NewAudioConfig()
	ctx, err := instruments.NewContext("", cfg)
	if err != nil {
		panic(err)
	}

	attack := 0.5
	def1 := instruments.InstrumentDef{
		Name: "My instrument",
		GeneratorDef: instruments.GeneratorDef{
			Sine: &instruments.GeneratorOptionsDef{
				Attack: &attack,
			},
		},
	}
	// A more realistic (but not even that realistic) example
	// looks a lot more unwieldy:
	def2 := instruments.InstrumentDef{
		Name: "My filtered instrument",
		GeneratorDef: instruments.GeneratorDef{
			Filter: &instruments.FilterDef{
				FilterOptionsDef: instruments.FilterOptionsDef{
					Flanger: &instruments.FlangerOptionsDef{
						Time:   0.5,
						Factor: 0.2,
						Rate:   0.5,
					},
				},
				GeneratorDef: instruments.GeneratorDef{
					Square: &instruments.GeneratorOptionsDef{
						Attack: &attack,
					},
				},
			},
		},
	}
	// But JSON loading is goated
	def3, err := instruments.FromJSON(`{"sine": {"attack": 0.2}}`, ctx)
	if err != nil {
		panic(err)
	}

	mixer := synth.NewMixer()
	mixer.SetInstrument(cfg, 0, def1.Instrument(ctx))
	mixer.SetInstrument(cfg, 1, def2.Instrument(ctx))
	mixer.SetInstrument(cfg, 2, def3.Instrument(ctx))

	mixer.NoteOn(0, 60, 1.0)
	mixer.NoteOn(0, 64, 1.0)
	mixer.NoteOn(0, 67, 1.0)
	mixer.NoteOn(1, 72, 1.0)
	mixer.NoteOn(2, 84, 1.0)

	samples := mixer.GetSamples(cfg, 44000)

	if err := sinks.WriteSamplesToWavFile(cfg, samples, "test.wav"); err != nil {
		fmt.Println("Failed to write wav file:", err.Error())
	}
}
