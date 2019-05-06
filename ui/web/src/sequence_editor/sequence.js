import { Patchable } from '../model/';

export class Sequence extends Patchable {
  constructor(modules, patches, channelNr) {
    super(modules, patches);
    this.channelNr = channelNr || 1;
  }
  compile() {
    return [];
  }
}
