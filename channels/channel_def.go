package channels

type ChannelsDef struct {
	Channels []*ChannelDef
}

type ChannelDef struct {
	Channel    int
	Instrument int
	Bank       int
	Reverb     int
	Tremelo    int
	Volume     int
	Panning    int
}
