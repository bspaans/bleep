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

## Pulse (25% duty cycle)

![Pulse wave](./pulse.png)


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
