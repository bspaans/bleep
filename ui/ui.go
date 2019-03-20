package ui

type UI interface {
	HandleEvent(ev *UIEvent)
}
