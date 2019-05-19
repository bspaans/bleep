/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/index.js":
/*!**************************!*\
  !*** ./src/api/index.js ***!
  \**************************/
/*! exports provided: API */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API", function() { return API; });

const TestMessage = "test";
const StatusMessage = "status";
const ChannelDefMessage = "channel_def";
const SequencerDefMessage = "sequencer_def";
const SetSequencerDefMessage = "set_sequencer_def";

class API {

  constructor(app) {
    this.app = app;
    this.socket = null;
  }

  start() {
    var socket = new WebSocket("ws://localhost:10000/ws");
    socket.onopen = ((e) => {
      this.socket = socket;
      this.sendData(ChannelDefMessage, "test");
    }).bind(this)
    socket.onmessage = this.handleMessageReceived.bind(this);
  }

  handleMessageReceived(message) {
    console.log(message)
    var msg = JSON.parse(message.data);
    if (msg.type === ChannelDefMessage) {
      this.app.initialiseChannels(msg.data);
    } else if (msg.type === SequencerDefMessage) {
      this.app.initialiseSequenceTracks(msg.data);
    }
  }
  requestSequencerDef() {
    this.sendData(SequencerDefMessage, null);
  }
  setSequencerDef(def) {
    this.sendData(SetSequencerDefMessage, JSON.stringify(def));
  }

  sendData(type, data) {
    return this.sendJSON({"type": type, "data": data});
  }

  sendJSON(obj) {
    return this.sendMessage(JSON.stringify(obj));
  }

  sendMessage(message) {
    if (this.socket) {
      this.socket.send(message);
    }
  }

}


/***/ }),

/***/ "./src/components/button.js":
/*!**********************************!*\
  !*** ./src/components/button.js ***!
  \**********************************/
/*! exports provided: Button, CloseButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloseButton", function() { return CloseButton; });

class Button {
  constructor(x, y, onClick, label) {
    this.x = x;
    this.y = y;
    this.w = 25;
    this.h = 25;
    this.handleClick = onClick;
    this.label = label;
    this.colour = null;
    if (this.label) {
      this.w = 35;
    }
  }
  draw(app) {
    var w = this.w;
    var h = this.h;
    app.ctx.fillStyle = app.theme.colours.Button;
    if (this.colour) {
      app.ctx.fillStyle = this.colour;
    }
    app.ctx.strokeStyle = app.theme.colours.OutlineColour;
    app.ctx.lineWidth = 1;
    app.ctx.fillRect(this.x, this.y, w, h);
    app.ctx.strokeRect(this.x, this.y, w, h);
    if (this.label) {
      app.ctx.font = '10px mono';
      app.ctx.fillStyle = app.theme.colours.ButtonText;
      app.ctx.textAlign = "center";
      app.ctx.fillText(this.label, this.x + w / 2, this.y + 15);
    }
  }
  handleMouseDown(app, x, y) {
    if (x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h) {
      return this;
    }
  }
}

class CloseButton extends Button {
}


/***/ }),

/***/ "./src/components/dial.js":
/*!********************************!*\
  !*** ./src/components/dial.js ***!
  \********************************/
/*! exports provided: Dial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dial", function() { return Dial; });
class Dial {
  constructor(x, y, label, min, max, current) {
    this.x = x;
    this.y = y;
    this.label = label;
    this.radius = 15;
    this.min = min;
    this.max = max;
    this.value = current;
  }
  draw(app) {

    // Draw dial
    app.ctx.fillStyle = app.theme.colours.Dial;
    app.ctx.beginPath();
    app.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    app.ctx.fill();
    app.ctx.closePath();

    var range = this.max - this.min;
    var tau = 2 * Math.PI
    var value = tau - (tau * (this.value - this.min) / range)
    app.ctx.beginPath();
    var dx = Math.sin(value) * this.radius;
    var dy = Math.cos(value) * this.radius;
    app.ctx.strokeStyle = app.theme.colours.DialLine;
    app.ctx.lineWidth = 2;
    app.ctx.moveTo(this.x, this.y);
    app.ctx.lineTo(this.x + dx, this.y + dy);
    app.ctx.stroke();
    app.ctx.lineWidth = 1;

    // Draw label
    app.ctx.fillStyle = app.theme.colours.ModuleText;
    app.ctx.font = '10px mono';
    var centerX = this.x;
    var y = this.y - this.radius - 3;
    app.ctx.textAlign = "center";
    app.ctx.fillText(this.label, centerX, y);

    // Draw value
    app.ctx.fillText(this.value.toFixed(2), centerX, this.y + this.radius + 12);
  }
  handleMouseDown(app, x, y) {
    if (x >= this.x - this.radius && x <= this.x + this.radius && y >= this.y - this.radius && y <= this.radius + this.y) {
      return this;
    }
  }
  handleDrag(app, dx, dy, x, y) {
    dx = x - this.x;
    dy = y - this.y;
    var sin = dy / Math.sqrt(dy * dy + dx * dx)
    var scaledCos = 1.0 - (sin + 1) / 2;
    var range = this.max - this.min;
    this.value = range * scaledCos + this.min;
    app.draw();
  }
}



/***/ }),

/***/ "./src/components/editor.js":
/*!**********************************!*\
  !*** ./src/components/editor.js ***!
  \**********************************/
/*! exports provided: Editor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Editor", function() { return Editor; });
/* harmony import */ var _button_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button.js */ "./src/components/button.js");
/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module.js */ "./src/components/module.js");



class Editor {
  constructor(app, target, handleClose) {
    this.app = app;
    this.padding = app.theme.padding;
    this.scale = 1.0
    this.showCompile = true;
    this.selected = null;
    this.target = target;
    this.buttons = [
      new _button_js__WEBPACK_IMPORTED_MODULE_0__["CloseButton"](10, 10, handleClose, "X"),
      new _button_js__WEBPACK_IMPORTED_MODULE_0__["Button"](10, 10, this.handleShowCompile.bind(this), "JSON"),
      new _button_js__WEBPACK_IMPORTED_MODULE_0__["Button"](10, 10, this.handleZoomIn.bind(this), "+"),
      new _button_js__WEBPACK_IMPORTED_MODULE_0__["Button"](10, 10, this.handleZoomOut.bind(this), "-"),
    ];
  }
  handleAddUnit(constructor) {
    var g = constructor()
    this.target.modules.push(new _module_js__WEBPACK_IMPORTED_MODULE_1__["Module"](this.target, Math.random() * 700, Math.random() * 600, g));
    this.app.draw();
  }
  handleZoomIn() {
    this.scale += .1
    this.app.draw();
  }
  handleZoomOut() {
    this.scale -= .1;
    this.app.draw();
  }
  handleDrag(app, dx, dy, x, y) {
    if (this.selected) {
      this.selected.handleDrag(app, dx, dy, x, y);
    }
  }
  handleDrop(app, x, y) {
    if (this.selected) {
      this.selected.handleDrop(app, x - this.padding, y - this.padding);
    }
  }
  handleShowCompile() {
    this.showCompile = !this.showCompile;
    this.app.draw();
  }
  handleMouseDown(app, x, y) {
    this.selected = null;
    for (var b of this.buttons) {
      var v = b.handleMouseDown(app, x, y);
      if (v) {
        return v;
      }
    }
    for (var m of this.target.modules) {
      var v = m.handleMouseDown(app, x - this.padding, y - this.padding);
      if (v) {
        this.selected = v;
        return this;
      }
    }
  }
  draw(app) {
    var w = app.canvas.width - 2 * this.padding;
    var h = app.canvas.height - 2 * this.padding;
    this.buttons[0].x = w - this.buttons[0].w + this.padding;
    this.buttons[0].y = this.padding;
    this.buttons[1].x = w - this.buttons[1].w + this.padding;
    this.buttons[1].y = this.padding + 25;
    this.buttons[2].x = w - this.buttons[2].w + this.padding;
    this.buttons[2].y = this.padding + 50;
    this.buttons[3].x = w - this.buttons[3].w + this.padding;
    this.buttons[3].y = this.padding + 75;
    app.ctx.save();
    app.ctx.lineWidth = 1;
    
    // Draw the background
    app.ctx.fillStyle = app.theme.colours.InstrumentEditorBackground;
    app.ctx.strokeStyle = app.theme.colours.OutlineColour;
    app.ctx.fillRect(this.padding, this.padding, w, h);

    // Draw the buttons 
    for (var b of this.buttons) {
      b.draw(app);
    }

    // Draw the compiled generator JSON
    if (this.showCompile) {
      var txt = JSON.stringify(this.target.compile(), null, 2);
      var lineNr = 0;
      app.ctx.fillStyle = app.theme.colours.ModuleText;
      app.ctx.textAlign = "start";
      for (var line of txt.split("\n")) {
        app.ctx.fillText(line, w - 300, 90 + lineNr * 12);
        lineNr++;
      }
    }

    // Draw the modules
    for (var m of this.target.modules) {
      app.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translate
      app.ctx.scale(this.scale, this.scale);
      app.ctx.translate(this.padding, this.padding);
      m.draw(app);
    }
    app.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translate
    app.ctx.scale(this.scale, this.scale);


    app.ctx.fillStyle = app.theme.colours.Patch;
    app.ctx.strokeStyle = app.theme.colours.Patch;

    // Draw the patches
    for (var p of this.target.patches) {
      var fromMod = this.target.modules[p.from];
      var toMod = this.target.modules[p.to];
      var fromSocket = p.getFromSocket(fromMod);
      var toSocket = p.getToSocket(toMod);
      var fromX = this.padding + fromMod.x + fromSocket.x;
      var fromY = this.padding + fromMod.y + fromSocket.y;
      var toX = this.padding + toMod.x + toSocket.x;
      var toY = this.padding + toMod.y + toSocket.y;
      var pointOffset = 70;

      app.ctx.strokeStyle = p.getColor(app.theme);
      app.ctx.lineWidth = 4;
      app.ctx.beginPath();
      app.ctx.moveTo(fromX, fromY);
      app.ctx.bezierCurveTo(
        fromX, 
        fromY + pointOffset, 
        toX, 
        toY + pointOffset, 
        toX, 
        toY);
      app.ctx.stroke();
    }

    app.ctx.restore();
  }
}


/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/*! exports provided: Dial, Socket, InputSocket, OutputSocket, Button, CloseButton, Patch, Module, ModuleUnit, Editor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dial_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dial.js */ "./src/components/dial.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dial", function() { return _dial_js__WEBPACK_IMPORTED_MODULE_0__["Dial"]; });

/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.js */ "./src/components/socket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Socket", function() { return _socket_js__WEBPACK_IMPORTED_MODULE_1__["Socket"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputSocket", function() { return _socket_js__WEBPACK_IMPORTED_MODULE_1__["InputSocket"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OutputSocket", function() { return _socket_js__WEBPACK_IMPORTED_MODULE_1__["OutputSocket"]; });

/* harmony import */ var _button_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./button.js */ "./src/components/button.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _button_js__WEBPACK_IMPORTED_MODULE_2__["Button"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CloseButton", function() { return _button_js__WEBPACK_IMPORTED_MODULE_2__["CloseButton"]; });

/* harmony import */ var _patch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./patch.js */ "./src/components/patch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Patch", function() { return _patch_js__WEBPACK_IMPORTED_MODULE_3__["Patch"]; });

/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./module.js */ "./src/components/module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Module", function() { return _module_js__WEBPACK_IMPORTED_MODULE_4__["Module"]; });

/* harmony import */ var _module_unit_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./module_unit.js */ "./src/components/module_unit.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModuleUnit", function() { return _module_unit_js__WEBPACK_IMPORTED_MODULE_5__["ModuleUnit"]; });

/* harmony import */ var _editor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.js */ "./src/components/editor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Editor", function() { return _editor_js__WEBPACK_IMPORTED_MODULE_6__["Editor"]; });










/***/ }),

/***/ "./src/components/module.js":
/*!**********************************!*\
  !*** ./src/components/module.js ***!
  \**********************************/
/*! exports provided: Module */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Module", function() { return Module; });
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socket.js */ "./src/components/socket.js");
/* harmony import */ var _dial_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dial.js */ "./src/components/dial.js");



class Module {
  constructor(target, x, y, unit) {
    this.target = target;
    this.x = x;
    this.y = y;
    this.unit = unit;
    this.selected = null;
  }
  draw(app) {
    app.ctx.translate(this.x, this.y);
    this.unit.draw(app);
  }
  handleMouseDown(app, x, y) {
    this.selected = null;
    var v = this.unit.handleMouseDown(app, x - this.x, y - this.y);
    if (!v) {
      return false;
    }
    this.selected = v;
    return this;
  }
  handleDrag(app, dx, dy, x, y) {
    var v = this.selected;
    if (v instanceof _socket_js__WEBPACK_IMPORTED_MODULE_0__["Socket"]) {
      v.handleDrag(app, dx, dy, x, y);
    } else if (v instanceof _dial_js__WEBPACK_IMPORTED_MODULE_1__["Dial"]) {
      v.handleDrag(app, dx, dy, x - this.x, y - this.y);
    } else {
      this.x += dx;
      this.y += dy;
    }
  }
  handleDrop(app, x, y) {
    var v = this.selected;
    if (v instanceof _socket_js__WEBPACK_IMPORTED_MODULE_0__["Socket"]) {
      for (var module of this.target.modules) {
        for (var key of Object.keys(module.unit.sockets)) {
          var s = module.unit.sockets[key];
          var sx = x - module.x;
          var sy = y - module.y;
          var result = s.handleMouseDown(app, sx, sy);
          if (result) {
            this.target.addPatch(this, module, v.label, result.label);
            app.draw();
            return;
          }
        }
      }
    }
    this.selected = null;
  }
}


/***/ }),

/***/ "./src/components/module_unit.js":
/*!***************************************!*\
  !*** ./src/components/module_unit.js ***!
  \***************************************/
/*! exports provided: ModuleUnit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModuleUnit", function() { return ModuleUnit; });
class ModuleUnit {
  constructor(type) {
    this.type = type;
    this.w = 150;
    this.h = 150;
    this.sockets = {};
    this.dials = {};
    this.background = "";
  }
  draw(app) {
    var w = this.w;
    var h = this.h;
    app.ctx.fillStyle = app.theme.colours[this.background];
    app.ctx.strokeStyle = app.theme.colours.ModuleOutline;
    app.ctx.fillRect(0, 0, w, h);
    app.ctx.strokeRect(0, 0, w, h);
    app.ctx.fillStyle = app.theme.colours.ModuleText;
    app.ctx.font = '14px mono';
    app.ctx.textAlign = "center";
    app.ctx.fillText(this.type, w / 2, 14);
    for (var o of Object.keys(this.sockets)) {
      this.sockets[o].draw(app);
    }
    for (var o of Object.keys(this.dials)) {
      this.dials[o].draw(app);
    }
  }
  handleMouseDown(app, x, y) {
    for (var o of Object.keys(this.sockets)) {
      var v = this.sockets[o].handleMouseDown(app, x, y);
      if (v) {
        return v;
      }
    }
    for (var o of Object.keys(this.dials)) {
      var v = this.dials[o].handleMouseDown(app, x, y);
      if (v) {
        return v;
      }
    }
    var path = new Path2D();
    path.rect(0, 0, this.w, this.h);
    if (app.ctx.isPointInPath(path, x, y)) {
      return this;
    }
  }

  // connections is a {} mapping this unit's input socket IDs 
  // to a list of connected units.
  //
  compile(connections) {
    return null;
  }
}



/***/ }),

/***/ "./src/components/patch.js":
/*!*********************************!*\
  !*** ./src/components/patch.js ***!
  \*********************************/
/*! exports provided: Patch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Patch", function() { return Patch; });
class Patch {
  constructor(fromModule, toModule, fromSocket, toSocket, type) {
    this.from = fromModule;
    this.to = toModule;
    this.fromSocket = fromSocket;
    this.toSocket = toSocket;
    if (!type) {
      throw 'Missing type in Patch';
    }
    this.type = type;
  }
  getFromSocket(mod) {
    return mod.unit.sockets[this.fromSocket];
  }
  getToSocket(mod) {
    return mod.unit.sockets[this.toSocket];
  }
  isIsomorphic(p) {
    return (this.from == p.from 
        && this.to == p.to 
        && this.fromSocket == p.fromSocket 
        && this.toSocket == p.toSocket) 
      || 
      (this.to == p.from
        && this.from == p.to 
        && this.fromSocket == p.toSocket 
        && this.toSocket == p.fromSocket);
  }
  doesPatchConnectTo(module, socket) {
    return (this.from == module && this.fromSocket == socket) ||
      (this.to == module && this.toSocket == socket)
  }
  connectsTo(module, socket) {
    if (this.from == module && this.fromSocket == socket) {
      return {module: this.to, socket: this.toSocket}
    }
    return {module: this.from, socket: this.fromSocket}
  }
  getColor(theme) {
    if (theme.colours.Patches[this.type]) {
      return theme.colours.Patches[this.type];
    }
    return theme.colours.Patch;
  }
}



/***/ }),

/***/ "./src/components/socket.js":
/*!**********************************!*\
  !*** ./src/components/socket.js ***!
  \**********************************/
/*! exports provided: Socket, InputSocket, OutputSocket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Socket", function() { return Socket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputSocket", function() { return InputSocket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutputSocket", function() { return OutputSocket; });
class Socket {
  constructor(x, y, label, type, isInput) {
    this.x = x;
    this.y = y;
    this.label = label;
    this.radius = 8;
    this.type = type;
    this.isInput = isInput;
    if (!type) {
      throw 'Missing Socket type for Socket with label: ' + label;
    }
    if (isInput === undefined) {
      throw 'Missing Socket isInput for Socket with label: ' + label;
    }
  }
  draw(app) {
    // Draw Octagon
    var octa_short = 0.29289321881345247559915563789515;;
    var octa_long = 1 - octa_short;
    var octagon = {
      size: 2 * this.radius + 4,
    }
    var x = this.x - this.radius - 2;
    var y = this.y - this.radius - 2;
    app.ctx.beginPath();
    app.ctx.fillStyle = app.theme.colours.SocketBackground;
    if (app.theme.colours.Sockets[this.type]) { 
      app.ctx.fillStyle = app.theme.colours.Sockets[this.type];
    }
    app.ctx.strokeStyle = app.theme.colours.SocketOutline;
    app.ctx.moveTo(x + octagon.size * octa_short, y);
    app.ctx.lineTo(x, y + octagon.size * octa_short);
    app.ctx.lineTo(x, y + octagon.size * octa_long);
    app.ctx.lineTo(x + octagon.size * octa_short, y + octagon.size);
    app.ctx.lineTo(x + octagon.size * octa_long, y + octagon.size);
    app.ctx.lineTo(x + octagon.size, y +  octagon.size * octa_long);
    app.ctx.lineTo(x + octagon.size, y + octagon.size * octa_short);
    app.ctx.lineTo(x + octagon.size * octa_long, y);
    app.ctx.lineTo(x + octagon.size * octa_short, y);
    app.ctx.fill();
    app.ctx.stroke();

    // Draw hole
    app.ctx.strokeStyle = app.theme.colours.SocketInside;
    app.ctx.fillStyle = app.theme.colours.SocketInside;
    app.ctx.beginPath();
    app.ctx.arc(this.x, this.y, this.radius - 2, 0, 2 * Math.PI);
    app.ctx.fill();

    // Draw label
    app.ctx.fillStyle = app.theme.colours.ModuleText;
    app.ctx.font = '10px mono';
    var centerX = this.x;
    app.ctx.textAlign = "center";
    app.ctx.fillText(this.label, centerX, y - 3);
  }
  handleMouseDown(app, x, y) {
    if (x >= this.x - this.radius && x <= this.x + this.radius + 4 && y >= this.y - this.radius && y <= this.y + this.radius + 4) {
      return this;
    }
  }
  handleDrag(app, dx, dy, x, y) {
    if (this.onDrag) {
      this.onDrag(app, this, dx, dy, x, y);
    }
  }
}

class InputSocket extends Socket {
  constructor(x, y, label, type) {
    super(x, y, label, type, true);
  }
}

class OutputSocket extends Socket {
  constructor(x, y, label, type) {
    super(x, y, label, type, false);
  }
}


/***/ }),

/***/ "./src/instrument_editor/index.js":
/*!****************************************!*\
  !*** ./src/instrument_editor/index.js ***!
  \****************************************/
/*! exports provided: Instrument, InstrumentEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstrumentEditor", function() { return InstrumentEditor; });
/* harmony import */ var _instrument_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instrument.js */ "./src/instrument_editor/instrument.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Instrument", function() { return _instrument_js__WEBPACK_IMPORTED_MODULE_0__["Instrument"]; });

/* harmony import */ var _module_units__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module_units */ "./src/instrument_editor/module_units/index.js");
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ */ "./src/components/index.js");





class InstrumentEditor extends _components___WEBPACK_IMPORTED_MODULE_2__["Editor"] {
  constructor(app, instrument, handleClose) {
    super(app, instrument, handleClose);
    if (!instrument) {
      instrument = new _instrument_js__WEBPACK_IMPORTED_MODULE_0__["Instrument"]([], []);
      var modules = [
        new _components___WEBPACK_IMPORTED_MODULE_2__["Module"](instrument, 30, 30, new _module_units__WEBPACK_IMPORTED_MODULE_1__["ChannelInput"]('input')), 
        new _components___WEBPACK_IMPORTED_MODULE_2__["Module"](instrument, 800, 30, new _module_units__WEBPACK_IMPORTED_MODULE_1__["ChannelOutput"]('output')),
      ];
      instrument.modules = modules;
    }
    this.target = instrument;
    var buttonDefs = [
        {label: "SIN", onclick: () => this.handleAddGenerator("sine")},
        {label: "SQU", onclick: () => this.handleAddGenerator("square")},
        {label: "SAW", onclick: () => this.handleAddGenerator("saw")},
        {label: "TRI", onclick: () => this.handleAddGenerator("triangle")},
        {label: "PWM", onclick: () => this.handleAddGenerator("pulse")},
        {label: "WAV", onclick: () => this.handleAddGenerator("wav")},
        {label: "NOI", onclick: () => this.handleAddGenerator("white_noise")},
        {label: "GRA", onclick: () => this.handleAddGenerator("grain")},
        {label: "VOC", onclick: () => this.handleAddGenerator("vocoder")},
    ];
    var filterDefs = [
      {label: "LPF", onclick: () => this.handleAddFilter("low pass filter")},
      {label: "HPF", onclick: () => this.handleAddFilter("high pass filter")},
      {label: "DLY", onclick: () => this.handleAddFilter("delay")},
      {label: "FLA", onclick: () => this.handleAddFilter("flanger")},
      {label: "DIS", onclick: () => this.handleAddFilter("distortion")},
      {label: "OVR", onclick: () => this.handleAddFilter("overdrive")},
      {label: "TRE", onclick: () => this.handleAddFilter("tremelo")},
    ];
    var derivedDefs = [
      {label: "TRA", onclick: () => this.handleAddUnit(() => new _module_units__WEBPACK_IMPORTED_MODULE_1__["Transpose"]("transpose"))},
      {label: "PAN", onclick: () => this.handleAddUnit(() => new _module_units__WEBPACK_IMPORTED_MODULE_1__["Panning"]("panning"))},
    ];
    var x = 10;
    for (var def of buttonDefs) {
      var b = new _components___WEBPACK_IMPORTED_MODULE_2__["Button"](x, 0, def.onclick.bind(this), def.label);
      b.colour = app.theme.colours.ModuleGenerator;
      this.buttons.push(b);
      x += b.w + 3;
    }
    for (var def of filterDefs) {
      var b = new _components___WEBPACK_IMPORTED_MODULE_2__["Button"](x, 0, def.onclick.bind(this), def.label);
      b.colour = app.theme.colours.ModuleFilter;
      this.buttons.push(b);
      x += b.w + 3;
    }
    for (var def of derivedDefs) {
      var b = new _components___WEBPACK_IMPORTED_MODULE_2__["Button"](x, 0, def.onclick.bind(this), def.label);
      b.colour = app.theme.colours.ModuleDerived;
      this.buttons.push(b);
      x += b.w + 3;
    }
  }
  handleAddFilter(type) {
    return this.handleAddUnit(() => new _module_units__WEBPACK_IMPORTED_MODULE_1__["Filter"](type));
  }
  handleAddGenerator(type) {
    return this.handleAddUnit(() => new _module_units__WEBPACK_IMPORTED_MODULE_1__["SampleGenerator"](type));
  }
}



/***/ }),

/***/ "./src/instrument_editor/instrument.js":
/*!*********************************************!*\
  !*** ./src/instrument_editor/instrument.js ***!
  \*********************************************/
/*! exports provided: Instrument */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Instrument", function() { return Instrument; });
/* harmony import */ var _module_units__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module_units */ "./src/instrument_editor/module_units/index.js");
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/ */ "./src/model/index.js");




