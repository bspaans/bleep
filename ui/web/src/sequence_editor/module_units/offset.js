import { ModuleUnit, InputSocket, OutputSocket, Dial } from '../../components/';
import { TRIGGER_TYPE, CLOCK_TYPE } from '../../model/';

export class Offset extends ModuleUnit {
  constructor() {
    super("offset");
    this.sockets = {
      "CLOCK": new InputSocket(29, this.h - 29, "CLOCK", CLOCK_TYPE),
      "OUT": new OutputSocket(this.w - 29, this.h - 29, "OUT", CLOCK_TYPE),
    }
    this.dials = {
      "offset": new Dial(29, 59, "OFFSET", 0.0, 128.0, 1.0),
    }
    this.background = 'ModulePulse';
  }

  compile(connections) {
    var g = {"offset": {
        "offset": this.dials.offset.value,
      }
    };
    return ((g) => {
      return (seq) => {
        g.euclidian.sequence = seq;
        return g;
      }
   })(g);
  }
}
