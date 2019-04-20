import { ModuleUnit } from './module_unit.js';
import { Input } from './sockets.js';


export class ChannelOutput extends ModuleUnit {
  constructor(type) {
    super(type);
    this.addInput(new Input(29, this.h - 29));
    this.outputs = [];
    this.background = 'ModuleOutput';
  }
}

