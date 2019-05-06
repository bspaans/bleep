import { ModuleUnit, InputSocket } from '../../components/';
import { AUDIO_TYPE } from '../../model/';


export class ChannelOutput extends ModuleUnit {
  constructor(type) {
    super(type);
    this.sockets = {
      "IN": new InputSocket(29, this.h - 29, "IN", AUDIO_TYPE),
    }
    this.background = 'ModuleOutput';
  }
}

