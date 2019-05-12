
export class Range {
  constructor(start, stop) {
    this.start = start;
    this.stop = stop;
  }
}

export class SequenceTrack {
  constructor() {
    this.sequence_def = null;
    this.ranges = [];
  }
  addRange(start, stop) {
    this.ranges.push(new Range(start ? start : 0, stop ? stop : 1000000));
  }
  draw(app, x, y, w, h) {
    var showBars = 64;
    var pointsInRange = showBars * 4;
    var scaling = w / pointsInRange;
    var barWidth = 4 * scaling;
    for (var r of this.ranges) {
      var colorOffset = 10;
      var width = Math.min((r.stop - r.start) * scaling, w - (r.start * scaling))
      app.ctx.fillStyle = 'rgb(35, 75, ' + (200 - colorOffset) + ', 0.3)';
      app.ctx.strokeStyle = 'rgb(5, 5, ' + (200 - colorOffset) + ', 0.6)';
      app.ctx.fillRect(x + r.start * scaling, y, width, h);
      app.ctx.strokeRect(x + r.start * scaling, y, width, h);
    }
    app.ctx.strokeStyle = 'rgb(70, 70, 70, 0.8)';
    for (var i = 0; i < showBars; i++) {
      app.ctx.strokeRect(x + i * barWidth, y, barWidth, h);
    }
  }
}
