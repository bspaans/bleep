import { ModuleUnit } from './module_unit.js';
import { Socket } from '../../components/';
import { Dial } from '../../components/';

export class Filter extends ModuleUnit {
  constructor(type) {
    super(type);
    this.sockets = {
      "IN": new Socket(29, this.h - 29, "IN"),
      "OUT": new Socket(this.w - 29, this.h - 29, "OUT"),
    }
    this.background = 'ModuleFilter';
    this.dials = { }

    if (type === "low pass filter" || type === "high pass filter") {
      this.w = 150;
      this.dials["cutoff"] = new Dial(29, 59, "CUTOFF", 1.0, 22000.0, 5000.0);
    } else if (type === "delay") {
      this.w = 170;
      this.dials["time"] = new Dial(29, 59, "TIME", 0.00001, 4.0, 1.0);
      this.dials["factor"] = new Dial(79, 59, "FACTOR", 0.0, 2.0, 1.0);
      this.dials["feedback"] = new Dial(129, 59, "FEEDBACK", 0.0, 2.0, 0.0);
    }
  }
}
