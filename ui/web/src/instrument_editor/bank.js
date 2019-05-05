import { Instrument } from './instrument.js';

export class Bank {
  constructor() {
    this.instruments = {};
  }
  loadFromDefinition(def) {
    for (var instrDef of def) {
      var instr = new Instrument();
      instr.loadFromDefinition(instrDef);
      if (instr.instrumentBankIndex !== null) {
        this.instruments[instr.instrumentBankIndex] = instr;
      }
    }
    return this;
  }
}
