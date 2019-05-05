import { ModuleUnit } from './module_unit.js';
import { Socket, AUDIO_SOCKET } from '../../components/';


export class ChannelOutput extends ModuleUnit {
  constructor(type) {
    super(type);
    this.sockets = {
      "IN": new Socket(29, this.h - 29, "IN", AUDIO_SOCKET),
    }
    this.background = 'ModuleOutput';
  }
}

