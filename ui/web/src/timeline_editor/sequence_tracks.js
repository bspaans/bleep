import { SequenceTrack } from './sequence_track.js';
import { Channel, Register } from '../model/';

export class BaseSequenceTracks {

  constructor(unit, app, padding, panelWidth, height) {
    this.unit = unit;
    this.app = app;
    this.padding = padding;
    this.panelWidth = panelWidth;
    this.height = height;
    this.sequenceTracks = [new SequenceTrack()];
  }

  handleClick() {
    if (this.unit instanceof Channel) {
      this.app.openSequenceEditor(this.sequenceTracks[0].sequence, this.unit.getCompileTarget());
    } else if (this.unit instanceof Register) {
      this.app.openRegisterSequenceEditor(this.sequenceTracks[0].sequence, this.unit);

    }
  }

  draw(app, colorOffset) {
    var height = this.height;
    var padding = this.padding;
    var panelWidth = this.panelWidth;
    var trackWidth = app.canvas.width - panelWidth - padding * 2;

    app.ctx.fillStyle = 'rgb(255, ' + (200 - colorOffset) + ', 0)';
    app.ctx.strokeStyle = 'rgb(40, 40, 40, 1.0)';
    app.ctx.fillRect(padding + panelWidth, padding, trackWidth, height);
    app.ctx.strokeRect(padding + panelWidth, padding, trackWidth, height);

    var trackHeight = height / this.sequenceTracks.length;
    for (var i = 0; i < this.sequenceTracks.length - 1; i++) {
      app.ctx.strokeRect(padding + panelWidth, padding + i * trackHeight, trackWidth, trackHeight);
    }
    for (var i = 0; i < this.sequenceTracks.length; i++) {
      var s = this.sequenceTracks[i];
      s.draw(app, padding + panelWidth, padding + i * trackHeight, trackWidth, trackHeight);
    }

    var showBars = 4;
    var pointsInRange = showBars * 4;
    var scaling = trackWidth / pointsInRange;
    var barWidth = 4 * scaling;
    app.ctx.fillStyle = 'rgb(40, 40, 40)';
    app.ctx.font = '10px mono';
    for (var i = 0; i < showBars; i++) {
      app.ctx.fillText(i + 1, padding + panelWidth + 3 + i * barWidth, padding + height - 3);
    }
  }
  handleMouseDown(app, x, y) {
    var path = new Path2D();
    var width = app.canvas.width - this.padding * 2;
    path.rect(this.panelWidth, 0, width, this.height + this.padding * 2);
    if (app.ctx.isPointInPath(path, x, y)) {
      return this;
    }
    return false;
  }
  compile() {
    return this.unit.compile(this.sequenceTracks);
  }

  initialiseSequenceTracks(sequences) {
    this.sequenceTracks = [];
    for (var s of sequences) {
      var segment = {};
      if (s.after) {
        segment.after = s.after.after;
        if (s.after.sequence.before) {
          segment.before = s.after.sequence.before.before;
        }
      } else if (s.before) {
        segment.before = s.before.before;
        if (s.before.sequence.after) {
          segment.after = s.before.sequence.after.after;
        }
      }
      var track = new SequenceTrack(this.unit.getCompileTarget(), s);
      track.addRange(segment.after, segment.before);
      this.sequenceTracks.push(track);
    }
  }
}

export class ChannelSequenceTracks extends BaseSequenceTracks {
  constructor(channel, app, padding, panelWidth, height) {
    super(channel, app, padding, panelWidth, height);
  }
}
export class RegisterSequenceTracks extends BaseSequenceTracks {
  constructor(register, app, padding, panelWidth, height) {
    super(register, app, padding, panelWidth, height);
  }
}
