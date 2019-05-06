import { ModuleUnit, OutputSocket, Dial } from '../../components/';
import { INT_TYPE } from '../../model/';

export class Range extends ModuleUnit {
  constructor(type) {
    super(type);
    this.sockets = {
      "OUT": new OutputSocket(this.w - 29, this.h - 29, "OUT", INT_TYPE),
    }
    this.dials = {
      "from": new Dial(29, 59, "FROM", 0.0, 127.0, 0.0),
      "to": new Dial(79, 59, "TO", 0.0, 127.0, 127.0),
      "step": new Dial(129, 59, "STEP", 0.0, 128.0, 1.0),
    }
    this.background = 'ModuleInt';
  }

  compile(connections) {
    var g = {};
    g[this.type] = {
      "from": this.dials.from.value,
      "to": this.dials.to.value,
      "step": this.dials.step.value,
    };
    return g;
  }
}
