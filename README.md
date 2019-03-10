# bs8bs

Hobby 8bit synthesizer that can be used as a virtual MIDI device.

This is just in: it also does 16 bit now.

I don't really know what I'm doing, but it's #instructive.

Shabby demo songs [here](https://github.com/bspaans/bs8bs/raw/master/demo/demo.mp3)
and [here](https://github.com/bspaans/bs8bs/raw/master/demo/demo2.mp3) 

## Features

Things that generates waveforms (`generators/`):

* Sine wave oscillator
* Square wave oscillator
* Sawtooth wave oscillator
* Triangle wave oscillator
* White noise generator
* .wav playback

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

And then you'll be able to connect to it from other programs that can output
MIDI.

## Known issues

* Minor clicks on note transitions
* The drums sound like hot garbage
