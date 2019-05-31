export class ChannelSideBar {
  constructor(channel, app, padding, channelWidth, height) {
    this.channel = channel;
    this.app = app;
    this.padding = padding;
    this.channelWidth = channelWidth;
    this.height = height;
  }

  draw(app, colorOffset) {
    app.ctx.fillStyle = 'rgb(0, ' + (200 - colorOffset) + ', 0)';
    app.ctx.strokeStyle = 'rgb(40, 40, 40, 1.0)';
    app.ctx.fillRect(this.padding, this.padding, this.channelWidth, this.height);
    app.ctx.strokeRect(this.padding, this.padding, this.channelWidth, this.height);

    app.ctx.fillStyle = 'rgb(255, 255, 255)';
    app.ctx.font = '10px sans-serif';
    app.ctx.fillText(this.channel.name, this.padding + 3, this.padding + 11);
  }

  handleClick() {
    this.app.openInstrumentEditor(this.channel.instrument);
  }

  handleMouseDown(app, x, y) {
    var path = new Path2D();
    path.rect(0, 0, this.channelWidth, this.height + this.padding * 2);
    if (app.ctx.isPointInPath(path, x, y)) {
      return this;
    }
    return false;
  }
}
