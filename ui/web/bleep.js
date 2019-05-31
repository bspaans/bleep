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
    app.uploadSequencerDef();
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
      new _button_js__WEBPACK_IMPORTED_MODULE_0__["Button"](10, 10, this.handleUpload.bind(this), ">>>"),
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
  handleUpload() {
    this.app.uploadSequencerDef();
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
    this.buttons[4].x = w - this.buttons[4].w + this.padding;
    this.buttons[4].y = this.padding + 100;
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
    this.channels = [];
    this.tracks = [];
    this.openTimelineEditor();
    this.draw();
  }

  // api callback
  initialiseChannels(channelDefs) {
    this.channels = [];
    var seenPercussionChannel = false;
    for (var def of channelDefs) {
      var ch = new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["Channel"](def.channel || 0);
      ch.loadFromDefinition(def);
      this.channels.push(ch);
      this.tracks.push(new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["Track"](ch, this));
      if (ch.channelNr == 9) {
        seenPercussionChannel = true;
      }
      ch.instrument = new _instrument_editor___WEBPACK_IMPORTED_MODULE_1__["Instrument"]();
      if (def.generator) {
        console.log("Loading channel generator", def.generator);
        ch.instrument.loadFromDefinition(def.generator);
      }
      console.log("New channel", def);
    }
    if (!seenPercussionChannel) {
      var ch = new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["Channel"](9);
      this.channels.push(ch);
      this.tracks.push(new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["Track"](ch, this));
    }
    this.api.requestSequencerDef();
    this.openTimelineEditor();
  }
  
  // api callback
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
        if (channelSequences[s.channel] !== undefined) {
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

  openInstrumentEditor(instr) {
    this.active = new _instrument_editor___WEBPACK_IMPORTED_MODULE_1__["InstrumentEditor"](this, instr, this.openTimelineEditor.bind(this));
    this.draw()
  }
  openTimelineEditor() {
    this.active = new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["TimelineEditor"](this.tracks);
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
      "generator": this.instrument ? this.instrument.compile() : null,
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
}


/***/ }),

/***/ "./src/timeline_editor/index.js":
/*!**************************************!*\
  !*** ./src/timeline_editor/index.js ***!
  \**************************************/
/*! exports provided: Channel, Track, TimelineEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineEditor", function() { return TimelineEditor; });
/* harmony import */ var _channel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./channel.js */ "./src/timeline_editor/channel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Channel", function() { return _channel_js__WEBPACK_IMPORTED_MODULE_0__["Channel"]; });

/* harmony import */ var _track_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./track.js */ "./src/timeline_editor/track.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Track", function() { return _track_js__WEBPACK_IMPORTED_MODULE_1__["Track"]; });





class TimelineEditor {
  constructor(tracks) {
    this.tracks = tracks;
  }
  handleMouseDown(app, x, y) {
    var i = 0;
    for (var e of this.tracks) {
      var v = e.handleMouseDown(app, x, y - (i * (e.height + e.padding * 2)));
      if (v) {
        return v;
      }
      i++;
    }
  }
  draw(app) {
    app.ctx.save();
    var i = 0;
    for (var e of this.tracks) {
      app.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translate
      app.ctx.translate(0, i * (e.height + e.padding * 2));
      e.draw(app);
      i++;
    }
    app.ctx.restore();
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


/***/ }),

/***/ "./src/timeline_editor/track.js":
/*!**************************************!*\
  !*** ./src/timeline_editor/track.js ***!
  \**************************************/
/*! exports provided: Track */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Track", function() { return Track; });

class Track {
  constructor(channel, app) {
    this.channel = channel;
    this.padding = 0;
    this.height = 75;
    this.channelWidth = 90;
    this.selected = null;
    this.app = app;
  }

  handleClick() {
    if (this.selected) {
      this.app.openInstrumentEditor(this.channel.instrument);
    }
  }

  drawChannelSide(app, colorOffset) {

    app.ctx.fillStyle = 'rgb(0, ' + (200 - colorOffset) + ', 0)';
    app.ctx.strokeStyle = 'rgb(40, 40, 40, 1.0)';
    app.ctx.fillRect(this.padding, this.padding, this.channelWidth, this.height);
    app.ctx.strokeRect(this.padding, this.padding, this.channelWidth, this.height);

    app.ctx.fillStyle = 'rgb(255, 255, 255)';
    app.ctx.font = '10px sans-serif';
    app.ctx.fillText(this.channel.name, this.padding + 3, this.padding + 11);
  }

  drawSequenceTracks(app, colorOffset) {
    var height = this.height;
    var marginTop = this.marginTop;
    var padding = this.padding;
    var channelWidth = this.channelWidth;
    var trackWidth = app.canvas.width - channelWidth - padding * 2 - 20;

    app.ctx.fillStyle = 'rgb(255, ' + (200 - colorOffset) + ', 0)';
    app.ctx.strokeStyle = 'rgb(40, 40, 40, 1.0)';
    app.ctx.fillRect(padding + channelWidth, padding, trackWidth, height);
    app.ctx.strokeRect(padding + channelWidth, padding, trackWidth, height);

    var trackHeight = height / this.channel.sequenceTracks.length;
    for (var i = 0; i < this.channel.sequenceTracks.length - 1; i++) {
      app.ctx.strokeRect(padding + channelWidth, padding + i * trackHeight, trackWidth, trackHeight);
    }
    for (var i = 0; i < this.channel.sequenceTracks.length; i++) {
      var s = this.channel.sequenceTracks[i];
      s.draw(app, padding + channelWidth, padding + i * trackHeight, trackWidth, trackHeight);
    }

    var showBars = 4;
    var pointsInRange = showBars * 4;
    var scaling = trackWidth / pointsInRange;
    var barWidth = 4 * scaling;
    app.ctx.fillStyle = 'rgb(40, 40, 40)';
    app.ctx.font = '10px mono';
    for (var i = 0; i < showBars; i++) {
      app.ctx.fillText(i + 1, padding + channelWidth + 3 + i * barWidth, padding + height - 3);
    }
  }

  draw(app) {
    var colorOffset = this.channel.channelNr * 40;
    this.drawChannelSide(app, colorOffset);
    this.drawSequenceTracks(app, colorOffset)
  }

