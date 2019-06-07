import { ChannelSideBar } from './channel_sidebar.js';
import { RegisterSideBar } from './register_sidebar.js';
import { ChannelSequenceTracks, RegisterSequenceTracks } from './sequence_tracks.js';

export class BaseTrack {
  constructor(unit) {
    this.unit = unit;
    this.padding = 0;
    this.height = 75;
    this.panelWidth = 90;

    this.sideBar = null;
    this.sequenceTracks = null;
  }

  draw(app) {
    var colorOffset = '#ddd'; 
    this.sideBar.draw(app, colorOffset);
    this.sequenceTracks.draw(app, colorOffset);
  }

  handleMouseDown(app, x, y) {
    if (this.sideBar.handleMouseDown(app, x, y)) {
      return this.sideBar;
    } else if (this.sequenceTracks.handleMouseDown(app, x, y)) {
      return this.sequenceTracks;
    } 
    return false;
  }
  initialiseSequenceTracks(defs) {
    this.sequenceTracks.initialiseSequenceTracks(defs);
  }
  compile() {
    return this.sequenceTracks.compile();
  }
}
export class ChannelTrack extends BaseTrack {
  constructor(channel, app) {
    super(channel);
    this.sideBar = new ChannelSideBar(channel, app, this.padding, this.panelWidth, this.height);
    this.sequenceTracks = new ChannelSequenceTracks(channel, app, this.padding, this.panelWidth, this.height);
  }
}
export class RegisterTrack extends BaseTrack {
  constructor(register, app) {
    super(register);
    this.sideBar = new RegisterSideBar(register, app, this.padding, this.panelWidth, this.height);
    this.sequenceTracks = new RegisterSequenceTracks(register, app, this.padding, this.panelWidth, this.height);
  }
}
