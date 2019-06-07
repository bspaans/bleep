import { ModuleUnit, InputSocket, Dial } from '../../components/';
import { TRIGGER_TYPE, INT_TYPE, INT_ARRAY_TYPE} from '../../model/';


export class RegisterOutput extends ModuleUnit {
  constructor(type, socketType, register) {
    super(type);
    this.sockets = {
      "TRIG": new InputSocket(29, this.h - 29, "TRIG", TRIGGER_TYPE),
      "VALUE": new InputSocket(79, this.h - 29, "VALUE", socketType || INT_TYPE),
    }
    this.register = register;
    this.dials = {}
    this.background = 'ModuleOutput';
  }
  compile(connections) {
    var g = {};
    g[this.type] = {
      "register": this.register,
    }

    var val = connections["VALUE"];
    if (val.length == 0) {
      return [];
    } else if (val.length == 1) {
      var v = "auto_value";
      if (this.type == "array_register") {
        v = "auto_values";
      }
      g[this.type][v] = val[0];
    } else {
      console.log("more than one input to register set");
      return []
    }

    var result = [];
    var on = connections["TRIG"];
    for (var o of on) {
      result.push(o(g))
    }
    return result;
  }
}

