import { ModuleUnit, InputSocket, OutputSocket, Dial } from '../../components/';
import { INT_TYPE, INT_ARRAY_TYPE } from '../../model/';

class BaseRegisterIndex extends ModuleUnit {
  constructor(socketType) {
    super("index");
    this.sockets = {
      "IN": new InputSocket(29, this.h - 29, "IN", socketType),
      "INDEX": new InputSocket(79, this.h - 29, "INDEX", INT_TYPE),
      "OUT": new OutputSocket(this.w - 29, this.h - 29, "OUT", socketType),
    }
    this.dials = {
      "index": new Dial(79, 59, "INDEX", 0, 16, 0.0),
    }
    if (socketType == INT_TYPE) {
      this.background = 'ModuleInt';
    } else {
      this.background = 'ModuleIntArray';
    }
  }

  compile(connections) {
    var g = {"index": {
        "value": parseFloat(this.dials.index.value.toFixed(0)),
      }
    };
    var autoValue = connections["INDEX"];
    if (autoValue) {
      if (autoValue.length === 1) {
        if (autoValue[0]) {
          g.index.auto_value = autoValue[0];
        } 
      }
    }
    var on = connections["IN"];
    if (!on) {
      return null;
    }
    if (on.length === 1) {
      if (!on[0]) {
        return null;
      }
      for (var key of Object.keys(on[0])) {
        g["index"][key] = on[0][key];
      }
    } else {
      console.log("inputs to index != 1");
      return null;
    }
    return g;
  }
}

export class IntArrayRegisterIndex extends BaseRegisterIndex {
  constructor() {
    super(INT_ARRAY_TYPE);
  }
}
