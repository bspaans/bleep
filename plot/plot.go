package plot

import (
	"fmt"
	"image/color"
	"log"
	"os"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/generators"
	"gonum.org/v1/plot"
	"gonum.org/v1/plot/plotter"
	"gonum.org/v1/plot/vg"
	"gonum.org/v1/plot/vg/draw"
	"gonum.org/v1/plot/vg/vgimg"
)

// This is a debugging tool
//
func DoPlots(cfg *audio.AudioConfig) {
	wav, _ := generators.NewWavGenerator("examples/clap.wav", 1.0)
	generators := []generators.Generator{
		generators.NewSineWaveOscillator(),
		generators.NewSquareWaveOscillator(),
		generators.NewSawtoothWaveOscillator(),
		generators.NewTriangleWaveOscillator(),
		generators.NewWhiteNoiseGenerator(),
		generators.NewPulseWaveGenerator(0.25, nil, 0.0),
		wav,
	}
	files := []string{
		"demo/plots/sine.png",
		"demo/plots/square.png",
		"demo/plots/saw.png",
		"demo/plots/triangle.png",
		"demo/plots/white_noise.png",
		"demo/plots/pulse_wave.png",
		"demo/plots/wav.png",
	}
	for i, g := range generators {
		PlotGenerator(cfg, g, files[i])
	}
}

func PlotGenerator(cfg *audio.AudioConfig, g generators.Generator, file string) {
	g.SetPitch(110.0)
	values := g.GetSamples(cfg, 4000)
	PlotValues(values, file)
}

func PlotValues(v []float64, file string) error {
	n := len(v) / 2
	dataLeft := make(plotter.XYs, n)
	dataRight := make(plotter.XYs, n)
	for i := 0; i < n; i++ {
		dataLeft[i].X = float64(i)
		dataLeft[i].Y = v[i*2]

		dataRight[i].X = float64(i)
		dataRight[i].Y = v[i*2+1]
	}

	img := vgimg.New(vg.Points(400), vg.Points(300))
	pLeft := TimeSeries(&dataLeft)
	pRight := TimeSeries(&dataRight)
	tiles := draw.Tiles{
		Rows:      2,
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
		[]*plot.Plot{pRight},
	}
	dc := draw.New(img)
	canvases := plot.Align(plots, tiles, dc)
	for j := 0; j < 2; j++ {
		for i := 0; i < 1; i++ {
			if plots[j][i] != nil {
				plots[j][i].Draw(canvases[j][i])
			}
		}
	}

	w, err := os.Create(file)
	if err != nil {
		panic(err)
	}

	png := vgimg.PngCanvas{Canvas: img}
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
