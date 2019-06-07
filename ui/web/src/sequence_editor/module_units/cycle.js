import { ModuleUnit, InputSocket, OutputSocket, Dial } from '../../components/';
import { INT_TYPE } from '../../model/';

export class Cycle extends ModuleUnit {
  constructor() {
    super("cycle");
    this.sockets = {
      "OUT": new OutputSocket(this.w - 29, this.h - 29, "OUT", INT_TYPE),
    }
    this.cycle = [];
    this.dials = {
    }
    this.background = 'ModuleIntArray';
  }

  compile(connections) {
    var g = {"cycle": this.cycle};
    return g;
  }
}
