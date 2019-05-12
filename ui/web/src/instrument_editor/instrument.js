import { ChannelInput, ChannelOutput, Filter, SampleGenerator, Transpose, Panning, Factory } from './module_units';
import { Patch, Module } from '../components/';
import { Patchable, AUDIO_TYPE, FREQUENCY_TYPE, PANNING_TYPE } from '../model/';

export class Instrument extends Patchable {
  constructor(modules, patches) {
    super(modules, patches);
    this.name = null;
    this.instrumentBankIndex = null;
  }
  loadFromDefinition(instrDef) {
    var modules = [
      new Module(this, 10, 40, new ChannelInput('input')), 
      new Module(this, 700, 40, new ChannelOutput('output')),
    ];
    var patches = [

    ];
    this.modules = modules;
    this.patches = patches;
    if (instrDef.name) {
      this.name = instrDef.name;
    }
    if (instrDef.index !== undefined) {
      this.instrumentBankIndex = instrDef.index;
    }
    var ix = this.loadGenerator(instrDef, 0, 1);
    this.patchInput(ix);
  }
  patchInput(ix) {
    if (ix) {
      if (Array.isArray(ix)) {
        for (var i of ix) {
          this.patchInput(i);
        }
        return;
      }
      var s = this.modules[ix].unit.sockets;
      var candidate = null;
      if (s) {
        for (var key of Object.keys(s)) {
          if (s[key].type === FREQUENCY_TYPE) {
            candidate = key;
            break;
          }
        }
        this.addPatch(ix, 0, "FREQ", candidate, FREQUENCY_TYPE);
      }
    }
  }
  loadGenerator(instrDef, input, output) {
    if (instrDef["combined"]) {
      var gs = [];
      for (var iDef of instrDef["combined"]) {
        var ix = this.loadGenerator(iDef, input, output);
        if (ix) {
          gs.push(ix);
        }
      }
      return gs;
    } else if (instrDef["panning"]) {
      var g = new Panning("panning");
      var tIx = this.addModule(g);
      var ix = this.loadGenerator(instrDef["panning"], input, output);
      this.addPatch(tIx, ix, "PAN", "PAN", PANNING_TYPE);
      this.addPatch(input, tIx, "FREQ", "FREQ", FREQUENCY_TYPE);
      return ix;
    } else if (instrDef["transpose"]) {
      var g = new Transpose("transpose");
      g.dials["semitones"].value = instrDef["transpose"]["semitones"] || 0;
      var tIx = this.addModule(g);
      var ix = this.loadGenerator(instrDef["transpose"], tIx, output);
      this.addPatch(tIx, ix, "FREQ", "FREQ", FREQUENCY_TYPE);
      this.addPatch(input, tIx, "FREQ", "FREQ IN", FREQUENCY_TYPE);
      return ix;
    } else if (instrDef["sine"] 
      || instrDef["triangle"] 
      || instrDef["square"] 
      || instrDef["sawtooth"] 
      || instrDef["white_noise"]
      || instrDef["pulse"]
      || instrDef["wav"]) {
      var g = new Factory().generatorFromDefinition(instrDef);
      var ix = this.addModule(g);
      this.addPatch(ix, output, "OUT", "IN", AUDIO_TYPE);
      return ix;
    } else if (instrDef["vocoder"]) {
      var source = new Factory().generatorFromDefinition(instrDef["vocoder"]["source"])
      var vocoder = new Factory().generatorFromDefinition(instrDef["vocoder"]["vocoder"])
      return [];
    } else if (instrDef["filter"]) {
      var g = new Factory().filterFromDefinition(instrDef["filter"])
      var tIx = this.addModule(g);
      var ix = this.loadGenerator(instrDef["filter"], input, tIx);
      this.addPatch(tIx, output, "OUT", "IN", AUDIO_TYPE);
      return ix;
    } else {
      console.log(instrDef);
      throw 'Unknown instrument def';
    }
  }
  addModule(generator) {
    var m = new Module(this, Math.random() * 800 + 100, Math.random() * 600, generator);
    this.modules.push(m);
    return this.modules.length - 1;
  }
  addPatch(fromModule, toModule, fromSocket, toSocket, type) {
    console.log("ADding patch", fromModule, toModule, fromSocket, toSocket);
    if (Array.isArray(toModule)) {
      for (var to of toModule) {
        this.addPatch(fromModule, to, fromSocket, toSocket, type);
      }
      return;
    }
    var p = new Patch(fromModule, toModule, fromSocket, toSocket, type);
    this.patches.push(p);
  }
  load(instrDef) {
    var modules = [];
    for (var m of instrDef.modules) {
      var g = null;
      if (m.type == "input") {
        g = new ChannelInput(m.type);
      } else if (m.type == "output") {
        g = new ChannelOutput(m.type);
      } else if (m.type == "low pass filter") {
        g = new Filter(m.type);
      } else if (m.type == "sine" || m.type == "triangle") {
        g = new SampleGenerator(m.type);
      }
      if (g) {
        var mod = new Module(this, m.x, m.y, g);
        modules.push(mod);
      }
    }
    var patches = [];
    for (var p of instrDef.patches) {
      this.addPatch(p.from_module, p.to_module, p.from_socket, p.to_socket);
    }
    this.modules = modules;
    this.patches = patches;
  }

