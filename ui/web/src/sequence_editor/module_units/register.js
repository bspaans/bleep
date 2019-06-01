import { ModuleUnit, InputSocket, OutputSocket, Dial } from '../../components/';
import { INT_TYPE, INT_ARRAY_TYPE } from '../../model/';

class BaseRegister extends ModuleUnit {
  constructor(outputType) {
    super("register");
    this.sockets = {
      "OUT": new OutputSocket(this.w - 29, this.h - 29, "OUT", outputType),
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
export class Register extends BaseRegister {
  constructor() {
    super(INT_TYPE);
  }
}
export class IntArrayRegister extends BaseRegister {
  constructor() {
    super(INT_ARRAY_TYPE);
  }
}
