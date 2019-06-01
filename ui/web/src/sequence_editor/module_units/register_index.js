import { ModuleUnit, InputSocket, OutputSocket, Dial } from '../../components/';
import { INT_TYPE, INT_ARRAY_TYPE } from '../../model/';

class BaseRegisterIndex extends ModuleUnit {
  constructor(outputType) {
    super("index");
    this.sockets = {
      "OUT": new OutputSocket(this.w - 29, this.h - 29, "OUT", outputType),
    }
    this.dials = {
      "register": new Dial(29, 59, "REGISTER", 0, 16, 0.0),
      "value": new Dial(79, 59, "VALUE", 0, 16, 0.0),
    }
    this.background = 'ModuleInt';
  }

  compile(connections) {
    var g = {"index": {
        "register": parseFloat(this.dials.register.value.toFixed(0)),
        "value": parseFloat(this.dials.value.value.toFixed(0)),
      }
    };
    return g;
  }
}

export class IntArrayRegisterIndex extends BaseRegisterIndex {
  constructor() {
    super(INT_ARRAY_TYPE);
  }
}
