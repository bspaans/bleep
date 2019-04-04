package termbox

import (
	"fmt"
	"os"
	"strconv"
	"sync"
	"time"

	"github.com/bspaans/bleep/controller"
	"github.com/bspaans/bleep/ui"
	termui "github.com/gizak/termui/v3"
	"github.com/gizak/termui/v3/widgets"
)

type TermBox struct {
	Started        bool
	mux            sync.Mutex
	ChannelOutputs []float64
}

func NewTermBox() *TermBox {
	return &TermBox{
		Started: false,
	}
}

func (t *TermBox) Start(ctrl *controller.Controller) *TermBox {
	if t.Started {
		fmt.Println("UI already started")
		return t
	}
	t.Started = true
	go t.start(ctrl)
	return t
}

func (t *TermBox) HandleEvent(ev *ui.UIEvent) {
	if ev.Type == ui.ChannelsOutputEvent {
		t.mux.Lock()
		t.ChannelOutputs = ev.Values
		t.mux.Unlock()
	}
}

func (t *TermBox) start(ctrl *controller.Controller) {

	err := termui.Init()
	if err != nil {
		panic(err)
	}
	defer termui.Close()

	events := termui.PollEvents()
	timer := time.Tick(1000 * time.Millisecond)

	for {
		select {
		case ev := <-events:
			switch ev.Type {
			case termui.KeyboardEvent:
				if ev.ID == "<C-c>" {
					fmt.Println("Goodbye!")
					termui.Close()
					ctrl.Quit()
					os.Exit(0)

				} else if ev.ID == "<C-r>" {
					if err := ctrl.ReloadInstrumentBank(); err != nil {
						fmt.Println("Error:", err.Error())
					}
					if err := ctrl.ReloadPercussionBank(); err != nil {
						fmt.Println("Error:", err.Error())
					}
					ctrl.ReloadSequencer()
				} else if ev.ID >= "0" && ev.ID <= "9" {
					i, _ := strconv.Atoi(ev.ID)
					ctrl.ToggleSoloChannel(i)
				} else if ev.ID == "<Right>" {
					ctrl.MoveSequencerForward()
				} else if ev.ID == "<Left>" {
					ctrl.MoveSequencerBackward()
				} else if ev.ID == "<Up>" {
					ctrl.IncreaseSequencerBPM()
				} else if ev.ID == "<Down>" {
					ctrl.DecreaseSequencerBPM()
				} else {
					fmt.Println("No binding for key", ev.ID)
				}
			default:
				fmt.Println("Unknown event", ev)
			}
		case <-timer:
			//go t.draw()
		}
	}
}

func (t *TermBox) draw() {
	termui.TerminalDimensions()
	termui.Clear()
	bc := widgets.NewBarChart()
	bc.Labels = []string{}
	bc.Title = "Channels"
	bc.SetRect(0, 0, len(t.ChannelOutputs)*4+3, 10)
	bc.BarWidth = 3
	t.mux.Lock()
	bc.Data = t.ChannelOutputs
	for i, _ := range t.ChannelOutputs {
		bc.Labels = append(bc.Labels, strconv.Itoa(i))
	}
	t.mux.Unlock()
	termui.Render(bc)
}
