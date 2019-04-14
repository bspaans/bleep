# Example plots

## Sine 

![Sine wave](./sine.png)

```
package main 

import (
    "github.com/bspaans/bleep/audio"
    "github.com/bspaans/bleep/generators"
)

func main() {
    cfg := audio.NewAudioConfig()
    g := generators.NewSineWaveOscillator()
    g.SetPitch(110.0)
    g.GetSamples(cfg, 4000)
}

```

![Sine wave spectrogram 440Hz](./sine_spectrogram.png)

## Square 

![Square wave](./square.png)


```
package main 

import (
    "github.com/bspaans/bleep/audio"
    "github.com/bspaans/bleep/generators"
)

func main() {
    cfg := audio.NewAudioConfig()
    g := generators.NewSquareWaveOscillator()
    g.SetPitch(110.0)
    g.GetSamples(cfg, 4000)
}


```

![Square wave spectrogram 440Hz](./square_spectrogram.png)

## Triangle 

![Triangle wave](./triangle.png)

```
package main 

import (
    "github.com/bspaans/bleep/audio"
    "github.com/bspaans/bleep/generators"
)

func main() {
    cfg := audio.NewAudioConfig()
    g := generators.NewTriangleWaveOscillator()
    g.SetPitch(110.0)
    g.GetSamples(cfg, 4000)
}

```

![Triangle wave spectrogram 440Hz](./triangle_spectrogram.png)

## Saw 

![Saw wave](./saw.png)

```
package main 

import (
    "github.com/bspaans/bleep/audio"
    "github.com/bspaans/bleep/generators"
)

func main() {
    cfg := audio.NewAudioConfig()
    g := generators.NewSawtoothWaveOscillator()
    g.SetPitch(110.0)
    g.GetSamples(cfg, 4000)
}

```

![Saw wave spectrogram 440Hz](./saw_spectrogram.png)

## White noise 

![White noise](./white_noise.png)

```
package main 

import (
    "github.com/bspaans/bleep/audio"
    "github.com/bspaans/bleep/generators"
)

func main() {
    cfg := audio.NewAudioConfig()
    g := generators.NewWhiteNoiseGenerator()
    g.GetSamples(cfg, 4000)
}

```

![White noise spectrogram](./white_noise_spectrogram.png)

## .wav sample (clap.wav)

![.wav sample](./wav.png)


```
package main 

import (
    "github.com/bspaans/bleep/audio"
    "github.com/bspaans/bleep/generators"
)

func main() {
    cfg := audio.NewAudioConfig()
    g := generators.NewWavGenerator("examples/test.wav")
    g.GetSamples(cfg, 4000)
}

```

![.wav sample spectrogram](./wav_spectrogram.png)

## .wav sample (piano.wav)

![.wav sample](./wav_piano.png)

![.wav sample spectrogram](./wav_piano_spectrogram.png)

## Pulse (25% duty cycle)

![Pulse wave](./pulse_wave.png)


```
package main 

import (
    "github.com/bspaans/bleep/audio"
    "github.com/bspaans/bleep/generators"
)

func main() {
    cfg := audio.NewAudioConfig()
    g := generators.NewPulseWaveGenerator(0.25, nil, 0.0)
    g.GetSamples(cfg, 4000)
}

```

![Pulse wave spectrogram 440Hz](./pulse_wave_spectrogram.png)

