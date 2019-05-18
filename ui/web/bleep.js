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

/***/ "./src/instrument_editor/bank.js":
/*!***************************************!*\
  !*** ./src/instrument_editor/bank.js ***!
  \***************************************/
/*! exports provided: Bank */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bank", function() { return Bank; });
/* harmony import */ var _instrument_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instrument.js */ "./src/instrument_editor/instrument.js");


class Bank {
  constructor() {
    this.instruments = {};
  }
  loadFromDefinition(def) {
    for (var instrDef of def) {
      var instr = new _instrument_js__WEBPACK_IMPORTED_MODULE_0__["Instrument"]();
      instr.loadFromDefinition(instrDef);
      if (instr.instrumentBankIndex !== null) {
        this.instruments[instr.instrumentBankIndex] = instr;
      }
    }
    return this;
  }
}


/***/ }),

/***/ "./src/instrument_editor/index.js":
/*!****************************************!*\
  !*** ./src/instrument_editor/index.js ***!
  \****************************************/
/*! exports provided: Bank, Instrument, InstrumentEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstrumentEditor", function() { return InstrumentEditor; });
/* harmony import */ var _bank_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bank.js */ "./src/instrument_editor/bank.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bank", function() { return _bank_js__WEBPACK_IMPORTED_MODULE_0__["Bank"]; });

/* harmony import */ var _instrument_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instrument.js */ "./src/instrument_editor/instrument.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Instrument", function() { return _instrument_js__WEBPACK_IMPORTED_MODULE_1__["Instrument"]; });

/* harmony import */ var _module_units__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module_units */ "./src/instrument_editor/module_units/index.js");
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ */ "./src/components/index.js");






