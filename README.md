# bleep

[![Go Report Card](https://goreportcard.com/badge/github.com/bspaans/bleep)](https://goreportcard.com/report/github.com/bspaans/bleep)
[![Documentation](http://img.shields.io/badge/godoc-reference-5272B4.svg?style=flat-square)](http://godoc.org/github.com/bspaans/bleep)

Hobby 8bit/16bit synthesizer/sequencer that can also be used as a virtual MIDI device.

![Sine wave](/demo/plots/sine.png)

I don't really have any goals for this project, but it's #instructive.

## Demo songs / Progress

Old examples first:

1. [basic wave forms and delay](https://github.com/bspaans/bleep/raw/master/demo/demo.mp3)
2. [the shabbiest percussion channel](https://github.com/bspaans/bleep/raw/master/demo/demo2.mp3)
3. [stereo, 16bit, tremelo](https://github.com/bspaans/bleep/raw/master/demo/demo3.mp3)
4. [granular synthesis, sequencer, automations, euclidian rhythms](https://github.com/bspaans/bleep/raw/master/demo/demo4.mp3)

## Features

Things that generate waveforms (`generators/`):

* Sine wave oscillator
* Square wave oscillator
* Sawtooth wave oscillator
* Triangle wave oscillator
* Pulse wave oscillator
* White noise generator
* .wav playback
* Grain generator
  * Configurable grain size
  * Configurable birth rate
  * Configurable density/nr of generators
  * Configurable speed (=position in sample)
  * Position randomization
  * Windowing functions
  * TODO: pitch control (= grain playback speed)


Things that wrap things that generate waveforms (`generators/derived/`):

* ADSHR envelopes (attack, decay, sustain, hold, release)
* Transposing generator
* Combining multiple generators into one
* Harmonics generator
* Vocoder
* A filtered generator (see below)

Things that filter (`filters/`):

* Overdrive filter
* Distortion filter
* Delay filter
* Flanger filter
* Tremelo filter
* First order low pass filter
* Convolution filter
* Low Pass Convolution filter
* High Pass Convolution filter
* Band Pass Convolution filter

Things that mix:

* Channels (`channels/`)
* Mixer (`synth/`)

Things that control things that mix:

* Sequencer (`sequencer/`)
    * Automations

Things that MIDI (`midi/`):

* MIDI note on, note off, program select, pitch bend
* Basic percussion channel
* Registers as virtual midi device

Things that output:

* `.wav` output (`--record`)
* "Realtime" PortAudio output
* Mono or stereo


## Usage

Bleep uses Go modules and requires Go 1.11+

```
git clone github.com/bspaans/bleep
cd bleep
go run main.go
```

Use `--help` to see the various options and modes.

### Run sequencer patterns

`go run main.go --sequencer examples/sequencer_1.yaml`

### Change instruments banks on sequencer patterns

`go run main.go --instruments examples/bank.yaml --percussion examples/percussion_bank.yaml --sequencer examples/sequencer_1.yaml`

### Record sequencer patterns

`go run main.go --sequencer examples/sequencer_1.yaml --record output.wav`

### Register virtual midi device

`go run main.go --midi`

### Change instruments banks for virtual midi device

`go run main.go --instruments examples/bank.yaml --percussion examples/percussion_bank.yaml --midi`

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/bspaans/bleep/blob/master/LICENSE.md) file for details
