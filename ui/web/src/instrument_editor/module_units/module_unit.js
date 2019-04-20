import { Output } from './sockets.js';

export class ModuleUnit {
  constructor(type) {
    this.type = type;
    this.w = 150;
    this.h = 150;
    this.inputs = [];
    this.outputs = [new Output(this.w - 29, this.h - 29)]
    this.dials = {};
    this.background = "";
  }
  addInput(i) {
    this.inputs.push(i);
  }
  addOutput(o) {
    this.outputs.push(o);
  }
  draw(app) {
    var w = this.w;
    var h = this.h;
    app.ctx.fillStyle = app.theme.colours[this.background];
    app.ctx.strokeStyle = app.theme.colours.ModuleOutline;
    app.ctx.fillRect(0, 0, w, h);
    app.ctx.strokeRect(0, 0, w, h);
    app.ctx.fillStyle = app.theme.colours.ModuleText;
    app.ctx.font = '14px mono';
    app.ctx.textAlign = "center";
    app.ctx.fillText(this.type, w / 2, 14);
    for (var o of this.outputs) {
      o.draw(app);
    }
    for (var o of this.inputs) {
      o.draw(app);
    }
    for (var o of Object.keys(this.dials)) {
      this.dials[o].draw(app);
    }
  }
  handleMouseDown(app, x, y) {
    for (var o of this.inputs) {
      var v = o.handleMouseDown(app, x, y);
      if (v) {
        return v;
      }
    }
    for (var o of this.outputs) {
      var v = o.handleMouseDown(app, x, y);
      if (v) {
        return v;
      }
    }
    for (var o of Object.keys(this.dials)) {
      var v = this.dials[o].handleMouseDown(app, x, y);
      if (v) {
        return v;
      }
    }
    var path = new Path2D();
    path.rect(0, 0, this.w, this.h);
    if (app.ctx.isPointInPath(path, x, y)) {
      return this;
    }
  }
}

