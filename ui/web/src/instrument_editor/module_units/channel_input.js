import { ModuleUnit } from './module_unit.js';
import { Output } from './sockets.js';

export class ChannelInput extends ModuleUnit {
  constructor(type) {
    super(type);
    this.sockets = {
      "FREQ": new Output(this.w - 29, this.h - 29, "FREQ"),
    }
    this.background = 'ModuleOutput';
  }
}
