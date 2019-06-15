package server

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/bspaans/bleep/controller"
	"github.com/bspaans/bleep/sequencer/definitions"
	"github.com/gorilla/websocket"
)

type MessageType string

const (
	Test            MessageType = "test"
	Status          MessageType = "status"
	ChannelDef      MessageType = "channel_def"
	SequencerDef    MessageType = "sequencer_def"
	SetSequencerDef MessageType = "set_sequencer_def"
	Play            MessageType = "play"
	Stop            MessageType = "stop"
	Pause           MessageType = "pause"
	Rewind          MessageType = "rewind"
	Load            MessageType = "load"
	ForceReload     MessageType = "force_reload"
)

type ResponseMessage struct {
	Type MessageType `json:"type"`
	Data interface{} `json:"data"`
}

type StatusResponse struct {
	BPM float64
}

type Message struct {
	Type MessageType `json:"type"`
	Data interface{} `json:"data"`
}

func NewMessage(ty MessageType, data interface{}) *Message {
	return &Message{
		Type: ty,
		Data: data,
	}
}

func (m *Message) Handle(ctrl *controller.Controller, conn *websocket.Conn) {
	log.Println("handling", m.Type, "message")
	if m.Type == Test {
		m.send(conn, m.Type, "Test")
	}

	if ctrl.Sequencer == nil {
		log.Println("No sequencer.")
		return
	}
	if m.Type == Status {
		m.send(conn, m.Type, &StatusResponse{
			BPM: ctrl.Sequencer.Status.BPM,
		})
	} else if m.Type == ChannelDef {
		m.send(conn, m.Type, ctrl.Sequencer.InitialChannelSetup)
	} else if m.Type == Play {
		ctrl.Sequencer.StartPlaying()
	} else if m.Type == Pause {
		ctrl.Sequencer.PausePlaying()
	} else if m.Type == Stop {
		ctrl.Sequencer.StopPlaying()
	} else if m.Type == Rewind {
		ctrl.Sequencer.Rewind()
	} else if m.Type == Load {
		ctrl.Sequencer.LoadFile(m.Data.(string))
	} else if m.Type == SequencerDef {
		if ctrl.Sequencer.SequencerDef != nil {
			m.send(conn, m.Type, ctrl.Sequencer.SequencerDef.Sequences)
		} else {
			m.send(conn, m.Type, nil)
		}
	} else if m.Type == SetSequencerDef {
		def := definitions.SequencerDef{}
		if err := json.Unmarshal([]byte(m.Data.(string)), &def); err != nil {
			fmt.Println("Invalid sequencer_def:", err.Error())
		}
		fmt.Println("Received sequencer def:")
		fmt.Println(def.YAML())
		ctrl.Sequencer.SetSequencerDef(&def)
	}
}

func (m *Message) send(conn *websocket.Conn, typ MessageType, v interface{}) {
	msg, err := json.Marshal(&ResponseMessage{
		Type: typ,
		Data: v,
	})
	if err == nil {
		conn.WriteMessage(websocket.TextMessage, msg)
	}
}

func (m *Message) Send(conn *websocket.Conn) {
	m.send(conn, m.Type, m.Data)
}
