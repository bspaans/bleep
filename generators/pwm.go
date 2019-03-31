package generators

import (
	"github.com/bspaans/bleep/audio"
)

// Duty cycle should be between 0.0 and 1.0
//
func NewPulseWaveGenerator(dutyCycle float64, dutyCycleModulator Generator, dutyCycleModulatorDepth float64) Generator {
	g := NewBaseGenerator()
	g.GetSamplesFunc = func(cfg *audio.AudioConfig, n int) []float64 {

		result := GetEmptySampleArray(cfg, n)
		if g.Pitch == 0.0 {
			return result
		}
		pitch := g.GetPitch()
		waveLength := (float64(cfg.SampleRate)) / pitch
		dutyCycles := []float64{}
		if dutyCycleModulator != nil {
			dutyCycles = dutyCycleModulator.GetSamples(cfg, n)
		}

		for i := 0; i < n; i++ {

			cycle := dutyCycle
			if dutyCycleModulator != nil {
				cycle = dutyCycle + (dutyCycles[i] * dutyCycleModulatorDepth)
			}
			flipEvery := waveLength * cycle
			v := 1.0
			if g.Phase%int(waveLength) > int(flipEvery) {
				v = -1.0
			}
			v *= g.Gain

			SetResult(cfg, result, i, v)
			g.IncrementPhase(int(flipEvery))
		}
		return result
	}
	return g
}
