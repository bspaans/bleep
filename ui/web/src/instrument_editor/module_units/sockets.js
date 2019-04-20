import { Socket } from '../../components/';
export class Output extends Socket {
  constructor(x, y, label) {
    super(x, y)
    this.label = label ? label : "OUT";
  }
}
export class Input extends Socket {
  constructor(x, y, label) {
    super(x, y)
    this.label = label ? label : "IN";
  }
}
