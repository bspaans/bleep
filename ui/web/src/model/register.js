import { INT_TYPE, INT_ARRAY_TYPE, FLOAT_TYPE } from './types.js';

export class Register {
  constructor(register, type) {
    this.register = register;
    this.type = type || "register";
    this.socketType = INT_TYPE;
    if (type == "array_register") {
      this.socketType = INT_ARRAY_TYPE;
    } else if (type == "float_register") {
      this.socketType = FLOAT_TYPE;
    }
  }
  getCompileTarget() {
    return this;
  }
  compile(sequenceTracks) {
    var sequences = [];
    for (var tr of sequenceTracks) {
      var trResult = tr.compile();
      if (trResult) {
        sequences.push(trResult);
      }
    }
    return {
      "sequences": sequences,
    };
  }
}
