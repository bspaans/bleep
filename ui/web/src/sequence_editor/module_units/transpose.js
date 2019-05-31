import { ModuleUnit, InputSocket, OutputSocket, Dial } from '../../components/';
import { INT_TYPE } from '../../model/';

export class Transpose extends ModuleUnit {
  constructor(type) {
    super(type);
    this.sockets = {
      "IN": new InputSocket(29, this.h - 29, "IN", INT_TYPE),
      "OUT": new OutputSocket(this.w - 29, this.h - 29, "OUT", INT_TYPE),
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