class Instrument extends _model___WEBPACK_IMPORTED_MODULE_2__["Patchable"] {
  constructor(modules, patches) {
    super(modules, patches);
    this.name = null;
    this.instrumentBankIndex = null;
    this.modules = [];
    this.patches = [];
  }
  loadFromDefinition(instrDef) {
    var modules = [
      new _components___WEBPACK_IMPORTED_MODULE_1__["Module"](this, 10, 40, new _module_units__WEBPACK_IMPORTED_MODULE_0__["ChannelInput"]('input')), 
      new _components___WEBPACK_IMPORTED_MODULE_1__["Module"](this, 700, 40, new _module_units__WEBPACK_IMPORTED_MODULE_0__["ChannelOutput"]('output')),
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
          if (s[key].type === _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]) {
            candidate = key;
            break;
          }
        }
        this.addPatch(ix, 0, "FREQ", candidate, _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]);
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
      var g = new _module_units__WEBPACK_IMPORTED_MODULE_0__["Panning"]("panning");
      var tIx = this.addModule(g);
      var ix = this.loadGenerator(instrDef["panning"], input, output);
      this.addPatch(tIx, ix, "PAN", "PAN", _model___WEBPACK_IMPORTED_MODULE_2__["PANNING_TYPE"]);
      this.addPatch(input, tIx, "FREQ", "FREQ", _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]);
      return ix;
    } else if (instrDef["transpose"]) {
      var g = new _module_units__WEBPACK_IMPORTED_MODULE_0__["Transpose"]("transpose");
      g.dials["semitones"].value = instrDef["transpose"]["semitones"] || 0;
      var tIx = this.addModule(g);
      var ix = this.loadGenerator(instrDef["transpose"], tIx, output);
      this.addPatch(tIx, ix, "FREQ", "FREQ", _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]);
      this.addPatch(input, tIx, "FREQ", "FREQ IN", _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]);
      return ix;
    } else if (instrDef["sine"] 
      || instrDef["triangle"] 
      || instrDef["square"] 
      || instrDef["sawtooth"] 
      || instrDef["white_noise"]
      || instrDef["pulse"]
      || instrDef["wav"]) {
      var g = new _module_units__WEBPACK_IMPORTED_MODULE_0__["Factory"]().generatorFromDefinition(instrDef);
      var ix = this.addModule(g);
      this.addPatch(ix, output, "OUT", "IN", _model___WEBPACK_IMPORTED_MODULE_2__["AUDIO_TYPE"]);
      return ix;
    } else if (instrDef["vocoder"]) {
      var source = new _module_units__WEBPACK_IMPORTED_MODULE_0__["Factory"]().generatorFromDefinition(instrDef["vocoder"]["source"])
      var vocoder = new _module_units__WEBPACK_IMPORTED_MODULE_0__["Factory"]().generatorFromDefinition(instrDef["vocoder"]["vocoder"])
      return [];
    } else if (instrDef["filter"]) {
      var g = new _module_units__WEBPACK_IMPORTED_MODULE_0__["Factory"]().filterFromDefinition(instrDef["filter"])
      var tIx = this.addModule(g);
      var ix = this.loadGenerator(instrDef["filter"], input, tIx);
      this.addPatch(tIx, output, "OUT", "IN", _model___WEBPACK_IMPORTED_MODULE_2__["AUDIO_TYPE"]);
      return ix;
    } else {
      console.log(instrDef);
      throw 'Unknown instrument def';
    }
  }
  addModule(generator) {
    var m = new _components___WEBPACK_IMPORTED_MODULE_1__["Module"](this, Math.random() * 800 + 100, Math.random() * 600, generator);
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
    var p = new _components___WEBPACK_IMPORTED_MODULE_1__["Patch"](fromModule, toModule, fromSocket, toSocket, type);
    this.patches.push(p);
  }
  load(instrDef) {
    var modules = [];
    for (var m of instrDef.modules) {
      var g = null;
      if (m.type == "input") {
        g = new _module_units__WEBPACK_IMPORTED_MODULE_0__["ChannelInput"](m.type);
      } else if (m.type == "output") {
        g = new _module_units__WEBPACK_IMPORTED_MODULE_0__["ChannelOutput"](m.type);
      } else if (m.type == "low pass filter") {
        g = new _module_units__WEBPACK_IMPORTED_MODULE_0__["Filter"](m.type);
      } else if (m.type == "sine" || m.type == "triangle") {
        g = new _module_units__WEBPACK_IMPORTED_MODULE_0__["SampleGenerator"](m.type);
      }
      if (g) {
        var mod = new _components___WEBPACK_IMPORTED_MODULE_1__["Module"](this, m.x, m.y, g);
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
        g = unit.compile();
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



/***/ }),

/***/ "./src/instrument_editor/module_units/channel_input.js":
/*!*************************************************************!*\
  !*** ./src/instrument_editor/module_units/channel_input.js ***!
  \*************************************************************/
/*! exports provided: ChannelInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChannelInput", function() { return ChannelInput; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class ChannelInput extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(type) {
    super(type);
    this.sockets = {
      "FREQ": new _components___WEBPACK_IMPORTED_MODULE_0__["OutputSocket"](this.w - 29, this.h - 29, "FREQ", _model___WEBPACK_IMPORTED_MODULE_1__["FREQUENCY_TYPE"]),
    }
    this.background = 'ModuleOutput';
  }
}


/***/ }),

/***/ "./src/instrument_editor/module_units/channel_output.js":
/*!**************************************************************!*\
  !*** ./src/instrument_editor/module_units/channel_output.js ***!
  \**************************************************************/
/*! exports provided: ChannelOutput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChannelOutput", function() { return ChannelOutput; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");




class ChannelOutput extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(type) {
    super(type);
    this.sockets = {
      "IN": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "IN", _model___WEBPACK_IMPORTED_MODULE_1__["AUDIO_TYPE"]),
    }
    this.background = 'ModuleOutput';
  }
}



/***/ }),

/***/ "./src/instrument_editor/module_units/factory.js":
/*!*******************************************************!*\
  !*** ./src/instrument_editor/module_units/factory.js ***!
  \*******************************************************/
/*! exports provided: Factory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Factory", function() { return Factory; });
/* harmony import */ var _sample_generator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sample_generator.js */ "./src/instrument_editor/module_units/sample_generator.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter.js */ "./src/instrument_editor/module_units/filter.js");




class Factory {

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
      var g = new _sample_generator_js__WEBPACK_IMPORTED_MODULE_0__["SampleGenerator"](typ)
      g.dials["attack"].value = instr["attack"] || 0.0;
      g.dials["decay"].value = instr["decay"] || 0.0;
      g.dials["sustain"].value = instr["sustain"] || 0.0;
      g.dials["release"].value = instr["release"] || 0.0;
      g.dials["gain"].value = instr["gain"] || 1.0;
      return g;
    } else if (instrDef["wav"]) {
      var g = new _sample_generator_js__WEBPACK_IMPORTED_MODULE_0__["WavGenerator"]();
      var instr = instrDef["wav"];
      g.file = instr["file"] || "";
      g.is_pitched = instr["pitched"] || false;
      g.base_pitch = instr["base_pitch"] || 440.0;
      g.dials["attack"].value = instr["attack"] || 0.0;
      g.dials["decay"].value = instr["decay"] || 0.0;
      g.dials["sustain"].value = instr["sustain"] || 0.0;
      g.dials["release"].value = instr["release"] || 0.0;
      g.dials["gain"].value = instr["gain"] || 1.0;
      return g;
    } else if (instrDef["pulse"]) {
      var g = new _sample_generator_js__WEBPACK_IMPORTED_MODULE_0__["SampleGenerator"]("pulse");
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
      var g = new _filter_js__WEBPACK_IMPORTED_MODULE_1__["Filter"]("low pass filter")
      g.dials["cutoff"].value = filterDef["lpf"]["cutoff"] || 5000;
      return g;
    } else if (filterDef["distortion"]) {
      var g = new _filter_js__WEBPACK_IMPORTED_MODULE_1__["Filter"]("distortion")
      return g;
    } else if (filterDef["overdrive"]) {
      var g = new _filter_js__WEBPACK_IMPORTED_MODULE_1__["Filter"]("overdrive")
      return g;
    } else if (filterDef["flanger"]) {
      var g = new _filter_js__WEBPACK_IMPORTED_MODULE_1__["Filter"]("flanger")
      return g;
    } else if (filterDef["average"]) {
      var g = new _filter_js__WEBPACK_IMPORTED_MODULE_1__["Filter"]("average")
      return g;
    } else {
      console.log(filterDef);
      throw 'Unknown filter def';
    }
  }
}


/***/ }),

/***/ "./src/instrument_editor/module_units/filter.js":
/*!******************************************************!*\
  !*** ./src/instrument_editor/module_units/filter.js ***!
  \******************************************************/
/*! exports provided: Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class Filter extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(type) {
    super(type);
    this.sockets = {
      "IN": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "IN", _model___WEBPACK_IMPORTED_MODULE_1__["AUDIO_TYPE"]),
      "OUT": new _components___WEBPACK_IMPORTED_MODULE_0__["OutputSocket"](this.w - 29, this.h - 29, "OUT", _model___WEBPACK_IMPORTED_MODULE_1__["AUDIO_TYPE"]),
    }
    this.background = 'ModuleFilter';
    this.dials = { }

    if (type === "low pass filter" || type === "high pass filter") {
      this.w = 150;
      this.dials["cutoff"] = new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 59, "CUTOFF", 1.0, 22000.0, 5000.0);
    } else if (type === "delay") {
      this.w = 170;
      this.dials["time"] = new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 59, "TIME", 0.00001, 4.0, 1.0);
      this.dials["factor"] = new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](79, 59, "FACTOR", 0.0, 2.0, 1.0);
      this.dials["feedback"] = new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](129, 59, "FEEDBACK", 0.0, 2.0, 0.0);
    }
  }
}


/***/ }),

/***/ "./src/instrument_editor/module_units/index.js":
/*!*****************************************************!*\
  !*** ./src/instrument_editor/module_units/index.js ***!
  \*****************************************************/
/*! exports provided: ChannelInput, ChannelOutput, Filter, SampleGenerator, Transpose, Panning, Factory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _channel_input_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./channel_input.js */ "./src/instrument_editor/module_units/channel_input.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ChannelInput", function() { return _channel_input_js__WEBPACK_IMPORTED_MODULE_0__["ChannelInput"]; });

/* harmony import */ var _channel_output_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./channel_output.js */ "./src/instrument_editor/module_units/channel_output.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ChannelOutput", function() { return _channel_output_js__WEBPACK_IMPORTED_MODULE_1__["ChannelOutput"]; });

/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filter.js */ "./src/instrument_editor/module_units/filter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return _filter_js__WEBPACK_IMPORTED_MODULE_2__["Filter"]; });

/* harmony import */ var _sample_generator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sample_generator.js */ "./src/instrument_editor/module_units/sample_generator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SampleGenerator", function() { return _sample_generator_js__WEBPACK_IMPORTED_MODULE_3__["SampleGenerator"]; });

/* harmony import */ var _transpose_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transpose.js */ "./src/instrument_editor/module_units/transpose.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Transpose", function() { return _transpose_js__WEBPACK_IMPORTED_MODULE_4__["Transpose"]; });

/* harmony import */ var _panning_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./panning.js */ "./src/instrument_editor/module_units/panning.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Panning", function() { return _panning_js__WEBPACK_IMPORTED_MODULE_5__["Panning"]; });

/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./factory.js */ "./src/instrument_editor/module_units/factory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Factory", function() { return _factory_js__WEBPACK_IMPORTED_MODULE_6__["Factory"]; });










/***/ }),

/***/ "./src/instrument_editor/module_units/panning.js":
/*!*******************************************************!*\
  !*** ./src/instrument_editor/module_units/panning.js ***!
  \*******************************************************/
/*! exports provided: Panning */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Panning", function() { return Panning; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class Panning extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(type) {
    super(type);
    this.background = 'ModuleDerived';
    this.w = 120;
    this.h = 150;
    this.sockets = {
      "FREQ": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "FREQ", _model___WEBPACK_IMPORTED_MODULE_1__["FREQUENCY_TYPE"]),
      "PAN": new _components___WEBPACK_IMPORTED_MODULE_0__["OutputSocket"](this.w - 29, this.h - 29, "PAN", _model___WEBPACK_IMPORTED_MODULE_1__["PANNING_TYPE"]),
    }
    this.dials = {
    }
  }
}


/***/ }),

/***/ "./src/instrument_editor/module_units/sample_generator.js":
/*!****************************************************************!*\
  !*** ./src/instrument_editor/module_units/sample_generator.js ***!
  \****************************************************************/
/*! exports provided: SampleGenerator, WavGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SampleGenerator", function() { return SampleGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WavGenerator", function() { return WavGenerator; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class SampleGenerator extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(type) {
    super(type);
    this.background = 'ModuleGenerator';
    this.w = 220;
    this.h = 250;
    this.sockets = {
      "FREQ": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "FREQ", _model___WEBPACK_IMPORTED_MODULE_1__["FREQUENCY_TYPE"]),
      "PAN": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](79, this.h - 29, "PAN", _model___WEBPACK_IMPORTED_MODULE_1__["PANNING_TYPE"]),
      "OUT": new _components___WEBPACK_IMPORTED_MODULE_0__["OutputSocket"](this.w - 29, this.h - 29, "OUT", _model___WEBPACK_IMPORTED_MODULE_1__["AUDIO_TYPE"]),
    }
    this.dials = {
      "pitch": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 49, "FREQ", 0.0, 22000.0, 0.0),
      "gain": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](79, 49, "GAIN", 0.0, 4.0, 1.0),
      "panning": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](129, 49, "PAN", 0.0, 1.0, 0.5),
      "attack": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 120, "ATTACK", 0.0, 10.0, 0.1),
      "decay": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](79, 120, "DECAY", 0.0, 10.0, 0.1),
      "sustain": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](129, 120, "SUSTAIN", 0.0, 1.0, 0.8),
      "release": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](179, 120, "RELEASE", 0.0, 10, 0.1),
    }
  }
}


class WavGenerator extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor() {
    super("wav");
    this.background = 'ModuleGenerator';
    this.w = 220;
    this.h = 250;
    this.file = "";
    this.is_pitched = false;
    this.base_pitch = 440.0;
    // TODO: file input and is_pitched boolean
    this.sockets = {
      "FREQ": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "FREQ", _model___WEBPACK_IMPORTED_MODULE_1__["FREQUENCY_TYPE"]),
      "PAN": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](79, this.h - 29, "PAN", _model___WEBPACK_IMPORTED_MODULE_1__["PANNING_TYPE"]),
      "OUT": new _components___WEBPACK_IMPORTED_MODULE_0__["OutputSocket"](this.w - 29, this.h - 29, "OUT", _model___WEBPACK_IMPORTED_MODULE_1__["AUDIO_TYPE"]),
    }
    this.dials = {
      "pitch": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 49, "FREQ", 0.0, 22000.0, 0.0),
      "gain": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](79, 49, "GAIN", 0.0, 4.0, 1.0),
      "panning": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](129, 49, "PAN", 0.0, 1.0, 0.5),
      "attack": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 120, "ATTACK", 0.0, 10.0, 0.1),
      "decay": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](79, 120, "DECAY", 0.0, 10.0, 0.1),
      "sustain": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](129, 120, "SUSTAIN", 0.0, 1.0, 0.8),
      "release": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](179, 120, "RELEASE", 0.0, 10, 0.1),
    }
  }

  compile() {
    return {
      "wav": {
        "file": this.file,
        "gain": this.dials["gain"].value,
        "pitched": this.is_pitched,
        "base_pitch": this.base_pitch,
      }
    };
  }
}


/***/ }),

/***/ "./src/instrument_editor/module_units/transpose.js":
/*!*********************************************************!*\
  !*** ./src/instrument_editor/module_units/transpose.js ***!
  \*********************************************************/
/*! exports provided: Transpose */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transpose", function() { return Transpose; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class Transpose extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(type) {
    super(type);
    this.background = 'ModuleDerived';
    this.w = 120;
    this.h = 150;
    this.sockets = {
      "FREQ IN": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "FREQ IN", _model___WEBPACK_IMPORTED_MODULE_1__["FREQUENCY_TYPE"]),
      "FREQ": new _components___WEBPACK_IMPORTED_MODULE_0__["OutputSocket"](this.w - 29, this.h - 29, "FREQ", _model___WEBPACK_IMPORTED_MODULE_1__["FREQUENCY_TYPE"]),
    }
    this.dials = {
      "semitones": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 49, "SEMITONES", -24, 24, 0.0),
    }
  }
}


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: Bleep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bleep", function() { return Bleep; });
/* harmony import */ var _theme_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./theme.js */ "./src/theme.js");
/* harmony import */ var _instrument_editor___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instrument_editor/ */ "./src/instrument_editor/index.js");
/* harmony import */ var _timeline_editor___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timeline_editor/ */ "./src/timeline_editor/index.js");
/* harmony import */ var _sequence_editor___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sequence_editor/ */ "./src/sequence_editor/index.js");
/* harmony import */ var _api___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api/ */ "./src/api/index.js");






class Bleep {
  constructor() {
    this.canvas = document.getElementById('main');
    this.theme = new _theme_js__WEBPACK_IMPORTED_MODULE_0__["Theme"]();
    this.ctx = this.canvas.getContext('2d');
    this.canvas.onmousedown = this.handleMouseDown.bind(this)
    this.canvas.onmouseup = this.handleMouseUp.bind(this)
    this.canvas.onmousemove = this.handleMouseMove.bind(this)
    this.selectedElem = null;
    this.startSelectedPos = {};
    this.selectedPos = {};
    this.api = new _api___WEBPACK_IMPORTED_MODULE_4__["API"](this);
    this.api.start();
    this.channels = [new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["Channel"](1, this.openInstrumentEditor.bind(this))];
    //this.load(example);
    //this.openInstrumentEditor(bank.instruments[0]);
    //this.openSequenceEditor(null, 1);
    this.openTimelineEditor();
    this.draw();
  }

  initialiseChannels(channelDefs) {
    this.channels = [];
    for (var def of channelDefs) {
      var ch = new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["Channel"](def.channel, this.openInstrumentEditor.bind(this));
      ch.loadFromDefinition(def);
      this.channels.push(ch);
      ch.instrument = new _instrument_editor___WEBPACK_IMPORTED_MODULE_1__["Instrument"]();
      if (def.generator) {
        console.log("Loading channel generator", def.generator);
        ch.instrument.loadFromDefinition(def.generator);
      }
      console.log("New channel", def);
    }
    this.api.requestSequencerDef();
    this.openTimelineEditor();
  }
  
  initialiseSequenceTracks(sequences) {
    var channelSequences = {};
    for (var ch of this.channels) {
      channelSequences[ch.channelNr] = [];
    }
    for (var seq of sequences) {
      var defs = this.sequenceDefByChannel(seq);
      for (var ch of this.channels) {
        for (var s of defs[ch.channelNr]) {
          channelSequences[ch.channelNr].push(s);
        }
      }
    }
    console.log(channelSequences);
    for (var ch of this.channels) {
      ch.initialiseSequenceTracks(channelSequences[ch.channelNr]);
    }
    this.openTimelineEditor();
    this.uploadSequencerDef();
  }

  compile() {
    var result = {
      "bpm": 120,
      "granularity": 64,
      "channels": [],
      "sequences": [],
    };
    for (var ch of this.channels) {
      var channelResult = ch.compile();
      if (channelResult.channel) {
        result.channels.push(channelResult.channel);
      }
      for (var s of channelResult.sequences) {
        result.sequences.push(s);
      }
    }
    console.log(result);
    return result;
  }

  uploadSequencerDef() {
    this.api.setSequencerDef(this.compile());
  }

  sequenceDefByChannel(seq) {
    var channelSequences = {};
    for (var ch of this.channels) {
      channelSequences[ch.channelNr] = [];
    }
    var leaves = ["play_note", "play_notes", "volume",
                  "lpf_cutoff", "hpf_cutoff", "panning"];
    for (var leaf of leaves) {
      if (seq[leaf]) {
        var s = seq[leaf];
        if (channelSequences[s.channel]) {
          channelSequences[s.channel].push(seq);
        } else {
          console.log("Missing channel", s);
        }
        return channelSequences;
      }
    }

    var wrappedSequences = ["repeat", "after", "before", "euclidian", "offset"];
    for (var wrapped of wrappedSequences) {
      if (seq[wrapped]) {
        if (!seq[wrapped].sequence) {
          console.log("Missing sequence", seq);
        }
        var ch = this.sequenceDefByChannel(seq[wrapped].sequence)
        for (var channelNr of Object.keys(ch)) {
          var seqs = ch[channelNr];
          if (seqs.length == 0) {
            continue;
          } 
          for (var defSeq of seqs) {
            var result = {};
            for (var key of Object.keys(seq)) {
              result[key] = seq[key];
            }
            result.sequence = defSeq;
            channelSequences[channelNr].push(result);
          }
        }
        return channelSequences;
      }
    }
    if (seq.combine) {
      for (var seq of seq.combine) {
        var defs = this.sequenceDefByChannel(seq);
        for (var ch of this.channels) {
          for (var s of defs[ch.channelNr]) {
            channelSequences[ch.channelNr].push(s);
          }
        }
      }
    } else {
      console.log("unknown def", seq);
    }
    return channelSequences;
  }

  load(data) {
    this.channels = [];
    for (var ch of data.channels) {
      var channel = new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["Channel"](ch.channel_nr, this.openInstrumentEditor.bind(this));
      channel.name = ch.name;
      channel.sequence_tracks = ch.sequence_tracks;
      if (ch.instrument) {
        channel.instrument = new _instrument_editor___WEBPACK_IMPORTED_MODULE_1__["Instrument"]();
        channel.instrument.load(ch.instrument);
      }
      this.channels.push(channel);
    }
  }

  openInstrumentEditor(instr) {
    this.active = new _instrument_editor___WEBPACK_IMPORTED_MODULE_1__["InstrumentEditor"](this, instr, this.openTimelineEditor.bind(this));
    this.draw()
  }
  openTimelineEditor() {
    this.active = new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["TimelineEditor"](this.channels);
    this.draw();
  }
  openSequenceEditor(sequence, channelNr) {
    this.active = new _sequence_editor___WEBPACK_IMPORTED_MODULE_3__["SequenceEditor"](this, sequence, channelNr, this.openTimelineEditor.bind(this))
    this.draw();
  }

  handleMouseDown(e) {
    var bound = this.canvas.getBoundingClientRect()
    var x = e.clientX - bound.left; 
    var y = e.clientY - bound.top;
    this.selectedElem = null;
    this.selectedPos = {};
    if (this.active.handleMouseDown) {
      var elem = this.active.handleMouseDown(this, x, y);
      if (elem) {
        this.selectedElem = elem;
        this.startSelectedPos = {x, y};
        this.selectedPos = {x, y};
      }
    }
  }

  handleMouseUp(e) {
    var bound = this.canvas.getBoundingClientRect()
    var x = e.clientX - bound.left; 
    var y = e.clientY - bound.top;
    if (this.selectedElem) {
      var elem = this.selectedElem;
      var sx = this.startSelectedPos.x;
      var sy = this.startSelectedPos.y;
      if (sx >= x -5 && sx <= x + 5 && sy >= y - 5 && sy <= y + 5) {
        if (elem.handleClick) {
          elem.handleClick(this, x, y);
        }
      } else {
        if (elem.handleDrop) {
          elem.handleDrop(this, x, y);
          this.draw();
        }
      }
      this.selectedElem = null;
    }
  }

  handleMouseMove(e) {
    var bound = this.canvas.getBoundingClientRect()
    var x = e.clientX - bound.left; 
    var y = e.clientY - bound.top;
    if (this.selectedElem) {
      var elem = this.selectedElem;
      var sx = this.selectedPos.x;
      var sy = this.selectedPos.y;
      if (sx >= x -5 && sx <= x + 5 && sy >= y - 5 && sy <= y + 5) {
      } else {
        if (elem.handleDrag) {
          elem.handleDrag(this, x - sx, y - sy, x, y, sx, sy);
          this.selectedPos = {x, y};
          this.draw();
        }
      }
    }
  }

  draw() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var bound = this.canvas.getBoundingClientRect()
    this.canvas.width = windowWidth;
    this.canvas.height = windowHeight - bound.top;
    var body = document.getElementsByTagName('body')[0];
    body.style.background = this.theme.colours.Background;
    body.style.color = this.theme.colours.Foreground;
    this.active.draw(this);
  }
}

window.onload = () => {
  try { 
  new Bleep();
  } catch(e) {
    console.log(e);
    alert(e);
  }
}


/***/ }),

/***/ "./src/model/index.js":
/*!****************************!*\
  !*** ./src/model/index.js ***!
  \****************************/
/*! exports provided: AUDIO_TYPE, FREQUENCY_TYPE, PANNING_TYPE, CLOCK_TYPE, TRIGGER_TYPE, INT_TYPE, Patchable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUDIO_TYPE", function() { return AUDIO_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FREQUENCY_TYPE", function() { return FREQUENCY_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PANNING_TYPE", function() { return PANNING_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLOCK_TYPE", function() { return CLOCK_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRIGGER_TYPE", function() { return TRIGGER_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INT_TYPE", function() { return INT_TYPE; });
/* harmony import */ var _patchable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./patchable.js */ "./src/model/patchable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Patchable", function() { return _patchable_js__WEBPACK_IMPORTED_MODULE_0__["Patchable"]; });

const AUDIO_TYPE = 1;
const FREQUENCY_TYPE = 2;
const PANNING_TYPE = 3;
const CLOCK_TYPE = 4;
const TRIGGER_TYPE = 5;
const INT_TYPE = 6;



/***/ }),

/***/ "./src/model/patchable.js":
/*!********************************!*\
  !*** ./src/model/patchable.js ***!
  \********************************/
/*! exports provided: Patchable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Patchable", function() { return Patchable; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/ */ "./src/components/index.js");


class Patchable {
  constructor(modules, patches) {
    this.modules = modules;
    this.patches = patches;
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
    var patch = new _components___WEBPACK_IMPORTED_MODULE_0__["Patch"](from, to, fromSocket, toSocket, this.modules[from].unit.sockets[fromSocket].type);
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

}


/***/ }),

/***/ "./src/sequence_editor/index.js":
/*!**************************************!*\
  !*** ./src/sequence_editor/index.js ***!
  \**************************************/
/*! exports provided: SequenceEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SequenceEditor", function() { return SequenceEditor; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/ */ "./src/components/index.js");
/* harmony import */ var _sequence_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sequence.js */ "./src/sequence_editor/sequence.js");
/* harmony import */ var _module_units___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module_units/ */ "./src/sequence_editor/module_units/index.js");





