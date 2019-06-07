export { ChannelTrack, RegisterTrack } from './track.js';
import { Button } from '../components/';
import { ChannelTrack, RegisterTrack } from './track.js';
import { Channel, Register } from '../model/';

export class TimelineEditor {
  constructor(tracks, app) {
    this.tracks = tracks;
    this.app = app;
    var buttonDefs = [
        {label: "CHAN", colour: 'ModulePulse', onclick: this.addChannelTrack},
        {label: "REG", colour: 'ModuleInt', onclick: this.addRegisterTrack},
        {label: "FLT", colour: 'ModuleFloat', onclick: this.addFloatRegisterTrack},
        {label: "ARR", colour: 'ModuleIntArray', onclick: this.addIntArrayRegisterTrack},
    ];
    this.buttons = [];
    this.addButtonDefinitions(buttonDefs);
  }
  addChannelTrack() {
    var nextChannel = 0;
    for (var tr of this.tracks) {
      if (tr instanceof ChannelTrack) {
        if (tr.unit.channelNr >= nextChannel) {
          nextChannel = tr.unit.channelNr + 1;
        }
      }
    }
    var ch = new Channel(nextChannel);
    var track = new ChannelTrack(ch, this.app);
    this.app.tracks.push(track);
    this.app.draw()
  }
  addRegisterTrack() {
    this._addRegisterTrack("register");
  }
  addFloatRegisterTrack() {
    this._addRegisterTrack("float_register");
  }
  addIntArrayRegisterTrack() {
    this._addRegisterTrack("array_register");
  }
  _addRegisterTrack(type) {
    var nextRegister = 0;
    for (var tr of this.tracks) {
      if (tr instanceof RegisterTrack) {
        if (tr.unit.type == type && tr.unit.register >= nextRegister) {
          nextRegister = tr.unit.register + 1;
        }
      }
    }
    var ch = new Register(nextRegister, type);
    var track = new RegisterTrack(ch, this.app);
    this.app.tracks.push(track);
    this.app.draw()
  }
  addButtonDefinitions(buttonDefs) {
    var x = 0;
    var prev = null;
    var padding = 0;
    var groupPadding = 10;
    for (var def of buttonDefs) {
      var b = new Button(x, this.app.theme.padding, def.onclick.bind(this), def.label);
      b.colour = this.app.theme.colours[def.colour] || this.app.theme.colours.ModuleGenerator;
      this.buttons.push(b);
      if (prev && prev.colour != def.colour) {
        x += groupPadding;
        b.x += groupPadding;
      }
      x += b.w + padding;
      prev = def;
    }

  }
  handleMouseDown(app, x, y) {
    var i = 0;
    for (var b of this.buttons) {
      var v = b.handleMouseDown(app, x, y);
      if (v) {
        return v;
      }
    }
    for (var e of this.tracks) {
      var v = e.handleMouseDown(app, x, y - (25 + i * (e.height + e.padding * 2)));
      if (v) {
        return v;
      }
      i++;
    }
  }
  draw(app) {
    app.ctx.save();
    var i = 0;

    // Draw the buttons 
    for (var b of this.buttons) {
      b.draw(app);
    }

    // Draw the tracks
    for (var e of this.tracks) {
      app.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translate
      app.ctx.translate(0, 25 + i * (e.height + e.padding * 2));
      e.draw(app);
      i++;
    }
    app.ctx.restore();
  }
}
