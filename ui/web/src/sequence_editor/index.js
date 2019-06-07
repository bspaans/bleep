
import { Editor, Button, Module } from '../components/';
import { Sequence } from './sequence.js';
import { SequenceInput, SequenceOutput, Pulse, Euclidian, PlayNote, PlayNotes, Range, Transpose, Register, IntArrayRegisterIndex, TransposeIntArray, IntArrayRegister, Offset } from './module_units/';

export class BaseSequenceEditor extends Editor {
  constructor(app, sequence, sequenceTarget, handleClose) {
    super(app, sequence, handleClose);
    this.app = app;
    if (!sequence) {
      sequence = new Sequence(sequenceTarget, [], []);
      var modules = [
        new Module(sequence, 30, 50, new SequenceInput('input')), 
      ];
      sequence.modules = modules;
    }
    this.target = sequence;
  }
}
export class SequenceEditor extends BaseSequenceEditor {
  constructor(app, sequence, channelNr, handleClose) {
    super(app, sequence, channelNr, handleClose);
    var buttonDefs = [
        {label: "𝅝", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(4))},
        {label: "𝅗𝅥", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(2))},
        {label: "♩", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(1))},
        {label: "♪", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(0.5))},
        {label: "𝅘𝅥𝅯", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(0.25))},
        {label: "𝅘𝅥𝅰", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(0.125))},
        {label: "PULS", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse())},
        {label: "EUCL", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Euclidian())},
        {label: "OFFSET", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Offset())},

        {label: "NOTE", colour: 'ModuleOutput', onclick: () => this.handleAddUnit(() => new PlayNote())},
        {label: "NOTES", colour: 'ModuleOutput', onclick: () => this.handleAddUnit(() => new PlayNotes())},
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
        {label: "TRANS", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new Transpose())},

        {label: "INDEX", colour: 'ModuleIntArray', onclick: () => this.handleAddUnit(() => new IntArrayRegisterIndex())},
        {label: "REG", colour: 'ModuleIntArray', onclick: () => this.handleAddUnit(() => new IntArrayRegister())},
        {label: "TRANS", colour: 'ModuleIntArray', onclick: () => this.handleAddUnit(() => new TransposeIntArray())},
    ]
    this.addButtonDefinitions(buttonDefs);
  }
}

export class RegisterSequenceEditor extends BaseSequenceEditor {
  constructor(app, sequence, register, handleClose) {
    super(app, sequence, register, handleClose);
    var buttonDefs = [
        {label: "𝅝", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(4))},
        {label: "𝅗𝅥", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(2))},
        {label: "♩", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(1))},
        {label: "♪", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(0.5))},
        {label: "𝅘𝅥𝅯", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(0.25))},
        {label: "𝅘𝅥𝅰", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse(0.125))},
        {label: "PULS", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Pulse())},
        {label: "EUCL", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Euclidian())},
        {label: "OFFSET", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new Offset())},

        {label: "SWEEP", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new Range("sweep"))},
        {label: "CYCLE", colour: 'ModuleInt', onclick: () => this.handleAddGenerator("sine")},
        {label: "RANGE", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new Range("range"))},
        {label: "FADE", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new Range("fade in"))},
        {label: "RAND", colour: 'ModuleInt', onclick: () => this.handleAddGenerator("sine")},
        {label: "REG", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new Register())},
        {label: "TRANS", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new Transpose())},

        {label: "INDEX", colour: 'ModuleIntArray', onclick: () => this.handleAddUnit(() => new IntArrayRegisterIndex())},
        {label: "REG", colour: 'ModuleIntArray', onclick: () => this.handleAddUnit(() => new IntArrayRegister())},
        {label: "TRANS", colour: 'ModuleIntArray', onclick: () => this.handleAddUnit(() => new TransposeIntArray())},
    ]
    this.addButtonDefinitions(buttonDefs);
  }
}
