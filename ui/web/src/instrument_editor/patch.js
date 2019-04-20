
export class Patch {
  constructor(fromModule, toModule, fromInput, toInput, fromOutput, toOutput) {
    this.from = fromModule;
    this.to = toModule;
    this.fromInput = fromInput;
    this.fromOutput = fromOutput;
    this.toInput = toInput;
    this.toOutput = toOutput;
  }
  getFromSocket(mod) {
    if (this.fromInput !== false && this.fromInput !== undefined) {
      return mod.unit.inputs[this.fromInput];
    }
    return mod.unit.outputs[this.fromOutput];
  }
  getToSocket(mod) {
    if (this.toInput !== false && this.toInput !== undefined) {
      return mod.unit.inputs[this.toInput];
    }
    return mod.unit.outputs[this.toOutput];
  }
}

