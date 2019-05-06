import { Patchable } from '../model/';

export class Sequence extends Patchable {
  constructor(modules, patches, channelNr) {
    super(modules, patches);
    this.channelNr = channelNr || 1;
  }
  compile() {
    var queue = [];
    var seen = {};
    var dependencies = [];

    for (var i = 0; i < this.modules.length; i++) {
      var m = this.modules[i];
      if (m.unit.type == "play_note") {
        queue.push(i);
      }
    }
    while (queue.length > 0) {
      var q = queue[0];
      var queue = queue.splice(1);
      if (seen[q]) {
        continue
      }
      dependencies.push(q);
      for (var p of this.patches) {
        var modSockets = this.modules[q].unit.sockets;
        if (p.to === q && modSockets[p.toSocket].isInput) {
          if (!seen[p.from]) {
            queue.push(p.from);
          }
        } else if (p.from === q && modSockets[p.fromSocket].isInput) {
          if (!seen[p.from]) {
            queue.push(p.to);
          }
        }
      }
      seen[q] = true;
    }

    var result = [];
    var sequences = {};
    for (var i = dependencies.length - 1; i >= 0; i--) {
      var ix = dependencies[i];
      var unit = this.modules[ix].unit;
      var g = null;
      if (unit.type == "input") {
        g = null;
      } else if (unit.type == "pulse") {
        var e = {"every": unit.dials["every"].value};
        g = ((e) => ((t) => {
          for (var o of Object.keys(t)) {
            e[o] = t[o];
          }
          var result = {"repeat": e};
          return result
        }))(e)
      } else if (unit.type == "play_note") {
        g = {"play_note": {
          "duration": unit.dials["duration"].value,
          "channel": this.channelNr,
        }};
        var on = this.getConnectedSequences(sequences, ix, "NOTE");
        for (var o of on) {
        }
        if (on.length === 0) {
          g["play_note"]["note"] = unit.dials["note"].value;
        }
        var on = this.getConnectedSequences(sequences, ix, "VEL");
        for (var o of on) {
        }
        if (on.length === 0) {
          g["play_note"]["velocity"] = unit.dials["velocity"].value;
        }

        var on = this.getConnectedSequences(sequences, ix, "TRIG");
        for (var o of on) {
          result.push(o(g));
        }
      }
      sequences[ix] = g;
    }
    return result;
  }
  getConnectedSequences(sequences, ix, input) {
    var gs = [];
    for (var p of this.patches) {
      if (p.doesPatchConnectTo(ix, input)) {
        gs.push(sequences[p.connectsTo(ix, input).module])
      }
    }
    return gs;
  }
}
