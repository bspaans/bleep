import { ModuleUnit, InputSocket, Dial } from '../../components/';
import { TRIGGER_TYPE, INT_TYPE } from '../../model/';

export class PlayNote extends ModuleUnit {
  constructor() {
    super("play_note");
    this.sockets = {
      "TRIG": new InputSocket(29, this.h - 29, "TRIG", TRIGGER_TYPE),
      "NOTE": new InputSocket(79, this.h - 29, "NOTE", INT_TYPE),
      "VEL": new InputSocket(129, this.h - 29, "VEL", INT_TYPE),
    }
    this.dials = {
      "note": new Dial(29, 59, "NOTE", 0.0, 128.0, 1.0),
      "velocity": new Dial(79, 59, "VEL", 0.0, 10.0, 1.0),
      "duration": new Dial(129, 59, "DUR", 0.0, 10.0, 1.0),
    }
    this.background = 'ModuleOutput';
  }
}
