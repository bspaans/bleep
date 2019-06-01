import { ModuleUnit, InputSocket, OutputSocket, Dial } from '../../components/';
import { TRIGGER_TYPE, CLOCK_TYPE } from '../../model/';

export class Euclidian extends ModuleUnit {
  constructor() {
    super("euclidian");
    this.sockets = {
      "CLOCK": new InputSocket(29, this.h - 29, "CLOCK", CLOCK_TYPE),
      "TRIG": new OutputSocket(this.w - 29, this.h - 29, "TRIG", TRIGGER_TYPE),
    }
    this.dials = {
      "pulses": new Dial(29, 59, "PULSES", 0.0, 10.0, 1.0),
      "over": new Dial(79, 59, "OVER", 0.0, 10.0, 1.0),
      "duration": new Dial(129, 59, "DUR", 0.0, 10.0, 1.0),
    }
    this.background = 'ModulePulse';
  }

  compile(connections) {
    var g = {"euclidian": {
        "pulses": parseFloat(this.dials.pulses.value.toFixed(0)),
        "over": parseFloat(this.dials.over.value.toFixed(0)),
        "duration": this.dials.over.value,
        "sequence": null,
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
