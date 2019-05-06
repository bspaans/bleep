import { ModuleUnit, Socket, Dial } from '../../components/';
import { TRIGGER_TYPE, CLOCK_TYPE } from '../../model/';

export class Pulse extends ModuleUnit {
  constructor(every) {
    super("pulse");
    this.sockets = {
      "CLOCK": new Socket(29, this.h - 29, "CLOCK", CLOCK_TYPE),
      "TRIG": new Socket(this.w - 29, this.h - 29, "TRIG", TRIGGER_TYPE),
    }
    this.dials = {
      "every": new Dial(29, 59, "EVERY", 0.0, 10.0, 1.0),
    }
    this.dials.every.value = every || 1;
    this.background = 'ModulePulse';
  }
}
