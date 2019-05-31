import { ChannelSideBar } from './channel_sidebar.js';
import { SequenceTracks } from './sequence_tracks.js';

export class Track {
  constructor(channel, app) {
    this.channel = channel;
    this.padding = 0;
    this.height = 75;
    this.channelWidth = 90;
    this.selected = null;
    this.app = app;
    this.sideBar = new ChannelSideBar(channel, app, this.padding, this.channelWidth, this.height);
    this.sequenceTracks = new SequenceTracks(channel, app, this.padding, this.channelWidth, this.height);
  }

  draw(app) {
    var colorOffset = this.channel.channelNr * 40;
    this.sideBar.draw(app, colorOffset);
    this.sequenceTracks.draw(app, colorOffset);
  }

  handleMouseDown(app, x, y) {
    this.selected = null;
    if (this.sideBar.handleMouseDown(app, x, y)) {
      return this.sideBar;
    } else if (this.sequenceTracks.handleMouseDown(app, x, y)) {
      return this.sequenceTracks;
    } 
    return false;
  }
}