class SequenceEditor extends _components___WEBPACK_IMPORTED_MODULE_0__["Editor"] {
  constructor(app, sequence, channelNr, handleClose) {
    super(app, sequence, handleClose);
    this.app = app;
    if (!sequence) {
      sequence = new _sequence_js__WEBPACK_IMPORTED_MODULE_1__["Sequence"]([], [], channelNr);
      var modules = [
        new _components___WEBPACK_IMPORTED_MODULE_0__["Module"](sequence, 30, 50, new _module_units___WEBPACK_IMPORTED_MODULE_2__["SequenceInput"]('input')), 
      ];
      sequence.modules = modules;
    }
    this.target = sequence;
    var buttonDefs = [
        {label: "𝅝", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](4))},
        {label: "𝅗𝅥", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](2))},
        {label: "♩", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](1))},
        {label: "♪", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](0.5))},
        {label: "𝅘𝅥𝅯", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](0.25))},
        {label: "𝅘𝅥𝅰", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](0.125))},
        {label: "PULS", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"]())},
        {label: "EUCL", colour: 'ModulePulse', onclick: () => this.handleAddGenerator("sine")},
        {label: "NOTE", colour: 'ModuleOutput', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["PlayNote"]())},
        {label: "PAN", colour: 'ModuleOutput', onclick: () => this.handleAddGenerator("sine")},
        {label: "REV", colour: 'ModuleOutput', onclick: () => this.handleAddGenerator("sine")},
        {label: "LPF", colour: 'ModuleOutput', onclick: () => this.handleAddGenerator("sine")},
        {label: "HPF", colour: 'ModuleOutput', onclick: () => this.handleAddGenerator("sine")},

        {label: "SWEEP", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Range"]("sweep"))},
        {label: "CYCLE", colour: 'ModuleInt', onclick: () => this.handleAddGenerator("sine")},
        {label: "RANGE", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Range"]("range"))},
        {label: "FADE", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Range"]("fade in"))},
        {label: "RAND", colour: 'ModuleInt', onclick: () => this.handleAddGenerator("sine")},
        {label: "REG", colour: 'ModuleInt', onclick: () => this.handleAddGenerator("sine")},
        {label: "TRANS", colour: 'ModuleInt', onclick: () => this.handleAddGenerator("sine")},
    ]

    var x = 0;
    var prev = null;
    var padding = 0;
    var groupPadding = 15;
    for (var def of buttonDefs) {
      var b = new _components___WEBPACK_IMPORTED_MODULE_0__["Button"](x, app.theme.padding, def.onclick.bind(this), def.label);
      b.colour = app.theme.colours[def.colour] || app.theme.colours.ModuleGenerator;
      this.buttons.push(b);
      if (prev && prev.colour != def.colour) {
        x += groupPadding;
        b.x += groupPadding;
      }
      x += b.w + padding;
      prev = def;
    }
  }
}


/***/ }),

/***/ "./src/sequence_editor/module_units/index.js":
/*!***************************************************!*\
  !*** ./src/sequence_editor/module_units/index.js ***!
  \***************************************************/
/*! exports provided: Pulse, PlayNote, SequenceInput, Range */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pulse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pulse.js */ "./src/sequence_editor/module_units/pulse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pulse", function() { return _pulse_js__WEBPACK_IMPORTED_MODULE_0__["Pulse"]; });

/* harmony import */ var _play_note_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./play_note.js */ "./src/sequence_editor/module_units/play_note.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayNote", function() { return _play_note_js__WEBPACK_IMPORTED_MODULE_1__["PlayNote"]; });

/* harmony import */ var _sequence_input_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sequence_input.js */ "./src/sequence_editor/module_units/sequence_input.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SequenceInput", function() { return _sequence_input_js__WEBPACK_IMPORTED_MODULE_2__["SequenceInput"]; });

/* harmony import */ var _range_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./range.js */ "./src/sequence_editor/module_units/range.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return _range_js__WEBPACK_IMPORTED_MODULE_3__["Range"]; });







/***/ }),

/***/ "./src/sequence_editor/module_units/play_note.js":
/*!*******************************************************!*\
  !*** ./src/sequence_editor/module_units/play_note.js ***!
  \*******************************************************/
/*! exports provided: PlayNote */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayNote", function() { return PlayNote; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class PlayNote extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor() {
    super("play_note");
    this.sockets = {
      "TRIG": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "TRIG", _model___WEBPACK_IMPORTED_MODULE_1__["TRIGGER_TYPE"]),
      "NOTE": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](79, this.h - 29, "NOTE", _model___WEBPACK_IMPORTED_MODULE_1__["INT_TYPE"]),
      "VEL": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](129, this.h - 29, "VEL", _model___WEBPACK_IMPORTED_MODULE_1__["INT_TYPE"]),
    }
    this.dials = {
      "note": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 59, "NOTE", 0.0, 128.0, 1.0),
      "velocity": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](79, 59, "VEL", 0.0, 10.0, 1.0),
      "duration": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](129, 59, "DUR", 0.0, 10.0, 1.0),
    }
    this.background = 'ModuleOutput';
  }

  compile(connections) {
    var g = {"play_note": {
      "duration": this.dials["duration"].value,
      "channel": this.channelNr,
    }};
    var on = connections["NOTE"];
    if (on.length === 0) {
      g["play_note"]["note"] = this.dials["note"].value;
    } else {
      g["play_note"]["auto_note"] = on[0];
    }
    var on = connections["VEL"];
    if (on.length === 0) {
      g["play_note"]["velocity"] = this.dials["velocity"].value;
    } else {
      g["play_note"]["auto_velocity"] = on[0];
    }

    var result = []
    var on = connections["TRIG"];
    for (var o of on) {
      result.push(o(g));
    }
    return result;
  }
}


/***/ }),

/***/ "./src/sequence_editor/module_units/pulse.js":
/*!***************************************************!*\
  !*** ./src/sequence_editor/module_units/pulse.js ***!
  \***************************************************/
/*! exports provided: Pulse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pulse", function() { return Pulse; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class Pulse extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(every) {
    super("pulse");
    this.sockets = {
      "CLOCK": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "CLOCK", _model___WEBPACK_IMPORTED_MODULE_1__["CLOCK_TYPE"]),
      "TRIG": new _components___WEBPACK_IMPORTED_MODULE_0__["OutputSocket"](this.w - 29, this.h - 29, "TRIG", _model___WEBPACK_IMPORTED_MODULE_1__["TRIGGER_TYPE"]),
    }
    this.dials = {
      "every": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 59, "EVERY", 0.0, 10.0, 1.0),
    }
    this.dials.every.value = every || 1;
    this.background = 'ModulePulse';
  }

  compile(connections) {
    var e = {"every": this.dials["every"].value};
    return ((e) => ((t) => {
      for (var o of Object.keys(t)) {
        e[o] = t[o];
      }
      var result = {"repeat": e};
      return result
    }))(e)
  }
}


/***/ }),

/***/ "./src/sequence_editor/module_units/range.js":
/*!***************************************************!*\
  !*** ./src/sequence_editor/module_units/range.js ***!
  \***************************************************/
/*! exports provided: Range */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return Range; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class Range extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(type) {
    super(type);
    this.sockets = {
      "OUT": new _components___WEBPACK_IMPORTED_MODULE_0__["OutputSocket"](this.w - 29, this.h - 29, "OUT", _model___WEBPACK_IMPORTED_MODULE_1__["INT_TYPE"]),
    }
    this.dials = {
      "from": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 59, "FROM", 0.0, 127.0, 0.0),
      "to": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](79, 59, "TO", 0.0, 127.0, 127.0),
      "step": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](129, 59, "STEP", 0.0, 128.0, 1.0),
    }
    this.background = 'ModuleInt';
  }

  compile(connections) {
    var g = {};
    g[this.type] = {
      "from": this.dials.from.value,
      "to": this.dials.to.value,
      "step": this.dials.step.value,
    };
    return g;
  }
}


/***/ }),

/***/ "./src/sequence_editor/module_units/sequence_input.js":
/*!************************************************************!*\
  !*** ./src/sequence_editor/module_units/sequence_input.js ***!
  \************************************************************/
/*! exports provided: SequenceInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SequenceInput", function() { return SequenceInput; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class SequenceInput extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(type) {
    super(type);
    this.sockets = {
      "CLOCK": new _components___WEBPACK_IMPORTED_MODULE_0__["OutputSocket"](this.w - 29, this.h - 29, "CLOCK", _model___WEBPACK_IMPORTED_MODULE_1__["CLOCK_TYPE"]),
    }
    this.background = 'ModuleOutput';
  }
}


/***/ }),

/***/ "./src/sequence_editor/sequence.js":
/*!*****************************************!*\
  !*** ./src/sequence_editor/sequence.js ***!
  \*****************************************/
/*! exports provided: Sequence */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sequence", function() { return Sequence; });
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/ */ "./src/model/index.js");


class Sequence extends _model___WEBPACK_IMPORTED_MODULE_0__["Patchable"] {
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


/***/ }),

/***/ "./src/theme.js":
/*!**********************!*\
  !*** ./src/theme.js ***!
  \**********************/
/*! exports provided: Theme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Theme", function() { return Theme; });
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/ */ "./src/model/index.js");


class Theme {
  constructor() {
    this.padding = 0;
    var socketColours = {};
    var patchColours = {}
    socketColours[_model___WEBPACK_IMPORTED_MODULE_0__["AUDIO_TYPE"]] = 'rgb(140, 255, 255)';
    socketColours[_model___WEBPACK_IMPORTED_MODULE_0__["FREQUENCY_TYPE"]] = 'rgb(255, 255, 140)';
    socketColours[_model___WEBPACK_IMPORTED_MODULE_0__["PANNING_TYPE"]] = 'rgb(255, 140, 255)';
    socketColours[_model___WEBPACK_IMPORTED_MODULE_0__["CLOCK_TYPE"]] = 'rgb(100, 100, 255)';
    socketColours[_model___WEBPACK_IMPORTED_MODULE_0__["TRIGGER_TYPE"]] = 'rgb(50, 50, 50)';
    socketColours[_model___WEBPACK_IMPORTED_MODULE_0__["INT_TYPE"]] = 'rgb(255, 255, 40)';
    for (var key of Object.keys(socketColours)) {
      patchColours[key] = RGB_Linear_Shade(0.1, socketColours[key]);
    }
    this.colours = {
      OutlineColour: '#333',
      Background: '#444',
      Foreground: '#eee',
      InstrumentEditorBackground: '#eee',

      SocketBackground: '#9ff',
      SocketInside: '#999',
      SocketOutline: '#777',

      Patch: '#7ff',

      ModuleOutline: '#777',
      ModuleText: '#444',
      ModuleGenerator: '#fff',
      ModuleFilter: '#ffd',
      ModuleDerived: '#ddf',
      ModuleOutput: '#dfd',
      ModuleInt: '#ff9',
      ModulePulse: '#ddf',

      Button: '#ccc',
      ButtonText: '#333',

      Dial: '#ccc',
      DialLine: '#444',

      Sockets: socketColours,
      Patches: patchColours,
    };
  }
}

const RGB_Linear_Shade=(p,c)=>{
    var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
    return"rgb"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:")");
}


/***/ }),

/***/ "./src/timeline_editor/channel.js":
/*!****************************************!*\
  !*** ./src/timeline_editor/channel.js ***!
  \****************************************/
/*! exports provided: Channel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Channel", function() { return Channel; });
/* harmony import */ var _sequence_track_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sequence_track.js */ "./src/timeline_editor/sequence_track.js");
 

class Channel {
  constructor(channelNr, openInstrumentEditor) {
    this.channelNr = channelNr;
    this.instrument = null;
    this.sequenceTracks = [new _sequence_track_js__WEBPACK_IMPORTED_MODULE_0__["SequenceTrack"]()];
    this.name = "Untitled " + this.channelNr;
    for (var i = 0; i < channelNr; i++) {
      this.sequenceTracks.push(new _sequence_track_js__WEBPACK_IMPORTED_MODULE_0__["SequenceTrack"]());
    }

    this.height = 75;
    this.marginTop = 10;
    this.offset =  this.channelNr * (this.height + this.marginTop);
    this.padding = 10;
    this.channelWidth = 90;
    this.handleClick = () => openInstrumentEditor(this.instrument);
    this.loadFromDefinition({});
  }

  loadFromDefinition(def) {
    this.bank = def.bank || null;
    this.bankIndex = def.instrument || null;
    this.reverb = def.reverb || 0;
    this.reverbTime = def.reverb_time || 0;
    this.reverbFeedback = def.reverb_feedback || 0;
    this.tremelo = def.tremelo || 0;
    this.volume = def.volume || 100;
    this.panning = def.panning || 64;
    this.lpfCutoff = def.lpf_cutoff || 0;
    this.hpfCutoff = def.hpf_cutoff || 0;
    this.grain = def.grain || null;

  }

  compile() {
    var channel = {
      "channel": this.channelNr,
      "generator": this.instrument.compile(),
      "bank": this.bank,
      "instrument": this.bankIndex,
      "reverb": this.reverb,
      "reverb_time": this.reverbTime,
      "reverb_feedback": this.reverbFeedback,
      "tremelo": this.tremelo,
      "volume": this.volume,
      "panning": this.panning,
      "lpf_cutoff": this.lpfCutoff,
      "hpf_cutoff": this.hpfCutoff,
      "grain": this.grain,
    };
    var sequences = [];
    for (var tr of this.sequenceTracks) {
      var trResult = tr.compile();
      if (trResult) {
        sequences.push(trResult);
      }
    }
    return {
      "channel": channel,
      "sequences": sequences,
    };
  }

  initialiseSequenceTracks(sequences) {
    this.sequenceTracks = [];
    for (var s of sequences) {
      var segment = {};
      if (s.after) {
        segment.after = s.after.after;
        if (s.after.sequence.before) {
          segment.before = s.after.sequence.before.before;
        }
      } else if (s.before) {
        segment.before = s.before.before;
        if (s.before.sequence.after) {
          segment.after = s.before.sequence.after.after;
        }
      }
      var track = new _sequence_track_js__WEBPACK_IMPORTED_MODULE_0__["SequenceTrack"]();
      track.sequence_def = s;
      track.addRange(segment.after, segment.before);
      this.sequenceTracks.push(track);
    }
  }

  draw(app) {
    var colorOffset = this.channelNr * 40;
    var height = this.height;
    var marginTop = this.marginTop;
    var offset = this.offset;
    var padding = this.padding;
    var channelWidth = this.channelWidth;
    var trackWidth = app.canvas.width - channelWidth - padding * 2;
    app.ctx.fillStyle = 'rgb(0, ' + (200 - colorOffset) + ', 0)';
    app.ctx.strokeStyle = 'rgb(40, 40, 40, 1.0)';
    app.ctx.fillRect(padding, padding + offset, channelWidth, height);
    app.ctx.strokeRect(padding, padding + offset, channelWidth, height);

    app.ctx.fillStyle = 'rgb(255, ' + (200 - colorOffset) + ', 0)';
    app.ctx.fillRect(padding + channelWidth, padding + offset, trackWidth, height);
    app.ctx.strokeRect(padding + channelWidth, padding + offset, trackWidth, height);

    var trackHeight = height / this.sequenceTracks.length;
    for (var i = 0; i < this.sequenceTracks.length - 1; i++) {
      app.ctx.strokeRect(padding + channelWidth, padding + offset + i * trackHeight, trackWidth, trackHeight);
    }
    for (var i = 0; i < this.sequenceTracks.length; i++) {
      var s = this.sequenceTracks[i];
      s.draw(app, padding + channelWidth, padding + offset + i * trackHeight, trackWidth, trackHeight);
    }

    app.ctx.fillStyle = 'rgb(255, 255, 255)';
    app.ctx.font = '10px sans-serif';
    app.ctx.fillText(this.name, padding + 3, padding + offset + 11);
    var showBars = 4;
    var pointsInRange = showBars * 4;
    var scaling = trackWidth / pointsInRange;
    var barWidth = 4 * scaling;
    app.ctx.fillStyle = 'rgb(40, 40, 40)';
    app.ctx.font = '10px mono';
    for (var i = 0; i < showBars; i++) {
      app.ctx.fillText(i * 4, padding + channelWidth + 3 + i * barWidth, padding + offset + height - 3);
    }
  }

  handleMouseDown(app, x, y) {
    var path = new Path2D();
    var width = app.canvas.width - this.padding * 2;
    path.rect(this.padding, this.padding + this.offset, width, this.height);
    if (app.ctx.isPointInPath(path, x, y)) {
      return this;
    }
    return false;
  }
}


/***/ }),

/***/ "./src/timeline_editor/index.js":
/*!**************************************!*\
  !*** ./src/timeline_editor/index.js ***!
  \**************************************/
/*! exports provided: Channel, TimelineEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineEditor", function() { return TimelineEditor; });
/* harmony import */ var _channel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./channel.js */ "./src/timeline_editor/channel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Channel", function() { return _channel_js__WEBPACK_IMPORTED_MODULE_0__["Channel"]; });



class TimelineEditor {
  constructor(channels) {
    this.channels = channels;
  }
  handleMouseDown(app, x, y) {
    for (var e of this.channels) {
      var v = e.handleMouseDown(app, x, y);
      if (v) {
        return v;
      }
    }
  }
  draw(app) {
    for (var e of this.channels) {
      e.draw(app);
    }
  }
}


/***/ }),

/***/ "./src/timeline_editor/sequence_track.js":
/*!***********************************************!*\
  !*** ./src/timeline_editor/sequence_track.js ***!
  \***********************************************/
