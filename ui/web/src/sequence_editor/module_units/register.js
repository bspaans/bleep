import { ModuleUnit, InputSocket, OutputSocket, Dial } from '../../components/';
import { INT_TYPE } from '../../model/';

export class Register extends ModuleUnit {
  constructor(type) {
    super(type);
    this.sockets = {
      "OUT": new OutputSocket(this.w - 29, this.h - 29, "OUT", INT_TYPE),
    }
    this.dials = {
      "register": new Dial(29, 59, "VALUE", 0, 16, 0.0),
    }
    this.background = 'ModuleInt';
  }

  compile(connections) {
    var g = {};
    g[this.type] = parseFloat(this.dials.register.value.toFixed(0));
    return g;
  }
}
