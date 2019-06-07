import { Range }  from './range.js';
import { Register, IntArrayRegister } from './register.js';
import { IntArrayRegisterIndex } from './register_index.js';
import { CycleChords } from './cycle_chords.js';
export class Factory {

  sequenceFromDefinition(sequenceDef) {

  }

  automationFromDefinition(automationDef) {
    var rangers = ["range", "fade_in", "sweep"];
    for (var ranger of rangers) {
      if (automationDef[ranger] !== undefined) {
        var def = automationDef[ranger];
        var a = new Range(ranger);
        a.dials.from.value = def.from || 0;
        a.dials.to.value = def.to || 127;
        a.dials.step.value = def.step || 1;
        return a;
      }
    }
    if (automationDef["register"] !== undefined) {
      var a = new Register();
      a.dials.register.value = automationDef["register"] || 0;
      return a;
    }
    console.log("Unknown definition in factory:", automationDef);
  }
  intArrayAutomationFromDefinition(automationDef) {
    if (automationDef["register"] !== undefined) {
      var a = new IntArrayRegister();
      a.dials.register.value = automationDef["register"] || 0;
      return a;
    } else if (automationDef["index"]) {
      var a = new IntArrayRegisterIndex();
      a.dials.index.value = automationDef["index"]["value"] || 0;
      return a;
    } else if (automationDef["cycle_chords"]) {
      var a = new CycleChords();
      a.dials.count.value = automationDef["cycle_chords"]["count"];
      a.chords = automationDef["cycle_chords"]["chords"];
      return a;
    }
    console.log("Unknown int array definition in factory:", automationDef);
  }
}
