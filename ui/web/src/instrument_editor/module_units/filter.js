import { ModuleUnit } from './module_unit.js';
import { Input, Output } from './sockets.js';
import { Dial } from '../../components/';

export class Filter extends ModuleUnit {
  constructor(type) {
    super(type);
    this.sockets = {
      "IN": new Input(29, this.h - 29),
      "OUT": new Output(this.w - 29, this.h - 29),
    }
    this.background = 'ModuleFilter';
    this.dials = {
      "cutoff": new Dial(29, 59, "CUTOFF", 1.0, 22000.0, 5000.0),
    }
  }
}
