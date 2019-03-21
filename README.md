# bs8bs

Hobby 8bit synthesizer that can be used as a virtual MIDI device.

This is just in: it also does 16 bit now.

I don't really have any goals for this project, but it's #instructive.

## Demo songs / Progress

1. [basic wave forms and delay](https://github.com/bspaans/bs8bs/raw/master/demo/demo.mp3)
2. [the shabbiest percussion channel](https://github.com/bspaans/bs8bs/raw/master/demo/demo2.mp3) 
3. [stereo, 16bit, tremelo](https://github.com/bspaans/bs8bs/raw/master/demo/demo3.mp3) 

## Features

Things that generates waveforms (`generators/`):

* Sine wave oscillator
* Square wave oscillator
* Sawtooth wave oscillator
* Triangle wave oscillator
* White noise generator
* .wav playback
* Grain generator
  * Configurable grain size
  * Configurable birth rate
  * Configurable density/nr of generators
  * Configurable speed (=position in sample)
  * Position randomization
  * TODO: windowing
  * TODO: pitch control (= grain playback speed)

Things that wrap things that generate waveforms (`generators/derived/`):

* ADSHR envelopes (attack, decay, sustain, hold, release)
* Transposing generator
* Combining multiple generators into one
* Harmonics generator
* A filtered generator (see below)

Things that filter (`filters/`):

* Overdrive filter
* Distortion filter
* Delay filter
* Flanger filter
* Tremelo filter
* First order low pass filter

Things that mix: 

* Channels (`channels/`)
* Mixer (`synth/`)

Things that control things that mix:

* Sequencer (work in progress)
    * Automations
* Arpeggiator (work in progress) 

Things that MIDI (`midi/`):

* MIDI note on, note off, program select, pitch bend
* Basic percussion channel
* Registers as virtual midi device

Things that output:

* `.wav` output (`--record`)
* "Realtime" PortAudio output
* Mono or stereo


## Usage

This thing uses Go modules and requires Go 1.11+

```
git clone github.com/bspaans/bs8bs
cd bs8bs
go run main.go
```

Use `--help` to see the various options and modes.

