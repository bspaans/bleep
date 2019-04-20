import { Socket, Dial } from '../components/';

export class Module {
  constructor(instrument, x, y, unit) {
    this.instrument = instrument;
    this.x = x;
    this.y = y;
    this.unit = unit;
    this.selected = null;
  }
  draw(app) {
    app.ctx.translate(this.x, this.y);
    this.unit.draw(app);
  }
  handleMouseDown(app, x, y) {
    this.selected = null;
    var v = this.unit.handleMouseDown(app, x - this.x, y - this.y);
    if (!v) {
      return false;
    }
    this.selected = v;
    return this;
  }
  handleDrag(app, dx, dy, x, y) {
    var v = this.selected;
    if (v instanceof Socket) {
      console.log("dragging a socket");
      v.handleDrag(app, dx, dy, x, y);
    } else if (v instanceof Dial) {
      v.handleDrag(app, dx, dy, x - this.x, y - this.y);
    } else {
      this.x += dx;
      this.y += dy;
    }
  }
  handleDrop(app, x, y) {
    var v = this.selected;
    if (v instanceof Socket) {
      for (var module of this.instrument.modules) {
        for (var key of Object.keys(module.unit.sockets)) {
          var s = module.unit.sockets[key];
          console.log(s);
        }
      }
      console.log("dropping a socket", x, y);
    }
    this.selected = null;
  }
}
