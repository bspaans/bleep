package midi

import (
	"fmt"

	"gitlab.com/gomidi/midi"
	"gitlab.com/gomidi/midi/midimessage/channel" // (Channel Messages)
	"gitlab.com/gomidi/midi/midimessage/meta"
	"gitlab.com/gomidi/midi/smf"
	"gitlab.com/gomidi/midi/smf/smfreader"
)

type MidiEvent struct {
	Message midi.Message
	Offset  int
}

func NewMidiEvent(offset int, msg midi.Message) *MidiEvent {
	return &MidiEvent{
		Message: msg,
		Offset:  offset,
	}
}

type ChannelEvents struct {
	Events []*MidiEvent
}

func NewChannelEvents() *ChannelEvents {
	return &ChannelEvents{
		Events: []*MidiEvent{},
	}
}

func (c *ChannelEvents) Add(ev *MidiEvent) {
	c.Events = append(c.Events, ev)
}

type MIDISequences struct {
	Channels     []*ChannelEvents
	GlobalEvents []*MidiEvent
	Length       int
	TimeFormat   smf.MetricTicks
}

func NewMIDISequences() *MIDISequences {
	return &MIDISequences{
		Channels: make([]*ChannelEvents, 16),
	}
}

func (m *MIDISequences) AddChannelEvent(offset, channel int, msg midi.Message) {
	if m.Channels[channel] == nil {
		m.Channels[channel] = NewChannelEvents()
	}
	m.Channels[channel].Add(NewMidiEvent(offset, msg))
}
func (m *MIDISequences) AddGlobalEvent(offset int, msg midi.Message) {
	m.GlobalEvents = append(m.GlobalEvents, NewMidiEvent(offset, msg))
}

type MidiReader struct {
	Offset int
	result *MIDISequences
}

func NewMidiReader() *MidiReader {
	return &MidiReader{
		Offset: 0,
		result: NewMIDISequences(),
	}
}
func (m *MidiReader) add(channel int, msg midi.Message) {
	m.result.AddChannelEvent(m.Offset, channel, msg)
}
func (m *MidiReader) addGlobal(msg midi.Message) {
	m.result.AddGlobalEvent(m.Offset, msg)
}

func (r *MidiReader) callback(rd smf.Reader) {

	var m midi.Message
	var err error

	r.result.TimeFormat = rd.Header().TimeFormat.(smf.MetricTicks)

	for {
		m, err = rd.Read()
		r.Offset += int(rd.Delta())

		// at the end smf.ErrFinished will be returned
		if err != nil {
			break
		}

		// deal with them based on a type switch
		switch msg := m.(type) {
		case channel.NoteOn:
			r.add(int(msg.Channel()), m)
		case channel.NoteOff:
			r.add(int(msg.Channel()), m)
		case channel.NoteOffVelocity:
			r.add(int(msg.Channel()), m)
		case meta.TimeSig:
			r.addGlobal(m)
		case meta.Tempo:
			r.addGlobal(m)
		default:
			if m == meta.EndOfTrack {
				if r.Offset > r.result.Length {
					fmt.Println("end of track; length = ", r.Offset)
					r.result.Length = r.Offset
				}
				r.Offset = 0
			} else {
				fmt.Println("not supported", msg)
			}
		}
	}
}
func (r *MidiReader) ReadFile(file string) (*MIDISequences, error) {
	err := smfreader.ReadFile(file, r.callback)
	return r.result, err
}

func ReadMidiFile(file string) (*MIDISequences, error) {
	return NewMidiReader().ReadFile(file)
}
