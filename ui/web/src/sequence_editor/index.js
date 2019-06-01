
import { Editor, Button, Module } from '../components/';
import { Sequence } from './sequence.js';
import { SequenceInput, SequenceOutput, Pulse, Euclidian, PlayNote, Range, Transpose, Register } from './module_units/';

export class SequenceEditor extends Editor {
  constructor(app, sequence, channelNr, handleClose) {
    super(app, sequence, handleClose);
    this.app = app;
    if (!sequence) {
      sequence = new Sequence([], [], channelNr);
      var modules = [
        new Module(sequence, 30, 50, new SequenceInput('input')), 
      ];
      sequence.modules = modules;
    }
    this.target = sequence;
    var buttonDefs = [
        {label: "𝅝", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(4))},
        {label: "𝅗𝅥", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(2))},
        {label: "♩", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(1))},
        {label: "♪", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(0.5))},
        {label: "𝅘𝅥𝅯", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(0.25))},
        {label: "𝅘𝅥𝅰", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(0.125))},
        {label: "PULS", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse())},
        {label: "EUCL", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Euclidian())},

        {label: "NOTE", colour: 'ModuleOutput', onclick: () => this.handleAddUnit(() => new PlayNote())},
        {label: "PAN", colour: 'ModuleOutput', onclick: () => this.handleAddGenerator("sine")},
        {label: "REV", colour: 'ModuleOutput', onclick: () => this.handleAddGenerator("sine")},
        {label: "LPF", colour: 'ModuleOutput', onclick: () => this.handleAddGenerator("sine")},
        {label: "HPF", colour: 'ModuleOutput', onclick: () => this.handleAddGenerator("sine")},

        {label: "SWEEP", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new Range("sweep"))},
        {label: "CYCLE", colour: 'ModuleInt', onclick: () => this.handleAddGenerator("sine")},
        {label: "RANGE", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new Range("range"))},
        {label: "FADE", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new Range("fade in"))},
        {label: "RAND", colour: 'ModuleInt', onclick: () => this.handleAddGenerator("sine")},
        {label: "REG", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new Register())},
        {label: "TRANS", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new Transpose("transpose"))},
    ]

    var x = 0;
    var prev = null;
    var padding = 0;
    var groupPadding = 15;
    for (var def of buttonDefs) {
      var b = new Button(x, app.theme.padding, def.onclick.bind(this), def.label);
      b.colour = app.theme.colours[def.colour] || app.theme.colours.ModuleGenerator;
      this.buttons.push(b);
      if (prev && prev.colour != def.colour) {
        x += groupPadding;
        b.x += groupPadding;
      }
      x += b.w + padding;
      prev = def;
    }
  }
}
