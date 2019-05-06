import { ModuleUnit, Socket } from '../../components/';
import { AUDIO_TYPE } from '../../model/';


export class SequenceOutput extends ModuleUnit {
  constructor(type) {
    super(type);
    this.sockets = {
      "IN": new Socket(29, this.h - 29, "IN", AUDIO_TYPE),
    }
    this.background = 'ModuleOutput';
  }
}

