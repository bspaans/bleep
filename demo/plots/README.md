# Example plots

## Sine 

![Sine wave](./sine.png)

```
import (
    "github.com/bspaans/bleep/generators"
)

func Main() {
    g := generators.NewSineWaveGenerator()
    g.GetSamples(cfg, 300)
}

```

## Square 

![Square wave](./square.png)

## Triangle 

![Triangle wave](./triangle.png)

## Saw 

![Saw wave](./saw.png)

## White noise 

![White noise](./white_noise.png)

## .wav sample (clap.wav)

![.wav sample](./wav.png)