/*! exports provided: Range, SequenceTrack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SequenceTrack", function() { return SequenceTrack; });

class Range {
  constructor(start, stop) {
    this.start = start;
    this.stop = stop;
  }
}

class SequenceTrack {
  constructor() {
    this.sequence_def = null;
    this.ranges = [];
  }
  addRange(start, stop) {
    this.ranges.push(new Range(start ? start : 0, stop ? stop : 1000000));
  }
  compile() {
    if (this.sequence_def) {
      return this.sequence_def;
    }
    return null;
  }
  draw(app, x, y, w, h) {
    var showBars = 64;
    var pointsInRange = showBars * 4;
    var scaling = w / pointsInRange;
    var barWidth = 4 * scaling;
    for (var r of this.ranges) {
      var colorOffset = 10;
      var width = Math.min((r.stop - r.start) * scaling, w - (r.start * scaling))
      app.ctx.fillStyle = 'rgb(35, 75, ' + (200 - colorOffset) + ', 0.3)';
      app.ctx.strokeStyle = 'rgb(5, 5, ' + (200 - colorOffset) + ', 0.6)';
      app.ctx.fillRect(x + r.start * scaling, y, width, h);
      app.ctx.strokeRect(x + r.start * scaling, y, width, h);
    }
    app.ctx.strokeStyle = 'rgb(70, 70, 70, 0.8)';
    for (var i = 0; i < showBars; i++) {
      app.ctx.strokeRect(x + i * barWidth, y, barWidth, h);
    }
  }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21vZHVsZV91bml0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhdGNoLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL2luc3RydW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9jaGFubmVsX2lucHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvY2hhbm5lbF9vdXRwdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9mYWN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9wYW5uaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvc2FtcGxlX2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvbW9kdWxlX3VuaXRzL3RyYW5zcG9zZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL3BhdGNoYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL3BsYXlfbm90ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy9wdWxzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy9yYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy9zZXF1ZW5jZV9pbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL3NlcXVlbmNlLmpzIiwid2VicGFjazovLy8uL3NyYy90aGVtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGltZWxpbmVfZWRpdG9yL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbWVsaW5lX2VkaXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGltZWxpbmVfZWRpdG9yL3NlcXVlbmNlX3RyYWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsZ0VBQWE7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9DQUFvQztBQUN2RDtBQUNBO0FBQ0EsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDeElBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBdUM7O0FBRWhDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmxlZXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluLmpzXCIpO1xuIiwiXG5jb25zdCBUZXN0TWVzc2FnZSA9IFwidGVzdFwiO1xuY29uc3QgU3RhdHVzTWVzc2FnZSA9IFwic3RhdHVzXCI7XG5jb25zdCBDaGFubmVsRGVmTWVzc2FnZSA9IFwiY2hhbm5lbF9kZWZcIjtcbmNvbnN0IFNlcXVlbmNlckRlZk1lc3NhZ2UgPSBcInNlcXVlbmNlcl9kZWZcIjtcbmNvbnN0IFNldFNlcXVlbmNlckRlZk1lc3NhZ2UgPSBcInNldF9zZXF1ZW5jZXJfZGVmXCI7XG5cbmV4cG9ydCBjbGFzcyBBUEkge1xuXG4gIGNvbnN0cnVjdG9yKGFwcCkge1xuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIHRoaXMuc29ja2V0ID0gbnVsbDtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHZhciBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KFwid3M6Ly9sb2NhbGhvc3Q6MTAwMDAvd3NcIik7XG4gICAgc29ja2V0Lm9ub3BlbiA9ICgoZSkgPT4ge1xuICAgICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7XG4gICAgICB0aGlzLnNlbmREYXRhKENoYW5uZWxEZWZNZXNzYWdlLCBcInRlc3RcIik7XG4gICAgfSkuYmluZCh0aGlzKVxuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSB0aGlzLmhhbmRsZU1lc3NhZ2VSZWNlaXZlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlTWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxuICAgIHZhciBtc2cgPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG4gICAgaWYgKG1zZy50eXBlID09PSBDaGFubmVsRGVmTWVzc2FnZSkge1xuICAgICAgdGhpcy5hcHAuaW5pdGlhbGlzZUNoYW5uZWxzKG1zZy5kYXRhKTtcbiAgICB9IGVsc2UgaWYgKG1zZy50eXBlID09PSBTZXF1ZW5jZXJEZWZNZXNzYWdlKSB7XG4gICAgICB0aGlzLmFwcC5pbml0aWFsaXNlU2VxdWVuY2VUcmFja3MobXNnLmRhdGEpO1xuICAgIH1cbiAgfVxuICByZXF1ZXN0U2VxdWVuY2VyRGVmKCkge1xuICAgIHRoaXMuc2VuZERhdGEoU2VxdWVuY2VyRGVmTWVzc2FnZSwgbnVsbCk7XG4gIH1cbiAgc2V0U2VxdWVuY2VyRGVmKGRlZikge1xuICAgIHRoaXMuc2VuZERhdGEoU2V0U2VxdWVuY2VyRGVmTWVzc2FnZSwgSlNPTi5zdHJpbmdpZnkoZGVmKSk7XG4gIH1cblxuICBzZW5kRGF0YSh0eXBlLCBkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZEpTT04oe1widHlwZVwiOiB0eXBlLCBcImRhdGFcIjogZGF0YX0pO1xuICB9XG5cbiAgc2VuZEpTT04ob2JqKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gIH1cblxuICBzZW5kTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgaWYgKHRoaXMuc29ja2V0KSB7XG4gICAgICB0aGlzLnNvY2tldC5zZW5kKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJcbmV4cG9ydCBjbGFzcyBCdXR0b24ge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBvbkNsaWNrLCBsYWJlbCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLncgPSAyNTtcbiAgICB0aGlzLmggPSAyNTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gb25DbGljaztcbiAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgdGhpcy5jb2xvdXIgPSBudWxsO1xuICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICB0aGlzLncgPSAzNTtcbiAgICB9XG4gIH1cbiAgZHJhdyhhcHApIHtcbiAgICB2YXIgdyA9IHRoaXMudztcbiAgICB2YXIgaCA9IHRoaXMuaDtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLkJ1dHRvbjtcbiAgICBpZiAodGhpcy5jb2xvdXIpIHtcbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvdXI7XG4gICAgfVxuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5PdXRsaW5lQ29sb3VyO1xuICAgIGFwcC5jdHgubGluZVdpZHRoID0gMTtcbiAgICBhcHAuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB3LCBoKTtcbiAgICBhcHAuY3R4LnN0cm9rZVJlY3QodGhpcy54LCB0aGlzLnksIHcsIGgpO1xuICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICBhcHAuY3R4LmZvbnQgPSAnMTBweCBtb25vJztcbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuQnV0dG9uVGV4dDtcbiAgICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy5sYWJlbCwgdGhpcy54ICsgdyAvIDIsIHRoaXMueSArIDE1KTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIGlmICh4ID49IHRoaXMueCAmJiB4IDw9IHRoaXMueCArIHRoaXMudyAmJiB5ID49IHRoaXMueSAmJiB5IDw9IHRoaXMueSArIHRoaXMuaCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDbG9zZUJ1dHRvbiBleHRlbmRzIEJ1dHRvbiB7XG59XG4iLCJleHBvcnQgY2xhc3MgRGlhbCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGxhYmVsLCBtaW4sIG1heCwgY3VycmVudCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgdGhpcy5yYWRpdXMgPSAxNTtcbiAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLnZhbHVlID0gY3VycmVudDtcbiAgfVxuICBkcmF3KGFwcCkge1xuXG4gICAgLy8gRHJhdyBkaWFsXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5EaWFsO1xuICAgIGFwcC5jdHguYmVnaW5QYXRoKCk7XG4gICAgYXBwLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgYXBwLmN0eC5maWxsKCk7XG4gICAgYXBwLmN0eC5jbG9zZVBhdGgoKTtcblxuICAgIHZhciByYW5nZSA9IHRoaXMubWF4IC0gdGhpcy5taW47XG4gICAgdmFyIHRhdSA9IDIgKiBNYXRoLlBJXG4gICAgdmFyIHZhbHVlID0gdGF1IC0gKHRhdSAqICh0aGlzLnZhbHVlIC0gdGhpcy5taW4pIC8gcmFuZ2UpXG4gICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcbiAgICB2YXIgZHggPSBNYXRoLnNpbih2YWx1ZSkgKiB0aGlzLnJhZGl1cztcbiAgICB2YXIgZHkgPSBNYXRoLmNvcyh2YWx1ZSkgKiB0aGlzLnJhZGl1cztcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuRGlhbExpbmU7XG4gICAgYXBwLmN0eC5saW5lV2lkdGggPSAyO1xuICAgIGFwcC5jdHgubW92ZVRvKHRoaXMueCwgdGhpcy55KTtcbiAgICBhcHAuY3R4LmxpbmVUbyh0aGlzLnggKyBkeCwgdGhpcy55ICsgZHkpO1xuICAgIGFwcC5jdHguc3Ryb2tlKCk7XG4gICAgYXBwLmN0eC5saW5lV2lkdGggPSAxO1xuXG4gICAgLy8gRHJhdyBsYWJlbFxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlVGV4dDtcbiAgICBhcHAuY3R4LmZvbnQgPSAnMTBweCBtb25vJztcbiAgICB2YXIgY2VudGVyWCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueSAtIHRoaXMucmFkaXVzIC0gMztcbiAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLmxhYmVsLCBjZW50ZXJYLCB5KTtcblxuICAgIC8vIERyYXcgdmFsdWVcbiAgICBhcHAuY3R4LmZpbGxUZXh0KHRoaXMudmFsdWUudG9GaXhlZCgyKSwgY2VudGVyWCwgdGhpcy55ICsgdGhpcy5yYWRpdXMgKyAxMik7XG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIGlmICh4ID49IHRoaXMueCAtIHRoaXMucmFkaXVzICYmIHggPD0gdGhpcy54ICsgdGhpcy5yYWRpdXMgJiYgeSA+PSB0aGlzLnkgLSB0aGlzLnJhZGl1cyAmJiB5IDw9IHRoaXMucmFkaXVzICsgdGhpcy55KSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cbiAgaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSkge1xuICAgIGR4ID0geCAtIHRoaXMueDtcbiAgICBkeSA9IHkgLSB0aGlzLnk7XG4gICAgdmFyIHNpbiA9IGR5IC8gTWF0aC5zcXJ0KGR5ICogZHkgKyBkeCAqIGR4KVxuICAgIHZhciBzY2FsZWRDb3MgPSAxLjAgLSAoc2luICsgMSkgLyAyO1xuICAgIHZhciByYW5nZSA9IHRoaXMubWF4IC0gdGhpcy5taW47XG4gICAgdGhpcy52YWx1ZSA9IHJhbmdlICogc2NhbGVkQ29zICsgdGhpcy5taW47XG4gICAgYXBwLmRyYXcoKTtcbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBDbG9zZUJ1dHRvbiwgQnV0dG9uIH0gZnJvbSAnLi9idXR0b24uanMnO1xuaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnLi9tb2R1bGUuanMnO1xuXG5leHBvcnQgY2xhc3MgRWRpdG9yIHtcbiAgY29uc3RydWN0b3IoYXBwLCB0YXJnZXQsIGhhbmRsZUNsb3NlKSB7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5wYWRkaW5nID0gYXBwLnRoZW1lLnBhZGRpbmc7XG4gICAgdGhpcy5zY2FsZSA9IDEuMFxuICAgIHRoaXMuc2hvd0NvbXBpbGUgPSB0cnVlO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuYnV0dG9ucyA9IFtcbiAgICAgIG5ldyBDbG9zZUJ1dHRvbigxMCwgMTAsIGhhbmRsZUNsb3NlLCBcIlhcIiksXG4gICAgICBuZXcgQnV0dG9uKDEwLCAxMCwgdGhpcy5oYW5kbGVTaG93Q29tcGlsZS5iaW5kKHRoaXMpLCBcIkpTT05cIiksXG4gICAgICBuZXcgQnV0dG9uKDEwLCAxMCwgdGhpcy5oYW5kbGVab29tSW4uYmluZCh0aGlzKSwgXCIrXCIpLFxuICAgICAgbmV3IEJ1dHRvbigxMCwgMTAsIHRoaXMuaGFuZGxlWm9vbU91dC5iaW5kKHRoaXMpLCBcIi1cIiksXG4gICAgXTtcbiAgfVxuICBoYW5kbGVBZGRVbml0KGNvbnN0cnVjdG9yKSB7XG4gICAgdmFyIGcgPSBjb25zdHJ1Y3RvcigpXG4gICAgdGhpcy50YXJnZXQubW9kdWxlcy5wdXNoKG5ldyBNb2R1bGUodGhpcy50YXJnZXQsIE1hdGgucmFuZG9tKCkgKiA3MDAsIE1hdGgucmFuZG9tKCkgKiA2MDAsIGcpKTtcbiAgICB0aGlzLmFwcC5kcmF3KCk7XG4gIH1cbiAgaGFuZGxlWm9vbUluKCkge1xuICAgIHRoaXMuc2NhbGUgKz0gLjFcbiAgICB0aGlzLmFwcC5kcmF3KCk7XG4gIH1cbiAgaGFuZGxlWm9vbU91dCgpIHtcbiAgICB0aGlzLnNjYWxlIC09IC4xO1xuICAgIHRoaXMuYXBwLmRyYXcoKTtcbiAgfVxuICBoYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4LCB5KSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQuaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZURyb3AoYXBwLCB4LCB5KSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQuaGFuZGxlRHJvcChhcHAsIHggLSB0aGlzLnBhZGRpbmcsIHkgLSB0aGlzLnBhZGRpbmcpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVTaG93Q29tcGlsZSgpIHtcbiAgICB0aGlzLnNob3dDb21waWxlID0gIXRoaXMuc2hvd0NvbXBpbGU7XG4gICAgdGhpcy5hcHAuZHJhdygpO1xuICB9XG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICBmb3IgKHZhciBiIG9mIHRoaXMuYnV0dG9ucykge1xuICAgICAgdmFyIHYgPSBiLmhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpO1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIG0gb2YgdGhpcy50YXJnZXQubW9kdWxlcykge1xuICAgICAgdmFyIHYgPSBtLmhhbmRsZU1vdXNlRG93bihhcHAsIHggLSB0aGlzLnBhZGRpbmcsIHkgLSB0aGlzLnBhZGRpbmcpO1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHY7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIHZhciB3ID0gYXBwLmNhbnZhcy53aWR0aCAtIDIgKiB0aGlzLnBhZGRpbmc7XG4gICAgdmFyIGggPSBhcHAuY2FudmFzLmhlaWdodCAtIDIgKiB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5idXR0b25zWzBdLnggPSB3IC0gdGhpcy5idXR0b25zWzBdLncgKyB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5idXR0b25zWzBdLnkgPSB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5idXR0b25zWzFdLnggPSB3IC0gdGhpcy5idXR0b25zWzFdLncgKyB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5idXR0b25zWzFdLnkgPSB0aGlzLnBhZGRpbmcgKyAyNTtcbiAgICB0aGlzLmJ1dHRvbnNbMl0ueCA9IHcgLSB0aGlzLmJ1dHRvbnNbMl0udyArIHRoaXMucGFkZGluZztcbiAgICB0aGlzLmJ1dHRvbnNbMl0ueSA9IHRoaXMucGFkZGluZyArIDUwO1xuICAgIHRoaXMuYnV0dG9uc1szXS54ID0gdyAtIHRoaXMuYnV0dG9uc1szXS53ICsgdGhpcy5wYWRkaW5nO1xuICAgIHRoaXMuYnV0dG9uc1szXS55ID0gdGhpcy5wYWRkaW5nICsgNzU7XG4gICAgYXBwLmN0eC5zYXZlKCk7XG4gICAgYXBwLmN0eC5saW5lV2lkdGggPSAxO1xuICAgIFxuICAgIC8vIERyYXcgdGhlIGJhY2tncm91bmRcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLkluc3RydW1lbnRFZGl0b3JCYWNrZ3JvdW5kO1xuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5PdXRsaW5lQ29sb3VyO1xuICAgIGFwcC5jdHguZmlsbFJlY3QodGhpcy5wYWRkaW5nLCB0aGlzLnBhZGRpbmcsIHcsIGgpO1xuXG4gICAgLy8gRHJhdyB0aGUgYnV0dG9ucyBcbiAgICBmb3IgKHZhciBiIG9mIHRoaXMuYnV0dG9ucykge1xuICAgICAgYi5kcmF3KGFwcCk7XG4gICAgfVxuXG4gICAgLy8gRHJhdyB0aGUgY29tcGlsZWQgZ2VuZXJhdG9yIEpTT05cbiAgICBpZiAodGhpcy5zaG93Q29tcGlsZSkge1xuICAgICAgdmFyIHR4dCA9IEpTT04uc3RyaW5naWZ5KHRoaXMudGFyZ2V0LmNvbXBpbGUoKSwgbnVsbCwgMik7XG4gICAgICB2YXIgbGluZU5yID0gMDtcbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlVGV4dDtcbiAgICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJzdGFydFwiO1xuICAgICAgZm9yICh2YXIgbGluZSBvZiB0eHQuc3BsaXQoXCJcXG5cIikpIHtcbiAgICAgICAgYXBwLmN0eC5maWxsVGV4dChsaW5lLCB3IC0gMzAwLCA5MCArIGxpbmVOciAqIDEyKTtcbiAgICAgICAgbGluZU5yKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRHJhdyB0aGUgbW9kdWxlc1xuICAgIGZvciAodmFyIG0gb2YgdGhpcy50YXJnZXQubW9kdWxlcykge1xuICAgICAgYXBwLmN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7IC8vIHJlc2V0IHRyYW5zbGF0ZVxuICAgICAgYXBwLmN0eC5zY2FsZSh0aGlzLnNjYWxlLCB0aGlzLnNjYWxlKTtcbiAgICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMucGFkZGluZywgdGhpcy5wYWRkaW5nKTtcbiAgICAgIG0uZHJhdyhhcHApO1xuICAgIH1cbiAgICBhcHAuY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTsgLy8gcmVzZXQgdHJhbnNsYXRlXG4gICAgYXBwLmN0eC5zY2FsZSh0aGlzLnNjYWxlLCB0aGlzLnNjYWxlKTtcblxuXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5QYXRjaDtcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuUGF0Y2g7XG5cbiAgICAvLyBEcmF3IHRoZSBwYXRjaGVzXG4gICAgZm9yICh2YXIgcCBvZiB0aGlzLnRhcmdldC5wYXRjaGVzKSB7XG4gICAgICB2YXIgZnJvbU1vZCA9IHRoaXMudGFyZ2V0Lm1vZHVsZXNbcC5mcm9tXTtcbiAgICAgIHZhciB0b01vZCA9IHRoaXMudGFyZ2V0Lm1vZHVsZXNbcC50b107XG4gICAgICB2YXIgZnJvbVNvY2tldCA9IHAuZ2V0RnJvbVNvY2tldChmcm9tTW9kKTtcbiAgICAgIHZhciB0b1NvY2tldCA9IHAuZ2V0VG9Tb2NrZXQodG9Nb2QpO1xuICAgICAgdmFyIGZyb21YID0gdGhpcy5wYWRkaW5nICsgZnJvbU1vZC54ICsgZnJvbVNvY2tldC54O1xuICAgICAgdmFyIGZyb21ZID0gdGhpcy5wYWRkaW5nICsgZnJvbU1vZC55ICsgZnJvbVNvY2tldC55O1xuICAgICAgdmFyIHRvWCA9IHRoaXMucGFkZGluZyArIHRvTW9kLnggKyB0b1NvY2tldC54O1xuICAgICAgdmFyIHRvWSA9IHRoaXMucGFkZGluZyArIHRvTW9kLnkgKyB0b1NvY2tldC55O1xuICAgICAgdmFyIHBvaW50T2Zmc2V0ID0gNzA7XG5cbiAgICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBwLmdldENvbG9yKGFwcC50aGVtZSk7XG4gICAgICBhcHAuY3R4LmxpbmVXaWR0aCA9IDQ7XG4gICAgICBhcHAuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgYXBwLmN0eC5tb3ZlVG8oZnJvbVgsIGZyb21ZKTtcbiAgICAgIGFwcC5jdHguYmV6aWVyQ3VydmVUbyhcbiAgICAgICAgZnJvbVgsIFxuICAgICAgICBmcm9tWSArIHBvaW50T2Zmc2V0LCBcbiAgICAgICAgdG9YLCBcbiAgICAgICAgdG9ZICsgcG9pbnRPZmZzZXQsIFxuICAgICAgICB0b1gsIFxuICAgICAgICB0b1kpO1xuICAgICAgYXBwLmN0eC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBhcHAuY3R4LnJlc3RvcmUoKTtcbiAgfVxufVxuIiwiZXhwb3J0IHsgRGlhbCB9IGZyb20gJy4vZGlhbC5qcyc7XG5leHBvcnQgeyBTb2NrZXQsIElucHV0U29ja2V0LCBPdXRwdXRTb2NrZXQgfSBmcm9tICcuL3NvY2tldC5qcyc7XG5leHBvcnQgeyBCdXR0b24sIENsb3NlQnV0dG9uIH0gZnJvbSAnLi9idXR0b24uanMnO1xuZXhwb3J0IHsgUGF0Y2ggfSBmcm9tICcuL3BhdGNoLmpzJztcbmV4cG9ydCB7IE1vZHVsZSB9IGZyb20gJy4vbW9kdWxlLmpzJztcbmV4cG9ydCB7IE1vZHVsZVVuaXQgfSBmcm9tICcuL21vZHVsZV91bml0LmpzJztcbmV4cG9ydCB7IEVkaXRvciB9IGZyb20gJy4vZWRpdG9yLmpzJztcbiIsImltcG9ydCB7IFNvY2tldCB9IGZyb20gJy4vc29ja2V0LmpzJztcbmltcG9ydCB7IERpYWwgfSBmcm9tICcuL2RpYWwuanMnO1xuXG5leHBvcnQgY2xhc3MgTW9kdWxlIHtcbiAgY29uc3RydWN0b3IodGFyZ2V0LCB4LCB5LCB1bml0KSB7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMudW5pdCA9IHVuaXQ7XG4gICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gIH1cbiAgZHJhdyhhcHApIHtcbiAgICBhcHAuY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XG4gICAgdGhpcy51bml0LmRyYXcoYXBwKTtcbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgdmFyIHYgPSB0aGlzLnVuaXQuaGFuZGxlTW91c2VEb3duKGFwcCwgeCAtIHRoaXMueCwgeSAtIHRoaXMueSk7XG4gICAgaWYgKCF2KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWQgPSB2O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGhhbmRsZURyYWcoYXBwLCBkeCwgZHksIHgsIHkpIHtcbiAgICB2YXIgdiA9IHRoaXMuc2VsZWN0ZWQ7XG4gICAgaWYgKHYgaW5zdGFuY2VvZiBTb2NrZXQpIHtcbiAgICAgIHYuaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSk7XG4gICAgfSBlbHNlIGlmICh2IGluc3RhbmNlb2YgRGlhbCkge1xuICAgICAgdi5oYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4IC0gdGhpcy54LCB5IC0gdGhpcy55KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54ICs9IGR4O1xuICAgICAgdGhpcy55ICs9IGR5O1xuICAgIH1cbiAgfVxuICBoYW5kbGVEcm9wKGFwcCwgeCwgeSkge1xuICAgIHZhciB2ID0gdGhpcy5zZWxlY3RlZDtcbiAgICBpZiAodiBpbnN0YW5jZW9mIFNvY2tldCkge1xuICAgICAgZm9yICh2YXIgbW9kdWxlIG9mIHRoaXMudGFyZ2V0Lm1vZHVsZXMpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKG1vZHVsZS51bml0LnNvY2tldHMpKSB7XG4gICAgICAgICAgdmFyIHMgPSBtb2R1bGUudW5pdC5zb2NrZXRzW2tleV07XG4gICAgICAgICAgdmFyIHN4ID0geCAtIG1vZHVsZS54O1xuICAgICAgICAgIHZhciBzeSA9IHkgLSBtb2R1bGUueTtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcy5oYW5kbGVNb3VzZURvd24oYXBwLCBzeCwgc3kpO1xuICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmFkZFBhdGNoKHRoaXMsIG1vZHVsZSwgdi5sYWJlbCwgcmVzdWx0LmxhYmVsKTtcbiAgICAgICAgICAgIGFwcC5kcmF3KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMudyA9IDE1MDtcbiAgICB0aGlzLmggPSAxNTA7XG4gICAgdGhpcy5zb2NrZXRzID0ge307XG4gICAgdGhpcy5kaWFscyA9IHt9O1xuICAgIHRoaXMuYmFja2dyb3VuZCA9IFwiXCI7XG4gIH1cbiAgZHJhdyhhcHApIHtcbiAgICB2YXIgdyA9IHRoaXMudztcbiAgICB2YXIgaCA9IHRoaXMuaDtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzW3RoaXMuYmFja2dyb3VuZF07XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZU91dGxpbmU7XG4gICAgYXBwLmN0eC5maWxsUmVjdCgwLCAwLCB3LCBoKTtcbiAgICBhcHAuY3R4LnN0cm9rZVJlY3QoMCwgMCwgdywgaCk7XG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVUZXh0O1xuICAgIGFwcC5jdHguZm9udCA9ICcxNHB4IG1vbm8nO1xuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICBhcHAuY3R4LmZpbGxUZXh0KHRoaXMudHlwZSwgdyAvIDIsIDE0KTtcbiAgICBmb3IgKHZhciBvIG9mIE9iamVjdC5rZXlzKHRoaXMuc29ja2V0cykpIHtcbiAgICAgIHRoaXMuc29ja2V0c1tvXS5kcmF3KGFwcCk7XG4gICAgfVxuICAgIGZvciAodmFyIG8gb2YgT2JqZWN0LmtleXModGhpcy5kaWFscykpIHtcbiAgICAgIHRoaXMuZGlhbHNbb10uZHJhdyhhcHApO1xuICAgIH1cbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgZm9yICh2YXIgbyBvZiBPYmplY3Qua2V5cyh0aGlzLnNvY2tldHMpKSB7XG4gICAgICB2YXIgdiA9IHRoaXMuc29ja2V0c1tvXS5oYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KTtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHJldHVybiB2O1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBvIG9mIE9iamVjdC5rZXlzKHRoaXMuZGlhbHMpKSB7XG4gICAgICB2YXIgdiA9IHRoaXMuZGlhbHNbb10uaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSk7XG4gICAgICBpZiAodikge1xuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHBhdGggPSBuZXcgUGF0aDJEKCk7XG4gICAgcGF0aC5yZWN0KDAsIDAsIHRoaXMudywgdGhpcy5oKTtcbiAgICBpZiAoYXBwLmN0eC5pc1BvaW50SW5QYXRoKHBhdGgsIHgsIHkpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cblxuICAvLyBjb25uZWN0aW9ucyBpcyBhIHt9IG1hcHBpbmcgdGhpcyB1bml0J3MgaW5wdXQgc29ja2V0IElEcyBcbiAgLy8gdG8gYSBsaXN0IG9mIGNvbm5lY3RlZCB1bml0cy5cbiAgLy9cbiAgY29tcGlsZShjb25uZWN0aW9ucykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbiIsImV4cG9ydCBjbGFzcyBQYXRjaCB7XG4gIGNvbnN0cnVjdG9yKGZyb21Nb2R1bGUsIHRvTW9kdWxlLCBmcm9tU29ja2V0LCB0b1NvY2tldCwgdHlwZSkge1xuICAgIHRoaXMuZnJvbSA9IGZyb21Nb2R1bGU7XG4gICAgdGhpcy50byA9IHRvTW9kdWxlO1xuICAgIHRoaXMuZnJvbVNvY2tldCA9IGZyb21Tb2NrZXQ7XG4gICAgdGhpcy50b1NvY2tldCA9IHRvU29ja2V0O1xuICAgIGlmICghdHlwZSkge1xuICAgICAgdGhyb3cgJ01pc3NpbmcgdHlwZSBpbiBQYXRjaCc7XG4gICAgfVxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cbiAgZ2V0RnJvbVNvY2tldChtb2QpIHtcbiAgICByZXR1cm4gbW9kLnVuaXQuc29ja2V0c1t0aGlzLmZyb21Tb2NrZXRdO1xuICB9XG4gIGdldFRvU29ja2V0KG1vZCkge1xuICAgIHJldHVybiBtb2QudW5pdC5zb2NrZXRzW3RoaXMudG9Tb2NrZXRdO1xuICB9XG4gIGlzSXNvbW9ycGhpYyhwKSB7XG4gICAgcmV0dXJuICh0aGlzLmZyb20gPT0gcC5mcm9tIFxuICAgICAgICAmJiB0aGlzLnRvID09IHAudG8gXG4gICAgICAgICYmIHRoaXMuZnJvbVNvY2tldCA9PSBwLmZyb21Tb2NrZXQgXG4gICAgICAgICYmIHRoaXMudG9Tb2NrZXQgPT0gcC50b1NvY2tldCkgXG4gICAgICB8fCBcbiAgICAgICh0aGlzLnRvID09IHAuZnJvbVxuICAgICAgICAmJiB0aGlzLmZyb20gPT0gcC50byBcbiAgICAgICAgJiYgdGhpcy5mcm9tU29ja2V0ID09IHAudG9Tb2NrZXQgXG4gICAgICAgICYmIHRoaXMudG9Tb2NrZXQgPT0gcC5mcm9tU29ja2V0KTtcbiAgfVxuICBkb2VzUGF0Y2hDb25uZWN0VG8obW9kdWxlLCBzb2NrZXQpIHtcbiAgICByZXR1cm4gKHRoaXMuZnJvbSA9PSBtb2R1bGUgJiYgdGhpcy5mcm9tU29ja2V0ID09IHNvY2tldCkgfHxcbiAgICAgICh0aGlzLnRvID09IG1vZHVsZSAmJiB0aGlzLnRvU29ja2V0ID09IHNvY2tldClcbiAgfVxuICBjb25uZWN0c1RvKG1vZHVsZSwgc29ja2V0KSB7XG4gICAgaWYgKHRoaXMuZnJvbSA9PSBtb2R1bGUgJiYgdGhpcy5mcm9tU29ja2V0ID09IHNvY2tldCkge1xuICAgICAgcmV0dXJuIHttb2R1bGU6IHRoaXMudG8sIHNvY2tldDogdGhpcy50b1NvY2tldH1cbiAgICB9XG4gICAgcmV0dXJuIHttb2R1bGU6IHRoaXMuZnJvbSwgc29ja2V0OiB0aGlzLmZyb21Tb2NrZXR9XG4gIH1cbiAgZ2V0Q29sb3IodGhlbWUpIHtcbiAgICBpZiAodGhlbWUuY29sb3Vycy5QYXRjaGVzW3RoaXMudHlwZV0pIHtcbiAgICAgIHJldHVybiB0aGVtZS5jb2xvdXJzLlBhdGNoZXNbdGhpcy50eXBlXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoZW1lLmNvbG91cnMuUGF0Y2g7XG4gIH1cbn1cblxuIiwiZXhwb3J0IGNsYXNzIFNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGxhYmVsLCB0eXBlLCBpc0lucHV0KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLnJhZGl1cyA9IDg7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmlzSW5wdXQgPSBpc0lucHV0O1xuICAgIGlmICghdHlwZSkge1xuICAgICAgdGhyb3cgJ01pc3NpbmcgU29ja2V0IHR5cGUgZm9yIFNvY2tldCB3aXRoIGxhYmVsOiAnICsgbGFiZWw7XG4gICAgfVxuICAgIGlmIChpc0lucHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93ICdNaXNzaW5nIFNvY2tldCBpc0lucHV0IGZvciBTb2NrZXQgd2l0aCBsYWJlbDogJyArIGxhYmVsO1xuICAgIH1cbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIC8vIERyYXcgT2N0YWdvblxuICAgIHZhciBvY3RhX3Nob3J0ID0gMC4yOTI4OTMyMTg4MTM0NTI0NzU1OTkxNTU2Mzc4OTUxNTs7XG4gICAgdmFyIG9jdGFfbG9uZyA9IDEgLSBvY3RhX3Nob3J0O1xuICAgIHZhciBvY3RhZ29uID0ge1xuICAgICAgc2l6ZTogMiAqIHRoaXMucmFkaXVzICsgNCxcbiAgICB9XG4gICAgdmFyIHggPSB0aGlzLnggLSB0aGlzLnJhZGl1cyAtIDI7XG4gICAgdmFyIHkgPSB0aGlzLnkgLSB0aGlzLnJhZGl1cyAtIDI7XG4gICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLlNvY2tldEJhY2tncm91bmQ7XG4gICAgaWYgKGFwcC50aGVtZS5jb2xvdXJzLlNvY2tldHNbdGhpcy50eXBlXSkgeyBcbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuU29ja2V0c1t0aGlzLnR5cGVdO1xuICAgIH1cbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuU29ja2V0T3V0bGluZTtcbiAgICBhcHAuY3R4Lm1vdmVUbyh4ICsgb2N0YWdvbi5zaXplICogb2N0YV9zaG9ydCwgeSk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCwgeSArIG9jdGFnb24uc2l6ZSAqIG9jdGFfc2hvcnQpO1xuICAgIGFwcC5jdHgubGluZVRvKHgsIHkgKyBvY3RhZ29uLnNpemUgKiBvY3RhX2xvbmcpO1xuICAgIGFwcC5jdHgubGluZVRvKHggKyBvY3RhZ29uLnNpemUgKiBvY3RhX3Nob3J0LCB5ICsgb2N0YWdvbi5zaXplKTtcbiAgICBhcHAuY3R4LmxpbmVUbyh4ICsgb2N0YWdvbi5zaXplICogb2N0YV9sb25nLCB5ICsgb2N0YWdvbi5zaXplKTtcbiAgICBhcHAuY3R4LmxpbmVUbyh4ICsgb2N0YWdvbi5zaXplLCB5ICsgIG9jdGFnb24uc2l6ZSAqIG9jdGFfbG9uZyk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCArIG9jdGFnb24uc2l6ZSwgeSArIG9jdGFnb24uc2l6ZSAqIG9jdGFfc2hvcnQpO1xuICAgIGFwcC5jdHgubGluZVRvKHggKyBvY3RhZ29uLnNpemUgKiBvY3RhX2xvbmcsIHkpO1xuICAgIGFwcC5jdHgubGluZVRvKHggKyBvY3RhZ29uLnNpemUgKiBvY3RhX3Nob3J0LCB5KTtcbiAgICBhcHAuY3R4LmZpbGwoKTtcbiAgICBhcHAuY3R4LnN0cm9rZSgpO1xuXG4gICAgLy8gRHJhdyBob2xlXG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLlNvY2tldEluc2lkZTtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLlNvY2tldEluc2lkZTtcbiAgICBhcHAuY3R4LmJlZ2luUGF0aCgpO1xuICAgIGFwcC5jdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cyAtIDIsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBhcHAuY3R4LmZpbGwoKTtcblxuICAgIC8vIERyYXcgbGFiZWxcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZVRleHQ7XG4gICAgYXBwLmN0eC5mb250ID0gJzEwcHggbW9ubyc7XG4gICAgdmFyIGNlbnRlclggPSB0aGlzLng7XG4gICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy5sYWJlbCwgY2VudGVyWCwgeSAtIDMpO1xuICB9XG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICBpZiAoeCA+PSB0aGlzLnggLSB0aGlzLnJhZGl1cyAmJiB4IDw9IHRoaXMueCArIHRoaXMucmFkaXVzICsgNCAmJiB5ID49IHRoaXMueSAtIHRoaXMucmFkaXVzICYmIHkgPD0gdGhpcy55ICsgdGhpcy5yYWRpdXMgKyA0KSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cbiAgaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSkge1xuICAgIGlmICh0aGlzLm9uRHJhZykge1xuICAgICAgdGhpcy5vbkRyYWcoYXBwLCB0aGlzLCBkeCwgZHksIHgsIHkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXRTb2NrZXQgZXh0ZW5kcyBTb2NrZXQge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBsYWJlbCwgdHlwZSkge1xuICAgIHN1cGVyKHgsIHksIGxhYmVsLCB0eXBlLCB0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0U29ja2V0IGV4dGVuZHMgU29ja2V0IHtcbiAgY29uc3RydWN0b3IoeCwgeSwgbGFiZWwsIHR5cGUpIHtcbiAgICBzdXBlcih4LCB5LCBsYWJlbCwgdHlwZSwgZmFsc2UpO1xuICB9XG59XG4iLCJleHBvcnQgeyBJbnN0cnVtZW50IH0gZnJvbSAnLi9pbnN0cnVtZW50LmpzJztcbmltcG9ydCB7IEluc3RydW1lbnQgfSBmcm9tICcuL2luc3RydW1lbnQuanMnO1xuaW1wb3J0IHsgQ2hhbm5lbElucHV0LCBDaGFubmVsT3V0cHV0LCBTYW1wbGVHZW5lcmF0b3IsIEZpbHRlciwgVHJhbnNwb3NlLCBQYW5uaW5nfSBmcm9tICcuL21vZHVsZV91bml0cyc7XG5pbXBvcnQgeyBCdXR0b24sIEVkaXRvciwgTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy8nO1xuXG5leHBvcnQgY2xhc3MgSW5zdHJ1bWVudEVkaXRvciBleHRlbmRzIEVkaXRvciB7XG4gIGNvbnN0cnVjdG9yKGFwcCwgaW5zdHJ1bWVudCwgaGFuZGxlQ2xvc2UpIHtcbiAgICBzdXBlcihhcHAsIGluc3RydW1lbnQsIGhhbmRsZUNsb3NlKTtcbiAgICBpZiAoIWluc3RydW1lbnQpIHtcbiAgICAgIGluc3RydW1lbnQgPSBuZXcgSW5zdHJ1bWVudChbXSwgW10pO1xuICAgICAgdmFyIG1vZHVsZXMgPSBbXG4gICAgICAgIG5ldyBNb2R1bGUoaW5zdHJ1bWVudCwgMzAsIDMwLCBuZXcgQ2hhbm5lbElucHV0KCdpbnB1dCcpKSwgXG4gICAgICAgIG5ldyBNb2R1bGUoaW5zdHJ1bWVudCwgODAwLCAzMCwgbmV3IENoYW5uZWxPdXRwdXQoJ291dHB1dCcpKSxcbiAgICAgIF07XG4gICAgICBpbnN0cnVtZW50Lm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgIH1cbiAgICB0aGlzLnRhcmdldCA9IGluc3RydW1lbnQ7XG4gICAgdmFyIGJ1dHRvbkRlZnMgPSBbXG4gICAgICAgIHtsYWJlbDogXCJTSU5cIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzaW5lXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlNRVVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNxdWFyZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJTQVdcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzYXdcIil9LFxuICAgICAgICB7bGFiZWw6IFwiVFJJXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwidHJpYW5nbGVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiUFdNXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwicHVsc2VcIil9LFxuICAgICAgICB7bGFiZWw6IFwiV0FWXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwid2F2XCIpfSxcbiAgICAgICAge2xhYmVsOiBcIk5PSVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcIndoaXRlX25vaXNlXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIkdSQVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcImdyYWluXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlZPQ1wiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInZvY29kZXJcIil9LFxuICAgIF07XG4gICAgdmFyIGZpbHRlckRlZnMgPSBbXG4gICAgICB7bGFiZWw6IFwiTFBGXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkRmlsdGVyKFwibG93IHBhc3MgZmlsdGVyXCIpfSxcbiAgICAgIHtsYWJlbDogXCJIUEZcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJoaWdoIHBhc3MgZmlsdGVyXCIpfSxcbiAgICAgIHtsYWJlbDogXCJETFlcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJkZWxheVwiKX0sXG4gICAgICB7bGFiZWw6IFwiRkxBXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkRmlsdGVyKFwiZmxhbmdlclwiKX0sXG4gICAgICB7bGFiZWw6IFwiRElTXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkRmlsdGVyKFwiZGlzdG9ydGlvblwiKX0sXG4gICAgICB7bGFiZWw6IFwiT1ZSXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkRmlsdGVyKFwib3ZlcmRyaXZlXCIpfSxcbiAgICAgIHtsYWJlbDogXCJUUkVcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJ0cmVtZWxvXCIpfSxcbiAgICBdO1xuICAgIHZhciBkZXJpdmVkRGVmcyA9IFtcbiAgICAgIHtsYWJlbDogXCJUUkFcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBUcmFuc3Bvc2UoXCJ0cmFuc3Bvc2VcIikpfSxcbiAgICAgIHtsYWJlbDogXCJQQU5cIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBQYW5uaW5nKFwicGFubmluZ1wiKSl9LFxuICAgIF07XG4gICAgdmFyIHggPSAxMDtcbiAgICBmb3IgKHZhciBkZWYgb2YgYnV0dG9uRGVmcykge1xuICAgICAgdmFyIGIgPSBuZXcgQnV0dG9uKHgsIDAsIGRlZi5vbmNsaWNrLmJpbmQodGhpcyksIGRlZi5sYWJlbCk7XG4gICAgICBiLmNvbG91ciA9IGFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZUdlbmVyYXRvcjtcbiAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGIpO1xuICAgICAgeCArPSBiLncgKyAzO1xuICAgIH1cbiAgICBmb3IgKHZhciBkZWYgb2YgZmlsdGVyRGVmcykge1xuICAgICAgdmFyIGIgPSBuZXcgQnV0dG9uKHgsIDAsIGRlZi5vbmNsaWNrLmJpbmQodGhpcyksIGRlZi5sYWJlbCk7XG4gICAgICBiLmNvbG91ciA9IGFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZUZpbHRlcjtcbiAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGIpO1xuICAgICAgeCArPSBiLncgKyAzO1xuICAgIH1cbiAgICBmb3IgKHZhciBkZWYgb2YgZGVyaXZlZERlZnMpIHtcbiAgICAgIHZhciBiID0gbmV3IEJ1dHRvbih4LCAwLCBkZWYub25jbGljay5iaW5kKHRoaXMpLCBkZWYubGFiZWwpO1xuICAgICAgYi5jb2xvdXIgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVEZXJpdmVkO1xuICAgICAgdGhpcy5idXR0b25zLnB1c2goYik7XG4gICAgICB4ICs9IGIudyArIDM7XG4gICAgfVxuICB9XG4gIGhhbmRsZUFkZEZpbHRlcih0eXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgRmlsdGVyKHR5cGUpKTtcbiAgfVxuICBoYW5kbGVBZGRHZW5lcmF0b3IodHlwZSkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFNhbXBsZUdlbmVyYXRvcih0eXBlKSk7XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgQ2hhbm5lbElucHV0LCBDaGFubmVsT3V0cHV0LCBGaWx0ZXIsIFNhbXBsZUdlbmVyYXRvciwgVHJhbnNwb3NlLCBQYW5uaW5nLCBGYWN0b3J5IH0gZnJvbSAnLi9tb2R1bGVfdW5pdHMnO1xuaW1wb3J0IHsgUGF0Y2gsIE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IFBhdGNoYWJsZSwgQVVESU9fVFlQRSwgRlJFUVVFTkNZX1RZUEUsIFBBTk5JTkdfVFlQRSB9IGZyb20gJy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBJbnN0cnVtZW50IGV4dGVuZHMgUGF0Y2hhYmxlIHtcbiAgY29uc3RydWN0b3IobW9kdWxlcywgcGF0Y2hlcykge1xuICAgIHN1cGVyKG1vZHVsZXMsIHBhdGNoZXMpO1xuICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgdGhpcy5pbnN0cnVtZW50QmFua0luZGV4ID0gbnVsbDtcbiAgICB0aGlzLm1vZHVsZXMgPSBbXTtcbiAgICB0aGlzLnBhdGNoZXMgPSBbXTtcbiAgfVxuICBsb2FkRnJvbURlZmluaXRpb24oaW5zdHJEZWYpIHtcbiAgICB2YXIgbW9kdWxlcyA9IFtcbiAgICAgIG5ldyBNb2R1bGUodGhpcywgMTAsIDQwLCBuZXcgQ2hhbm5lbElucHV0KCdpbnB1dCcpKSwgXG4gICAgICBuZXcgTW9kdWxlKHRoaXMsIDcwMCwgNDAsIG5ldyBDaGFubmVsT3V0cHV0KCdvdXRwdXQnKSksXG4gICAgXTtcbiAgICB2YXIgcGF0Y2hlcyA9IFtcblxuICAgIF07XG4gICAgdGhpcy5tb2R1bGVzID0gbW9kdWxlcztcbiAgICB0aGlzLnBhdGNoZXMgPSBwYXRjaGVzO1xuICAgIGlmIChpbnN0ckRlZi5uYW1lKSB7XG4gICAgICB0aGlzLm5hbWUgPSBpbnN0ckRlZi5uYW1lO1xuICAgIH1cbiAgICBpZiAoaW5zdHJEZWYuaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5pbnN0cnVtZW50QmFua0luZGV4ID0gaW5zdHJEZWYuaW5kZXg7XG4gICAgfVxuICAgIHZhciBpeCA9IHRoaXMubG9hZEdlbmVyYXRvcihpbnN0ckRlZiwgMCwgMSk7XG4gICAgdGhpcy5wYXRjaElucHV0KGl4KTtcbiAgfVxuICBwYXRjaElucHV0KGl4KSB7XG4gICAgaWYgKGl4KSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShpeCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSBvZiBpeCkge1xuICAgICAgICAgIHRoaXMucGF0Y2hJbnB1dChpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgcyA9IHRoaXMubW9kdWxlc1tpeF0udW5pdC5zb2NrZXRzO1xuICAgICAgdmFyIGNhbmRpZGF0ZSA9IG51bGw7XG4gICAgICBpZiAocykge1xuICAgICAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMocykpIHtcbiAgICAgICAgICBpZiAoc1trZXldLnR5cGUgPT09IEZSRVFVRU5DWV9UWVBFKSB7XG4gICAgICAgICAgICBjYW5kaWRhdGUgPSBrZXk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRQYXRjaChpeCwgMCwgXCJGUkVRXCIsIGNhbmRpZGF0ZSwgRlJFUVVFTkNZX1RZUEUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBsb2FkR2VuZXJhdG9yKGluc3RyRGVmLCBpbnB1dCwgb3V0cHV0KSB7XG4gICAgaWYgKGluc3RyRGVmW1wiY29tYmluZWRcIl0pIHtcbiAgICAgIHZhciBncyA9IFtdO1xuICAgICAgZm9yICh2YXIgaURlZiBvZiBpbnN0ckRlZltcImNvbWJpbmVkXCJdKSB7XG4gICAgICAgIHZhciBpeCA9IHRoaXMubG9hZEdlbmVyYXRvcihpRGVmLCBpbnB1dCwgb3V0cHV0KTtcbiAgICAgICAgaWYgKGl4KSB7XG4gICAgICAgICAgZ3MucHVzaChpeCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBncztcbiAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1wicGFubmluZ1wiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgUGFubmluZyhcInBhbm5pbmdcIik7XG4gICAgICB2YXIgdEl4ID0gdGhpcy5hZGRNb2R1bGUoZyk7XG4gICAgICB2YXIgaXggPSB0aGlzLmxvYWRHZW5lcmF0b3IoaW5zdHJEZWZbXCJwYW5uaW5nXCJdLCBpbnB1dCwgb3V0cHV0KTtcbiAgICAgIHRoaXMuYWRkUGF0Y2godEl4LCBpeCwgXCJQQU5cIiwgXCJQQU5cIiwgUEFOTklOR19UWVBFKTtcbiAgICAgIHRoaXMuYWRkUGF0Y2goaW5wdXQsIHRJeCwgXCJGUkVRXCIsIFwiRlJFUVwiLCBGUkVRVUVOQ1lfVFlQRSk7XG4gICAgICByZXR1cm4gaXg7XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInRyYW5zcG9zZVwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgVHJhbnNwb3NlKFwidHJhbnNwb3NlXCIpO1xuICAgICAgZy5kaWFsc1tcInNlbWl0b25lc1wiXS52YWx1ZSA9IGluc3RyRGVmW1widHJhbnNwb3NlXCJdW1wic2VtaXRvbmVzXCJdIHx8IDA7XG4gICAgICB2YXIgdEl4ID0gdGhpcy5hZGRNb2R1bGUoZyk7XG4gICAgICB2YXIgaXggPSB0aGlzLmxvYWRHZW5lcmF0b3IoaW5zdHJEZWZbXCJ0cmFuc3Bvc2VcIl0sIHRJeCwgb3V0cHV0KTtcbiAgICAgIHRoaXMuYWRkUGF0Y2godEl4LCBpeCwgXCJGUkVRXCIsIFwiRlJFUVwiLCBGUkVRVUVOQ1lfVFlQRSk7XG4gICAgICB0aGlzLmFkZFBhdGNoKGlucHV0LCB0SXgsIFwiRlJFUVwiLCBcIkZSRVEgSU5cIiwgRlJFUVVFTkNZX1RZUEUpO1xuICAgICAgcmV0dXJuIGl4O1xuICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJzaW5lXCJdIFxuICAgICAgfHwgaW5zdHJEZWZbXCJ0cmlhbmdsZVwiXSBcbiAgICAgIHx8IGluc3RyRGVmW1wic3F1YXJlXCJdIFxuICAgICAgfHwgaW5zdHJEZWZbXCJzYXd0b290aFwiXSBcbiAgICAgIHx8IGluc3RyRGVmW1wid2hpdGVfbm9pc2VcIl1cbiAgICAgIHx8IGluc3RyRGVmW1wicHVsc2VcIl1cbiAgICAgIHx8IGluc3RyRGVmW1wid2F2XCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBGYWN0b3J5KCkuZ2VuZXJhdG9yRnJvbURlZmluaXRpb24oaW5zdHJEZWYpO1xuICAgICAgdmFyIGl4ID0gdGhpcy5hZGRNb2R1bGUoZyk7XG4gICAgICB0aGlzLmFkZFBhdGNoKGl4LCBvdXRwdXQsIFwiT1VUXCIsIFwiSU5cIiwgQVVESU9fVFlQRSk7XG4gICAgICByZXR1cm4gaXg7XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInZvY29kZXJcIl0pIHtcbiAgICAgIHZhciBzb3VyY2UgPSBuZXcgRmFjdG9yeSgpLmdlbmVyYXRvckZyb21EZWZpbml0aW9uKGluc3RyRGVmW1widm9jb2RlclwiXVtcInNvdXJjZVwiXSlcbiAgICAgIHZhciB2b2NvZGVyID0gbmV3IEZhY3RvcnkoKS5nZW5lcmF0b3JGcm9tRGVmaW5pdGlvbihpbnN0ckRlZltcInZvY29kZXJcIl1bXCJ2b2NvZGVyXCJdKVxuICAgICAgcmV0dXJuIFtdO1xuICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJmaWx0ZXJcIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IEZhY3RvcnkoKS5maWx0ZXJGcm9tRGVmaW5pdGlvbihpbnN0ckRlZltcImZpbHRlclwiXSlcbiAgICAgIHZhciB0SXggPSB0aGlzLmFkZE1vZHVsZShnKTtcbiAgICAgIHZhciBpeCA9IHRoaXMubG9hZEdlbmVyYXRvcihpbnN0ckRlZltcImZpbHRlclwiXSwgaW5wdXQsIHRJeCk7XG4gICAgICB0aGlzLmFkZFBhdGNoKHRJeCwgb3V0cHV0LCBcIk9VVFwiLCBcIklOXCIsIEFVRElPX1RZUEUpO1xuICAgICAgcmV0dXJuIGl4O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhpbnN0ckRlZik7XG4gICAgICB0aHJvdyAnVW5rbm93biBpbnN0cnVtZW50IGRlZic7XG4gICAgfVxuICB9XG4gIGFkZE1vZHVsZShnZW5lcmF0b3IpIHtcbiAgICB2YXIgbSA9IG5ldyBNb2R1bGUodGhpcywgTWF0aC5yYW5kb20oKSAqIDgwMCArIDEwMCwgTWF0aC5yYW5kb20oKSAqIDYwMCwgZ2VuZXJhdG9yKTtcbiAgICB0aGlzLm1vZHVsZXMucHVzaChtKTtcbiAgICByZXR1cm4gdGhpcy5tb2R1bGVzLmxlbmd0aCAtIDE7XG4gIH1cbiAgYWRkUGF0Y2goZnJvbU1vZHVsZSwgdG9Nb2R1bGUsIGZyb21Tb2NrZXQsIHRvU29ja2V0LCB0eXBlKSB7XG4gICAgY29uc29sZS5sb2coXCJBRGRpbmcgcGF0Y2hcIiwgZnJvbU1vZHVsZSwgdG9Nb2R1bGUsIGZyb21Tb2NrZXQsIHRvU29ja2V0KTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0b01vZHVsZSkpIHtcbiAgICAgIGZvciAodmFyIHRvIG9mIHRvTW9kdWxlKSB7XG4gICAgICAgIHRoaXMuYWRkUGF0Y2goZnJvbU1vZHVsZSwgdG8sIGZyb21Tb2NrZXQsIHRvU29ja2V0LCB0eXBlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHAgPSBuZXcgUGF0Y2goZnJvbU1vZHVsZSwgdG9Nb2R1bGUsIGZyb21Tb2NrZXQsIHRvU29ja2V0LCB0eXBlKTtcbiAgICB0aGlzLnBhdGNoZXMucHVzaChwKTtcbiAgfVxuICBsb2FkKGluc3RyRGVmKSB7XG4gICAgdmFyIG1vZHVsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBtIG9mIGluc3RyRGVmLm1vZHVsZXMpIHtcbiAgICAgIHZhciBnID0gbnVsbDtcbiAgICAgIGlmIChtLnR5cGUgPT0gXCJpbnB1dFwiKSB7XG4gICAgICAgIGcgPSBuZXcgQ2hhbm5lbElucHV0KG0udHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKG0udHlwZSA9PSBcIm91dHB1dFwiKSB7XG4gICAgICAgIGcgPSBuZXcgQ2hhbm5lbE91dHB1dChtLnR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChtLnR5cGUgPT0gXCJsb3cgcGFzcyBmaWx0ZXJcIikge1xuICAgICAgICBnID0gbmV3IEZpbHRlcihtLnR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChtLnR5cGUgPT0gXCJzaW5lXCIgfHwgbS50eXBlID09IFwidHJpYW5nbGVcIikge1xuICAgICAgICBnID0gbmV3IFNhbXBsZUdlbmVyYXRvcihtLnR5cGUpO1xuICAgICAgfVxuICAgICAgaWYgKGcpIHtcbiAgICAgICAgdmFyIG1vZCA9IG5ldyBNb2R1bGUodGhpcywgbS54LCBtLnksIGcpO1xuICAgICAgICBtb2R1bGVzLnB1c2gobW9kKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHBhdGNoZXMgPSBbXTtcbiAgICBmb3IgKHZhciBwIG9mIGluc3RyRGVmLnBhdGNoZXMpIHtcbiAgICAgIHRoaXMuYWRkUGF0Y2gocC5mcm9tX21vZHVsZSwgcC50b19tb2R1bGUsIHAuZnJvbV9zb2NrZXQsIHAudG9fc29ja2V0KTtcbiAgICB9XG4gICAgdGhpcy5tb2R1bGVzID0gbW9kdWxlcztcbiAgICB0aGlzLnBhdGNoZXMgPSBwYXRjaGVzO1xuICB9XG5cbiAgY29tcGlsZSgpIHtcbiAgICB2YXIgb3V0cHV0ID0gbnVsbDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG0gPSB0aGlzLm1vZHVsZXNbaV07XG4gICAgICBpZiAobS51bml0LnR5cGUgPT0gXCJvdXRwdXRcIikge1xuICAgICAgICBvdXRwdXQgPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIW91dHB1dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHF1ZXVlID0gW291dHB1dF07XG4gICAgdmFyIHNlZW4gPSB7fTtcbiAgICB2YXIgZGVwZW5kZW5jaWVzID0gW107XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBxID0gcXVldWVbMF07XG4gICAgICB2YXIgcXVldWUgPSBxdWV1ZS5zcGxpY2UoMSk7XG4gICAgICBpZiAoc2VlbltxXSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgZGVwZW5kZW5jaWVzLnB1c2gocSk7XG4gICAgICBmb3IgKHZhciBwIG9mIHRoaXMucGF0Y2hlcykge1xuICAgICAgICBpZiAoIXRoaXMubW9kdWxlc1txXSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmlnIHRyb3VibGVzOiB0cnlpbmcgdG8gcmVhY2ggbm9uIGV4aXN0ZW50IG1vZHVsZTpcIiwgaXgpO1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1vZFNvY2tldHMgPSB0aGlzLm1vZHVsZXNbcV0udW5pdC5zb2NrZXRzO1xuICAgICAgICBpZiAocC50byA9PT0gcSAmJiBtb2RTb2NrZXRzW3AudG9Tb2NrZXRdICYmIG1vZFNvY2tldHNbcC50b1NvY2tldF0uaXNJbnB1dCkge1xuICAgICAgICAgIGlmICghc2VlbltwLmZyb21dKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKHAuZnJvbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHAuZnJvbSA9PT0gcSAmJiBtb2RTb2NrZXRzW3AuZnJvbVNvY2tldF0gJiYgbW9kU29ja2V0c1twLmZyb21Tb2NrZXRdLmlzSW5wdXQpIHtcbiAgICAgICAgICBpZiAoIXNlZW5bcC50b10pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2gocC50byk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZWVuW3FdID0gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIGdlbmVyYXRvcnMgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gZGVwZW5kZW5jaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgaXggPSBkZXBlbmRlbmNpZXNbaV07XG4gICAgICBpZiAoIXRoaXMubW9kdWxlc1tpeF0pIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJCaWcgdHJvdWJsZXM6IHRyeWluZyB0byByZWFjaCBub24gZXhpc3RlbnQgbW9kdWxlOlwiLCBpeCk7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICB2YXIgdW5pdCA9IHRoaXMubW9kdWxlc1tpeF0udW5pdDtcbiAgICAgIHZhciBnID0gbnVsbDtcbiAgICAgIGlmICh1bml0LnR5cGUgPT0gXCJpbnB1dFwiKSB7XG4gICAgICAgIGcgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJ3YXZcIikge1xuICAgICAgICBnID0gdW5pdC5jb21waWxlKCk7XG4gICAgICB9IGVsc2UgaWYgKHVuaXQudHlwZSA9PSBcInRyaWFuZ2xlXCIgXG4gICAgICAgIHx8IHVuaXQudHlwZSA9PSBcInNpbmVcIiBcbiAgICAgICAgfHwgdW5pdC50eXBlID09IFwic2F3XCIgXG4gICAgICAgIHx8IHVuaXQudHlwZSA9PSBcInNxdWFyZVwiIFxuICAgICAgICB8fCB1bml0LnR5cGUgPT0gXCJ3aGl0ZV9ub2lzZVwiKSB7XG4gICAgICAgIGcgPSB7fTtcbiAgICAgICAgZ1t1bml0LnR5cGVdID0ge1xuICAgICAgICAgIFwiZ2FpblwiOiB1bml0LmRpYWxzW1wiZ2FpblwiXS52YWx1ZSxcbiAgICAgICAgICBcInBhbm5pbmdcIjogdW5pdC5kaWFsc1tcInBhbm5pbmdcIl0udmFsdWUsXG4gICAgICAgICAgXCJhdHRhY2tcIjogdW5pdC5kaWFsc1tcImF0dGFja1wiXS52YWx1ZSxcbiAgICAgICAgICBcImRlY2F5XCI6IHVuaXQuZGlhbHNbXCJkZWNheVwiXS52YWx1ZSxcbiAgICAgICAgICBcInN1c3RhaW5cIjogdW5pdC5kaWFsc1tcInN1c3RhaW5cIl0udmFsdWUsXG4gICAgICAgICAgXCJyZWxlYXNlXCI6IHVuaXQuZGlhbHNbXCJyZWxlYXNlXCJdLnZhbHVlLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgcGl0Y2hGb3VuZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBwIG9mIHRoaXMucGF0Y2hlcykge1xuICAgICAgICAgIGlmIChwLmRvZXNQYXRjaENvbm5lY3RUbyhpeCwgXCJGUkVRXCIpKSB7XG4gICAgICAgICAgICBwaXRjaEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBwZyA9IGdlbmVyYXRvcnNbcC5jb25uZWN0c1RvKGl4LCBcIkZSRVFcIikubW9kdWxlXTtcbiAgICAgICAgICAgIGlmIChwZykge1xuICAgICAgICAgICAgICBnW3VuaXQudHlwZV1bXCJhdXRvX3BpdGNoXCJdID0gcGc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcGl0Y2hGb3VuZCkge1xuICAgICAgICAgIGdbdW5pdC50eXBlXVtcInBpdGNoXCJdID0gdW5pdC5kaWFsc1tcInBpdGNoXCJdLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHVuaXQudHlwZSA9PSBcImxvdyBwYXNzIGZpbHRlclwiKSB7XG4gICAgICAgIGcgPSB7fTtcbiAgICAgICAgZ1tcImZpbHRlclwiXSA9IHtcImxwZlwiOiB7XCJjdXRvZmZcIjogdW5pdC5kaWFsc1tcImN1dG9mZlwiXS52YWx1ZX19XG4gICAgICAgIHZhciBvbiA9IHRoaXMuY29tcGlsZUdlbmVyYXRvcnMoZ2VuZXJhdG9ycywgaXgsIFwiSU5cIik7XG4gICAgICAgIE9iamVjdC5rZXlzKG9uKS5tYXAoKGspID0+IHtcbiAgICAgICAgICBnW1wiZmlsdGVyXCJdW2tdID0gb25ba107XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJoaWdoIHBhc3MgZmlsdGVyXCIpIHtcbiAgICAgICAgZyA9IHt9O1xuICAgICAgICBnW1wiZmlsdGVyXCJdID0ge1wiaHBmXCI6IHtcImN1dG9mZlwiOiB1bml0LmRpYWxzW1wiY3V0b2ZmXCJdLnZhbHVlfX1cbiAgICAgICAgdmFyIG9uID0gdGhpcy5jb21waWxlR2VuZXJhdG9ycyhnZW5lcmF0b3JzLCBpeCwgXCJJTlwiKTtcbiAgICAgICAgT2JqZWN0LmtleXMob24pLm1hcCgoaykgPT4ge1xuICAgICAgICAgIGdbXCJmaWx0ZXJcIl1ba10gPSBvbltrXTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHVuaXQudHlwZSA9PSBcInRyYW5zcG9zZVwiKSB7XG4gICAgICAgIGcgPSB7XCJ0cmFuc3Bvc2VcIjoge1xuICAgICAgICAgIFwic2VtaXRvbmVzXCI6IHVuaXQuZGlhbHNbXCJzZW1pdG9uZXNcIl0udmFsdWUsXG4gICAgICAgIH19XG4gICAgICAgIHZhciBvbiA9IHRoaXMuY29tcGlsZUdlbmVyYXRvcnMoZ2VuZXJhdG9ycywgaXgsIFwiRlJFUSBJTlwiKTtcbiAgICAgICAgaWYgKG9uKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMob24pLm1hcCgoaykgPT4ge1xuICAgICAgICAgICAgZ1tcInRyYW5zcG9zZVwiXVtrXSA9IG9uW2tdO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHVuaXQudHlwZSA9PSBcInBhbm5pbmdcIikge1xuICAgICAgICBnID0ge1wicGFubmluZ1wiOiB7fX1cbiAgICAgICAgdmFyIG9uID0gdGhpcy5jb21waWxlR2VuZXJhdG9ycyhnZW5lcmF0b3JzLCBpeCwgXCJGUkVRIElOXCIpO1xuICAgICAgICBpZiAob24pIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhvbikubWFwKChrKSA9PiB7XG4gICAgICAgICAgICBnW1wicGFubmluZ1wiXVtrXSA9IG9uW2tdO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHVuaXQudHlwZSA9PSBcIm91dHB1dFwiKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmNvbXBpbGVHZW5lcmF0b3JzKGdlbmVyYXRvcnMsIGl4LCBcIklOXCIpO1xuICAgICAgICBpZiAodGhpcy5uYW1lKSB7XG4gICAgICAgICAgcmVzdWx0Lm5hbWUgPSB0aGlzLm5hbWVcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbnN0cnVtZW50QmFua0luZGV4KSB7XG4gICAgICAgICAgcmVzdWx0LmluZGV4ID0gdGhpcy5pbnN0cnVtZW50QmFua0luZGV4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICBnZW5lcmF0b3JzW2l4XSA9IGc7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29tcGlsZUdlbmVyYXRvcnMoZ2VuZXJhdG9ycywgaXgsIGlucHV0KSB7XG4gICAgdmFyIGdzID0gW107XG4gICAgZm9yICh2YXIgcCBvZiB0aGlzLnBhdGNoZXMpIHtcbiAgICAgIGlmIChwLmRvZXNQYXRjaENvbm5lY3RUbyhpeCwgaW5wdXQpKSB7XG4gICAgICAgIGdzLnB1c2goZ2VuZXJhdG9yc1twLmNvbm5lY3RzVG8oaXgsIGlucHV0KS5tb2R1bGVdKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2UgaWYgKGdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIGdzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1wiY29tYmluZWRcIjogZ3N9XG4gICAgfVxuICB9XG59XG5cbiIsImltcG9ydCB7IE1vZHVsZVVuaXQsIE91dHB1dFNvY2tldCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IEZSRVFVRU5DWV9UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIENoYW5uZWxJbnB1dCBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgc3VwZXIodHlwZSk7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJGUkVRXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIkZSRVFcIiwgRlJFUVVFTkNZX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlT3V0cHV0JztcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgSW5wdXRTb2NrZXQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBBVURJT19UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuXG5leHBvcnQgY2xhc3MgQ2hhbm5lbE91dHB1dCBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgc3VwZXIodHlwZSk7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJJTlwiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIklOXCIsIEFVRElPX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlT3V0cHV0JztcbiAgfVxufVxuXG4iLCJcbmltcG9ydCB7IFNhbXBsZUdlbmVyYXRvciwgV2F2R2VuZXJhdG9yIH0gZnJvbSAnLi9zYW1wbGVfZ2VuZXJhdG9yLmpzJztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4vZmlsdGVyLmpzJztcblxuZXhwb3J0IGNsYXNzIEZhY3Rvcnkge1xuXG4gIGdlbmVyYXRvckZyb21EZWZpbml0aW9uKGluc3RyRGVmKSB7XG5cbiAgICBpZiAoaW5zdHJEZWZbXCJzaW5lXCJdIFxuICAgICAgfHwgaW5zdHJEZWZbXCJ0cmlhbmdsZVwiXSBcbiAgICAgIHx8IGluc3RyRGVmW1wic3F1YXJlXCJdIFxuICAgICAgfHwgaW5zdHJEZWZbXCJzYXd0b290aFwiXSBcbiAgICAgIHx8IGluc3RyRGVmW1wid2hpdGVfbm9pc2VcIl0pIHtcbiAgICAgIHZhciB0eXAgPSBcInRyaWFuZ2xlXCI7XG4gICAgICB2YXIgaW5zdHIgPSBudWxsO1xuICAgICAgaWYgKGluc3RyRGVmW1widHJpYW5nbGVcIl0pIHtcbiAgICAgICAgaW5zdHIgPSBpbnN0ckRlZltcInRyaWFuZ2xlXCJdO1xuICAgICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInNpbmVcIl0pIHtcbiAgICAgICAgaW5zdHIgPSBpbnN0ckRlZltcInNpbmVcIl07XG4gICAgICAgIHR5cCA9IFwic2luZVwiO1xuICAgICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInNxdWFyZVwiXSkge1xuICAgICAgICBpbnN0ciA9IGluc3RyRGVmW1wic3F1YXJlXCJdO1xuICAgICAgICB0eXAgPSBcInNxdWFyZVwiO1xuICAgICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInNhd3Rvb3RoXCJdKSB7XG4gICAgICAgIGluc3RyID0gaW5zdHJEZWZbXCJzYXd0b290aFwiXTtcbiAgICAgICAgdHlwID0gXCJzYXdcIjtcbiAgICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJ3aGl0ZV9ub2lzZVwiXSkge1xuICAgICAgICBpbnN0ciA9IGluc3RyRGVmW1wid2hpdGVfbm9pc2VcIl07XG4gICAgICAgIHR5cCA9IFwid2hpdGVfbm9pc2VcIjtcbiAgICAgIH1cbiAgICAgIHZhciBnID0gbmV3IFNhbXBsZUdlbmVyYXRvcih0eXApXG4gICAgICBnLmRpYWxzW1wiYXR0YWNrXCJdLnZhbHVlID0gaW5zdHJbXCJhdHRhY2tcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcImRlY2F5XCJdLnZhbHVlID0gaW5zdHJbXCJkZWNheVwiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wic3VzdGFpblwiXS52YWx1ZSA9IGluc3RyW1wic3VzdGFpblwiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wicmVsZWFzZVwiXS52YWx1ZSA9IGluc3RyW1wicmVsZWFzZVwiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wiZ2FpblwiXS52YWx1ZSA9IGluc3RyW1wiZ2FpblwiXSB8fCAxLjA7XG4gICAgICByZXR1cm4gZztcbiAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1wid2F2XCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBXYXZHZW5lcmF0b3IoKTtcbiAgICAgIHZhciBpbnN0ciA9IGluc3RyRGVmW1wid2F2XCJdO1xuICAgICAgZy5maWxlID0gaW5zdHJbXCJmaWxlXCJdIHx8IFwiXCI7XG4gICAgICBnLmlzX3BpdGNoZWQgPSBpbnN0cltcInBpdGNoZWRcIl0gfHwgZmFsc2U7XG4gICAgICBnLmJhc2VfcGl0Y2ggPSBpbnN0cltcImJhc2VfcGl0Y2hcIl0gfHwgNDQwLjA7XG4gICAgICBnLmRpYWxzW1wiYXR0YWNrXCJdLnZhbHVlID0gaW5zdHJbXCJhdHRhY2tcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcImRlY2F5XCJdLnZhbHVlID0gaW5zdHJbXCJkZWNheVwiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wic3VzdGFpblwiXS52YWx1ZSA9IGluc3RyW1wic3VzdGFpblwiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wicmVsZWFzZVwiXS52YWx1ZSA9IGluc3RyW1wicmVsZWFzZVwiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wiZ2FpblwiXS52YWx1ZSA9IGluc3RyW1wiZ2FpblwiXSB8fCAxLjA7XG4gICAgICByZXR1cm4gZztcbiAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1wicHVsc2VcIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IFNhbXBsZUdlbmVyYXRvcihcInB1bHNlXCIpO1xuICAgICAgdmFyIGluc3RyID0gaW5zdHJEZWZbXCJwdWxzZVwiXTtcbiAgICAgIGcuZGlhbHNbXCJhdHRhY2tcIl0udmFsdWUgPSBpbnN0cltcImF0dGFja1wiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wiZGVjYXlcIl0udmFsdWUgPSBpbnN0cltcImRlY2F5XCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJzdXN0YWluXCJdLnZhbHVlID0gaW5zdHJbXCJzdXN0YWluXCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJyZWxlYXNlXCJdLnZhbHVlID0gaW5zdHJbXCJyZWxlYXNlXCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJnYWluXCJdLnZhbHVlID0gaW5zdHJbXCJnYWluXCJdIHx8IDEuMDtcbiAgICAgIHJldHVybiBnO1xuICAgIH1cbiAgfVxuXG4gIGZpbHRlckZyb21EZWZpbml0aW9uKGZpbHRlckRlZikge1xuICAgIGlmIChmaWx0ZXJEZWZbXCJscGZcIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IEZpbHRlcihcImxvdyBwYXNzIGZpbHRlclwiKVxuICAgICAgZy5kaWFsc1tcImN1dG9mZlwiXS52YWx1ZSA9IGZpbHRlckRlZltcImxwZlwiXVtcImN1dG9mZlwiXSB8fCA1MDAwO1xuICAgICAgcmV0dXJuIGc7XG4gICAgfSBlbHNlIGlmIChmaWx0ZXJEZWZbXCJkaXN0b3J0aW9uXCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBGaWx0ZXIoXCJkaXN0b3J0aW9uXCIpXG4gICAgICByZXR1cm4gZztcbiAgICB9IGVsc2UgaWYgKGZpbHRlckRlZltcIm92ZXJkcml2ZVwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgRmlsdGVyKFwib3ZlcmRyaXZlXCIpXG4gICAgICByZXR1cm4gZztcbiAgICB9IGVsc2UgaWYgKGZpbHRlckRlZltcImZsYW5nZXJcIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IEZpbHRlcihcImZsYW5nZXJcIilcbiAgICAgIHJldHVybiBnO1xuICAgIH0gZWxzZSBpZiAoZmlsdGVyRGVmW1wiYXZlcmFnZVwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgRmlsdGVyKFwiYXZlcmFnZVwiKVxuICAgICAgcmV0dXJuIGc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKGZpbHRlckRlZik7XG4gICAgICB0aHJvdyAnVW5rbm93biBmaWx0ZXIgZGVmJztcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZVVuaXQsIElucHV0U29ja2V0LCBPdXRwdXRTb2NrZXQsIERpYWwgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBBVURJT19UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIEZpbHRlciBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgc3VwZXIodHlwZSk7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJJTlwiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIklOXCIsIEFVRElPX1RZUEUpLFxuICAgICAgXCJPVVRcIjogbmV3IE91dHB1dFNvY2tldCh0aGlzLncgLSAyOSwgdGhpcy5oIC0gMjksIFwiT1VUXCIsIEFVRElPX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlRmlsdGVyJztcbiAgICB0aGlzLmRpYWxzID0geyB9XG5cbiAgICBpZiAodHlwZSA9PT0gXCJsb3cgcGFzcyBmaWx0ZXJcIiB8fCB0eXBlID09PSBcImhpZ2ggcGFzcyBmaWx0ZXJcIikge1xuICAgICAgdGhpcy53ID0gMTUwO1xuICAgICAgdGhpcy5kaWFsc1tcImN1dG9mZlwiXSA9IG5ldyBEaWFsKDI5LCA1OSwgXCJDVVRPRkZcIiwgMS4wLCAyMjAwMC4wLCA1MDAwLjApO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJkZWxheVwiKSB7XG4gICAgICB0aGlzLncgPSAxNzA7XG4gICAgICB0aGlzLmRpYWxzW1widGltZVwiXSA9IG5ldyBEaWFsKDI5LCA1OSwgXCJUSU1FXCIsIDAuMDAwMDEsIDQuMCwgMS4wKTtcbiAgICAgIHRoaXMuZGlhbHNbXCJmYWN0b3JcIl0gPSBuZXcgRGlhbCg3OSwgNTksIFwiRkFDVE9SXCIsIDAuMCwgMi4wLCAxLjApO1xuICAgICAgdGhpcy5kaWFsc1tcImZlZWRiYWNrXCJdID0gbmV3IERpYWwoMTI5LCA1OSwgXCJGRUVEQkFDS1wiLCAwLjAsIDIuMCwgMC4wKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCB7IENoYW5uZWxJbnB1dCB9IGZyb20gJy4vY2hhbm5lbF9pbnB1dC5qcyc7XG5leHBvcnQgeyBDaGFubmVsT3V0cHV0IH0gZnJvbSAnLi9jaGFubmVsX291dHB1dC5qcyc7XG5leHBvcnQgeyBGaWx0ZXIgfSBmcm9tICcuL2ZpbHRlci5qcyc7XG5leHBvcnQgeyBTYW1wbGVHZW5lcmF0b3IgfSBmcm9tICcuL3NhbXBsZV9nZW5lcmF0b3IuanMnO1xuZXhwb3J0IHsgVHJhbnNwb3NlIH0gZnJvbSAnLi90cmFuc3Bvc2UuanMnO1xuZXhwb3J0IHsgUGFubmluZyB9IGZyb20gJy4vcGFubmluZy5qcyc7XG5leHBvcnQgeyBGYWN0b3J5IH0gZnJvbSAnLi9mYWN0b3J5LmpzJztcbiIsImltcG9ydCB7IElucHV0U29ja2V0LCBPdXRwdXRTb2NrZXQsIERpYWwsIE1vZHVsZVVuaXQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBGUkVRVUVOQ1lfVFlQRSwgUEFOTklOR19UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFBhbm5pbmcgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVEZXJpdmVkJztcbiAgICB0aGlzLncgPSAxMjA7XG4gICAgdGhpcy5oID0gMTUwO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiRlJFUVwiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIkZSRVFcIiwgRlJFUVVFTkNZX1RZUEUpLFxuICAgICAgXCJQQU5cIjogbmV3IE91dHB1dFNvY2tldCh0aGlzLncgLSAyOSwgdGhpcy5oIC0gMjksIFwiUEFOXCIsIFBBTk5JTkdfVFlQRSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBJbnB1dFNvY2tldCwgT3V0cHV0U29ja2V0LCBEaWFsLCBNb2R1bGVVbml0IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgRlJFUVVFTkNZX1RZUEUsIEFVRElPX1RZUEUsIFBBTk5JTkdfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBTYW1wbGVHZW5lcmF0b3IgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVHZW5lcmF0b3InO1xuICAgIHRoaXMudyA9IDIyMDtcbiAgICB0aGlzLmggPSAyNTA7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJGUkVRXCI6IG5ldyBJbnB1dFNvY2tldCgyOSwgdGhpcy5oIC0gMjksIFwiRlJFUVwiLCBGUkVRVUVOQ1lfVFlQRSksXG4gICAgICBcIlBBTlwiOiBuZXcgSW5wdXRTb2NrZXQoNzksIHRoaXMuaCAtIDI5LCBcIlBBTlwiLCBQQU5OSU5HX1RZUEUpLFxuICAgICAgXCJPVVRcIjogbmV3IE91dHB1dFNvY2tldCh0aGlzLncgLSAyOSwgdGhpcy5oIC0gMjksIFwiT1VUXCIsIEFVRElPX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmRpYWxzID0ge1xuICAgICAgXCJwaXRjaFwiOiBuZXcgRGlhbCgyOSwgNDksIFwiRlJFUVwiLCAwLjAsIDIyMDAwLjAsIDAuMCksXG4gICAgICBcImdhaW5cIjogbmV3IERpYWwoNzksIDQ5LCBcIkdBSU5cIiwgMC4wLCA0LjAsIDEuMCksXG4gICAgICBcInBhbm5pbmdcIjogbmV3IERpYWwoMTI5LCA0OSwgXCJQQU5cIiwgMC4wLCAxLjAsIDAuNSksXG4gICAgICBcImF0dGFja1wiOiBuZXcgRGlhbCgyOSwgMTIwLCBcIkFUVEFDS1wiLCAwLjAsIDEwLjAsIDAuMSksXG4gICAgICBcImRlY2F5XCI6IG5ldyBEaWFsKDc5LCAxMjAsIFwiREVDQVlcIiwgMC4wLCAxMC4wLCAwLjEpLFxuICAgICAgXCJzdXN0YWluXCI6IG5ldyBEaWFsKDEyOSwgMTIwLCBcIlNVU1RBSU5cIiwgMC4wLCAxLjAsIDAuOCksXG4gICAgICBcInJlbGVhc2VcIjogbmV3IERpYWwoMTc5LCAxMjAsIFwiUkVMRUFTRVwiLCAwLjAsIDEwLCAwLjEpLFxuICAgIH1cbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBXYXZHZW5lcmF0b3IgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJ3YXZcIik7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZUdlbmVyYXRvcic7XG4gICAgdGhpcy53ID0gMjIwO1xuICAgIHRoaXMuaCA9IDI1MDtcbiAgICB0aGlzLmZpbGUgPSBcIlwiO1xuICAgIHRoaXMuaXNfcGl0Y2hlZCA9IGZhbHNlO1xuICAgIHRoaXMuYmFzZV9waXRjaCA9IDQ0MC4wO1xuICAgIC8vIFRPRE86IGZpbGUgaW5wdXQgYW5kIGlzX3BpdGNoZWQgYm9vbGVhblxuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiRlJFUVwiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIkZSRVFcIiwgRlJFUVVFTkNZX1RZUEUpLFxuICAgICAgXCJQQU5cIjogbmV3IElucHV0U29ja2V0KDc5LCB0aGlzLmggLSAyOSwgXCJQQU5cIiwgUEFOTklOR19UWVBFKSxcbiAgICAgIFwiT1VUXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIk9VVFwiLCBBVURJT19UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscyA9IHtcbiAgICAgIFwicGl0Y2hcIjogbmV3IERpYWwoMjksIDQ5LCBcIkZSRVFcIiwgMC4wLCAyMjAwMC4wLCAwLjApLFxuICAgICAgXCJnYWluXCI6IG5ldyBEaWFsKDc5LCA0OSwgXCJHQUlOXCIsIDAuMCwgNC4wLCAxLjApLFxuICAgICAgXCJwYW5uaW5nXCI6IG5ldyBEaWFsKDEyOSwgNDksIFwiUEFOXCIsIDAuMCwgMS4wLCAwLjUpLFxuICAgICAgXCJhdHRhY2tcIjogbmV3IERpYWwoMjksIDEyMCwgXCJBVFRBQ0tcIiwgMC4wLCAxMC4wLCAwLjEpLFxuICAgICAgXCJkZWNheVwiOiBuZXcgRGlhbCg3OSwgMTIwLCBcIkRFQ0FZXCIsIDAuMCwgMTAuMCwgMC4xKSxcbiAgICAgIFwic3VzdGFpblwiOiBuZXcgRGlhbCgxMjksIDEyMCwgXCJTVVNUQUlOXCIsIDAuMCwgMS4wLCAwLjgpLFxuICAgICAgXCJyZWxlYXNlXCI6IG5ldyBEaWFsKDE3OSwgMTIwLCBcIlJFTEVBU0VcIiwgMC4wLCAxMCwgMC4xKSxcbiAgICB9XG4gIH1cblxuICBjb21waWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBcIndhdlwiOiB7XG4gICAgICAgIFwiZmlsZVwiOiB0aGlzLmZpbGUsXG4gICAgICAgIFwiZ2FpblwiOiB0aGlzLmRpYWxzW1wiZ2FpblwiXS52YWx1ZSxcbiAgICAgICAgXCJwaXRjaGVkXCI6IHRoaXMuaXNfcGl0Y2hlZCxcbiAgICAgICAgXCJiYXNlX3BpdGNoXCI6IHRoaXMuYmFzZV9waXRjaCxcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbnB1dFNvY2tldCwgT3V0cHV0U29ja2V0LCBEaWFsLCBNb2R1bGVVbml0IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgRlJFUVVFTkNZX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgVHJhbnNwb3NlIGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlRGVyaXZlZCc7XG4gICAgdGhpcy53ID0gMTIwO1xuICAgIHRoaXMuaCA9IDE1MDtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIkZSRVEgSU5cIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJGUkVRIElOXCIsIEZSRVFVRU5DWV9UWVBFKSxcbiAgICAgIFwiRlJFUVwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJGUkVRXCIsIEZSRVFVRU5DWV9UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscyA9IHtcbiAgICAgIFwic2VtaXRvbmVzXCI6IG5ldyBEaWFsKDI5LCA0OSwgXCJTRU1JVE9ORVNcIiwgLTI0LCAyNCwgMC4wKSxcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFRoZW1lIH0gZnJvbSAnLi90aGVtZS5qcyc7XG5pbXBvcnQgeyBJbnN0cnVtZW50RWRpdG9yLCBJbnN0cnVtZW50IH0gZnJvbSAnLi9pbnN0cnVtZW50X2VkaXRvci8nO1xuaW1wb3J0IHsgVGltZWxpbmVFZGl0b3IsIENoYW5uZWwgfSBmcm9tICcuL3RpbWVsaW5lX2VkaXRvci8nO1xuaW1wb3J0IHsgU2VxdWVuY2VFZGl0b3IgfSBmcm9tICcuL3NlcXVlbmNlX2VkaXRvci8nO1xuaW1wb3J0IHsgQVBJIH0gZnJvbSAnLi9hcGkvJztcblxuZXhwb3J0IGNsYXNzIEJsZWVwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpO1xuICAgIHRoaXMudGhlbWUgPSBuZXcgVGhlbWUoKTtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5jYW52YXMub25tb3VzZWRvd24gPSB0aGlzLmhhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpXG4gICAgdGhpcy5jYW52YXMub25tb3VzZXVwID0gdGhpcy5oYW5kbGVNb3VzZVVwLmJpbmQodGhpcylcbiAgICB0aGlzLmNhbnZhcy5vbm1vdXNlbW92ZSA9IHRoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQodGhpcylcbiAgICB0aGlzLnNlbGVjdGVkRWxlbSA9IG51bGw7XG4gICAgdGhpcy5zdGFydFNlbGVjdGVkUG9zID0ge307XG4gICAgdGhpcy5zZWxlY3RlZFBvcyA9IHt9O1xuICAgIHRoaXMuYXBpID0gbmV3IEFQSSh0aGlzKTtcbiAgICB0aGlzLmFwaS5zdGFydCgpO1xuICAgIHRoaXMuY2hhbm5lbHMgPSBbbmV3IENoYW5uZWwoMSwgdGhpcy5vcGVuSW5zdHJ1bWVudEVkaXRvci5iaW5kKHRoaXMpKV07XG4gICAgLy90aGlzLmxvYWQoZXhhbXBsZSk7XG4gICAgLy90aGlzLm9wZW5JbnN0cnVtZW50RWRpdG9yKGJhbmsuaW5zdHJ1bWVudHNbMF0pO1xuICAgIC8vdGhpcy5vcGVuU2VxdWVuY2VFZGl0b3IobnVsbCwgMSk7XG4gICAgdGhpcy5vcGVuVGltZWxpbmVFZGl0b3IoKTtcbiAgICB0aGlzLmRyYXcoKTtcbiAgfVxuXG4gIGluaXRpYWxpc2VDaGFubmVscyhjaGFubmVsRGVmcykge1xuICAgIHRoaXMuY2hhbm5lbHMgPSBbXTtcbiAgICBmb3IgKHZhciBkZWYgb2YgY2hhbm5lbERlZnMpIHtcbiAgICAgIHZhciBjaCA9IG5ldyBDaGFubmVsKGRlZi5jaGFubmVsLCB0aGlzLm9wZW5JbnN0cnVtZW50RWRpdG9yLmJpbmQodGhpcykpO1xuICAgICAgY2gubG9hZEZyb21EZWZpbml0aW9uKGRlZik7XG4gICAgICB0aGlzLmNoYW5uZWxzLnB1c2goY2gpO1xuICAgICAgY2guaW5zdHJ1bWVudCA9IG5ldyBJbnN0cnVtZW50KCk7XG4gICAgICBpZiAoZGVmLmdlbmVyYXRvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRpbmcgY2hhbm5lbCBnZW5lcmF0b3JcIiwgZGVmLmdlbmVyYXRvcik7XG4gICAgICAgIGNoLmluc3RydW1lbnQubG9hZEZyb21EZWZpbml0aW9uKGRlZi5nZW5lcmF0b3IpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coXCJOZXcgY2hhbm5lbFwiLCBkZWYpO1xuICAgIH1cbiAgICB0aGlzLmFwaS5yZXF1ZXN0U2VxdWVuY2VyRGVmKCk7XG4gICAgdGhpcy5vcGVuVGltZWxpbmVFZGl0b3IoKTtcbiAgfVxuICBcbiAgaW5pdGlhbGlzZVNlcXVlbmNlVHJhY2tzKHNlcXVlbmNlcykge1xuICAgIHZhciBjaGFubmVsU2VxdWVuY2VzID0ge307XG4gICAgZm9yICh2YXIgY2ggb2YgdGhpcy5jaGFubmVscykge1xuICAgICAgY2hhbm5lbFNlcXVlbmNlc1tjaC5jaGFubmVsTnJdID0gW107XG4gICAgfVxuICAgIGZvciAodmFyIHNlcSBvZiBzZXF1ZW5jZXMpIHtcbiAgICAgIHZhciBkZWZzID0gdGhpcy5zZXF1ZW5jZURlZkJ5Q2hhbm5lbChzZXEpO1xuICAgICAgZm9yICh2YXIgY2ggb2YgdGhpcy5jaGFubmVscykge1xuICAgICAgICBmb3IgKHZhciBzIG9mIGRlZnNbY2guY2hhbm5lbE5yXSkge1xuICAgICAgICAgIGNoYW5uZWxTZXF1ZW5jZXNbY2guY2hhbm5lbE5yXS5wdXNoKHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGNoYW5uZWxTZXF1ZW5jZXMpO1xuICAgIGZvciAodmFyIGNoIG9mIHRoaXMuY2hhbm5lbHMpIHtcbiAgICAgIGNoLmluaXRpYWxpc2VTZXF1ZW5jZVRyYWNrcyhjaGFubmVsU2VxdWVuY2VzW2NoLmNoYW5uZWxOcl0pO1xuICAgIH1cbiAgICB0aGlzLm9wZW5UaW1lbGluZUVkaXRvcigpO1xuICAgIHRoaXMudXBsb2FkU2VxdWVuY2VyRGVmKCk7XG4gIH1cblxuICBjb21waWxlKCkge1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICBcImJwbVwiOiAxMjAsXG4gICAgICBcImdyYW51bGFyaXR5XCI6IDY0LFxuICAgICAgXCJjaGFubmVsc1wiOiBbXSxcbiAgICAgIFwic2VxdWVuY2VzXCI6IFtdLFxuICAgIH07XG4gICAgZm9yICh2YXIgY2ggb2YgdGhpcy5jaGFubmVscykge1xuICAgICAgdmFyIGNoYW5uZWxSZXN1bHQgPSBjaC5jb21waWxlKCk7XG4gICAgICBpZiAoY2hhbm5lbFJlc3VsdC5jaGFubmVsKSB7XG4gICAgICAgIHJlc3VsdC5jaGFubmVscy5wdXNoKGNoYW5uZWxSZXN1bHQuY2hhbm5lbCk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBzIG9mIGNoYW5uZWxSZXN1bHQuc2VxdWVuY2VzKSB7XG4gICAgICAgIHJlc3VsdC5zZXF1ZW5jZXMucHVzaChzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdXBsb2FkU2VxdWVuY2VyRGVmKCkge1xuICAgIHRoaXMuYXBpLnNldFNlcXVlbmNlckRlZih0aGlzLmNvbXBpbGUoKSk7XG4gIH1cblxuICBzZXF1ZW5jZURlZkJ5Q2hhbm5lbChzZXEpIHtcbiAgICB2YXIgY2hhbm5lbFNlcXVlbmNlcyA9IHt9O1xuICAgIGZvciAodmFyIGNoIG9mIHRoaXMuY2hhbm5lbHMpIHtcbiAgICAgIGNoYW5uZWxTZXF1ZW5jZXNbY2guY2hhbm5lbE5yXSA9IFtdO1xuICAgIH1cbiAgICB2YXIgbGVhdmVzID0gW1wicGxheV9ub3RlXCIsIFwicGxheV9ub3Rlc1wiLCBcInZvbHVtZVwiLFxuICAgICAgICAgICAgICAgICAgXCJscGZfY3V0b2ZmXCIsIFwiaHBmX2N1dG9mZlwiLCBcInBhbm5pbmdcIl07XG4gICAgZm9yICh2YXIgbGVhZiBvZiBsZWF2ZXMpIHtcbiAgICAgIGlmIChzZXFbbGVhZl0pIHtcbiAgICAgICAgdmFyIHMgPSBzZXFbbGVhZl07XG4gICAgICAgIGlmIChjaGFubmVsU2VxdWVuY2VzW3MuY2hhbm5lbF0pIHtcbiAgICAgICAgICBjaGFubmVsU2VxdWVuY2VzW3MuY2hhbm5lbF0ucHVzaChzZXEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWlzc2luZyBjaGFubmVsXCIsIHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGFubmVsU2VxdWVuY2VzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciB3cmFwcGVkU2VxdWVuY2VzID0gW1wicmVwZWF0XCIsIFwiYWZ0ZXJcIiwgXCJiZWZvcmVcIiwgXCJldWNsaWRpYW5cIiwgXCJvZmZzZXRcIl07XG4gICAgZm9yICh2YXIgd3JhcHBlZCBvZiB3cmFwcGVkU2VxdWVuY2VzKSB7XG4gICAgICBpZiAoc2VxW3dyYXBwZWRdKSB7XG4gICAgICAgIGlmICghc2VxW3dyYXBwZWRdLnNlcXVlbmNlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJNaXNzaW5nIHNlcXVlbmNlXCIsIHNlcSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoID0gdGhpcy5zZXF1ZW5jZURlZkJ5Q2hhbm5lbChzZXFbd3JhcHBlZF0uc2VxdWVuY2UpXG4gICAgICAgIGZvciAodmFyIGNoYW5uZWxOciBvZiBPYmplY3Qua2V5cyhjaCkpIHtcbiAgICAgICAgICB2YXIgc2VxcyA9IGNoW2NoYW5uZWxOcl07XG4gICAgICAgICAgaWYgKHNlcXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gXG4gICAgICAgICAgZm9yICh2YXIgZGVmU2VxIG9mIHNlcXMpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhzZXEpKSB7XG4gICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gc2VxW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQuc2VxdWVuY2UgPSBkZWZTZXE7XG4gICAgICAgICAgICBjaGFubmVsU2VxdWVuY2VzW2NoYW5uZWxOcl0ucHVzaChyZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhbm5lbFNlcXVlbmNlcztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlcS5jb21iaW5lKSB7XG4gICAgICBmb3IgKHZhciBzZXEgb2Ygc2VxLmNvbWJpbmUpIHtcbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLnNlcXVlbmNlRGVmQnlDaGFubmVsKHNlcSk7XG4gICAgICAgIGZvciAodmFyIGNoIG9mIHRoaXMuY2hhbm5lbHMpIHtcbiAgICAgICAgICBmb3IgKHZhciBzIG9mIGRlZnNbY2guY2hhbm5lbE5yXSkge1xuICAgICAgICAgICAgY2hhbm5lbFNlcXVlbmNlc1tjaC5jaGFubmVsTnJdLnB1c2gocyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwidW5rbm93biBkZWZcIiwgc2VxKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoYW5uZWxTZXF1ZW5jZXM7XG4gIH1cblxuICBsb2FkKGRhdGEpIHtcbiAgICB0aGlzLmNoYW5uZWxzID0gW107XG4gICAgZm9yICh2YXIgY2ggb2YgZGF0YS5jaGFubmVscykge1xuICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgQ2hhbm5lbChjaC5jaGFubmVsX25yLCB0aGlzLm9wZW5JbnN0cnVtZW50RWRpdG9yLmJpbmQodGhpcykpO1xuICAgICAgY2hhbm5lbC5uYW1lID0gY2gubmFtZTtcbiAgICAgIGNoYW5uZWwuc2VxdWVuY2VfdHJhY2tzID0gY2guc2VxdWVuY2VfdHJhY2tzO1xuICAgICAgaWYgKGNoLmluc3RydW1lbnQpIHtcbiAgICAgICAgY2hhbm5lbC5pbnN0cnVtZW50ID0gbmV3IEluc3RydW1lbnQoKTtcbiAgICAgICAgY2hhbm5lbC5pbnN0cnVtZW50LmxvYWQoY2guaW5zdHJ1bWVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5uZWxzLnB1c2goY2hhbm5lbCk7XG4gICAgfVxuICB9XG5cbiAgb3Blbkluc3RydW1lbnRFZGl0b3IoaW5zdHIpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IG5ldyBJbnN0cnVtZW50RWRpdG9yKHRoaXMsIGluc3RyLCB0aGlzLm9wZW5UaW1lbGluZUVkaXRvci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmRyYXcoKVxuICB9XG4gIG9wZW5UaW1lbGluZUVkaXRvcigpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IG5ldyBUaW1lbGluZUVkaXRvcih0aGlzLmNoYW5uZWxzKTtcbiAgICB0aGlzLmRyYXcoKTtcbiAgfVxuICBvcGVuU2VxdWVuY2VFZGl0b3Ioc2VxdWVuY2UsIGNoYW5uZWxOcikge1xuICAgIHRoaXMuYWN0aXZlID0gbmV3IFNlcXVlbmNlRWRpdG9yKHRoaXMsIHNlcXVlbmNlLCBjaGFubmVsTnIsIHRoaXMub3BlblRpbWVsaW5lRWRpdG9yLmJpbmQodGhpcykpXG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICBoYW5kbGVNb3VzZURvd24oZSkge1xuICAgIHZhciBib3VuZCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgdmFyIHggPSBlLmNsaWVudFggLSBib3VuZC5sZWZ0OyBcbiAgICB2YXIgeSA9IGUuY2xpZW50WSAtIGJvdW5kLnRvcDtcbiAgICB0aGlzLnNlbGVjdGVkRWxlbSA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3RlZFBvcyA9IHt9O1xuICAgIGlmICh0aGlzLmFjdGl2ZS5oYW5kbGVNb3VzZURvd24pIHtcbiAgICAgIHZhciBlbGVtID0gdGhpcy5hY3RpdmUuaGFuZGxlTW91c2VEb3duKHRoaXMsIHgsIHkpO1xuICAgICAgaWYgKGVsZW0pIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEVsZW0gPSBlbGVtO1xuICAgICAgICB0aGlzLnN0YXJ0U2VsZWN0ZWRQb3MgPSB7eCwgeX07XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQb3MgPSB7eCwgeX07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTW91c2VVcChlKSB7XG4gICAgdmFyIGJvdW5kID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB2YXIgeCA9IGUuY2xpZW50WCAtIGJvdW5kLmxlZnQ7IFxuICAgIHZhciB5ID0gZS5jbGllbnRZIC0gYm91bmQudG9wO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkRWxlbSkge1xuICAgICAgdmFyIGVsZW0gPSB0aGlzLnNlbGVjdGVkRWxlbTtcbiAgICAgIHZhciBzeCA9IHRoaXMuc3RhcnRTZWxlY3RlZFBvcy54O1xuICAgICAgdmFyIHN5ID0gdGhpcy5zdGFydFNlbGVjdGVkUG9zLnk7XG4gICAgICBpZiAoc3ggPj0geCAtNSAmJiBzeCA8PSB4ICsgNSAmJiBzeSA+PSB5IC0gNSAmJiBzeSA8PSB5ICsgNSkge1xuICAgICAgICBpZiAoZWxlbS5oYW5kbGVDbGljaykge1xuICAgICAgICAgIGVsZW0uaGFuZGxlQ2xpY2sodGhpcywgeCwgeSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbGVtLmhhbmRsZURyb3ApIHtcbiAgICAgICAgICBlbGVtLmhhbmRsZURyb3AodGhpcywgeCwgeSk7XG4gICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuc2VsZWN0ZWRFbGVtID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVNb3VzZU1vdmUoZSkge1xuICAgIHZhciBib3VuZCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgdmFyIHggPSBlLmNsaWVudFggLSBib3VuZC5sZWZ0OyBcbiAgICB2YXIgeSA9IGUuY2xpZW50WSAtIGJvdW5kLnRvcDtcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVsZW0pIHtcbiAgICAgIHZhciBlbGVtID0gdGhpcy5zZWxlY3RlZEVsZW07XG4gICAgICB2YXIgc3ggPSB0aGlzLnNlbGVjdGVkUG9zLng7XG4gICAgICB2YXIgc3kgPSB0aGlzLnNlbGVjdGVkUG9zLnk7XG4gICAgICBpZiAoc3ggPj0geCAtNSAmJiBzeCA8PSB4ICsgNSAmJiBzeSA+PSB5IC0gNSAmJiBzeSA8PSB5ICsgNSkge1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsZW0uaGFuZGxlRHJhZykge1xuICAgICAgICAgIGVsZW0uaGFuZGxlRHJhZyh0aGlzLCB4IC0gc3gsIHkgLSBzeSwgeCwgeSwgc3gsIHN5KTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkUG9zID0ge3gsIHl9O1xuICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhdygpIHtcbiAgICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB2YXIgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIHZhciBib3VuZCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB3aW5kb3dXaWR0aDtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3dIZWlnaHQgLSBib3VuZC50b3A7XG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZCA9IHRoaXMudGhlbWUuY29sb3Vycy5CYWNrZ3JvdW5kO1xuICAgIGJvZHkuc3R5bGUuY29sb3IgPSB0aGlzLnRoZW1lLmNvbG91cnMuRm9yZWdyb3VuZDtcbiAgICB0aGlzLmFjdGl2ZS5kcmF3KHRoaXMpO1xuICB9XG59XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIHRyeSB7IFxuICBuZXcgQmxlZXAoKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gICAgYWxlcnQoZSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBBVURJT19UWVBFID0gMTtcbmV4cG9ydCBjb25zdCBGUkVRVUVOQ1lfVFlQRSA9IDI7XG5leHBvcnQgY29uc3QgUEFOTklOR19UWVBFID0gMztcbmV4cG9ydCBjb25zdCBDTE9DS19UWVBFID0gNDtcbmV4cG9ydCBjb25zdCBUUklHR0VSX1RZUEUgPSA1O1xuZXhwb3J0IGNvbnN0IElOVF9UWVBFID0gNjtcbmV4cG9ydCB7IFBhdGNoYWJsZSB9IGZyb20gJy4vcGF0Y2hhYmxlLmpzJztcbiIsImltcG9ydCB7IFBhdGNoIH0gZnJvbSAnLi4vY29tcG9uZW50cy8nO1xuXG5leHBvcnQgY2xhc3MgUGF0Y2hhYmxlIHtcbiAgY29uc3RydWN0b3IobW9kdWxlcywgcGF0Y2hlcykge1xuICAgIHRoaXMubW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgdGhpcy5wYXRjaGVzID0gcGF0Y2hlcztcbiAgfVxuICBhZGRQYXRjaChmcm9tTW9kLCB0b01vZCwgZnJvbVNvY2tldCwgdG9Tb2NrZXQpIHtcbiAgICB2YXIgZnJvbSA9IG51bGw7XG4gICAgdmFyIHRvID0gbnVsbDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG0gPSB0aGlzLm1vZHVsZXNbaV07XG4gICAgICBpZiAobSA9PT0gZnJvbU1vZCkge1xuICAgICAgICBmcm9tID0gaTtcbiAgICAgIH1cbiAgICAgIGlmIChtID09PSB0b01vZCkge1xuICAgICAgICB0byA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmcm9tID09PSBudWxsIHx8IHRvID09PSBudWxsIHx8IChmcm9tID09PSB0byAmJiBmcm9tU29ja2V0ID09PSB0b1NvY2tldCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy5tb2R1bGVzW2Zyb21dLnVuaXQuc29ja2V0c1tmcm9tU29ja2V0XS50eXBlICE9IHRoaXMubW9kdWxlc1t0b10udW5pdC5zb2NrZXRzW3RvU29ja2V0XS50eXBlKSB7XG4gICAgICBhbGVydChcIldyb25nIHR5cGVzXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcGF0Y2ggPSBuZXcgUGF0Y2goZnJvbSwgdG8sIGZyb21Tb2NrZXQsIHRvU29ja2V0LCB0aGlzLm1vZHVsZXNbZnJvbV0udW5pdC5zb2NrZXRzW2Zyb21Tb2NrZXRdLnR5cGUpO1xuICAgIHZhciByZW1vdmUgPSBudWxsO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcCA9IHRoaXMucGF0Y2hlc1tpXTtcbiAgICAgIGlmIChwLmlzSXNvbW9ycGhpYyhwYXRjaCkpIHtcbiAgICAgICAgcmVtb3ZlID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyZW1vdmUgPT09IG51bGwpIHtcbiAgICAgIHRoaXMucGF0Y2hlcy5wdXNoKHBhdGNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXRjaGVzLnNwbGljZShyZW1vdmUsIDEpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJcbmltcG9ydCB7IEVkaXRvciwgQnV0dG9uLCBNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBTZXF1ZW5jZSB9IGZyb20gJy4vc2VxdWVuY2UuanMnO1xuaW1wb3J0IHsgU2VxdWVuY2VJbnB1dCwgU2VxdWVuY2VPdXRwdXQsIFB1bHNlLCBQbGF5Tm90ZSwgUmFuZ2UgfSBmcm9tICcuL21vZHVsZV91bml0cy8nO1xuXG5leHBvcnQgY2xhc3MgU2VxdWVuY2VFZGl0b3IgZXh0ZW5kcyBFZGl0b3Ige1xuICBjb25zdHJ1Y3RvcihhcHAsIHNlcXVlbmNlLCBjaGFubmVsTnIsIGhhbmRsZUNsb3NlKSB7XG4gICAgc3VwZXIoYXBwLCBzZXF1ZW5jZSwgaGFuZGxlQ2xvc2UpO1xuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIGlmICghc2VxdWVuY2UpIHtcbiAgICAgIHNlcXVlbmNlID0gbmV3IFNlcXVlbmNlKFtdLCBbXSwgY2hhbm5lbE5yKTtcbiAgICAgIHZhciBtb2R1bGVzID0gW1xuICAgICAgICBuZXcgTW9kdWxlKHNlcXVlbmNlLCAzMCwgNTAsIG5ldyBTZXF1ZW5jZUlucHV0KCdpbnB1dCcpKSwgXG4gICAgICBdO1xuICAgICAgc2VxdWVuY2UubW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgfVxuICAgIHRoaXMudGFyZ2V0ID0gc2VxdWVuY2U7XG4gICAgdmFyIGJ1dHRvbkRlZnMgPSBbXG4gICAgICAgIHtsYWJlbDogXCLwnYWdXCIsIGNvbG91cjogJ01vZHVsZVB1bHNlJywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBQdWxzZSg0KSl9LFxuICAgICAgICB7bGFiZWw6IFwi8J2FnlwiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUHVsc2UoMikpfSxcbiAgICAgICAge2xhYmVsOiBcIuKZqVwiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUHVsc2UoMSkpfSxcbiAgICAgICAge2xhYmVsOiBcIuKZqlwiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUHVsc2UoMC41KSl9LFxuICAgICAgICB7bGFiZWw6IFwi8J2FoVwiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUHVsc2UoMC4yNSkpfSxcbiAgICAgICAge2xhYmVsOiBcIvCdhaJcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDAuMTI1KSl9LFxuICAgICAgICB7bGFiZWw6IFwiUFVMU1wiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUHVsc2UoKSl9LFxuICAgICAgICB7bGFiZWw6IFwiRVVDTFwiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJOT1RFXCIsIGNvbG91cjogJ01vZHVsZU91dHB1dCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUGxheU5vdGUoKSl9LFxuICAgICAgICB7bGFiZWw6IFwiUEFOXCIsIGNvbG91cjogJ01vZHVsZU91dHB1dCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJSRVZcIiwgY29sb3VyOiAnTW9kdWxlT3V0cHV0Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzaW5lXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIkxQRlwiLCBjb2xvdXI6ICdNb2R1bGVPdXRwdXQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiSFBGXCIsIGNvbG91cjogJ01vZHVsZU91dHB1dCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG5cbiAgICAgICAge2xhYmVsOiBcIlNXRUVQXCIsIGNvbG91cjogJ01vZHVsZUludCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUmFuZ2UoXCJzd2VlcFwiKSl9LFxuICAgICAgICB7bGFiZWw6IFwiQ1lDTEVcIiwgY29sb3VyOiAnTW9kdWxlSW50Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzaW5lXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlJBTkdFXCIsIGNvbG91cjogJ01vZHVsZUludCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUmFuZ2UoXCJyYW5nZVwiKSl9LFxuICAgICAgICB7bGFiZWw6IFwiRkFERVwiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFJhbmdlKFwiZmFkZSBpblwiKSl9LFxuICAgICAgICB7bGFiZWw6IFwiUkFORFwiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiUkVHXCIsIGNvbG91cjogJ01vZHVsZUludCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJUUkFOU1wiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgIF1cblxuICAgIHZhciB4ID0gMDtcbiAgICB2YXIgcHJldiA9IG51bGw7XG4gICAgdmFyIHBhZGRpbmcgPSAwO1xuICAgIHZhciBncm91cFBhZGRpbmcgPSAxNTtcbiAgICBmb3IgKHZhciBkZWYgb2YgYnV0dG9uRGVmcykge1xuICAgICAgdmFyIGIgPSBuZXcgQnV0dG9uKHgsIGFwcC50aGVtZS5wYWRkaW5nLCBkZWYub25jbGljay5iaW5kKHRoaXMpLCBkZWYubGFiZWwpO1xuICAgICAgYi5jb2xvdXIgPSBhcHAudGhlbWUuY29sb3Vyc1tkZWYuY29sb3VyXSB8fCBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVHZW5lcmF0b3I7XG4gICAgICB0aGlzLmJ1dHRvbnMucHVzaChiKTtcbiAgICAgIGlmIChwcmV2ICYmIHByZXYuY29sb3VyICE9IGRlZi5jb2xvdXIpIHtcbiAgICAgICAgeCArPSBncm91cFBhZGRpbmc7XG4gICAgICAgIGIueCArPSBncm91cFBhZGRpbmc7XG4gICAgICB9XG4gICAgICB4ICs9IGIudyArIHBhZGRpbmc7XG4gICAgICBwcmV2ID0gZGVmO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IHsgUHVsc2UgfSBmcm9tICcuL3B1bHNlLmpzJztcbmV4cG9ydCB7IFBsYXlOb3RlIH0gZnJvbSAnLi9wbGF5X25vdGUuanMnO1xuZXhwb3J0IHsgU2VxdWVuY2VJbnB1dCB9IGZyb20gJy4vc2VxdWVuY2VfaW5wdXQuanMnO1xuZXhwb3J0IHsgUmFuZ2UgfSBmcm9tICcuL3JhbmdlLmpzJztcbiIsImltcG9ydCB7IE1vZHVsZVVuaXQsIElucHV0U29ja2V0LCBEaWFsIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgVFJJR0dFUl9UWVBFLCBJTlRfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBQbGF5Tm90ZSBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcInBsYXlfbm90ZVwiKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIlRSSUdcIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJUUklHXCIsIFRSSUdHRVJfVFlQRSksXG4gICAgICBcIk5PVEVcIjogbmV3IElucHV0U29ja2V0KDc5LCB0aGlzLmggLSAyOSwgXCJOT1RFXCIsIElOVF9UWVBFKSxcbiAgICAgIFwiVkVMXCI6IG5ldyBJbnB1dFNvY2tldCgxMjksIHRoaXMuaCAtIDI5LCBcIlZFTFwiLCBJTlRfVFlQRSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgICBcIm5vdGVcIjogbmV3IERpYWwoMjksIDU5LCBcIk5PVEVcIiwgMC4wLCAxMjguMCwgMS4wKSxcbiAgICAgIFwidmVsb2NpdHlcIjogbmV3IERpYWwoNzksIDU5LCBcIlZFTFwiLCAwLjAsIDEwLjAsIDEuMCksXG4gICAgICBcImR1cmF0aW9uXCI6IG5ldyBEaWFsKDEyOSwgNTksIFwiRFVSXCIsIDAuMCwgMTAuMCwgMS4wKSxcbiAgICB9XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZU91dHB1dCc7XG4gIH1cblxuICBjb21waWxlKGNvbm5lY3Rpb25zKSB7XG4gICAgdmFyIGcgPSB7XCJwbGF5X25vdGVcIjoge1xuICAgICAgXCJkdXJhdGlvblwiOiB0aGlzLmRpYWxzW1wiZHVyYXRpb25cIl0udmFsdWUsXG4gICAgICBcImNoYW5uZWxcIjogdGhpcy5jaGFubmVsTnIsXG4gICAgfX07XG4gICAgdmFyIG9uID0gY29ubmVjdGlvbnNbXCJOT1RFXCJdO1xuICAgIGlmIChvbi5sZW5ndGggPT09IDApIHtcbiAgICAgIGdbXCJwbGF5X25vdGVcIl1bXCJub3RlXCJdID0gdGhpcy5kaWFsc1tcIm5vdGVcIl0udmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdbXCJwbGF5X25vdGVcIl1bXCJhdXRvX25vdGVcIl0gPSBvblswXTtcbiAgICB9XG4gICAgdmFyIG9uID0gY29ubmVjdGlvbnNbXCJWRUxcIl07XG4gICAgaWYgKG9uLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZ1tcInBsYXlfbm90ZVwiXVtcInZlbG9jaXR5XCJdID0gdGhpcy5kaWFsc1tcInZlbG9jaXR5XCJdLnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBnW1wicGxheV9ub3RlXCJdW1wiYXV0b192ZWxvY2l0eVwiXSA9IG9uWzBdO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSBbXVxuICAgIHZhciBvbiA9IGNvbm5lY3Rpb25zW1wiVFJJR1wiXTtcbiAgICBmb3IgKHZhciBvIG9mIG9uKSB7XG4gICAgICByZXN1bHQucHVzaChvKGcpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IFRSSUdHRVJfVFlQRSwgQ0xPQ0tfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBQdWxzZSBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3RvcihldmVyeSkge1xuICAgIHN1cGVyKFwicHVsc2VcIik7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJDTE9DS1wiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIkNMT0NLXCIsIENMT0NLX1RZUEUpLFxuICAgICAgXCJUUklHXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIlRSSUdcIiwgVFJJR0dFUl9UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscyA9IHtcbiAgICAgIFwiZXZlcnlcIjogbmV3IERpYWwoMjksIDU5LCBcIkVWRVJZXCIsIDAuMCwgMTAuMCwgMS4wKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscy5ldmVyeS52YWx1ZSA9IGV2ZXJ5IHx8IDE7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZVB1bHNlJztcbiAgfVxuXG4gIGNvbXBpbGUoY29ubmVjdGlvbnMpIHtcbiAgICB2YXIgZSA9IHtcImV2ZXJ5XCI6IHRoaXMuZGlhbHNbXCJldmVyeVwiXS52YWx1ZX07XG4gICAgcmV0dXJuICgoZSkgPT4gKCh0KSA9PiB7XG4gICAgICBmb3IgKHZhciBvIG9mIE9iamVjdC5rZXlzKHQpKSB7XG4gICAgICAgIGVbb10gPSB0W29dO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdCA9IHtcInJlcGVhdFwiOiBlfTtcbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9KSkoZSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgT3V0cHV0U29ja2V0LCBEaWFsIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgSU5UX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgUmFuZ2UgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiT1VUXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIk9VVFwiLCBJTlRfVFlQRSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgICBcImZyb21cIjogbmV3IERpYWwoMjksIDU5LCBcIkZST01cIiwgMC4wLCAxMjcuMCwgMC4wKSxcbiAgICAgIFwidG9cIjogbmV3IERpYWwoNzksIDU5LCBcIlRPXCIsIDAuMCwgMTI3LjAsIDEyNy4wKSxcbiAgICAgIFwic3RlcFwiOiBuZXcgRGlhbCgxMjksIDU5LCBcIlNURVBcIiwgMC4wLCAxMjguMCwgMS4wKSxcbiAgICB9XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZUludCc7XG4gIH1cblxuICBjb21waWxlKGNvbm5lY3Rpb25zKSB7XG4gICAgdmFyIGcgPSB7fTtcbiAgICBnW3RoaXMudHlwZV0gPSB7XG4gICAgICBcImZyb21cIjogdGhpcy5kaWFscy5mcm9tLnZhbHVlLFxuICAgICAgXCJ0b1wiOiB0aGlzLmRpYWxzLnRvLnZhbHVlLFxuICAgICAgXCJzdGVwXCI6IHRoaXMuZGlhbHMuc3RlcC52YWx1ZSxcbiAgICB9O1xuICAgIHJldHVybiBnO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGVVbml0LCBPdXRwdXRTb2NrZXQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBDTE9DS19UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlSW5wdXQgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiQ0xPQ0tcIjogbmV3IE91dHB1dFNvY2tldCh0aGlzLncgLSAyOSwgdGhpcy5oIC0gMjksIFwiQ0xPQ0tcIiwgQ0xPQ0tfVFlQRSksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVPdXRwdXQnO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQYXRjaGFibGUgfSBmcm9tICcuLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgU2VxdWVuY2UgZXh0ZW5kcyBQYXRjaGFibGUge1xuICBjb25zdHJ1Y3Rvcihtb2R1bGVzLCBwYXRjaGVzLCBjaGFubmVsTnIpIHtcbiAgICBzdXBlcihtb2R1bGVzLCBwYXRjaGVzKTtcbiAgICB0aGlzLmNoYW5uZWxOciA9IGNoYW5uZWxOciB8fCAxO1xuICB9XG4gIGNvbXBpbGUoKSB7XG4gICAgdmFyIHF1ZXVlID0gW107XG4gICAgdmFyIHNlZW4gPSB7fTtcbiAgICB2YXIgZGVwZW5kZW5jaWVzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG0gPSB0aGlzLm1vZHVsZXNbaV07XG4gICAgICBpZiAobS51bml0LnR5cGUgPT0gXCJwbGF5X25vdGVcIikge1xuICAgICAgICBxdWV1ZS5wdXNoKGkpO1xuICAgICAgfVxuICAgIH1cbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHEgPSBxdWV1ZVswXTtcbiAgICAgIHZhciBxdWV1ZSA9IHF1ZXVlLnNwbGljZSgxKTtcbiAgICAgIGlmIChzZWVuW3FdKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBkZXBlbmRlbmNpZXMucHVzaChxKTtcbiAgICAgIGZvciAodmFyIHAgb2YgdGhpcy5wYXRjaGVzKSB7XG4gICAgICAgIHZhciBtb2RTb2NrZXRzID0gdGhpcy5tb2R1bGVzW3FdLnVuaXQuc29ja2V0cztcbiAgICAgICAgaWYgKHAudG8gPT09IHEgJiYgbW9kU29ja2V0c1twLnRvU29ja2V0XS5pc0lucHV0KSB7XG4gICAgICAgICAgaWYgKCFzZWVuW3AuZnJvbV0pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2gocC5mcm9tKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocC5mcm9tID09PSBxICYmIG1vZFNvY2tldHNbcC5mcm9tU29ja2V0XS5pc0lucHV0KSB7XG4gICAgICAgICAgaWYgKCFzZWVuW3AuZnJvbV0pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2gocC50byk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZWVuW3FdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIHNlcXVlbmNlcyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSBkZXBlbmRlbmNpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBpeCA9IGRlcGVuZGVuY2llc1tpXTtcbiAgICAgIHZhciB1bml0ID0gdGhpcy5tb2R1bGVzW2l4XS51bml0O1xuXG4gICAgICB2YXIgY29ubmVjdGlvbnMgPSB7fTtcbiAgICAgIGZvciAodmFyIHNvY2tldElkIG9mIE9iamVjdC5rZXlzKHVuaXQuc29ja2V0cykpIHtcbiAgICAgICAgaWYgKHVuaXQuc29ja2V0c1tzb2NrZXRJZF0uaXNJbnB1dCkge1xuICAgICAgICAgIGNvbm5lY3Rpb25zW3NvY2tldElkXSA9IHRoaXMuZ2V0Q29ubmVjdGVkU2VxdWVuY2VzKHNlcXVlbmNlcywgaXgsIHNvY2tldElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHVuaXQudHlwZSA9PSBcInBsYXlfbm90ZVwiKSB7XG4gICAgICAgIGZvciAodmFyIG8gb2YgdW5pdC5jb21waWxlKGNvbm5lY3Rpb25zKSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKG8pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZyA9IHVuaXQuY29tcGlsZShjb25uZWN0aW9ucyk7XG4gICAgICAgIHNlcXVlbmNlc1tpeF0gPSBnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGdldENvbm5lY3RlZFNlcXVlbmNlcyhzZXF1ZW5jZXMsIGl4LCBpbnB1dCkge1xuICAgIHZhciBncyA9IFtdO1xuICAgIGZvciAodmFyIHAgb2YgdGhpcy5wYXRjaGVzKSB7XG4gICAgICBpZiAocC5kb2VzUGF0Y2hDb25uZWN0VG8oaXgsIGlucHV0KSkge1xuICAgICAgICBncy5wdXNoKHNlcXVlbmNlc1twLmNvbm5lY3RzVG8oaXgsIGlucHV0KS5tb2R1bGVdKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZ3M7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFVRElPX1RZUEUsIEZSRVFVRU5DWV9UWVBFLCBQQU5OSU5HX1RZUEUsIENMT0NLX1RZUEUsIFRSSUdHRVJfVFlQRSwgSU5UX1RZUEUgfSBmcm9tICcuL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBUaGVtZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucGFkZGluZyA9IDA7XG4gICAgdmFyIHNvY2tldENvbG91cnMgPSB7fTtcbiAgICB2YXIgcGF0Y2hDb2xvdXJzID0ge31cbiAgICBzb2NrZXRDb2xvdXJzW0FVRElPX1RZUEVdID0gJ3JnYigxNDAsIDI1NSwgMjU1KSc7XG4gICAgc29ja2V0Q29sb3Vyc1tGUkVRVUVOQ1lfVFlQRV0gPSAncmdiKDI1NSwgMjU1LCAxNDApJztcbiAgICBzb2NrZXRDb2xvdXJzW1BBTk5JTkdfVFlQRV0gPSAncmdiKDI1NSwgMTQwLCAyNTUpJztcbiAgICBzb2NrZXRDb2xvdXJzW0NMT0NLX1RZUEVdID0gJ3JnYigxMDAsIDEwMCwgMjU1KSc7XG4gICAgc29ja2V0Q29sb3Vyc1tUUklHR0VSX1RZUEVdID0gJ3JnYig1MCwgNTAsIDUwKSc7XG4gICAgc29ja2V0Q29sb3Vyc1tJTlRfVFlQRV0gPSAncmdiKDI1NSwgMjU1LCA0MCknO1xuICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhzb2NrZXRDb2xvdXJzKSkge1xuICAgICAgcGF0Y2hDb2xvdXJzW2tleV0gPSBSR0JfTGluZWFyX1NoYWRlKDAuMSwgc29ja2V0Q29sb3Vyc1trZXldKTtcbiAgICB9XG4gICAgdGhpcy5jb2xvdXJzID0ge1xuICAgICAgT3V0bGluZUNvbG91cjogJyMzMzMnLFxuICAgICAgQmFja2dyb3VuZDogJyM0NDQnLFxuICAgICAgRm9yZWdyb3VuZDogJyNlZWUnLFxuICAgICAgSW5zdHJ1bWVudEVkaXRvckJhY2tncm91bmQ6ICcjZWVlJyxcblxuICAgICAgU29ja2V0QmFja2dyb3VuZDogJyM5ZmYnLFxuICAgICAgU29ja2V0SW5zaWRlOiAnIzk5OScsXG4gICAgICBTb2NrZXRPdXRsaW5lOiAnIzc3NycsXG5cbiAgICAgIFBhdGNoOiAnIzdmZicsXG5cbiAgICAgIE1vZHVsZU91dGxpbmU6ICcjNzc3JyxcbiAgICAgIE1vZHVsZVRleHQ6ICcjNDQ0JyxcbiAgICAgIE1vZHVsZUdlbmVyYXRvcjogJyNmZmYnLFxuICAgICAgTW9kdWxlRmlsdGVyOiAnI2ZmZCcsXG4gICAgICBNb2R1bGVEZXJpdmVkOiAnI2RkZicsXG4gICAgICBNb2R1bGVPdXRwdXQ6ICcjZGZkJyxcbiAgICAgIE1vZHVsZUludDogJyNmZjknLFxuICAgICAgTW9kdWxlUHVsc2U6ICcjZGRmJyxcblxuICAgICAgQnV0dG9uOiAnI2NjYycsXG4gICAgICBCdXR0b25UZXh0OiAnIzMzMycsXG5cbiAgICAgIERpYWw6ICcjY2NjJyxcbiAgICAgIERpYWxMaW5lOiAnIzQ0NCcsXG5cbiAgICAgIFNvY2tldHM6IHNvY2tldENvbG91cnMsXG4gICAgICBQYXRjaGVzOiBwYXRjaENvbG91cnMsXG4gICAgfTtcbiAgfVxufVxuXG5jb25zdCBSR0JfTGluZWFyX1NoYWRlPShwLGMpPT57XG4gICAgdmFyIGk9cGFyc2VJbnQscj1NYXRoLnJvdW5kLFthLGIsYyxkXT1jLnNwbGl0KFwiLFwiKSxQPXA8MCx0PVA/MDoyNTUqcCxQPVA/MStwOjEtcDtcbiAgICByZXR1cm5cInJnYlwiKyhkP1wiYShcIjpcIihcIikrcihpKGFbM109PVwiYVwiP2Euc2xpY2UoNSk6YS5zbGljZSg0KSkqUCt0KStcIixcIityKGkoYikqUCt0KStcIixcIityKGkoYykqUCt0KSsoZD9cIixcIitkOlwiKVwiKTtcbn1cbiIsImltcG9ydCB7IFNlcXVlbmNlVHJhY2sgfSBmcm9tICcuL3NlcXVlbmNlX3RyYWNrLmpzJzsgXG5cbmV4cG9ydCBjbGFzcyBDaGFubmVsIHtcbiAgY29uc3RydWN0b3IoY2hhbm5lbE5yLCBvcGVuSW5zdHJ1bWVudEVkaXRvcikge1xuICAgIHRoaXMuY2hhbm5lbE5yID0gY2hhbm5lbE5yO1xuICAgIHRoaXMuaW5zdHJ1bWVudCA9IG51bGw7XG4gICAgdGhpcy5zZXF1ZW5jZVRyYWNrcyA9IFtuZXcgU2VxdWVuY2VUcmFjaygpXTtcbiAgICB0aGlzLm5hbWUgPSBcIlVudGl0bGVkIFwiICsgdGhpcy5jaGFubmVsTnI7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFubmVsTnI7IGkrKykge1xuICAgICAgdGhpcy5zZXF1ZW5jZVRyYWNrcy5wdXNoKG5ldyBTZXF1ZW5jZVRyYWNrKCkpO1xuICAgIH1cblxuICAgIHRoaXMuaGVpZ2h0ID0gNzU7XG4gICAgdGhpcy5tYXJnaW5Ub3AgPSAxMDtcbiAgICB0aGlzLm9mZnNldCA9ICB0aGlzLmNoYW5uZWxOciAqICh0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luVG9wKTtcbiAgICB0aGlzLnBhZGRpbmcgPSAxMDtcbiAgICB0aGlzLmNoYW5uZWxXaWR0aCA9IDkwO1xuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSAoKSA9PiBvcGVuSW5zdHJ1bWVudEVkaXRvcih0aGlzLmluc3RydW1lbnQpO1xuICAgIHRoaXMubG9hZEZyb21EZWZpbml0aW9uKHt9KTtcbiAgfVxuXG4gIGxvYWRGcm9tRGVmaW5pdGlvbihkZWYpIHtcbiAgICB0aGlzLmJhbmsgPSBkZWYuYmFuayB8fCBudWxsO1xuICAgIHRoaXMuYmFua0luZGV4ID0gZGVmLmluc3RydW1lbnQgfHwgbnVsbDtcbiAgICB0aGlzLnJldmVyYiA9IGRlZi5yZXZlcmIgfHwgMDtcbiAgICB0aGlzLnJldmVyYlRpbWUgPSBkZWYucmV2ZXJiX3RpbWUgfHwgMDtcbiAgICB0aGlzLnJldmVyYkZlZWRiYWNrID0gZGVmLnJldmVyYl9mZWVkYmFjayB8fCAwO1xuICAgIHRoaXMudHJlbWVsbyA9IGRlZi50cmVtZWxvIHx8IDA7XG4gICAgdGhpcy52b2x1bWUgPSBkZWYudm9sdW1lIHx8IDEwMDtcbiAgICB0aGlzLnBhbm5pbmcgPSBkZWYucGFubmluZyB8fCA2NDtcbiAgICB0aGlzLmxwZkN1dG9mZiA9IGRlZi5scGZfY3V0b2ZmIHx8IDA7XG4gICAgdGhpcy5ocGZDdXRvZmYgPSBkZWYuaHBmX2N1dG9mZiB8fCAwO1xuICAgIHRoaXMuZ3JhaW4gPSBkZWYuZ3JhaW4gfHwgbnVsbDtcblxuICB9XG5cbiAgY29tcGlsZSgpIHtcbiAgICB2YXIgY2hhbm5lbCA9IHtcbiAgICAgIFwiY2hhbm5lbFwiOiB0aGlzLmNoYW5uZWxOcixcbiAgICAgIFwiZ2VuZXJhdG9yXCI6IHRoaXMuaW5zdHJ1bWVudC5jb21waWxlKCksXG4gICAgICBcImJhbmtcIjogdGhpcy5iYW5rLFxuICAgICAgXCJpbnN0cnVtZW50XCI6IHRoaXMuYmFua0luZGV4LFxuICAgICAgXCJyZXZlcmJcIjogdGhpcy5yZXZlcmIsXG4gICAgICBcInJldmVyYl90aW1lXCI6IHRoaXMucmV2ZXJiVGltZSxcbiAgICAgIFwicmV2ZXJiX2ZlZWRiYWNrXCI6IHRoaXMucmV2ZXJiRmVlZGJhY2ssXG4gICAgICBcInRyZW1lbG9cIjogdGhpcy50cmVtZWxvLFxuICAgICAgXCJ2b2x1bWVcIjogdGhpcy52b2x1bWUsXG4gICAgICBcInBhbm5pbmdcIjogdGhpcy5wYW5uaW5nLFxuICAgICAgXCJscGZfY3V0b2ZmXCI6IHRoaXMubHBmQ3V0b2ZmLFxuICAgICAgXCJocGZfY3V0b2ZmXCI6IHRoaXMuaHBmQ3V0b2ZmLFxuICAgICAgXCJncmFpblwiOiB0aGlzLmdyYWluLFxuICAgIH07XG4gICAgdmFyIHNlcXVlbmNlcyA9IFtdO1xuICAgIGZvciAodmFyIHRyIG9mIHRoaXMuc2VxdWVuY2VUcmFja3MpIHtcbiAgICAgIHZhciB0clJlc3VsdCA9IHRyLmNvbXBpbGUoKTtcbiAgICAgIGlmICh0clJlc3VsdCkge1xuICAgICAgICBzZXF1ZW5jZXMucHVzaCh0clJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBcImNoYW5uZWxcIjogY2hhbm5lbCxcbiAgICAgIFwic2VxdWVuY2VzXCI6IHNlcXVlbmNlcyxcbiAgICB9O1xuICB9XG5cbiAgaW5pdGlhbGlzZVNlcXVlbmNlVHJhY2tzKHNlcXVlbmNlcykge1xuICAgIHRoaXMuc2VxdWVuY2VUcmFja3MgPSBbXTtcbiAgICBmb3IgKHZhciBzIG9mIHNlcXVlbmNlcykge1xuICAgICAgdmFyIHNlZ21lbnQgPSB7fTtcbiAgICAgIGlmIChzLmFmdGVyKSB7XG4gICAgICAgIHNlZ21lbnQuYWZ0ZXIgPSBzLmFmdGVyLmFmdGVyO1xuICAgICAgICBpZiAocy5hZnRlci5zZXF1ZW5jZS5iZWZvcmUpIHtcbiAgICAgICAgICBzZWdtZW50LmJlZm9yZSA9IHMuYWZ0ZXIuc2VxdWVuY2UuYmVmb3JlLmJlZm9yZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzLmJlZm9yZSkge1xuICAgICAgICBzZWdtZW50LmJlZm9yZSA9IHMuYmVmb3JlLmJlZm9yZTtcbiAgICAgICAgaWYgKHMuYmVmb3JlLnNlcXVlbmNlLmFmdGVyKSB7XG4gICAgICAgICAgc2VnbWVudC5hZnRlciA9IHMuYmVmb3JlLnNlcXVlbmNlLmFmdGVyLmFmdGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgdHJhY2sgPSBuZXcgU2VxdWVuY2VUcmFjaygpO1xuICAgICAgdHJhY2suc2VxdWVuY2VfZGVmID0gcztcbiAgICAgIHRyYWNrLmFkZFJhbmdlKHNlZ21lbnQuYWZ0ZXIsIHNlZ21lbnQuYmVmb3JlKTtcbiAgICAgIHRoaXMuc2VxdWVuY2VUcmFja3MucHVzaCh0cmFjayk7XG4gICAgfVxuICB9XG5cbiAgZHJhdyhhcHApIHtcbiAgICB2YXIgY29sb3JPZmZzZXQgPSB0aGlzLmNoYW5uZWxOciAqIDQwO1xuICAgIHZhciBoZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICB2YXIgbWFyZ2luVG9wID0gdGhpcy5tYXJnaW5Ub3A7XG4gICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHZhciBwYWRkaW5nID0gdGhpcy5wYWRkaW5nO1xuICAgIHZhciBjaGFubmVsV2lkdGggPSB0aGlzLmNoYW5uZWxXaWR0aDtcbiAgICB2YXIgdHJhY2tXaWR0aCA9IGFwcC5jYW52YXMud2lkdGggLSBjaGFubmVsV2lkdGggLSBwYWRkaW5nICogMjtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMCwgJyArICgyMDAgLSBjb2xvck9mZnNldCkgKyAnLCAwKSc7XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoNDAsIDQwLCA0MCwgMS4wKSc7XG4gICAgYXBwLmN0eC5maWxsUmVjdChwYWRkaW5nLCBwYWRkaW5nICsgb2Zmc2V0LCBjaGFubmVsV2lkdGgsIGhlaWdodCk7XG4gICAgYXBwLmN0eC5zdHJva2VSZWN0KHBhZGRpbmcsIHBhZGRpbmcgKyBvZmZzZXQsIGNoYW5uZWxXaWR0aCwgaGVpZ2h0KTtcblxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gJ3JnYigyNTUsICcgKyAoMjAwIC0gY29sb3JPZmZzZXQpICsgJywgMCknO1xuICAgIGFwcC5jdHguZmlsbFJlY3QocGFkZGluZyArIGNoYW5uZWxXaWR0aCwgcGFkZGluZyArIG9mZnNldCwgdHJhY2tXaWR0aCwgaGVpZ2h0KTtcbiAgICBhcHAuY3R4LnN0cm9rZVJlY3QocGFkZGluZyArIGNoYW5uZWxXaWR0aCwgcGFkZGluZyArIG9mZnNldCwgdHJhY2tXaWR0aCwgaGVpZ2h0KTtcblxuICAgIHZhciB0cmFja0hlaWdodCA9IGhlaWdodCAvIHRoaXMuc2VxdWVuY2VUcmFja3MubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZXF1ZW5jZVRyYWNrcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGFwcC5jdHguc3Ryb2tlUmVjdChwYWRkaW5nICsgY2hhbm5lbFdpZHRoLCBwYWRkaW5nICsgb2Zmc2V0ICsgaSAqIHRyYWNrSGVpZ2h0LCB0cmFja1dpZHRoLCB0cmFja0hlaWdodCk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZXF1ZW5jZVRyYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHMgPSB0aGlzLnNlcXVlbmNlVHJhY2tzW2ldO1xuICAgICAgcy5kcmF3KGFwcCwgcGFkZGluZyArIGNoYW5uZWxXaWR0aCwgcGFkZGluZyArIG9mZnNldCArIGkgKiB0cmFja0hlaWdodCwgdHJhY2tXaWR0aCwgdHJhY2tIZWlnaHQpO1xuICAgIH1cblxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gJ3JnYigyNTUsIDI1NSwgMjU1KSc7XG4gICAgYXBwLmN0eC5mb250ID0gJzEwcHggc2Fucy1zZXJpZic7XG4gICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLm5hbWUsIHBhZGRpbmcgKyAzLCBwYWRkaW5nICsgb2Zmc2V0ICsgMTEpO1xuICAgIHZhciBzaG93QmFycyA9IDQ7XG4gICAgdmFyIHBvaW50c0luUmFuZ2UgPSBzaG93QmFycyAqIDQ7XG4gICAgdmFyIHNjYWxpbmcgPSB0cmFja1dpZHRoIC8gcG9pbnRzSW5SYW5nZTtcbiAgICB2YXIgYmFyV2lkdGggPSA0ICogc2NhbGluZztcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoNDAsIDQwLCA0MCknO1xuICAgIGFwcC5jdHguZm9udCA9ICcxMHB4IG1vbm8nO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2hvd0JhcnM7IGkrKykge1xuICAgICAgYXBwLmN0eC5maWxsVGV4dChpICogNCwgcGFkZGluZyArIGNoYW5uZWxXaWR0aCArIDMgKyBpICogYmFyV2lkdGgsIHBhZGRpbmcgKyBvZmZzZXQgKyBoZWlnaHQgLSAzKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgdmFyIHBhdGggPSBuZXcgUGF0aDJEKCk7XG4gICAgdmFyIHdpZHRoID0gYXBwLmNhbnZhcy53aWR0aCAtIHRoaXMucGFkZGluZyAqIDI7XG4gICAgcGF0aC5yZWN0KHRoaXMucGFkZGluZywgdGhpcy5wYWRkaW5nICsgdGhpcy5vZmZzZXQsIHdpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgaWYgKGFwcC5jdHguaXNQb2ludEluUGF0aChwYXRoLCB4LCB5KSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiZXhwb3J0IHsgQ2hhbm5lbCB9IGZyb20gJy4vY2hhbm5lbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBUaW1lbGluZUVkaXRvciB7XG4gIGNvbnN0cnVjdG9yKGNoYW5uZWxzKSB7XG4gICAgdGhpcy5jaGFubmVscyA9IGNoYW5uZWxzO1xuICB9XG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICBmb3IgKHZhciBlIG9mIHRoaXMuY2hhbm5lbHMpIHtcbiAgICAgIHZhciB2ID0gZS5oYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KTtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHJldHVybiB2O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIGZvciAodmFyIGUgb2YgdGhpcy5jaGFubmVscykge1xuICAgICAgZS5kcmF3KGFwcCk7XG4gICAgfVxuICB9XG59XG4iLCJcbmV4cG9ydCBjbGFzcyBSYW5nZSB7XG4gIGNvbnN0cnVjdG9yKHN0YXJ0LCBzdG9wKSB7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuc3RvcCA9IHN0b3A7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlVHJhY2sge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNlcXVlbmNlX2RlZiA9IG51bGw7XG4gICAgdGhpcy5yYW5nZXMgPSBbXTtcbiAgfVxuICBhZGRSYW5nZShzdGFydCwgc3RvcCkge1xuICAgIHRoaXMucmFuZ2VzLnB1c2gobmV3IFJhbmdlKHN0YXJ0ID8gc3RhcnQgOiAwLCBzdG9wID8gc3RvcCA6IDEwMDAwMDApKTtcbiAgfVxuICBjb21waWxlKCkge1xuICAgIGlmICh0aGlzLnNlcXVlbmNlX2RlZikge1xuICAgICAgcmV0dXJuIHRoaXMuc2VxdWVuY2VfZGVmO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBkcmF3KGFwcCwgeCwgeSwgdywgaCkge1xuICAgIHZhciBzaG93QmFycyA9IDY0O1xuICAgIHZhciBwb2ludHNJblJhbmdlID0gc2hvd0JhcnMgKiA0O1xuICAgIHZhciBzY2FsaW5nID0gdyAvIHBvaW50c0luUmFuZ2U7XG4gICAgdmFyIGJhcldpZHRoID0gNCAqIHNjYWxpbmc7XG4gICAgZm9yICh2YXIgciBvZiB0aGlzLnJhbmdlcykge1xuICAgICAgdmFyIGNvbG9yT2Zmc2V0ID0gMTA7XG4gICAgICB2YXIgd2lkdGggPSBNYXRoLm1pbigoci5zdG9wIC0gci5zdGFydCkgKiBzY2FsaW5nLCB3IC0gKHIuc3RhcnQgKiBzY2FsaW5nKSlcbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gJ3JnYigzNSwgNzUsICcgKyAoMjAwIC0gY29sb3JPZmZzZXQpICsgJywgMC4zKSc7XG4gICAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gJ3JnYig1LCA1LCAnICsgKDIwMCAtIGNvbG9yT2Zmc2V0KSArICcsIDAuNiknO1xuICAgICAgYXBwLmN0eC5maWxsUmVjdCh4ICsgci5zdGFydCAqIHNjYWxpbmcsIHksIHdpZHRoLCBoKTtcbiAgICAgIGFwcC5jdHguc3Ryb2tlUmVjdCh4ICsgci5zdGFydCAqIHNjYWxpbmcsIHksIHdpZHRoLCBoKTtcbiAgICB9XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoNzAsIDcwLCA3MCwgMC44KSc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaG93QmFyczsgaSsrKSB7XG4gICAgICBhcHAuY3R4LnN0cm9rZVJlY3QoeCArIGkgKiBiYXJXaWR0aCwgeSwgYmFyV2lkdGgsIGgpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==