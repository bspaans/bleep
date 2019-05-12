
import { SampleGenerator, WavGenerator } from './sample_generator.js';
import { Filter } from './filter.js';

export class Factory {

  generatorFromDefinition(instrDef) {

    if (instrDef["sine"] 
      || instrDef["triangle"] 
      || instrDef["square"] 
      || instrDef["sawtooth"] 
      || instrDef["white_noise"]) {
      var typ = "triangle";
      var instr = null;
      if (instrDef["triangle"]) {
        instr = instrDef["triangle"];
      } else if (instrDef["sine"]) {
        instr = instrDef["sine"];
        typ = "sine";
      } else if (instrDef["square"]) {
        instr = instrDef["square"];
        typ = "square";
      } else if (instrDef["sawtooth"]) {
        instr = instrDef["sawtooth"];
        typ = "saw";
      } else if (instrDef["white_noise"]) {
        instr = instrDef["white_noise"];
        typ = "white_noise";
      }
      var g = new SampleGenerator(typ)
      g.dials["attack"].value = instr["attack"] || 0.0;
      g.dials["decay"].value = instr["decay"] || 0.0;
      g.dials["sustain"].value = instr["sustain"] || 0.0;
      g.dials["release"].value = instr["release"] || 0.0;
      g.dials["gain"].value = instr["gain"] || 1.0;
      return g;
    } else if (instrDef["wav"]) {
      var g = new WavGenerator();
      var instr = instrDef["wav"];
      g.dials["attack"].value = instr["attack"] || 0.0;
      g.dials["decay"].value = instr["decay"] || 0.0;
      g.dials["sustain"].value = instr["sustain"] || 0.0;
      g.dials["release"].value = instr["release"] || 0.0;
      g.dials["gain"].value = instr["gain"] || 1.0;
      return g;
    } else if (instrDef["pulse"]) {
      var g = new SampleGenerator("pulse");
      var instr = instrDef["pulse"];
      g.dials["attack"].value = instr["attack"] || 0.0;
      g.dials["decay"].value = instr["decay"] || 0.0;
      g.dials["sustain"].value = instr["sustain"] || 0.0;
      g.dials["release"].value = instr["release"] || 0.0;
      g.dials["gain"].value = instr["gain"] || 1.0;
      return g;
    }
  }

  filterFromDefinition(filterDef) {
    if (filterDef["lpf"]) {
      var g = new Filter("low pass filter")
      g.dials["cutoff"].value = filterDef["lpf"]["cutoff"] || 5000;
      return g;
    } else if (filterDef["distortion"]) {
      var g = new Filter("distortion")
      return g;
    } else if (filterDef["overdrive"]) {
      var g = new Filter("overdrive")
      return g;
    } else if (filterDef["flanger"]) {
      var g = new Filter("flanger")
      return g;
    } else if (filterDef["average"]) {
      var g = new Filter("average")
      return g;
    } else {
      console.log(filterDef);
      throw 'Unknown filter def';
    }
  }
}
