import { ModuleUnit, OutputSocket } from '../../components/';
import { FREQUENCY_TYPE } from '../../model/';

export class ChannelInput extends ModuleUnit {
  constructor(type) {
    super(type);
    this.sockets = {
      "FREQ": new OutputSocket(this.w - 29, this.h - 29, "FREQ", FREQUENCY_TYPE),
    }
    this.background = 'ModuleOutput';
  }
}