class InstrumentEditor extends _components___WEBPACK_IMPORTED_MODULE_3__["Editor"] {
  constructor(app, instrument, handleClose) {
    super(app, instrument, handleClose);
    if (!instrument) {
      instrument = new _instrument_js__WEBPACK_IMPORTED_MODULE_1__["Instrument"]([], []);
      var modules = [
        new _components___WEBPACK_IMPORTED_MODULE_3__["Module"](instrument, 30, 30, new _module_units__WEBPACK_IMPORTED_MODULE_2__["ChannelInput"]('input')), 
        new _components___WEBPACK_IMPORTED_MODULE_3__["Module"](instrument, 800, 30, new _module_units__WEBPACK_IMPORTED_MODULE_2__["ChannelOutput"]('output')),
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
      {label: "TRA", onclick: () => this.handleAddUnit(() => new _module_units__WEBPACK_IMPORTED_MODULE_2__["Transpose"]("transpose"))},
      {label: "PAN", onclick: () => this.handleAddUnit(() => new _module_units__WEBPACK_IMPORTED_MODULE_2__["Panning"]("panning"))},
    ];
    var x = 10;
    for (var def of buttonDefs) {
      var b = new _components___WEBPACK_IMPORTED_MODULE_3__["Button"](x, 0, def.onclick.bind(this), def.label);
      b.colour = app.theme.colours.ModuleGenerator;
      this.buttons.push(b);
      x += b.w + 3;
    }
    for (var def of filterDefs) {
      var b = new _components___WEBPACK_IMPORTED_MODULE_3__["Button"](x, 0, def.onclick.bind(this), def.label);
      b.colour = app.theme.colours.ModuleFilter;
      this.buttons.push(b);
      x += b.w + 3;
    }
    for (var def of derivedDefs) {
      var b = new _components___WEBPACK_IMPORTED_MODULE_3__["Button"](x, 0, def.onclick.bind(this), def.label);
      b.colour = app.theme.colours.ModuleDerived;
      this.buttons.push(b);
      x += b.w + 3;
    }
  }
  handleAddFilter(type) {
    return this.handleAddUnit(() => new _module_units__WEBPACK_IMPORTED_MODULE_2__["Filter"](type));
  }
  handleAddGenerator(type) {
    return this.handleAddUnit(() => new _module_units__WEBPACK_IMPORTED_MODULE_2__["SampleGenerator"](type));
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
    var bank = this.loadInstrumentBank(instrumentBank);
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

  loadInstrumentBank(bank) {
    return new _instrument_editor___WEBPACK_IMPORTED_MODULE_1__["Bank"]().loadFromDefinition(bank);
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
  }

  compile() {
    var channel = {
      "channel": this.channelNr,
      "generator": this.instrument.compile(),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21vZHVsZV91bml0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhdGNoLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvYmFuay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL2luc3RydW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9jaGFubmVsX2lucHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvY2hhbm5lbF9vdXRwdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9mYWN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9wYW5uaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvc2FtcGxlX2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvbW9kdWxlX3VuaXRzL3RyYW5zcG9zZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL3BhdGNoYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL3BsYXlfbm90ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy9wdWxzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy9yYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy9zZXF1ZW5jZV9pbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL3NlcXVlbmNlLmpzIiwid2VicGFjazovLy8uL3NyYy90aGVtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGltZWxpbmVfZWRpdG9yL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbWVsaW5lX2VkaXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGltZWxpbmVfZWRpdG9yL3NlcXVlbmNlX3RyYWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixnRUFBYTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0NBQW9DO0FBQ3ZEO0FBQ0E7QUFDQSxtQkFBbUIsZ0NBQWdDO0FBQ25EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3R0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1Qzs7QUFFaEM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJibGVlcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4uanNcIik7XG4iLCJcbmNvbnN0IFRlc3RNZXNzYWdlID0gXCJ0ZXN0XCI7XG5jb25zdCBTdGF0dXNNZXNzYWdlID0gXCJzdGF0dXNcIjtcbmNvbnN0IENoYW5uZWxEZWZNZXNzYWdlID0gXCJjaGFubmVsX2RlZlwiO1xuY29uc3QgU2VxdWVuY2VyRGVmTWVzc2FnZSA9IFwic2VxdWVuY2VyX2RlZlwiO1xuY29uc3QgU2V0U2VxdWVuY2VyRGVmTWVzc2FnZSA9IFwic2V0X3NlcXVlbmNlcl9kZWZcIjtcblxuZXhwb3J0IGNsYXNzIEFQSSB7XG5cbiAgY29uc3RydWN0b3IoYXBwKSB7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5zb2NrZXQgPSBudWxsO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdmFyIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoXCJ3czovL2xvY2FsaG9zdDoxMDAwMC93c1wiKTtcbiAgICBzb2NrZXQub25vcGVuID0gKChlKSA9PiB7XG4gICAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcbiAgICAgIHRoaXMuc2VuZERhdGEoQ2hhbm5lbERlZk1lc3NhZ2UsIFwidGVzdFwiKTtcbiAgICB9KS5iaW5kKHRoaXMpXG4gICAgc29ja2V0Lm9ubWVzc2FnZSA9IHRoaXMuaGFuZGxlTWVzc2FnZVJlY2VpdmVkLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVNZXNzYWdlUmVjZWl2ZWQobWVzc2FnZSkge1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpXG4gICAgdmFyIG1zZyA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcbiAgICBpZiAobXNnLnR5cGUgPT09IENoYW5uZWxEZWZNZXNzYWdlKSB7XG4gICAgICB0aGlzLmFwcC5pbml0aWFsaXNlQ2hhbm5lbHMobXNnLmRhdGEpO1xuICAgIH0gZWxzZSBpZiAobXNnLnR5cGUgPT09IFNlcXVlbmNlckRlZk1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYXBwLmluaXRpYWxpc2VTZXF1ZW5jZVRyYWNrcyhtc2cuZGF0YSk7XG4gICAgfVxuICB9XG4gIHJlcXVlc3RTZXF1ZW5jZXJEZWYoKSB7XG4gICAgdGhpcy5zZW5kRGF0YShTZXF1ZW5jZXJEZWZNZXNzYWdlLCBudWxsKTtcbiAgfVxuICBzZXRTZXF1ZW5jZXJEZWYoZGVmKSB7XG4gICAgdGhpcy5zZW5kRGF0YShTZXRTZXF1ZW5jZXJEZWZNZXNzYWdlLCBKU09OLnN0cmluZ2lmeShkZWYpKTtcbiAgfVxuXG4gIHNlbmREYXRhKHR5cGUsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5zZW5kSlNPTih7XCJ0eXBlXCI6IHR5cGUsIFwiZGF0YVwiOiBkYXRhfSk7XG4gIH1cblxuICBzZW5kSlNPTihvYmopIHtcbiAgICByZXR1cm4gdGhpcy5zZW5kTWVzc2FnZShKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBpZiAodGhpcy5zb2NrZXQpIHtcbiAgICAgIHRoaXMuc29ja2V0LnNlbmQobWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbn1cbiIsIlxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIG9uQ2xpY2ssIGxhYmVsKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMudyA9IDI1O1xuICAgIHRoaXMuaCA9IDI1O1xuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSBvbkNsaWNrO1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLmNvbG91ciA9IG51bGw7XG4gICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgIHRoaXMudyA9IDM1O1xuICAgIH1cbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIHZhciB3ID0gdGhpcy53O1xuICAgIHZhciBoID0gdGhpcy5oO1xuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuQnV0dG9uO1xuICAgIGlmICh0aGlzLmNvbG91cikge1xuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG91cjtcbiAgICB9XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLk91dGxpbmVDb2xvdXI7XG4gICAgYXBwLmN0eC5saW5lV2lkdGggPSAxO1xuICAgIGFwcC5jdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHcsIGgpO1xuICAgIGFwcC5jdHguc3Ryb2tlUmVjdCh0aGlzLngsIHRoaXMueSwgdywgaCk7XG4gICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgIGFwcC5jdHguZm9udCA9ICcxMHB4IG1vbm8nO1xuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5CdXR0b25UZXh0O1xuICAgICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLmxhYmVsLCB0aGlzLnggKyB3IC8gMiwgdGhpcy55ICsgMTUpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgaWYgKHggPj0gdGhpcy54ICYmIHggPD0gdGhpcy54ICsgdGhpcy53ICYmIHkgPj0gdGhpcy55ICYmIHkgPD0gdGhpcy55ICsgdGhpcy5oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENsb3NlQnV0dG9uIGV4dGVuZHMgQnV0dG9uIHtcbn1cbiIsImV4cG9ydCBjbGFzcyBEaWFsIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgbGFiZWwsIG1pbiwgbWF4LCBjdXJyZW50KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLnJhZGl1cyA9IDE1O1xuICAgIHRoaXMubWluID0gbWluO1xuICAgIHRoaXMubWF4ID0gbWF4O1xuICAgIHRoaXMudmFsdWUgPSBjdXJyZW50O1xuICB9XG4gIGRyYXcoYXBwKSB7XG5cbiAgICAvLyBEcmF3IGRpYWxcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLkRpYWw7XG4gICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcbiAgICBhcHAuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBhcHAuY3R4LmZpbGwoKTtcbiAgICBhcHAuY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgdmFyIHJhbmdlID0gdGhpcy5tYXggLSB0aGlzLm1pbjtcbiAgICB2YXIgdGF1ID0gMiAqIE1hdGguUElcbiAgICB2YXIgdmFsdWUgPSB0YXUgLSAodGF1ICogKHRoaXMudmFsdWUgLSB0aGlzLm1pbikgLyByYW5nZSlcbiAgICBhcHAuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHZhciBkeCA9IE1hdGguc2luKHZhbHVlKSAqIHRoaXMucmFkaXVzO1xuICAgIHZhciBkeSA9IE1hdGguY29zKHZhbHVlKSAqIHRoaXMucmFkaXVzO1xuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5EaWFsTGluZTtcbiAgICBhcHAuY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgYXBwLmN0eC5tb3ZlVG8odGhpcy54LCB0aGlzLnkpO1xuICAgIGFwcC5jdHgubGluZVRvKHRoaXMueCArIGR4LCB0aGlzLnkgKyBkeSk7XG4gICAgYXBwLmN0eC5zdHJva2UoKTtcbiAgICBhcHAuY3R4LmxpbmVXaWR0aCA9IDE7XG5cbiAgICAvLyBEcmF3IGxhYmVsXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVUZXh0O1xuICAgIGFwcC5jdHguZm9udCA9ICcxMHB4IG1vbm8nO1xuICAgIHZhciBjZW50ZXJYID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55IC0gdGhpcy5yYWRpdXMgLSAzO1xuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICBhcHAuY3R4LmZpbGxUZXh0KHRoaXMubGFiZWwsIGNlbnRlclgsIHkpO1xuXG4gICAgLy8gRHJhdyB2YWx1ZVxuICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy52YWx1ZS50b0ZpeGVkKDIpLCBjZW50ZXJYLCB0aGlzLnkgKyB0aGlzLnJhZGl1cyArIDEyKTtcbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgaWYgKHggPj0gdGhpcy54IC0gdGhpcy5yYWRpdXMgJiYgeCA8PSB0aGlzLnggKyB0aGlzLnJhZGl1cyAmJiB5ID49IHRoaXMueSAtIHRoaXMucmFkaXVzICYmIHkgPD0gdGhpcy5yYWRpdXMgKyB0aGlzLnkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuICBoYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4LCB5KSB7XG4gICAgZHggPSB4IC0gdGhpcy54O1xuICAgIGR5ID0geSAtIHRoaXMueTtcbiAgICB2YXIgc2luID0gZHkgLyBNYXRoLnNxcnQoZHkgKiBkeSArIGR4ICogZHgpXG4gICAgdmFyIHNjYWxlZENvcyA9IDEuMCAtIChzaW4gKyAxKSAvIDI7XG4gICAgdmFyIHJhbmdlID0gdGhpcy5tYXggLSB0aGlzLm1pbjtcbiAgICB0aGlzLnZhbHVlID0gcmFuZ2UgKiBzY2FsZWRDb3MgKyB0aGlzLm1pbjtcbiAgICBhcHAuZHJhdygpO1xuICB9XG59XG5cbiIsImltcG9ydCB7IENsb3NlQnV0dG9uLCBCdXR0b24gfSBmcm9tICcuL2J1dHRvbi5qcyc7XG5pbXBvcnQgeyBNb2R1bGUgfSBmcm9tICcuL21vZHVsZS5qcyc7XG5cbmV4cG9ydCBjbGFzcyBFZGl0b3Ige1xuICBjb25zdHJ1Y3RvcihhcHAsIHRhcmdldCwgaGFuZGxlQ2xvc2UpIHtcbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICB0aGlzLnBhZGRpbmcgPSBhcHAudGhlbWUucGFkZGluZztcbiAgICB0aGlzLnNjYWxlID0gMS4wXG4gICAgdGhpcy5zaG93Q29tcGlsZSA9IHRydWU7XG4gICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5idXR0b25zID0gW1xuICAgICAgbmV3IENsb3NlQnV0dG9uKDEwLCAxMCwgaGFuZGxlQ2xvc2UsIFwiWFwiKSxcbiAgICAgIG5ldyBCdXR0b24oMTAsIDEwLCB0aGlzLmhhbmRsZVNob3dDb21waWxlLmJpbmQodGhpcyksIFwiSlNPTlwiKSxcbiAgICAgIG5ldyBCdXR0b24oMTAsIDEwLCB0aGlzLmhhbmRsZVpvb21Jbi5iaW5kKHRoaXMpLCBcIitcIiksXG4gICAgICBuZXcgQnV0dG9uKDEwLCAxMCwgdGhpcy5oYW5kbGVab29tT3V0LmJpbmQodGhpcyksIFwiLVwiKSxcbiAgICBdO1xuICB9XG4gIGhhbmRsZUFkZFVuaXQoY29uc3RydWN0b3IpIHtcbiAgICB2YXIgZyA9IGNvbnN0cnVjdG9yKClcbiAgICB0aGlzLnRhcmdldC5tb2R1bGVzLnB1c2gobmV3IE1vZHVsZSh0aGlzLnRhcmdldCwgTWF0aC5yYW5kb20oKSAqIDcwMCwgTWF0aC5yYW5kb20oKSAqIDYwMCwgZykpO1xuICAgIHRoaXMuYXBwLmRyYXcoKTtcbiAgfVxuICBoYW5kbGVab29tSW4oKSB7XG4gICAgdGhpcy5zY2FsZSArPSAuMVxuICAgIHRoaXMuYXBwLmRyYXcoKTtcbiAgfVxuICBoYW5kbGVab29tT3V0KCkge1xuICAgIHRoaXMuc2NhbGUgLT0gLjE7XG4gICAgdGhpcy5hcHAuZHJhdygpO1xuICB9XG4gIGhhbmRsZURyYWcoYXBwLCBkeCwgZHksIHgsIHkpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZC5oYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4LCB5KTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlRHJvcChhcHAsIHgsIHkpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZC5oYW5kbGVEcm9wKGFwcCwgeCAtIHRoaXMucGFkZGluZywgeSAtIHRoaXMucGFkZGluZyk7XG4gICAgfVxuICB9XG4gIGhhbmRsZVNob3dDb21waWxlKCkge1xuICAgIHRoaXMuc2hvd0NvbXBpbGUgPSAhdGhpcy5zaG93Q29tcGlsZTtcbiAgICB0aGlzLmFwcC5kcmF3KCk7XG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgIGZvciAodmFyIGIgb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICB2YXIgdiA9IGIuaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSk7XG4gICAgICBpZiAodikge1xuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgbSBvZiB0aGlzLnRhcmdldC5tb2R1bGVzKSB7XG4gICAgICB2YXIgdiA9IG0uaGFuZGxlTW91c2VEb3duKGFwcCwgeCAtIHRoaXMucGFkZGluZywgeSAtIHRoaXMucGFkZGluZyk7XG4gICAgICBpZiAodikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGRyYXcoYXBwKSB7XG4gICAgdmFyIHcgPSBhcHAuY2FudmFzLndpZHRoIC0gMiAqIHRoaXMucGFkZGluZztcbiAgICB2YXIgaCA9IGFwcC5jYW52YXMuaGVpZ2h0IC0gMiAqIHRoaXMucGFkZGluZztcbiAgICB0aGlzLmJ1dHRvbnNbMF0ueCA9IHcgLSB0aGlzLmJ1dHRvbnNbMF0udyArIHRoaXMucGFkZGluZztcbiAgICB0aGlzLmJ1dHRvbnNbMF0ueSA9IHRoaXMucGFkZGluZztcbiAgICB0aGlzLmJ1dHRvbnNbMV0ueCA9IHcgLSB0aGlzLmJ1dHRvbnNbMV0udyArIHRoaXMucGFkZGluZztcbiAgICB0aGlzLmJ1dHRvbnNbMV0ueSA9IHRoaXMucGFkZGluZyArIDI1O1xuICAgIHRoaXMuYnV0dG9uc1syXS54ID0gdyAtIHRoaXMuYnV0dG9uc1syXS53ICsgdGhpcy5wYWRkaW5nO1xuICAgIHRoaXMuYnV0dG9uc1syXS55ID0gdGhpcy5wYWRkaW5nICsgNTA7XG4gICAgdGhpcy5idXR0b25zWzNdLnggPSB3IC0gdGhpcy5idXR0b25zWzNdLncgKyB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5idXR0b25zWzNdLnkgPSB0aGlzLnBhZGRpbmcgKyA3NTtcbiAgICBhcHAuY3R4LnNhdmUoKTtcbiAgICBhcHAuY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgXG4gICAgLy8gRHJhdyB0aGUgYmFja2dyb3VuZFxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuSW5zdHJ1bWVudEVkaXRvckJhY2tncm91bmQ7XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLk91dGxpbmVDb2xvdXI7XG4gICAgYXBwLmN0eC5maWxsUmVjdCh0aGlzLnBhZGRpbmcsIHRoaXMucGFkZGluZywgdywgaCk7XG5cbiAgICAvLyBEcmF3IHRoZSBidXR0b25zIFxuICAgIGZvciAodmFyIGIgb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICBiLmRyYXcoYXBwKTtcbiAgICB9XG5cbiAgICAvLyBEcmF3IHRoZSBjb21waWxlZCBnZW5lcmF0b3IgSlNPTlxuICAgIGlmICh0aGlzLnNob3dDb21waWxlKSB7XG4gICAgICB2YXIgdHh0ID0gSlNPTi5zdHJpbmdpZnkodGhpcy50YXJnZXQuY29tcGlsZSgpLCBudWxsLCAyKTtcbiAgICAgIHZhciBsaW5lTnIgPSAwO1xuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVUZXh0O1xuICAgICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcInN0YXJ0XCI7XG4gICAgICBmb3IgKHZhciBsaW5lIG9mIHR4dC5zcGxpdChcIlxcblwiKSkge1xuICAgICAgICBhcHAuY3R4LmZpbGxUZXh0KGxpbmUsIHcgLSAzMDAsIDkwICsgbGluZU5yICogMTIpO1xuICAgICAgICBsaW5lTnIrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEcmF3IHRoZSBtb2R1bGVzXG4gICAgZm9yICh2YXIgbSBvZiB0aGlzLnRhcmdldC5tb2R1bGVzKSB7XG4gICAgICBhcHAuY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTsgLy8gcmVzZXQgdHJhbnNsYXRlXG4gICAgICBhcHAuY3R4LnNjYWxlKHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xuICAgICAgYXBwLmN0eC50cmFuc2xhdGUodGhpcy5wYWRkaW5nLCB0aGlzLnBhZGRpbmcpO1xuICAgICAgbS5kcmF3KGFwcCk7XG4gICAgfVxuICAgIGFwcC5jdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApOyAvLyByZXNldCB0cmFuc2xhdGVcbiAgICBhcHAuY3R4LnNjYWxlKHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xuXG5cbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLlBhdGNoO1xuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5QYXRjaDtcblxuICAgIC8vIERyYXcgdGhlIHBhdGNoZXNcbiAgICBmb3IgKHZhciBwIG9mIHRoaXMudGFyZ2V0LnBhdGNoZXMpIHtcbiAgICAgIHZhciBmcm9tTW9kID0gdGhpcy50YXJnZXQubW9kdWxlc1twLmZyb21dO1xuICAgICAgdmFyIHRvTW9kID0gdGhpcy50YXJnZXQubW9kdWxlc1twLnRvXTtcbiAgICAgIHZhciBmcm9tU29ja2V0ID0gcC5nZXRGcm9tU29ja2V0KGZyb21Nb2QpO1xuICAgICAgdmFyIHRvU29ja2V0ID0gcC5nZXRUb1NvY2tldCh0b01vZCk7XG4gICAgICB2YXIgZnJvbVggPSB0aGlzLnBhZGRpbmcgKyBmcm9tTW9kLnggKyBmcm9tU29ja2V0Lng7XG4gICAgICB2YXIgZnJvbVkgPSB0aGlzLnBhZGRpbmcgKyBmcm9tTW9kLnkgKyBmcm9tU29ja2V0Lnk7XG4gICAgICB2YXIgdG9YID0gdGhpcy5wYWRkaW5nICsgdG9Nb2QueCArIHRvU29ja2V0Lng7XG4gICAgICB2YXIgdG9ZID0gdGhpcy5wYWRkaW5nICsgdG9Nb2QueSArIHRvU29ja2V0Lnk7XG4gICAgICB2YXIgcG9pbnRPZmZzZXQgPSA3MDtcblxuICAgICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9IHAuZ2V0Q29sb3IoYXBwLnRoZW1lKTtcbiAgICAgIGFwcC5jdHgubGluZVdpZHRoID0gNDtcbiAgICAgIGFwcC5jdHguYmVnaW5QYXRoKCk7XG4gICAgICBhcHAuY3R4Lm1vdmVUbyhmcm9tWCwgZnJvbVkpO1xuICAgICAgYXBwLmN0eC5iZXppZXJDdXJ2ZVRvKFxuICAgICAgICBmcm9tWCwgXG4gICAgICAgIGZyb21ZICsgcG9pbnRPZmZzZXQsIFxuICAgICAgICB0b1gsIFxuICAgICAgICB0b1kgKyBwb2ludE9mZnNldCwgXG4gICAgICAgIHRvWCwgXG4gICAgICAgIHRvWSk7XG4gICAgICBhcHAuY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIGFwcC5jdHgucmVzdG9yZSgpO1xuICB9XG59XG4iLCJleHBvcnQgeyBEaWFsIH0gZnJvbSAnLi9kaWFsLmpzJztcbmV4cG9ydCB7IFNvY2tldCwgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCB9IGZyb20gJy4vc29ja2V0LmpzJztcbmV4cG9ydCB7IEJ1dHRvbiwgQ2xvc2VCdXR0b24gfSBmcm9tICcuL2J1dHRvbi5qcyc7XG5leHBvcnQgeyBQYXRjaCB9IGZyb20gJy4vcGF0Y2guanMnO1xuZXhwb3J0IHsgTW9kdWxlIH0gZnJvbSAnLi9tb2R1bGUuanMnO1xuZXhwb3J0IHsgTW9kdWxlVW5pdCB9IGZyb20gJy4vbW9kdWxlX3VuaXQuanMnO1xuZXhwb3J0IHsgRWRpdG9yIH0gZnJvbSAnLi9lZGl0b3IuanMnO1xuIiwiaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnLi9zb2NrZXQuanMnO1xuaW1wb3J0IHsgRGlhbCB9IGZyb20gJy4vZGlhbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcih0YXJnZXQsIHgsIHksIHVuaXQpIHtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy51bml0ID0gdW5pdDtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcbiAgICB0aGlzLnVuaXQuZHJhdyhhcHApO1xuICB9XG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICB2YXIgdiA9IHRoaXMudW5pdC5oYW5kbGVNb3VzZURvd24oYXBwLCB4IC0gdGhpcy54LCB5IC0gdGhpcy55KTtcbiAgICBpZiAoIXYpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZCA9IHY7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSkge1xuICAgIHZhciB2ID0gdGhpcy5zZWxlY3RlZDtcbiAgICBpZiAodiBpbnN0YW5jZW9mIFNvY2tldCkge1xuICAgICAgdi5oYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4LCB5KTtcbiAgICB9IGVsc2UgaWYgKHYgaW5zdGFuY2VvZiBEaWFsKSB7XG4gICAgICB2LmhhbmRsZURyYWcoYXBwLCBkeCwgZHksIHggLSB0aGlzLngsIHkgLSB0aGlzLnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnggKz0gZHg7XG4gICAgICB0aGlzLnkgKz0gZHk7XG4gICAgfVxuICB9XG4gIGhhbmRsZURyb3AoYXBwLCB4LCB5KSB7XG4gICAgdmFyIHYgPSB0aGlzLnNlbGVjdGVkO1xuICAgIGlmICh2IGluc3RhbmNlb2YgU29ja2V0KSB7XG4gICAgICBmb3IgKHZhciBtb2R1bGUgb2YgdGhpcy50YXJnZXQubW9kdWxlcykge1xuICAgICAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMobW9kdWxlLnVuaXQuc29ja2V0cykpIHtcbiAgICAgICAgICB2YXIgcyA9IG1vZHVsZS51bml0LnNvY2tldHNba2V5XTtcbiAgICAgICAgICB2YXIgc3ggPSB4IC0gbW9kdWxlLng7XG4gICAgICAgICAgdmFyIHN5ID0geSAtIG1vZHVsZS55O1xuICAgICAgICAgIHZhciByZXN1bHQgPSBzLmhhbmRsZU1vdXNlRG93bihhcHAsIHN4LCBzeSk7XG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXQuYWRkUGF0Y2godGhpcywgbW9kdWxlLCB2LmxhYmVsLCByZXN1bHQubGFiZWwpO1xuICAgICAgICAgICAgYXBwLmRyYXcoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy53ID0gMTUwO1xuICAgIHRoaXMuaCA9IDE1MDtcbiAgICB0aGlzLnNvY2tldHMgPSB7fTtcbiAgICB0aGlzLmRpYWxzID0ge307XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gXCJcIjtcbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIHZhciB3ID0gdGhpcy53O1xuICAgIHZhciBoID0gdGhpcy5oO1xuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnNbdGhpcy5iYWNrZ3JvdW5kXTtcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlT3V0bGluZTtcbiAgICBhcHAuY3R4LmZpbGxSZWN0KDAsIDAsIHcsIGgpO1xuICAgIGFwcC5jdHguc3Ryb2tlUmVjdCgwLCAwLCB3LCBoKTtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZVRleHQ7XG4gICAgYXBwLmN0eC5mb250ID0gJzE0cHggbW9ubyc7XG4gICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy50eXBlLCB3IC8gMiwgMTQpO1xuICAgIGZvciAodmFyIG8gb2YgT2JqZWN0LmtleXModGhpcy5zb2NrZXRzKSkge1xuICAgICAgdGhpcy5zb2NrZXRzW29dLmRyYXcoYXBwKTtcbiAgICB9XG4gICAgZm9yICh2YXIgbyBvZiBPYmplY3Qua2V5cyh0aGlzLmRpYWxzKSkge1xuICAgICAgdGhpcy5kaWFsc1tvXS5kcmF3KGFwcCk7XG4gICAgfVxuICB9XG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICBmb3IgKHZhciBvIG9mIE9iamVjdC5rZXlzKHRoaXMuc29ja2V0cykpIHtcbiAgICAgIHZhciB2ID0gdGhpcy5zb2NrZXRzW29dLmhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpO1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIG8gb2YgT2JqZWN0LmtleXModGhpcy5kaWFscykpIHtcbiAgICAgIHZhciB2ID0gdGhpcy5kaWFsc1tvXS5oYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KTtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHJldHVybiB2O1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgcGF0aCA9IG5ldyBQYXRoMkQoKTtcbiAgICBwYXRoLnJlY3QoMCwgMCwgdGhpcy53LCB0aGlzLmgpO1xuICAgIGlmIChhcHAuY3R4LmlzUG9pbnRJblBhdGgocGF0aCwgeCwgeSkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNvbm5lY3Rpb25zIGlzIGEge30gbWFwcGluZyB0aGlzIHVuaXQncyBpbnB1dCBzb2NrZXQgSURzIFxuICAvLyB0byBhIGxpc3Qgb2YgY29ubmVjdGVkIHVuaXRzLlxuICAvL1xuICBjb21waWxlKGNvbm5lY3Rpb25zKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuIiwiZXhwb3J0IGNsYXNzIFBhdGNoIHtcbiAgY29uc3RydWN0b3IoZnJvbU1vZHVsZSwgdG9Nb2R1bGUsIGZyb21Tb2NrZXQsIHRvU29ja2V0LCB0eXBlKSB7XG4gICAgdGhpcy5mcm9tID0gZnJvbU1vZHVsZTtcbiAgICB0aGlzLnRvID0gdG9Nb2R1bGU7XG4gICAgdGhpcy5mcm9tU29ja2V0ID0gZnJvbVNvY2tldDtcbiAgICB0aGlzLnRvU29ja2V0ID0gdG9Tb2NrZXQ7XG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICB0aHJvdyAnTWlzc2luZyB0eXBlIGluIFBhdGNoJztcbiAgICB9XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuICBnZXRGcm9tU29ja2V0KG1vZCkge1xuICAgIHJldHVybiBtb2QudW5pdC5zb2NrZXRzW3RoaXMuZnJvbVNvY2tldF07XG4gIH1cbiAgZ2V0VG9Tb2NrZXQobW9kKSB7XG4gICAgcmV0dXJuIG1vZC51bml0LnNvY2tldHNbdGhpcy50b1NvY2tldF07XG4gIH1cbiAgaXNJc29tb3JwaGljKHApIHtcbiAgICByZXR1cm4gKHRoaXMuZnJvbSA9PSBwLmZyb20gXG4gICAgICAgICYmIHRoaXMudG8gPT0gcC50byBcbiAgICAgICAgJiYgdGhpcy5mcm9tU29ja2V0ID09IHAuZnJvbVNvY2tldCBcbiAgICAgICAgJiYgdGhpcy50b1NvY2tldCA9PSBwLnRvU29ja2V0KSBcbiAgICAgIHx8IFxuICAgICAgKHRoaXMudG8gPT0gcC5mcm9tXG4gICAgICAgICYmIHRoaXMuZnJvbSA9PSBwLnRvIFxuICAgICAgICAmJiB0aGlzLmZyb21Tb2NrZXQgPT0gcC50b1NvY2tldCBcbiAgICAgICAgJiYgdGhpcy50b1NvY2tldCA9PSBwLmZyb21Tb2NrZXQpO1xuICB9XG4gIGRvZXNQYXRjaENvbm5lY3RUbyhtb2R1bGUsIHNvY2tldCkge1xuICAgIHJldHVybiAodGhpcy5mcm9tID09IG1vZHVsZSAmJiB0aGlzLmZyb21Tb2NrZXQgPT0gc29ja2V0KSB8fFxuICAgICAgKHRoaXMudG8gPT0gbW9kdWxlICYmIHRoaXMudG9Tb2NrZXQgPT0gc29ja2V0KVxuICB9XG4gIGNvbm5lY3RzVG8obW9kdWxlLCBzb2NrZXQpIHtcbiAgICBpZiAodGhpcy5mcm9tID09IG1vZHVsZSAmJiB0aGlzLmZyb21Tb2NrZXQgPT0gc29ja2V0KSB7XG4gICAgICByZXR1cm4ge21vZHVsZTogdGhpcy50bywgc29ja2V0OiB0aGlzLnRvU29ja2V0fVxuICAgIH1cbiAgICByZXR1cm4ge21vZHVsZTogdGhpcy5mcm9tLCBzb2NrZXQ6IHRoaXMuZnJvbVNvY2tldH1cbiAgfVxuICBnZXRDb2xvcih0aGVtZSkge1xuICAgIGlmICh0aGVtZS5jb2xvdXJzLlBhdGNoZXNbdGhpcy50eXBlXSkge1xuICAgICAgcmV0dXJuIHRoZW1lLmNvbG91cnMuUGF0Y2hlc1t0aGlzLnR5cGVdO1xuICAgIH1cbiAgICByZXR1cm4gdGhlbWUuY29sb3Vycy5QYXRjaDtcbiAgfVxufVxuXG4iLCJleHBvcnQgY2xhc3MgU29ja2V0IHtcbiAgY29uc3RydWN0b3IoeCwgeSwgbGFiZWwsIHR5cGUsIGlzSW5wdXQpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgIHRoaXMucmFkaXVzID0gODtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuaXNJbnB1dCA9IGlzSW5wdXQ7XG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICB0aHJvdyAnTWlzc2luZyBTb2NrZXQgdHlwZSBmb3IgU29ja2V0IHdpdGggbGFiZWw6ICcgKyBsYWJlbDtcbiAgICB9XG4gICAgaWYgKGlzSW5wdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgJ01pc3NpbmcgU29ja2V0IGlzSW5wdXQgZm9yIFNvY2tldCB3aXRoIGxhYmVsOiAnICsgbGFiZWw7XG4gICAgfVxuICB9XG4gIGRyYXcoYXBwKSB7XG4gICAgLy8gRHJhdyBPY3RhZ29uXG4gICAgdmFyIG9jdGFfc2hvcnQgPSAwLjI5Mjg5MzIxODgxMzQ1MjQ3NTU5OTE1NTYzNzg5NTE1OztcbiAgICB2YXIgb2N0YV9sb25nID0gMSAtIG9jdGFfc2hvcnQ7XG4gICAgdmFyIG9jdGFnb24gPSB7XG4gICAgICBzaXplOiAyICogdGhpcy5yYWRpdXMgKyA0LFxuICAgIH1cbiAgICB2YXIgeCA9IHRoaXMueCAtIHRoaXMucmFkaXVzIC0gMjtcbiAgICB2YXIgeSA9IHRoaXMueSAtIHRoaXMucmFkaXVzIC0gMjtcbiAgICBhcHAuY3R4LmJlZ2luUGF0aCgpO1xuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuU29ja2V0QmFja2dyb3VuZDtcbiAgICBpZiAoYXBwLnRoZW1lLmNvbG91cnMuU29ja2V0c1t0aGlzLnR5cGVdKSB7IFxuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Tb2NrZXRzW3RoaXMudHlwZV07XG4gICAgfVxuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Tb2NrZXRPdXRsaW5lO1xuICAgIGFwcC5jdHgubW92ZVRvKHggKyBvY3RhZ29uLnNpemUgKiBvY3RhX3Nob3J0LCB5KTtcbiAgICBhcHAuY3R4LmxpbmVUbyh4LCB5ICsgb2N0YWdvbi5zaXplICogb2N0YV9zaG9ydCk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCwgeSArIG9jdGFnb24uc2l6ZSAqIG9jdGFfbG9uZyk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCArIG9jdGFnb24uc2l6ZSAqIG9jdGFfc2hvcnQsIHkgKyBvY3RhZ29uLnNpemUpO1xuICAgIGFwcC5jdHgubGluZVRvKHggKyBvY3RhZ29uLnNpemUgKiBvY3RhX2xvbmcsIHkgKyBvY3RhZ29uLnNpemUpO1xuICAgIGFwcC5jdHgubGluZVRvKHggKyBvY3RhZ29uLnNpemUsIHkgKyAgb2N0YWdvbi5zaXplICogb2N0YV9sb25nKTtcbiAgICBhcHAuY3R4LmxpbmVUbyh4ICsgb2N0YWdvbi5zaXplLCB5ICsgb2N0YWdvbi5zaXplICogb2N0YV9zaG9ydCk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCArIG9jdGFnb24uc2l6ZSAqIG9jdGFfbG9uZywgeSk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCArIG9jdGFnb24uc2l6ZSAqIG9jdGFfc2hvcnQsIHkpO1xuICAgIGFwcC5jdHguZmlsbCgpO1xuICAgIGFwcC5jdHguc3Ryb2tlKCk7XG5cbiAgICAvLyBEcmF3IGhvbGVcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuU29ja2V0SW5zaWRlO1xuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuU29ja2V0SW5zaWRlO1xuICAgIGFwcC5jdHguYmVnaW5QYXRoKCk7XG4gICAgYXBwLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzIC0gMiwgMCwgMiAqIE1hdGguUEkpO1xuICAgIGFwcC5jdHguZmlsbCgpO1xuXG4gICAgLy8gRHJhdyBsYWJlbFxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlVGV4dDtcbiAgICBhcHAuY3R4LmZvbnQgPSAnMTBweCBtb25vJztcbiAgICB2YXIgY2VudGVyWCA9IHRoaXMueDtcbiAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLmxhYmVsLCBjZW50ZXJYLCB5IC0gMyk7XG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIGlmICh4ID49IHRoaXMueCAtIHRoaXMucmFkaXVzICYmIHggPD0gdGhpcy54ICsgdGhpcy5yYWRpdXMgKyA0ICYmIHkgPj0gdGhpcy55IC0gdGhpcy5yYWRpdXMgJiYgeSA8PSB0aGlzLnkgKyB0aGlzLnJhZGl1cyArIDQpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuICBoYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4LCB5KSB7XG4gICAgaWYgKHRoaXMub25EcmFnKSB7XG4gICAgICB0aGlzLm9uRHJhZyhhcHAsIHRoaXMsIGR4LCBkeSwgeCwgeSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dFNvY2tldCBleHRlbmRzIFNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGxhYmVsLCB0eXBlKSB7XG4gICAgc3VwZXIoeCwgeSwgbGFiZWwsIHR5cGUsIHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRTb2NrZXQgZXh0ZW5kcyBTb2NrZXQge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBsYWJlbCwgdHlwZSkge1xuICAgIHN1cGVyKHgsIHksIGxhYmVsLCB0eXBlLCBmYWxzZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluc3RydW1lbnQgfSBmcm9tICcuL2luc3RydW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgQmFuayB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5zdHJ1bWVudHMgPSB7fTtcbiAgfVxuICBsb2FkRnJvbURlZmluaXRpb24oZGVmKSB7XG4gICAgZm9yICh2YXIgaW5zdHJEZWYgb2YgZGVmKSB7XG4gICAgICB2YXIgaW5zdHIgPSBuZXcgSW5zdHJ1bWVudCgpO1xuICAgICAgaW5zdHIubG9hZEZyb21EZWZpbml0aW9uKGluc3RyRGVmKTtcbiAgICAgIGlmIChpbnN0ci5pbnN0cnVtZW50QmFua0luZGV4ICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuaW5zdHJ1bWVudHNbaW5zdHIuaW5zdHJ1bWVudEJhbmtJbmRleF0gPSBpbnN0cjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImV4cG9ydCB7IEJhbmsgfSBmcm9tICcuL2JhbmsuanMnO1xuZXhwb3J0IHsgSW5zdHJ1bWVudCB9IGZyb20gJy4vaW5zdHJ1bWVudC5qcyc7XG5pbXBvcnQgeyBJbnN0cnVtZW50IH0gZnJvbSAnLi9pbnN0cnVtZW50LmpzJztcbmltcG9ydCB7IENoYW5uZWxJbnB1dCwgQ2hhbm5lbE91dHB1dCwgU2FtcGxlR2VuZXJhdG9yLCBGaWx0ZXIsIFRyYW5zcG9zZSwgUGFubmluZ30gZnJvbSAnLi9tb2R1bGVfdW5pdHMnO1xuaW1wb3J0IHsgQnV0dG9uLCBFZGl0b3IsIE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvJztcblxuZXhwb3J0IGNsYXNzIEluc3RydW1lbnRFZGl0b3IgZXh0ZW5kcyBFZGl0b3Ige1xuICBjb25zdHJ1Y3RvcihhcHAsIGluc3RydW1lbnQsIGhhbmRsZUNsb3NlKSB7XG4gICAgc3VwZXIoYXBwLCBpbnN0cnVtZW50LCBoYW5kbGVDbG9zZSk7XG4gICAgaWYgKCFpbnN0cnVtZW50KSB7XG4gICAgICBpbnN0cnVtZW50ID0gbmV3IEluc3RydW1lbnQoW10sIFtdKTtcbiAgICAgIHZhciBtb2R1bGVzID0gW1xuICAgICAgICBuZXcgTW9kdWxlKGluc3RydW1lbnQsIDMwLCAzMCwgbmV3IENoYW5uZWxJbnB1dCgnaW5wdXQnKSksIFxuICAgICAgICBuZXcgTW9kdWxlKGluc3RydW1lbnQsIDgwMCwgMzAsIG5ldyBDaGFubmVsT3V0cHV0KCdvdXRwdXQnKSksXG4gICAgICBdO1xuICAgICAgaW5zdHJ1bWVudC5tb2R1bGVzID0gbW9kdWxlcztcbiAgICB9XG4gICAgdGhpcy50YXJnZXQgPSBpbnN0cnVtZW50O1xuICAgIHZhciBidXR0b25EZWZzID0gW1xuICAgICAgICB7bGFiZWw6IFwiU0lOXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJTUVVcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzcXVhcmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiU0FXXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2F3XCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlRSSVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInRyaWFuZ2xlXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlBXTVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInB1bHNlXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIldBVlwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcIndhdlwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJOT0lcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJ3aGl0ZV9ub2lzZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJHUkFcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJncmFpblwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJWT0NcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJ2b2NvZGVyXCIpfSxcbiAgICBdO1xuICAgIHZhciBmaWx0ZXJEZWZzID0gW1xuICAgICAge2xhYmVsOiBcIkxQRlwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcImxvdyBwYXNzIGZpbHRlclwiKX0sXG4gICAgICB7bGFiZWw6IFwiSFBGXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkRmlsdGVyKFwiaGlnaCBwYXNzIGZpbHRlclwiKX0sXG4gICAgICB7bGFiZWw6IFwiRExZXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkRmlsdGVyKFwiZGVsYXlcIil9LFxuICAgICAge2xhYmVsOiBcIkZMQVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcImZsYW5nZXJcIil9LFxuICAgICAge2xhYmVsOiBcIkRJU1wiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcImRpc3RvcnRpb25cIil9LFxuICAgICAge2xhYmVsOiBcIk9WUlwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcIm92ZXJkcml2ZVwiKX0sXG4gICAgICB7bGFiZWw6IFwiVFJFXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkRmlsdGVyKFwidHJlbWVsb1wiKX0sXG4gICAgXTtcbiAgICB2YXIgZGVyaXZlZERlZnMgPSBbXG4gICAgICB7bGFiZWw6IFwiVFJBXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgVHJhbnNwb3NlKFwidHJhbnNwb3NlXCIpKX0sXG4gICAgICB7bGFiZWw6IFwiUEFOXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUGFubmluZyhcInBhbm5pbmdcIikpfSxcbiAgICBdO1xuICAgIHZhciB4ID0gMTA7XG4gICAgZm9yICh2YXIgZGVmIG9mIGJ1dHRvbkRlZnMpIHtcbiAgICAgIHZhciBiID0gbmV3IEJ1dHRvbih4LCAwLCBkZWYub25jbGljay5iaW5kKHRoaXMpLCBkZWYubGFiZWwpO1xuICAgICAgYi5jb2xvdXIgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVHZW5lcmF0b3I7XG4gICAgICB0aGlzLmJ1dHRvbnMucHVzaChiKTtcbiAgICAgIHggKz0gYi53ICsgMztcbiAgICB9XG4gICAgZm9yICh2YXIgZGVmIG9mIGZpbHRlckRlZnMpIHtcbiAgICAgIHZhciBiID0gbmV3IEJ1dHRvbih4LCAwLCBkZWYub25jbGljay5iaW5kKHRoaXMpLCBkZWYubGFiZWwpO1xuICAgICAgYi5jb2xvdXIgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVGaWx0ZXI7XG4gICAgICB0aGlzLmJ1dHRvbnMucHVzaChiKTtcbiAgICAgIHggKz0gYi53ICsgMztcbiAgICB9XG4gICAgZm9yICh2YXIgZGVmIG9mIGRlcml2ZWREZWZzKSB7XG4gICAgICB2YXIgYiA9IG5ldyBCdXR0b24oeCwgMCwgZGVmLm9uY2xpY2suYmluZCh0aGlzKSwgZGVmLmxhYmVsKTtcbiAgICAgIGIuY29sb3VyID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlRGVyaXZlZDtcbiAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGIpO1xuICAgICAgeCArPSBiLncgKyAzO1xuICAgIH1cbiAgfVxuICBoYW5kbGVBZGRGaWx0ZXIodHlwZSkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IEZpbHRlcih0eXBlKSk7XG4gIH1cbiAgaGFuZGxlQWRkR2VuZXJhdG9yKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBTYW1wbGVHZW5lcmF0b3IodHlwZSkpO1xuICB9XG59XG5cbiIsImltcG9ydCB7IENoYW5uZWxJbnB1dCwgQ2hhbm5lbE91dHB1dCwgRmlsdGVyLCBTYW1wbGVHZW5lcmF0b3IsIFRyYW5zcG9zZSwgUGFubmluZywgRmFjdG9yeSB9IGZyb20gJy4vbW9kdWxlX3VuaXRzJztcbmltcG9ydCB7IFBhdGNoLCBNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBQYXRjaGFibGUsIEFVRElPX1RZUEUsIEZSRVFVRU5DWV9UWVBFLCBQQU5OSU5HX1RZUEUgfSBmcm9tICcuLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgSW5zdHJ1bWVudCBleHRlbmRzIFBhdGNoYWJsZSB7XG4gIGNvbnN0cnVjdG9yKG1vZHVsZXMsIHBhdGNoZXMpIHtcbiAgICBzdXBlcihtb2R1bGVzLCBwYXRjaGVzKTtcbiAgICB0aGlzLm5hbWUgPSBudWxsO1xuICAgIHRoaXMuaW5zdHJ1bWVudEJhbmtJbmRleCA9IG51bGw7XG4gIH1cbiAgbG9hZEZyb21EZWZpbml0aW9uKGluc3RyRGVmKSB7XG4gICAgdmFyIG1vZHVsZXMgPSBbXG4gICAgICBuZXcgTW9kdWxlKHRoaXMsIDEwLCA0MCwgbmV3IENoYW5uZWxJbnB1dCgnaW5wdXQnKSksIFxuICAgICAgbmV3IE1vZHVsZSh0aGlzLCA3MDAsIDQwLCBuZXcgQ2hhbm5lbE91dHB1dCgnb3V0cHV0JykpLFxuICAgIF07XG4gICAgdmFyIHBhdGNoZXMgPSBbXG5cbiAgICBdO1xuICAgIHRoaXMubW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgdGhpcy5wYXRjaGVzID0gcGF0Y2hlcztcbiAgICBpZiAoaW5zdHJEZWYubmFtZSkge1xuICAgICAgdGhpcy5uYW1lID0gaW5zdHJEZWYubmFtZTtcbiAgICB9XG4gICAgaWYgKGluc3RyRGVmLmluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuaW5zdHJ1bWVudEJhbmtJbmRleCA9IGluc3RyRGVmLmluZGV4O1xuICAgIH1cbiAgICB2YXIgaXggPSB0aGlzLmxvYWRHZW5lcmF0b3IoaW5zdHJEZWYsIDAsIDEpO1xuICAgIHRoaXMucGF0Y2hJbnB1dChpeCk7XG4gIH1cbiAgcGF0Y2hJbnB1dChpeCkge1xuICAgIGlmIChpeCkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXgpKSB7XG4gICAgICAgIGZvciAodmFyIGkgb2YgaXgpIHtcbiAgICAgICAgICB0aGlzLnBhdGNoSW5wdXQoaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHMgPSB0aGlzLm1vZHVsZXNbaXhdLnVuaXQuc29ja2V0cztcbiAgICAgIHZhciBjYW5kaWRhdGUgPSBudWxsO1xuICAgICAgaWYgKHMpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKHMpKSB7XG4gICAgICAgICAgaWYgKHNba2V5XS50eXBlID09PSBGUkVRVUVOQ1lfVFlQRSkge1xuICAgICAgICAgICAgY2FuZGlkYXRlID0ga2V5O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkUGF0Y2goaXgsIDAsIFwiRlJFUVwiLCBjYW5kaWRhdGUsIEZSRVFVRU5DWV9UWVBFKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbG9hZEdlbmVyYXRvcihpbnN0ckRlZiwgaW5wdXQsIG91dHB1dCkge1xuICAgIGlmIChpbnN0ckRlZltcImNvbWJpbmVkXCJdKSB7XG4gICAgICB2YXIgZ3MgPSBbXTtcbiAgICAgIGZvciAodmFyIGlEZWYgb2YgaW5zdHJEZWZbXCJjb21iaW5lZFwiXSkge1xuICAgICAgICB2YXIgaXggPSB0aGlzLmxvYWRHZW5lcmF0b3IoaURlZiwgaW5wdXQsIG91dHB1dCk7XG4gICAgICAgIGlmIChpeCkge1xuICAgICAgICAgIGdzLnB1c2goaXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZ3M7XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInBhbm5pbmdcIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IFBhbm5pbmcoXCJwYW5uaW5nXCIpO1xuICAgICAgdmFyIHRJeCA9IHRoaXMuYWRkTW9kdWxlKGcpO1xuICAgICAgdmFyIGl4ID0gdGhpcy5sb2FkR2VuZXJhdG9yKGluc3RyRGVmW1wicGFubmluZ1wiXSwgaW5wdXQsIG91dHB1dCk7XG4gICAgICB0aGlzLmFkZFBhdGNoKHRJeCwgaXgsIFwiUEFOXCIsIFwiUEFOXCIsIFBBTk5JTkdfVFlQRSk7XG4gICAgICB0aGlzLmFkZFBhdGNoKGlucHV0LCB0SXgsIFwiRlJFUVwiLCBcIkZSRVFcIiwgRlJFUVVFTkNZX1RZUEUpO1xuICAgICAgcmV0dXJuIGl4O1xuICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJ0cmFuc3Bvc2VcIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IFRyYW5zcG9zZShcInRyYW5zcG9zZVwiKTtcbiAgICAgIGcuZGlhbHNbXCJzZW1pdG9uZXNcIl0udmFsdWUgPSBpbnN0ckRlZltcInRyYW5zcG9zZVwiXVtcInNlbWl0b25lc1wiXSB8fCAwO1xuICAgICAgdmFyIHRJeCA9IHRoaXMuYWRkTW9kdWxlKGcpO1xuICAgICAgdmFyIGl4ID0gdGhpcy5sb2FkR2VuZXJhdG9yKGluc3RyRGVmW1widHJhbnNwb3NlXCJdLCB0SXgsIG91dHB1dCk7XG4gICAgICB0aGlzLmFkZFBhdGNoKHRJeCwgaXgsIFwiRlJFUVwiLCBcIkZSRVFcIiwgRlJFUVVFTkNZX1RZUEUpO1xuICAgICAgdGhpcy5hZGRQYXRjaChpbnB1dCwgdEl4LCBcIkZSRVFcIiwgXCJGUkVRIElOXCIsIEZSRVFVRU5DWV9UWVBFKTtcbiAgICAgIHJldHVybiBpeDtcbiAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1wic2luZVwiXSBcbiAgICAgIHx8IGluc3RyRGVmW1widHJpYW5nbGVcIl0gXG4gICAgICB8fCBpbnN0ckRlZltcInNxdWFyZVwiXSBcbiAgICAgIHx8IGluc3RyRGVmW1wic2F3dG9vdGhcIl0gXG4gICAgICB8fCBpbnN0ckRlZltcIndoaXRlX25vaXNlXCJdXG4gICAgICB8fCBpbnN0ckRlZltcInB1bHNlXCJdXG4gICAgICB8fCBpbnN0ckRlZltcIndhdlwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgRmFjdG9yeSgpLmdlbmVyYXRvckZyb21EZWZpbml0aW9uKGluc3RyRGVmKTtcbiAgICAgIHZhciBpeCA9IHRoaXMuYWRkTW9kdWxlKGcpO1xuICAgICAgdGhpcy5hZGRQYXRjaChpeCwgb3V0cHV0LCBcIk9VVFwiLCBcIklOXCIsIEFVRElPX1RZUEUpO1xuICAgICAgcmV0dXJuIGl4O1xuICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJ2b2NvZGVyXCJdKSB7XG4gICAgICB2YXIgc291cmNlID0gbmV3IEZhY3RvcnkoKS5nZW5lcmF0b3JGcm9tRGVmaW5pdGlvbihpbnN0ckRlZltcInZvY29kZXJcIl1bXCJzb3VyY2VcIl0pXG4gICAgICB2YXIgdm9jb2RlciA9IG5ldyBGYWN0b3J5KCkuZ2VuZXJhdG9yRnJvbURlZmluaXRpb24oaW5zdHJEZWZbXCJ2b2NvZGVyXCJdW1widm9jb2RlclwiXSlcbiAgICAgIHJldHVybiBbXTtcbiAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1wiZmlsdGVyXCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBGYWN0b3J5KCkuZmlsdGVyRnJvbURlZmluaXRpb24oaW5zdHJEZWZbXCJmaWx0ZXJcIl0pXG4gICAgICB2YXIgdEl4ID0gdGhpcy5hZGRNb2R1bGUoZyk7XG4gICAgICB2YXIgaXggPSB0aGlzLmxvYWRHZW5lcmF0b3IoaW5zdHJEZWZbXCJmaWx0ZXJcIl0sIGlucHV0LCB0SXgpO1xuICAgICAgdGhpcy5hZGRQYXRjaCh0SXgsIG91dHB1dCwgXCJPVVRcIiwgXCJJTlwiLCBBVURJT19UWVBFKTtcbiAgICAgIHJldHVybiBpeDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coaW5zdHJEZWYpO1xuICAgICAgdGhyb3cgJ1Vua25vd24gaW5zdHJ1bWVudCBkZWYnO1xuICAgIH1cbiAgfVxuICBhZGRNb2R1bGUoZ2VuZXJhdG9yKSB7XG4gICAgdmFyIG0gPSBuZXcgTW9kdWxlKHRoaXMsIE1hdGgucmFuZG9tKCkgKiA4MDAgKyAxMDAsIE1hdGgucmFuZG9tKCkgKiA2MDAsIGdlbmVyYXRvcik7XG4gICAgdGhpcy5tb2R1bGVzLnB1c2gobSk7XG4gICAgcmV0dXJuIHRoaXMubW9kdWxlcy5sZW5ndGggLSAxO1xuICB9XG4gIGFkZFBhdGNoKGZyb21Nb2R1bGUsIHRvTW9kdWxlLCBmcm9tU29ja2V0LCB0b1NvY2tldCwgdHlwZSkge1xuICAgIGNvbnNvbGUubG9nKFwiQURkaW5nIHBhdGNoXCIsIGZyb21Nb2R1bGUsIHRvTW9kdWxlLCBmcm9tU29ja2V0LCB0b1NvY2tldCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodG9Nb2R1bGUpKSB7XG4gICAgICBmb3IgKHZhciB0byBvZiB0b01vZHVsZSkge1xuICAgICAgICB0aGlzLmFkZFBhdGNoKGZyb21Nb2R1bGUsIHRvLCBmcm9tU29ja2V0LCB0b1NvY2tldCwgdHlwZSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBwID0gbmV3IFBhdGNoKGZyb21Nb2R1bGUsIHRvTW9kdWxlLCBmcm9tU29ja2V0LCB0b1NvY2tldCwgdHlwZSk7XG4gICAgdGhpcy5wYXRjaGVzLnB1c2gocCk7XG4gIH1cbiAgbG9hZChpbnN0ckRlZikge1xuICAgIHZhciBtb2R1bGVzID0gW107XG4gICAgZm9yICh2YXIgbSBvZiBpbnN0ckRlZi5tb2R1bGVzKSB7XG4gICAgICB2YXIgZyA9IG51bGw7XG4gICAgICBpZiAobS50eXBlID09IFwiaW5wdXRcIikge1xuICAgICAgICBnID0gbmV3IENoYW5uZWxJbnB1dChtLnR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChtLnR5cGUgPT0gXCJvdXRwdXRcIikge1xuICAgICAgICBnID0gbmV3IENoYW5uZWxPdXRwdXQobS50eXBlKTtcbiAgICAgIH0gZWxzZSBpZiAobS50eXBlID09IFwibG93IHBhc3MgZmlsdGVyXCIpIHtcbiAgICAgICAgZyA9IG5ldyBGaWx0ZXIobS50eXBlKTtcbiAgICAgIH0gZWxzZSBpZiAobS50eXBlID09IFwic2luZVwiIHx8IG0udHlwZSA9PSBcInRyaWFuZ2xlXCIpIHtcbiAgICAgICAgZyA9IG5ldyBTYW1wbGVHZW5lcmF0b3IobS50eXBlKTtcbiAgICAgIH1cbiAgICAgIGlmIChnKSB7XG4gICAgICAgIHZhciBtb2QgPSBuZXcgTW9kdWxlKHRoaXMsIG0ueCwgbS55LCBnKTtcbiAgICAgICAgbW9kdWxlcy5wdXNoKG1vZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBwYXRjaGVzID0gW107XG4gICAgZm9yICh2YXIgcCBvZiBpbnN0ckRlZi5wYXRjaGVzKSB7XG4gICAgICB0aGlzLmFkZFBhdGNoKHAuZnJvbV9tb2R1bGUsIHAudG9fbW9kdWxlLCBwLmZyb21fc29ja2V0LCBwLnRvX3NvY2tldCk7XG4gICAgfVxuICAgIHRoaXMubW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgdGhpcy5wYXRjaGVzID0gcGF0Y2hlcztcbiAgfVxuXG4gIGNvbXBpbGUoKSB7XG4gICAgdmFyIG91dHB1dCA9IG51bGw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBtID0gdGhpcy5tb2R1bGVzW2ldO1xuICAgICAgaWYgKG0udW5pdC50eXBlID09IFwib3V0cHV0XCIpIHtcbiAgICAgICAgb3V0cHV0ID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBxdWV1ZSA9IFtvdXRwdXRdO1xuICAgIHZhciBzZWVuID0ge307XG4gICAgdmFyIGRlcGVuZGVuY2llcyA9IFtdO1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgcSA9IHF1ZXVlWzBdO1xuICAgICAgdmFyIHF1ZXVlID0gcXVldWUuc3BsaWNlKDEpO1xuICAgICAgaWYgKHNlZW5bcV0pIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGRlcGVuZGVuY2llcy5wdXNoKHEpO1xuICAgICAgZm9yICh2YXIgcCBvZiB0aGlzLnBhdGNoZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vZHVsZXNbcV0pIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkJpZyB0cm91YmxlczogdHJ5aW5nIHRvIHJlYWNoIG5vbiBleGlzdGVudCBtb2R1bGU6XCIsIGl4KTtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIHZhciBtb2RTb2NrZXRzID0gdGhpcy5tb2R1bGVzW3FdLnVuaXQuc29ja2V0cztcbiAgICAgICAgaWYgKHAudG8gPT09IHEgJiYgbW9kU29ja2V0c1twLnRvU29ja2V0XSAmJiBtb2RTb2NrZXRzW3AudG9Tb2NrZXRdLmlzSW5wdXQpIHtcbiAgICAgICAgICBpZiAoIXNlZW5bcC5mcm9tXSkge1xuICAgICAgICAgICAgcXVldWUucHVzaChwLmZyb20pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwLmZyb20gPT09IHEgJiYgbW9kU29ja2V0c1twLmZyb21Tb2NrZXRdICYmIG1vZFNvY2tldHNbcC5mcm9tU29ja2V0XS5pc0lucHV0KSB7XG4gICAgICAgICAgaWYgKCFzZWVuW3AudG9dKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKHAudG8pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2VlbltxXSA9IHRydWU7XG4gICAgfVxuICAgIHZhciBnZW5lcmF0b3JzID0ge307XG4gICAgZm9yICh2YXIgaSA9IGRlcGVuZGVuY2llcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGl4ID0gZGVwZW5kZW5jaWVzW2ldO1xuICAgICAgaWYgKCF0aGlzLm1vZHVsZXNbaXhdKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmlnIHRyb3VibGVzOiB0cnlpbmcgdG8gcmVhY2ggbm9uIGV4aXN0ZW50IG1vZHVsZTpcIiwgaXgpO1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgdmFyIHVuaXQgPSB0aGlzLm1vZHVsZXNbaXhdLnVuaXQ7XG4gICAgICB2YXIgZyA9IG51bGw7XG4gICAgICBpZiAodW5pdC50eXBlID09IFwiaW5wdXRcIikge1xuICAgICAgICBnID0gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAodW5pdC50eXBlID09IFwid2F2XCIpIHtcbiAgICAgICAgZyA9IHtcIndhdlwiOiB7XG4gICAgICAgICAgXCJmaWxlXCI6IFwiXCIsXG4gICAgICAgIH19O1xuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJ0cmlhbmdsZVwiIFxuICAgICAgICB8fCB1bml0LnR5cGUgPT0gXCJzaW5lXCIgXG4gICAgICAgIHx8IHVuaXQudHlwZSA9PSBcInNhd1wiIFxuICAgICAgICB8fCB1bml0LnR5cGUgPT0gXCJzcXVhcmVcIiBcbiAgICAgICAgfHwgdW5pdC50eXBlID09IFwid2hpdGVfbm9pc2VcIikge1xuICAgICAgICBnID0ge307XG4gICAgICAgIGdbdW5pdC50eXBlXSA9IHtcbiAgICAgICAgICBcImdhaW5cIjogdW5pdC5kaWFsc1tcImdhaW5cIl0udmFsdWUsXG4gICAgICAgICAgXCJwYW5uaW5nXCI6IHVuaXQuZGlhbHNbXCJwYW5uaW5nXCJdLnZhbHVlLFxuICAgICAgICAgIFwiYXR0YWNrXCI6IHVuaXQuZGlhbHNbXCJhdHRhY2tcIl0udmFsdWUsXG4gICAgICAgICAgXCJkZWNheVwiOiB1bml0LmRpYWxzW1wiZGVjYXlcIl0udmFsdWUsXG4gICAgICAgICAgXCJzdXN0YWluXCI6IHVuaXQuZGlhbHNbXCJzdXN0YWluXCJdLnZhbHVlLFxuICAgICAgICAgIFwicmVsZWFzZVwiOiB1bml0LmRpYWxzW1wicmVsZWFzZVwiXS52YWx1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBpdGNoRm91bmQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgcCBvZiB0aGlzLnBhdGNoZXMpIHtcbiAgICAgICAgICBpZiAocC5kb2VzUGF0Y2hDb25uZWN0VG8oaXgsIFwiRlJFUVwiKSkge1xuICAgICAgICAgICAgcGl0Y2hGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcGcgPSBnZW5lcmF0b3JzW3AuY29ubmVjdHNUbyhpeCwgXCJGUkVRXCIpLm1vZHVsZV07XG4gICAgICAgICAgICBpZiAocGcpIHtcbiAgICAgICAgICAgICAgZ1t1bml0LnR5cGVdW1wiYXV0b19waXRjaFwiXSA9IHBnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXBpdGNoRm91bmQpIHtcbiAgICAgICAgICBnW3VuaXQudHlwZV1bXCJwaXRjaFwiXSA9IHVuaXQuZGlhbHNbXCJwaXRjaFwiXS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJsb3cgcGFzcyBmaWx0ZXJcIikge1xuICAgICAgICBnID0ge307XG4gICAgICAgIGdbXCJmaWx0ZXJcIl0gPSB7XCJscGZcIjoge1wiY3V0b2ZmXCI6IHVuaXQuZGlhbHNbXCJjdXRvZmZcIl0udmFsdWV9fVxuICAgICAgICB2YXIgb24gPSB0aGlzLmNvbXBpbGVHZW5lcmF0b3JzKGdlbmVyYXRvcnMsIGl4LCBcIklOXCIpO1xuICAgICAgICBPYmplY3Qua2V5cyhvbikubWFwKChrKSA9PiB7XG4gICAgICAgICAgZ1tcImZpbHRlclwiXVtrXSA9IG9uW2tdO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodW5pdC50eXBlID09IFwiaGlnaCBwYXNzIGZpbHRlclwiKSB7XG4gICAgICAgIGcgPSB7fTtcbiAgICAgICAgZ1tcImZpbHRlclwiXSA9IHtcImhwZlwiOiB7XCJjdXRvZmZcIjogdW5pdC5kaWFsc1tcImN1dG9mZlwiXS52YWx1ZX19XG4gICAgICAgIHZhciBvbiA9IHRoaXMuY29tcGlsZUdlbmVyYXRvcnMoZ2VuZXJhdG9ycywgaXgsIFwiSU5cIik7XG4gICAgICAgIE9iamVjdC5rZXlzKG9uKS5tYXAoKGspID0+IHtcbiAgICAgICAgICBnW1wiZmlsdGVyXCJdW2tdID0gb25ba107XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJ0cmFuc3Bvc2VcIikge1xuICAgICAgICBnID0ge1widHJhbnNwb3NlXCI6IHtcbiAgICAgICAgICBcInNlbWl0b25lc1wiOiB1bml0LmRpYWxzW1wic2VtaXRvbmVzXCJdLnZhbHVlLFxuICAgICAgICB9fVxuICAgICAgICB2YXIgb24gPSB0aGlzLmNvbXBpbGVHZW5lcmF0b3JzKGdlbmVyYXRvcnMsIGl4LCBcIkZSRVEgSU5cIik7XG4gICAgICAgIGlmIChvbikge1xuICAgICAgICAgIE9iamVjdC5rZXlzKG9uKS5tYXAoKGspID0+IHtcbiAgICAgICAgICAgIGdbXCJ0cmFuc3Bvc2VcIl1ba10gPSBvbltrXTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJwYW5uaW5nXCIpIHtcbiAgICAgICAgZyA9IHtcInBhbm5pbmdcIjoge319XG4gICAgICAgIHZhciBvbiA9IHRoaXMuY29tcGlsZUdlbmVyYXRvcnMoZ2VuZXJhdG9ycywgaXgsIFwiRlJFUSBJTlwiKTtcbiAgICAgICAgaWYgKG9uKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMob24pLm1hcCgoaykgPT4ge1xuICAgICAgICAgICAgZ1tcInBhbm5pbmdcIl1ba10gPSBvbltrXTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJvdXRwdXRcIikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5jb21waWxlR2VuZXJhdG9ycyhnZW5lcmF0b3JzLCBpeCwgXCJJTlwiKTtcbiAgICAgICAgaWYgKHRoaXMubmFtZSkge1xuICAgICAgICAgIHJlc3VsdC5uYW1lID0gdGhpcy5uYW1lXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW5zdHJ1bWVudEJhbmtJbmRleCkge1xuICAgICAgICAgIHJlc3VsdC5pbmRleCA9IHRoaXMuaW5zdHJ1bWVudEJhbmtJbmRleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgZ2VuZXJhdG9yc1tpeF0gPSBnO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbXBpbGVHZW5lcmF0b3JzKGdlbmVyYXRvcnMsIGl4LCBpbnB1dCkge1xuICAgIHZhciBncyA9IFtdO1xuICAgIGZvciAodmFyIHAgb2YgdGhpcy5wYXRjaGVzKSB7XG4gICAgICBpZiAocC5kb2VzUGF0Y2hDb25uZWN0VG8oaXgsIGlucHV0KSkge1xuICAgICAgICBncy5wdXNoKGdlbmVyYXRvcnNbcC5jb25uZWN0c1RvKGl4LCBpbnB1dCkubW9kdWxlXSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIGlmIChncy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBnc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcImNvbWJpbmVkXCI6IGdzfVxuICAgIH1cbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBNb2R1bGVVbml0LCBPdXRwdXRTb2NrZXQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBGUkVRVUVOQ1lfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBDaGFubmVsSW5wdXQgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiRlJFUVwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJGUkVRXCIsIEZSRVFVRU5DWV9UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZU91dHB1dCc7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZVVuaXQsIElucHV0U29ja2V0IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgQVVESU9fVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cblxuZXhwb3J0IGNsYXNzIENoYW5uZWxPdXRwdXQgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiSU5cIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJJTlwiLCBBVURJT19UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZU91dHB1dCc7XG4gIH1cbn1cblxuIiwiXG5pbXBvcnQgeyBTYW1wbGVHZW5lcmF0b3IsIFdhdkdlbmVyYXRvciB9IGZyb20gJy4vc2FtcGxlX2dlbmVyYXRvci5qcyc7XG5pbXBvcnQgeyBGaWx0ZXIgfSBmcm9tICcuL2ZpbHRlci5qcyc7XG5cbmV4cG9ydCBjbGFzcyBGYWN0b3J5IHtcblxuICBnZW5lcmF0b3JGcm9tRGVmaW5pdGlvbihpbnN0ckRlZikge1xuXG4gICAgaWYgKGluc3RyRGVmW1wic2luZVwiXSBcbiAgICAgIHx8IGluc3RyRGVmW1widHJpYW5nbGVcIl0gXG4gICAgICB8fCBpbnN0ckRlZltcInNxdWFyZVwiXSBcbiAgICAgIHx8IGluc3RyRGVmW1wic2F3dG9vdGhcIl0gXG4gICAgICB8fCBpbnN0ckRlZltcIndoaXRlX25vaXNlXCJdKSB7XG4gICAgICB2YXIgdHlwID0gXCJ0cmlhbmdsZVwiO1xuICAgICAgdmFyIGluc3RyID0gbnVsbDtcbiAgICAgIGlmIChpbnN0ckRlZltcInRyaWFuZ2xlXCJdKSB7XG4gICAgICAgIGluc3RyID0gaW5zdHJEZWZbXCJ0cmlhbmdsZVwiXTtcbiAgICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJzaW5lXCJdKSB7XG4gICAgICAgIGluc3RyID0gaW5zdHJEZWZbXCJzaW5lXCJdO1xuICAgICAgICB0eXAgPSBcInNpbmVcIjtcbiAgICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJzcXVhcmVcIl0pIHtcbiAgICAgICAgaW5zdHIgPSBpbnN0ckRlZltcInNxdWFyZVwiXTtcbiAgICAgICAgdHlwID0gXCJzcXVhcmVcIjtcbiAgICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJzYXd0b290aFwiXSkge1xuICAgICAgICBpbnN0ciA9IGluc3RyRGVmW1wic2F3dG9vdGhcIl07XG4gICAgICAgIHR5cCA9IFwic2F3XCI7XG4gICAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1wid2hpdGVfbm9pc2VcIl0pIHtcbiAgICAgICAgaW5zdHIgPSBpbnN0ckRlZltcIndoaXRlX25vaXNlXCJdO1xuICAgICAgICB0eXAgPSBcIndoaXRlX25vaXNlXCI7XG4gICAgICB9XG4gICAgICB2YXIgZyA9IG5ldyBTYW1wbGVHZW5lcmF0b3IodHlwKVxuICAgICAgZy5kaWFsc1tcImF0dGFja1wiXS52YWx1ZSA9IGluc3RyW1wiYXR0YWNrXCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJkZWNheVwiXS52YWx1ZSA9IGluc3RyW1wiZGVjYXlcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcInN1c3RhaW5cIl0udmFsdWUgPSBpbnN0cltcInN1c3RhaW5cIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcInJlbGVhc2VcIl0udmFsdWUgPSBpbnN0cltcInJlbGVhc2VcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcImdhaW5cIl0udmFsdWUgPSBpbnN0cltcImdhaW5cIl0gfHwgMS4wO1xuICAgICAgcmV0dXJuIGc7XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcIndhdlwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgV2F2R2VuZXJhdG9yKCk7XG4gICAgICB2YXIgaW5zdHIgPSBpbnN0ckRlZltcIndhdlwiXTtcbiAgICAgIGcuZGlhbHNbXCJhdHRhY2tcIl0udmFsdWUgPSBpbnN0cltcImF0dGFja1wiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wiZGVjYXlcIl0udmFsdWUgPSBpbnN0cltcImRlY2F5XCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJzdXN0YWluXCJdLnZhbHVlID0gaW5zdHJbXCJzdXN0YWluXCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJyZWxlYXNlXCJdLnZhbHVlID0gaW5zdHJbXCJyZWxlYXNlXCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJnYWluXCJdLnZhbHVlID0gaW5zdHJbXCJnYWluXCJdIHx8IDEuMDtcbiAgICAgIHJldHVybiBnO1xuICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJwdWxzZVwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgU2FtcGxlR2VuZXJhdG9yKFwicHVsc2VcIik7XG4gICAgICB2YXIgaW5zdHIgPSBpbnN0ckRlZltcInB1bHNlXCJdO1xuICAgICAgZy5kaWFsc1tcImF0dGFja1wiXS52YWx1ZSA9IGluc3RyW1wiYXR0YWNrXCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJkZWNheVwiXS52YWx1ZSA9IGluc3RyW1wiZGVjYXlcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcInN1c3RhaW5cIl0udmFsdWUgPSBpbnN0cltcInN1c3RhaW5cIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcInJlbGVhc2VcIl0udmFsdWUgPSBpbnN0cltcInJlbGVhc2VcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcImdhaW5cIl0udmFsdWUgPSBpbnN0cltcImdhaW5cIl0gfHwgMS4wO1xuICAgICAgcmV0dXJuIGc7XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyRnJvbURlZmluaXRpb24oZmlsdGVyRGVmKSB7XG4gICAgaWYgKGZpbHRlckRlZltcImxwZlwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgRmlsdGVyKFwibG93IHBhc3MgZmlsdGVyXCIpXG4gICAgICBnLmRpYWxzW1wiY3V0b2ZmXCJdLnZhbHVlID0gZmlsdGVyRGVmW1wibHBmXCJdW1wiY3V0b2ZmXCJdIHx8IDUwMDA7XG4gICAgICByZXR1cm4gZztcbiAgICB9IGVsc2UgaWYgKGZpbHRlckRlZltcImRpc3RvcnRpb25cIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IEZpbHRlcihcImRpc3RvcnRpb25cIilcbiAgICAgIHJldHVybiBnO1xuICAgIH0gZWxzZSBpZiAoZmlsdGVyRGVmW1wib3ZlcmRyaXZlXCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBGaWx0ZXIoXCJvdmVyZHJpdmVcIilcbiAgICAgIHJldHVybiBnO1xuICAgIH0gZWxzZSBpZiAoZmlsdGVyRGVmW1wiZmxhbmdlclwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgRmlsdGVyKFwiZmxhbmdlclwiKVxuICAgICAgcmV0dXJuIGc7XG4gICAgfSBlbHNlIGlmIChmaWx0ZXJEZWZbXCJhdmVyYWdlXCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBGaWx0ZXIoXCJhdmVyYWdlXCIpXG4gICAgICByZXR1cm4gZztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coZmlsdGVyRGVmKTtcbiAgICAgIHRocm93ICdVbmtub3duIGZpbHRlciBkZWYnO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IEFVRElPX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgRmlsdGVyIGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIklOXCI6IG5ldyBJbnB1dFNvY2tldCgyOSwgdGhpcy5oIC0gMjksIFwiSU5cIiwgQVVESU9fVFlQRSksXG4gICAgICBcIk9VVFwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJPVVRcIiwgQVVESU9fVFlQRSksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVGaWx0ZXInO1xuICAgIHRoaXMuZGlhbHMgPSB7IH1cblxuICAgIGlmICh0eXBlID09PSBcImxvdyBwYXNzIGZpbHRlclwiIHx8IHR5cGUgPT09IFwiaGlnaCBwYXNzIGZpbHRlclwiKSB7XG4gICAgICB0aGlzLncgPSAxNTA7XG4gICAgICB0aGlzLmRpYWxzW1wiY3V0b2ZmXCJdID0gbmV3IERpYWwoMjksIDU5LCBcIkNVVE9GRlwiLCAxLjAsIDIyMDAwLjAsIDUwMDAuMCk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcImRlbGF5XCIpIHtcbiAgICAgIHRoaXMudyA9IDE3MDtcbiAgICAgIHRoaXMuZGlhbHNbXCJ0aW1lXCJdID0gbmV3IERpYWwoMjksIDU5LCBcIlRJTUVcIiwgMC4wMDAwMSwgNC4wLCAxLjApO1xuICAgICAgdGhpcy5kaWFsc1tcImZhY3RvclwiXSA9IG5ldyBEaWFsKDc5LCA1OSwgXCJGQUNUT1JcIiwgMC4wLCAyLjAsIDEuMCk7XG4gICAgICB0aGlzLmRpYWxzW1wiZmVlZGJhY2tcIl0gPSBuZXcgRGlhbCgxMjksIDU5LCBcIkZFRURCQUNLXCIsIDAuMCwgMi4wLCAwLjApO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IHsgQ2hhbm5lbElucHV0IH0gZnJvbSAnLi9jaGFubmVsX2lucHV0LmpzJztcbmV4cG9ydCB7IENoYW5uZWxPdXRwdXQgfSBmcm9tICcuL2NoYW5uZWxfb3V0cHV0LmpzJztcbmV4cG9ydCB7IEZpbHRlciB9IGZyb20gJy4vZmlsdGVyLmpzJztcbmV4cG9ydCB7IFNhbXBsZUdlbmVyYXRvciB9IGZyb20gJy4vc2FtcGxlX2dlbmVyYXRvci5qcyc7XG5leHBvcnQgeyBUcmFuc3Bvc2UgfSBmcm9tICcuL3RyYW5zcG9zZS5qcyc7XG5leHBvcnQgeyBQYW5uaW5nIH0gZnJvbSAnLi9wYW5uaW5nLmpzJztcbmV4cG9ydCB7IEZhY3RvcnkgfSBmcm9tICcuL2ZhY3RvcnkuanMnO1xuIiwiaW1wb3J0IHsgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCwgRGlhbCwgTW9kdWxlVW5pdCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IEZSRVFVRU5DWV9UWVBFLCBQQU5OSU5HX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgUGFubmluZyBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgc3VwZXIodHlwZSk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZURlcml2ZWQnO1xuICAgIHRoaXMudyA9IDEyMDtcbiAgICB0aGlzLmggPSAxNTA7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJGUkVRXCI6IG5ldyBJbnB1dFNvY2tldCgyOSwgdGhpcy5oIC0gMjksIFwiRlJFUVwiLCBGUkVRVUVOQ1lfVFlQRSksXG4gICAgICBcIlBBTlwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJQQU5cIiwgUEFOTklOR19UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscyA9IHtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IElucHV0U29ja2V0LCBPdXRwdXRTb2NrZXQsIERpYWwsIE1vZHVsZVVuaXQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBGUkVRVUVOQ1lfVFlQRSwgQVVESU9fVFlQRSwgUEFOTklOR19UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFNhbXBsZUdlbmVyYXRvciBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgc3VwZXIodHlwZSk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZUdlbmVyYXRvcic7XG4gICAgdGhpcy53ID0gMjIwO1xuICAgIHRoaXMuaCA9IDI1MDtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIkZSRVFcIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJGUkVRXCIsIEZSRVFVRU5DWV9UWVBFKSxcbiAgICAgIFwiUEFOXCI6IG5ldyBJbnB1dFNvY2tldCg3OSwgdGhpcy5oIC0gMjksIFwiUEFOXCIsIFBBTk5JTkdfVFlQRSksXG4gICAgICBcIk9VVFwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJPVVRcIiwgQVVESU9fVFlQRSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgICBcInBpdGNoXCI6IG5ldyBEaWFsKDI5LCA0OSwgXCJGUkVRXCIsIDAuMCwgMjIwMDAuMCwgMC4wKSxcbiAgICAgIFwiZ2FpblwiOiBuZXcgRGlhbCg3OSwgNDksIFwiR0FJTlwiLCAwLjAsIDQuMCwgMS4wKSxcbiAgICAgIFwicGFubmluZ1wiOiBuZXcgRGlhbCgxMjksIDQ5LCBcIlBBTlwiLCAwLjAsIDEuMCwgMC41KSxcbiAgICAgIFwiYXR0YWNrXCI6IG5ldyBEaWFsKDI5LCAxMjAsIFwiQVRUQUNLXCIsIDAuMCwgMTAuMCwgMC4xKSxcbiAgICAgIFwiZGVjYXlcIjogbmV3IERpYWwoNzksIDEyMCwgXCJERUNBWVwiLCAwLjAsIDEwLjAsIDAuMSksXG4gICAgICBcInN1c3RhaW5cIjogbmV3IERpYWwoMTI5LCAxMjAsIFwiU1VTVEFJTlwiLCAwLjAsIDEuMCwgMC44KSxcbiAgICAgIFwicmVsZWFzZVwiOiBuZXcgRGlhbCgxNzksIDEyMCwgXCJSRUxFQVNFXCIsIDAuMCwgMTAsIDAuMSksXG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFdhdkdlbmVyYXRvciBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcIndhdlwiKTtcbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlR2VuZXJhdG9yJztcbiAgICB0aGlzLncgPSAyMjA7XG4gICAgdGhpcy5oID0gMjUwO1xuICAgIC8vIFRPRE86IGZpbGUgaW5wdXQgYW5kIGlzX3BpdGNoZWQgYm9vbGVhblxuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiRlJFUVwiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIkZSRVFcIiwgRlJFUVVFTkNZX1RZUEUpLFxuICAgICAgXCJQQU5cIjogbmV3IElucHV0U29ja2V0KDc5LCB0aGlzLmggLSAyOSwgXCJQQU5cIiwgUEFOTklOR19UWVBFKSxcbiAgICAgIFwiT1VUXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIk9VVFwiLCBBVURJT19UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscyA9IHtcbiAgICAgIFwicGl0Y2hcIjogbmV3IERpYWwoMjksIDQ5LCBcIkZSRVFcIiwgMC4wLCAyMjAwMC4wLCAwLjApLFxuICAgICAgXCJnYWluXCI6IG5ldyBEaWFsKDc5LCA0OSwgXCJHQUlOXCIsIDAuMCwgNC4wLCAxLjApLFxuICAgICAgXCJwYW5uaW5nXCI6IG5ldyBEaWFsKDEyOSwgNDksIFwiUEFOXCIsIDAuMCwgMS4wLCAwLjUpLFxuICAgICAgXCJhdHRhY2tcIjogbmV3IERpYWwoMjksIDEyMCwgXCJBVFRBQ0tcIiwgMC4wLCAxMC4wLCAwLjEpLFxuICAgICAgXCJkZWNheVwiOiBuZXcgRGlhbCg3OSwgMTIwLCBcIkRFQ0FZXCIsIDAuMCwgMTAuMCwgMC4xKSxcbiAgICAgIFwic3VzdGFpblwiOiBuZXcgRGlhbCgxMjksIDEyMCwgXCJTVVNUQUlOXCIsIDAuMCwgMS4wLCAwLjgpLFxuICAgICAgXCJyZWxlYXNlXCI6IG5ldyBEaWFsKDE3OSwgMTIwLCBcIlJFTEVBU0VcIiwgMC4wLCAxMCwgMC4xKSxcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IElucHV0U29ja2V0LCBPdXRwdXRTb2NrZXQsIERpYWwsIE1vZHVsZVVuaXQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBGUkVRVUVOQ1lfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBUcmFuc3Bvc2UgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVEZXJpdmVkJztcbiAgICB0aGlzLncgPSAxMjA7XG4gICAgdGhpcy5oID0gMTUwO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiRlJFUSBJTlwiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIkZSRVEgSU5cIiwgRlJFUVVFTkNZX1RZUEUpLFxuICAgICAgXCJGUkVRXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIkZSRVFcIiwgRlJFUVVFTkNZX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmRpYWxzID0ge1xuICAgICAgXCJzZW1pdG9uZXNcIjogbmV3IERpYWwoMjksIDQ5LCBcIlNFTUlUT05FU1wiLCAtMjQsIDI0LCAwLjApLFxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgVGhlbWUgfSBmcm9tICcuL3RoZW1lLmpzJztcbmltcG9ydCB7IEluc3RydW1lbnRFZGl0b3IsIEluc3RydW1lbnQsIEJhbmsgfSBmcm9tICcuL2luc3RydW1lbnRfZWRpdG9yLyc7XG5pbXBvcnQgeyBUaW1lbGluZUVkaXRvciwgQ2hhbm5lbCB9IGZyb20gJy4vdGltZWxpbmVfZWRpdG9yLyc7XG5pbXBvcnQgeyBTZXF1ZW5jZUVkaXRvciB9IGZyb20gJy4vc2VxdWVuY2VfZWRpdG9yLyc7XG5pbXBvcnQgeyBBUEkgfSBmcm9tICcuL2FwaS8nO1xuXG5leHBvcnQgY2xhc3MgQmxlZXAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XG4gICAgdGhpcy50aGVtZSA9IG5ldyBUaGVtZSgpO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLmNhbnZhcy5vbm1vdXNlZG93biA9IHRoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQodGhpcylcbiAgICB0aGlzLmNhbnZhcy5vbm1vdXNldXAgPSB0aGlzLmhhbmRsZU1vdXNlVXAuYmluZCh0aGlzKVxuICAgIHRoaXMuY2FudmFzLm9ubW91c2Vtb3ZlID0gdGhpcy5oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKVxuICAgIHRoaXMuc2VsZWN0ZWRFbGVtID0gbnVsbDtcbiAgICB0aGlzLnN0YXJ0U2VsZWN0ZWRQb3MgPSB7fTtcbiAgICB0aGlzLnNlbGVjdGVkUG9zID0ge307XG4gICAgdGhpcy5hcGkgPSBuZXcgQVBJKHRoaXMpO1xuICAgIHRoaXMuYXBpLnN0YXJ0KCk7XG4gICAgdGhpcy5jaGFubmVscyA9IFtuZXcgQ2hhbm5lbCgxLCB0aGlzLm9wZW5JbnN0cnVtZW50RWRpdG9yLmJpbmQodGhpcykpXTtcbiAgICB2YXIgYmFuayA9IHRoaXMubG9hZEluc3RydW1lbnRCYW5rKGluc3RydW1lbnRCYW5rKTtcbiAgICAvL3RoaXMubG9hZChleGFtcGxlKTtcbiAgICAvL3RoaXMub3Blbkluc3RydW1lbnRFZGl0b3IoYmFuay5pbnN0cnVtZW50c1swXSk7XG4gICAgLy90aGlzLm9wZW5TZXF1ZW5jZUVkaXRvcihudWxsLCAxKTtcbiAgICB0aGlzLm9wZW5UaW1lbGluZUVkaXRvcigpO1xuICAgIHRoaXMuZHJhdygpO1xuICB9XG5cbiAgaW5pdGlhbGlzZUNoYW5uZWxzKGNoYW5uZWxEZWZzKSB7XG4gICAgdGhpcy5jaGFubmVscyA9IFtdO1xuICAgIGZvciAodmFyIGRlZiBvZiBjaGFubmVsRGVmcykge1xuICAgICAgdmFyIGNoID0gbmV3IENoYW5uZWwoZGVmLmNoYW5uZWwsIHRoaXMub3Blbkluc3RydW1lbnRFZGl0b3IuYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLmNoYW5uZWxzLnB1c2goY2gpO1xuICAgICAgY2guaW5zdHJ1bWVudCA9IG5ldyBJbnN0cnVtZW50KCk7XG4gICAgICBpZiAoZGVmLmdlbmVyYXRvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRpbmcgY2hhbm5lbCBnZW5lcmF0b3JcIiwgZGVmLmdlbmVyYXRvcik7XG4gICAgICAgIGNoLmluc3RydW1lbnQubG9hZEZyb21EZWZpbml0aW9uKGRlZi5nZW5lcmF0b3IpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coXCJOZXcgY2hhbm5lbFwiLCBkZWYpO1xuICAgIH1cbiAgICB0aGlzLmFwaS5yZXF1ZXN0U2VxdWVuY2VyRGVmKCk7XG4gICAgdGhpcy5vcGVuVGltZWxpbmVFZGl0b3IoKTtcbiAgfVxuICBcbiAgaW5pdGlhbGlzZVNlcXVlbmNlVHJhY2tzKHNlcXVlbmNlcykge1xuICAgIHZhciBjaGFubmVsU2VxdWVuY2VzID0ge307XG4gICAgZm9yICh2YXIgY2ggb2YgdGhpcy5jaGFubmVscykge1xuICAgICAgY2hhbm5lbFNlcXVlbmNlc1tjaC5jaGFubmVsTnJdID0gW107XG4gICAgfVxuICAgIGZvciAodmFyIHNlcSBvZiBzZXF1ZW5jZXMpIHtcbiAgICAgIHZhciBkZWZzID0gdGhpcy5zZXF1ZW5jZURlZkJ5Q2hhbm5lbChzZXEpO1xuICAgICAgZm9yICh2YXIgY2ggb2YgdGhpcy5jaGFubmVscykge1xuICAgICAgICBmb3IgKHZhciBzIG9mIGRlZnNbY2guY2hhbm5lbE5yXSkge1xuICAgICAgICAgIGNoYW5uZWxTZXF1ZW5jZXNbY2guY2hhbm5lbE5yXS5wdXNoKHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGNoYW5uZWxTZXF1ZW5jZXMpO1xuICAgIGZvciAodmFyIGNoIG9mIHRoaXMuY2hhbm5lbHMpIHtcbiAgICAgIGNoLmluaXRpYWxpc2VTZXF1ZW5jZVRyYWNrcyhjaGFubmVsU2VxdWVuY2VzW2NoLmNoYW5uZWxOcl0pO1xuICAgIH1cbiAgICB0aGlzLm9wZW5UaW1lbGluZUVkaXRvcigpO1xuICAgIHRoaXMudXBsb2FkU2VxdWVuY2VyRGVmKCk7XG4gIH1cblxuICBjb21waWxlKCkge1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICBcImJwbVwiOiAxMjAsXG4gICAgICBcImNoYW5uZWxzXCI6IFtdLFxuICAgICAgXCJzZXF1ZW5jZXNcIjogW10sXG4gICAgfTtcbiAgICBmb3IgKHZhciBjaCBvZiB0aGlzLmNoYW5uZWxzKSB7XG4gICAgICB2YXIgY2hhbm5lbFJlc3VsdCA9IGNoLmNvbXBpbGUoKTtcbiAgICAgIGlmIChjaGFubmVsUmVzdWx0LmNoYW5uZWwpIHtcbiAgICAgICAgcmVzdWx0LmNoYW5uZWxzLnB1c2goY2hhbm5lbFJlc3VsdC5jaGFubmVsKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIHMgb2YgY2hhbm5lbFJlc3VsdC5zZXF1ZW5jZXMpIHtcbiAgICAgICAgcmVzdWx0LnNlcXVlbmNlcy5wdXNoKHMpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB1cGxvYWRTZXF1ZW5jZXJEZWYoKSB7XG4gICAgdGhpcy5hcGkuc2V0U2VxdWVuY2VyRGVmKHRoaXMuY29tcGlsZSgpKTtcbiAgfVxuXG4gIHNlcXVlbmNlRGVmQnlDaGFubmVsKHNlcSkge1xuICAgIHZhciBjaGFubmVsU2VxdWVuY2VzID0ge307XG4gICAgZm9yICh2YXIgY2ggb2YgdGhpcy5jaGFubmVscykge1xuICAgICAgY2hhbm5lbFNlcXVlbmNlc1tjaC5jaGFubmVsTnJdID0gW107XG4gICAgfVxuICAgIHZhciBsZWF2ZXMgPSBbXCJwbGF5X25vdGVcIiwgXCJwbGF5X25vdGVzXCIsIFwidm9sdW1lXCIsXG4gICAgICAgICAgICAgICAgICBcImxwZl9jdXRvZmZcIiwgXCJocGZfY3V0b2ZmXCIsIFwicGFubmluZ1wiXTtcbiAgICBmb3IgKHZhciBsZWFmIG9mIGxlYXZlcykge1xuICAgICAgaWYgKHNlcVtsZWFmXSkge1xuICAgICAgICB2YXIgcyA9IHNlcVtsZWFmXTtcbiAgICAgICAgaWYgKGNoYW5uZWxTZXF1ZW5jZXNbcy5jaGFubmVsXSkge1xuICAgICAgICAgIGNoYW5uZWxTZXF1ZW5jZXNbcy5jaGFubmVsXS5wdXNoKHNlcSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJNaXNzaW5nIGNoYW5uZWxcIiwgcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoYW5uZWxTZXF1ZW5jZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHdyYXBwZWRTZXF1ZW5jZXMgPSBbXCJyZXBlYXRcIiwgXCJhZnRlclwiLCBcImJlZm9yZVwiLCBcImV1Y2xpZGlhblwiLCBcIm9mZnNldFwiXTtcbiAgICBmb3IgKHZhciB3cmFwcGVkIG9mIHdyYXBwZWRTZXF1ZW5jZXMpIHtcbiAgICAgIGlmIChzZXFbd3JhcHBlZF0pIHtcbiAgICAgICAgaWYgKCFzZXFbd3JhcHBlZF0uc2VxdWVuY2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk1pc3Npbmcgc2VxdWVuY2VcIiwgc2VxKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2ggPSB0aGlzLnNlcXVlbmNlRGVmQnlDaGFubmVsKHNlcVt3cmFwcGVkXS5zZXF1ZW5jZSlcbiAgICAgICAgZm9yICh2YXIgY2hhbm5lbE5yIG9mIE9iamVjdC5rZXlzKGNoKSkge1xuICAgICAgICAgIHZhciBzZXFzID0gY2hbY2hhbm5lbE5yXTtcbiAgICAgICAgICBpZiAoc2Vxcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBcbiAgICAgICAgICBmb3IgKHZhciBkZWZTZXEgb2Ygc2Vxcykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKHNlcSkpIHtcbiAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBzZXFba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5zZXF1ZW5jZSA9IGRlZlNlcTtcbiAgICAgICAgICAgIGNoYW5uZWxTZXF1ZW5jZXNbY2hhbm5lbE5yXS5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGFubmVsU2VxdWVuY2VzO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VxLmNvbWJpbmUpIHtcbiAgICAgIGZvciAodmFyIHNlcSBvZiBzZXEuY29tYmluZSkge1xuICAgICAgICB2YXIgZGVmcyA9IHRoaXMuc2VxdWVuY2VEZWZCeUNoYW5uZWwoc2VxKTtcbiAgICAgICAgZm9yICh2YXIgY2ggb2YgdGhpcy5jaGFubmVscykge1xuICAgICAgICAgIGZvciAodmFyIHMgb2YgZGVmc1tjaC5jaGFubmVsTnJdKSB7XG4gICAgICAgICAgICBjaGFubmVsU2VxdWVuY2VzW2NoLmNoYW5uZWxOcl0ucHVzaChzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJ1bmtub3duIGRlZlwiLCBzZXEpO1xuICAgIH1cbiAgICByZXR1cm4gY2hhbm5lbFNlcXVlbmNlcztcbiAgfVxuXG4gIGxvYWRJbnN0cnVtZW50QmFuayhiYW5rKSB7XG4gICAgcmV0dXJuIG5ldyBCYW5rKCkubG9hZEZyb21EZWZpbml0aW9uKGJhbmspO1xuICB9XG5cbiAgbG9hZChkYXRhKSB7XG4gICAgdGhpcy5jaGFubmVscyA9IFtdO1xuICAgIGZvciAodmFyIGNoIG9mIGRhdGEuY2hhbm5lbHMpIHtcbiAgICAgIHZhciBjaGFubmVsID0gbmV3IENoYW5uZWwoY2guY2hhbm5lbF9uciwgdGhpcy5vcGVuSW5zdHJ1bWVudEVkaXRvci5iaW5kKHRoaXMpKTtcbiAgICAgIGNoYW5uZWwubmFtZSA9IGNoLm5hbWU7XG4gICAgICBjaGFubmVsLnNlcXVlbmNlX3RyYWNrcyA9IGNoLnNlcXVlbmNlX3RyYWNrcztcbiAgICAgIGlmIChjaC5pbnN0cnVtZW50KSB7XG4gICAgICAgIGNoYW5uZWwuaW5zdHJ1bWVudCA9IG5ldyBJbnN0cnVtZW50KCk7XG4gICAgICAgIGNoYW5uZWwuaW5zdHJ1bWVudC5sb2FkKGNoLmluc3RydW1lbnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGFubmVscy5wdXNoKGNoYW5uZWwpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5JbnN0cnVtZW50RWRpdG9yKGluc3RyKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBuZXcgSW5zdHJ1bWVudEVkaXRvcih0aGlzLCBpbnN0ciwgdGhpcy5vcGVuVGltZWxpbmVFZGl0b3IuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5kcmF3KClcbiAgfVxuICBvcGVuVGltZWxpbmVFZGl0b3IoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBuZXcgVGltZWxpbmVFZGl0b3IodGhpcy5jaGFubmVscyk7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cbiAgb3BlblNlcXVlbmNlRWRpdG9yKHNlcXVlbmNlLCBjaGFubmVsTnIpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IG5ldyBTZXF1ZW5jZUVkaXRvcih0aGlzLCBzZXF1ZW5jZSwgY2hhbm5lbE5yLCB0aGlzLm9wZW5UaW1lbGluZUVkaXRvci5iaW5kKHRoaXMpKVxuICAgIHRoaXMuZHJhdygpO1xuICB9XG5cbiAgaGFuZGxlTW91c2VEb3duKGUpIHtcbiAgICB2YXIgYm91bmQgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIHZhciB4ID0gZS5jbGllbnRYIC0gYm91bmQubGVmdDsgXG4gICAgdmFyIHkgPSBlLmNsaWVudFkgLSBib3VuZC50b3A7XG4gICAgdGhpcy5zZWxlY3RlZEVsZW0gPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0ZWRQb3MgPSB7fTtcbiAgICBpZiAodGhpcy5hY3RpdmUuaGFuZGxlTW91c2VEb3duKSB7XG4gICAgICB2YXIgZWxlbSA9IHRoaXMuYWN0aXZlLmhhbmRsZU1vdXNlRG93bih0aGlzLCB4LCB5KTtcbiAgICAgIGlmIChlbGVtKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRFbGVtID0gZWxlbTtcbiAgICAgICAgdGhpcy5zdGFydFNlbGVjdGVkUG9zID0ge3gsIHl9O1xuICAgICAgICB0aGlzLnNlbGVjdGVkUG9zID0ge3gsIHl9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU1vdXNlVXAoZSkge1xuICAgIHZhciBib3VuZCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgdmFyIHggPSBlLmNsaWVudFggLSBib3VuZC5sZWZ0OyBcbiAgICB2YXIgeSA9IGUuY2xpZW50WSAtIGJvdW5kLnRvcDtcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVsZW0pIHtcbiAgICAgIHZhciBlbGVtID0gdGhpcy5zZWxlY3RlZEVsZW07XG4gICAgICB2YXIgc3ggPSB0aGlzLnN0YXJ0U2VsZWN0ZWRQb3MueDtcbiAgICAgIHZhciBzeSA9IHRoaXMuc3RhcnRTZWxlY3RlZFBvcy55O1xuICAgICAgaWYgKHN4ID49IHggLTUgJiYgc3ggPD0geCArIDUgJiYgc3kgPj0geSAtIDUgJiYgc3kgPD0geSArIDUpIHtcbiAgICAgICAgaWYgKGVsZW0uaGFuZGxlQ2xpY2spIHtcbiAgICAgICAgICBlbGVtLmhhbmRsZUNsaWNrKHRoaXMsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWxlbS5oYW5kbGVEcm9wKSB7XG4gICAgICAgICAgZWxlbS5oYW5kbGVEcm9wKHRoaXMsIHgsIHkpO1xuICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNlbGVjdGVkRWxlbSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTW91c2VNb3ZlKGUpIHtcbiAgICB2YXIgYm91bmQgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIHZhciB4ID0gZS5jbGllbnRYIC0gYm91bmQubGVmdDsgXG4gICAgdmFyIHkgPSBlLmNsaWVudFkgLSBib3VuZC50b3A7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbGVtKSB7XG4gICAgICB2YXIgZWxlbSA9IHRoaXMuc2VsZWN0ZWRFbGVtO1xuICAgICAgdmFyIHN4ID0gdGhpcy5zZWxlY3RlZFBvcy54O1xuICAgICAgdmFyIHN5ID0gdGhpcy5zZWxlY3RlZFBvcy55O1xuICAgICAgaWYgKHN4ID49IHggLTUgJiYgc3ggPD0geCArIDUgJiYgc3kgPj0geSAtIDUgJiYgc3kgPD0geSArIDUpIHtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbGVtLmhhbmRsZURyYWcpIHtcbiAgICAgICAgICBlbGVtLmhhbmRsZURyYWcodGhpcywgeCAtIHN4LCB5IC0gc3ksIHgsIHksIHN4LCBzeSk7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZFBvcyA9IHt4LCB5fTtcbiAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgdmFyIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdmFyIHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB2YXIgYm91bmQgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93V2lkdGg7XG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gd2luZG93SGVpZ2h0IC0gYm91bmQudG9wO1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICBib2R5LnN0eWxlLmJhY2tncm91bmQgPSB0aGlzLnRoZW1lLmNvbG91cnMuQmFja2dyb3VuZDtcbiAgICBib2R5LnN0eWxlLmNvbG9yID0gdGhpcy50aGVtZS5jb2xvdXJzLkZvcmVncm91bmQ7XG4gICAgdGhpcy5hY3RpdmUuZHJhdyh0aGlzKTtcbiAgfVxufVxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICB0cnkgeyBcbiAgbmV3IEJsZWVwKCk7XG4gIH0gY2F0Y2goZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIGFsZXJ0KGUpO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgQVVESU9fVFlQRSA9IDE7XG5leHBvcnQgY29uc3QgRlJFUVVFTkNZX1RZUEUgPSAyO1xuZXhwb3J0IGNvbnN0IFBBTk5JTkdfVFlQRSA9IDM7XG5leHBvcnQgY29uc3QgQ0xPQ0tfVFlQRSA9IDQ7XG5leHBvcnQgY29uc3QgVFJJR0dFUl9UWVBFID0gNTtcbmV4cG9ydCBjb25zdCBJTlRfVFlQRSA9IDY7XG5leHBvcnQgeyBQYXRjaGFibGUgfSBmcm9tICcuL3BhdGNoYWJsZS5qcyc7XG4iLCJpbXBvcnQgeyBQYXRjaCB9IGZyb20gJy4uL2NvbXBvbmVudHMvJztcblxuZXhwb3J0IGNsYXNzIFBhdGNoYWJsZSB7XG4gIGNvbnN0cnVjdG9yKG1vZHVsZXMsIHBhdGNoZXMpIHtcbiAgICB0aGlzLm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgIHRoaXMucGF0Y2hlcyA9IHBhdGNoZXM7XG4gIH1cbiAgYWRkUGF0Y2goZnJvbU1vZCwgdG9Nb2QsIGZyb21Tb2NrZXQsIHRvU29ja2V0KSB7XG4gICAgdmFyIGZyb20gPSBudWxsO1xuICAgIHZhciB0byA9IG51bGw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBtID0gdGhpcy5tb2R1bGVzW2ldO1xuICAgICAgaWYgKG0gPT09IGZyb21Nb2QpIHtcbiAgICAgICAgZnJvbSA9IGk7XG4gICAgICB9XG4gICAgICBpZiAobSA9PT0gdG9Nb2QpIHtcbiAgICAgICAgdG8gPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZnJvbSA9PT0gbnVsbCB8fCB0byA9PT0gbnVsbCB8fCAoZnJvbSA9PT0gdG8gJiYgZnJvbVNvY2tldCA9PT0gdG9Tb2NrZXQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHRoaXMubW9kdWxlc1tmcm9tXS51bml0LnNvY2tldHNbZnJvbVNvY2tldF0udHlwZSAhPSB0aGlzLm1vZHVsZXNbdG9dLnVuaXQuc29ja2V0c1t0b1NvY2tldF0udHlwZSkge1xuICAgICAgYWxlcnQoXCJXcm9uZyB0eXBlc1wiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHBhdGNoID0gbmV3IFBhdGNoKGZyb20sIHRvLCBmcm9tU29ja2V0LCB0b1NvY2tldCwgdGhpcy5tb2R1bGVzW2Zyb21dLnVuaXQuc29ja2V0c1tmcm9tU29ja2V0XS50eXBlKTtcbiAgICB2YXIgcmVtb3ZlID0gbnVsbDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHAgPSB0aGlzLnBhdGNoZXNbaV07XG4gICAgICBpZiAocC5pc0lzb21vcnBoaWMocGF0Y2gpKSB7XG4gICAgICAgIHJlbW92ZSA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocmVtb3ZlID09PSBudWxsKSB7XG4gICAgICB0aGlzLnBhdGNoZXMucHVzaChwYXRjaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGF0Y2hlcy5zcGxpY2UocmVtb3ZlLCAxKTtcbiAgICB9XG4gIH1cblxufVxuIiwiXG5pbXBvcnQgeyBFZGl0b3IsIEJ1dHRvbiwgTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgU2VxdWVuY2UgfSBmcm9tICcuL3NlcXVlbmNlLmpzJztcbmltcG9ydCB7IFNlcXVlbmNlSW5wdXQsIFNlcXVlbmNlT3V0cHV0LCBQdWxzZSwgUGxheU5vdGUsIFJhbmdlIH0gZnJvbSAnLi9tb2R1bGVfdW5pdHMvJztcblxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlRWRpdG9yIGV4dGVuZHMgRWRpdG9yIHtcbiAgY29uc3RydWN0b3IoYXBwLCBzZXF1ZW5jZSwgY2hhbm5lbE5yLCBoYW5kbGVDbG9zZSkge1xuICAgIHN1cGVyKGFwcCwgc2VxdWVuY2UsIGhhbmRsZUNsb3NlKTtcbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICBpZiAoIXNlcXVlbmNlKSB7XG4gICAgICBzZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZShbXSwgW10sIGNoYW5uZWxOcik7XG4gICAgICB2YXIgbW9kdWxlcyA9IFtcbiAgICAgICAgbmV3IE1vZHVsZShzZXF1ZW5jZSwgMzAsIDUwLCBuZXcgU2VxdWVuY2VJbnB1dCgnaW5wdXQnKSksIFxuICAgICAgXTtcbiAgICAgIHNlcXVlbmNlLm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgIH1cbiAgICB0aGlzLnRhcmdldCA9IHNlcXVlbmNlO1xuICAgIHZhciBidXR0b25EZWZzID0gW1xuICAgICAgICB7bGFiZWw6IFwi8J2FnVwiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUHVsc2UoNCkpfSxcbiAgICAgICAge2xhYmVsOiBcIvCdhZ5cIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDIpKX0sXG4gICAgICAgIHtsYWJlbDogXCLimalcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDEpKX0sXG4gICAgICAgIHtsYWJlbDogXCLimapcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDAuNSkpfSxcbiAgICAgICAge2xhYmVsOiBcIvCdhaFcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDAuMjUpKX0sXG4gICAgICAgIHtsYWJlbDogXCLwnYWiXCIsIGNvbG91cjogJ01vZHVsZVB1bHNlJywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBQdWxzZSgwLjEyNSkpfSxcbiAgICAgICAge2xhYmVsOiBcIlBVTFNcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKCkpfSxcbiAgICAgICAge2xhYmVsOiBcIkVVQ0xcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiTk9URVwiLCBjb2xvdXI6ICdNb2R1bGVPdXRwdXQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFBsYXlOb3RlKCkpfSxcbiAgICAgICAge2xhYmVsOiBcIlBBTlwiLCBjb2xvdXI6ICdNb2R1bGVPdXRwdXQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiUkVWXCIsIGNvbG91cjogJ01vZHVsZU91dHB1dCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJMUEZcIiwgY29sb3VyOiAnTW9kdWxlT3V0cHV0Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzaW5lXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIkhQRlwiLCBjb2xvdXI6ICdNb2R1bGVPdXRwdXQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuXG4gICAgICAgIHtsYWJlbDogXCJTV0VFUFwiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFJhbmdlKFwic3dlZXBcIikpfSxcbiAgICAgICAge2xhYmVsOiBcIkNZQ0xFXCIsIGNvbG91cjogJ01vZHVsZUludCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJSQU5HRVwiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFJhbmdlKFwicmFuZ2VcIikpfSxcbiAgICAgICAge2xhYmVsOiBcIkZBREVcIiwgY29sb3VyOiAnTW9kdWxlSW50Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBSYW5nZShcImZhZGUgaW5cIikpfSxcbiAgICAgICAge2xhYmVsOiBcIlJBTkRcIiwgY29sb3VyOiAnTW9kdWxlSW50Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzaW5lXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlJFR1wiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiVFJBTlNcIiwgY29sb3VyOiAnTW9kdWxlSW50Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzaW5lXCIpfSxcbiAgICBdXG5cbiAgICB2YXIgeCA9IDA7XG4gICAgdmFyIHByZXYgPSBudWxsO1xuICAgIHZhciBwYWRkaW5nID0gMDtcbiAgICB2YXIgZ3JvdXBQYWRkaW5nID0gMTU7XG4gICAgZm9yICh2YXIgZGVmIG9mIGJ1dHRvbkRlZnMpIHtcbiAgICAgIHZhciBiID0gbmV3IEJ1dHRvbih4LCBhcHAudGhlbWUucGFkZGluZywgZGVmLm9uY2xpY2suYmluZCh0aGlzKSwgZGVmLmxhYmVsKTtcbiAgICAgIGIuY29sb3VyID0gYXBwLnRoZW1lLmNvbG91cnNbZGVmLmNvbG91cl0gfHwgYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlR2VuZXJhdG9yO1xuICAgICAgdGhpcy5idXR0b25zLnB1c2goYik7XG4gICAgICBpZiAocHJldiAmJiBwcmV2LmNvbG91ciAhPSBkZWYuY29sb3VyKSB7XG4gICAgICAgIHggKz0gZ3JvdXBQYWRkaW5nO1xuICAgICAgICBiLnggKz0gZ3JvdXBQYWRkaW5nO1xuICAgICAgfVxuICAgICAgeCArPSBiLncgKyBwYWRkaW5nO1xuICAgICAgcHJldiA9IGRlZjtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCB7IFB1bHNlIH0gZnJvbSAnLi9wdWxzZS5qcyc7XG5leHBvcnQgeyBQbGF5Tm90ZSB9IGZyb20gJy4vcGxheV9ub3RlLmpzJztcbmV4cG9ydCB7IFNlcXVlbmNlSW5wdXQgfSBmcm9tICcuL3NlcXVlbmNlX2lucHV0LmpzJztcbmV4cG9ydCB7IFJhbmdlIH0gZnJvbSAnLi9yYW5nZS5qcyc7XG4iLCJpbXBvcnQgeyBNb2R1bGVVbml0LCBJbnB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IFRSSUdHRVJfVFlQRSwgSU5UX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgUGxheU5vdGUgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJwbGF5X25vdGVcIik7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJUUklHXCI6IG5ldyBJbnB1dFNvY2tldCgyOSwgdGhpcy5oIC0gMjksIFwiVFJJR1wiLCBUUklHR0VSX1RZUEUpLFxuICAgICAgXCJOT1RFXCI6IG5ldyBJbnB1dFNvY2tldCg3OSwgdGhpcy5oIC0gMjksIFwiTk9URVwiLCBJTlRfVFlQRSksXG4gICAgICBcIlZFTFwiOiBuZXcgSW5wdXRTb2NrZXQoMTI5LCB0aGlzLmggLSAyOSwgXCJWRUxcIiwgSU5UX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmRpYWxzID0ge1xuICAgICAgXCJub3RlXCI6IG5ldyBEaWFsKDI5LCA1OSwgXCJOT1RFXCIsIDAuMCwgMTI4LjAsIDEuMCksXG4gICAgICBcInZlbG9jaXR5XCI6IG5ldyBEaWFsKDc5LCA1OSwgXCJWRUxcIiwgMC4wLCAxMC4wLCAxLjApLFxuICAgICAgXCJkdXJhdGlvblwiOiBuZXcgRGlhbCgxMjksIDU5LCBcIkRVUlwiLCAwLjAsIDEwLjAsIDEuMCksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVPdXRwdXQnO1xuICB9XG5cbiAgY29tcGlsZShjb25uZWN0aW9ucykge1xuICAgIHZhciBnID0ge1wicGxheV9ub3RlXCI6IHtcbiAgICAgIFwiZHVyYXRpb25cIjogdGhpcy5kaWFsc1tcImR1cmF0aW9uXCJdLnZhbHVlLFxuICAgICAgXCJjaGFubmVsXCI6IHRoaXMuY2hhbm5lbE5yLFxuICAgIH19O1xuICAgIHZhciBvbiA9IGNvbm5lY3Rpb25zW1wiTk9URVwiXTtcbiAgICBpZiAob24ubGVuZ3RoID09PSAwKSB7XG4gICAgICBnW1wicGxheV9ub3RlXCJdW1wibm90ZVwiXSA9IHRoaXMuZGlhbHNbXCJub3RlXCJdLnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBnW1wicGxheV9ub3RlXCJdW1wiYXV0b19ub3RlXCJdID0gb25bMF07XG4gICAgfVxuICAgIHZhciBvbiA9IGNvbm5lY3Rpb25zW1wiVkVMXCJdO1xuICAgIGlmIChvbi5sZW5ndGggPT09IDApIHtcbiAgICAgIGdbXCJwbGF5X25vdGVcIl1bXCJ2ZWxvY2l0eVwiXSA9IHRoaXMuZGlhbHNbXCJ2ZWxvY2l0eVwiXS52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ1tcInBsYXlfbm90ZVwiXVtcImF1dG9fdmVsb2NpdHlcIl0gPSBvblswXTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gW11cbiAgICB2YXIgb24gPSBjb25uZWN0aW9uc1tcIlRSSUdcIl07XG4gICAgZm9yICh2YXIgbyBvZiBvbikge1xuICAgICAgcmVzdWx0LnB1c2gobyhnKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZVVuaXQsIElucHV0U29ja2V0LCBPdXRwdXRTb2NrZXQsIERpYWwgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBUUklHR0VSX1RZUEUsIENMT0NLX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgUHVsc2UgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IoZXZlcnkpIHtcbiAgICBzdXBlcihcInB1bHNlXCIpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiQ0xPQ0tcIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJDTE9DS1wiLCBDTE9DS19UWVBFKSxcbiAgICAgIFwiVFJJR1wiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJUUklHXCIsIFRSSUdHRVJfVFlQRSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgICBcImV2ZXJ5XCI6IG5ldyBEaWFsKDI5LCA1OSwgXCJFVkVSWVwiLCAwLjAsIDEwLjAsIDEuMCksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMuZXZlcnkudmFsdWUgPSBldmVyeSB8fCAxO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVQdWxzZSc7XG4gIH1cblxuICBjb21waWxlKGNvbm5lY3Rpb25zKSB7XG4gICAgdmFyIGUgPSB7XCJldmVyeVwiOiB0aGlzLmRpYWxzW1wiZXZlcnlcIl0udmFsdWV9O1xuICAgIHJldHVybiAoKGUpID0+ICgodCkgPT4ge1xuICAgICAgZm9yICh2YXIgbyBvZiBPYmplY3Qua2V5cyh0KSkge1xuICAgICAgICBlW29dID0gdFtvXTtcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHQgPSB7XCJyZXBlYXRcIjogZX07XG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSkpKGUpXG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZVVuaXQsIE91dHB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IElOVF9UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFJhbmdlIGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIk9VVFwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJPVVRcIiwgSU5UX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmRpYWxzID0ge1xuICAgICAgXCJmcm9tXCI6IG5ldyBEaWFsKDI5LCA1OSwgXCJGUk9NXCIsIDAuMCwgMTI3LjAsIDAuMCksXG4gICAgICBcInRvXCI6IG5ldyBEaWFsKDc5LCA1OSwgXCJUT1wiLCAwLjAsIDEyNy4wLCAxMjcuMCksXG4gICAgICBcInN0ZXBcIjogbmV3IERpYWwoMTI5LCA1OSwgXCJTVEVQXCIsIDAuMCwgMTI4LjAsIDEuMCksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVJbnQnO1xuICB9XG5cbiAgY29tcGlsZShjb25uZWN0aW9ucykge1xuICAgIHZhciBnID0ge307XG4gICAgZ1t0aGlzLnR5cGVdID0ge1xuICAgICAgXCJmcm9tXCI6IHRoaXMuZGlhbHMuZnJvbS52YWx1ZSxcbiAgICAgIFwidG9cIjogdGhpcy5kaWFscy50by52YWx1ZSxcbiAgICAgIFwic3RlcFwiOiB0aGlzLmRpYWxzLnN0ZXAudmFsdWUsXG4gICAgfTtcbiAgICByZXR1cm4gZztcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgT3V0cHV0U29ja2V0IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgQ0xPQ0tfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBTZXF1ZW5jZUlucHV0IGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIkNMT0NLXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIkNMT0NLXCIsIENMT0NLX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlT3V0cHV0JztcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGF0Y2hhYmxlIH0gZnJvbSAnLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlIGV4dGVuZHMgUGF0Y2hhYmxlIHtcbiAgY29uc3RydWN0b3IobW9kdWxlcywgcGF0Y2hlcywgY2hhbm5lbE5yKSB7XG4gICAgc3VwZXIobW9kdWxlcywgcGF0Y2hlcyk7XG4gICAgdGhpcy5jaGFubmVsTnIgPSBjaGFubmVsTnIgfHwgMTtcbiAgfVxuICBjb21waWxlKCkge1xuICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgIHZhciBzZWVuID0ge307XG4gICAgdmFyIGRlcGVuZGVuY2llcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBtID0gdGhpcy5tb2R1bGVzW2ldO1xuICAgICAgaWYgKG0udW5pdC50eXBlID09IFwicGxheV9ub3RlXCIpIHtcbiAgICAgICAgcXVldWUucHVzaChpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBxID0gcXVldWVbMF07XG4gICAgICB2YXIgcXVldWUgPSBxdWV1ZS5zcGxpY2UoMSk7XG4gICAgICBpZiAoc2VlbltxXSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgZGVwZW5kZW5jaWVzLnB1c2gocSk7XG4gICAgICBmb3IgKHZhciBwIG9mIHRoaXMucGF0Y2hlcykge1xuICAgICAgICB2YXIgbW9kU29ja2V0cyA9IHRoaXMubW9kdWxlc1txXS51bml0LnNvY2tldHM7XG4gICAgICAgIGlmIChwLnRvID09PSBxICYmIG1vZFNvY2tldHNbcC50b1NvY2tldF0uaXNJbnB1dCkge1xuICAgICAgICAgIGlmICghc2VlbltwLmZyb21dKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKHAuZnJvbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHAuZnJvbSA9PT0gcSAmJiBtb2RTb2NrZXRzW3AuZnJvbVNvY2tldF0uaXNJbnB1dCkge1xuICAgICAgICAgIGlmICghc2VlbltwLmZyb21dKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKHAudG8pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2VlbltxXSA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBzZXF1ZW5jZXMgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gZGVwZW5kZW5jaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgaXggPSBkZXBlbmRlbmNpZXNbaV07XG4gICAgICB2YXIgdW5pdCA9IHRoaXMubW9kdWxlc1tpeF0udW5pdDtcblxuICAgICAgdmFyIGNvbm5lY3Rpb25zID0ge307XG4gICAgICBmb3IgKHZhciBzb2NrZXRJZCBvZiBPYmplY3Qua2V5cyh1bml0LnNvY2tldHMpKSB7XG4gICAgICAgIGlmICh1bml0LnNvY2tldHNbc29ja2V0SWRdLmlzSW5wdXQpIHtcbiAgICAgICAgICBjb25uZWN0aW9uc1tzb2NrZXRJZF0gPSB0aGlzLmdldENvbm5lY3RlZFNlcXVlbmNlcyhzZXF1ZW5jZXMsIGl4LCBzb2NrZXRJZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh1bml0LnR5cGUgPT0gXCJwbGF5X25vdGVcIikge1xuICAgICAgICBmb3IgKHZhciBvIG9mIHVuaXQuY29tcGlsZShjb25uZWN0aW9ucykpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChvKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGcgPSB1bml0LmNvbXBpbGUoY29ubmVjdGlvbnMpO1xuICAgICAgICBzZXF1ZW5jZXNbaXhdID0gZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBnZXRDb25uZWN0ZWRTZXF1ZW5jZXMoc2VxdWVuY2VzLCBpeCwgaW5wdXQpIHtcbiAgICB2YXIgZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBwIG9mIHRoaXMucGF0Y2hlcykge1xuICAgICAgaWYgKHAuZG9lc1BhdGNoQ29ubmVjdFRvKGl4LCBpbnB1dCkpIHtcbiAgICAgICAgZ3MucHVzaChzZXF1ZW5jZXNbcC5jb25uZWN0c1RvKGl4LCBpbnB1dCkubW9kdWxlXSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBBVURJT19UWVBFLCBGUkVRVUVOQ1lfVFlQRSwgUEFOTklOR19UWVBFLCBDTE9DS19UWVBFLCBUUklHR0VSX1RZUEUsIElOVF9UWVBFIH0gZnJvbSAnLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgVGhlbWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBhZGRpbmcgPSAwO1xuICAgIHZhciBzb2NrZXRDb2xvdXJzID0ge307XG4gICAgdmFyIHBhdGNoQ29sb3VycyA9IHt9XG4gICAgc29ja2V0Q29sb3Vyc1tBVURJT19UWVBFXSA9ICdyZ2IoMTQwLCAyNTUsIDI1NSknO1xuICAgIHNvY2tldENvbG91cnNbRlJFUVVFTkNZX1RZUEVdID0gJ3JnYigyNTUsIDI1NSwgMTQwKSc7XG4gICAgc29ja2V0Q29sb3Vyc1tQQU5OSU5HX1RZUEVdID0gJ3JnYigyNTUsIDE0MCwgMjU1KSc7XG4gICAgc29ja2V0Q29sb3Vyc1tDTE9DS19UWVBFXSA9ICdyZ2IoMTAwLCAxMDAsIDI1NSknO1xuICAgIHNvY2tldENvbG91cnNbVFJJR0dFUl9UWVBFXSA9ICdyZ2IoNTAsIDUwLCA1MCknO1xuICAgIHNvY2tldENvbG91cnNbSU5UX1RZUEVdID0gJ3JnYigyNTUsIDI1NSwgNDApJztcbiAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMoc29ja2V0Q29sb3VycykpIHtcbiAgICAgIHBhdGNoQ29sb3Vyc1trZXldID0gUkdCX0xpbmVhcl9TaGFkZSgwLjEsIHNvY2tldENvbG91cnNba2V5XSk7XG4gICAgfVxuICAgIHRoaXMuY29sb3VycyA9IHtcbiAgICAgIE91dGxpbmVDb2xvdXI6ICcjMzMzJyxcbiAgICAgIEJhY2tncm91bmQ6ICcjNDQ0JyxcbiAgICAgIEZvcmVncm91bmQ6ICcjZWVlJyxcbiAgICAgIEluc3RydW1lbnRFZGl0b3JCYWNrZ3JvdW5kOiAnI2VlZScsXG5cbiAgICAgIFNvY2tldEJhY2tncm91bmQ6ICcjOWZmJyxcbiAgICAgIFNvY2tldEluc2lkZTogJyM5OTknLFxuICAgICAgU29ja2V0T3V0bGluZTogJyM3NzcnLFxuXG4gICAgICBQYXRjaDogJyM3ZmYnLFxuXG4gICAgICBNb2R1bGVPdXRsaW5lOiAnIzc3NycsXG4gICAgICBNb2R1bGVUZXh0OiAnIzQ0NCcsXG4gICAgICBNb2R1bGVHZW5lcmF0b3I6ICcjZmZmJyxcbiAgICAgIE1vZHVsZUZpbHRlcjogJyNmZmQnLFxuICAgICAgTW9kdWxlRGVyaXZlZDogJyNkZGYnLFxuICAgICAgTW9kdWxlT3V0cHV0OiAnI2RmZCcsXG4gICAgICBNb2R1bGVJbnQ6ICcjZmY5JyxcbiAgICAgIE1vZHVsZVB1bHNlOiAnI2RkZicsXG5cbiAgICAgIEJ1dHRvbjogJyNjY2MnLFxuICAgICAgQnV0dG9uVGV4dDogJyMzMzMnLFxuXG4gICAgICBEaWFsOiAnI2NjYycsXG4gICAgICBEaWFsTGluZTogJyM0NDQnLFxuXG4gICAgICBTb2NrZXRzOiBzb2NrZXRDb2xvdXJzLFxuICAgICAgUGF0Y2hlczogcGF0Y2hDb2xvdXJzLFxuICAgIH07XG4gIH1cbn1cblxuY29uc3QgUkdCX0xpbmVhcl9TaGFkZT0ocCxjKT0+e1xuICAgIHZhciBpPXBhcnNlSW50LHI9TWF0aC5yb3VuZCxbYSxiLGMsZF09Yy5zcGxpdChcIixcIiksUD1wPDAsdD1QPzA6MjU1KnAsUD1QPzErcDoxLXA7XG4gICAgcmV0dXJuXCJyZ2JcIisoZD9cImEoXCI6XCIoXCIpK3IoaShhWzNdPT1cImFcIj9hLnNsaWNlKDUpOmEuc2xpY2UoNCkpKlArdCkrXCIsXCIrcihpKGIpKlArdCkrXCIsXCIrcihpKGMpKlArdCkrKGQ/XCIsXCIrZDpcIilcIik7XG59XG4iLCJpbXBvcnQgeyBTZXF1ZW5jZVRyYWNrIH0gZnJvbSAnLi9zZXF1ZW5jZV90cmFjay5qcyc7IFxuXG5leHBvcnQgY2xhc3MgQ2hhbm5lbCB7XG4gIGNvbnN0cnVjdG9yKGNoYW5uZWxOciwgb3Blbkluc3RydW1lbnRFZGl0b3IpIHtcbiAgICB0aGlzLmNoYW5uZWxOciA9IGNoYW5uZWxOcjtcbiAgICB0aGlzLmluc3RydW1lbnQgPSBudWxsO1xuICAgIHRoaXMuc2VxdWVuY2VUcmFja3MgPSBbbmV3IFNlcXVlbmNlVHJhY2soKV07XG4gICAgdGhpcy5uYW1lID0gXCJVbnRpdGxlZCBcIiArIHRoaXMuY2hhbm5lbE5yO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhbm5lbE5yOyBpKyspIHtcbiAgICAgIHRoaXMuc2VxdWVuY2VUcmFja3MucHVzaChuZXcgU2VxdWVuY2VUcmFjaygpKTtcbiAgICB9XG5cbiAgICB0aGlzLmhlaWdodCA9IDc1O1xuICAgIHRoaXMubWFyZ2luVG9wID0gMTA7XG4gICAgdGhpcy5vZmZzZXQgPSAgdGhpcy5jaGFubmVsTnIgKiAodGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpblRvcCk7XG4gICAgdGhpcy5wYWRkaW5nID0gMTA7XG4gICAgdGhpcy5jaGFubmVsV2lkdGggPSA5MDtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gKCkgPT4gb3Blbkluc3RydW1lbnRFZGl0b3IodGhpcy5pbnN0cnVtZW50KTtcbiAgfVxuXG4gIGNvbXBpbGUoKSB7XG4gICAgdmFyIGNoYW5uZWwgPSB7XG4gICAgICBcImNoYW5uZWxcIjogdGhpcy5jaGFubmVsTnIsXG4gICAgICBcImdlbmVyYXRvclwiOiB0aGlzLmluc3RydW1lbnQuY29tcGlsZSgpLFxuICAgIH07XG4gICAgdmFyIHNlcXVlbmNlcyA9IFtdO1xuICAgIGZvciAodmFyIHRyIG9mIHRoaXMuc2VxdWVuY2VUcmFja3MpIHtcbiAgICAgIHZhciB0clJlc3VsdCA9IHRyLmNvbXBpbGUoKTtcbiAgICAgIGlmICh0clJlc3VsdCkge1xuICAgICAgICBzZXF1ZW5jZXMucHVzaCh0clJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBcImNoYW5uZWxcIjogY2hhbm5lbCxcbiAgICAgIFwic2VxdWVuY2VzXCI6IHNlcXVlbmNlcyxcbiAgICB9O1xuICB9XG5cbiAgaW5pdGlhbGlzZVNlcXVlbmNlVHJhY2tzKHNlcXVlbmNlcykge1xuICAgIHRoaXMuc2VxdWVuY2VUcmFja3MgPSBbXTtcbiAgICBmb3IgKHZhciBzIG9mIHNlcXVlbmNlcykge1xuICAgICAgdmFyIHNlZ21lbnQgPSB7fTtcbiAgICAgIGlmIChzLmFmdGVyKSB7XG4gICAgICAgIHNlZ21lbnQuYWZ0ZXIgPSBzLmFmdGVyLmFmdGVyO1xuICAgICAgICBpZiAocy5hZnRlci5zZXF1ZW5jZS5iZWZvcmUpIHtcbiAgICAgICAgICBzZWdtZW50LmJlZm9yZSA9IHMuYWZ0ZXIuc2VxdWVuY2UuYmVmb3JlLmJlZm9yZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzLmJlZm9yZSkge1xuICAgICAgICBzZWdtZW50LmJlZm9yZSA9IHMuYmVmb3JlLmJlZm9yZTtcbiAgICAgICAgaWYgKHMuYmVmb3JlLnNlcXVlbmNlLmFmdGVyKSB7XG4gICAgICAgICAgc2VnbWVudC5hZnRlciA9IHMuYmVmb3JlLnNlcXVlbmNlLmFmdGVyLmFmdGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgdHJhY2sgPSBuZXcgU2VxdWVuY2VUcmFjaygpO1xuICAgICAgdHJhY2suc2VxdWVuY2VfZGVmID0gcztcbiAgICAgIHRyYWNrLmFkZFJhbmdlKHNlZ21lbnQuYWZ0ZXIsIHNlZ21lbnQuYmVmb3JlKTtcbiAgICAgIHRoaXMuc2VxdWVuY2VUcmFja3MucHVzaCh0cmFjayk7XG4gICAgfVxuICB9XG5cbiAgZHJhdyhhcHApIHtcbiAgICB2YXIgY29sb3JPZmZzZXQgPSB0aGlzLmNoYW5uZWxOciAqIDQwO1xuICAgIHZhciBoZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICB2YXIgbWFyZ2luVG9wID0gdGhpcy5tYXJnaW5Ub3A7XG4gICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHZhciBwYWRkaW5nID0gdGhpcy5wYWRkaW5nO1xuICAgIHZhciBjaGFubmVsV2lkdGggPSB0aGlzLmNoYW5uZWxXaWR0aDtcbiAgICB2YXIgdHJhY2tXaWR0aCA9IGFwcC5jYW52YXMud2lkdGggLSBjaGFubmVsV2lkdGggLSBwYWRkaW5nICogMjtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMCwgJyArICgyMDAgLSBjb2xvck9mZnNldCkgKyAnLCAwKSc7XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoNDAsIDQwLCA0MCwgMS4wKSc7XG4gICAgYXBwLmN0eC5maWxsUmVjdChwYWRkaW5nLCBwYWRkaW5nICsgb2Zmc2V0LCBjaGFubmVsV2lkdGgsIGhlaWdodCk7XG4gICAgYXBwLmN0eC5zdHJva2VSZWN0KHBhZGRpbmcsIHBhZGRpbmcgKyBvZmZzZXQsIGNoYW5uZWxXaWR0aCwgaGVpZ2h0KTtcblxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gJ3JnYigyNTUsICcgKyAoMjAwIC0gY29sb3JPZmZzZXQpICsgJywgMCknO1xuICAgIGFwcC5jdHguZmlsbFJlY3QocGFkZGluZyArIGNoYW5uZWxXaWR0aCwgcGFkZGluZyArIG9mZnNldCwgdHJhY2tXaWR0aCwgaGVpZ2h0KTtcbiAgICBhcHAuY3R4LnN0cm9rZVJlY3QocGFkZGluZyArIGNoYW5uZWxXaWR0aCwgcGFkZGluZyArIG9mZnNldCwgdHJhY2tXaWR0aCwgaGVpZ2h0KTtcblxuICAgIHZhciB0cmFja0hlaWdodCA9IGhlaWdodCAvIHRoaXMuc2VxdWVuY2VUcmFja3MubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZXF1ZW5jZVRyYWNrcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGFwcC5jdHguc3Ryb2tlUmVjdChwYWRkaW5nICsgY2hhbm5lbFdpZHRoLCBwYWRkaW5nICsgb2Zmc2V0ICsgaSAqIHRyYWNrSGVpZ2h0LCB0cmFja1dpZHRoLCB0cmFja0hlaWdodCk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZXF1ZW5jZVRyYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHMgPSB0aGlzLnNlcXVlbmNlVHJhY2tzW2ldO1xuICAgICAgcy5kcmF3KGFwcCwgcGFkZGluZyArIGNoYW5uZWxXaWR0aCwgcGFkZGluZyArIG9mZnNldCArIGkgKiB0cmFja0hlaWdodCwgdHJhY2tXaWR0aCwgdHJhY2tIZWlnaHQpO1xuICAgIH1cblxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gJ3JnYigyNTUsIDI1NSwgMjU1KSc7XG4gICAgYXBwLmN0eC5mb250ID0gJzEwcHggc2Fucy1zZXJpZic7XG4gICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLm5hbWUsIHBhZGRpbmcgKyAzLCBwYWRkaW5nICsgb2Zmc2V0ICsgMTEpO1xuICAgIHZhciBzaG93QmFycyA9IDQ7XG4gICAgdmFyIHBvaW50c0luUmFuZ2UgPSBzaG93QmFycyAqIDQ7XG4gICAgdmFyIHNjYWxpbmcgPSB0cmFja1dpZHRoIC8gcG9pbnRzSW5SYW5nZTtcbiAgICB2YXIgYmFyV2lkdGggPSA0ICogc2NhbGluZztcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoNDAsIDQwLCA0MCknO1xuICAgIGFwcC5jdHguZm9udCA9ICcxMHB4IG1vbm8nO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2hvd0JhcnM7IGkrKykge1xuICAgICAgYXBwLmN0eC5maWxsVGV4dChpICogNCwgcGFkZGluZyArIGNoYW5uZWxXaWR0aCArIDMgKyBpICogYmFyV2lkdGgsIHBhZGRpbmcgKyBvZmZzZXQgKyBoZWlnaHQgLSAzKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgdmFyIHBhdGggPSBuZXcgUGF0aDJEKCk7XG4gICAgdmFyIHdpZHRoID0gYXBwLmNhbnZhcy53aWR0aCAtIHRoaXMucGFkZGluZyAqIDI7XG4gICAgcGF0aC5yZWN0KHRoaXMucGFkZGluZywgdGhpcy5wYWRkaW5nICsgdGhpcy5vZmZzZXQsIHdpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgaWYgKGFwcC5jdHguaXNQb2ludEluUGF0aChwYXRoLCB4LCB5KSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiZXhwb3J0IHsgQ2hhbm5lbCB9IGZyb20gJy4vY2hhbm5lbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBUaW1lbGluZUVkaXRvciB7XG4gIGNvbnN0cnVjdG9yKGNoYW5uZWxzKSB7XG4gICAgdGhpcy5jaGFubmVscyA9IGNoYW5uZWxzO1xuICB9XG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICBmb3IgKHZhciBlIG9mIHRoaXMuY2hhbm5lbHMpIHtcbiAgICAgIHZhciB2ID0gZS5oYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KTtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHJldHVybiB2O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIGZvciAodmFyIGUgb2YgdGhpcy5jaGFubmVscykge1xuICAgICAgZS5kcmF3KGFwcCk7XG4gICAgfVxuICB9XG59XG4iLCJcbmV4cG9ydCBjbGFzcyBSYW5nZSB7XG4gIGNvbnN0cnVjdG9yKHN0YXJ0LCBzdG9wKSB7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuc3RvcCA9IHN0b3A7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlVHJhY2sge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNlcXVlbmNlX2RlZiA9IG51bGw7XG4gICAgdGhpcy5yYW5nZXMgPSBbXTtcbiAgfVxuICBhZGRSYW5nZShzdGFydCwgc3RvcCkge1xuICAgIHRoaXMucmFuZ2VzLnB1c2gobmV3IFJhbmdlKHN0YXJ0ID8gc3RhcnQgOiAwLCBzdG9wID8gc3RvcCA6IDEwMDAwMDApKTtcbiAgfVxuICBjb21waWxlKCkge1xuICAgIGlmICh0aGlzLnNlcXVlbmNlX2RlZikge1xuICAgICAgcmV0dXJuIHRoaXMuc2VxdWVuY2VfZGVmO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBkcmF3KGFwcCwgeCwgeSwgdywgaCkge1xuICAgIHZhciBzaG93QmFycyA9IDY0O1xuICAgIHZhciBwb2ludHNJblJhbmdlID0gc2hvd0JhcnMgKiA0O1xuICAgIHZhciBzY2FsaW5nID0gdyAvIHBvaW50c0luUmFuZ2U7XG4gICAgdmFyIGJhcldpZHRoID0gNCAqIHNjYWxpbmc7XG4gICAgZm9yICh2YXIgciBvZiB0aGlzLnJhbmdlcykge1xuICAgICAgdmFyIGNvbG9yT2Zmc2V0ID0gMTA7XG4gICAgICB2YXIgd2lkdGggPSBNYXRoLm1pbigoci5zdG9wIC0gci5zdGFydCkgKiBzY2FsaW5nLCB3IC0gKHIuc3RhcnQgKiBzY2FsaW5nKSlcbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gJ3JnYigzNSwgNzUsICcgKyAoMjAwIC0gY29sb3JPZmZzZXQpICsgJywgMC4zKSc7XG4gICAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gJ3JnYig1LCA1LCAnICsgKDIwMCAtIGNvbG9yT2Zmc2V0KSArICcsIDAuNiknO1xuICAgICAgYXBwLmN0eC5maWxsUmVjdCh4ICsgci5zdGFydCAqIHNjYWxpbmcsIHksIHdpZHRoLCBoKTtcbiAgICAgIGFwcC5jdHguc3Ryb2tlUmVjdCh4ICsgci5zdGFydCAqIHNjYWxpbmcsIHksIHdpZHRoLCBoKTtcbiAgICB9XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoNzAsIDcwLCA3MCwgMC44KSc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaG93QmFyczsgaSsrKSB7XG4gICAgICBhcHAuY3R4LnN0cm9rZVJlY3QoeCArIGkgKiBiYXJXaWR0aCwgeSwgYmFyV2lkdGgsIGgpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==