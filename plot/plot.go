package plot

import (
	"fmt"
	"image/color"
	"log"
	"math/cmplx"
	"os"

	"github.com/bspaans/bleep/audio"
	"github.com/bspaans/bleep/filters"
	"github.com/bspaans/bleep/generators"
	"gonum.org/v1/plot"
	"gonum.org/v1/plot/palette"
	"gonum.org/v1/plot/plotter"
	"gonum.org/v1/plot/vg"
	"gonum.org/v1/plot/vg/draw"
	"gonum.org/v1/plot/vg/vgimg"
)

// This is a debugging tool
//
func DoPlots(cfg *audio.AudioConfig) {
	wav, _ := generators.NewWavGenerator("examples/clap.wav", 1.0)
	wav2, _ := generators.NewWavGenerator("examples/piano.wav", 1.0)
	generators := []generators.Generator{
		generators.NewSineWaveOscillator(),
		generators.NewSquareWaveOscillator(),
		generators.NewSawtoothWaveOscillator(),
		generators.NewTriangleWaveOscillator(),
		generators.NewWhiteNoiseGenerator(),
		generators.NewPulseWaveGenerator(0.25, nil, 0.0),
		wav,
		wav2,
	}
	files := []string{
		"demo/plots/sine",
		"demo/plots/square",
		"demo/plots/saw",
		"demo/plots/triangle",
		"demo/plots/white_noise",
		"demo/plots/pulse_wave",
		"demo/plots/wav",
		"demo/plots/wav_piano",
	}
	for i, g := range generators {
		PlotGenerator(cfg, g, files[i]+".png")
	}
	for i, g := range generators {
		PlotSpectrogram(cfg, g, files[i]+"_spectrogram.png")
	}
}

func PlotGenerator(cfg *audio.AudioConfig, g generators.Generator, file string) {
	g.SetPitch(110.0)
	values := g.GetSamples(cfg, 4000)
	PlotValues(values, file)
}

func PlotSpectrogram(cfg *audio.AudioConfig, g generators.Generator, file string) {
	cfg.Stereo = false
	g.SetPitch(0.0)
	g.SetPitch(440.0)
	values := g.GetSamples(cfg, cfg.SampleRate)
	frames := filters.GetSpectralFrames(cfg, values, 1024, 256)
	if err := PlotSpectralFrames(frames, file); err != nil {
		fmt.Println("error:", err.Error())
	}
}

type SpectralGrid struct {
	Frames      []*filters.SpectralFrame
	FrameLength int
	Bandwidth   float64
	Duration    float64
}

func (s SpectralGrid) Dims() (c, r int) {
	c = len(s.Frames)
	r = s.FrameLength / 16
	return c, r
}

func (s SpectralGrid) Z(c, r int) float64 { return cmplx.Abs(complex128(s.Frames[c].Frame[r])) }
func (s SpectralGrid) X(c int) float64    { return float64(c) * s.Duration }
func (s SpectralGrid) Y(r int) float64    { return float64(r) * s.Bandwidth }

func PlotSpectralFrames(v []*filters.SpectralFrame, file string) error {
	grid := SpectralGrid{
		Frames:      v,
		FrameLength: v[0].Length,
		Bandwidth:   v[0].Bandwidth,
		Duration:    v[0].DurationWithoutOverlap,
	}
	pal := palette.Heat(16, 1)
	h := plotter.NewHeatMap(grid, pal)
	p, err := plot.New()
	if err != nil {
		return err
	}
	p.Add(h)
	err = p.Save(vg.Points(400), vg.Points(300), file)
	if err == nil {
		fmt.Println("Written", file)
	}
	return err
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
