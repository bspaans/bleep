import { InputSocket, OutputSocket, Dial, ModuleUnit } from '../../components/';
import { FREQUENCY_TYPE, AUDIO_TYPE, PANNING_TYPE } from '../../model/';

export class SampleGenerator extends ModuleUnit {
  constructor(type) {
    super(type);
    this.background = 'ModuleGenerator';
    this.w = 220;
    this.h = 250;
    this.sockets = {
      "FREQ": new InputSocket(29, this.h - 29, "FREQ", FREQUENCY_TYPE),
      "PAN": new InputSocket(79, this.h - 29, "PAN", PANNING_TYPE),
      "OUT": new OutputSocket(this.w - 29, this.h - 29, "OUT", AUDIO_TYPE),
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


export class WavGenerator extends ModuleUnit {
  constructor() {
    super("wav");
    this.background = 'ModuleGenerator';
    this.w = 220;
    this.h = 250;
    this.file = "";
    this.is_pitched = false;
    this.base_pitch = 440.0;
    // TODO: file input and is_pitched boolean
    this.sockets = {
      "FREQ": new InputSocket(29, this.h - 29, "FREQ", FREQUENCY_TYPE),
      "PAN": new InputSocket(79, this.h - 29, "PAN", PANNING_TYPE),
      "OUT": new OutputSocket(this.w - 29, this.h - 29, "OUT", AUDIO_TYPE),
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

  compile() {
    return {
      "wav": {
        "file": this.file,
        "gain": this.dials["gain"].value,
        "pitched": this.is_pitched,
        "base_pitch": this.base_pitch,
      }
    };
  }
}
