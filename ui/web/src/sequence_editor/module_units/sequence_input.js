import { ModuleUnit, Socket } from '../../components/';
import { CLOCK_TYPE } from '../../model/';

export class SequenceInput extends ModuleUnit {
  constructor(type) {
    super(type);
    this.sockets = {
      "CLOCK": new Socket(this.w - 29, this.h - 29, "CLOCK", CLOCK_TYPE),
    }
    this.background = 'ModuleOutput';
  }
}
