import { ModuleUnit, InputSocket, Dial } from '../../components/';
import { TRIGGER_TYPE, INT_TYPE, INT_ARRAY_TYPE } from '../../model/';

export class PlayNotes extends ModuleUnit {
  constructor(channelNr) {
    super("play_notes");
    this.channelNr = channelNr;
    this.sockets = {
      "TRIG": new InputSocket(29, this.h - 29, "TRIG", TRIGGER_TYPE),
      "NOTES": new InputSocket(79, this.h - 29, "NOTES", INT_ARRAY_TYPE),
      "VEL": new InputSocket(129, this.h - 29, "VEL", INT_TYPE),
    }
    this.dials = {
      "velocity": new Dial(79, 59, "VEL", 0.0, 128.0, 90.0),
      "duration": new Dial(129, 59, "DUR", 0.0, 10.0, 1.0),
    }
    this.background = 'ModuleOutput';
  }

  compile(connections) {
    var g = {"play_notes": {
      "duration": this.dials["duration"].value,
      "channel": this.channelNr,
    }};
    var on = connections["NOTES"];
    if (on.length === 0) {
      return null;
    } else {
      g["play_notes"]["auto_notes"] = on[0];
    }
    var on = connections["VEL"];
    if (on.length === 0) {
      g["play_notes"]["velocity"] = parseFloat(this.dials["velocity"].value.toFixed(0));
    } else {
      g["play_notes"]["auto_velocity"] = on[0];
    }

    var result = []
    var on = connections["TRIG"];
    for (var o of on) {
      result.push(o(g));
    }
    return result;
  }
}
