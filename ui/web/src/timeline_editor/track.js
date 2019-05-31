
export class Track {
  constructor(channel, app) {
    this.channel = channel;
    this.padding = 0;
    this.height = 75;
    this.channelWidth = 90;
    this.selected = null;
    this.app = app;
  }

  handleClick() {
    if (this.selected) {
      this.app.openInstrumentEditor(this.channel.instrument);
    }
  }

  drawChannelSide(app, colorOffset) {

    app.ctx.fillStyle = 'rgb(0, ' + (200 - colorOffset) + ', 0)';
    app.ctx.strokeStyle = 'rgb(40, 40, 40, 1.0)';
    app.ctx.fillRect(this.padding, this.padding, this.channelWidth, this.height);
    app.ctx.strokeRect(this.padding, this.padding, this.channelWidth, this.height);

    app.ctx.fillStyle = 'rgb(255, 255, 255)';
    app.ctx.font = '10px sans-serif';
    app.ctx.fillText(this.channel.name, this.padding + 3, this.padding + 11);
  }

  drawSequenceTracks(app, colorOffset) {
    var height = this.height;
    var marginTop = this.marginTop;
    var padding = this.padding;
    var channelWidth = this.channelWidth;
    var trackWidth = app.canvas.width - channelWidth - padding * 2 - 20;

    app.ctx.fillStyle = 'rgb(255, ' + (200 - colorOffset) + ', 0)';
    app.ctx.strokeStyle = 'rgb(40, 40, 40, 1.0)';
    app.ctx.fillRect(padding + channelWidth, padding, trackWidth, height);
    app.ctx.strokeRect(padding + channelWidth, padding, trackWidth, height);

    var trackHeight = height / this.channel.sequenceTracks.length;
    for (var i = 0; i < this.channel.sequenceTracks.length - 1; i++) {
      app.ctx.strokeRect(padding + channelWidth, padding + i * trackHeight, trackWidth, trackHeight);
    }
    for (var i = 0; i < this.channel.sequenceTracks.length; i++) {
      var s = this.channel.sequenceTracks[i];
      s.draw(app, padding + channelWidth, padding + i * trackHeight, trackWidth, trackHeight);
    }

    var showBars = 4;
    var pointsInRange = showBars * 4;
    var scaling = trackWidth / pointsInRange;
    var barWidth = 4 * scaling;
    app.ctx.fillStyle = 'rgb(40, 40, 40)';
    app.ctx.font = '10px mono';
    for (var i = 0; i < showBars; i++) {
      app.ctx.fillText(i + 1, padding + channelWidth + 3 + i * barWidth, padding + height - 3);
    }
  }

  draw(app) {
    var colorOffset = this.channel.channelNr * 40;
    this.drawChannelSide(app, colorOffset);
    this.drawSequenceTracks(app, colorOffset)
  }

  handleMouseDown(app, x, y) {
    var path = new Path2D();
    var channelSidePath = new Path2D();
    var width = app.canvas.width - this.padding * 2;

    channelSidePath.rect(0, 0, this.channelWidth, this.channelWidth);
    if (app.ctx.isPointInPath(channelSidePath, x, y)) {
      this.selected = this.channel;
      return this;
    }
    path.rect(0, 0, width, this.height + this.padding * 2);
    if (app.ctx.isPointInPath(path, x, y)) {
      return this;
    }
    return false;
  }
}
