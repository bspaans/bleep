import { Socket, FREQUENCY_SOCKET } from '../../components/';
import { ModuleUnit } from './module_unit.js';
import { Dial } from '../../components/';

export class Transpose extends ModuleUnit {
  constructor(type) {
    super(type);
    this.background = 'ModuleDerived';
    this.w = 120;
    this.h = 150;
    this.sockets = {
      "FREQ IN": new Socket(29, this.h - 29, "FREQ IN", FREQUENCY_SOCKET),
      "FREQ": new Socket(this.w - 29, this.h - 29, "FREQ", FREQUENCY_SOCKET),
    }
    this.dials = {
      "semitones": new Dial(29, 49, "SEMITONES", -24, 24, 0.0),
    }
  }
}
