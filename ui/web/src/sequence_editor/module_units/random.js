import { ModuleUnit, InputSocket, OutputSocket, Dial } from '../../components/';
import { INT_TYPE } from '../../model/';

export class Random extends ModuleUnit {
  constructor() {
    super("random");
    this.sockets = {
      "OUT": new OutputSocket(this.w - 29, this.h - 29, "OUT", INT_TYPE),
    }
    this.cycle = [];
    this.dials = {
      "min": new Dial(29, 59, "COUNT", 0.0, 128.0, 1.0),
      "max": new Dial(29, 59, "COUNT", 0.0, 128.0, 128.0),
    }
    this.background = 'ModuleIntArray';
  }

  compile(connections) {
    var g = {"random": {
      "min": parseFloat(this.dials.min.value.toFixed(0)),
      "max": parseFloat(this.dials.max.value.toFixed(0)),
    }};
    return g;
  }
}
