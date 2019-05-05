import { Socket, FREQUENCY_SOCKET, PANNING_SOCKET} from '../../components/';
import { ModuleUnit } from './module_unit.js';
import { Dial } from '../../components/';

export class Panning extends ModuleUnit {
  constructor(type) {
    super(type);
    this.background = 'ModuleDerived';
    this.w = 120;
    this.h = 150;
    this.sockets = {
      "FREQ": new Socket(29, this.h - 29, "FREQ", FREQUENCY_SOCKET),
      "PAN": new Socket(this.w - 29, this.h - 29, "PAN", PANNING_SOCKET),
    }
    this.dials = {
    }
  }
}
