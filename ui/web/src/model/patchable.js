import { Patch, Module } from '../components/';

export class Patchable {
  constructor(modules, patches) {
    this.modules = modules;
    this.patches = patches;
  }
  _addPatch(fromModule, toModule, fromSocket, toSocket, type) {
    if (Array.isArray(toModule)) {
      for (var to of toModule) {
        this._addPatch(fromModule, to, fromSocket, toSocket, type);
      }
      return;
    }
    var p = new Patch(fromModule, toModule, fromSocket, toSocket, type);
    this.patches.push(p);
  }
  addPatch(fromMod, toMod, fromSocket, toSocket) {
    var from = null;
    var to = null;
    for (var i = 0; i < this.modules.length; i++) {
      var m = this.modules[i];
      if (m === fromMod) {
        from = i;
      }
      if (m === toMod) {
        to = i;
      }
    }
    if (from === null || to === null || (from === to && fromSocket === toSocket)) {
      return
    }
    if (this.modules[from].unit.sockets[fromSocket].type != this.modules[to].unit.sockets[toSocket].type) {
      alert("Wrong types");
      return;
    }
    var patch = new Patch(from, to, fromSocket, toSocket, this.modules[from].unit.sockets[fromSocket].type);
    var remove = null;
    for (var i = 0; i < this.patches.length; i++) {
      var p = this.patches[i];
      if (p.isIsomorphic(patch)) {
        remove = i;
        break;
      }
    }
    if (remove === null) {
      this.patches.push(patch);
    } else {
      this.patches.splice(remove, 1);
    }
  }
  addModule(unit) {
    var m = new Module(this, Math.random() * 800 + 100, Math.random() * 600, unit);
    this.modules.push(m);
    return this.modules.length - 1;
  }

}
