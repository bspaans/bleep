import { Patchable, CLOCK_TYPE, INT_TYPE, TRIGGER_TYPE } from '../model/';
import { Factory, SequenceInput, PlayNote, Pulse } from './module_units/';
import { Module } from '../components/';

export class Sequence extends Patchable {
  constructor(modules, patches, channelNr) {
    super(modules, patches);
    this.channelNr = channelNr || 1;
  }

  loadFromDefinition(sequenceDef) {

    this.modules = [
      new Module(this, 10, 40, new SequenceInput('input')), 
    ];
    this.patches = [];

    if (!sequenceDef) {
      return;
    }
    this.loadSequence(sequenceDef, 0);
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

      var connections = {};
      for (var socketId of Object.keys(unit.sockets)) {
        if (unit.sockets[socketId].isInput) {
          connections[socketId] = this.getConnectedSequences(sequences, ix, socketId);
        }
      }
      if (unit.type == "play_note") {
        for (var o of unit.compile(connections)) {
          result.push(o);
        }
      } else {
        var g = unit.compile(connections);
        sequences[ix] = g;
      }
    }
    return result;
  }

  parseDuration(duration) {
    if (typeof duration == 'number') {
      return duration;
    }
    var granularity = 64;
    if (duration == "Thirtysecond") {
      return granularity / 8;
    } else if (duration == "Sixteenth") {
      return granularity / 4;
    } else if (duration == "Eight") {
      return granularity / 2;
    } else if (duration == "Quarter") {
      return granularity;
    } else if (duration == "Half") {
      return granularity * 2;
    } else if (duration == "Whole") {
      return granularity * 4;
    }
  }

  loadSequence(sequenceDef, input) {
    if (sequenceDef["before"]) { // we filter out before, because this is handled in the timeline
      return this.loadSequence(sequenceDef["before"]["sequence"], input);
    } else if (sequenceDef["after"]) { // we filter out after, because this is handled in the timeline
      return this.loadSequence(sequenceDef["after"]["sequence"], input);
    } else if (sequenceDef["play_note"]) {
      console.log("Loading sequence", sequenceDef);
      var def = sequenceDef["play_note"];
      var g = new PlayNote();
      g.dials.note.value = def.note || 1.0;
      g.dials.velocity.value = def.velocity || 1.0;
      g.dials.duration.value = this.parseDuration(def.duration) || 1.0;
      var ix = this.addModule(g);
      if (def["auto_velocity"]) {
        var vIx = this.loadAutomation(def["auto_velocity"]);
        if (vIx !== null) {
          this._addPatch(ix, vIx, "VEL", "OUT", INT_TYPE);
        }
      } 
      if (def["auto_note"]) {
        var vIx = this.loadAutomation(def["auto_note"]);
        if (vIx !== null) {
          this._addPatch(ix, vIx, "NOTE", "OUT", INT_TYPE);
        }
      }
      if (def["every"]) {
        var pulseIx = this.addModule(new Pulse(this.parseDuration(def["every"])));
        this._addPatch(input, pulseIx, "CLOCK", "CLOCK", CLOCK_TYPE);
        this._addPatch(ix, pulseIx, "TRIG", "TRIG", TRIGGER_TYPE);
      }
      return ix;
    } else if (sequenceDef["combine"]) {
      var seqs = [];
      for (var iDef of sequenceDef["combine"]) {
        var ix = this.loadSequence(iDef, input);
        if (ix) {
          seqs.push(ix);
        }
      }
      return seqs;
    } else if (sequenceDef["repeat"]) {
    } else if (sequenceDef["panning"]) {
    } else {
      console.log("Unsupported sequence def", sequenceDef);
      return null;
    }
  }

  loadAutomation(automationDef) {
    console.log("Loading automation", automationDef);
    if (automationDef["back_and_forth"]) {
      console.log("Unsupported automation def", automationDef);
      return null;
    } else if (automationDef["cycle"]) {
      console.log("Unsupported automation def", automationDef);
      return null;
    } else if (automationDef["random"]) {
      console.log("Unsupported automation def", automationDef);
      return null;
    } else if (automationDef["fade_in"]
            || automationDef["range"] 
            || automationDef["sweep"]) {
      var a = new Factory().automationFromDefinition(automationDef);
      return this.addModule(a);
    } else if (automationDef["register"]) {
      console.log("Unsupported automation def", automationDef);
      return null;
    } else if (automationDef["transpose"]) {
      console.log("Unsupported automation def", automationDef);
      return null;
    } else {
      console.log("Unsupported automation def", automationDef);
      return null;
    }
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