  compile() {
    var output = null;
    for (var i = 0; i < this.modules.length; i++) {
      var m = this.modules[i];
      if (m.unit.type == "output") {
        output = i;
      }
    }
    if (!output) {
      return null;
    }

    var queue = [output];
    var seen = {};
    var dependencies = [];
    while (queue.length > 0) {
      var q = queue[0];
      var queue = queue.splice(1);
      if (seen[q]) {
        continue
      }
      dependencies.push(q);
      for (var p of this.patches) {
        if (!this.modules[q]) {
          console.log("Big troubles: trying to reach non existent module:", ix);
          continue
        }
        var modSockets = this.modules[q].unit.sockets;
        if (p.to === q && modSockets[p.toSocket] && modSockets[p.toSocket].isInput) {
          if (!seen[p.from]) {
            queue.push(p.from);
          }
        } else if (p.from === q && modSockets[p.fromSocket] && modSockets[p.fromSocket].isInput) {
          if (!seen[p.to]) {
            queue.push(p.to);
          }
        }
      }
      seen[q] = true;
    }
    var generators = {};
    for (var i = dependencies.length - 1; i >= 0; i--) {
      var ix = dependencies[i];
      if (!this.modules[ix]) {
        console.log("Big troubles: trying to reach non existent module:", ix);
        continue
      }
      var unit = this.modules[ix].unit;
      var g = null;
      if (unit.type == "input") {
        g = null;
      } else if (unit.type == "wav") {
        g = {"wav": {
          "file": "",
        }};
      } else if (unit.type == "triangle" 
        || unit.type == "sine" 
        || unit.type == "saw" 
        || unit.type == "square" 
        || unit.type == "white_noise") {
        g = {};
        g[unit.type] = {
          "gain": unit.dials["gain"].value,
          "panning": unit.dials["panning"].value,
          "attack": unit.dials["attack"].value,
          "decay": unit.dials["decay"].value,
          "sustain": unit.dials["sustain"].value,
          "release": unit.dials["release"].value,
        };
        var pitchFound = false;
        for (var p of this.patches) {
          if (p.doesPatchConnectTo(ix, "FREQ")) {
            pitchFound = true;
            var pg = generators[p.connectsTo(ix, "FREQ").module];
            if (pg) {
              g[unit.type]["auto_pitch"] = pg;
            }
          }
        }
        if (!pitchFound) {
          g[unit.type]["pitch"] = unit.dials["pitch"].value;
        }
      } else if (unit.type == "low pass filter") {
        g = {};
        g["filter"] = {"lpf": {"cutoff": unit.dials["cutoff"].value}}
        var on = this.compileGenerators(generators, ix, "IN");
        Object.keys(on).map((k) => {
          g["filter"][k] = on[k];
        });
      } else if (unit.type == "high pass filter") {
        g = {};
        g["filter"] = {"hpf": {"cutoff": unit.dials["cutoff"].value}}
        var on = this.compileGenerators(generators, ix, "IN");
        Object.keys(on).map((k) => {
          g["filter"][k] = on[k];
        });
      } else if (unit.type == "transpose") {
        g = {"transpose": {
          "semitones": unit.dials["semitones"].value,
        }}
        var on = this.compileGenerators(generators, ix, "FREQ IN");
        if (on) {
          Object.keys(on).map((k) => {
            g["transpose"][k] = on[k];
          });
        }
      } else if (unit.type == "panning") {
        g = {"panning": {}}
        var on = this.compileGenerators(generators, ix, "FREQ IN");
        if (on) {
          Object.keys(on).map((k) => {
            g["panning"][k] = on[k];
          });
        }
      } else if (unit.type == "output") {
        var result = this.compileGenerators(generators, ix, "IN");
        if (this.name) {
          result.name = this.name
        }
        if (this.instrumentBankIndex) {
          result.index = this.instrumentBankIndex;
        }
        return result;
      }
      generators[ix] = g;
    }
    return null;
  }

  compileGenerators(generators, ix, input) {
    var gs = [];
    for (var p of this.patches) {
      if (p.doesPatchConnectTo(ix, input)) {
        gs.push(generators[p.connectsTo(ix, input).module])
      }
    }
    if (gs.length === 0) {
      return null;
    } else if (gs.length === 1) {
      return gs[0];
    } else {
      return {"combined": gs}
    }
  }
}

