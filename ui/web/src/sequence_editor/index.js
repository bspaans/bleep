
import { Editor, Button, Module } from '../components/';
import { Sequence } from './sequence.js';
import { SequenceInput, SequenceOutput, Pulse, PlayNote } from './module_units/';

export class SequenceEditor extends Editor {
  constructor(app, sequence, channelNr, handleClose) {
    super(app, sequence, handleClose);
    this.app = app;
    if (!sequence) {
      sequence = new Sequence([], [], channelNr);
      var modules = [
        new Module(sequence, 30, 30, new SequenceInput('input')), 
      ];
      sequence.modules = modules;
    }
    this.target = sequence;
    var buttonDefs = [
        {label: "PULS", onclick: () => this.handleAddUnit(() => new Pulse())},
        {label: "𝅝", onclick: () => this.handleAddUnit(() => new Pulse(4))},
        {label: "𝅗𝅥", onclick: () => this.handleAddUnit(() => new Pulse(2))},
        {label: "♩", onclick: () => this.handleAddUnit(() => new Pulse(1))},
        {label: "♪", onclick: () => this.handleAddUnit(() => new Pulse(0.5))},
        {label: "𝅘𝅥𝅯", onclick: () => this.handleAddUnit(() => new Pulse(0.25))},
        {label: "𝅘𝅥𝅰", onclick: () => this.handleAddUnit(() => new Pulse(0.125))},
        {label: "EUCL", onclick: () => this.handleAddGenerator("sine")},
        {label: "NOTE", onclick: () => this.handleAddUnit(() => new PlayNote())},
        {label: "PAN", onclick: () => this.handleAddGenerator("sine")},
        {label: "REV", onclick: () => this.handleAddGenerator("sine")},
        {label: "LPF", onclick: () => this.handleAddGenerator("sine")},
        {label: "HPF", onclick: () => this.handleAddGenerator("sine")},
    ]

    var x = 10;
    for (var def of buttonDefs) {
      var b = new Button(x, 0, def.onclick.bind(this), def.label);
      b.colour = app.theme.colours.ModuleGenerator;
      this.buttons.push(b);
      x += b.w + 3;
    }
  }
}
