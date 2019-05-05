import { Socket, FREQUENCY_SOCKET, AUDIO_SOCKET, PANNING_SOCKET } from '../../components/';
import { ModuleUnit } from './module_unit.js';
import { Dial } from '../../components/';

export class SampleGenerator extends ModuleUnit {
  constructor(type) {
    super(type);
    this.background = 'ModuleGenerator';
    this.w = 220;
    this.h = 250;
    this.sockets = {
      "FREQ": new Socket(29, this.h - 29, "FREQ", FREQUENCY_SOCKET),
      "PAN": new Socket(79, this.h - 29, "PAN", PANNING_SOCKET),
      "OUT": new Socket(this.w - 29, this.h - 29, "OUT", AUDIO_SOCKET),
    }
    this.dials = {
      "pitch": new Dial(29, 49, "FREQ", 0.0, 22000.0, 0.0),
      "gain": new Dial(79, 49, "GAIN", 0.0, 4.0, 1.0),
      "panning": new Dial(129, 49, "PAN", 0.0, 1.0, 0.5),
      "attack": new Dial(29, 120, "ATTACK", 0.0, 10.0, 0.1),
      "decay": new Dial(79, 120, "DECAY", 0.0, 10.0, 0.1),
      "sustain": new Dial(129, 120, "SUSTAIN", 0.0, 1.0, 0.8),
      "release": new Dial(179, 120, "RELEASE", 0.0, 10, 0.1),
    }
  }
}

