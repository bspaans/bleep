# bs8bs

Hobby 8bit synthesizer that can be used as a virtual MIDI device.

I don't really know what I'm doing, but it's #instructive.

Shabby demo song [here](https://github.com/bspaans/bs8bs/raw/master/demo/demo.mp3)

## Features

Things that generates waveforms (`generators/`):

* Sine wave oscillator
* Square wave oscillator
* Sawtooth wave oscillator
* Triangle wave oscillator
* White noise generator

Things that wrap things that generate waveforms (`generators/derived/`):

* ADSHR envelopes (attack, decay, sustain, hold, release)
* Transposing generator
* Combining multiple generators into one
* Harmonics generator
* A filtered generator (see below)

Things that filter (`filters/`):

* Overdrive filter
* Delay filter
* Low pass filter

Things that mix: 

* Channels (`channels/`)
* Mixer (`synth/`)

Things that MIDI (`midi/`):

* MIDI note on, note off, program select, pitch bend
* Basic percussion channel
* Registers as virtual midi device

Things that output:

* `.wav` output 
* "Realtime" PortAudio output


## Usage

This thing uses Go modules and requires Go 1.11+

```
go get -u github.com/bspaans/bs8bs
bs8bs
```

And then you'll be able to connect to it from other programs that can output
MIDI.

## Known issues

* Some occasional buffering problems during realtime playback
* Minor clicks on note transitions
* The drums sound like hot garbage
