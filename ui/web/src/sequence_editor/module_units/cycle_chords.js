import { ModuleUnit, InputSocket, OutputSocket, Dial } from '../../components/';
import { INT_ARRAY_TYPE } from '../../model/';

export class CycleChords extends ModuleUnit {
  constructor() {
    super("cycle chords");
    this.sockets = {
      "OUT": new OutputSocket(this.w - 29, this.h - 29, "OUT", INT_ARRAY_TYPE),
    }
    this.chords = [];
    this.dials = {
      "count": new Dial(29, 59, "COUNT", 0.0, 10.0, 1.0),
    }
    this.background = 'ModuleIntArray';
  }

  compile(connections) {
    var g = {"cycle_chords": {
        "count": parseFloat(this.dials.count.value.toFixed(0)),
        "chords": this.chords,
      }
    };
    return g;
  }
}
