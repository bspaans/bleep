# bs8bs

Hobby 8bit synthesizer that can be used as a virtual MIDI device.

I don't really know what I'm doing.

## Features

* Sine wave oscillator
* Square wave oscillator
* Sawtooth wave oscillator
* Triangle wave oscillator
* White noise generator
* Overdrive filter
* Delay filter
* ADSR envelopes
* Channels
* Mixer
* Basic percussion channel
* `.wav` output 
* PortAudio output
* MIDI note on, note off, program select, events
* Registers as virtual midi device


## Usage

This thing uses Go modules and requires Go 1.11+

```
go get -u github.com/bspaans/bs8bs
bs8bs
```

And then you'll be able to connect to it from other programs that can output
MIDI.

## Known issues

* Some occasional buffering problems with realtime playback
* Minor clicks on note transitions
* The drums sound like hot garbage