  handleMouseDown(app, x, y) {
    var path = new Path2D();
    var channelSidePath = new Path2D();
    var width = app.canvas.width - this.padding * 2;

    channelSidePath.rect(0, 0, this.channelWidth, this.channelWidth);
    if (app.ctx.isPointInPath(channelSidePath, x, y)) {
      this.selected = this.channel;
      return this;
    }
    path.rect(0, 0, width, this.height + this.padding * 2);
    if (app.ctx.isPointInPath(path, x, y)) {
      return this;
    }
    return false;
  }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21vZHVsZV91bml0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhdGNoLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL2luc3RydW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9jaGFubmVsX2lucHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvY2hhbm5lbF9vdXRwdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9mYWN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9wYW5uaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvc2FtcGxlX2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvbW9kdWxlX3VuaXRzL3RyYW5zcG9zZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL3BhdGNoYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL3BsYXlfbm90ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy9wdWxzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy9yYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy9zZXF1ZW5jZV9pbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL3NlcXVlbmNlLmpzIiwid2VicGFjazovLy8uL3NyYy90aGVtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGltZWxpbmVfZWRpdG9yL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbWVsaW5lX2VkaXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGltZWxpbmVfZWRpdG9yL3NlcXVlbmNlX3RyYWNrLmpzIiwid2VicGFjazovLy8uL3NyYy90aW1lbGluZV9lZGl0b3IvdHJhY2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3JEQTtBQUFBO0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFBQTtBQUFBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTZDO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGdFQUFhO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXVDO0FBQ0o7QUFDQTs7QUFFNUI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVCTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsNENBQTRDO0FBQy9EO0FBQ0E7QUFDQSxtQkFBbUIsd0NBQXdDO0FBQzNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmxlZXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluLmpzXCIpO1xuIiwiXG5jb25zdCBUZXN0TWVzc2FnZSA9IFwidGVzdFwiO1xuY29uc3QgU3RhdHVzTWVzc2FnZSA9IFwic3RhdHVzXCI7XG5jb25zdCBDaGFubmVsRGVmTWVzc2FnZSA9IFwiY2hhbm5lbF9kZWZcIjtcbmNvbnN0IFNlcXVlbmNlckRlZk1lc3NhZ2UgPSBcInNlcXVlbmNlcl9kZWZcIjtcbmNvbnN0IFNldFNlcXVlbmNlckRlZk1lc3NhZ2UgPSBcInNldF9zZXF1ZW5jZXJfZGVmXCI7XG5cbmV4cG9ydCBjbGFzcyBBUEkge1xuXG4gIGNvbnN0cnVjdG9yKGFwcCkge1xuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIHRoaXMuc29ja2V0ID0gbnVsbDtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHZhciBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KFwid3M6Ly9sb2NhbGhvc3Q6MTAwMDAvd3NcIik7XG4gICAgc29ja2V0Lm9ub3BlbiA9ICgoZSkgPT4ge1xuICAgICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7XG4gICAgICB0aGlzLnNlbmREYXRhKENoYW5uZWxEZWZNZXNzYWdlLCBcInRlc3RcIik7XG4gICAgfSkuYmluZCh0aGlzKVxuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSB0aGlzLmhhbmRsZU1lc3NhZ2VSZWNlaXZlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlTWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxuICAgIHZhciBtc2cgPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG4gICAgaWYgKG1zZy50eXBlID09PSBDaGFubmVsRGVmTWVzc2FnZSkge1xuICAgICAgdGhpcy5hcHAuaW5pdGlhbGlzZUNoYW5uZWxzKG1zZy5kYXRhKTtcbiAgICB9IGVsc2UgaWYgKG1zZy50eXBlID09PSBTZXF1ZW5jZXJEZWZNZXNzYWdlKSB7XG4gICAgICB0aGlzLmFwcC5pbml0aWFsaXNlU2VxdWVuY2VUcmFja3MobXNnLmRhdGEpO1xuICAgIH1cbiAgfVxuICByZXF1ZXN0U2VxdWVuY2VyRGVmKCkge1xuICAgIHRoaXMuc2VuZERhdGEoU2VxdWVuY2VyRGVmTWVzc2FnZSwgbnVsbCk7XG4gIH1cbiAgc2V0U2VxdWVuY2VyRGVmKGRlZikge1xuICAgIHRoaXMuc2VuZERhdGEoU2V0U2VxdWVuY2VyRGVmTWVzc2FnZSwgSlNPTi5zdHJpbmdpZnkoZGVmKSk7XG4gIH1cblxuICBzZW5kRGF0YSh0eXBlLCBkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZEpTT04oe1widHlwZVwiOiB0eXBlLCBcImRhdGFcIjogZGF0YX0pO1xuICB9XG5cbiAgc2VuZEpTT04ob2JqKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gIH1cblxuICBzZW5kTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgaWYgKHRoaXMuc29ja2V0KSB7XG4gICAgICB0aGlzLnNvY2tldC5zZW5kKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJcbmV4cG9ydCBjbGFzcyBCdXR0b24ge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBvbkNsaWNrLCBsYWJlbCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLncgPSAyNTtcbiAgICB0aGlzLmggPSAyNTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gb25DbGljaztcbiAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgdGhpcy5jb2xvdXIgPSBudWxsO1xuICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICB0aGlzLncgPSAzNTtcbiAgICB9XG4gIH1cbiAgZHJhdyhhcHApIHtcbiAgICB2YXIgdyA9IHRoaXMudztcbiAgICB2YXIgaCA9IHRoaXMuaDtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLkJ1dHRvbjtcbiAgICBpZiAodGhpcy5jb2xvdXIpIHtcbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvdXI7XG4gICAgfVxuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5PdXRsaW5lQ29sb3VyO1xuICAgIGFwcC5jdHgubGluZVdpZHRoID0gMTtcbiAgICBhcHAuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB3LCBoKTtcbiAgICBhcHAuY3R4LnN0cm9rZVJlY3QodGhpcy54LCB0aGlzLnksIHcsIGgpO1xuICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICBhcHAuY3R4LmZvbnQgPSAnMTBweCBtb25vJztcbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuQnV0dG9uVGV4dDtcbiAgICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy5sYWJlbCwgdGhpcy54ICsgdyAvIDIsIHRoaXMueSArIDE1KTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIGlmICh4ID49IHRoaXMueCAmJiB4IDw9IHRoaXMueCArIHRoaXMudyAmJiB5ID49IHRoaXMueSAmJiB5IDw9IHRoaXMueSArIHRoaXMuaCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDbG9zZUJ1dHRvbiBleHRlbmRzIEJ1dHRvbiB7XG59XG4iLCJleHBvcnQgY2xhc3MgRGlhbCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGxhYmVsLCBtaW4sIG1heCwgY3VycmVudCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgdGhpcy5yYWRpdXMgPSAxNTtcbiAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLnZhbHVlID0gY3VycmVudDtcbiAgfVxuICBkcmF3KGFwcCkge1xuXG4gICAgLy8gRHJhdyBkaWFsXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5EaWFsO1xuICAgIGFwcC5jdHguYmVnaW5QYXRoKCk7XG4gICAgYXBwLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgYXBwLmN0eC5maWxsKCk7XG4gICAgYXBwLmN0eC5jbG9zZVBhdGgoKTtcblxuICAgIHZhciByYW5nZSA9IHRoaXMubWF4IC0gdGhpcy5taW47XG4gICAgdmFyIHRhdSA9IDIgKiBNYXRoLlBJXG4gICAgdmFyIHZhbHVlID0gdGF1IC0gKHRhdSAqICh0aGlzLnZhbHVlIC0gdGhpcy5taW4pIC8gcmFuZ2UpXG4gICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcbiAgICB2YXIgZHggPSBNYXRoLnNpbih2YWx1ZSkgKiB0aGlzLnJhZGl1cztcbiAgICB2YXIgZHkgPSBNYXRoLmNvcyh2YWx1ZSkgKiB0aGlzLnJhZGl1cztcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuRGlhbExpbmU7XG4gICAgYXBwLmN0eC5saW5lV2lkdGggPSAyO1xuICAgIGFwcC5jdHgubW92ZVRvKHRoaXMueCwgdGhpcy55KTtcbiAgICBhcHAuY3R4LmxpbmVUbyh0aGlzLnggKyBkeCwgdGhpcy55ICsgZHkpO1xuICAgIGFwcC5jdHguc3Ryb2tlKCk7XG4gICAgYXBwLmN0eC5saW5lV2lkdGggPSAxO1xuXG4gICAgLy8gRHJhdyBsYWJlbFxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlVGV4dDtcbiAgICBhcHAuY3R4LmZvbnQgPSAnMTBweCBtb25vJztcbiAgICB2YXIgY2VudGVyWCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueSAtIHRoaXMucmFkaXVzIC0gMztcbiAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLmxhYmVsLCBjZW50ZXJYLCB5KTtcblxuICAgIC8vIERyYXcgdmFsdWVcbiAgICBhcHAuY3R4LmZpbGxUZXh0KHRoaXMudmFsdWUudG9GaXhlZCgyKSwgY2VudGVyWCwgdGhpcy55ICsgdGhpcy5yYWRpdXMgKyAxMik7XG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIGlmICh4ID49IHRoaXMueCAtIHRoaXMucmFkaXVzICYmIHggPD0gdGhpcy54ICsgdGhpcy5yYWRpdXMgJiYgeSA+PSB0aGlzLnkgLSB0aGlzLnJhZGl1cyAmJiB5IDw9IHRoaXMucmFkaXVzICsgdGhpcy55KSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cbiAgaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSkge1xuICAgIGR4ID0geCAtIHRoaXMueDtcbiAgICBkeSA9IHkgLSB0aGlzLnk7XG4gICAgdmFyIHNpbiA9IGR5IC8gTWF0aC5zcXJ0KGR5ICogZHkgKyBkeCAqIGR4KVxuICAgIHZhciBzY2FsZWRDb3MgPSAxLjAgLSAoc2luICsgMSkgLyAyO1xuICAgIHZhciByYW5nZSA9IHRoaXMubWF4IC0gdGhpcy5taW47XG4gICAgdGhpcy52YWx1ZSA9IHJhbmdlICogc2NhbGVkQ29zICsgdGhpcy5taW47XG4gICAgYXBwLnVwbG9hZFNlcXVlbmNlckRlZigpO1xuICAgIGFwcC5kcmF3KCk7XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgQ2xvc2VCdXR0b24sIEJ1dHRvbiB9IGZyb20gJy4vYnV0dG9uLmpzJztcbmltcG9ydCB7IE1vZHVsZSB9IGZyb20gJy4vbW9kdWxlLmpzJztcblxuZXhwb3J0IGNsYXNzIEVkaXRvciB7XG4gIGNvbnN0cnVjdG9yKGFwcCwgdGFyZ2V0LCBoYW5kbGVDbG9zZSkge1xuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIHRoaXMucGFkZGluZyA9IGFwcC50aGVtZS5wYWRkaW5nO1xuICAgIHRoaXMuc2NhbGUgPSAxLjBcbiAgICB0aGlzLnNob3dDb21waWxlID0gdHJ1ZTtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLmJ1dHRvbnMgPSBbXG4gICAgICBuZXcgQ2xvc2VCdXR0b24oMTAsIDEwLCBoYW5kbGVDbG9zZSwgXCJYXCIpLFxuICAgICAgbmV3IEJ1dHRvbigxMCwgMTAsIHRoaXMuaGFuZGxlU2hvd0NvbXBpbGUuYmluZCh0aGlzKSwgXCJKU09OXCIpLFxuICAgICAgbmV3IEJ1dHRvbigxMCwgMTAsIHRoaXMuaGFuZGxlWm9vbUluLmJpbmQodGhpcyksIFwiK1wiKSxcbiAgICAgIG5ldyBCdXR0b24oMTAsIDEwLCB0aGlzLmhhbmRsZVpvb21PdXQuYmluZCh0aGlzKSwgXCItXCIpLFxuICAgICAgbmV3IEJ1dHRvbigxMCwgMTAsIHRoaXMuaGFuZGxlVXBsb2FkLmJpbmQodGhpcyksIFwiPj4+XCIpLFxuICAgIF07XG4gIH1cbiAgaGFuZGxlQWRkVW5pdChjb25zdHJ1Y3Rvcikge1xuICAgIHZhciBnID0gY29uc3RydWN0b3IoKVxuICAgIHRoaXMudGFyZ2V0Lm1vZHVsZXMucHVzaChuZXcgTW9kdWxlKHRoaXMudGFyZ2V0LCBNYXRoLnJhbmRvbSgpICogNzAwLCBNYXRoLnJhbmRvbSgpICogNjAwLCBnKSk7XG4gICAgdGhpcy5hcHAuZHJhdygpO1xuICB9XG4gIGhhbmRsZVpvb21JbigpIHtcbiAgICB0aGlzLnNjYWxlICs9IC4xXG4gICAgdGhpcy5hcHAuZHJhdygpO1xuICB9XG4gIGhhbmRsZVpvb21PdXQoKSB7XG4gICAgdGhpcy5zY2FsZSAtPSAuMTtcbiAgICB0aGlzLmFwcC5kcmF3KCk7XG4gIH1cbiAgaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSkge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkLmhhbmRsZURyYWcoYXBwLCBkeCwgZHksIHgsIHkpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVEcm9wKGFwcCwgeCwgeSkge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkLmhhbmRsZURyb3AoYXBwLCB4IC0gdGhpcy5wYWRkaW5nLCB5IC0gdGhpcy5wYWRkaW5nKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlU2hvd0NvbXBpbGUoKSB7XG4gICAgdGhpcy5zaG93Q29tcGlsZSA9ICF0aGlzLnNob3dDb21waWxlO1xuICAgIHRoaXMuYXBwLmRyYXcoKTtcbiAgfVxuICBoYW5kbGVVcGxvYWQoKSB7XG4gICAgdGhpcy5hcHAudXBsb2FkU2VxdWVuY2VyRGVmKCk7XG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgIGZvciAodmFyIGIgb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICB2YXIgdiA9IGIuaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSk7XG4gICAgICBpZiAodikge1xuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgbSBvZiB0aGlzLnRhcmdldC5tb2R1bGVzKSB7XG4gICAgICB2YXIgdiA9IG0uaGFuZGxlTW91c2VEb3duKGFwcCwgeCAtIHRoaXMucGFkZGluZywgeSAtIHRoaXMucGFkZGluZyk7XG4gICAgICBpZiAodikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGRyYXcoYXBwKSB7XG4gICAgdmFyIHcgPSBhcHAuY2FudmFzLndpZHRoIC0gMiAqIHRoaXMucGFkZGluZztcbiAgICB2YXIgaCA9IGFwcC5jYW52YXMuaGVpZ2h0IC0gMiAqIHRoaXMucGFkZGluZztcbiAgICB0aGlzLmJ1dHRvbnNbMF0ueCA9IHcgLSB0aGlzLmJ1dHRvbnNbMF0udyArIHRoaXMucGFkZGluZztcbiAgICB0aGlzLmJ1dHRvbnNbMF0ueSA9IHRoaXMucGFkZGluZztcbiAgICB0aGlzLmJ1dHRvbnNbMV0ueCA9IHcgLSB0aGlzLmJ1dHRvbnNbMV0udyArIHRoaXMucGFkZGluZztcbiAgICB0aGlzLmJ1dHRvbnNbMV0ueSA9IHRoaXMucGFkZGluZyArIDI1O1xuICAgIHRoaXMuYnV0dG9uc1syXS54ID0gdyAtIHRoaXMuYnV0dG9uc1syXS53ICsgdGhpcy5wYWRkaW5nO1xuICAgIHRoaXMuYnV0dG9uc1syXS55ID0gdGhpcy5wYWRkaW5nICsgNTA7XG4gICAgdGhpcy5idXR0b25zWzNdLnggPSB3IC0gdGhpcy5idXR0b25zWzNdLncgKyB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5idXR0b25zWzNdLnkgPSB0aGlzLnBhZGRpbmcgKyA3NTtcbiAgICB0aGlzLmJ1dHRvbnNbNF0ueCA9IHcgLSB0aGlzLmJ1dHRvbnNbNF0udyArIHRoaXMucGFkZGluZztcbiAgICB0aGlzLmJ1dHRvbnNbNF0ueSA9IHRoaXMucGFkZGluZyArIDEwMDtcbiAgICBhcHAuY3R4LnNhdmUoKTtcbiAgICBhcHAuY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgXG4gICAgLy8gRHJhdyB0aGUgYmFja2dyb3VuZFxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuSW5zdHJ1bWVudEVkaXRvckJhY2tncm91bmQ7XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLk91dGxpbmVDb2xvdXI7XG4gICAgYXBwLmN0eC5maWxsUmVjdCh0aGlzLnBhZGRpbmcsIHRoaXMucGFkZGluZywgdywgaCk7XG5cbiAgICAvLyBEcmF3IHRoZSBidXR0b25zIFxuICAgIGZvciAodmFyIGIgb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICBiLmRyYXcoYXBwKTtcbiAgICB9XG5cbiAgICAvLyBEcmF3IHRoZSBjb21waWxlZCBnZW5lcmF0b3IgSlNPTlxuICAgIGlmICh0aGlzLnNob3dDb21waWxlKSB7XG4gICAgICB2YXIgdHh0ID0gSlNPTi5zdHJpbmdpZnkodGhpcy50YXJnZXQuY29tcGlsZSgpLCBudWxsLCAyKTtcbiAgICAgIHZhciBsaW5lTnIgPSAwO1xuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVUZXh0O1xuICAgICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcInN0YXJ0XCI7XG4gICAgICBmb3IgKHZhciBsaW5lIG9mIHR4dC5zcGxpdChcIlxcblwiKSkge1xuICAgICAgICBhcHAuY3R4LmZpbGxUZXh0KGxpbmUsIHcgLSAzMDAsIDkwICsgbGluZU5yICogMTIpO1xuICAgICAgICBsaW5lTnIrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEcmF3IHRoZSBtb2R1bGVzXG4gICAgZm9yICh2YXIgbSBvZiB0aGlzLnRhcmdldC5tb2R1bGVzKSB7XG4gICAgICBhcHAuY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTsgLy8gcmVzZXQgdHJhbnNsYXRlXG4gICAgICBhcHAuY3R4LnNjYWxlKHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xuICAgICAgYXBwLmN0eC50cmFuc2xhdGUodGhpcy5wYWRkaW5nLCB0aGlzLnBhZGRpbmcpO1xuICAgICAgbS5kcmF3KGFwcCk7XG4gICAgfVxuICAgIGFwcC5jdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApOyAvLyByZXNldCB0cmFuc2xhdGVcbiAgICBhcHAuY3R4LnNjYWxlKHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xuXG5cbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLlBhdGNoO1xuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5QYXRjaDtcblxuICAgIC8vIERyYXcgdGhlIHBhdGNoZXNcbiAgICBmb3IgKHZhciBwIG9mIHRoaXMudGFyZ2V0LnBhdGNoZXMpIHtcbiAgICAgIHZhciBmcm9tTW9kID0gdGhpcy50YXJnZXQubW9kdWxlc1twLmZyb21dO1xuICAgICAgdmFyIHRvTW9kID0gdGhpcy50YXJnZXQubW9kdWxlc1twLnRvXTtcbiAgICAgIHZhciBmcm9tU29ja2V0ID0gcC5nZXRGcm9tU29ja2V0KGZyb21Nb2QpO1xuICAgICAgdmFyIHRvU29ja2V0ID0gcC5nZXRUb1NvY2tldCh0b01vZCk7XG4gICAgICB2YXIgZnJvbVggPSB0aGlzLnBhZGRpbmcgKyBmcm9tTW9kLnggKyBmcm9tU29ja2V0Lng7XG4gICAgICB2YXIgZnJvbVkgPSB0aGlzLnBhZGRpbmcgKyBmcm9tTW9kLnkgKyBmcm9tU29ja2V0Lnk7XG4gICAgICB2YXIgdG9YID0gdGhpcy5wYWRkaW5nICsgdG9Nb2QueCArIHRvU29ja2V0Lng7XG4gICAgICB2YXIgdG9ZID0gdGhpcy5wYWRkaW5nICsgdG9Nb2QueSArIHRvU29ja2V0Lnk7XG4gICAgICB2YXIgcG9pbnRPZmZzZXQgPSA3MDtcblxuICAgICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9IHAuZ2V0Q29sb3IoYXBwLnRoZW1lKTtcbiAgICAgIGFwcC5jdHgubGluZVdpZHRoID0gNDtcbiAgICAgIGFwcC5jdHguYmVnaW5QYXRoKCk7XG4gICAgICBhcHAuY3R4Lm1vdmVUbyhmcm9tWCwgZnJvbVkpO1xuICAgICAgYXBwLmN0eC5iZXppZXJDdXJ2ZVRvKFxuICAgICAgICBmcm9tWCwgXG4gICAgICAgIGZyb21ZICsgcG9pbnRPZmZzZXQsIFxuICAgICAgICB0b1gsIFxuICAgICAgICB0b1kgKyBwb2ludE9mZnNldCwgXG4gICAgICAgIHRvWCwgXG4gICAgICAgIHRvWSk7XG4gICAgICBhcHAuY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIGFwcC5jdHgucmVzdG9yZSgpO1xuICB9XG59XG4iLCJleHBvcnQgeyBEaWFsIH0gZnJvbSAnLi9kaWFsLmpzJztcbmV4cG9ydCB7IFNvY2tldCwgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCB9IGZyb20gJy4vc29ja2V0LmpzJztcbmV4cG9ydCB7IEJ1dHRvbiwgQ2xvc2VCdXR0b24gfSBmcm9tICcuL2J1dHRvbi5qcyc7XG5leHBvcnQgeyBQYXRjaCB9IGZyb20gJy4vcGF0Y2guanMnO1xuZXhwb3J0IHsgTW9kdWxlIH0gZnJvbSAnLi9tb2R1bGUuanMnO1xuZXhwb3J0IHsgTW9kdWxlVW5pdCB9IGZyb20gJy4vbW9kdWxlX3VuaXQuanMnO1xuZXhwb3J0IHsgRWRpdG9yIH0gZnJvbSAnLi9lZGl0b3IuanMnO1xuIiwiaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnLi9zb2NrZXQuanMnO1xuaW1wb3J0IHsgRGlhbCB9IGZyb20gJy4vZGlhbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcih0YXJnZXQsIHgsIHksIHVuaXQpIHtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy51bml0ID0gdW5pdDtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcbiAgICB0aGlzLnVuaXQuZHJhdyhhcHApO1xuICB9XG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICB2YXIgdiA9IHRoaXMudW5pdC5oYW5kbGVNb3VzZURvd24oYXBwLCB4IC0gdGhpcy54LCB5IC0gdGhpcy55KTtcbiAgICBpZiAoIXYpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZCA9IHY7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSkge1xuICAgIHZhciB2ID0gdGhpcy5zZWxlY3RlZDtcbiAgICBpZiAodiBpbnN0YW5jZW9mIFNvY2tldCkge1xuICAgICAgdi5oYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4LCB5KTtcbiAgICB9IGVsc2UgaWYgKHYgaW5zdGFuY2VvZiBEaWFsKSB7XG4gICAgICB2LmhhbmRsZURyYWcoYXBwLCBkeCwgZHksIHggLSB0aGlzLngsIHkgLSB0aGlzLnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnggKz0gZHg7XG4gICAgICB0aGlzLnkgKz0gZHk7XG4gICAgfVxuICB9XG4gIGhhbmRsZURyb3AoYXBwLCB4LCB5KSB7XG4gICAgdmFyIHYgPSB0aGlzLnNlbGVjdGVkO1xuICAgIGlmICh2IGluc3RhbmNlb2YgU29ja2V0KSB7XG4gICAgICBmb3IgKHZhciBtb2R1bGUgb2YgdGhpcy50YXJnZXQubW9kdWxlcykge1xuICAgICAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMobW9kdWxlLnVuaXQuc29ja2V0cykpIHtcbiAgICAgICAgICB2YXIgcyA9IG1vZHVsZS51bml0LnNvY2tldHNba2V5XTtcbiAgICAgICAgICB2YXIgc3ggPSB4IC0gbW9kdWxlLng7XG4gICAgICAgICAgdmFyIHN5ID0geSAtIG1vZHVsZS55O1xuICAgICAgICAgIHZhciByZXN1bHQgPSBzLmhhbmRsZU1vdXNlRG93bihhcHAsIHN4LCBzeSk7XG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXQuYWRkUGF0Y2godGhpcywgbW9kdWxlLCB2LmxhYmVsLCByZXN1bHQubGFiZWwpO1xuICAgICAgICAgICAgYXBwLmRyYXcoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy53ID0gMTUwO1xuICAgIHRoaXMuaCA9IDE1MDtcbiAgICB0aGlzLnNvY2tldHMgPSB7fTtcbiAgICB0aGlzLmRpYWxzID0ge307XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gXCJcIjtcbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIHZhciB3ID0gdGhpcy53O1xuICAgIHZhciBoID0gdGhpcy5oO1xuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnNbdGhpcy5iYWNrZ3JvdW5kXTtcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlT3V0bGluZTtcbiAgICBhcHAuY3R4LmZpbGxSZWN0KDAsIDAsIHcsIGgpO1xuICAgIGFwcC5jdHguc3Ryb2tlUmVjdCgwLCAwLCB3LCBoKTtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZVRleHQ7XG4gICAgYXBwLmN0eC5mb250ID0gJzE0cHggbW9ubyc7XG4gICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy50eXBlLCB3IC8gMiwgMTQpO1xuICAgIGZvciAodmFyIG8gb2YgT2JqZWN0LmtleXModGhpcy5zb2NrZXRzKSkge1xuICAgICAgdGhpcy5zb2NrZXRzW29dLmRyYXcoYXBwKTtcbiAgICB9XG4gICAgZm9yICh2YXIgbyBvZiBPYmplY3Qua2V5cyh0aGlzLmRpYWxzKSkge1xuICAgICAgdGhpcy5kaWFsc1tvXS5kcmF3KGFwcCk7XG4gICAgfVxuICB9XG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICBmb3IgKHZhciBvIG9mIE9iamVjdC5rZXlzKHRoaXMuc29ja2V0cykpIHtcbiAgICAgIHZhciB2ID0gdGhpcy5zb2NrZXRzW29dLmhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpO1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIG8gb2YgT2JqZWN0LmtleXModGhpcy5kaWFscykpIHtcbiAgICAgIHZhciB2ID0gdGhpcy5kaWFsc1tvXS5oYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KTtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHJldHVybiB2O1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgcGF0aCA9IG5ldyBQYXRoMkQoKTtcbiAgICBwYXRoLnJlY3QoMCwgMCwgdGhpcy53LCB0aGlzLmgpO1xuICAgIGlmIChhcHAuY3R4LmlzUG9pbnRJblBhdGgocGF0aCwgeCwgeSkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNvbm5lY3Rpb25zIGlzIGEge30gbWFwcGluZyB0aGlzIHVuaXQncyBpbnB1dCBzb2NrZXQgSURzIFxuICAvLyB0byBhIGxpc3Qgb2YgY29ubmVjdGVkIHVuaXRzLlxuICAvL1xuICBjb21waWxlKGNvbm5lY3Rpb25zKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuIiwiZXhwb3J0IGNsYXNzIFBhdGNoIHtcbiAgY29uc3RydWN0b3IoZnJvbU1vZHVsZSwgdG9Nb2R1bGUsIGZyb21Tb2NrZXQsIHRvU29ja2V0LCB0eXBlKSB7XG4gICAgdGhpcy5mcm9tID0gZnJvbU1vZHVsZTtcbiAgICB0aGlzLnRvID0gdG9Nb2R1bGU7XG4gICAgdGhpcy5mcm9tU29ja2V0ID0gZnJvbVNvY2tldDtcbiAgICB0aGlzLnRvU29ja2V0ID0gdG9Tb2NrZXQ7XG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICB0aHJvdyAnTWlzc2luZyB0eXBlIGluIFBhdGNoJztcbiAgICB9XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuICBnZXRGcm9tU29ja2V0KG1vZCkge1xuICAgIHJldHVybiBtb2QudW5pdC5zb2NrZXRzW3RoaXMuZnJvbVNvY2tldF07XG4gIH1cbiAgZ2V0VG9Tb2NrZXQobW9kKSB7XG4gICAgcmV0dXJuIG1vZC51bml0LnNvY2tldHNbdGhpcy50b1NvY2tldF07XG4gIH1cbiAgaXNJc29tb3JwaGljKHApIHtcbiAgICByZXR1cm4gKHRoaXMuZnJvbSA9PSBwLmZyb20gXG4gICAgICAgICYmIHRoaXMudG8gPT0gcC50byBcbiAgICAgICAgJiYgdGhpcy5mcm9tU29ja2V0ID09IHAuZnJvbVNvY2tldCBcbiAgICAgICAgJiYgdGhpcy50b1NvY2tldCA9PSBwLnRvU29ja2V0KSBcbiAgICAgIHx8IFxuICAgICAgKHRoaXMudG8gPT0gcC5mcm9tXG4gICAgICAgICYmIHRoaXMuZnJvbSA9PSBwLnRvIFxuICAgICAgICAmJiB0aGlzLmZyb21Tb2NrZXQgPT0gcC50b1NvY2tldCBcbiAgICAgICAgJiYgdGhpcy50b1NvY2tldCA9PSBwLmZyb21Tb2NrZXQpO1xuICB9XG4gIGRvZXNQYXRjaENvbm5lY3RUbyhtb2R1bGUsIHNvY2tldCkge1xuICAgIHJldHVybiAodGhpcy5mcm9tID09IG1vZHVsZSAmJiB0aGlzLmZyb21Tb2NrZXQgPT0gc29ja2V0KSB8fFxuICAgICAgKHRoaXMudG8gPT0gbW9kdWxlICYmIHRoaXMudG9Tb2NrZXQgPT0gc29ja2V0KVxuICB9XG4gIGNvbm5lY3RzVG8obW9kdWxlLCBzb2NrZXQpIHtcbiAgICBpZiAodGhpcy5mcm9tID09IG1vZHVsZSAmJiB0aGlzLmZyb21Tb2NrZXQgPT0gc29ja2V0KSB7XG4gICAgICByZXR1cm4ge21vZHVsZTogdGhpcy50bywgc29ja2V0OiB0aGlzLnRvU29ja2V0fVxuICAgIH1cbiAgICByZXR1cm4ge21vZHVsZTogdGhpcy5mcm9tLCBzb2NrZXQ6IHRoaXMuZnJvbVNvY2tldH1cbiAgfVxuICBnZXRDb2xvcih0aGVtZSkge1xuICAgIGlmICh0aGVtZS5jb2xvdXJzLlBhdGNoZXNbdGhpcy50eXBlXSkge1xuICAgICAgcmV0dXJuIHRoZW1lLmNvbG91cnMuUGF0Y2hlc1t0aGlzLnR5cGVdO1xuICAgIH1cbiAgICByZXR1cm4gdGhlbWUuY29sb3Vycy5QYXRjaDtcbiAgfVxufVxuXG4iLCJleHBvcnQgY2xhc3MgU29ja2V0IHtcbiAgY29uc3RydWN0b3IoeCwgeSwgbGFiZWwsIHR5cGUsIGlzSW5wdXQpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgIHRoaXMucmFkaXVzID0gODtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuaXNJbnB1dCA9IGlzSW5wdXQ7XG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICB0aHJvdyAnTWlzc2luZyBTb2NrZXQgdHlwZSBmb3IgU29ja2V0IHdpdGggbGFiZWw6ICcgKyBsYWJlbDtcbiAgICB9XG4gICAgaWYgKGlzSW5wdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgJ01pc3NpbmcgU29ja2V0IGlzSW5wdXQgZm9yIFNvY2tldCB3aXRoIGxhYmVsOiAnICsgbGFiZWw7XG4gICAgfVxuICB9XG4gIGRyYXcoYXBwKSB7XG4gICAgLy8gRHJhdyBPY3RhZ29uXG4gICAgdmFyIG9jdGFfc2hvcnQgPSAwLjI5Mjg5MzIxODgxMzQ1MjQ3NTU5OTE1NTYzNzg5NTE1OztcbiAgICB2YXIgb2N0YV9sb25nID0gMSAtIG9jdGFfc2hvcnQ7XG4gICAgdmFyIG9jdGFnb24gPSB7XG4gICAgICBzaXplOiAyICogdGhpcy5yYWRpdXMgKyA0LFxuICAgIH1cbiAgICB2YXIgeCA9IHRoaXMueCAtIHRoaXMucmFkaXVzIC0gMjtcbiAgICB2YXIgeSA9IHRoaXMueSAtIHRoaXMucmFkaXVzIC0gMjtcbiAgICBhcHAuY3R4LmJlZ2luUGF0aCgpO1xuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuU29ja2V0QmFja2dyb3VuZDtcbiAgICBpZiAoYXBwLnRoZW1lLmNvbG91cnMuU29ja2V0c1t0aGlzLnR5cGVdKSB7IFxuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Tb2NrZXRzW3RoaXMudHlwZV07XG4gICAgfVxuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Tb2NrZXRPdXRsaW5lO1xuICAgIGFwcC5jdHgubW92ZVRvKHggKyBvY3RhZ29uLnNpemUgKiBvY3RhX3Nob3J0LCB5KTtcbiAgICBhcHAuY3R4LmxpbmVUbyh4LCB5ICsgb2N0YWdvbi5zaXplICogb2N0YV9zaG9ydCk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCwgeSArIG9jdGFnb24uc2l6ZSAqIG9jdGFfbG9uZyk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCArIG9jdGFnb24uc2l6ZSAqIG9jdGFfc2hvcnQsIHkgKyBvY3RhZ29uLnNpemUpO1xuICAgIGFwcC5jdHgubGluZVRvKHggKyBvY3RhZ29uLnNpemUgKiBvY3RhX2xvbmcsIHkgKyBvY3RhZ29uLnNpemUpO1xuICAgIGFwcC5jdHgubGluZVRvKHggKyBvY3RhZ29uLnNpemUsIHkgKyAgb2N0YWdvbi5zaXplICogb2N0YV9sb25nKTtcbiAgICBhcHAuY3R4LmxpbmVUbyh4ICsgb2N0YWdvbi5zaXplLCB5ICsgb2N0YWdvbi5zaXplICogb2N0YV9zaG9ydCk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCArIG9jdGFnb24uc2l6ZSAqIG9jdGFfbG9uZywgeSk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCArIG9jdGFnb24uc2l6ZSAqIG9jdGFfc2hvcnQsIHkpO1xuICAgIGFwcC5jdHguZmlsbCgpO1xuICAgIGFwcC5jdHguc3Ryb2tlKCk7XG5cbiAgICAvLyBEcmF3IGhvbGVcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuU29ja2V0SW5zaWRlO1xuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuU29ja2V0SW5zaWRlO1xuICAgIGFwcC5jdHguYmVnaW5QYXRoKCk7XG4gICAgYXBwLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzIC0gMiwgMCwgMiAqIE1hdGguUEkpO1xuICAgIGFwcC5jdHguZmlsbCgpO1xuXG4gICAgLy8gRHJhdyBsYWJlbFxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlVGV4dDtcbiAgICBhcHAuY3R4LmZvbnQgPSAnMTBweCBtb25vJztcbiAgICB2YXIgY2VudGVyWCA9IHRoaXMueDtcbiAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLmxhYmVsLCBjZW50ZXJYLCB5IC0gMyk7XG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIGlmICh4ID49IHRoaXMueCAtIHRoaXMucmFkaXVzICYmIHggPD0gdGhpcy54ICsgdGhpcy5yYWRpdXMgKyA0ICYmIHkgPj0gdGhpcy55IC0gdGhpcy5yYWRpdXMgJiYgeSA8PSB0aGlzLnkgKyB0aGlzLnJhZGl1cyArIDQpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuICBoYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4LCB5KSB7XG4gICAgaWYgKHRoaXMub25EcmFnKSB7XG4gICAgICB0aGlzLm9uRHJhZyhhcHAsIHRoaXMsIGR4LCBkeSwgeCwgeSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnB1dFNvY2tldCBleHRlbmRzIFNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGxhYmVsLCB0eXBlKSB7XG4gICAgc3VwZXIoeCwgeSwgbGFiZWwsIHR5cGUsIHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRTb2NrZXQgZXh0ZW5kcyBTb2NrZXQge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBsYWJlbCwgdHlwZSkge1xuICAgIHN1cGVyKHgsIHksIGxhYmVsLCB0eXBlLCBmYWxzZSk7XG4gIH1cbn1cbiIsImV4cG9ydCB7IEluc3RydW1lbnQgfSBmcm9tICcuL2luc3RydW1lbnQuanMnO1xuaW1wb3J0IHsgSW5zdHJ1bWVudCB9IGZyb20gJy4vaW5zdHJ1bWVudC5qcyc7XG5pbXBvcnQgeyBDaGFubmVsSW5wdXQsIENoYW5uZWxPdXRwdXQsIFNhbXBsZUdlbmVyYXRvciwgRmlsdGVyLCBUcmFuc3Bvc2UsIFBhbm5pbmd9IGZyb20gJy4vbW9kdWxlX3VuaXRzJztcbmltcG9ydCB7IEJ1dHRvbiwgRWRpdG9yLCBNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzLyc7XG5cbmV4cG9ydCBjbGFzcyBJbnN0cnVtZW50RWRpdG9yIGV4dGVuZHMgRWRpdG9yIHtcbiAgY29uc3RydWN0b3IoYXBwLCBpbnN0cnVtZW50LCBoYW5kbGVDbG9zZSkge1xuICAgIHN1cGVyKGFwcCwgaW5zdHJ1bWVudCwgaGFuZGxlQ2xvc2UpO1xuICAgIGlmICghaW5zdHJ1bWVudCkge1xuICAgICAgaW5zdHJ1bWVudCA9IG5ldyBJbnN0cnVtZW50KFtdLCBbXSk7XG4gICAgICB2YXIgbW9kdWxlcyA9IFtcbiAgICAgICAgbmV3IE1vZHVsZShpbnN0cnVtZW50LCAzMCwgMzAsIG5ldyBDaGFubmVsSW5wdXQoJ2lucHV0JykpLCBcbiAgICAgICAgbmV3IE1vZHVsZShpbnN0cnVtZW50LCA4MDAsIDMwLCBuZXcgQ2hhbm5lbE91dHB1dCgnb3V0cHV0JykpLFxuICAgICAgXTtcbiAgICAgIGluc3RydW1lbnQubW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgfVxuICAgIHRoaXMudGFyZ2V0ID0gaW5zdHJ1bWVudDtcbiAgICB2YXIgYnV0dG9uRGVmcyA9IFtcbiAgICAgICAge2xhYmVsOiBcIlNJTlwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiU1FVXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic3F1YXJlXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlNBV1wiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNhd1wiKX0sXG4gICAgICAgIHtsYWJlbDogXCJUUklcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJ0cmlhbmdsZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJQV01cIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJwdWxzZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJXQVZcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJ3YXZcIil9LFxuICAgICAgICB7bGFiZWw6IFwiTk9JXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwid2hpdGVfbm9pc2VcIil9LFxuICAgICAgICB7bGFiZWw6IFwiR1JBXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwiZ3JhaW5cIil9LFxuICAgICAgICB7bGFiZWw6IFwiVk9DXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwidm9jb2RlclwiKX0sXG4gICAgXTtcbiAgICB2YXIgZmlsdGVyRGVmcyA9IFtcbiAgICAgIHtsYWJlbDogXCJMUEZcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJsb3cgcGFzcyBmaWx0ZXJcIil9LFxuICAgICAge2xhYmVsOiBcIkhQRlwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcImhpZ2ggcGFzcyBmaWx0ZXJcIil9LFxuICAgICAge2xhYmVsOiBcIkRMWVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcImRlbGF5XCIpfSxcbiAgICAgIHtsYWJlbDogXCJGTEFcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJmbGFuZ2VyXCIpfSxcbiAgICAgIHtsYWJlbDogXCJESVNcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJkaXN0b3J0aW9uXCIpfSxcbiAgICAgIHtsYWJlbDogXCJPVlJcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJvdmVyZHJpdmVcIil9LFxuICAgICAge2xhYmVsOiBcIlRSRVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcInRyZW1lbG9cIil9LFxuICAgIF07XG4gICAgdmFyIGRlcml2ZWREZWZzID0gW1xuICAgICAge2xhYmVsOiBcIlRSQVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFRyYW5zcG9zZShcInRyYW5zcG9zZVwiKSl9LFxuICAgICAge2xhYmVsOiBcIlBBTlwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFBhbm5pbmcoXCJwYW5uaW5nXCIpKX0sXG4gICAgXTtcbiAgICB2YXIgeCA9IDEwO1xuICAgIGZvciAodmFyIGRlZiBvZiBidXR0b25EZWZzKSB7XG4gICAgICB2YXIgYiA9IG5ldyBCdXR0b24oeCwgMCwgZGVmLm9uY2xpY2suYmluZCh0aGlzKSwgZGVmLmxhYmVsKTtcbiAgICAgIGIuY29sb3VyID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlR2VuZXJhdG9yO1xuICAgICAgdGhpcy5idXR0b25zLnB1c2goYik7XG4gICAgICB4ICs9IGIudyArIDM7XG4gICAgfVxuICAgIGZvciAodmFyIGRlZiBvZiBmaWx0ZXJEZWZzKSB7XG4gICAgICB2YXIgYiA9IG5ldyBCdXR0b24oeCwgMCwgZGVmLm9uY2xpY2suYmluZCh0aGlzKSwgZGVmLmxhYmVsKTtcbiAgICAgIGIuY29sb3VyID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlRmlsdGVyO1xuICAgICAgdGhpcy5idXR0b25zLnB1c2goYik7XG4gICAgICB4ICs9IGIudyArIDM7XG4gICAgfVxuICAgIGZvciAodmFyIGRlZiBvZiBkZXJpdmVkRGVmcykge1xuICAgICAgdmFyIGIgPSBuZXcgQnV0dG9uKHgsIDAsIGRlZi5vbmNsaWNrLmJpbmQodGhpcyksIGRlZi5sYWJlbCk7XG4gICAgICBiLmNvbG91ciA9IGFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZURlcml2ZWQ7XG4gICAgICB0aGlzLmJ1dHRvbnMucHVzaChiKTtcbiAgICAgIHggKz0gYi53ICsgMztcbiAgICB9XG4gIH1cbiAgaGFuZGxlQWRkRmlsdGVyKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBGaWx0ZXIodHlwZSkpO1xuICB9XG4gIGhhbmRsZUFkZEdlbmVyYXRvcih0eXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgU2FtcGxlR2VuZXJhdG9yKHR5cGUpKTtcbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBDaGFubmVsSW5wdXQsIENoYW5uZWxPdXRwdXQsIEZpbHRlciwgU2FtcGxlR2VuZXJhdG9yLCBUcmFuc3Bvc2UsIFBhbm5pbmcsIEZhY3RvcnkgfSBmcm9tICcuL21vZHVsZV91bml0cyc7XG5pbXBvcnQgeyBQYXRjaCwgTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgUGF0Y2hhYmxlLCBBVURJT19UWVBFLCBGUkVRVUVOQ1lfVFlQRSwgUEFOTklOR19UWVBFIH0gZnJvbSAnLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIEluc3RydW1lbnQgZXh0ZW5kcyBQYXRjaGFibGUge1xuICBjb25zdHJ1Y3Rvcihtb2R1bGVzLCBwYXRjaGVzKSB7XG4gICAgc3VwZXIobW9kdWxlcywgcGF0Y2hlcyk7XG4gICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICB0aGlzLmluc3RydW1lbnRCYW5rSW5kZXggPSBudWxsO1xuICAgIHRoaXMubW9kdWxlcyA9IFtdO1xuICAgIHRoaXMucGF0Y2hlcyA9IFtdO1xuICB9XG4gIGxvYWRGcm9tRGVmaW5pdGlvbihpbnN0ckRlZikge1xuICAgIHZhciBtb2R1bGVzID0gW1xuICAgICAgbmV3IE1vZHVsZSh0aGlzLCAxMCwgNDAsIG5ldyBDaGFubmVsSW5wdXQoJ2lucHV0JykpLCBcbiAgICAgIG5ldyBNb2R1bGUodGhpcywgNzAwLCA0MCwgbmV3IENoYW5uZWxPdXRwdXQoJ291dHB1dCcpKSxcbiAgICBdO1xuICAgIHZhciBwYXRjaGVzID0gW1xuXG4gICAgXTtcbiAgICB0aGlzLm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgIHRoaXMucGF0Y2hlcyA9IHBhdGNoZXM7XG4gICAgaWYgKGluc3RyRGVmLm5hbWUpIHtcbiAgICAgIHRoaXMubmFtZSA9IGluc3RyRGVmLm5hbWU7XG4gICAgfVxuICAgIGlmIChpbnN0ckRlZi5pbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmluc3RydW1lbnRCYW5rSW5kZXggPSBpbnN0ckRlZi5pbmRleDtcbiAgICB9XG4gICAgdmFyIGl4ID0gdGhpcy5sb2FkR2VuZXJhdG9yKGluc3RyRGVmLCAwLCAxKTtcbiAgICB0aGlzLnBhdGNoSW5wdXQoaXgpO1xuICB9XG4gIHBhdGNoSW5wdXQoaXgpIHtcbiAgICBpZiAoaXgpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGl4KSkge1xuICAgICAgICBmb3IgKHZhciBpIG9mIGl4KSB7XG4gICAgICAgICAgdGhpcy5wYXRjaElucHV0KGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBzID0gdGhpcy5tb2R1bGVzW2l4XS51bml0LnNvY2tldHM7XG4gICAgICB2YXIgY2FuZGlkYXRlID0gbnVsbDtcbiAgICAgIGlmIChzKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhzKSkge1xuICAgICAgICAgIGlmIChzW2tleV0udHlwZSA9PT0gRlJFUVVFTkNZX1RZUEUpIHtcbiAgICAgICAgICAgIGNhbmRpZGF0ZSA9IGtleTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZFBhdGNoKGl4LCAwLCBcIkZSRVFcIiwgY2FuZGlkYXRlLCBGUkVRVUVOQ1lfVFlQRSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGxvYWRHZW5lcmF0b3IoaW5zdHJEZWYsIGlucHV0LCBvdXRwdXQpIHtcbiAgICBpZiAoaW5zdHJEZWZbXCJjb21iaW5lZFwiXSkge1xuICAgICAgdmFyIGdzID0gW107XG4gICAgICBmb3IgKHZhciBpRGVmIG9mIGluc3RyRGVmW1wiY29tYmluZWRcIl0pIHtcbiAgICAgICAgdmFyIGl4ID0gdGhpcy5sb2FkR2VuZXJhdG9yKGlEZWYsIGlucHV0LCBvdXRwdXQpO1xuICAgICAgICBpZiAoaXgpIHtcbiAgICAgICAgICBncy5wdXNoKGl4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGdzO1xuICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJwYW5uaW5nXCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBQYW5uaW5nKFwicGFubmluZ1wiKTtcbiAgICAgIHZhciB0SXggPSB0aGlzLmFkZE1vZHVsZShnKTtcbiAgICAgIHZhciBpeCA9IHRoaXMubG9hZEdlbmVyYXRvcihpbnN0ckRlZltcInBhbm5pbmdcIl0sIGlucHV0LCBvdXRwdXQpO1xuICAgICAgdGhpcy5hZGRQYXRjaCh0SXgsIGl4LCBcIlBBTlwiLCBcIlBBTlwiLCBQQU5OSU5HX1RZUEUpO1xuICAgICAgdGhpcy5hZGRQYXRjaChpbnB1dCwgdEl4LCBcIkZSRVFcIiwgXCJGUkVRXCIsIEZSRVFVRU5DWV9UWVBFKTtcbiAgICAgIHJldHVybiBpeDtcbiAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1widHJhbnNwb3NlXCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBUcmFuc3Bvc2UoXCJ0cmFuc3Bvc2VcIik7XG4gICAgICBnLmRpYWxzW1wic2VtaXRvbmVzXCJdLnZhbHVlID0gaW5zdHJEZWZbXCJ0cmFuc3Bvc2VcIl1bXCJzZW1pdG9uZXNcIl0gfHwgMDtcbiAgICAgIHZhciB0SXggPSB0aGlzLmFkZE1vZHVsZShnKTtcbiAgICAgIHZhciBpeCA9IHRoaXMubG9hZEdlbmVyYXRvcihpbnN0ckRlZltcInRyYW5zcG9zZVwiXSwgdEl4LCBvdXRwdXQpO1xuICAgICAgdGhpcy5hZGRQYXRjaCh0SXgsIGl4LCBcIkZSRVFcIiwgXCJGUkVRXCIsIEZSRVFVRU5DWV9UWVBFKTtcbiAgICAgIHRoaXMuYWRkUGF0Y2goaW5wdXQsIHRJeCwgXCJGUkVRXCIsIFwiRlJFUSBJTlwiLCBGUkVRVUVOQ1lfVFlQRSk7XG4gICAgICByZXR1cm4gaXg7XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInNpbmVcIl0gXG4gICAgICB8fCBpbnN0ckRlZltcInRyaWFuZ2xlXCJdIFxuICAgICAgfHwgaW5zdHJEZWZbXCJzcXVhcmVcIl0gXG4gICAgICB8fCBpbnN0ckRlZltcInNhd3Rvb3RoXCJdIFxuICAgICAgfHwgaW5zdHJEZWZbXCJ3aGl0ZV9ub2lzZVwiXVxuICAgICAgfHwgaW5zdHJEZWZbXCJwdWxzZVwiXVxuICAgICAgfHwgaW5zdHJEZWZbXCJ3YXZcIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IEZhY3RvcnkoKS5nZW5lcmF0b3JGcm9tRGVmaW5pdGlvbihpbnN0ckRlZik7XG4gICAgICB2YXIgaXggPSB0aGlzLmFkZE1vZHVsZShnKTtcbiAgICAgIHRoaXMuYWRkUGF0Y2goaXgsIG91dHB1dCwgXCJPVVRcIiwgXCJJTlwiLCBBVURJT19UWVBFKTtcbiAgICAgIHJldHVybiBpeDtcbiAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1widm9jb2RlclwiXSkge1xuICAgICAgdmFyIHNvdXJjZSA9IG5ldyBGYWN0b3J5KCkuZ2VuZXJhdG9yRnJvbURlZmluaXRpb24oaW5zdHJEZWZbXCJ2b2NvZGVyXCJdW1wic291cmNlXCJdKVxuICAgICAgdmFyIHZvY29kZXIgPSBuZXcgRmFjdG9yeSgpLmdlbmVyYXRvckZyb21EZWZpbml0aW9uKGluc3RyRGVmW1widm9jb2RlclwiXVtcInZvY29kZXJcIl0pXG4gICAgICByZXR1cm4gW107XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcImZpbHRlclwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgRmFjdG9yeSgpLmZpbHRlckZyb21EZWZpbml0aW9uKGluc3RyRGVmW1wiZmlsdGVyXCJdKVxuICAgICAgdmFyIHRJeCA9IHRoaXMuYWRkTW9kdWxlKGcpO1xuICAgICAgdmFyIGl4ID0gdGhpcy5sb2FkR2VuZXJhdG9yKGluc3RyRGVmW1wiZmlsdGVyXCJdLCBpbnB1dCwgdEl4KTtcbiAgICAgIHRoaXMuYWRkUGF0Y2godEl4LCBvdXRwdXQsIFwiT1VUXCIsIFwiSU5cIiwgQVVESU9fVFlQRSk7XG4gICAgICByZXR1cm4gaXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKGluc3RyRGVmKTtcbiAgICAgIHRocm93ICdVbmtub3duIGluc3RydW1lbnQgZGVmJztcbiAgICB9XG4gIH1cbiAgYWRkTW9kdWxlKGdlbmVyYXRvcikge1xuICAgIHZhciBtID0gbmV3IE1vZHVsZSh0aGlzLCBNYXRoLnJhbmRvbSgpICogODAwICsgMTAwLCBNYXRoLnJhbmRvbSgpICogNjAwLCBnZW5lcmF0b3IpO1xuICAgIHRoaXMubW9kdWxlcy5wdXNoKG0pO1xuICAgIHJldHVybiB0aGlzLm1vZHVsZXMubGVuZ3RoIC0gMTtcbiAgfVxuICBhZGRQYXRjaChmcm9tTW9kdWxlLCB0b01vZHVsZSwgZnJvbVNvY2tldCwgdG9Tb2NrZXQsIHR5cGUpIHtcbiAgICBjb25zb2xlLmxvZyhcIkFEZGluZyBwYXRjaFwiLCBmcm9tTW9kdWxlLCB0b01vZHVsZSwgZnJvbVNvY2tldCwgdG9Tb2NrZXQpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRvTW9kdWxlKSkge1xuICAgICAgZm9yICh2YXIgdG8gb2YgdG9Nb2R1bGUpIHtcbiAgICAgICAgdGhpcy5hZGRQYXRjaChmcm9tTW9kdWxlLCB0bywgZnJvbVNvY2tldCwgdG9Tb2NrZXQsIHR5cGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcCA9IG5ldyBQYXRjaChmcm9tTW9kdWxlLCB0b01vZHVsZSwgZnJvbVNvY2tldCwgdG9Tb2NrZXQsIHR5cGUpO1xuICAgIHRoaXMucGF0Y2hlcy5wdXNoKHApO1xuICB9XG4gIGxvYWQoaW5zdHJEZWYpIHtcbiAgICB2YXIgbW9kdWxlcyA9IFtdO1xuICAgIGZvciAodmFyIG0gb2YgaW5zdHJEZWYubW9kdWxlcykge1xuICAgICAgdmFyIGcgPSBudWxsO1xuICAgICAgaWYgKG0udHlwZSA9PSBcImlucHV0XCIpIHtcbiAgICAgICAgZyA9IG5ldyBDaGFubmVsSW5wdXQobS50eXBlKTtcbiAgICAgIH0gZWxzZSBpZiAobS50eXBlID09IFwib3V0cHV0XCIpIHtcbiAgICAgICAgZyA9IG5ldyBDaGFubmVsT3V0cHV0KG0udHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKG0udHlwZSA9PSBcImxvdyBwYXNzIGZpbHRlclwiKSB7XG4gICAgICAgIGcgPSBuZXcgRmlsdGVyKG0udHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKG0udHlwZSA9PSBcInNpbmVcIiB8fCBtLnR5cGUgPT0gXCJ0cmlhbmdsZVwiKSB7XG4gICAgICAgIGcgPSBuZXcgU2FtcGxlR2VuZXJhdG9yKG0udHlwZSk7XG4gICAgICB9XG4gICAgICBpZiAoZykge1xuICAgICAgICB2YXIgbW9kID0gbmV3IE1vZHVsZSh0aGlzLCBtLngsIG0ueSwgZyk7XG4gICAgICAgIG1vZHVsZXMucHVzaChtb2QpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgcGF0Y2hlcyA9IFtdO1xuICAgIGZvciAodmFyIHAgb2YgaW5zdHJEZWYucGF0Y2hlcykge1xuICAgICAgdGhpcy5hZGRQYXRjaChwLmZyb21fbW9kdWxlLCBwLnRvX21vZHVsZSwgcC5mcm9tX3NvY2tldCwgcC50b19zb2NrZXQpO1xuICAgIH1cbiAgICB0aGlzLm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgIHRoaXMucGF0Y2hlcyA9IHBhdGNoZXM7XG4gIH1cblxuICBjb21waWxlKCkge1xuICAgIHZhciBvdXRwdXQgPSBudWxsO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbSA9IHRoaXMubW9kdWxlc1tpXTtcbiAgICAgIGlmIChtLnVuaXQudHlwZSA9PSBcIm91dHB1dFwiKSB7XG4gICAgICAgIG91dHB1dCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghb3V0cHV0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgcXVldWUgPSBbb3V0cHV0XTtcbiAgICB2YXIgc2VlbiA9IHt9O1xuICAgIHZhciBkZXBlbmRlbmNpZXMgPSBbXTtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHEgPSBxdWV1ZVswXTtcbiAgICAgIHZhciBxdWV1ZSA9IHF1ZXVlLnNwbGljZSgxKTtcbiAgICAgIGlmIChzZWVuW3FdKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBkZXBlbmRlbmNpZXMucHVzaChxKTtcbiAgICAgIGZvciAodmFyIHAgb2YgdGhpcy5wYXRjaGVzKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2R1bGVzW3FdKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJCaWcgdHJvdWJsZXM6IHRyeWluZyB0byByZWFjaCBub24gZXhpc3RlbnQgbW9kdWxlOlwiLCBpeCk7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICB2YXIgbW9kU29ja2V0cyA9IHRoaXMubW9kdWxlc1txXS51bml0LnNvY2tldHM7XG4gICAgICAgIGlmIChwLnRvID09PSBxICYmIG1vZFNvY2tldHNbcC50b1NvY2tldF0gJiYgbW9kU29ja2V0c1twLnRvU29ja2V0XS5pc0lucHV0KSB7XG4gICAgICAgICAgaWYgKCFzZWVuW3AuZnJvbV0pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2gocC5mcm9tKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocC5mcm9tID09PSBxICYmIG1vZFNvY2tldHNbcC5mcm9tU29ja2V0XSAmJiBtb2RTb2NrZXRzW3AuZnJvbVNvY2tldF0uaXNJbnB1dCkge1xuICAgICAgICAgIGlmICghc2VlbltwLnRvXSkge1xuICAgICAgICAgICAgcXVldWUucHVzaChwLnRvKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNlZW5bcV0gPSB0cnVlO1xuICAgIH1cbiAgICB2YXIgZ2VuZXJhdG9ycyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSBkZXBlbmRlbmNpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBpeCA9IGRlcGVuZGVuY2llc1tpXTtcbiAgICAgIGlmICghdGhpcy5tb2R1bGVzW2l4XSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkJpZyB0cm91YmxlczogdHJ5aW5nIHRvIHJlYWNoIG5vbiBleGlzdGVudCBtb2R1bGU6XCIsIGl4KTtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIHZhciB1bml0ID0gdGhpcy5tb2R1bGVzW2l4XS51bml0O1xuICAgICAgdmFyIGcgPSBudWxsO1xuICAgICAgaWYgKHVuaXQudHlwZSA9PSBcImlucHV0XCIpIHtcbiAgICAgICAgZyA9IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKHVuaXQudHlwZSA9PSBcIndhdlwiKSB7XG4gICAgICAgIGcgPSB1bml0LmNvbXBpbGUoKTtcbiAgICAgIH0gZWxzZSBpZiAodW5pdC50eXBlID09IFwidHJpYW5nbGVcIiBcbiAgICAgICAgfHwgdW5pdC50eXBlID09IFwic2luZVwiIFxuICAgICAgICB8fCB1bml0LnR5cGUgPT0gXCJzYXdcIiBcbiAgICAgICAgfHwgdW5pdC50eXBlID09IFwic3F1YXJlXCIgXG4gICAgICAgIHx8IHVuaXQudHlwZSA9PSBcIndoaXRlX25vaXNlXCIpIHtcbiAgICAgICAgZyA9IHt9O1xuICAgICAgICBnW3VuaXQudHlwZV0gPSB7XG4gICAgICAgICAgXCJnYWluXCI6IHVuaXQuZGlhbHNbXCJnYWluXCJdLnZhbHVlLFxuICAgICAgICAgIFwicGFubmluZ1wiOiB1bml0LmRpYWxzW1wicGFubmluZ1wiXS52YWx1ZSxcbiAgICAgICAgICBcImF0dGFja1wiOiB1bml0LmRpYWxzW1wiYXR0YWNrXCJdLnZhbHVlLFxuICAgICAgICAgIFwiZGVjYXlcIjogdW5pdC5kaWFsc1tcImRlY2F5XCJdLnZhbHVlLFxuICAgICAgICAgIFwic3VzdGFpblwiOiB1bml0LmRpYWxzW1wic3VzdGFpblwiXS52YWx1ZSxcbiAgICAgICAgICBcInJlbGVhc2VcIjogdW5pdC5kaWFsc1tcInJlbGVhc2VcIl0udmFsdWUsXG4gICAgICAgIH07XG4gICAgICAgIHZhciBwaXRjaEZvdW5kID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIHAgb2YgdGhpcy5wYXRjaGVzKSB7XG4gICAgICAgICAgaWYgKHAuZG9lc1BhdGNoQ29ubmVjdFRvKGl4LCBcIkZSRVFcIikpIHtcbiAgICAgICAgICAgIHBpdGNoRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHBnID0gZ2VuZXJhdG9yc1twLmNvbm5lY3RzVG8oaXgsIFwiRlJFUVwiKS5tb2R1bGVdO1xuICAgICAgICAgICAgaWYgKHBnKSB7XG4gICAgICAgICAgICAgIGdbdW5pdC50eXBlXVtcImF1dG9fcGl0Y2hcIl0gPSBwZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwaXRjaEZvdW5kKSB7XG4gICAgICAgICAgZ1t1bml0LnR5cGVdW1wicGl0Y2hcIl0gPSB1bml0LmRpYWxzW1wicGl0Y2hcIl0udmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodW5pdC50eXBlID09IFwibG93IHBhc3MgZmlsdGVyXCIpIHtcbiAgICAgICAgZyA9IHt9O1xuICAgICAgICBnW1wiZmlsdGVyXCJdID0ge1wibHBmXCI6IHtcImN1dG9mZlwiOiB1bml0LmRpYWxzW1wiY3V0b2ZmXCJdLnZhbHVlfX1cbiAgICAgICAgdmFyIG9uID0gdGhpcy5jb21waWxlR2VuZXJhdG9ycyhnZW5lcmF0b3JzLCBpeCwgXCJJTlwiKTtcbiAgICAgICAgT2JqZWN0LmtleXMob24pLm1hcCgoaykgPT4ge1xuICAgICAgICAgIGdbXCJmaWx0ZXJcIl1ba10gPSBvbltrXTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHVuaXQudHlwZSA9PSBcImhpZ2ggcGFzcyBmaWx0ZXJcIikge1xuICAgICAgICBnID0ge307XG4gICAgICAgIGdbXCJmaWx0ZXJcIl0gPSB7XCJocGZcIjoge1wiY3V0b2ZmXCI6IHVuaXQuZGlhbHNbXCJjdXRvZmZcIl0udmFsdWV9fVxuICAgICAgICB2YXIgb24gPSB0aGlzLmNvbXBpbGVHZW5lcmF0b3JzKGdlbmVyYXRvcnMsIGl4LCBcIklOXCIpO1xuICAgICAgICBPYmplY3Qua2V5cyhvbikubWFwKChrKSA9PiB7XG4gICAgICAgICAgZ1tcImZpbHRlclwiXVtrXSA9IG9uW2tdO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodW5pdC50eXBlID09IFwidHJhbnNwb3NlXCIpIHtcbiAgICAgICAgZyA9IHtcInRyYW5zcG9zZVwiOiB7XG4gICAgICAgICAgXCJzZW1pdG9uZXNcIjogdW5pdC5kaWFsc1tcInNlbWl0b25lc1wiXS52YWx1ZSxcbiAgICAgICAgfX1cbiAgICAgICAgdmFyIG9uID0gdGhpcy5jb21waWxlR2VuZXJhdG9ycyhnZW5lcmF0b3JzLCBpeCwgXCJGUkVRIElOXCIpO1xuICAgICAgICBpZiAob24pIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhvbikubWFwKChrKSA9PiB7XG4gICAgICAgICAgICBnW1widHJhbnNwb3NlXCJdW2tdID0gb25ba107XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodW5pdC50eXBlID09IFwicGFubmluZ1wiKSB7XG4gICAgICAgIGcgPSB7XCJwYW5uaW5nXCI6IHt9fVxuICAgICAgICB2YXIgb24gPSB0aGlzLmNvbXBpbGVHZW5lcmF0b3JzKGdlbmVyYXRvcnMsIGl4LCBcIkZSRVEgSU5cIik7XG4gICAgICAgIGlmIChvbikge1xuICAgICAgICAgIE9iamVjdC5rZXlzKG9uKS5tYXAoKGspID0+IHtcbiAgICAgICAgICAgIGdbXCJwYW5uaW5nXCJdW2tdID0gb25ba107XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodW5pdC50eXBlID09IFwib3V0cHV0XCIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuY29tcGlsZUdlbmVyYXRvcnMoZ2VuZXJhdG9ycywgaXgsIFwiSU5cIik7XG4gICAgICAgIGlmICh0aGlzLm5hbWUpIHtcbiAgICAgICAgICByZXN1bHQubmFtZSA9IHRoaXMubmFtZVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmluc3RydW1lbnRCYW5rSW5kZXgpIHtcbiAgICAgICAgICByZXN1bHQuaW5kZXggPSB0aGlzLmluc3RydW1lbnRCYW5rSW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGdlbmVyYXRvcnNbaXhdID0gZztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb21waWxlR2VuZXJhdG9ycyhnZW5lcmF0b3JzLCBpeCwgaW5wdXQpIHtcbiAgICB2YXIgZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBwIG9mIHRoaXMucGF0Y2hlcykge1xuICAgICAgaWYgKHAuZG9lc1BhdGNoQ29ubmVjdFRvKGl4LCBpbnB1dCkpIHtcbiAgICAgICAgZ3MucHVzaChnZW5lcmF0b3JzW3AuY29ubmVjdHNUbyhpeCwgaW5wdXQpLm1vZHVsZV0pXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChncy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSBpZiAoZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gZ3NbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XCJjb21iaW5lZFwiOiBnc31cbiAgICB9XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgT3V0cHV0U29ja2V0IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgRlJFUVVFTkNZX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgQ2hhbm5lbElucHV0IGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIkZSRVFcIjogbmV3IE91dHB1dFNvY2tldCh0aGlzLncgLSAyOSwgdGhpcy5oIC0gMjksIFwiRlJFUVwiLCBGUkVRVUVOQ1lfVFlQRSksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVPdXRwdXQnO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGVVbml0LCBJbnB1dFNvY2tldCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IEFVRElPX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5cbmV4cG9ydCBjbGFzcyBDaGFubmVsT3V0cHV0IGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIklOXCI6IG5ldyBJbnB1dFNvY2tldCgyOSwgdGhpcy5oIC0gMjksIFwiSU5cIiwgQVVESU9fVFlQRSksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVPdXRwdXQnO1xuICB9XG59XG5cbiIsIlxuaW1wb3J0IHsgU2FtcGxlR2VuZXJhdG9yLCBXYXZHZW5lcmF0b3IgfSBmcm9tICcuL3NhbXBsZV9nZW5lcmF0b3IuanMnO1xuaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSAnLi9maWx0ZXIuanMnO1xuXG5leHBvcnQgY2xhc3MgRmFjdG9yeSB7XG5cbiAgZ2VuZXJhdG9yRnJvbURlZmluaXRpb24oaW5zdHJEZWYpIHtcblxuICAgIGlmIChpbnN0ckRlZltcInNpbmVcIl0gXG4gICAgICB8fCBpbnN0ckRlZltcInRyaWFuZ2xlXCJdIFxuICAgICAgfHwgaW5zdHJEZWZbXCJzcXVhcmVcIl0gXG4gICAgICB8fCBpbnN0ckRlZltcInNhd3Rvb3RoXCJdIFxuICAgICAgfHwgaW5zdHJEZWZbXCJ3aGl0ZV9ub2lzZVwiXSkge1xuICAgICAgdmFyIHR5cCA9IFwidHJpYW5nbGVcIjtcbiAgICAgIHZhciBpbnN0ciA9IG51bGw7XG4gICAgICBpZiAoaW5zdHJEZWZbXCJ0cmlhbmdsZVwiXSkge1xuICAgICAgICBpbnN0ciA9IGluc3RyRGVmW1widHJpYW5nbGVcIl07XG4gICAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1wic2luZVwiXSkge1xuICAgICAgICBpbnN0ciA9IGluc3RyRGVmW1wic2luZVwiXTtcbiAgICAgICAgdHlwID0gXCJzaW5lXCI7XG4gICAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1wic3F1YXJlXCJdKSB7XG4gICAgICAgIGluc3RyID0gaW5zdHJEZWZbXCJzcXVhcmVcIl07XG4gICAgICAgIHR5cCA9IFwic3F1YXJlXCI7XG4gICAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1wic2F3dG9vdGhcIl0pIHtcbiAgICAgICAgaW5zdHIgPSBpbnN0ckRlZltcInNhd3Rvb3RoXCJdO1xuICAgICAgICB0eXAgPSBcInNhd1wiO1xuICAgICAgfSBlbHNlIGlmIChpbnN0ckRlZltcIndoaXRlX25vaXNlXCJdKSB7XG4gICAgICAgIGluc3RyID0gaW5zdHJEZWZbXCJ3aGl0ZV9ub2lzZVwiXTtcbiAgICAgICAgdHlwID0gXCJ3aGl0ZV9ub2lzZVwiO1xuICAgICAgfVxuICAgICAgdmFyIGcgPSBuZXcgU2FtcGxlR2VuZXJhdG9yKHR5cClcbiAgICAgIGcuZGlhbHNbXCJhdHRhY2tcIl0udmFsdWUgPSBpbnN0cltcImF0dGFja1wiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wiZGVjYXlcIl0udmFsdWUgPSBpbnN0cltcImRlY2F5XCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJzdXN0YWluXCJdLnZhbHVlID0gaW5zdHJbXCJzdXN0YWluXCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJyZWxlYXNlXCJdLnZhbHVlID0gaW5zdHJbXCJyZWxlYXNlXCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJnYWluXCJdLnZhbHVlID0gaW5zdHJbXCJnYWluXCJdIHx8IDEuMDtcbiAgICAgIHJldHVybiBnO1xuICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJ3YXZcIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IFdhdkdlbmVyYXRvcigpO1xuICAgICAgdmFyIGluc3RyID0gaW5zdHJEZWZbXCJ3YXZcIl07XG4gICAgICBnLmZpbGUgPSBpbnN0cltcImZpbGVcIl0gfHwgXCJcIjtcbiAgICAgIGcuaXNfcGl0Y2hlZCA9IGluc3RyW1wicGl0Y2hlZFwiXSB8fCBmYWxzZTtcbiAgICAgIGcuYmFzZV9waXRjaCA9IGluc3RyW1wiYmFzZV9waXRjaFwiXSB8fCA0NDAuMDtcbiAgICAgIGcuZGlhbHNbXCJhdHRhY2tcIl0udmFsdWUgPSBpbnN0cltcImF0dGFja1wiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wiZGVjYXlcIl0udmFsdWUgPSBpbnN0cltcImRlY2F5XCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJzdXN0YWluXCJdLnZhbHVlID0gaW5zdHJbXCJzdXN0YWluXCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJyZWxlYXNlXCJdLnZhbHVlID0gaW5zdHJbXCJyZWxlYXNlXCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJnYWluXCJdLnZhbHVlID0gaW5zdHJbXCJnYWluXCJdIHx8IDEuMDtcbiAgICAgIHJldHVybiBnO1xuICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJwdWxzZVwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgU2FtcGxlR2VuZXJhdG9yKFwicHVsc2VcIik7XG4gICAgICB2YXIgaW5zdHIgPSBpbnN0ckRlZltcInB1bHNlXCJdO1xuICAgICAgZy5kaWFsc1tcImF0dGFja1wiXS52YWx1ZSA9IGluc3RyW1wiYXR0YWNrXCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJkZWNheVwiXS52YWx1ZSA9IGluc3RyW1wiZGVjYXlcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcInN1c3RhaW5cIl0udmFsdWUgPSBpbnN0cltcInN1c3RhaW5cIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcInJlbGVhc2VcIl0udmFsdWUgPSBpbnN0cltcInJlbGVhc2VcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcImdhaW5cIl0udmFsdWUgPSBpbnN0cltcImdhaW5cIl0gfHwgMS4wO1xuICAgICAgcmV0dXJuIGc7XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyRnJvbURlZmluaXRpb24oZmlsdGVyRGVmKSB7XG4gICAgaWYgKGZpbHRlckRlZltcImxwZlwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgRmlsdGVyKFwibG93IHBhc3MgZmlsdGVyXCIpXG4gICAgICBnLmRpYWxzW1wiY3V0b2ZmXCJdLnZhbHVlID0gZmlsdGVyRGVmW1wibHBmXCJdW1wiY3V0b2ZmXCJdIHx8IDUwMDA7XG4gICAgICByZXR1cm4gZztcbiAgICB9IGVsc2UgaWYgKGZpbHRlckRlZltcImRpc3RvcnRpb25cIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IEZpbHRlcihcImRpc3RvcnRpb25cIilcbiAgICAgIHJldHVybiBnO1xuICAgIH0gZWxzZSBpZiAoZmlsdGVyRGVmW1wib3ZlcmRyaXZlXCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBGaWx0ZXIoXCJvdmVyZHJpdmVcIilcbiAgICAgIHJldHVybiBnO1xuICAgIH0gZWxzZSBpZiAoZmlsdGVyRGVmW1wiZmxhbmdlclwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgRmlsdGVyKFwiZmxhbmdlclwiKVxuICAgICAgcmV0dXJuIGc7XG4gICAgfSBlbHNlIGlmIChmaWx0ZXJEZWZbXCJhdmVyYWdlXCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBGaWx0ZXIoXCJhdmVyYWdlXCIpXG4gICAgICByZXR1cm4gZztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coZmlsdGVyRGVmKTtcbiAgICAgIHRocm93ICdVbmtub3duIGZpbHRlciBkZWYnO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IEFVRElPX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgRmlsdGVyIGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIklOXCI6IG5ldyBJbnB1dFNvY2tldCgyOSwgdGhpcy5oIC0gMjksIFwiSU5cIiwgQVVESU9fVFlQRSksXG4gICAgICBcIk9VVFwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJPVVRcIiwgQVVESU9fVFlQRSksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVGaWx0ZXInO1xuICAgIHRoaXMuZGlhbHMgPSB7IH1cblxuICAgIGlmICh0eXBlID09PSBcImxvdyBwYXNzIGZpbHRlclwiIHx8IHR5cGUgPT09IFwiaGlnaCBwYXNzIGZpbHRlclwiKSB7XG4gICAgICB0aGlzLncgPSAxNTA7XG4gICAgICB0aGlzLmRpYWxzW1wiY3V0b2ZmXCJdID0gbmV3IERpYWwoMjksIDU5LCBcIkNVVE9GRlwiLCAxLjAsIDIyMDAwLjAsIDUwMDAuMCk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcImRlbGF5XCIpIHtcbiAgICAgIHRoaXMudyA9IDE3MDtcbiAgICAgIHRoaXMuZGlhbHNbXCJ0aW1lXCJdID0gbmV3IERpYWwoMjksIDU5LCBcIlRJTUVcIiwgMC4wMDAwMSwgNC4wLCAxLjApO1xuICAgICAgdGhpcy5kaWFsc1tcImZhY3RvclwiXSA9IG5ldyBEaWFsKDc5LCA1OSwgXCJGQUNUT1JcIiwgMC4wLCAyLjAsIDEuMCk7XG4gICAgICB0aGlzLmRpYWxzW1wiZmVlZGJhY2tcIl0gPSBuZXcgRGlhbCgxMjksIDU5LCBcIkZFRURCQUNLXCIsIDAuMCwgMi4wLCAwLjApO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IHsgQ2hhbm5lbElucHV0IH0gZnJvbSAnLi9jaGFubmVsX2lucHV0LmpzJztcbmV4cG9ydCB7IENoYW5uZWxPdXRwdXQgfSBmcm9tICcuL2NoYW5uZWxfb3V0cHV0LmpzJztcbmV4cG9ydCB7IEZpbHRlciB9IGZyb20gJy4vZmlsdGVyLmpzJztcbmV4cG9ydCB7IFNhbXBsZUdlbmVyYXRvciB9IGZyb20gJy4vc2FtcGxlX2dlbmVyYXRvci5qcyc7XG5leHBvcnQgeyBUcmFuc3Bvc2UgfSBmcm9tICcuL3RyYW5zcG9zZS5qcyc7XG5leHBvcnQgeyBQYW5uaW5nIH0gZnJvbSAnLi9wYW5uaW5nLmpzJztcbmV4cG9ydCB7IEZhY3RvcnkgfSBmcm9tICcuL2ZhY3RvcnkuanMnO1xuIiwiaW1wb3J0IHsgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCwgRGlhbCwgTW9kdWxlVW5pdCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IEZSRVFVRU5DWV9UWVBFLCBQQU5OSU5HX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgUGFubmluZyBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgc3VwZXIodHlwZSk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZURlcml2ZWQnO1xuICAgIHRoaXMudyA9IDEyMDtcbiAgICB0aGlzLmggPSAxNTA7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJGUkVRXCI6IG5ldyBJbnB1dFNvY2tldCgyOSwgdGhpcy5oIC0gMjksIFwiRlJFUVwiLCBGUkVRVUVOQ1lfVFlQRSksXG4gICAgICBcIlBBTlwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJQQU5cIiwgUEFOTklOR19UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscyA9IHtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IElucHV0U29ja2V0LCBPdXRwdXRTb2NrZXQsIERpYWwsIE1vZHVsZVVuaXQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBGUkVRVUVOQ1lfVFlQRSwgQVVESU9fVFlQRSwgUEFOTklOR19UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFNhbXBsZUdlbmVyYXRvciBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgc3VwZXIodHlwZSk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZUdlbmVyYXRvcic7XG4gICAgdGhpcy53ID0gMjIwO1xuICAgIHRoaXMuaCA9IDI1MDtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIkZSRVFcIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJGUkVRXCIsIEZSRVFVRU5DWV9UWVBFKSxcbiAgICAgIFwiUEFOXCI6IG5ldyBJbnB1dFNvY2tldCg3OSwgdGhpcy5oIC0gMjksIFwiUEFOXCIsIFBBTk5JTkdfVFlQRSksXG4gICAgICBcIk9VVFwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJPVVRcIiwgQVVESU9fVFlQRSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgICBcInBpdGNoXCI6IG5ldyBEaWFsKDI5LCA0OSwgXCJGUkVRXCIsIDAuMCwgMjIwMDAuMCwgMC4wKSxcbiAgICAgIFwiZ2FpblwiOiBuZXcgRGlhbCg3OSwgNDksIFwiR0FJTlwiLCAwLjAsIDQuMCwgMS4wKSxcbiAgICAgIFwicGFubmluZ1wiOiBuZXcgRGlhbCgxMjksIDQ5LCBcIlBBTlwiLCAwLjAsIDEuMCwgMC41KSxcbiAgICAgIFwiYXR0YWNrXCI6IG5ldyBEaWFsKDI5LCAxMjAsIFwiQVRUQUNLXCIsIDAuMCwgMTAuMCwgMC4xKSxcbiAgICAgIFwiZGVjYXlcIjogbmV3IERpYWwoNzksIDEyMCwgXCJERUNBWVwiLCAwLjAsIDEwLjAsIDAuMSksXG4gICAgICBcInN1c3RhaW5cIjogbmV3IERpYWwoMTI5LCAxMjAsIFwiU1VTVEFJTlwiLCAwLjAsIDEuMCwgMC44KSxcbiAgICAgIFwicmVsZWFzZVwiOiBuZXcgRGlhbCgxNzksIDEyMCwgXCJSRUxFQVNFXCIsIDAuMCwgMTAsIDAuMSksXG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFdhdkdlbmVyYXRvciBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcIndhdlwiKTtcbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlR2VuZXJhdG9yJztcbiAgICB0aGlzLncgPSAyMjA7XG4gICAgdGhpcy5oID0gMjUwO1xuICAgIHRoaXMuZmlsZSA9IFwiXCI7XG4gICAgdGhpcy5pc19waXRjaGVkID0gZmFsc2U7XG4gICAgdGhpcy5iYXNlX3BpdGNoID0gNDQwLjA7XG4gICAgLy8gVE9ETzogZmlsZSBpbnB1dCBhbmQgaXNfcGl0Y2hlZCBib29sZWFuXG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJGUkVRXCI6IG5ldyBJbnB1dFNvY2tldCgyOSwgdGhpcy5oIC0gMjksIFwiRlJFUVwiLCBGUkVRVUVOQ1lfVFlQRSksXG4gICAgICBcIlBBTlwiOiBuZXcgSW5wdXRTb2NrZXQoNzksIHRoaXMuaCAtIDI5LCBcIlBBTlwiLCBQQU5OSU5HX1RZUEUpLFxuICAgICAgXCJPVVRcIjogbmV3IE91dHB1dFNvY2tldCh0aGlzLncgLSAyOSwgdGhpcy5oIC0gMjksIFwiT1VUXCIsIEFVRElPX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmRpYWxzID0ge1xuICAgICAgXCJwaXRjaFwiOiBuZXcgRGlhbCgyOSwgNDksIFwiRlJFUVwiLCAwLjAsIDIyMDAwLjAsIDAuMCksXG4gICAgICBcImdhaW5cIjogbmV3IERpYWwoNzksIDQ5LCBcIkdBSU5cIiwgMC4wLCA0LjAsIDEuMCksXG4gICAgICBcInBhbm5pbmdcIjogbmV3IERpYWwoMTI5LCA0OSwgXCJQQU5cIiwgMC4wLCAxLjAsIDAuNSksXG4gICAgICBcImF0dGFja1wiOiBuZXcgRGlhbCgyOSwgMTIwLCBcIkFUVEFDS1wiLCAwLjAsIDEwLjAsIDAuMSksXG4gICAgICBcImRlY2F5XCI6IG5ldyBEaWFsKDc5LCAxMjAsIFwiREVDQVlcIiwgMC4wLCAxMC4wLCAwLjEpLFxuICAgICAgXCJzdXN0YWluXCI6IG5ldyBEaWFsKDEyOSwgMTIwLCBcIlNVU1RBSU5cIiwgMC4wLCAxLjAsIDAuOCksXG4gICAgICBcInJlbGVhc2VcIjogbmV3IERpYWwoMTc5LCAxMjAsIFwiUkVMRUFTRVwiLCAwLjAsIDEwLCAwLjEpLFxuICAgIH1cbiAgfVxuXG4gIGNvbXBpbGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFwid2F2XCI6IHtcbiAgICAgICAgXCJmaWxlXCI6IHRoaXMuZmlsZSxcbiAgICAgICAgXCJnYWluXCI6IHRoaXMuZGlhbHNbXCJnYWluXCJdLnZhbHVlLFxuICAgICAgICBcInBpdGNoZWRcIjogdGhpcy5pc19waXRjaGVkLFxuICAgICAgICBcImJhc2VfcGl0Y2hcIjogdGhpcy5iYXNlX3BpdGNoLFxuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IElucHV0U29ja2V0LCBPdXRwdXRTb2NrZXQsIERpYWwsIE1vZHVsZVVuaXQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBGUkVRVUVOQ1lfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBUcmFuc3Bvc2UgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVEZXJpdmVkJztcbiAgICB0aGlzLncgPSAxMjA7XG4gICAgdGhpcy5oID0gMTUwO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiRlJFUSBJTlwiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIkZSRVEgSU5cIiwgRlJFUVVFTkNZX1RZUEUpLFxuICAgICAgXCJGUkVRXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIkZSRVFcIiwgRlJFUVVFTkNZX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmRpYWxzID0ge1xuICAgICAgXCJzZW1pdG9uZXNcIjogbmV3IERpYWwoMjksIDQ5LCBcIlNFTUlUT05FU1wiLCAtMjQsIDI0LCAwLjApLFxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgVGhlbWUgfSBmcm9tICcuL3RoZW1lLmpzJztcbmltcG9ydCB7IEluc3RydW1lbnRFZGl0b3IsIEluc3RydW1lbnQgfSBmcm9tICcuL2luc3RydW1lbnRfZWRpdG9yLyc7XG5pbXBvcnQgeyBUaW1lbGluZUVkaXRvciwgVHJhY2ssIENoYW5uZWwgfSBmcm9tICcuL3RpbWVsaW5lX2VkaXRvci8nO1xuaW1wb3J0IHsgU2VxdWVuY2VFZGl0b3IgfSBmcm9tICcuL3NlcXVlbmNlX2VkaXRvci8nO1xuaW1wb3J0IHsgQVBJIH0gZnJvbSAnLi9hcGkvJztcblxuZXhwb3J0IGNsYXNzIEJsZWVwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpO1xuICAgIHRoaXMudGhlbWUgPSBuZXcgVGhlbWUoKTtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5jYW52YXMub25tb3VzZWRvd24gPSB0aGlzLmhhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpXG4gICAgdGhpcy5jYW52YXMub25tb3VzZXVwID0gdGhpcy5oYW5kbGVNb3VzZVVwLmJpbmQodGhpcylcbiAgICB0aGlzLmNhbnZhcy5vbm1vdXNlbW92ZSA9IHRoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQodGhpcylcbiAgICB0aGlzLnNlbGVjdGVkRWxlbSA9IG51bGw7XG4gICAgdGhpcy5zdGFydFNlbGVjdGVkUG9zID0ge307XG4gICAgdGhpcy5zZWxlY3RlZFBvcyA9IHt9O1xuICAgIHRoaXMuYXBpID0gbmV3IEFQSSh0aGlzKTtcbiAgICB0aGlzLmFwaS5zdGFydCgpO1xuICAgIHRoaXMuY2hhbm5lbHMgPSBbXTtcbiAgICB0aGlzLnRyYWNrcyA9IFtdO1xuICAgIHRoaXMub3BlblRpbWVsaW5lRWRpdG9yKCk7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICAvLyBhcGkgY2FsbGJhY2tcbiAgaW5pdGlhbGlzZUNoYW5uZWxzKGNoYW5uZWxEZWZzKSB7XG4gICAgdGhpcy5jaGFubmVscyA9IFtdO1xuICAgIHZhciBzZWVuUGVyY3Vzc2lvbkNoYW5uZWwgPSBmYWxzZTtcbiAgICBmb3IgKHZhciBkZWYgb2YgY2hhbm5lbERlZnMpIHtcbiAgICAgIHZhciBjaCA9IG5ldyBDaGFubmVsKGRlZi5jaGFubmVsIHx8IDApO1xuICAgICAgY2gubG9hZEZyb21EZWZpbml0aW9uKGRlZik7XG4gICAgICB0aGlzLmNoYW5uZWxzLnB1c2goY2gpO1xuICAgICAgdGhpcy50cmFja3MucHVzaChuZXcgVHJhY2soY2gsIHRoaXMpKTtcbiAgICAgIGlmIChjaC5jaGFubmVsTnIgPT0gOSkge1xuICAgICAgICBzZWVuUGVyY3Vzc2lvbkNoYW5uZWwgPSB0cnVlO1xuICAgICAgfVxuICAgICAgY2guaW5zdHJ1bWVudCA9IG5ldyBJbnN0cnVtZW50KCk7XG4gICAgICBpZiAoZGVmLmdlbmVyYXRvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRpbmcgY2hhbm5lbCBnZW5lcmF0b3JcIiwgZGVmLmdlbmVyYXRvcik7XG4gICAgICAgIGNoLmluc3RydW1lbnQubG9hZEZyb21EZWZpbml0aW9uKGRlZi5nZW5lcmF0b3IpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coXCJOZXcgY2hhbm5lbFwiLCBkZWYpO1xuICAgIH1cbiAgICBpZiAoIXNlZW5QZXJjdXNzaW9uQ2hhbm5lbCkge1xuICAgICAgdmFyIGNoID0gbmV3IENoYW5uZWwoOSk7XG4gICAgICB0aGlzLmNoYW5uZWxzLnB1c2goY2gpO1xuICAgICAgdGhpcy50cmFja3MucHVzaChuZXcgVHJhY2soY2gsIHRoaXMpKTtcbiAgICB9XG4gICAgdGhpcy5hcGkucmVxdWVzdFNlcXVlbmNlckRlZigpO1xuICAgIHRoaXMub3BlblRpbWVsaW5lRWRpdG9yKCk7XG4gIH1cbiAgXG4gIC8vIGFwaSBjYWxsYmFja1xuICBpbml0aWFsaXNlU2VxdWVuY2VUcmFja3Moc2VxdWVuY2VzKSB7XG4gICAgdmFyIGNoYW5uZWxTZXF1ZW5jZXMgPSB7fTtcbiAgICBmb3IgKHZhciBjaCBvZiB0aGlzLmNoYW5uZWxzKSB7XG4gICAgICBjaGFubmVsU2VxdWVuY2VzW2NoLmNoYW5uZWxOcl0gPSBbXTtcbiAgICB9XG4gICAgZm9yICh2YXIgc2VxIG9mIHNlcXVlbmNlcykge1xuICAgICAgdmFyIGRlZnMgPSB0aGlzLnNlcXVlbmNlRGVmQnlDaGFubmVsKHNlcSk7XG4gICAgICBmb3IgKHZhciBjaCBvZiB0aGlzLmNoYW5uZWxzKSB7XG4gICAgICAgIGZvciAodmFyIHMgb2YgZGVmc1tjaC5jaGFubmVsTnJdKSB7XG4gICAgICAgICAgY2hhbm5lbFNlcXVlbmNlc1tjaC5jaGFubmVsTnJdLnB1c2gocyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coY2hhbm5lbFNlcXVlbmNlcyk7XG4gICAgZm9yICh2YXIgY2ggb2YgdGhpcy5jaGFubmVscykge1xuICAgICAgY2guaW5pdGlhbGlzZVNlcXVlbmNlVHJhY2tzKGNoYW5uZWxTZXF1ZW5jZXNbY2guY2hhbm5lbE5yXSk7XG4gICAgfVxuICAgIHRoaXMub3BlblRpbWVsaW5lRWRpdG9yKCk7XG4gICAgdGhpcy51cGxvYWRTZXF1ZW5jZXJEZWYoKTtcbiAgfVxuXG4gIGNvbXBpbGUoKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIFwiYnBtXCI6IDEyMCxcbiAgICAgIFwiZ3JhbnVsYXJpdHlcIjogNjQsXG4gICAgICBcImNoYW5uZWxzXCI6IFtdLFxuICAgICAgXCJzZXF1ZW5jZXNcIjogW10sXG4gICAgfTtcbiAgICBmb3IgKHZhciBjaCBvZiB0aGlzLmNoYW5uZWxzKSB7XG4gICAgICB2YXIgY2hhbm5lbFJlc3VsdCA9IGNoLmNvbXBpbGUoKTtcbiAgICAgIGlmIChjaGFubmVsUmVzdWx0LmNoYW5uZWwpIHtcbiAgICAgICAgcmVzdWx0LmNoYW5uZWxzLnB1c2goY2hhbm5lbFJlc3VsdC5jaGFubmVsKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIHMgb2YgY2hhbm5lbFJlc3VsdC5zZXF1ZW5jZXMpIHtcbiAgICAgICAgcmVzdWx0LnNlcXVlbmNlcy5wdXNoKHMpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB1cGxvYWRTZXF1ZW5jZXJEZWYoKSB7XG4gICAgdGhpcy5hcGkuc2V0U2VxdWVuY2VyRGVmKHRoaXMuY29tcGlsZSgpKTtcbiAgfVxuXG4gIHNlcXVlbmNlRGVmQnlDaGFubmVsKHNlcSkge1xuICAgIHZhciBjaGFubmVsU2VxdWVuY2VzID0ge307XG4gICAgZm9yICh2YXIgY2ggb2YgdGhpcy5jaGFubmVscykge1xuICAgICAgY2hhbm5lbFNlcXVlbmNlc1tjaC5jaGFubmVsTnJdID0gW107XG4gICAgfVxuICAgIHZhciBsZWF2ZXMgPSBbXCJwbGF5X25vdGVcIiwgXCJwbGF5X25vdGVzXCIsIFwidm9sdW1lXCIsXG4gICAgICAgICAgICAgICAgICBcImxwZl9jdXRvZmZcIiwgXCJocGZfY3V0b2ZmXCIsIFwicGFubmluZ1wiXTtcbiAgICBmb3IgKHZhciBsZWFmIG9mIGxlYXZlcykge1xuICAgICAgaWYgKHNlcVtsZWFmXSkge1xuICAgICAgICB2YXIgcyA9IHNlcVtsZWFmXTtcbiAgICAgICAgaWYgKGNoYW5uZWxTZXF1ZW5jZXNbcy5jaGFubmVsXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY2hhbm5lbFNlcXVlbmNlc1tzLmNoYW5uZWxdLnB1c2goc2VxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk1pc3NpbmcgY2hhbm5lbFwiLCBzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhbm5lbFNlcXVlbmNlcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgd3JhcHBlZFNlcXVlbmNlcyA9IFtcInJlcGVhdFwiLCBcImFmdGVyXCIsIFwiYmVmb3JlXCIsIFwiZXVjbGlkaWFuXCIsIFwib2Zmc2V0XCJdO1xuICAgIGZvciAodmFyIHdyYXBwZWQgb2Ygd3JhcHBlZFNlcXVlbmNlcykge1xuICAgICAgaWYgKHNlcVt3cmFwcGVkXSkge1xuICAgICAgICBpZiAoIXNlcVt3cmFwcGVkXS5zZXF1ZW5jZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWlzc2luZyBzZXF1ZW5jZVwiLCBzZXEpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjaCA9IHRoaXMuc2VxdWVuY2VEZWZCeUNoYW5uZWwoc2VxW3dyYXBwZWRdLnNlcXVlbmNlKVxuICAgICAgICBmb3IgKHZhciBjaGFubmVsTnIgb2YgT2JqZWN0LmtleXMoY2gpKSB7XG4gICAgICAgICAgdmFyIHNlcXMgPSBjaFtjaGFubmVsTnJdO1xuICAgICAgICAgIGlmIChzZXFzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IFxuICAgICAgICAgIGZvciAodmFyIGRlZlNlcSBvZiBzZXFzKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMoc2VxKSkge1xuICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHNlcVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnNlcXVlbmNlID0gZGVmU2VxO1xuICAgICAgICAgICAgY2hhbm5lbFNlcXVlbmNlc1tjaGFubmVsTnJdLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoYW5uZWxTZXF1ZW5jZXM7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZXEuY29tYmluZSkge1xuICAgICAgZm9yICh2YXIgc2VxIG9mIHNlcS5jb21iaW5lKSB7XG4gICAgICAgIHZhciBkZWZzID0gdGhpcy5zZXF1ZW5jZURlZkJ5Q2hhbm5lbChzZXEpO1xuICAgICAgICBmb3IgKHZhciBjaCBvZiB0aGlzLmNoYW5uZWxzKSB7XG4gICAgICAgICAgZm9yICh2YXIgcyBvZiBkZWZzW2NoLmNoYW5uZWxOcl0pIHtcbiAgICAgICAgICAgIGNoYW5uZWxTZXF1ZW5jZXNbY2guY2hhbm5lbE5yXS5wdXNoKHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcInVua25vd24gZGVmXCIsIHNlcSk7XG4gICAgfVxuICAgIHJldHVybiBjaGFubmVsU2VxdWVuY2VzO1xuICB9XG5cbiAgb3Blbkluc3RydW1lbnRFZGl0b3IoaW5zdHIpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IG5ldyBJbnN0cnVtZW50RWRpdG9yKHRoaXMsIGluc3RyLCB0aGlzLm9wZW5UaW1lbGluZUVkaXRvci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmRyYXcoKVxuICB9XG4gIG9wZW5UaW1lbGluZUVkaXRvcigpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IG5ldyBUaW1lbGluZUVkaXRvcih0aGlzLnRyYWNrcyk7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cbiAgb3BlblNlcXVlbmNlRWRpdG9yKHNlcXVlbmNlLCBjaGFubmVsTnIpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IG5ldyBTZXF1ZW5jZUVkaXRvcih0aGlzLCBzZXF1ZW5jZSwgY2hhbm5lbE5yLCB0aGlzLm9wZW5UaW1lbGluZUVkaXRvci5iaW5kKHRoaXMpKVxuICAgIHRoaXMuZHJhdygpO1xuICB9XG5cbiAgaGFuZGxlTW91c2VEb3duKGUpIHtcbiAgICB2YXIgYm91bmQgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIHZhciB4ID0gZS5jbGllbnRYIC0gYm91bmQubGVmdDsgXG4gICAgdmFyIHkgPSBlLmNsaWVudFkgLSBib3VuZC50b3A7XG4gICAgdGhpcy5zZWxlY3RlZEVsZW0gPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0ZWRQb3MgPSB7fTtcbiAgICBpZiAodGhpcy5hY3RpdmUuaGFuZGxlTW91c2VEb3duKSB7XG4gICAgICB2YXIgZWxlbSA9IHRoaXMuYWN0aXZlLmhhbmRsZU1vdXNlRG93bih0aGlzLCB4LCB5KTtcbiAgICAgIGlmIChlbGVtKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRFbGVtID0gZWxlbTtcbiAgICAgICAgdGhpcy5zdGFydFNlbGVjdGVkUG9zID0ge3gsIHl9O1xuICAgICAgICB0aGlzLnNlbGVjdGVkUG9zID0ge3gsIHl9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU1vdXNlVXAoZSkge1xuICAgIHZhciBib3VuZCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgdmFyIHggPSBlLmNsaWVudFggLSBib3VuZC5sZWZ0OyBcbiAgICB2YXIgeSA9IGUuY2xpZW50WSAtIGJvdW5kLnRvcDtcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVsZW0pIHtcbiAgICAgIHZhciBlbGVtID0gdGhpcy5zZWxlY3RlZEVsZW07XG4gICAgICB2YXIgc3ggPSB0aGlzLnN0YXJ0U2VsZWN0ZWRQb3MueDtcbiAgICAgIHZhciBzeSA9IHRoaXMuc3RhcnRTZWxlY3RlZFBvcy55O1xuICAgICAgaWYgKHN4ID49IHggLTUgJiYgc3ggPD0geCArIDUgJiYgc3kgPj0geSAtIDUgJiYgc3kgPD0geSArIDUpIHtcbiAgICAgICAgaWYgKGVsZW0uaGFuZGxlQ2xpY2spIHtcbiAgICAgICAgICBlbGVtLmhhbmRsZUNsaWNrKHRoaXMsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWxlbS5oYW5kbGVEcm9wKSB7XG4gICAgICAgICAgZWxlbS5oYW5kbGVEcm9wKHRoaXMsIHgsIHkpO1xuICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNlbGVjdGVkRWxlbSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTW91c2VNb3ZlKGUpIHtcbiAgICB2YXIgYm91bmQgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIHZhciB4ID0gZS5jbGllbnRYIC0gYm91bmQubGVmdDsgXG4gICAgdmFyIHkgPSBlLmNsaWVudFkgLSBib3VuZC50b3A7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbGVtKSB7XG4gICAgICB2YXIgZWxlbSA9IHRoaXMuc2VsZWN0ZWRFbGVtO1xuICAgICAgdmFyIHN4ID0gdGhpcy5zZWxlY3RlZFBvcy54O1xuICAgICAgdmFyIHN5ID0gdGhpcy5zZWxlY3RlZFBvcy55O1xuICAgICAgaWYgKHN4ID49IHggLTUgJiYgc3ggPD0geCArIDUgJiYgc3kgPj0geSAtIDUgJiYgc3kgPD0geSArIDUpIHtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbGVtLmhhbmRsZURyYWcpIHtcbiAgICAgICAgICBlbGVtLmhhbmRsZURyYWcodGhpcywgeCAtIHN4LCB5IC0gc3ksIHgsIHksIHN4LCBzeSk7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZFBvcyA9IHt4LCB5fTtcbiAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgdmFyIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdmFyIHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB2YXIgYm91bmQgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93V2lkdGg7XG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gd2luZG93SGVpZ2h0IC0gYm91bmQudG9wO1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICBib2R5LnN0eWxlLmJhY2tncm91bmQgPSB0aGlzLnRoZW1lLmNvbG91cnMuQmFja2dyb3VuZDtcbiAgICBib2R5LnN0eWxlLmNvbG9yID0gdGhpcy50aGVtZS5jb2xvdXJzLkZvcmVncm91bmQ7XG4gICAgdGhpcy5hY3RpdmUuZHJhdyh0aGlzKTtcbiAgfVxufVxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICB0cnkgeyBcbiAgbmV3IEJsZWVwKCk7XG4gIH0gY2F0Y2goZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIGFsZXJ0KGUpO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgQVVESU9fVFlQRSA9IDE7XG5leHBvcnQgY29uc3QgRlJFUVVFTkNZX1RZUEUgPSAyO1xuZXhwb3J0IGNvbnN0IFBBTk5JTkdfVFlQRSA9IDM7XG5leHBvcnQgY29uc3QgQ0xPQ0tfVFlQRSA9IDQ7XG5leHBvcnQgY29uc3QgVFJJR0dFUl9UWVBFID0gNTtcbmV4cG9ydCBjb25zdCBJTlRfVFlQRSA9IDY7XG5leHBvcnQgeyBQYXRjaGFibGUgfSBmcm9tICcuL3BhdGNoYWJsZS5qcyc7XG4iLCJpbXBvcnQgeyBQYXRjaCB9IGZyb20gJy4uL2NvbXBvbmVudHMvJztcblxuZXhwb3J0IGNsYXNzIFBhdGNoYWJsZSB7XG4gIGNvbnN0cnVjdG9yKG1vZHVsZXMsIHBhdGNoZXMpIHtcbiAgICB0aGlzLm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgIHRoaXMucGF0Y2hlcyA9IHBhdGNoZXM7XG4gIH1cbiAgYWRkUGF0Y2goZnJvbU1vZCwgdG9Nb2QsIGZyb21Tb2NrZXQsIHRvU29ja2V0KSB7XG4gICAgdmFyIGZyb20gPSBudWxsO1xuICAgIHZhciB0byA9IG51bGw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBtID0gdGhpcy5tb2R1bGVzW2ldO1xuICAgICAgaWYgKG0gPT09IGZyb21Nb2QpIHtcbiAgICAgICAgZnJvbSA9IGk7XG4gICAgICB9XG4gICAgICBpZiAobSA9PT0gdG9Nb2QpIHtcbiAgICAgICAgdG8gPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZnJvbSA9PT0gbnVsbCB8fCB0byA9PT0gbnVsbCB8fCAoZnJvbSA9PT0gdG8gJiYgZnJvbVNvY2tldCA9PT0gdG9Tb2NrZXQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHRoaXMubW9kdWxlc1tmcm9tXS51bml0LnNvY2tldHNbZnJvbVNvY2tldF0udHlwZSAhPSB0aGlzLm1vZHVsZXNbdG9dLnVuaXQuc29ja2V0c1t0b1NvY2tldF0udHlwZSkge1xuICAgICAgYWxlcnQoXCJXcm9uZyB0eXBlc1wiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHBhdGNoID0gbmV3IFBhdGNoKGZyb20sIHRvLCBmcm9tU29ja2V0LCB0b1NvY2tldCwgdGhpcy5tb2R1bGVzW2Zyb21dLnVuaXQuc29ja2V0c1tmcm9tU29ja2V0XS50eXBlKTtcbiAgICB2YXIgcmVtb3ZlID0gbnVsbDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHAgPSB0aGlzLnBhdGNoZXNbaV07XG4gICAgICBpZiAocC5pc0lzb21vcnBoaWMocGF0Y2gpKSB7XG4gICAgICAgIHJlbW92ZSA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocmVtb3ZlID09PSBudWxsKSB7XG4gICAgICB0aGlzLnBhdGNoZXMucHVzaChwYXRjaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGF0Y2hlcy5zcGxpY2UocmVtb3ZlLCAxKTtcbiAgICB9XG4gIH1cblxufVxuIiwiXG5pbXBvcnQgeyBFZGl0b3IsIEJ1dHRvbiwgTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgU2VxdWVuY2UgfSBmcm9tICcuL3NlcXVlbmNlLmpzJztcbmltcG9ydCB7IFNlcXVlbmNlSW5wdXQsIFNlcXVlbmNlT3V0cHV0LCBQdWxzZSwgUGxheU5vdGUsIFJhbmdlIH0gZnJvbSAnLi9tb2R1bGVfdW5pdHMvJztcblxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlRWRpdG9yIGV4dGVuZHMgRWRpdG9yIHtcbiAgY29uc3RydWN0b3IoYXBwLCBzZXF1ZW5jZSwgY2hhbm5lbE5yLCBoYW5kbGVDbG9zZSkge1xuICAgIHN1cGVyKGFwcCwgc2VxdWVuY2UsIGhhbmRsZUNsb3NlKTtcbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICBpZiAoIXNlcXVlbmNlKSB7XG4gICAgICBzZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZShbXSwgW10sIGNoYW5uZWxOcik7XG4gICAgICB2YXIgbW9kdWxlcyA9IFtcbiAgICAgICAgbmV3IE1vZHVsZShzZXF1ZW5jZSwgMzAsIDUwLCBuZXcgU2VxdWVuY2VJbnB1dCgnaW5wdXQnKSksIFxuICAgICAgXTtcbiAgICAgIHNlcXVlbmNlLm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgIH1cbiAgICB0aGlzLnRhcmdldCA9IHNlcXVlbmNlO1xuICAgIHZhciBidXR0b25EZWZzID0gW1xuICAgICAgICB7bGFiZWw6IFwi8J2FnVwiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUHVsc2UoNCkpfSxcbiAgICAgICAge2xhYmVsOiBcIvCdhZ5cIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDIpKX0sXG4gICAgICAgIHtsYWJlbDogXCLimalcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDEpKX0sXG4gICAgICAgIHtsYWJlbDogXCLimapcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDAuNSkpfSxcbiAgICAgICAge2xhYmVsOiBcIvCdhaFcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDAuMjUpKX0sXG4gICAgICAgIHtsYWJlbDogXCLwnYWiXCIsIGNvbG91cjogJ01vZHVsZVB1bHNlJywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBQdWxzZSgwLjEyNSkpfSxcbiAgICAgICAge2xhYmVsOiBcIlBVTFNcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKCkpfSxcbiAgICAgICAge2xhYmVsOiBcIkVVQ0xcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiTk9URVwiLCBjb2xvdXI6ICdNb2R1bGVPdXRwdXQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFBsYXlOb3RlKCkpfSxcbiAgICAgICAge2xhYmVsOiBcIlBBTlwiLCBjb2xvdXI6ICdNb2R1bGVPdXRwdXQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiUkVWXCIsIGNvbG91cjogJ01vZHVsZU91dHB1dCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJMUEZcIiwgY29sb3VyOiAnTW9kdWxlT3V0cHV0Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzaW5lXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIkhQRlwiLCBjb2xvdXI6ICdNb2R1bGVPdXRwdXQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuXG4gICAgICAgIHtsYWJlbDogXCJTV0VFUFwiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFJhbmdlKFwic3dlZXBcIikpfSxcbiAgICAgICAge2xhYmVsOiBcIkNZQ0xFXCIsIGNvbG91cjogJ01vZHVsZUludCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJSQU5HRVwiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFJhbmdlKFwicmFuZ2VcIikpfSxcbiAgICAgICAge2xhYmVsOiBcIkZBREVcIiwgY29sb3VyOiAnTW9kdWxlSW50Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBSYW5nZShcImZhZGUgaW5cIikpfSxcbiAgICAgICAge2xhYmVsOiBcIlJBTkRcIiwgY29sb3VyOiAnTW9kdWxlSW50Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzaW5lXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlJFR1wiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiVFJBTlNcIiwgY29sb3VyOiAnTW9kdWxlSW50Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzaW5lXCIpfSxcbiAgICBdXG5cbiAgICB2YXIgeCA9IDA7XG4gICAgdmFyIHByZXYgPSBudWxsO1xuICAgIHZhciBwYWRkaW5nID0gMDtcbiAgICB2YXIgZ3JvdXBQYWRkaW5nID0gMTU7XG4gICAgZm9yICh2YXIgZGVmIG9mIGJ1dHRvbkRlZnMpIHtcbiAgICAgIHZhciBiID0gbmV3IEJ1dHRvbih4LCBhcHAudGhlbWUucGFkZGluZywgZGVmLm9uY2xpY2suYmluZCh0aGlzKSwgZGVmLmxhYmVsKTtcbiAgICAgIGIuY29sb3VyID0gYXBwLnRoZW1lLmNvbG91cnNbZGVmLmNvbG91cl0gfHwgYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlR2VuZXJhdG9yO1xuICAgICAgdGhpcy5idXR0b25zLnB1c2goYik7XG4gICAgICBpZiAocHJldiAmJiBwcmV2LmNvbG91ciAhPSBkZWYuY29sb3VyKSB7XG4gICAgICAgIHggKz0gZ3JvdXBQYWRkaW5nO1xuICAgICAgICBiLnggKz0gZ3JvdXBQYWRkaW5nO1xuICAgICAgfVxuICAgICAgeCArPSBiLncgKyBwYWRkaW5nO1xuICAgICAgcHJldiA9IGRlZjtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCB7IFB1bHNlIH0gZnJvbSAnLi9wdWxzZS5qcyc7XG5leHBvcnQgeyBQbGF5Tm90ZSB9IGZyb20gJy4vcGxheV9ub3RlLmpzJztcbmV4cG9ydCB7IFNlcXVlbmNlSW5wdXQgfSBmcm9tICcuL3NlcXVlbmNlX2lucHV0LmpzJztcbmV4cG9ydCB7IFJhbmdlIH0gZnJvbSAnLi9yYW5nZS5qcyc7XG4iLCJpbXBvcnQgeyBNb2R1bGVVbml0LCBJbnB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IFRSSUdHRVJfVFlQRSwgSU5UX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgUGxheU5vdGUgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJwbGF5X25vdGVcIik7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJUUklHXCI6IG5ldyBJbnB1dFNvY2tldCgyOSwgdGhpcy5oIC0gMjksIFwiVFJJR1wiLCBUUklHR0VSX1RZUEUpLFxuICAgICAgXCJOT1RFXCI6IG5ldyBJbnB1dFNvY2tldCg3OSwgdGhpcy5oIC0gMjksIFwiTk9URVwiLCBJTlRfVFlQRSksXG4gICAgICBcIlZFTFwiOiBuZXcgSW5wdXRTb2NrZXQoMTI5LCB0aGlzLmggLSAyOSwgXCJWRUxcIiwgSU5UX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmRpYWxzID0ge1xuICAgICAgXCJub3RlXCI6IG5ldyBEaWFsKDI5LCA1OSwgXCJOT1RFXCIsIDAuMCwgMTI4LjAsIDEuMCksXG4gICAgICBcInZlbG9jaXR5XCI6IG5ldyBEaWFsKDc5LCA1OSwgXCJWRUxcIiwgMC4wLCAxMC4wLCAxLjApLFxuICAgICAgXCJkdXJhdGlvblwiOiBuZXcgRGlhbCgxMjksIDU5LCBcIkRVUlwiLCAwLjAsIDEwLjAsIDEuMCksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVPdXRwdXQnO1xuICB9XG5cbiAgY29tcGlsZShjb25uZWN0aW9ucykge1xuICAgIHZhciBnID0ge1wicGxheV9ub3RlXCI6IHtcbiAgICAgIFwiZHVyYXRpb25cIjogdGhpcy5kaWFsc1tcImR1cmF0aW9uXCJdLnZhbHVlLFxuICAgICAgXCJjaGFubmVsXCI6IHRoaXMuY2hhbm5lbE5yLFxuICAgIH19O1xuICAgIHZhciBvbiA9IGNvbm5lY3Rpb25zW1wiTk9URVwiXTtcbiAgICBpZiAob24ubGVuZ3RoID09PSAwKSB7XG4gICAgICBnW1wicGxheV9ub3RlXCJdW1wibm90ZVwiXSA9IHRoaXMuZGlhbHNbXCJub3RlXCJdLnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBnW1wicGxheV9ub3RlXCJdW1wiYXV0b19ub3RlXCJdID0gb25bMF07XG4gICAgfVxuICAgIHZhciBvbiA9IGNvbm5lY3Rpb25zW1wiVkVMXCJdO1xuICAgIGlmIChvbi5sZW5ndGggPT09IDApIHtcbiAgICAgIGdbXCJwbGF5X25vdGVcIl1bXCJ2ZWxvY2l0eVwiXSA9IHRoaXMuZGlhbHNbXCJ2ZWxvY2l0eVwiXS52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ1tcInBsYXlfbm90ZVwiXVtcImF1dG9fdmVsb2NpdHlcIl0gPSBvblswXTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gW11cbiAgICB2YXIgb24gPSBjb25uZWN0aW9uc1tcIlRSSUdcIl07XG4gICAgZm9yICh2YXIgbyBvZiBvbikge1xuICAgICAgcmVzdWx0LnB1c2gobyhnKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZVVuaXQsIElucHV0U29ja2V0LCBPdXRwdXRTb2NrZXQsIERpYWwgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBUUklHR0VSX1RZUEUsIENMT0NLX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgUHVsc2UgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IoZXZlcnkpIHtcbiAgICBzdXBlcihcInB1bHNlXCIpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiQ0xPQ0tcIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJDTE9DS1wiLCBDTE9DS19UWVBFKSxcbiAgICAgIFwiVFJJR1wiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJUUklHXCIsIFRSSUdHRVJfVFlQRSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgICBcImV2ZXJ5XCI6IG5ldyBEaWFsKDI5LCA1OSwgXCJFVkVSWVwiLCAwLjAsIDEwLjAsIDEuMCksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMuZXZlcnkudmFsdWUgPSBldmVyeSB8fCAxO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVQdWxzZSc7XG4gIH1cblxuICBjb21waWxlKGNvbm5lY3Rpb25zKSB7XG4gICAgdmFyIGUgPSB7XCJldmVyeVwiOiB0aGlzLmRpYWxzW1wiZXZlcnlcIl0udmFsdWV9O1xuICAgIHJldHVybiAoKGUpID0+ICgodCkgPT4ge1xuICAgICAgZm9yICh2YXIgbyBvZiBPYmplY3Qua2V5cyh0KSkge1xuICAgICAgICBlW29dID0gdFtvXTtcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHQgPSB7XCJyZXBlYXRcIjogZX07XG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSkpKGUpXG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZVVuaXQsIE91dHB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IElOVF9UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFJhbmdlIGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIk9VVFwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJPVVRcIiwgSU5UX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmRpYWxzID0ge1xuICAgICAgXCJmcm9tXCI6IG5ldyBEaWFsKDI5LCA1OSwgXCJGUk9NXCIsIDAuMCwgMTI3LjAsIDAuMCksXG4gICAgICBcInRvXCI6IG5ldyBEaWFsKDc5LCA1OSwgXCJUT1wiLCAwLjAsIDEyNy4wLCAxMjcuMCksXG4gICAgICBcInN0ZXBcIjogbmV3IERpYWwoMTI5LCA1OSwgXCJTVEVQXCIsIDAuMCwgMTI4LjAsIDEuMCksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVJbnQnO1xuICB9XG5cbiAgY29tcGlsZShjb25uZWN0aW9ucykge1xuICAgIHZhciBnID0ge307XG4gICAgZ1t0aGlzLnR5cGVdID0ge1xuICAgICAgXCJmcm9tXCI6IHRoaXMuZGlhbHMuZnJvbS52YWx1ZSxcbiAgICAgIFwidG9cIjogdGhpcy5kaWFscy50by52YWx1ZSxcbiAgICAgIFwic3RlcFwiOiB0aGlzLmRpYWxzLnN0ZXAudmFsdWUsXG4gICAgfTtcbiAgICByZXR1cm4gZztcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgT3V0cHV0U29ja2V0IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgQ0xPQ0tfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBTZXF1ZW5jZUlucHV0IGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIkNMT0NLXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIkNMT0NLXCIsIENMT0NLX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlT3V0cHV0JztcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGF0Y2hhYmxlIH0gZnJvbSAnLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlIGV4dGVuZHMgUGF0Y2hhYmxlIHtcbiAgY29uc3RydWN0b3IobW9kdWxlcywgcGF0Y2hlcywgY2hhbm5lbE5yKSB7XG4gICAgc3VwZXIobW9kdWxlcywgcGF0Y2hlcyk7XG4gICAgdGhpcy5jaGFubmVsTnIgPSBjaGFubmVsTnIgfHwgMTtcbiAgfVxuICBjb21waWxlKCkge1xuICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgIHZhciBzZWVuID0ge307XG4gICAgdmFyIGRlcGVuZGVuY2llcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBtID0gdGhpcy5tb2R1bGVzW2ldO1xuICAgICAgaWYgKG0udW5pdC50eXBlID09IFwicGxheV9ub3RlXCIpIHtcbiAgICAgICAgcXVldWUucHVzaChpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBxID0gcXVldWVbMF07XG4gICAgICB2YXIgcXVldWUgPSBxdWV1ZS5zcGxpY2UoMSk7XG4gICAgICBpZiAoc2VlbltxXSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgZGVwZW5kZW5jaWVzLnB1c2gocSk7XG4gICAgICBmb3IgKHZhciBwIG9mIHRoaXMucGF0Y2hlcykge1xuICAgICAgICB2YXIgbW9kU29ja2V0cyA9IHRoaXMubW9kdWxlc1txXS51bml0LnNvY2tldHM7XG4gICAgICAgIGlmIChwLnRvID09PSBxICYmIG1vZFNvY2tldHNbcC50b1NvY2tldF0uaXNJbnB1dCkge1xuICAgICAgICAgIGlmICghc2VlbltwLmZyb21dKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKHAuZnJvbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHAuZnJvbSA9PT0gcSAmJiBtb2RTb2NrZXRzW3AuZnJvbVNvY2tldF0uaXNJbnB1dCkge1xuICAgICAgICAgIGlmICghc2VlbltwLmZyb21dKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKHAudG8pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2VlbltxXSA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBzZXF1ZW5jZXMgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gZGVwZW5kZW5jaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgaXggPSBkZXBlbmRlbmNpZXNbaV07XG4gICAgICB2YXIgdW5pdCA9IHRoaXMubW9kdWxlc1tpeF0udW5pdDtcblxuICAgICAgdmFyIGNvbm5lY3Rpb25zID0ge307XG4gICAgICBmb3IgKHZhciBzb2NrZXRJZCBvZiBPYmplY3Qua2V5cyh1bml0LnNvY2tldHMpKSB7XG4gICAgICAgIGlmICh1bml0LnNvY2tldHNbc29ja2V0SWRdLmlzSW5wdXQpIHtcbiAgICAgICAgICBjb25uZWN0aW9uc1tzb2NrZXRJZF0gPSB0aGlzLmdldENvbm5lY3RlZFNlcXVlbmNlcyhzZXF1ZW5jZXMsIGl4LCBzb2NrZXRJZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh1bml0LnR5cGUgPT0gXCJwbGF5X25vdGVcIikge1xuICAgICAgICBmb3IgKHZhciBvIG9mIHVuaXQuY29tcGlsZShjb25uZWN0aW9ucykpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChvKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGcgPSB1bml0LmNvbXBpbGUoY29ubmVjdGlvbnMpO1xuICAgICAgICBzZXF1ZW5jZXNbaXhdID0gZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBnZXRDb25uZWN0ZWRTZXF1ZW5jZXMoc2VxdWVuY2VzLCBpeCwgaW5wdXQpIHtcbiAgICB2YXIgZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBwIG9mIHRoaXMucGF0Y2hlcykge1xuICAgICAgaWYgKHAuZG9lc1BhdGNoQ29ubmVjdFRvKGl4LCBpbnB1dCkpIHtcbiAgICAgICAgZ3MucHVzaChzZXF1ZW5jZXNbcC5jb25uZWN0c1RvKGl4LCBpbnB1dCkubW9kdWxlXSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBBVURJT19UWVBFLCBGUkVRVUVOQ1lfVFlQRSwgUEFOTklOR19UWVBFLCBDTE9DS19UWVBFLCBUUklHR0VSX1RZUEUsIElOVF9UWVBFIH0gZnJvbSAnLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgVGhlbWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBhZGRpbmcgPSAwO1xuICAgIHZhciBzb2NrZXRDb2xvdXJzID0ge307XG4gICAgdmFyIHBhdGNoQ29sb3VycyA9IHt9XG4gICAgc29ja2V0Q29sb3Vyc1tBVURJT19UWVBFXSA9ICdyZ2IoMTQwLCAyNTUsIDI1NSknO1xuICAgIHNvY2tldENvbG91cnNbRlJFUVVFTkNZX1RZUEVdID0gJ3JnYigyNTUsIDI1NSwgMTQwKSc7XG4gICAgc29ja2V0Q29sb3Vyc1tQQU5OSU5HX1RZUEVdID0gJ3JnYigyNTUsIDE0MCwgMjU1KSc7XG4gICAgc29ja2V0Q29sb3Vyc1tDTE9DS19UWVBFXSA9ICdyZ2IoMTAwLCAxMDAsIDI1NSknO1xuICAgIHNvY2tldENvbG91cnNbVFJJR0dFUl9UWVBFXSA9ICdyZ2IoNTAsIDUwLCA1MCknO1xuICAgIHNvY2tldENvbG91cnNbSU5UX1RZUEVdID0gJ3JnYigyNTUsIDI1NSwgNDApJztcbiAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMoc29ja2V0Q29sb3VycykpIHtcbiAgICAgIHBhdGNoQ29sb3Vyc1trZXldID0gUkdCX0xpbmVhcl9TaGFkZSgwLjEsIHNvY2tldENvbG91cnNba2V5XSk7XG4gICAgfVxuICAgIHRoaXMuY29sb3VycyA9IHtcbiAgICAgIE91dGxpbmVDb2xvdXI6ICcjMzMzJyxcbiAgICAgIEJhY2tncm91bmQ6ICcjNDQ0JyxcbiAgICAgIEZvcmVncm91bmQ6ICcjZWVlJyxcbiAgICAgIEluc3RydW1lbnRFZGl0b3JCYWNrZ3JvdW5kOiAnI2VlZScsXG5cbiAgICAgIFNvY2tldEJhY2tncm91bmQ6ICcjOWZmJyxcbiAgICAgIFNvY2tldEluc2lkZTogJyM5OTknLFxuICAgICAgU29ja2V0T3V0bGluZTogJyM3NzcnLFxuXG4gICAgICBQYXRjaDogJyM3ZmYnLFxuXG4gICAgICBNb2R1bGVPdXRsaW5lOiAnIzc3NycsXG4gICAgICBNb2R1bGVUZXh0OiAnIzQ0NCcsXG4gICAgICBNb2R1bGVHZW5lcmF0b3I6ICcjZmZmJyxcbiAgICAgIE1vZHVsZUZpbHRlcjogJyNmZmQnLFxuICAgICAgTW9kdWxlRGVyaXZlZDogJyNkZGYnLFxuICAgICAgTW9kdWxlT3V0cHV0OiAnI2RmZCcsXG4gICAgICBNb2R1bGVJbnQ6ICcjZmY5JyxcbiAgICAgIE1vZHVsZVB1bHNlOiAnI2RkZicsXG5cbiAgICAgIEJ1dHRvbjogJyNjY2MnLFxuICAgICAgQnV0dG9uVGV4dDogJyMzMzMnLFxuXG4gICAgICBEaWFsOiAnI2NjYycsXG4gICAgICBEaWFsTGluZTogJyM0NDQnLFxuXG4gICAgICBTb2NrZXRzOiBzb2NrZXRDb2xvdXJzLFxuICAgICAgUGF0Y2hlczogcGF0Y2hDb2xvdXJzLFxuICAgIH07XG4gIH1cbn1cblxuY29uc3QgUkdCX0xpbmVhcl9TaGFkZT0ocCxjKT0+e1xuICAgIHZhciBpPXBhcnNlSW50LHI9TWF0aC5yb3VuZCxbYSxiLGMsZF09Yy5zcGxpdChcIixcIiksUD1wPDAsdD1QPzA6MjU1KnAsUD1QPzErcDoxLXA7XG4gICAgcmV0dXJuXCJyZ2JcIisoZD9cImEoXCI6XCIoXCIpK3IoaShhWzNdPT1cImFcIj9hLnNsaWNlKDUpOmEuc2xpY2UoNCkpKlArdCkrXCIsXCIrcihpKGIpKlArdCkrXCIsXCIrcihpKGMpKlArdCkrKGQ/XCIsXCIrZDpcIilcIik7XG59XG4iLCJpbXBvcnQgeyBTZXF1ZW5jZVRyYWNrIH0gZnJvbSAnLi9zZXF1ZW5jZV90cmFjay5qcyc7IFxuXG5leHBvcnQgY2xhc3MgQ2hhbm5lbCB7XG4gIGNvbnN0cnVjdG9yKGNoYW5uZWxOciwgb3Blbkluc3RydW1lbnRFZGl0b3IpIHtcbiAgICB0aGlzLmNoYW5uZWxOciA9IGNoYW5uZWxOcjtcbiAgICB0aGlzLmluc3RydW1lbnQgPSBudWxsO1xuICAgIHRoaXMuc2VxdWVuY2VUcmFja3MgPSBbbmV3IFNlcXVlbmNlVHJhY2soKV07XG4gICAgdGhpcy5uYW1lID0gXCJVbnRpdGxlZCBcIiArIHRoaXMuY2hhbm5lbE5yO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhbm5lbE5yOyBpKyspIHtcbiAgICAgIHRoaXMuc2VxdWVuY2VUcmFja3MucHVzaChuZXcgU2VxdWVuY2VUcmFjaygpKTtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRGcm9tRGVmaW5pdGlvbih7fSk7XG4gIH1cblxuICBsb2FkRnJvbURlZmluaXRpb24oZGVmKSB7XG4gICAgdGhpcy5iYW5rID0gZGVmLmJhbmsgfHwgbnVsbDtcbiAgICB0aGlzLmJhbmtJbmRleCA9IGRlZi5pbnN0cnVtZW50IHx8IG51bGw7XG4gICAgdGhpcy5yZXZlcmIgPSBkZWYucmV2ZXJiIHx8IDA7XG4gICAgdGhpcy5yZXZlcmJUaW1lID0gZGVmLnJldmVyYl90aW1lIHx8IDA7XG4gICAgdGhpcy5yZXZlcmJGZWVkYmFjayA9IGRlZi5yZXZlcmJfZmVlZGJhY2sgfHwgMDtcbiAgICB0aGlzLnRyZW1lbG8gPSBkZWYudHJlbWVsbyB8fCAwO1xuICAgIHRoaXMudm9sdW1lID0gZGVmLnZvbHVtZSB8fCAxMDA7XG4gICAgdGhpcy5wYW5uaW5nID0gZGVmLnBhbm5pbmcgfHwgNjQ7XG4gICAgdGhpcy5scGZDdXRvZmYgPSBkZWYubHBmX2N1dG9mZiB8fCAwO1xuICAgIHRoaXMuaHBmQ3V0b2ZmID0gZGVmLmhwZl9jdXRvZmYgfHwgMDtcbiAgICB0aGlzLmdyYWluID0gZGVmLmdyYWluIHx8IG51bGw7XG5cbiAgfVxuXG4gIGNvbXBpbGUoKSB7XG4gICAgdmFyIGNoYW5uZWwgPSB7XG4gICAgICBcImNoYW5uZWxcIjogdGhpcy5jaGFubmVsTnIsXG4gICAgICBcImdlbmVyYXRvclwiOiB0aGlzLmluc3RydW1lbnQgPyB0aGlzLmluc3RydW1lbnQuY29tcGlsZSgpIDogbnVsbCxcbiAgICAgIFwiYmFua1wiOiB0aGlzLmJhbmssXG4gICAgICBcImluc3RydW1lbnRcIjogdGhpcy5iYW5rSW5kZXgsXG4gICAgICBcInJldmVyYlwiOiB0aGlzLnJldmVyYixcbiAgICAgIFwicmV2ZXJiX3RpbWVcIjogdGhpcy5yZXZlcmJUaW1lLFxuICAgICAgXCJyZXZlcmJfZmVlZGJhY2tcIjogdGhpcy5yZXZlcmJGZWVkYmFjayxcbiAgICAgIFwidHJlbWVsb1wiOiB0aGlzLnRyZW1lbG8sXG4gICAgICBcInZvbHVtZVwiOiB0aGlzLnZvbHVtZSxcbiAgICAgIFwicGFubmluZ1wiOiB0aGlzLnBhbm5pbmcsXG4gICAgICBcImxwZl9jdXRvZmZcIjogdGhpcy5scGZDdXRvZmYsXG4gICAgICBcImhwZl9jdXRvZmZcIjogdGhpcy5ocGZDdXRvZmYsXG4gICAgICBcImdyYWluXCI6IHRoaXMuZ3JhaW4sXG4gICAgfTtcbiAgICB2YXIgc2VxdWVuY2VzID0gW107XG4gICAgZm9yICh2YXIgdHIgb2YgdGhpcy5zZXF1ZW5jZVRyYWNrcykge1xuICAgICAgdmFyIHRyUmVzdWx0ID0gdHIuY29tcGlsZSgpO1xuICAgICAgaWYgKHRyUmVzdWx0KSB7XG4gICAgICAgIHNlcXVlbmNlcy5wdXNoKHRyUmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIFwiY2hhbm5lbFwiOiBjaGFubmVsLFxuICAgICAgXCJzZXF1ZW5jZXNcIjogc2VxdWVuY2VzLFxuICAgIH07XG4gIH1cblxuICBpbml0aWFsaXNlU2VxdWVuY2VUcmFja3Moc2VxdWVuY2VzKSB7XG4gICAgdGhpcy5zZXF1ZW5jZVRyYWNrcyA9IFtdO1xuICAgIGZvciAodmFyIHMgb2Ygc2VxdWVuY2VzKSB7XG4gICAgICB2YXIgc2VnbWVudCA9IHt9O1xuICAgICAgaWYgKHMuYWZ0ZXIpIHtcbiAgICAgICAgc2VnbWVudC5hZnRlciA9IHMuYWZ0ZXIuYWZ0ZXI7XG4gICAgICAgIGlmIChzLmFmdGVyLnNlcXVlbmNlLmJlZm9yZSkge1xuICAgICAgICAgIHNlZ21lbnQuYmVmb3JlID0gcy5hZnRlci5zZXF1ZW5jZS5iZWZvcmUuYmVmb3JlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHMuYmVmb3JlKSB7XG4gICAgICAgIHNlZ21lbnQuYmVmb3JlID0gcy5iZWZvcmUuYmVmb3JlO1xuICAgICAgICBpZiAocy5iZWZvcmUuc2VxdWVuY2UuYWZ0ZXIpIHtcbiAgICAgICAgICBzZWdtZW50LmFmdGVyID0gcy5iZWZvcmUuc2VxdWVuY2UuYWZ0ZXIuYWZ0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciB0cmFjayA9IG5ldyBTZXF1ZW5jZVRyYWNrKCk7XG4gICAgICB0cmFjay5zZXF1ZW5jZV9kZWYgPSBzO1xuICAgICAgdHJhY2suYWRkUmFuZ2Uoc2VnbWVudC5hZnRlciwgc2VnbWVudC5iZWZvcmUpO1xuICAgICAgdGhpcy5zZXF1ZW5jZVRyYWNrcy5wdXNoKHRyYWNrKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCB7IENoYW5uZWwgfSBmcm9tICcuL2NoYW5uZWwuanMnO1xuZXhwb3J0IHsgVHJhY2sgfSBmcm9tICcuL3RyYWNrLmpzJztcbmltcG9ydCB7IFRyYWNrIH0gZnJvbSAnLi90cmFjay5qcyc7XG5cbmV4cG9ydCBjbGFzcyBUaW1lbGluZUVkaXRvciB7XG4gIGNvbnN0cnVjdG9yKHRyYWNrcykge1xuICAgIHRoaXMudHJhY2tzID0gdHJhY2tzO1xuICB9XG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgZm9yICh2YXIgZSBvZiB0aGlzLnRyYWNrcykge1xuICAgICAgdmFyIHYgPSBlLmhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkgLSAoaSAqIChlLmhlaWdodCArIGUucGFkZGluZyAqIDIpKSk7XG4gICAgICBpZiAodikge1xuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICB9XG4gIH1cbiAgZHJhdyhhcHApIHtcbiAgICBhcHAuY3R4LnNhdmUoKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgZm9yICh2YXIgZSBvZiB0aGlzLnRyYWNrcykge1xuICAgICAgYXBwLmN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7IC8vIHJlc2V0IHRyYW5zbGF0ZVxuICAgICAgYXBwLmN0eC50cmFuc2xhdGUoMCwgaSAqIChlLmhlaWdodCArIGUucGFkZGluZyAqIDIpKTtcbiAgICAgIGUuZHJhdyhhcHApO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICBhcHAuY3R4LnJlc3RvcmUoKTtcbiAgfVxufVxuIiwiXG5leHBvcnQgY2xhc3MgUmFuZ2Uge1xuICBjb25zdHJ1Y3RvcihzdGFydCwgc3RvcCkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLnN0b3AgPSBzdG9wO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXF1ZW5jZVRyYWNrIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZXF1ZW5jZV9kZWYgPSBudWxsO1xuICAgIHRoaXMucmFuZ2VzID0gW107XG4gIH1cbiAgYWRkUmFuZ2Uoc3RhcnQsIHN0b3ApIHtcbiAgICB0aGlzLnJhbmdlcy5wdXNoKG5ldyBSYW5nZShzdGFydCA/IHN0YXJ0IDogMCwgc3RvcCA/IHN0b3AgOiAxMDAwMDAwKSk7XG4gIH1cbiAgY29tcGlsZSgpIHtcbiAgICBpZiAodGhpcy5zZXF1ZW5jZV9kZWYpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlcXVlbmNlX2RlZjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZHJhdyhhcHAsIHgsIHksIHcsIGgpIHtcbiAgICB2YXIgc2hvd0JhcnMgPSA2NDtcbiAgICB2YXIgcG9pbnRzSW5SYW5nZSA9IHNob3dCYXJzICogNDtcbiAgICB2YXIgc2NhbGluZyA9IHcgLyBwb2ludHNJblJhbmdlO1xuICAgIHZhciBiYXJXaWR0aCA9IDQgKiBzY2FsaW5nO1xuICAgIGZvciAodmFyIHIgb2YgdGhpcy5yYW5nZXMpIHtcbiAgICAgIHZhciBjb2xvck9mZnNldCA9IDEwO1xuICAgICAgdmFyIHdpZHRoID0gTWF0aC5taW4oKHIuc3RvcCAtIHIuc3RhcnQpICogc2NhbGluZywgdyAtIChyLnN0YXJ0ICogc2NhbGluZykpXG4gICAgICBhcHAuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMzUsIDc1LCAnICsgKDIwMCAtIGNvbG9yT2Zmc2V0KSArICcsIDAuMyknO1xuICAgICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoNSwgNSwgJyArICgyMDAgLSBjb2xvck9mZnNldCkgKyAnLCAwLjYpJztcbiAgICAgIGFwcC5jdHguZmlsbFJlY3QoeCArIHIuc3RhcnQgKiBzY2FsaW5nLCB5LCB3aWR0aCwgaCk7XG4gICAgICBhcHAuY3R4LnN0cm9rZVJlY3QoeCArIHIuc3RhcnQgKiBzY2FsaW5nLCB5LCB3aWR0aCwgaCk7XG4gICAgfVxuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSAncmdiKDcwLCA3MCwgNzAsIDAuOCknO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2hvd0JhcnM7IGkrKykge1xuICAgICAgYXBwLmN0eC5zdHJva2VSZWN0KHggKyBpICogYmFyV2lkdGgsIHksIGJhcldpZHRoLCBoKTtcbiAgICB9XG4gIH1cbn1cbiIsIlxuZXhwb3J0IGNsYXNzIFRyYWNrIHtcbiAgY29uc3RydWN0b3IoY2hhbm5lbCwgYXBwKSB7XG4gICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbDtcbiAgICB0aGlzLnBhZGRpbmcgPSAwO1xuICAgIHRoaXMuaGVpZ2h0ID0gNzU7XG4gICAgdGhpcy5jaGFubmVsV2lkdGggPSA5MDtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKCkge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLmFwcC5vcGVuSW5zdHJ1bWVudEVkaXRvcih0aGlzLmNoYW5uZWwuaW5zdHJ1bWVudCk7XG4gICAgfVxuICB9XG5cbiAgZHJhd0NoYW5uZWxTaWRlKGFwcCwgY29sb3JPZmZzZXQpIHtcblxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gJ3JnYigwLCAnICsgKDIwMCAtIGNvbG9yT2Zmc2V0KSArICcsIDApJztcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gJ3JnYig0MCwgNDAsIDQwLCAxLjApJztcbiAgICBhcHAuY3R4LmZpbGxSZWN0KHRoaXMucGFkZGluZywgdGhpcy5wYWRkaW5nLCB0aGlzLmNoYW5uZWxXaWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIGFwcC5jdHguc3Ryb2tlUmVjdCh0aGlzLnBhZGRpbmcsIHRoaXMucGFkZGluZywgdGhpcy5jaGFubmVsV2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gJ3JnYigyNTUsIDI1NSwgMjU1KSc7XG4gICAgYXBwLmN0eC5mb250ID0gJzEwcHggc2Fucy1zZXJpZic7XG4gICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLmNoYW5uZWwubmFtZSwgdGhpcy5wYWRkaW5nICsgMywgdGhpcy5wYWRkaW5nICsgMTEpO1xuICB9XG5cbiAgZHJhd1NlcXVlbmNlVHJhY2tzKGFwcCwgY29sb3JPZmZzZXQpIHtcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgdmFyIG1hcmdpblRvcCA9IHRoaXMubWFyZ2luVG9wO1xuICAgIHZhciBwYWRkaW5nID0gdGhpcy5wYWRkaW5nO1xuICAgIHZhciBjaGFubmVsV2lkdGggPSB0aGlzLmNoYW5uZWxXaWR0aDtcbiAgICB2YXIgdHJhY2tXaWR0aCA9IGFwcC5jYW52YXMud2lkdGggLSBjaGFubmVsV2lkdGggLSBwYWRkaW5nICogMiAtIDIwO1xuXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSAncmdiKDI1NSwgJyArICgyMDAgLSBjb2xvck9mZnNldCkgKyAnLCAwKSc7XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoNDAsIDQwLCA0MCwgMS4wKSc7XG4gICAgYXBwLmN0eC5maWxsUmVjdChwYWRkaW5nICsgY2hhbm5lbFdpZHRoLCBwYWRkaW5nLCB0cmFja1dpZHRoLCBoZWlnaHQpO1xuICAgIGFwcC5jdHguc3Ryb2tlUmVjdChwYWRkaW5nICsgY2hhbm5lbFdpZHRoLCBwYWRkaW5nLCB0cmFja1dpZHRoLCBoZWlnaHQpO1xuXG4gICAgdmFyIHRyYWNrSGVpZ2h0ID0gaGVpZ2h0IC8gdGhpcy5jaGFubmVsLnNlcXVlbmNlVHJhY2tzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hhbm5lbC5zZXF1ZW5jZVRyYWNrcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGFwcC5jdHguc3Ryb2tlUmVjdChwYWRkaW5nICsgY2hhbm5lbFdpZHRoLCBwYWRkaW5nICsgaSAqIHRyYWNrSGVpZ2h0LCB0cmFja1dpZHRoLCB0cmFja0hlaWdodCk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGFubmVsLnNlcXVlbmNlVHJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcyA9IHRoaXMuY2hhbm5lbC5zZXF1ZW5jZVRyYWNrc1tpXTtcbiAgICAgIHMuZHJhdyhhcHAsIHBhZGRpbmcgKyBjaGFubmVsV2lkdGgsIHBhZGRpbmcgKyBpICogdHJhY2tIZWlnaHQsIHRyYWNrV2lkdGgsIHRyYWNrSGVpZ2h0KTtcbiAgICB9XG5cbiAgICB2YXIgc2hvd0JhcnMgPSA0O1xuICAgIHZhciBwb2ludHNJblJhbmdlID0gc2hvd0JhcnMgKiA0O1xuICAgIHZhciBzY2FsaW5nID0gdHJhY2tXaWR0aCAvIHBvaW50c0luUmFuZ2U7XG4gICAgdmFyIGJhcldpZHRoID0gNCAqIHNjYWxpbmc7XG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSAncmdiKDQwLCA0MCwgNDApJztcbiAgICBhcHAuY3R4LmZvbnQgPSAnMTBweCBtb25vJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNob3dCYXJzOyBpKyspIHtcbiAgICAgIGFwcC5jdHguZmlsbFRleHQoaSArIDEsIHBhZGRpbmcgKyBjaGFubmVsV2lkdGggKyAzICsgaSAqIGJhcldpZHRoLCBwYWRkaW5nICsgaGVpZ2h0IC0gMyk7XG4gICAgfVxuICB9XG5cbiAgZHJhdyhhcHApIHtcbiAgICB2YXIgY29sb3JPZmZzZXQgPSB0aGlzLmNoYW5uZWwuY2hhbm5lbE5yICogNDA7XG4gICAgdGhpcy5kcmF3Q2hhbm5lbFNpZGUoYXBwLCBjb2xvck9mZnNldCk7XG4gICAgdGhpcy5kcmF3U2VxdWVuY2VUcmFja3MoYXBwLCBjb2xvck9mZnNldClcbiAgfVxuXG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICB2YXIgcGF0aCA9IG5ldyBQYXRoMkQoKTtcbiAgICB2YXIgY2hhbm5lbFNpZGVQYXRoID0gbmV3IFBhdGgyRCgpO1xuICAgIHZhciB3aWR0aCA9IGFwcC5jYW52YXMud2lkdGggLSB0aGlzLnBhZGRpbmcgKiAyO1xuXG4gICAgY2hhbm5lbFNpZGVQYXRoLnJlY3QoMCwgMCwgdGhpcy5jaGFubmVsV2lkdGgsIHRoaXMuY2hhbm5lbFdpZHRoKTtcbiAgICBpZiAoYXBwLmN0eC5pc1BvaW50SW5QYXRoKGNoYW5uZWxTaWRlUGF0aCwgeCwgeSkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmNoYW5uZWw7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcGF0aC5yZWN0KDAsIDAsIHdpZHRoLCB0aGlzLmhlaWdodCArIHRoaXMucGFkZGluZyAqIDIpO1xuICAgIGlmIChhcHAuY3R4LmlzUG9pbnRJblBhdGgocGF0aCwgeCwgeSkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=