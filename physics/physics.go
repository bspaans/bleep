// Physical modelling
package main

import (
	"fmt"
	"image/color"
	"log"
	"math"
	"os"

	"gonum.org/v1/plot"
	"gonum.org/v1/plot/plotter"
	"gonum.org/v1/plot/vg"
	"gonum.org/v1/plot/vg/draw"
	"gonum.org/v1/plot/vg/vgimg"
)

const SoundSpeed = 343.0

// Returns the "height" at time t for a ball bouncing from the ground (i.e.
// 0.0) with an initialSpeed and gravity. Adjusted for sampleRate (e.g.
// result[sampleRate] is the height after one second). Only returns the values
// for a single bounce. Use MultipleBounces with a decay of 1.0
func SingleBounce(sampleRate int, initialSpeed, gravity float64) []float64 {
	bounceEvery := 2.0 * initialSpeed / gravity
	length := int(bounceEvery * float64(sampleRate))
	result := make([]float64, length)

	for i := 0; i < length; i++ {
		t := float64(i) / float64(sampleRate)
		height := (initialSpeed * t) - (0.5 * gravity * t * t)
		result[i] = height
	}
	return result
}

func MultipleBounces(sampleRate, bounces int, initialSpeed, gravity, decay float64, halveFirst bool) []float64 {
	result := []float64{}
	for i := 0; i < bounces; i++ {
		bounce := SingleBounce(sampleRate, initialSpeed, gravity)
		if i == 0 && halveFirst {
			result = append(result, bounce[len(bounce)/2:]...)
		} else {
			result = append(result, bounce...)
		}
		initialSpeed *= decay
	}
	return result
}

func MultipleBouncesOfLength(sampleRate, bounces int, initialBounceLength, gravity, decay float64, halveFirst bool) []float64 {
	initialSpeed := initialBounceLength * gravity / 2.0
	return MultipleBounces(sampleRate, bounces, initialSpeed, gravity, decay, halveFirst)

}

func ScaleFloats(floats []float64, min, max float64) []float64 {
	foundMin, foundMax := math.MaxFloat64, 0.0
	for _, f := range floats {
		if f < foundMin {
			foundMin = f
		}
		if f > foundMax {
			foundMax = f
		}
	}

	// Scaling from foundMin - foundMax to min - max
	foundRange := foundMax - foundMin
	newRange := max - min
	scale := newRange / foundRange

	for i, f := range floats {
		floats[i] = f*scale + min
	}
	return floats
}

func Spring() {

}

func main() {
	fmt.Println("alright")
	values := MultipleBouncesOfLength(44100, 6, 1.0, 9.8, 0.7, false)
	PlotValues(values, "test.png")
	values = MultipleBouncesOfLength(44100, 10, 0.2, 1000.0, 0.7, true)
	ScaleFloats(values, 1000.0, 15000.0)
	PlotValues(values, "test2.png")
	values = MultipleBounces(44100, 10, SoundSpeed, 9.8, 0.7, true)
	ScaleFloats(values, 1000.0, 15000.0)
	PlotValues(values, "test3.png")

}

func PlotValues(v []float64, file string) error {
	n := len(v)
	dataLeft := make(plotter.XYs, n)
	for i := 0; i < n; i++ {
		dataLeft[i].X = float64(i)
		dataLeft[i].Y = v[i]
	}

	img := vgimg.New(vg.Points(400), vg.Points(300))
	pLeft := TimeSeries(&dataLeft)
	tiles := draw.Tiles{
		Rows:      1,
		Cols:      1,
		PadX:      vg.Millimeter,
		PadY:      vg.Millimeter,
		PadTop:    vg.Points(2),
		PadBottom: vg.Points(2),
		PadLeft:   vg.Points(2),
		PadRight:  vg.Points(2),
	}
	plots := [][]*plot.Plot{
		[]*plot.Plot{pLeft},
	}
	dc := draw.New(img)
	canvases := plot.Align(plots, tiles, dc)
	for j := 0; j < 1; j++ {
		for i := 0; i < 1; i++ {
			if plots[j][i] != nil {
				plots[j][i].Draw(canvases[j][i])
			}
		}
	}
	return SaveCanvas(img, file)
}

func SaveCanvas(canvas *vgimg.Canvas, file string) error {
	w, err := os.Create(file)
	if err != nil {
		panic(err)
	}

	png := vgimg.PngCanvas{Canvas: canvas}
	if _, err := png.WriteTo(w); err != nil {
		panic(err)
	}
	fmt.Println("Written", file)
	return nil

}

func TimeSeries(data *plotter.XYs) *plot.Plot {

	p, err := plot.New()
	if err != nil {
		log.Panic(err)
	}
	p.BackgroundColor = color.RGBA{R: 0xff, G: 0xff, B: 0xff, A: 255}

	grid := plotter.NewGrid()
	grid.Vertical.Color = color.RGBA{R: 0x16, G: 0x2c, B: 0x9a, A: 255}
	grid.Horizontal.Color = color.RGBA{R: 0x16, G: 0x2c, B: 0x9a, A: 255}
	p.Add(grid)
	points, err := plotter.NewScatter(data)
	if err != nil {
		log.Panic(err)
	}
	p.Y.Color = color.RGBA{R: 255, G: 255, B: 255, A: 255}
	p.Y.Tick.Color = color.RGBA{R: 0x16, G: 0x2c, B: 0x9a, A: 255}
	p.X.Tick.Color = color.RGBA{R: 0x16, G: 0x2c, B: 0x9a, A: 255}
	p.Y.Padding = 0
	p.Y.Width = 0
	p.X.Padding = 0
	p.X.Width = 0
	points.Shape = draw.CircleGlyph{}
	points.GlyphStyle.Radius = 1
	points.Color = color.RGBA{R: 0x16, G: 0x2c, B: 0x9a, A: 255}

	p.Add(points)
	return p
}
