import { ModuleUnit, InputSocket, OutputSocket, Dial } from '../../components/';
import { INT_TYPE, INT_ARRAY_TYPE } from '../../model/';

class BaseTranspose extends ModuleUnit {
  constructor(socketType) {
    super("transpose");
    this.sockets = {
      "IN": new InputSocket(29, this.h - 29, "IN", socketType),
      "OUT": new OutputSocket(this.w - 29, this.h - 29, "OUT", socketType),
    }
    this.dials = {
      "transpose": new Dial(29, 59, "VALUE", 0.0, 127.0, 0.0),
    }
    this.background = 'ModuleInt';
  }

  compile(connections) {
    var g = {};
    g[this.type] = {
      "value": parseFloat(this.dials.transpose.value.toFixed(0)),
    };
    var on = connections["IN"];
    if (on.length === 1) {
      for (var key of Object.keys(on[0])) {
        g[this.type][key] = on[0][key];
      }
    } else {
      console.log("inputs to transpose != 1");
      return null;
    }
    return g;
  }
}
export class Transpose extends BaseTranspose {
  constructor() {
    super(INT_TYPE);
  }
}

export class TransposeIntArray extends BaseTranspose {
  constructor() {
    super(INT_ARRAY_TYPE);
  }
}
