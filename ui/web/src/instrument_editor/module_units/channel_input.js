import { ModuleUnit } from './module_unit.js';
import { Socket, FREQUENCY_SOCKET } from '../../components/';

export class ChannelInput extends ModuleUnit {
  constructor(type) {
    super(type);
    this.sockets = {
      "FREQ": new Socket(this.w - 29, this.h - 29, "FREQ", FREQUENCY_SOCKET),
    }
    this.background = 'ModuleOutput';
  }
}
