
export class Patch {
  constructor(fromModule, toModule, fromSocket, toSocket) {
    this.from = fromModule;
    this.to = toModule;
    this.fromSocket = fromSocket;
    this.toSocket = toSocket;
  }
  getFromSocket(mod) {
    return mod.unit.sockets[this.fromSocket];
  }
  getToSocket(mod) {
    return mod.unit.sockets[this.toSocket];
  }
}

