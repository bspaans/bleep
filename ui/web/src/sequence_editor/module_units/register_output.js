import { ModuleUnit, InputSocket, Dial } from '../../components/';
import { TRIGGER_TYPE, INT_TYPE, INT_ARRAY_TYPE} from '../../model/';


export class RegisterOutput extends ModuleUnit {
  constructor(type, socketType) {
    super(type);
    this.sockets = {
      "TRIG": new InputSocket(29, this.h - 29, "TRIG", TRIGGER_TYPE),
      "VALUE": new InputSocket(79, this.h - 29, "VALUE", socketType || INT_TYPE),
    }
    this.dials = {}
    if (socketType != INT_ARRAY_TYPE) {
      this.dials["value"] =  new Dial(29, 59, "VALUE", 0.0, 128.0, 1.0);
    }
    this.background = 'ModuleOutput';
  }
}

