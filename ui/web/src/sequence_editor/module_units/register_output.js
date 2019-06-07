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
    if (socketType != INT_ARRAY_TYPE) {
      this.dials["value"] =  new Dial(29, 59, "VALUE", 0.0, 128.0, 1.0);
    }
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
      g[this.type]["auto_value"] = val[0];
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

