package server

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/bspaans/bleep/controller"
	"github.com/bspaans/bleep/ui"
	"github.com/gorilla/websocket"
)

type Server struct {
	Controller *controller.Controller
	Clients    []*websocket.Conn
}

func NewServer() *Server {
	return &Server{}
}

func (s *Server) Start(ctrl *controller.Controller) *Server {
	addr := "localhost:10000"
	fmt.Println("Starting web server on", addr)
	s.Controller = ctrl
	http.HandleFunc("/ws", s.Websocket)
	http.HandleFunc("/bleep.js", s.serveFile("ui/web/bleep.js", "text/javascript"))
	http.HandleFunc("/", s.serveFile("ui/web/index.html", "text/html"))
	go http.ListenAndServe(addr, nil)
	return s
}

func (s *Server) Websocket(w http.ResponseWriter, r *http.Request) {
	var upgrader = websocket.Upgrader{} // use default options
	upgrader.CheckOrigin = func(r *http.Request) bool {
		fmt.Println(r)
		return true
	}
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	s.Clients = append(s.Clients, c)
	defer func() {
		// Remove from clients
		ix := -1
		for i, client := range s.Clients {
			if client == c {
				ix = i
			}
		}
		s.Clients[ix] = s.Clients[len(s.Clients)-1]
		s.Clients = s.Clients[:len(s.Clients)-1]
		c.Close()
	}()
	for {
		_, message, err := c.ReadMessage()
		log.Printf("recv: %s", message)
		if err == nil {
			var msg Message
			if err := json.Unmarshal(message, &msg); err == nil {
				msg.Handle(s.Controller, c)
			} else {
				log.Println("unmarshal error", err)
			}
		} else {
			log.Println("read error:", err)
			break
		}
	}
}

func (s *Server) Broadcast(msg *Message) {
	for _, client := range s.Clients {
		msg.Send(client)
	}
}

func (s *Server) HandleEvent(ev *ui.UIEvent) {
	if ev.Type == ui.ForceReloadEvent {
		msg := NewMessage(ForceReload, "")
		s.Broadcast(msg)
	}
}

func (s *Server) serveFile(file, contentType string) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		bytes, err := ioutil.ReadFile(file)
		if err != nil {
			return
		}
		rw.Header().Set("Content-Type", contentType)
		rw.Write(bytes)
	}
}
