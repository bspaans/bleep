package server

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/bspaans/bleep/channels"
	"github.com/bspaans/bleep/controller"
	"github.com/gorilla/websocket"
)

type MessageType string

const (
	Test       MessageType = "test"
	Status     MessageType = "status"
	ChannelDef MessageType = "channel_def"
)

type Message struct {
	Type MessageType `json:"type"`
	Data string      `json:"data"`
}

type ResponseMessage struct {
	Type MessageType `json:"type"`
	Data interface{} `json:"data"`
}

type StatusResponse struct {
	BPM float64
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
	}
}

func (m *Message) send(conn *websocket.Conn, typ MessageType, v interface{}) {
	mem, _ := json.Marshal(v.([]*channels.ChannelDef))
	fmt.Println(string(mem))
	msg, err := json.Marshal(&ResponseMessage{
		Type: typ,
		Data: v,
	})
	if err == nil {
		conn.WriteMessage(websocket.TextMessage, msg)
	}
}
