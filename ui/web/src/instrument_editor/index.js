export { Instrument } from './instrument.js';
import { Instrument } from './instrument.js';
import { Module } from './module.js';
import { ChannelInput, ChannelOutput, SampleGenerator, Filter } from './module_units';
import { CloseButton, Button } from '../components/';

export class InstrumentEditor {
  constructor(app, instrument, handleClose) {
    this.app = app;
    this.padding = app.theme.padding;
    this.showCompile = true;
    if (!instrument) {
      var modules = [
        new Module(instrument, 10, 10, new ChannelInput('input')), 
        new Module(instrument, 10, 300, new ChannelOutput('output')),
      ];
      instrument.modules = modules;
    }
    this.instrument = instrument;
    this.buttons = [
      new CloseButton(10, 10, handleClose),
      new Button(10, 10, this.handleShowCompile.bind(this)),
      new Button(10, 10, (() => this.handleAddGenerator("sine")).bind(this)),
    ];
  }
  handleAddGenerator(type) {
    var g = new SampleGenerator("sine")
    this.instrument.modules.push(new Module(this.instrument, 20, 20, g));
    this.app.draw();
  }
  handleShowCompile() {
    this.showCompile = !this.showCompile;
    this.app.draw();
  }
  handleMouseDown(app, x, y) {
    for (var b of this.buttons) {
      var v = b.handleMouseDown(app, x, y);
      if (v) {
        return v;
      }
    }
    for (var m of this.instrument.modules) {
      var v = m.handleMouseDown(app, x - this.padding, y - this.padding);
      if (v) {
        return v;
      }
    }
  }
  draw(app) {
    var w = app.canvas.width - 2 * this.padding;
    var h = app.canvas.height - 2 * this.padding;
    this.buttons[0].x = w - 15;
    this.buttons[0].y = this.padding;
    this.buttons[1].x = w - 15;
    this.buttons[1].y = this.padding + 25;
    app.ctx.lineWidth = 1;
    
    // Draw the background
    app.ctx.fillStyle = app.theme.colours.InstrumentEditorBackground;
    app.ctx.strokeStyle = app.theme.colours.OutlineColour;
    app.ctx.fillRect(this.padding, this.padding, w, h);
    app.ctx.strokeRect(this.padding, this.padding, w, h);

    // Draw the modules
    for (var m of this.instrument.modules) {
      app.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translate
      app.ctx.translate(this.padding, this.padding);
      m.draw(app);
    }
    app.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translate

    app.ctx.fillStyle = app.theme.colours.Patch;
    app.ctx.strokeStyle = app.theme.colours.Patch;
    // Draw the patches
    for (var p of this.instrument.patches) {
      var fromMod = this.instrument.modules[p.from];
      var toMod = this.instrument.modules[p.to];
      var fromSocket = p.getFromSocket(fromMod);
      var toSocket = p.getToSocket(toMod);
      var fromX = this.padding + fromMod.x + fromSocket.x;
      var fromY = this.padding + fromMod.y + fromSocket.y;
      var toX = this.padding + toMod.x + toSocket.x;
      var toY = this.padding + toMod.y + toSocket.y;
      var pointOffset = 70;
      app.ctx.lineWidth = 4;
      app.ctx.beginPath();
      app.ctx.moveTo(fromX, fromY);
      app.ctx.bezierCurveTo(
        fromX, 
        fromY + pointOffset, 
        toX, 
        toY + pointOffset, 
        toX, 
        toY);
      app.ctx.stroke();
    }

    // Draw the buttons 
    for (var b of this.buttons) {
      b.draw(app);
    }

    // Compiled generator
    if (this.showCompile) {
      var txt = JSON.stringify(this.instrument.compile(), null, 2);
      var lineNr = 0;
      app.ctx.fillStyle = app.theme.colours.ModuleText;
      app.ctx.textAlign = "start";
      for (var line of txt.split("\n")) {
        app.ctx.fillText(line, w - 300, 90 + lineNr * 12);
        lineNr++;
      }
    }
  }
}

