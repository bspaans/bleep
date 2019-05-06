import { InputSocket, OutputSocket, Dial, ModuleUnit } from '../../components/';
import { FREQUENCY_TYPE, PANNING_TYPE } from '../../model/';

export class Panning extends ModuleUnit {
  constructor(type) {
    super(type);
    this.background = 'ModuleDerived';
    this.w = 120;
    this.h = 150;
    this.sockets = {
      "FREQ": new InputSocket(29, this.h - 29, "FREQ", FREQUENCY_TYPE),
      "PAN": new OutputSocket(this.w - 29, this.h - 29, "PAN", PANNING_TYPE),
    }
    this.dials = {
    }
  }
}
