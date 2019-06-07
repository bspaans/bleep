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
    app.ctx.save();
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
    app.ctx.restore();
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
    this.modules = [
      new _components___WEBPACK_IMPORTED_MODULE_1__["Module"](this, 10, 40, new _module_units__WEBPACK_IMPORTED_MODULE_0__["ChannelInput"]('input')), 
      new _components___WEBPACK_IMPORTED_MODULE_1__["Module"](this, 700, 40, new _module_units__WEBPACK_IMPORTED_MODULE_0__["ChannelOutput"]('output')),
    ];
    this.patches = [];
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
        this._addPatch(ix, 0, "FREQ", candidate, _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]);
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
      this._addPatch(tIx, ix, "PAN", "PAN", _model___WEBPACK_IMPORTED_MODULE_2__["PANNING_TYPE"]);
      this._addPatch(input, tIx, "FREQ", "FREQ", _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]);
      return ix;
    } else if (instrDef["transpose"]) {
      var g = new _module_units__WEBPACK_IMPORTED_MODULE_0__["Transpose"]("transpose");
      g.dials["semitones"].value = instrDef["transpose"]["semitones"] || 0;
      var tIx = this.addModule(g);
      var ix = this.loadGenerator(instrDef["transpose"], tIx, output);
      this._addPatch(tIx, ix, "FREQ", "FREQ", _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]);
      this._addPatch(input, tIx, "FREQ", "FREQ IN", _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]);
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
      this._addPatch(ix, output, "OUT", "IN", _model___WEBPACK_IMPORTED_MODULE_2__["AUDIO_TYPE"]);
      return ix;
    } else if (instrDef["vocoder"]) {
      var source = new _module_units__WEBPACK_IMPORTED_MODULE_0__["Factory"]().generatorFromDefinition(instrDef["vocoder"]["source"])
      var vocoder = new _module_units__WEBPACK_IMPORTED_MODULE_0__["Factory"]().generatorFromDefinition(instrDef["vocoder"]["vocoder"])
      return [];
    } else if (instrDef["filter"]) {
      var g = new _module_units__WEBPACK_IMPORTED_MODULE_0__["Factory"]().filterFromDefinition(instrDef["filter"])
      var tIx = this.addModule(g);
      var ix = this.loadGenerator(instrDef["filter"], input, tIx);
      this._addPatch(tIx, output, "OUT", "IN", _model___WEBPACK_IMPORTED_MODULE_2__["AUDIO_TYPE"]);
      return ix;
    } else {
      console.log(instrDef);
      throw 'Unknown instrument def';
    }
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
      this._addPatch(p.from_module, p.to_module, p.from_socket, p.to_socket);
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
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model/ */ "./src/model/index.js");
/* harmony import */ var _sequence_editor___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sequence_editor/ */ "./src/sequence_editor/index.js");
/* harmony import */ var _api___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./api/ */ "./src/api/index.js");







class RegisterDefinitions {
  constructor(initWith) {
    this.reset(initWith);
  }
  reset(initWith) {
    this.ints = [];
    this.floats = [];
    this.arrays = [];
    for (var i = 0; i < 32; i++) {
      this.ints.push([]);
      this.floats.push([]);
      this.arrays.push([]);
    }
  }
  add(otherRegisterDefinitions) {
    for (var i = 0; i < 32; i++) {
      for (var defSeq of otherRegisterDefinitions.ints[i]) {
        this.ints[i].push(defSeq);
      }
      for (var defSeq of otherRegisterDefinitions.floats[i]) {
        this.floats[i].push(defSeq);
      }
      for (var defSeq of otherRegisterDefinitions.arrays[i]) {
        this.arrays[i].push(defSeq);
      }
    }
  }

}

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
    this.api = new _api___WEBPACK_IMPORTED_MODULE_5__["API"](this);
    this.api.start();
    this.channels = [];
    this.registers = new RegisterDefinitions();
    this.tracks = [];
    this.openTimelineEditor();
    this.draw();
  }

  // api callback
  initialiseChannels(channelDefs) {
    this.channels = [];
    this.tracks = [];
    var seenPercussionChannel = false;
    for (var def of channelDefs) {
      var ch = new _model___WEBPACK_IMPORTED_MODULE_3__["Channel"](def.channel || 0);
      ch.loadFromDefinition(def);
      this.channels.push(ch);
      this.tracks.push(new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["ChannelTrack"](ch, this));
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
      var ch = new _model___WEBPACK_IMPORTED_MODULE_3__["Channel"](9);
      this.channels.push(ch);
      this.tracks.push(new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["ChannelTrack"](ch, this));
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
    this.registers.reset(() => []);
    for (var seq of sequences) {
      var channelsAndRegisters = this.sequenceDefByChannelAndRegister(seq);
      var defs = channelsAndRegisters.channelSequences;
      for (var ch of this.channels) {
        for (var s of defs[ch.channelNr]) {
          channelSequences[ch.channelNr].push(s);
        }
      }
      defs = channelsAndRegisters.registerSequences;
      this.registers.add(defs);
    }
    for (var track of this.tracks) {
      if (track instanceof _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["ChannelTrack"]) {
        track.initialiseSequenceTracks(channelSequences[track.unit.channelNr])
      } else if (track instanceof _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["RegisterTrack"]) {
      }
    }
    for (var i = 0; i < 32; i++) {
      if (this.registers.ints[i].length > 0) {
        var track = new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["RegisterTrack"](new _model___WEBPACK_IMPORTED_MODULE_3__["Register"](i, "register"), this);
        track.initialiseSequenceTracks(this.registers.ints[i]);
        this.tracks.push(track);
      }
      if (this.registers.floats[i].length > 0) {
        var track = new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["RegisterTrack"](new _model___WEBPACK_IMPORTED_MODULE_3__["Register"](i, "float_register"), this);
        track.initialiseSequenceTracks(this.registers.floats[i]);
        this.tracks.push(track);
      }
      if (this.registers.arrays[i].length > 0) {
        var track = new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["RegisterTrack"](new _model___WEBPACK_IMPORTED_MODULE_3__["Register"](i, "array_register"), this);
        track.initialiseSequenceTracks(this.registers.arrays[i]);
        this.tracks.push(track);
      }
    }
    this.openTimelineEditor();
    //this.uploadSequencerDef();
  }

  compile() {
    var result = {
      "bpm": 120,
      "granularity": 64,
      "channels": [],
      "sequences": [],
    };
    for (var track of this.tracks) {
      var trackResult = track.compile();
      if (trackResult.track) {
        result.tracks.push(trackResult.track);
      }
      for (var s of trackResult.sequences) {
        result.sequences.push(s);
      }
    }
    console.log(result);
    return result;
  }

  uploadSequencerDef() {
    this.api.setSequencerDef(this.compile());
  }

  sequenceDefByChannelAndRegister(seq) {
    var channelSequences = {};
    var registerSequences = new RegisterDefinitions();
    var result = {
      channelSequences: channelSequences,
      registerSequences: registerSequences,
    }
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
        return result;;
      }
    }
    if (seq["register"]) {
      if (seq.register.register !== undefined) {
        registerSequences.ints[seq.register.register].push(seq);
        console.log(result);
      }
      return result;;
    } else if (seq["float_register"]) {
      if (seq.float_register.register !== undefined) {
        registerSequences.floats[seq.float_register.register].push(seq);
      }
      return result;;
    } else if (seq["array_register"]) {
      if (seq.array_register.register !== undefined) {
        registerSequences.arrays[seq.array_register.register].push(seq);
      }
      return result;;
    }


    var wrappedSequences = ["repeat", "after", "before", "euclidian", "offset"];
    for (var wrapped of wrappedSequences) {
      if (seq[wrapped]) {
        if (!seq[wrapped].sequence) {
          console.log("Missing sequence", seq);
        }
        var subResult = this.sequenceDefByChannelAndRegister(seq[wrapped].sequence)
        var ch = subResult.channelSequences;
        var merger = (defSeq) => {
          var merged = {};
          for (var key of Object.keys(seq)) {
            merged[key] = seq[key];
          }
          merged.sequence = defSeq;
          return merged;
        }
        for (var channelNr of Object.keys(ch)) {
          var seqs = ch[channelNr];
          if (seqs.length == 0) {
            continue;
          } 
          for (var defSeq of seqs) {
            channelSequences[channelNr].push(merger(defSeq));
          }
        }
        var registers = subResult.registerSequences;
        for (var i = 0; i < 32; i++) {
          for (var defSeq of registers.ints[i]) {
            registerSequences.ints[i].push(merger(defSeq));
          }
          for (var defSeq of registers.floats[i]) {
            registerSequences.floats[i].push(merger(defSeq));
          }
          for (var defSeq of registers.arrays[i]) {
            registerSequences.arrays[i].push(merger(defSeq));
          }
        }
        return result;
      }
    }
    if (seq.combine) {
      for (var seq of seq.combine) {
        var subResult = this.sequenceDefByChannelAndRegister(seq);
        var defs = subResult.channelSequences;
        for (var ch of this.channels) {
          for (var s of defs[ch.channelNr]) {
            channelSequences[ch.channelNr].push(s);
          }
        }
        registerSequences.add(subResult.registerSequences);
      }
    } else {
      console.log("unknown def", seq);
    }
    return result;
  }

  openInstrumentEditor(instr) {
    this.active = new _instrument_editor___WEBPACK_IMPORTED_MODULE_1__["InstrumentEditor"](this, instr, this.openTimelineEditor.bind(this));
    this.draw()
  }
  openTimelineEditor() {
    this.active = new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["TimelineEditor"](this.tracks, this);
    this.draw();
  }
  openSequenceEditor(sequence, channelNr) {
    this.active = new _sequence_editor___WEBPACK_IMPORTED_MODULE_4__["SequenceEditor"](this, sequence, channelNr, this.openTimelineEditor.bind(this))
    this.draw();
  }
  openRegisterSequenceEditor(sequence, register) {
    this.active = new _sequence_editor___WEBPACK_IMPORTED_MODULE_4__["RegisterSequenceEditor"](this, sequence, register, this.openTimelineEditor.bind(this))
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
    var body = document.getElementsByTagName('body')[0];
    this.canvas.width = windowWidth;
    this.canvas.height = windowHeight - bound.top;
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

/***/ "./src/model/channel.js":
/*!******************************!*\
  !*** ./src/model/channel.js ***!
  \******************************/
/*! exports provided: Channel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Channel", function() { return Channel; });
class Channel {
  constructor(channelNr) {
    this.channelNr = channelNr;
    this.instrument = null;
    this.name = "Untitled " + this.channelNr;
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
  getCompileTarget() {
    return this.channelNr;
  }
  compile(sequenceTracks) {
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
    for (var tr of sequenceTracks) {
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
}


/***/ }),

/***/ "./src/model/index.js":
/*!****************************!*\
  !*** ./src/model/index.js ***!
  \****************************/
/*! exports provided: Patchable, Register, Channel, AUDIO_TYPE, FREQUENCY_TYPE, PANNING_TYPE, CLOCK_TYPE, TRIGGER_TYPE, INT_TYPE, FLOAT_TYPE, INT_ARRAY_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _patchable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./patchable.js */ "./src/model/patchable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Patchable", function() { return _patchable_js__WEBPACK_IMPORTED_MODULE_0__["Patchable"]; });

/* harmony import */ var _register_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register.js */ "./src/model/register.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Register", function() { return _register_js__WEBPACK_IMPORTED_MODULE_1__["Register"]; });

/* harmony import */ var _channel_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./channel.js */ "./src/model/channel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Channel", function() { return _channel_js__WEBPACK_IMPORTED_MODULE_2__["Channel"]; });

/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types.js */ "./src/model/types.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AUDIO_TYPE", function() { return _types_js__WEBPACK_IMPORTED_MODULE_3__["AUDIO_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FREQUENCY_TYPE", function() { return _types_js__WEBPACK_IMPORTED_MODULE_3__["FREQUENCY_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PANNING_TYPE", function() { return _types_js__WEBPACK_IMPORTED_MODULE_3__["PANNING_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CLOCK_TYPE", function() { return _types_js__WEBPACK_IMPORTED_MODULE_3__["CLOCK_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TRIGGER_TYPE", function() { return _types_js__WEBPACK_IMPORTED_MODULE_3__["TRIGGER_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INT_TYPE", function() { return _types_js__WEBPACK_IMPORTED_MODULE_3__["INT_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLOAT_TYPE", function() { return _types_js__WEBPACK_IMPORTED_MODULE_3__["FLOAT_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INT_ARRAY_TYPE", function() { return _types_js__WEBPACK_IMPORTED_MODULE_3__["INT_ARRAY_TYPE"]; });







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
  _addPatch(fromModule, toModule, fromSocket, toSocket, type) {
    if (Array.isArray(toModule)) {
      for (var to of toModule) {
        this._addPatch(fromModule, to, fromSocket, toSocket, type);
      }
      return;
    }
    var p = new _components___WEBPACK_IMPORTED_MODULE_0__["Patch"](fromModule, toModule, fromSocket, toSocket, type);
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
  addModule(unit) {
    var m = new _components___WEBPACK_IMPORTED_MODULE_0__["Module"](this, Math.random() * 800 + 100, Math.random() * 600, unit);
    this.modules.push(m);
    return this.modules.length - 1;
  }

}


/***/ }),

/***/ "./src/model/register.js":
/*!*******************************!*\
  !*** ./src/model/register.js ***!
  \*******************************/
/*! exports provided: Register */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Register", function() { return Register; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./src/model/types.js");


class Register {
  constructor(register, type) {
    this.register = register;
    this.type = type || "register";
    this.socketType = _types_js__WEBPACK_IMPORTED_MODULE_0__["INT_TYPE"];
    if (type == "array_register") {
      this.socketType = _types_js__WEBPACK_IMPORTED_MODULE_0__["INT_ARRAY_TYPE"];
    } else if (type == "float_register") {
      this.socketType = _types_js__WEBPACK_IMPORTED_MODULE_0__["FLOAT_TYPE"];
    }
  }
  getCompileTarget() {
    return this;
  }
  compile(sequenceTracks) {
    var sequences = [];
    for (var tr of sequenceTracks) {
      var trResult = tr.compile();
      if (trResult) {
        sequences.push(trResult);
      }
    }
    return {
      "sequences": sequences,
    };
  }
}


/***/ }),

/***/ "./src/model/types.js":
/*!****************************!*\
  !*** ./src/model/types.js ***!
  \****************************/
/*! exports provided: AUDIO_TYPE, FREQUENCY_TYPE, PANNING_TYPE, CLOCK_TYPE, TRIGGER_TYPE, INT_TYPE, FLOAT_TYPE, INT_ARRAY_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUDIO_TYPE", function() { return AUDIO_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FREQUENCY_TYPE", function() { return FREQUENCY_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PANNING_TYPE", function() { return PANNING_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLOCK_TYPE", function() { return CLOCK_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRIGGER_TYPE", function() { return TRIGGER_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INT_TYPE", function() { return INT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLOAT_TYPE", function() { return FLOAT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INT_ARRAY_TYPE", function() { return INT_ARRAY_TYPE; });
const AUDIO_TYPE = 1;
const FREQUENCY_TYPE = 2;
const PANNING_TYPE = 3;
const CLOCK_TYPE = 4;
const TRIGGER_TYPE = 5;
const INT_TYPE = 6;
const FLOAT_TYPE = 7;
const INT_ARRAY_TYPE = 8;


/***/ }),

/***/ "./src/sequence_editor/index.js":
/*!**************************************!*\
  !*** ./src/sequence_editor/index.js ***!
  \**************************************/
/*! exports provided: BaseSequenceEditor, SequenceEditor, RegisterSequenceEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseSequenceEditor", function() { return BaseSequenceEditor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SequenceEditor", function() { return SequenceEditor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterSequenceEditor", function() { return RegisterSequenceEditor; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/ */ "./src/components/index.js");
/* harmony import */ var _sequence_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sequence.js */ "./src/sequence_editor/sequence.js");
/* harmony import */ var _module_units___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module_units/ */ "./src/sequence_editor/module_units/index.js");





class BaseSequenceEditor extends _components___WEBPACK_IMPORTED_MODULE_0__["Editor"] {
  constructor(app, sequence, sequenceTarget, handleClose) {
    super(app, sequence, handleClose);
    this.app = app;
    if (!sequence) {
      sequence = new _sequence_js__WEBPACK_IMPORTED_MODULE_1__["Sequence"](sequenceTarget, [], []);
      var modules = [
        new _components___WEBPACK_IMPORTED_MODULE_0__["Module"](sequence, 30, 50, new _module_units___WEBPACK_IMPORTED_MODULE_2__["SequenceInput"]('input')), 
      ];
      sequence.modules = modules;
    }
    this.target = sequence;
  }
  addButtonDefinitions(buttonDefs) {
    var x = 0;
    var prev = null;
    var padding = 0;
    var groupPadding = 15;
    for (var def of buttonDefs) {
      var b = new _components___WEBPACK_IMPORTED_MODULE_0__["Button"](x, this.app.theme.padding, def.onclick.bind(this), def.label);
      b.colour = this.app.theme.colours[def.colour] || this.app.theme.colours.ModuleGenerator;
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
class SequenceEditor extends BaseSequenceEditor {
  constructor(app, sequence, channelNr, handleClose) {
    super(app, sequence, channelNr, handleClose);
    var buttonDefs = [
        {label: "𝅝", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](4))},
        {label: "𝅗𝅥", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](2))},
        {label: "♩", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](1))},
        {label: "♪", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](0.5))},
        {label: "𝅘𝅥𝅯", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](0.25))},
        {label: "𝅘𝅥𝅰", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](0.125))},
        {label: "PULS", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"]())},
        {label: "EUCL", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Euclidian"]())},
        {label: "OFFSET", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Offset"]())},

        {label: "NOTE", colour: 'ModuleOutput', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["PlayNote"](channelNr))},
        {label: "NOTES", colour: 'ModuleOutput', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["PlayNotes"](channelNr))},
        {label: "PAN", colour: 'ModuleOutput', onclick: () => this.handleAddGenerator("sine")},
        {label: "REV", colour: 'ModuleOutput', onclick: () => this.handleAddGenerator("sine")},
        {label: "LPF", colour: 'ModuleOutput', onclick: () => this.handleAddGenerator("sine")},
        {label: "HPF", colour: 'ModuleOutput', onclick: () => this.handleAddGenerator("sine")},

        {label: "SWEEP", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Range"]("sweep"))},
        {label: "CYCLE", colour: 'ModuleInt', onclick: () => this.handleAddGenerator("sine")},
        {label: "RANGE", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Range"]("range"))},
        {label: "FADE", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Range"]("fade in"))},
        {label: "RAND", colour: 'ModuleInt', onclick: () => this.handleAddGenerator("sine")},
        {label: "REG", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Register"]())},
        {label: "TRANS", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Transpose"]())},

        {label: "INDEX", colour: 'ModuleIntArray', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["IntArrayRegisterIndex"]())},
        {label: "REG", colour: 'ModuleIntArray', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["IntArrayRegister"]())},
        {label: "TRANS", colour: 'ModuleIntArray', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["TransposeIntArray"]())},
    ]
    this.addButtonDefinitions(buttonDefs);
  }
}

class RegisterSequenceEditor extends BaseSequenceEditor {
  constructor(app, sequence, register, handleClose) {
    super(app, sequence, register, handleClose);
    var buttonDefs = [
        {label: "𝅝", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](4))},
        {label: "𝅗𝅥", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](2))},
        {label: "♩", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](1))},
        {label: "♪", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](0.5))},
        {label: "𝅘𝅥𝅯", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](0.25))},
        {label: "𝅘𝅥𝅰", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"](0.125))},
        {label: "PULS", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Pulse"]())},
        {label: "EUCL", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Euclidian"]())},
        {label: "OFFSET", colour: 'ModulePulse', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Offset"]())},

        {label: "SWEEP", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Range"]("sweep"))},
        {label: "CYCLE", colour: 'ModuleInt', onclick: () => this.handleAddGenerator("sine")},
        {label: "RANGE", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Range"]("range"))},
        {label: "FADE", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Range"]("fade in"))},
        {label: "RAND", colour: 'ModuleInt', onclick: () => this.handleAddGenerator("sine")},
        {label: "REG", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Register"]())},
        {label: "TRANS", colour: 'ModuleInt', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["Transpose"]())},

        {label: "INDEX", colour: 'ModuleIntArray', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["IntArrayRegisterIndex"]())},
        {label: "REG", colour: 'ModuleIntArray', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["IntArrayRegister"]())},
        {label: "TRANS", colour: 'ModuleIntArray', onclick: () => this.handleAddUnit(() => new _module_units___WEBPACK_IMPORTED_MODULE_2__["TransposeIntArray"]())},
    ]
    this.addButtonDefinitions(buttonDefs);
  }
}


/***/ }),

/***/ "./src/sequence_editor/module_units/euclidian.js":
/*!*******************************************************!*\
  !*** ./src/sequence_editor/module_units/euclidian.js ***!
  \*******************************************************/
/*! exports provided: Euclidian */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Euclidian", function() { return Euclidian; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class Euclidian extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor() {
    super("euclidian");
    this.sockets = {
      "CLOCK": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "CLOCK", _model___WEBPACK_IMPORTED_MODULE_1__["CLOCK_TYPE"]),
      "TRIG": new _components___WEBPACK_IMPORTED_MODULE_0__["OutputSocket"](this.w - 29, this.h - 29, "TRIG", _model___WEBPACK_IMPORTED_MODULE_1__["TRIGGER_TYPE"]),
    }
    this.dials = {
      "pulses": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 59, "PULSES", 0.0, 10.0, 1.0),
      "over": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](79, 59, "OVER", 0.0, 10.0, 1.0),
      "duration": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](129, 59, "DUR", 0.0, 10.0, 1.0),
    }
    this.background = 'ModulePulse';
  }

  compile(connections) {
    var g = {"euclidian": {
        "pulses": parseFloat(this.dials.pulses.value.toFixed(0)),
        "over": parseFloat(this.dials.over.value.toFixed(0)),
        "duration": this.dials.over.value,
        "sequence": null,
      }
    };
    return ((g) => {
      return (seq) => {
        g.euclidian.sequence = seq;
        return g;
      }
   })(g);
  }
}


/***/ }),

/***/ "./src/sequence_editor/module_units/factory.js":
/*!*****************************************************!*\
  !*** ./src/sequence_editor/module_units/factory.js ***!
  \*****************************************************/
/*! exports provided: Factory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Factory", function() { return Factory; });
/* harmony import */ var _range_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./range.js */ "./src/sequence_editor/module_units/range.js");
/* harmony import */ var _register_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register.js */ "./src/sequence_editor/module_units/register.js");
/* harmony import */ var _register_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register_index.js */ "./src/sequence_editor/module_units/register_index.js");



class Factory {

  sequenceFromDefinition(sequenceDef) {

  }

  automationFromDefinition(automationDef) {
    var rangers = ["range", "fade_in", "sweep"];
    for (var ranger of rangers) {
      if (automationDef[ranger] !== undefined) {
        var def = automationDef[ranger];
        var a = new _range_js__WEBPACK_IMPORTED_MODULE_0__["Range"](ranger);
        a.dials.from.value = def.from || 0;
        a.dials.to.value = def.to || 127;
        a.dials.step.value = def.step || 1;
        return a;
      }
    }
    if (automationDef["register"] !== undefined) {
      var a = new _register_js__WEBPACK_IMPORTED_MODULE_1__["Register"]();
      a.dials.register.value = automationDef["register"] || 0;
      return a;
    }
    console.log("Unknown definition in factory:", automationDef);
  }
  intArrayAutomationFromDefinition(automationDef) {
    if (automationDef["register"] !== undefined) {
      var a = new _register_js__WEBPACK_IMPORTED_MODULE_1__["IntArrayRegister"]();
      a.dials.register.value = automationDef["register"] || 0;
      return a;
    } else if (automationDef["index"]) {
      var a = new _register_index_js__WEBPACK_IMPORTED_MODULE_2__["IntArrayRegisterIndex"]();
      a.dials.index.value = automationDef["value"] || 0;
      return a;
    }
    console.log("Unknown int array definition in factory:", automationDef);
  }
}


/***/ }),

/***/ "./src/sequence_editor/module_units/index.js":
/*!***************************************************!*\
  !*** ./src/sequence_editor/module_units/index.js ***!
  \***************************************************/
/*! exports provided: Pulse, PlayNote, PlayNotes, SequenceInput, Transpose, TransposeIntArray, Euclidian, Range, Register, IntArrayRegister, Factory, IntArrayRegisterIndex, Offset, RegisterOutput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pulse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pulse.js */ "./src/sequence_editor/module_units/pulse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pulse", function() { return _pulse_js__WEBPACK_IMPORTED_MODULE_0__["Pulse"]; });

/* harmony import */ var _play_note_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./play_note.js */ "./src/sequence_editor/module_units/play_note.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayNote", function() { return _play_note_js__WEBPACK_IMPORTED_MODULE_1__["PlayNote"]; });

/* harmony import */ var _play_notes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./play_notes.js */ "./src/sequence_editor/module_units/play_notes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayNotes", function() { return _play_notes_js__WEBPACK_IMPORTED_MODULE_2__["PlayNotes"]; });

/* harmony import */ var _sequence_input_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sequence_input.js */ "./src/sequence_editor/module_units/sequence_input.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SequenceInput", function() { return _sequence_input_js__WEBPACK_IMPORTED_MODULE_3__["SequenceInput"]; });

/* harmony import */ var _transpose_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transpose.js */ "./src/sequence_editor/module_units/transpose.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Transpose", function() { return _transpose_js__WEBPACK_IMPORTED_MODULE_4__["Transpose"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransposeIntArray", function() { return _transpose_js__WEBPACK_IMPORTED_MODULE_4__["TransposeIntArray"]; });

/* harmony import */ var _euclidian_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./euclidian.js */ "./src/sequence_editor/module_units/euclidian.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Euclidian", function() { return _euclidian_js__WEBPACK_IMPORTED_MODULE_5__["Euclidian"]; });

/* harmony import */ var _range_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./range.js */ "./src/sequence_editor/module_units/range.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return _range_js__WEBPACK_IMPORTED_MODULE_6__["Range"]; });

/* harmony import */ var _register_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./register.js */ "./src/sequence_editor/module_units/register.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Register", function() { return _register_js__WEBPACK_IMPORTED_MODULE_7__["Register"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IntArrayRegister", function() { return _register_js__WEBPACK_IMPORTED_MODULE_7__["IntArrayRegister"]; });

/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./factory.js */ "./src/sequence_editor/module_units/factory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Factory", function() { return _factory_js__WEBPACK_IMPORTED_MODULE_8__["Factory"]; });

/* harmony import */ var _register_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./register_index.js */ "./src/sequence_editor/module_units/register_index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IntArrayRegisterIndex", function() { return _register_index_js__WEBPACK_IMPORTED_MODULE_9__["IntArrayRegisterIndex"]; });

/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./offset.js */ "./src/sequence_editor/module_units/offset.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Offset", function() { return _offset_js__WEBPACK_IMPORTED_MODULE_10__["Offset"]; });

/* harmony import */ var _register_output_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./register_output.js */ "./src/sequence_editor/module_units/register_output.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RegisterOutput", function() { return _register_output_js__WEBPACK_IMPORTED_MODULE_11__["RegisterOutput"]; });















/***/ }),

/***/ "./src/sequence_editor/module_units/offset.js":
/*!****************************************************!*\
  !*** ./src/sequence_editor/module_units/offset.js ***!
  \****************************************************/
/*! exports provided: Offset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Offset", function() { return Offset; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class Offset extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor() {
    super("offset");
    this.sockets = {
      "CLOCK": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "CLOCK", _model___WEBPACK_IMPORTED_MODULE_1__["CLOCK_TYPE"]),
      "OUT": new _components___WEBPACK_IMPORTED_MODULE_0__["OutputSocket"](this.w - 29, this.h - 29, "OUT", _model___WEBPACK_IMPORTED_MODULE_1__["CLOCK_TYPE"]),
    }
    this.dials = {
      "offset": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 59, "OFFSET", 0.0, 128.0, 1.0),
    }
    this.background = 'ModulePulse';
  }

  compile(connections) {
    var g = {"offset": {
        "offset": this.dials.offset.value,
      }
    };
    return ((g) => {
      return (seq) => {
        g.euclidian.sequence = seq;
        return g;
      }
   })(g);
  }
}


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
  constructor(channelNr) {
    super("play_note");
    this.channelNr = channelNr;
    this.sockets = {
      "TRIG": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "TRIG", _model___WEBPACK_IMPORTED_MODULE_1__["TRIGGER_TYPE"]),
      "NOTE": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](79, this.h - 29, "NOTE", _model___WEBPACK_IMPORTED_MODULE_1__["INT_TYPE"]),
      "VEL": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](129, this.h - 29, "VEL", _model___WEBPACK_IMPORTED_MODULE_1__["INT_TYPE"]),
    }
    this.dials = {
      "note": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 59, "NOTE", 0.0, 128.0, 1.0),
      "velocity": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](79, 59, "VEL", 0.0, 128.0, 90.0),
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
      g["play_note"]["note"] = parseFloat(this.dials["note"].value.toFixed(0));
    } else {
      g["play_note"]["auto_note"] = on[0];
    }
    var on = connections["VEL"];
    if (on.length === 0) {
      g["play_note"]["velocity"] = parseFloat(this.dials["velocity"].value.toFixed(0));
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

/***/ "./src/sequence_editor/module_units/play_notes.js":
/*!********************************************************!*\
  !*** ./src/sequence_editor/module_units/play_notes.js ***!
  \********************************************************/
/*! exports provided: PlayNotes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayNotes", function() { return PlayNotes; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class PlayNotes extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(channelNr) {
    super("play_notes");
    this.channelNr = channelNr;
    this.sockets = {
      "TRIG": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "TRIG", _model___WEBPACK_IMPORTED_MODULE_1__["TRIGGER_TYPE"]),
      "NOTES": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](79, this.h - 29, "NOTES", _model___WEBPACK_IMPORTED_MODULE_1__["INT_ARRAY_TYPE"]),
      "VEL": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](129, this.h - 29, "VEL", _model___WEBPACK_IMPORTED_MODULE_1__["INT_TYPE"]),
    }
    this.dials = {
      "velocity": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](79, 59, "VEL", 0.0, 128.0, 90.0),
      "duration": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](129, 59, "DUR", 0.0, 10.0, 1.0),
    }
    this.background = 'ModuleOutput';
  }

  compile(connections) {
    var g = {"play_notes": {
      "duration": this.dials["duration"].value,
      "channel": this.channelNr,
    }};
    var on = connections["NOTES"];
    if (on.length === 0) {
      return null;
    } else {
      g["play_notes"]["auto_notes"] = on[0];
    }
    var on = connections["VEL"];
    if (on.length === 0) {
      g["play_notes"]["velocity"] = parseFloat(this.dials["velocity"].value.toFixed(0));
    } else {
      g["play_notes"]["auto_velocity"] = on[0];
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
    var g = {"repeat": {
        "every": this.dials["every"].value,
      }
    };
    return ((g) => {
      return (seq) => {
        g.repeat.sequence = seq;
        return g;
      }
   })(g);
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

/***/ "./src/sequence_editor/module_units/register.js":
/*!******************************************************!*\
  !*** ./src/sequence_editor/module_units/register.js ***!
  \******************************************************/
/*! exports provided: Register, IntArrayRegister */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Register", function() { return Register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntArrayRegister", function() { return IntArrayRegister; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class BaseRegister extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(socketType) {
    super("register");
    this.sockets = {
      "OUT": new _components___WEBPACK_IMPORTED_MODULE_0__["OutputSocket"](this.w - 29, this.h - 29, "OUT", socketType),
    }
    this.dials = {
      "register": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 59, "VALUE", 0, 16, 0.0),
    }
    if (socketType == _model___WEBPACK_IMPORTED_MODULE_1__["INT_TYPE"]) {
      this.background = 'ModuleInt';
    } else {
      this.background = 'ModuleIntArray';
    }
  }

  compile(connections) {
    var g = {};
    g[this.type] = parseFloat(this.dials.register.value.toFixed(0));
    return g;
  }
}
class Register extends BaseRegister {
  constructor() {
    super(_model___WEBPACK_IMPORTED_MODULE_1__["INT_TYPE"]);
  }
}
class IntArrayRegister extends BaseRegister {
  constructor() {
    super(_model___WEBPACK_IMPORTED_MODULE_1__["INT_ARRAY_TYPE"]);
  }
}


/***/ }),

/***/ "./src/sequence_editor/module_units/register_index.js":
/*!************************************************************!*\
  !*** ./src/sequence_editor/module_units/register_index.js ***!
  \************************************************************/
/*! exports provided: IntArrayRegisterIndex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntArrayRegisterIndex", function() { return IntArrayRegisterIndex; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class BaseRegisterIndex extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(socketType) {
    super("index");
    this.sockets = {
      "IN": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "IN", socketType),
      "INDEX": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](79, this.h - 29, "INDEX", _model___WEBPACK_IMPORTED_MODULE_1__["INT_TYPE"]),
      "OUT": new _components___WEBPACK_IMPORTED_MODULE_0__["OutputSocket"](this.w - 29, this.h - 29, "OUT", socketType),
    }
    this.dials = {
      "index": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](79, 59, "INDEX", 0, 16, 0.0),
    }
    if (socketType == _model___WEBPACK_IMPORTED_MODULE_1__["INT_TYPE"]) {
      this.background = 'ModuleInt';
    } else {
      this.background = 'ModuleIntArray';
    }
  }

  compile(connections) {
    var g = {"index": {
        "value": parseFloat(this.dials.index.value.toFixed(0)),
      }
    };
    var autoValue = connections["INDEX"];
    if (autoValue) {
      if (autoValue.length === 1) {
        if (autoValue[0]) {
          g.index.auto_value = autoValue[0];
        } 
      }
    }
    var on = connections["IN"];
    if (!on) {
      return null;
    }
    if (on.length === 1) {
      if (!on[0]) {
        return null;
      }
      for (var key of Object.keys(on[0])) {
        g["index"][key] = on[0][key];
      }
    } else {
      console.log("inputs to index != 1");
      return null;
    }
    return g;
  }
}

class IntArrayRegisterIndex extends BaseRegisterIndex {
  constructor() {
    super(_model___WEBPACK_IMPORTED_MODULE_1__["INT_ARRAY_TYPE"]);
  }
}


/***/ }),

/***/ "./src/sequence_editor/module_units/register_output.js":
/*!*************************************************************!*\
  !*** ./src/sequence_editor/module_units/register_output.js ***!
  \*************************************************************/
/*! exports provided: RegisterOutput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterOutput", function() { return RegisterOutput; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");




class RegisterOutput extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(type, socketType, register) {
    super(type);
    this.sockets = {
      "TRIG": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "TRIG", _model___WEBPACK_IMPORTED_MODULE_1__["TRIGGER_TYPE"]),
      "VALUE": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](79, this.h - 29, "VALUE", socketType || _model___WEBPACK_IMPORTED_MODULE_1__["INT_TYPE"]),
    }
    this.register = register;
    this.dials = {}
    if (socketType != _model___WEBPACK_IMPORTED_MODULE_1__["INT_ARRAY_TYPE"]) {
      this.dials["value"] =  new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 59, "VALUE", 0.0, 128.0, 1.0);
    }
    this.background = 'ModuleOutput';
  }
  compile(connections) {
    var g = {};
    g[this.type] = {
      "register": this.register,
    }

    var val = connections["VALUE"];
    if (val.length == 0) {
      return [];
    } else if (val.length == 1) {
      g[this.type]["auto_value"] = val[0];
    } else {
      console.log("more than one input to register set");
      return []
    }

    var result = [];
    var on = connections["TRIG"];
    for (var o of on) {
      result.push(o(g))
    }
    return result;
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

/***/ "./src/sequence_editor/module_units/transpose.js":
/*!*******************************************************!*\
  !*** ./src/sequence_editor/module_units/transpose.js ***!
  \*******************************************************/
/*! exports provided: Transpose, TransposeIntArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transpose", function() { return Transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransposeIntArray", function() { return TransposeIntArray; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/ */ "./src/model/index.js");



class BaseTranspose extends _components___WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(socketType) {
    super("transpose");
    this.sockets = {
      "IN": new _components___WEBPACK_IMPORTED_MODULE_0__["InputSocket"](29, this.h - 29, "IN", socketType),
      "OUT": new _components___WEBPACK_IMPORTED_MODULE_0__["OutputSocket"](this.w - 29, this.h - 29, "OUT", socketType),
    }
    this.dials = {
      "transpose": new _components___WEBPACK_IMPORTED_MODULE_0__["Dial"](29, 59, "VALUE", -127.0, 127.0, 0.0),
    }
    if (socketType == _model___WEBPACK_IMPORTED_MODULE_1__["INT_TYPE"]) {
      this.background = 'ModuleInt';
    } else {
      this.background = 'ModuleIntArray';
    }
  }

  compile(connections) {
    var g = {};
    g[this.type] = {
      "value": parseFloat(this.dials.transpose.value.toFixed(0)),
    };
    var on = connections["IN"];
    if (!on) {
      return null;
    }
    if (on.length === 1) {
      if (!on[0]) {
        return null;
      }
      for (var key of Object.keys(on[0])) {
        g[this.type][key] = on[0][key];
      }
    } else {
      console.log("inputs to transpose != 1");
      return null;
    }
    return g;
  }
}
class Transpose extends BaseTranspose {
  constructor() {
    super(_model___WEBPACK_IMPORTED_MODULE_1__["INT_TYPE"]);
  }
}

class TransposeIntArray extends BaseTranspose {
  constructor() {
    super(_model___WEBPACK_IMPORTED_MODULE_1__["INT_ARRAY_TYPE"]);
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
/* harmony import */ var _module_units___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module_units/ */ "./src/sequence_editor/module_units/index.js");
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ */ "./src/components/index.js");





class Sequence extends _model___WEBPACK_IMPORTED_MODULE_0__["Patchable"] {
  constructor(target, modules, patches) {
    super(modules, patches);
    this.target = target || 1;
  }

  loadFromDefinition(sequenceDef) {

    this.modules = [
      new _components___WEBPACK_IMPORTED_MODULE_2__["Module"](this, 10, 40, new _module_units___WEBPACK_IMPORTED_MODULE_1__["SequenceInput"]('input')), 
    ];
    this.patches = [];

    if (!sequenceDef) {
      return;
    }
    this.loadSequence(sequenceDef, 0);
  }

  compile() {
    var queue = [];
    var seen = {};
    var dependencies = [];
    var outputNodes = {
        "play_note": true,
        "play_notes": true,
        "register": true,
        "float_register": true,
        "array_register": true,
    };

    for (var i = 0; i < this.modules.length; i++) {
      var m = this.modules[i];
      if (outputNodes[m.unit.type]) {
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
        if (p.to === q && modSockets[p.toSocket] && modSockets[p.toSocket].isInput) {
          if (!seen[p.from]) {
            queue.push(p.from);
          }
        } else if (p.from === q && modSockets[p.fromSocket] && modSockets[p.fromSocket].isInput) {
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
      if (unit.type == "play_note" || unit.type == "play_notes" || unit instanceof _module_units___WEBPACK_IMPORTED_MODULE_1__["RegisterOutput"]) {
        for (var o of unit.compile(connections)) {
          result.push(o);
        }
      } else {
        var g = unit.compile(connections);
        sequences[ix] = g;
      }
    }
    if (result.length === 0) {
      return null;
    } else if (result.length === 1) {
      return result[0];
    } else {
      return {
        "combine": result,
      };
    }
  }

  parseDuration(duration) {
    if (typeof duration == 'number') {
      return duration;
    }
    var granularity = 64;
    if (duration == "Thirtysecond") {
      return 0.125;
    } else if (duration == "Sixteenth") {
      return 0.25;
    } else if (duration == "Eight") {
      return 0.5;
    } else if (duration == "Quarter") {
      return 1;
    } else if (duration == "Half") {
      return 2;
    } else if (duration == "Whole") {
      return 4;
    }
  }

  loadSequence(sequenceDef, input) {
    if (sequenceDef["before"]) { // we filter out before, because this is handled in the timeline
      return this.loadSequence(sequenceDef["before"]["sequence"], input);
    } else if (sequenceDef["after"]) { // we filter out after, because this is handled in the timeline
      return this.loadSequence(sequenceDef["after"]["sequence"], input);
    } else if (sequenceDef["play_note"]) {
      var def = sequenceDef["play_note"];
      var g = new _module_units___WEBPACK_IMPORTED_MODULE_1__["PlayNote"](this.target);
      g.dials.note.value = def.note || 1.0;
      g.dials.velocity.value = def.velocity || 1.0;
      g.dials.duration.value = this.parseDuration(def.duration) || 1.0;
      var ix = this.addModule(g);
      if (def["auto_velocity"]) {
        var vIx = this.loadAutomation(def["auto_velocity"]);
        if (vIx !== null) {
          this._addPatch(ix, vIx, "VEL", "OUT", _model___WEBPACK_IMPORTED_MODULE_0__["INT_TYPE"]);
        }
      } 
      if (def["auto_note"]) {
        var vIx = this.loadAutomation(def["auto_note"]);
        if (vIx !== null) {
          this._addPatch(ix, vIx, "NOTE", "OUT", _model___WEBPACK_IMPORTED_MODULE_0__["INT_TYPE"]);
        }
      }
      if (def["every"]) {
        var pulseIx = this.addModule(new _module_units___WEBPACK_IMPORTED_MODULE_1__["Pulse"](this.parseDuration(def["every"])));
        this._addPatch(input, pulseIx, "CLOCK", "CLOCK", _model___WEBPACK_IMPORTED_MODULE_0__["CLOCK_TYPE"]);
        this._addPatch(ix, pulseIx, "TRIG", "TRIG", _model___WEBPACK_IMPORTED_MODULE_0__["TRIGGER_TYPE"]);
      }
      return ix;
    } else if (sequenceDef["combine"]) {
      var seqs = [];
      for (var iDef of sequenceDef["combine"]) {
        var ix = this.loadSequence(iDef, input);
        if (ix) {
          seqs.push(ix);
        }
      }
      return seqs;
    } else if (sequenceDef["play_notes"]) {
      var def = sequenceDef["play_notes"];
      var g = new _module_units___WEBPACK_IMPORTED_MODULE_1__["PlayNotes"](this.target);
      var ix = this.addModule(g);

      if (def["auto_velocity"]) {
        var vIx = this.loadAutomation(def["auto_velocity"]);
        if (vIx !== null) {
          this._addPatch(ix, vIx, "VEL", "OUT", _model___WEBPACK_IMPORTED_MODULE_0__["INT_TYPE"]);
        }
      } 
      if (def["auto_notes"]) {
        var vIx = this.loadIntArrayAutomation(def["auto_notes"]);
        if (vIx !== null) {
          this._addPatch(ix, vIx, "NOTES", "OUT", _model___WEBPACK_IMPORTED_MODULE_0__["INT_ARRAY_TYPE"]);
        }
      }
      if (def["every"]) {
        var pulseIx = this.addModule(new _module_units___WEBPACK_IMPORTED_MODULE_1__["Pulse"](this.parseDuration(def["every"])));
        this._addPatch(input, pulseIx, "CLOCK", "CLOCK", _model___WEBPACK_IMPORTED_MODULE_0__["CLOCK_TYPE"]);
        this._addPatch(ix, pulseIx, "TRIG", "TRIG", _model___WEBPACK_IMPORTED_MODULE_0__["TRIGGER_TYPE"]);
      }
      return ix;
    } else if (sequenceDef["repeat"]) {
      var def = sequenceDef["repeat"];
      var g = new _module_units___WEBPACK_IMPORTED_MODULE_1__["Pulse"](this.parseDuration(def.every));
      var ix = this.addModule(g);
      var aIx = this.loadSequence(def.sequence);
      if (aIx != null) {
        this._addPatch(ix, aIx, "TRIG", "TRIG", _model___WEBPACK_IMPORTED_MODULE_0__["TRIGGER_TYPE"]);
      }
      this._addPatch(input, ix, "CLOCK", "CLOCK", _model___WEBPACK_IMPORTED_MODULE_0__["CLOCK_TYPE"]);
      return ix;
    } else if (sequenceDef["offset"]) {
      // TODO fix?
      console.log("WATCH OUT FOR offset", sequenceDef["offset"]);
      var def = sequenceDef["offset"];
      var g = new _module_units___WEBPACK_IMPORTED_MODULE_1__["Offset"]();
      g.dials.offset.value = def.offset || 0;
      var ix = this.addModule(g);
      var aIx = this.loadSequence(def.sequence);
      if (aIx != null) {
        this._addPatch(ix, aIx, "OUT", "CLOCK", _model___WEBPACK_IMPORTED_MODULE_0__["CLOCK_TYPE"]);
      }
      this._addPatch(input, ix, "CLOCK", "CLOCK", _model___WEBPACK_IMPORTED_MODULE_0__["CLOCK_TYPE"]);
      return ix;
    } else if (sequenceDef["euclidian"]) {
      var def = sequenceDef["euclidian"];
      var g = new _module_units___WEBPACK_IMPORTED_MODULE_1__["Euclidian"]();
      g.dials.pulses.value = def.pulses || 1;
      g.dials.over.value = def.over || 1;
      var ix = this.addModule(g);
      var aIx = this.loadSequence(def.sequence);
      this._addPatch(ix, aIx, "TRIG", "TRIG", _model___WEBPACK_IMPORTED_MODULE_0__["TRIGGER_TYPE"]);
      this._addPatch(input, ix, "CLOCK", "CLOCK", _model___WEBPACK_IMPORTED_MODULE_0__["CLOCK_TYPE"]);
      return ix;
    } else if (sequenceDef["array_register"]) {
      var def = sequenceDef.array_register;
      var g = new _module_units___WEBPACK_IMPORTED_MODULE_1__["RegisterOutput"]("array_register", _model___WEBPACK_IMPORTED_MODULE_0__["INT_ARRAY_TYPE"], def.register);
      var ix = this.addModule(g);
      if (def["auto_value"]) {
        var aIx = this.loadIntArrayAutomation(def.auto_value);
        if (aIx != null) {
          this._addPatch(ix, aIx, "VALUE", "OUT", _model___WEBPACK_IMPORTED_MODULE_0__["INT_ARRAY_TYPE"]);
        }
      }
      return ix;
    } else if (sequenceDef["register"]) {
      var def = sequenceDef.register;
      var g = new _module_units___WEBPACK_IMPORTED_MODULE_1__["RegisterOutput"]("register", _model___WEBPACK_IMPORTED_MODULE_0__["INT_TYPE"], def.register);
      g.dials.value.value = def.value || 0;
      var ix = this.addModule(g);
      if (def["auto_value"]) {
        var aIx = this.loadAutomation(def.auto_value);
        if (aIx != null) {
          this._addPatch(ix, aIx, "VALUE", "OUT", _model___WEBPACK_IMPORTED_MODULE_0__["INT_TYPE"]);
        }
      }
      return ix;
    } else if (sequenceDef["panning"]) {
      console.log("Unsupported sequence def", sequenceDef);
      return null;
    } else {
      console.log("Unsupported sequence def", sequenceDef);
      return null;
    }
  }

  loadAutomation(automationDef) {
    //console.log("Loading automation", automationDef);
    if (automationDef["back_and_forth"]) {
      console.log("Unsupported automation def", automationDef);
      return null;
    } else if (automationDef["cycle"]) {
      console.log("Unsupported automation def", automationDef);
      return null;
    } else if (automationDef["random"]) {
      console.log("Unsupported automation def", automationDef);
      return null;
    } else if (automationDef["fade_in"] !== undefined
            || automationDef["range"] !== undefined
            || automationDef["sweep"] !== undefined
            || automationDef["register"] !== undefined) {
      var a = new _module_units___WEBPACK_IMPORTED_MODULE_1__["Factory"]().automationFromDefinition(automationDef);
      return this.addModule(a);
    } else if (automationDef["transpose"]) {
      var a = new _module_units___WEBPACK_IMPORTED_MODULE_1__["Transpose"]();
      a.dials.transpose.value = automationDef["transpose"].value;
      var ix = this.addModule(a);
      var aIx = this.loadAutomation(automationDef["transpose"]);
      if (aIx != null) {
        this._addPatch(ix, aIx, "IN", "OUT", _model___WEBPACK_IMPORTED_MODULE_0__["INT_TYPE"]);
      }
      return ix;
    } else {
      console.log("Unsupported automation def", automationDef);
      return null;
    }
  }

  loadIntArrayAutomation(automationDef) {
    if (automationDef["transpose"]) {
      var a = new _module_units___WEBPACK_IMPORTED_MODULE_1__["TransposeIntArray"]();
      a.dials.transpose.value = automationDef["transpose"].value;
      var ix = this.addModule(a);
      var aIx = this.loadIntArrayAutomation(automationDef["transpose"]);
      if (aIx != null) {
        this._addPatch(ix, aIx, "IN", "OUT", _model___WEBPACK_IMPORTED_MODULE_0__["INT_ARRAY_TYPE"]);
      }
      return ix;
    } else if (automationDef["register"] !== undefined) {
      var a = new _module_units___WEBPACK_IMPORTED_MODULE_1__["Factory"]().intArrayAutomationFromDefinition(automationDef);
      return this.addModule(a);
    } else if (automationDef["index"] !== undefined) {
      var a = new _module_units___WEBPACK_IMPORTED_MODULE_1__["Factory"]().intArrayAutomationFromDefinition(automationDef);
      var ix = this.addModule(a);
      var aIx = this.loadIntArrayAutomation(automationDef["index"]);
      if (aIx != null) {
        this._addPatch(ix, aIx, "IN", "OUT", _model___WEBPACK_IMPORTED_MODULE_0__["INT_ARRAY_TYPE"]);
      }
      if (automationDef["index"]["auto_value"]) {
        aIx = this.loadAutomation(automationDef["index"]["auto_value"]);
        if (!aIx != null) {
          this._addPatch(ix, aIx, "INDEX", "OUT", _model___WEBPACK_IMPORTED_MODULE_0__["INT_TYPE"]);
        }
      }
      return ix;
    } else {
      console.log("Unsupported integer array automation def", automationDef);
      return null;
    }
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
    socketColours[_model___WEBPACK_IMPORTED_MODULE_0__["INT_ARRAY_TYPE"]] = 'rgb(255, 40, 40)';
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
      ModuleFloat: '#f9f',
      ModuleIntArray: '#f99',
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

/***/ "./src/timeline_editor/channel_sidebar.js":
/*!************************************************!*\
  !*** ./src/timeline_editor/channel_sidebar.js ***!
  \************************************************/
/*! exports provided: ChannelSideBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChannelSideBar", function() { return ChannelSideBar; });
class ChannelSideBar {
  constructor(channel, app, padding, panelWidth, height) {
    this.channel = channel;
    this.app = app;
    this.padding = padding;
    this.panelWidth = panelWidth;
    this.height = height;
  }

  draw(app, colorOffset) {
    app.ctx.fillStyle = 'rgb(0, ' + (200 - colorOffset) + ', 0)';
    app.ctx.strokeStyle = 'rgb(40, 40, 40, 1.0)';
    app.ctx.fillRect(this.padding, this.padding, this.panelWidth, this.height);
    app.ctx.strokeRect(this.padding, this.padding, this.panelWidth, this.height);

    app.ctx.fillStyle = 'rgb(255, 255, 255)';
    app.ctx.font = '10px sans-serif';
    app.ctx.fillText(this.channel.name, this.padding + 3, this.padding + 11);
  }

  handleClick() {
    this.app.openInstrumentEditor(this.channel.instrument);
  }

  handleMouseDown(app, x, y) {
    var path = new Path2D();
    path.rect(0, 0, this.panelWidth, this.height + this.padding * 2);
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
/*! exports provided: ChannelTrack, RegisterTrack, TimelineEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineEditor", function() { return TimelineEditor; });
/* harmony import */ var _track_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./track.js */ "./src/timeline_editor/track.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ChannelTrack", function() { return _track_js__WEBPACK_IMPORTED_MODULE_0__["ChannelTrack"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RegisterTrack", function() { return _track_js__WEBPACK_IMPORTED_MODULE_0__["RegisterTrack"]; });

/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/ */ "./src/components/index.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/ */ "./src/model/index.js");





class TimelineEditor {
  constructor(tracks, app) {
    this.tracks = tracks;
    this.app = app;
    var buttonDefs = [
        {label: "CHAN", colour: 'ModulePulse', onclick: this.addChannelTrack},
        {label: "REG", colour: 'ModuleInt', onclick: () => null},
        {label: "FLT", colour: 'ModuleFloat', onclick: () => null},
        {label: "ARR", colour: 'ModuleIntArray', onclick: () => null},
    ];
    this.buttons = [];
    this.addButtonDefinitions(buttonDefs);
  }
  addChannelTrack() {
    var nextChannel = 0;
    for (var tr of this.tracks) {
      if (tr instanceof _track_js__WEBPACK_IMPORTED_MODULE_0__["ChannelTrack"]) {
        if (tr.unit.channelNr >= nextChannel) {
          nextChannel = tr.unit.channelNr + 1;
        }
      }
    }
    var ch = new _model___WEBPACK_IMPORTED_MODULE_2__["Channel"](nextChannel);
    var track = new _track_js__WEBPACK_IMPORTED_MODULE_0__["ChannelTrack"](ch, this.app);
    this.app.tracks.push(track);
    this.app.draw()
  }
  addButtonDefinitions(buttonDefs) {
    var x = 0;
    var prev = null;
    var padding = 0;
    var groupPadding = 10;
    for (var def of buttonDefs) {
      var b = new _components___WEBPACK_IMPORTED_MODULE_1__["Button"](x, this.app.theme.padding, def.onclick.bind(this), def.label);
      b.colour = this.app.theme.colours[def.colour] || this.app.theme.colours.ModuleGenerator;
      this.buttons.push(b);
      if (prev && prev.colour != def.colour) {
        x += groupPadding;
        b.x += groupPadding;
      }
      x += b.w + padding;
      prev = def;
    }

  }
  handleMouseDown(app, x, y) {
    var i = 0;
    for (var b of this.buttons) {
      var v = b.handleMouseDown(app, x, y);
      if (v) {
        return v;
      }
    }
    for (var e of this.tracks) {
      var v = e.handleMouseDown(app, x, y - (25 + i * (e.height + e.padding * 2)));
      if (v) {
        return v;
      }
      i++;
    }
  }
  draw(app) {
    app.ctx.save();
    var i = 0;

    // Draw the buttons 
    for (var b of this.buttons) {
      b.draw(app);
    }

    // Draw the tracks
    for (var e of this.tracks) {
      app.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translate
      app.ctx.translate(0, 25 + i * (e.height + e.padding * 2));
      e.draw(app);
      i++;
    }
    app.ctx.restore();
  }
}


/***/ }),

/***/ "./src/timeline_editor/register_sidebar.js":
/*!*************************************************!*\
  !*** ./src/timeline_editor/register_sidebar.js ***!
  \*************************************************/
/*! exports provided: RegisterSideBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterSideBar", function() { return RegisterSideBar; });
class RegisterSideBar {
  constructor(register, app, padding, panelWidth, height) {
    this.register = register;
    this.app = app;
    this.padding = padding;
    this.panelWidth = panelWidth;
    this.height = height;
  }

  draw(app, colorOffset) {
    app.ctx.fillStyle = 'rgb(0, ' + (200 - colorOffset) + ', 0)';
    app.ctx.strokeStyle = 'rgb(40, 40, 40, 1.0)';
    app.ctx.fillRect(this.padding, this.padding, this.panelWidth, this.height);
    app.ctx.strokeRect(this.padding, this.padding, this.panelWidth, this.height);

    app.ctx.fillStyle = 'rgb(255, 255, 255)';
    app.ctx.font = '10px sans-serif';
    app.ctx.fillText(this.register.type + " " + this.register.register, this.padding + 3, this.padding + 11);
  }
  handleMouseDown(app, x, y) {
    return false;
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
/* harmony import */ var _sequence_editor_sequence_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sequence_editor/sequence.js */ "./src/sequence_editor/sequence.js");


class Range {
  constructor(start, stop) {
    this.start = start;
    this.stop = stop;
  }
}

class SequenceTrack {
  constructor(target, sequence_def) {
    this.sequence_def = null;
    this.sequence = new _sequence_editor_sequence_js__WEBPACK_IMPORTED_MODULE_0__["Sequence"](target)
    this.sequence.loadFromDefinition(sequence_def);
    this.ranges = [];
  }
  addRange(start, stop) {
    this.ranges.push(new Range(start ? start : 0, stop ? stop : 1000000));
  }
  compile() {
    if (this.sequence) {
      return this.sequence.compile();
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

/***/ "./src/timeline_editor/sequence_tracks.js":
/*!************************************************!*\
  !*** ./src/timeline_editor/sequence_tracks.js ***!
  \************************************************/
/*! exports provided: BaseSequenceTracks, ChannelSequenceTracks, RegisterSequenceTracks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseSequenceTracks", function() { return BaseSequenceTracks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChannelSequenceTracks", function() { return ChannelSequenceTracks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterSequenceTracks", function() { return RegisterSequenceTracks; });
/* harmony import */ var _sequence_track_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sequence_track.js */ "./src/timeline_editor/sequence_track.js");
/* harmony import */ var _model___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/ */ "./src/model/index.js");



class BaseSequenceTracks {

  constructor(unit, app, padding, panelWidth, height) {
    this.unit = unit;
    this.app = app;
    this.padding = padding;
    this.panelWidth = panelWidth;
    this.height = height;
    this.sequenceTracks = [new _sequence_track_js__WEBPACK_IMPORTED_MODULE_0__["SequenceTrack"]()];
  }

  handleClick() {
    if (this.unit instanceof _model___WEBPACK_IMPORTED_MODULE_1__["Channel"]) {
      this.app.openSequenceEditor(this.sequenceTracks[0].sequence, this.unit.getCompileTarget());
    } else if (this.unit instanceof _model___WEBPACK_IMPORTED_MODULE_1__["Register"]) {
      this.app.openRegisterSequenceEditor(this.sequenceTracks[0].sequence, this.unit);

    }
  }

  draw(app, colorOffset) {
    var height = this.height;
    var padding = this.padding;
    var panelWidth = this.panelWidth;
    var trackWidth = app.canvas.width - panelWidth - padding * 2;

    app.ctx.fillStyle = 'rgb(255, ' + (200 - colorOffset) + ', 0)';
    app.ctx.strokeStyle = 'rgb(40, 40, 40, 1.0)';
    app.ctx.fillRect(padding + panelWidth, padding, trackWidth, height);
    app.ctx.strokeRect(padding + panelWidth, padding, trackWidth, height);

    var trackHeight = height / this.sequenceTracks.length;
    for (var i = 0; i < this.sequenceTracks.length - 1; i++) {
      app.ctx.strokeRect(padding + panelWidth, padding + i * trackHeight, trackWidth, trackHeight);
    }
    for (var i = 0; i < this.sequenceTracks.length; i++) {
      var s = this.sequenceTracks[i];
      s.draw(app, padding + panelWidth, padding + i * trackHeight, trackWidth, trackHeight);
    }

    var showBars = 4;
    var pointsInRange = showBars * 4;
    var scaling = trackWidth / pointsInRange;
    var barWidth = 4 * scaling;
    app.ctx.fillStyle = 'rgb(40, 40, 40)';
    app.ctx.font = '10px mono';
    for (var i = 0; i < showBars; i++) {
      app.ctx.fillText(i + 1, padding + panelWidth + 3 + i * barWidth, padding + height - 3);
    }
  }
  handleMouseDown(app, x, y) {
    var path = new Path2D();
    var width = app.canvas.width - this.padding * 2;
    path.rect(this.panelWidth, 0, width, this.height + this.padding * 2);
    if (app.ctx.isPointInPath(path, x, y)) {
      return this;
    }
    return false;
  }
  compile() {
    return this.unit.compile(this.sequenceTracks);
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
      var track = new _sequence_track_js__WEBPACK_IMPORTED_MODULE_0__["SequenceTrack"](this.unit.getCompileTarget(), s);
      track.addRange(segment.after, segment.before);
      this.sequenceTracks.push(track);
    }
  }
}

class ChannelSequenceTracks extends BaseSequenceTracks {
  constructor(channel, app, padding, panelWidth, height) {
    super(channel, app, padding, panelWidth, height);
  }
}
class RegisterSequenceTracks extends BaseSequenceTracks {
  constructor(register, app, padding, panelWidth, height) {
    super(register, app, padding, panelWidth, height);
  }
}


/***/ }),

/***/ "./src/timeline_editor/track.js":
/*!**************************************!*\
  !*** ./src/timeline_editor/track.js ***!
  \**************************************/
/*! exports provided: BaseTrack, ChannelTrack, RegisterTrack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseTrack", function() { return BaseTrack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChannelTrack", function() { return ChannelTrack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterTrack", function() { return RegisterTrack; });
/* harmony import */ var _channel_sidebar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./channel_sidebar.js */ "./src/timeline_editor/channel_sidebar.js");
/* harmony import */ var _register_sidebar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register_sidebar.js */ "./src/timeline_editor/register_sidebar.js");
/* harmony import */ var _sequence_tracks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sequence_tracks.js */ "./src/timeline_editor/sequence_tracks.js");




class BaseTrack {
  constructor(unit) {
    this.unit = unit;
    this.padding = 0;
    this.height = 75;
    this.panelWidth = 90;

    this.sideBar = null;
    this.sequenceTracks = null;
  }

  draw(app) {
    var colorOffset = '#ddd'; 
    this.sideBar.draw(app, colorOffset);
    this.sequenceTracks.draw(app, colorOffset);
  }

  handleMouseDown(app, x, y) {
    if (this.sideBar.handleMouseDown(app, x, y)) {
      return this.sideBar;
    } else if (this.sequenceTracks.handleMouseDown(app, x, y)) {
      return this.sequenceTracks;
    } 
    return false;
  }
  initialiseSequenceTracks(defs) {
    this.sequenceTracks.initialiseSequenceTracks(defs);
  }
  compile() {
    return this.sequenceTracks.compile();
  }
}
class ChannelTrack extends BaseTrack {
  constructor(channel, app) {
    super(channel);
    this.sideBar = new _channel_sidebar_js__WEBPACK_IMPORTED_MODULE_0__["ChannelSideBar"](channel, app, this.padding, this.panelWidth, this.height);
    this.sequenceTracks = new _sequence_tracks_js__WEBPACK_IMPORTED_MODULE_2__["ChannelSequenceTracks"](channel, app, this.padding, this.panelWidth, this.height);
  }
}
class RegisterTrack extends BaseTrack {
  constructor(register, app) {
    super(register);
    this.sideBar = new _register_sidebar_js__WEBPACK_IMPORTED_MODULE_1__["RegisterSideBar"](register, app, this.padding, this.panelWidth, this.height);
    this.sequenceTracks = new _sequence_tracks_js__WEBPACK_IMPORTED_MODULE_2__["RegisterSequenceTracks"](register, app, this.padding, this.panelWidth, this.height);
  }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9idXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21vZHVsZV91bml0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhdGNoLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL2luc3RydW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9jaGFubmVsX2lucHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvY2hhbm5lbF9vdXRwdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9mYWN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9wYW5uaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvc2FtcGxlX2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvbW9kdWxlX3VuaXRzL3RyYW5zcG9zZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL3BhdGNoYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvcmVnaXN0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL3R5cGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcXVlbmNlX2VkaXRvci9tb2R1bGVfdW5pdHMvZXVjbGlkaWFuLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL2ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcXVlbmNlX2VkaXRvci9tb2R1bGVfdW5pdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcXVlbmNlX2VkaXRvci9tb2R1bGVfdW5pdHMvb2Zmc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL3BsYXlfbm90ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy9wbGF5X25vdGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL3B1bHNlLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL3JhbmdlLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL3JlZ2lzdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL3JlZ2lzdGVyX2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL3JlZ2lzdGVyX291dHB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy9zZXF1ZW5jZV9pbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy90cmFuc3Bvc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcXVlbmNlX2VkaXRvci9zZXF1ZW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGhlbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbWVsaW5lX2VkaXRvci9jaGFubmVsX3NpZGViYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbWVsaW5lX2VkaXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGltZWxpbmVfZWRpdG9yL3JlZ2lzdGVyX3NpZGViYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbWVsaW5lX2VkaXRvci9zZXF1ZW5jZV90cmFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGltZWxpbmVfZWRpdG9yL3NlcXVlbmNlX3RyYWNrcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGltZWxpbmVfZWRpdG9yL3RyYWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGdFQUFhO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBc0Q7QUFDRTtBQUM2Qjs7QUFFOUU7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSx1QkFBdUIsa0VBQWM7QUFDckMsOEJBQThCLHlFQUFxQjtBQUNuRDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsdUJBQXVCLG9FQUFlO0FBQ3RDLDhCQUE4QiwwRUFBc0I7QUFDcEQ7QUFDQSIsImZpbGUiOiJibGVlcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4uanNcIik7XG4iLCJcbmNvbnN0IFRlc3RNZXNzYWdlID0gXCJ0ZXN0XCI7XG5jb25zdCBTdGF0dXNNZXNzYWdlID0gXCJzdGF0dXNcIjtcbmNvbnN0IENoYW5uZWxEZWZNZXNzYWdlID0gXCJjaGFubmVsX2RlZlwiO1xuY29uc3QgU2VxdWVuY2VyRGVmTWVzc2FnZSA9IFwic2VxdWVuY2VyX2RlZlwiO1xuY29uc3QgU2V0U2VxdWVuY2VyRGVmTWVzc2FnZSA9IFwic2V0X3NlcXVlbmNlcl9kZWZcIjtcblxuZXhwb3J0IGNsYXNzIEFQSSB7XG5cbiAgY29uc3RydWN0b3IoYXBwKSB7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5zb2NrZXQgPSBudWxsO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdmFyIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoXCJ3czovL2xvY2FsaG9zdDoxMDAwMC93c1wiKTtcbiAgICBzb2NrZXQub25vcGVuID0gKChlKSA9PiB7XG4gICAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcbiAgICAgIHRoaXMuc2VuZERhdGEoQ2hhbm5lbERlZk1lc3NhZ2UsIFwidGVzdFwiKTtcbiAgICB9KS5iaW5kKHRoaXMpXG4gICAgc29ja2V0Lm9ubWVzc2FnZSA9IHRoaXMuaGFuZGxlTWVzc2FnZVJlY2VpdmVkLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVNZXNzYWdlUmVjZWl2ZWQobWVzc2FnZSkge1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpXG4gICAgdmFyIG1zZyA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcbiAgICBpZiAobXNnLnR5cGUgPT09IENoYW5uZWxEZWZNZXNzYWdlKSB7XG4gICAgICB0aGlzLmFwcC5pbml0aWFsaXNlQ2hhbm5lbHMobXNnLmRhdGEpO1xuICAgIH0gZWxzZSBpZiAobXNnLnR5cGUgPT09IFNlcXVlbmNlckRlZk1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYXBwLmluaXRpYWxpc2VTZXF1ZW5jZVRyYWNrcyhtc2cuZGF0YSk7XG4gICAgfVxuICB9XG4gIHJlcXVlc3RTZXF1ZW5jZXJEZWYoKSB7XG4gICAgdGhpcy5zZW5kRGF0YShTZXF1ZW5jZXJEZWZNZXNzYWdlLCBudWxsKTtcbiAgfVxuICBzZXRTZXF1ZW5jZXJEZWYoZGVmKSB7XG4gICAgdGhpcy5zZW5kRGF0YShTZXRTZXF1ZW5jZXJEZWZNZXNzYWdlLCBKU09OLnN0cmluZ2lmeShkZWYpKTtcbiAgfVxuXG4gIHNlbmREYXRhKHR5cGUsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5zZW5kSlNPTih7XCJ0eXBlXCI6IHR5cGUsIFwiZGF0YVwiOiBkYXRhfSk7XG4gIH1cblxuICBzZW5kSlNPTihvYmopIHtcbiAgICByZXR1cm4gdGhpcy5zZW5kTWVzc2FnZShKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBpZiAodGhpcy5zb2NrZXQpIHtcbiAgICAgIHRoaXMuc29ja2V0LnNlbmQobWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbn1cbiIsIlxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIG9uQ2xpY2ssIGxhYmVsKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMudyA9IDI1O1xuICAgIHRoaXMuaCA9IDI1O1xuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSBvbkNsaWNrO1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLmNvbG91ciA9IG51bGw7XG4gICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgIHRoaXMudyA9IDM1O1xuICAgIH1cbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIHZhciB3ID0gdGhpcy53O1xuICAgIHZhciBoID0gdGhpcy5oO1xuICAgIGFwcC5jdHguc2F2ZSgpO1xuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuQnV0dG9uO1xuICAgIGlmICh0aGlzLmNvbG91cikge1xuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG91cjtcbiAgICB9XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLk91dGxpbmVDb2xvdXI7XG4gICAgYXBwLmN0eC5saW5lV2lkdGggPSAxO1xuICAgIGFwcC5jdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHcsIGgpO1xuICAgIGFwcC5jdHguc3Ryb2tlUmVjdCh0aGlzLngsIHRoaXMueSwgdywgaCk7XG4gICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgIGFwcC5jdHguZm9udCA9ICcxMHB4IG1vbm8nO1xuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5CdXR0b25UZXh0O1xuICAgICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLmxhYmVsLCB0aGlzLnggKyB3IC8gMiwgdGhpcy55ICsgMTUpO1xuICAgIH1cbiAgICBhcHAuY3R4LnJlc3RvcmUoKTtcbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgaWYgKHggPj0gdGhpcy54ICYmIHggPD0gdGhpcy54ICsgdGhpcy53ICYmIHkgPj0gdGhpcy55ICYmIHkgPD0gdGhpcy55ICsgdGhpcy5oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENsb3NlQnV0dG9uIGV4dGVuZHMgQnV0dG9uIHtcbn1cbiIsImV4cG9ydCBjbGFzcyBEaWFsIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgbGFiZWwsIG1pbiwgbWF4LCBjdXJyZW50KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLnJhZGl1cyA9IDE1O1xuICAgIHRoaXMubWluID0gbWluO1xuICAgIHRoaXMubWF4ID0gbWF4O1xuICAgIHRoaXMudmFsdWUgPSBjdXJyZW50O1xuICB9XG4gIGRyYXcoYXBwKSB7XG5cbiAgICAvLyBEcmF3IGRpYWxcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLkRpYWw7XG4gICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcbiAgICBhcHAuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBhcHAuY3R4LmZpbGwoKTtcbiAgICBhcHAuY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgdmFyIHJhbmdlID0gdGhpcy5tYXggLSB0aGlzLm1pbjtcbiAgICB2YXIgdGF1ID0gMiAqIE1hdGguUElcbiAgICB2YXIgdmFsdWUgPSB0YXUgLSAodGF1ICogKHRoaXMudmFsdWUgLSB0aGlzLm1pbikgLyByYW5nZSlcbiAgICBhcHAuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHZhciBkeCA9IE1hdGguc2luKHZhbHVlKSAqIHRoaXMucmFkaXVzO1xuICAgIHZhciBkeSA9IE1hdGguY29zKHZhbHVlKSAqIHRoaXMucmFkaXVzO1xuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5EaWFsTGluZTtcbiAgICBhcHAuY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgYXBwLmN0eC5tb3ZlVG8odGhpcy54LCB0aGlzLnkpO1xuICAgIGFwcC5jdHgubGluZVRvKHRoaXMueCArIGR4LCB0aGlzLnkgKyBkeSk7XG4gICAgYXBwLmN0eC5zdHJva2UoKTtcbiAgICBhcHAuY3R4LmxpbmVXaWR0aCA9IDE7XG5cbiAgICAvLyBEcmF3IGxhYmVsXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVUZXh0O1xuICAgIGFwcC5jdHguZm9udCA9ICcxMHB4IG1vbm8nO1xuICAgIHZhciBjZW50ZXJYID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55IC0gdGhpcy5yYWRpdXMgLSAzO1xuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICBhcHAuY3R4LmZpbGxUZXh0KHRoaXMubGFiZWwsIGNlbnRlclgsIHkpO1xuXG4gICAgLy8gRHJhdyB2YWx1ZVxuICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy52YWx1ZS50b0ZpeGVkKDIpLCBjZW50ZXJYLCB0aGlzLnkgKyB0aGlzLnJhZGl1cyArIDEyKTtcbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgaWYgKHggPj0gdGhpcy54IC0gdGhpcy5yYWRpdXMgJiYgeCA8PSB0aGlzLnggKyB0aGlzLnJhZGl1cyAmJiB5ID49IHRoaXMueSAtIHRoaXMucmFkaXVzICYmIHkgPD0gdGhpcy5yYWRpdXMgKyB0aGlzLnkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuICBoYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4LCB5KSB7XG4gICAgZHggPSB4IC0gdGhpcy54O1xuICAgIGR5ID0geSAtIHRoaXMueTtcbiAgICB2YXIgc2luID0gZHkgLyBNYXRoLnNxcnQoZHkgKiBkeSArIGR4ICogZHgpXG4gICAgdmFyIHNjYWxlZENvcyA9IDEuMCAtIChzaW4gKyAxKSAvIDI7XG4gICAgdmFyIHJhbmdlID0gdGhpcy5tYXggLSB0aGlzLm1pbjtcbiAgICB0aGlzLnZhbHVlID0gcmFuZ2UgKiBzY2FsZWRDb3MgKyB0aGlzLm1pbjtcbiAgICBhcHAudXBsb2FkU2VxdWVuY2VyRGVmKCk7XG4gICAgYXBwLmRyYXcoKTtcbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBDbG9zZUJ1dHRvbiwgQnV0dG9uIH0gZnJvbSAnLi9idXR0b24uanMnO1xuaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnLi9tb2R1bGUuanMnO1xuXG5leHBvcnQgY2xhc3MgRWRpdG9yIHtcbiAgY29uc3RydWN0b3IoYXBwLCB0YXJnZXQsIGhhbmRsZUNsb3NlKSB7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5wYWRkaW5nID0gYXBwLnRoZW1lLnBhZGRpbmc7XG4gICAgdGhpcy5zY2FsZSA9IDEuMFxuICAgIHRoaXMuc2hvd0NvbXBpbGUgPSB0cnVlO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuYnV0dG9ucyA9IFtcbiAgICAgIG5ldyBDbG9zZUJ1dHRvbigxMCwgMTAsIGhhbmRsZUNsb3NlLCBcIlhcIiksXG4gICAgICBuZXcgQnV0dG9uKDEwLCAxMCwgdGhpcy5oYW5kbGVTaG93Q29tcGlsZS5iaW5kKHRoaXMpLCBcIkpTT05cIiksXG4gICAgICBuZXcgQnV0dG9uKDEwLCAxMCwgdGhpcy5oYW5kbGVab29tSW4uYmluZCh0aGlzKSwgXCIrXCIpLFxuICAgICAgbmV3IEJ1dHRvbigxMCwgMTAsIHRoaXMuaGFuZGxlWm9vbU91dC5iaW5kKHRoaXMpLCBcIi1cIiksXG4gICAgICBuZXcgQnV0dG9uKDEwLCAxMCwgdGhpcy5oYW5kbGVVcGxvYWQuYmluZCh0aGlzKSwgXCI+Pj5cIiksXG4gICAgXTtcbiAgfVxuICBoYW5kbGVBZGRVbml0KGNvbnN0cnVjdG9yKSB7XG4gICAgdmFyIGcgPSBjb25zdHJ1Y3RvcigpXG4gICAgdGhpcy50YXJnZXQubW9kdWxlcy5wdXNoKG5ldyBNb2R1bGUodGhpcy50YXJnZXQsIE1hdGgucmFuZG9tKCkgKiA3MDAsIE1hdGgucmFuZG9tKCkgKiA2MDAsIGcpKTtcbiAgICB0aGlzLmFwcC5kcmF3KCk7XG4gIH1cbiAgaGFuZGxlWm9vbUluKCkge1xuICAgIHRoaXMuc2NhbGUgKz0gLjFcbiAgICB0aGlzLmFwcC5kcmF3KCk7XG4gIH1cbiAgaGFuZGxlWm9vbU91dCgpIHtcbiAgICB0aGlzLnNjYWxlIC09IC4xO1xuICAgIHRoaXMuYXBwLmRyYXcoKTtcbiAgfVxuICBoYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4LCB5KSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQuaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZURyb3AoYXBwLCB4LCB5KSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQuaGFuZGxlRHJvcChhcHAsIHggLSB0aGlzLnBhZGRpbmcsIHkgLSB0aGlzLnBhZGRpbmcpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVTaG93Q29tcGlsZSgpIHtcbiAgICB0aGlzLnNob3dDb21waWxlID0gIXRoaXMuc2hvd0NvbXBpbGU7XG4gICAgdGhpcy5hcHAuZHJhdygpO1xuICB9XG4gIGhhbmRsZVVwbG9hZCgpIHtcbiAgICB0aGlzLmFwcC51cGxvYWRTZXF1ZW5jZXJEZWYoKTtcbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgZm9yICh2YXIgYiBvZiB0aGlzLmJ1dHRvbnMpIHtcbiAgICAgIHZhciB2ID0gYi5oYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KTtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHJldHVybiB2O1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBtIG9mIHRoaXMudGFyZ2V0Lm1vZHVsZXMpIHtcbiAgICAgIHZhciB2ID0gbS5oYW5kbGVNb3VzZURvd24oYXBwLCB4IC0gdGhpcy5wYWRkaW5nLCB5IC0gdGhpcy5wYWRkaW5nKTtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZHJhdyhhcHApIHtcbiAgICB2YXIgdyA9IGFwcC5jYW52YXMud2lkdGggLSAyICogdGhpcy5wYWRkaW5nO1xuICAgIHZhciBoID0gYXBwLmNhbnZhcy5oZWlnaHQgLSAyICogdGhpcy5wYWRkaW5nO1xuICAgIHRoaXMuYnV0dG9uc1swXS54ID0gdyAtIHRoaXMuYnV0dG9uc1swXS53ICsgdGhpcy5wYWRkaW5nO1xuICAgIHRoaXMuYnV0dG9uc1swXS55ID0gdGhpcy5wYWRkaW5nO1xuICAgIHRoaXMuYnV0dG9uc1sxXS54ID0gdyAtIHRoaXMuYnV0dG9uc1sxXS53ICsgdGhpcy5wYWRkaW5nO1xuICAgIHRoaXMuYnV0dG9uc1sxXS55ID0gdGhpcy5wYWRkaW5nICsgMjU7XG4gICAgdGhpcy5idXR0b25zWzJdLnggPSB3IC0gdGhpcy5idXR0b25zWzJdLncgKyB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5idXR0b25zWzJdLnkgPSB0aGlzLnBhZGRpbmcgKyA1MDtcbiAgICB0aGlzLmJ1dHRvbnNbM10ueCA9IHcgLSB0aGlzLmJ1dHRvbnNbM10udyArIHRoaXMucGFkZGluZztcbiAgICB0aGlzLmJ1dHRvbnNbM10ueSA9IHRoaXMucGFkZGluZyArIDc1O1xuICAgIHRoaXMuYnV0dG9uc1s0XS54ID0gdyAtIHRoaXMuYnV0dG9uc1s0XS53ICsgdGhpcy5wYWRkaW5nO1xuICAgIHRoaXMuYnV0dG9uc1s0XS55ID0gdGhpcy5wYWRkaW5nICsgMTAwO1xuICAgIGFwcC5jdHguc2F2ZSgpO1xuICAgIGFwcC5jdHgubGluZVdpZHRoID0gMTtcbiAgICBcbiAgICAvLyBEcmF3IHRoZSBiYWNrZ3JvdW5kXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5JbnN0cnVtZW50RWRpdG9yQmFja2dyb3VuZDtcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuT3V0bGluZUNvbG91cjtcbiAgICBhcHAuY3R4LmZpbGxSZWN0KHRoaXMucGFkZGluZywgdGhpcy5wYWRkaW5nLCB3LCBoKTtcblxuICAgIC8vIERyYXcgdGhlIGJ1dHRvbnMgXG4gICAgZm9yICh2YXIgYiBvZiB0aGlzLmJ1dHRvbnMpIHtcbiAgICAgIGIuZHJhdyhhcHApO1xuICAgIH1cblxuICAgIC8vIERyYXcgdGhlIGNvbXBpbGVkIGdlbmVyYXRvciBKU09OXG4gICAgaWYgKHRoaXMuc2hvd0NvbXBpbGUpIHtcbiAgICAgIHZhciB0eHQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnRhcmdldC5jb21waWxlKCksIG51bGwsIDIpO1xuICAgICAgdmFyIGxpbmVOciA9IDA7XG4gICAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZVRleHQ7XG4gICAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwic3RhcnRcIjtcbiAgICAgIGZvciAodmFyIGxpbmUgb2YgdHh0LnNwbGl0KFwiXFxuXCIpKSB7XG4gICAgICAgIGFwcC5jdHguZmlsbFRleHQobGluZSwgdyAtIDMwMCwgOTAgKyBsaW5lTnIgKiAxMik7XG4gICAgICAgIGxpbmVOcisrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERyYXcgdGhlIG1vZHVsZXNcbiAgICBmb3IgKHZhciBtIG9mIHRoaXMudGFyZ2V0Lm1vZHVsZXMpIHtcbiAgICAgIGFwcC5jdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApOyAvLyByZXNldCB0cmFuc2xhdGVcbiAgICAgIGFwcC5jdHguc2NhbGUodGhpcy5zY2FsZSwgdGhpcy5zY2FsZSk7XG4gICAgICBhcHAuY3R4LnRyYW5zbGF0ZSh0aGlzLnBhZGRpbmcsIHRoaXMucGFkZGluZyk7XG4gICAgICBtLmRyYXcoYXBwKTtcbiAgICB9XG4gICAgYXBwLmN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7IC8vIHJlc2V0IHRyYW5zbGF0ZVxuICAgIGFwcC5jdHguc2NhbGUodGhpcy5zY2FsZSwgdGhpcy5zY2FsZSk7XG5cblxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuUGF0Y2g7XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLlBhdGNoO1xuXG4gICAgLy8gRHJhdyB0aGUgcGF0Y2hlc1xuICAgIGZvciAodmFyIHAgb2YgdGhpcy50YXJnZXQucGF0Y2hlcykge1xuICAgICAgdmFyIGZyb21Nb2QgPSB0aGlzLnRhcmdldC5tb2R1bGVzW3AuZnJvbV07XG4gICAgICB2YXIgdG9Nb2QgPSB0aGlzLnRhcmdldC5tb2R1bGVzW3AudG9dO1xuICAgICAgdmFyIGZyb21Tb2NrZXQgPSBwLmdldEZyb21Tb2NrZXQoZnJvbU1vZCk7XG4gICAgICB2YXIgdG9Tb2NrZXQgPSBwLmdldFRvU29ja2V0KHRvTW9kKTtcbiAgICAgIHZhciBmcm9tWCA9IHRoaXMucGFkZGluZyArIGZyb21Nb2QueCArIGZyb21Tb2NrZXQueDtcbiAgICAgIHZhciBmcm9tWSA9IHRoaXMucGFkZGluZyArIGZyb21Nb2QueSArIGZyb21Tb2NrZXQueTtcbiAgICAgIHZhciB0b1ggPSB0aGlzLnBhZGRpbmcgKyB0b01vZC54ICsgdG9Tb2NrZXQueDtcbiAgICAgIHZhciB0b1kgPSB0aGlzLnBhZGRpbmcgKyB0b01vZC55ICsgdG9Tb2NrZXQueTtcbiAgICAgIHZhciBwb2ludE9mZnNldCA9IDcwO1xuXG4gICAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gcC5nZXRDb2xvcihhcHAudGhlbWUpO1xuICAgICAgYXBwLmN0eC5saW5lV2lkdGggPSA0O1xuICAgICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGFwcC5jdHgubW92ZVRvKGZyb21YLCBmcm9tWSk7XG4gICAgICBhcHAuY3R4LmJlemllckN1cnZlVG8oXG4gICAgICAgIGZyb21YLCBcbiAgICAgICAgZnJvbVkgKyBwb2ludE9mZnNldCwgXG4gICAgICAgIHRvWCwgXG4gICAgICAgIHRvWSArIHBvaW50T2Zmc2V0LCBcbiAgICAgICAgdG9YLCBcbiAgICAgICAgdG9ZKTtcbiAgICAgIGFwcC5jdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgYXBwLmN0eC5yZXN0b3JlKCk7XG4gIH1cbn1cbiIsImV4cG9ydCB7IERpYWwgfSBmcm9tICcuL2RpYWwuanMnO1xuZXhwb3J0IHsgU29ja2V0LCBJbnB1dFNvY2tldCwgT3V0cHV0U29ja2V0IH0gZnJvbSAnLi9zb2NrZXQuanMnO1xuZXhwb3J0IHsgQnV0dG9uLCBDbG9zZUJ1dHRvbiB9IGZyb20gJy4vYnV0dG9uLmpzJztcbmV4cG9ydCB7IFBhdGNoIH0gZnJvbSAnLi9wYXRjaC5qcyc7XG5leHBvcnQgeyBNb2R1bGUgfSBmcm9tICcuL21vZHVsZS5qcyc7XG5leHBvcnQgeyBNb2R1bGVVbml0IH0gZnJvbSAnLi9tb2R1bGVfdW5pdC5qcyc7XG5leHBvcnQgeyBFZGl0b3IgfSBmcm9tICcuL2VkaXRvci5qcyc7XG4iLCJpbXBvcnQgeyBTb2NrZXQgfSBmcm9tICcuL3NvY2tldC5qcyc7XG5pbXBvcnQgeyBEaWFsIH0gZnJvbSAnLi9kaWFsLmpzJztcblxuZXhwb3J0IGNsYXNzIE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHRhcmdldCwgeCwgeSwgdW5pdCkge1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnVuaXQgPSB1bml0O1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICB9XG4gIGRyYXcoYXBwKSB7XG4gICAgYXBwLmN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuICAgIHRoaXMudW5pdC5kcmF3KGFwcCk7XG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgIHZhciB2ID0gdGhpcy51bml0LmhhbmRsZU1vdXNlRG93bihhcHAsIHggLSB0aGlzLngsIHkgLSB0aGlzLnkpO1xuICAgIGlmICghdikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkID0gdjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBoYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4LCB5KSB7XG4gICAgdmFyIHYgPSB0aGlzLnNlbGVjdGVkO1xuICAgIGlmICh2IGluc3RhbmNlb2YgU29ja2V0KSB7XG4gICAgICB2LmhhbmRsZURyYWcoYXBwLCBkeCwgZHksIHgsIHkpO1xuICAgIH0gZWxzZSBpZiAodiBpbnN0YW5jZW9mIERpYWwpIHtcbiAgICAgIHYuaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCAtIHRoaXMueCwgeSAtIHRoaXMueSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueCArPSBkeDtcbiAgICAgIHRoaXMueSArPSBkeTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlRHJvcChhcHAsIHgsIHkpIHtcbiAgICB2YXIgdiA9IHRoaXMuc2VsZWN0ZWQ7XG4gICAgaWYgKHYgaW5zdGFuY2VvZiBTb2NrZXQpIHtcbiAgICAgIGZvciAodmFyIG1vZHVsZSBvZiB0aGlzLnRhcmdldC5tb2R1bGVzKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhtb2R1bGUudW5pdC5zb2NrZXRzKSkge1xuICAgICAgICAgIHZhciBzID0gbW9kdWxlLnVuaXQuc29ja2V0c1trZXldO1xuICAgICAgICAgIHZhciBzeCA9IHggLSBtb2R1bGUueDtcbiAgICAgICAgICB2YXIgc3kgPSB5IC0gbW9kdWxlLnk7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHMuaGFuZGxlTW91c2VEb3duKGFwcCwgc3gsIHN5KTtcbiAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5hZGRQYXRjaCh0aGlzLCBtb2R1bGUsIHYubGFiZWwsIHJlc3VsdC5sYWJlbCk7XG4gICAgICAgICAgICBhcHAuZHJhdygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLncgPSAxNTA7XG4gICAgdGhpcy5oID0gMTUwO1xuICAgIHRoaXMuc29ja2V0cyA9IHt9O1xuICAgIHRoaXMuZGlhbHMgPSB7fTtcbiAgICB0aGlzLmJhY2tncm91bmQgPSBcIlwiO1xuICB9XG4gIGRyYXcoYXBwKSB7XG4gICAgdmFyIHcgPSB0aGlzLnc7XG4gICAgdmFyIGggPSB0aGlzLmg7XG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vyc1t0aGlzLmJhY2tncm91bmRdO1xuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVPdXRsaW5lO1xuICAgIGFwcC5jdHguZmlsbFJlY3QoMCwgMCwgdywgaCk7XG4gICAgYXBwLmN0eC5zdHJva2VSZWN0KDAsIDAsIHcsIGgpO1xuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlVGV4dDtcbiAgICBhcHAuY3R4LmZvbnQgPSAnMTRweCBtb25vJztcbiAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLnR5cGUsIHcgLyAyLCAxNCk7XG4gICAgZm9yICh2YXIgbyBvZiBPYmplY3Qua2V5cyh0aGlzLnNvY2tldHMpKSB7XG4gICAgICB0aGlzLnNvY2tldHNbb10uZHJhdyhhcHApO1xuICAgIH1cbiAgICBmb3IgKHZhciBvIG9mIE9iamVjdC5rZXlzKHRoaXMuZGlhbHMpKSB7XG4gICAgICB0aGlzLmRpYWxzW29dLmRyYXcoYXBwKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIGZvciAodmFyIG8gb2YgT2JqZWN0LmtleXModGhpcy5zb2NrZXRzKSkge1xuICAgICAgdmFyIHYgPSB0aGlzLnNvY2tldHNbb10uaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSk7XG4gICAgICBpZiAodikge1xuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgbyBvZiBPYmplY3Qua2V5cyh0aGlzLmRpYWxzKSkge1xuICAgICAgdmFyIHYgPSB0aGlzLmRpYWxzW29dLmhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpO1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBwYXRoID0gbmV3IFBhdGgyRCgpO1xuICAgIHBhdGgucmVjdCgwLCAwLCB0aGlzLncsIHRoaXMuaCk7XG4gICAgaWYgKGFwcC5jdHguaXNQb2ludEluUGF0aChwYXRoLCB4LCB5KSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG5cbiAgLy8gY29ubmVjdGlvbnMgaXMgYSB7fSBtYXBwaW5nIHRoaXMgdW5pdCdzIGlucHV0IHNvY2tldCBJRHMgXG4gIC8vIHRvIGEgbGlzdCBvZiBjb25uZWN0ZWQgdW5pdHMuXG4gIC8vXG4gIGNvbXBpbGUoY29ubmVjdGlvbnMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4iLCJleHBvcnQgY2xhc3MgUGF0Y2gge1xuICBjb25zdHJ1Y3Rvcihmcm9tTW9kdWxlLCB0b01vZHVsZSwgZnJvbVNvY2tldCwgdG9Tb2NrZXQsIHR5cGUpIHtcbiAgICB0aGlzLmZyb20gPSBmcm9tTW9kdWxlO1xuICAgIHRoaXMudG8gPSB0b01vZHVsZTtcbiAgICB0aGlzLmZyb21Tb2NrZXQgPSBmcm9tU29ja2V0O1xuICAgIHRoaXMudG9Tb2NrZXQgPSB0b1NvY2tldDtcbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgIHRocm93ICdNaXNzaW5nIHR5cGUgaW4gUGF0Y2gnO1xuICAgIH1cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG4gIGdldEZyb21Tb2NrZXQobW9kKSB7XG4gICAgcmV0dXJuIG1vZC51bml0LnNvY2tldHNbdGhpcy5mcm9tU29ja2V0XTtcbiAgfVxuICBnZXRUb1NvY2tldChtb2QpIHtcbiAgICByZXR1cm4gbW9kLnVuaXQuc29ja2V0c1t0aGlzLnRvU29ja2V0XTtcbiAgfVxuICBpc0lzb21vcnBoaWMocCkge1xuICAgIHJldHVybiAodGhpcy5mcm9tID09IHAuZnJvbSBcbiAgICAgICAgJiYgdGhpcy50byA9PSBwLnRvIFxuICAgICAgICAmJiB0aGlzLmZyb21Tb2NrZXQgPT0gcC5mcm9tU29ja2V0IFxuICAgICAgICAmJiB0aGlzLnRvU29ja2V0ID09IHAudG9Tb2NrZXQpIFxuICAgICAgfHwgXG4gICAgICAodGhpcy50byA9PSBwLmZyb21cbiAgICAgICAgJiYgdGhpcy5mcm9tID09IHAudG8gXG4gICAgICAgICYmIHRoaXMuZnJvbVNvY2tldCA9PSBwLnRvU29ja2V0IFxuICAgICAgICAmJiB0aGlzLnRvU29ja2V0ID09IHAuZnJvbVNvY2tldCk7XG4gIH1cbiAgZG9lc1BhdGNoQ29ubmVjdFRvKG1vZHVsZSwgc29ja2V0KSB7XG4gICAgcmV0dXJuICh0aGlzLmZyb20gPT0gbW9kdWxlICYmIHRoaXMuZnJvbVNvY2tldCA9PSBzb2NrZXQpIHx8XG4gICAgICAodGhpcy50byA9PSBtb2R1bGUgJiYgdGhpcy50b1NvY2tldCA9PSBzb2NrZXQpXG4gIH1cbiAgY29ubmVjdHNUbyhtb2R1bGUsIHNvY2tldCkge1xuICAgIGlmICh0aGlzLmZyb20gPT0gbW9kdWxlICYmIHRoaXMuZnJvbVNvY2tldCA9PSBzb2NrZXQpIHtcbiAgICAgIHJldHVybiB7bW9kdWxlOiB0aGlzLnRvLCBzb2NrZXQ6IHRoaXMudG9Tb2NrZXR9XG4gICAgfVxuICAgIHJldHVybiB7bW9kdWxlOiB0aGlzLmZyb20sIHNvY2tldDogdGhpcy5mcm9tU29ja2V0fVxuICB9XG4gIGdldENvbG9yKHRoZW1lKSB7XG4gICAgaWYgKHRoZW1lLmNvbG91cnMuUGF0Y2hlc1t0aGlzLnR5cGVdKSB7XG4gICAgICByZXR1cm4gdGhlbWUuY29sb3Vycy5QYXRjaGVzW3RoaXMudHlwZV07XG4gICAgfVxuICAgIHJldHVybiB0aGVtZS5jb2xvdXJzLlBhdGNoO1xuICB9XG59XG5cbiIsImV4cG9ydCBjbGFzcyBTb2NrZXQge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBsYWJlbCwgdHlwZSwgaXNJbnB1dCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgdGhpcy5yYWRpdXMgPSA4O1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5pc0lucHV0ID0gaXNJbnB1dDtcbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgIHRocm93ICdNaXNzaW5nIFNvY2tldCB0eXBlIGZvciBTb2NrZXQgd2l0aCBsYWJlbDogJyArIGxhYmVsO1xuICAgIH1cbiAgICBpZiAoaXNJbnB1dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyAnTWlzc2luZyBTb2NrZXQgaXNJbnB1dCBmb3IgU29ja2V0IHdpdGggbGFiZWw6ICcgKyBsYWJlbDtcbiAgICB9XG4gIH1cbiAgZHJhdyhhcHApIHtcbiAgICAvLyBEcmF3IE9jdGFnb25cbiAgICB2YXIgb2N0YV9zaG9ydCA9IDAuMjkyODkzMjE4ODEzNDUyNDc1NTk5MTU1NjM3ODk1MTU7O1xuICAgIHZhciBvY3RhX2xvbmcgPSAxIC0gb2N0YV9zaG9ydDtcbiAgICB2YXIgb2N0YWdvbiA9IHtcbiAgICAgIHNpemU6IDIgKiB0aGlzLnJhZGl1cyArIDQsXG4gICAgfVxuICAgIHZhciB4ID0gdGhpcy54IC0gdGhpcy5yYWRpdXMgLSAyO1xuICAgIHZhciB5ID0gdGhpcy55IC0gdGhpcy5yYWRpdXMgLSAyO1xuICAgIGFwcC5jdHguYmVnaW5QYXRoKCk7XG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Tb2NrZXRCYWNrZ3JvdW5kO1xuICAgIGlmIChhcHAudGhlbWUuY29sb3Vycy5Tb2NrZXRzW3RoaXMudHlwZV0pIHsgXG4gICAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLlNvY2tldHNbdGhpcy50eXBlXTtcbiAgICB9XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLlNvY2tldE91dGxpbmU7XG4gICAgYXBwLmN0eC5tb3ZlVG8oeCArIG9jdGFnb24uc2l6ZSAqIG9jdGFfc2hvcnQsIHkpO1xuICAgIGFwcC5jdHgubGluZVRvKHgsIHkgKyBvY3RhZ29uLnNpemUgKiBvY3RhX3Nob3J0KTtcbiAgICBhcHAuY3R4LmxpbmVUbyh4LCB5ICsgb2N0YWdvbi5zaXplICogb2N0YV9sb25nKTtcbiAgICBhcHAuY3R4LmxpbmVUbyh4ICsgb2N0YWdvbi5zaXplICogb2N0YV9zaG9ydCwgeSArIG9jdGFnb24uc2l6ZSk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCArIG9jdGFnb24uc2l6ZSAqIG9jdGFfbG9uZywgeSArIG9jdGFnb24uc2l6ZSk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCArIG9jdGFnb24uc2l6ZSwgeSArICBvY3RhZ29uLnNpemUgKiBvY3RhX2xvbmcpO1xuICAgIGFwcC5jdHgubGluZVRvKHggKyBvY3RhZ29uLnNpemUsIHkgKyBvY3RhZ29uLnNpemUgKiBvY3RhX3Nob3J0KTtcbiAgICBhcHAuY3R4LmxpbmVUbyh4ICsgb2N0YWdvbi5zaXplICogb2N0YV9sb25nLCB5KTtcbiAgICBhcHAuY3R4LmxpbmVUbyh4ICsgb2N0YWdvbi5zaXplICogb2N0YV9zaG9ydCwgeSk7XG4gICAgYXBwLmN0eC5maWxsKCk7XG4gICAgYXBwLmN0eC5zdHJva2UoKTtcblxuICAgIC8vIERyYXcgaG9sZVxuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Tb2NrZXRJbnNpZGU7XG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Tb2NrZXRJbnNpZGU7XG4gICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcbiAgICBhcHAuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMgLSAyLCAwLCAyICogTWF0aC5QSSk7XG4gICAgYXBwLmN0eC5maWxsKCk7XG5cbiAgICAvLyBEcmF3IGxhYmVsXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVUZXh0O1xuICAgIGFwcC5jdHguZm9udCA9ICcxMHB4IG1vbm8nO1xuICAgIHZhciBjZW50ZXJYID0gdGhpcy54O1xuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICBhcHAuY3R4LmZpbGxUZXh0KHRoaXMubGFiZWwsIGNlbnRlclgsIHkgLSAzKTtcbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgaWYgKHggPj0gdGhpcy54IC0gdGhpcy5yYWRpdXMgJiYgeCA8PSB0aGlzLnggKyB0aGlzLnJhZGl1cyArIDQgJiYgeSA+PSB0aGlzLnkgLSB0aGlzLnJhZGl1cyAmJiB5IDw9IHRoaXMueSArIHRoaXMucmFkaXVzICsgNCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG4gIGhhbmRsZURyYWcoYXBwLCBkeCwgZHksIHgsIHkpIHtcbiAgICBpZiAodGhpcy5vbkRyYWcpIHtcbiAgICAgIHRoaXMub25EcmFnKGFwcCwgdGhpcywgZHgsIGR5LCB4LCB5KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0U29ja2V0IGV4dGVuZHMgU29ja2V0IHtcbiAgY29uc3RydWN0b3IoeCwgeSwgbGFiZWwsIHR5cGUpIHtcbiAgICBzdXBlcih4LCB5LCBsYWJlbCwgdHlwZSwgdHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE91dHB1dFNvY2tldCBleHRlbmRzIFNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGxhYmVsLCB0eXBlKSB7XG4gICAgc3VwZXIoeCwgeSwgbGFiZWwsIHR5cGUsIGZhbHNlKTtcbiAgfVxufVxuIiwiZXhwb3J0IHsgSW5zdHJ1bWVudCB9IGZyb20gJy4vaW5zdHJ1bWVudC5qcyc7XG5pbXBvcnQgeyBJbnN0cnVtZW50IH0gZnJvbSAnLi9pbnN0cnVtZW50LmpzJztcbmltcG9ydCB7IENoYW5uZWxJbnB1dCwgQ2hhbm5lbE91dHB1dCwgU2FtcGxlR2VuZXJhdG9yLCBGaWx0ZXIsIFRyYW5zcG9zZSwgUGFubmluZ30gZnJvbSAnLi9tb2R1bGVfdW5pdHMnO1xuaW1wb3J0IHsgQnV0dG9uLCBFZGl0b3IsIE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvJztcblxuZXhwb3J0IGNsYXNzIEluc3RydW1lbnRFZGl0b3IgZXh0ZW5kcyBFZGl0b3Ige1xuICBjb25zdHJ1Y3RvcihhcHAsIGluc3RydW1lbnQsIGhhbmRsZUNsb3NlKSB7XG4gICAgc3VwZXIoYXBwLCBpbnN0cnVtZW50LCBoYW5kbGVDbG9zZSk7XG4gICAgaWYgKCFpbnN0cnVtZW50KSB7XG4gICAgICBpbnN0cnVtZW50ID0gbmV3IEluc3RydW1lbnQoW10sIFtdKTtcbiAgICAgIHZhciBtb2R1bGVzID0gW1xuICAgICAgICBuZXcgTW9kdWxlKGluc3RydW1lbnQsIDMwLCAzMCwgbmV3IENoYW5uZWxJbnB1dCgnaW5wdXQnKSksIFxuICAgICAgICBuZXcgTW9kdWxlKGluc3RydW1lbnQsIDgwMCwgMzAsIG5ldyBDaGFubmVsT3V0cHV0KCdvdXRwdXQnKSksXG4gICAgICBdO1xuICAgICAgaW5zdHJ1bWVudC5tb2R1bGVzID0gbW9kdWxlcztcbiAgICB9XG4gICAgdGhpcy50YXJnZXQgPSBpbnN0cnVtZW50O1xuICAgIHZhciBidXR0b25EZWZzID0gW1xuICAgICAgICB7bGFiZWw6IFwiU0lOXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJTUVVcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzcXVhcmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiU0FXXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2F3XCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlRSSVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInRyaWFuZ2xlXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlBXTVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInB1bHNlXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIldBVlwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcIndhdlwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJOT0lcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJ3aGl0ZV9ub2lzZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJHUkFcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJncmFpblwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJWT0NcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJ2b2NvZGVyXCIpfSxcbiAgICBdO1xuICAgIHZhciBmaWx0ZXJEZWZzID0gW1xuICAgICAge2xhYmVsOiBcIkxQRlwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcImxvdyBwYXNzIGZpbHRlclwiKX0sXG4gICAgICB7bGFiZWw6IFwiSFBGXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkRmlsdGVyKFwiaGlnaCBwYXNzIGZpbHRlclwiKX0sXG4gICAgICB7bGFiZWw6IFwiRExZXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkRmlsdGVyKFwiZGVsYXlcIil9LFxuICAgICAge2xhYmVsOiBcIkZMQVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcImZsYW5nZXJcIil9LFxuICAgICAge2xhYmVsOiBcIkRJU1wiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcImRpc3RvcnRpb25cIil9LFxuICAgICAge2xhYmVsOiBcIk9WUlwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcIm92ZXJkcml2ZVwiKX0sXG4gICAgICB7bGFiZWw6IFwiVFJFXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkRmlsdGVyKFwidHJlbWVsb1wiKX0sXG4gICAgXTtcbiAgICB2YXIgZGVyaXZlZERlZnMgPSBbXG4gICAgICB7bGFiZWw6IFwiVFJBXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgVHJhbnNwb3NlKFwidHJhbnNwb3NlXCIpKX0sXG4gICAgICB7bGFiZWw6IFwiUEFOXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUGFubmluZyhcInBhbm5pbmdcIikpfSxcbiAgICBdO1xuICAgIHZhciB4ID0gMTA7XG4gICAgZm9yICh2YXIgZGVmIG9mIGJ1dHRvbkRlZnMpIHtcbiAgICAgIHZhciBiID0gbmV3IEJ1dHRvbih4LCAwLCBkZWYub25jbGljay5iaW5kKHRoaXMpLCBkZWYubGFiZWwpO1xuICAgICAgYi5jb2xvdXIgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVHZW5lcmF0b3I7XG4gICAgICB0aGlzLmJ1dHRvbnMucHVzaChiKTtcbiAgICAgIHggKz0gYi53ICsgMztcbiAgICB9XG4gICAgZm9yICh2YXIgZGVmIG9mIGZpbHRlckRlZnMpIHtcbiAgICAgIHZhciBiID0gbmV3IEJ1dHRvbih4LCAwLCBkZWYub25jbGljay5iaW5kKHRoaXMpLCBkZWYubGFiZWwpO1xuICAgICAgYi5jb2xvdXIgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVGaWx0ZXI7XG4gICAgICB0aGlzLmJ1dHRvbnMucHVzaChiKTtcbiAgICAgIHggKz0gYi53ICsgMztcbiAgICB9XG4gICAgZm9yICh2YXIgZGVmIG9mIGRlcml2ZWREZWZzKSB7XG4gICAgICB2YXIgYiA9IG5ldyBCdXR0b24oeCwgMCwgZGVmLm9uY2xpY2suYmluZCh0aGlzKSwgZGVmLmxhYmVsKTtcbiAgICAgIGIuY29sb3VyID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlRGVyaXZlZDtcbiAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGIpO1xuICAgICAgeCArPSBiLncgKyAzO1xuICAgIH1cbiAgfVxuICBoYW5kbGVBZGRGaWx0ZXIodHlwZSkge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IEZpbHRlcih0eXBlKSk7XG4gIH1cbiAgaGFuZGxlQWRkR2VuZXJhdG9yKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBTYW1wbGVHZW5lcmF0b3IodHlwZSkpO1xuICB9XG59XG5cbiIsImltcG9ydCB7IENoYW5uZWxJbnB1dCwgQ2hhbm5lbE91dHB1dCwgRmlsdGVyLCBTYW1wbGVHZW5lcmF0b3IsIFRyYW5zcG9zZSwgUGFubmluZywgRmFjdG9yeSB9IGZyb20gJy4vbW9kdWxlX3VuaXRzJztcbmltcG9ydCB7IFBhdGNoLCBNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBQYXRjaGFibGUsIEFVRElPX1RZUEUsIEZSRVFVRU5DWV9UWVBFLCBQQU5OSU5HX1RZUEUgfSBmcm9tICcuLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgSW5zdHJ1bWVudCBleHRlbmRzIFBhdGNoYWJsZSB7XG4gIGNvbnN0cnVjdG9yKG1vZHVsZXMsIHBhdGNoZXMpIHtcbiAgICBzdXBlcihtb2R1bGVzLCBwYXRjaGVzKTtcbiAgICB0aGlzLm5hbWUgPSBudWxsO1xuICAgIHRoaXMuaW5zdHJ1bWVudEJhbmtJbmRleCA9IG51bGw7XG4gICAgdGhpcy5tb2R1bGVzID0gW107XG4gICAgdGhpcy5wYXRjaGVzID0gW107XG4gIH1cbiAgbG9hZEZyb21EZWZpbml0aW9uKGluc3RyRGVmKSB7XG4gICAgdGhpcy5tb2R1bGVzID0gW1xuICAgICAgbmV3IE1vZHVsZSh0aGlzLCAxMCwgNDAsIG5ldyBDaGFubmVsSW5wdXQoJ2lucHV0JykpLCBcbiAgICAgIG5ldyBNb2R1bGUodGhpcywgNzAwLCA0MCwgbmV3IENoYW5uZWxPdXRwdXQoJ291dHB1dCcpKSxcbiAgICBdO1xuICAgIHRoaXMucGF0Y2hlcyA9IFtdO1xuICAgIGlmIChpbnN0ckRlZi5uYW1lKSB7XG4gICAgICB0aGlzLm5hbWUgPSBpbnN0ckRlZi5uYW1lO1xuICAgIH1cbiAgICBpZiAoaW5zdHJEZWYuaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5pbnN0cnVtZW50QmFua0luZGV4ID0gaW5zdHJEZWYuaW5kZXg7XG4gICAgfVxuICAgIHZhciBpeCA9IHRoaXMubG9hZEdlbmVyYXRvcihpbnN0ckRlZiwgMCwgMSk7XG4gICAgdGhpcy5wYXRjaElucHV0KGl4KTtcbiAgfVxuICBwYXRjaElucHV0KGl4KSB7XG4gICAgaWYgKGl4KSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShpeCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSBvZiBpeCkge1xuICAgICAgICAgIHRoaXMucGF0Y2hJbnB1dChpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgcyA9IHRoaXMubW9kdWxlc1tpeF0udW5pdC5zb2NrZXRzO1xuICAgICAgdmFyIGNhbmRpZGF0ZSA9IG51bGw7XG4gICAgICBpZiAocykge1xuICAgICAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMocykpIHtcbiAgICAgICAgICBpZiAoc1trZXldLnR5cGUgPT09IEZSRVFVRU5DWV9UWVBFKSB7XG4gICAgICAgICAgICBjYW5kaWRhdGUgPSBrZXk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYWRkUGF0Y2goaXgsIDAsIFwiRlJFUVwiLCBjYW5kaWRhdGUsIEZSRVFVRU5DWV9UWVBFKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbG9hZEdlbmVyYXRvcihpbnN0ckRlZiwgaW5wdXQsIG91dHB1dCkge1xuICAgIGlmIChpbnN0ckRlZltcImNvbWJpbmVkXCJdKSB7XG4gICAgICB2YXIgZ3MgPSBbXTtcbiAgICAgIGZvciAodmFyIGlEZWYgb2YgaW5zdHJEZWZbXCJjb21iaW5lZFwiXSkge1xuICAgICAgICB2YXIgaXggPSB0aGlzLmxvYWRHZW5lcmF0b3IoaURlZiwgaW5wdXQsIG91dHB1dCk7XG4gICAgICAgIGlmIChpeCkge1xuICAgICAgICAgIGdzLnB1c2goaXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZ3M7XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInBhbm5pbmdcIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IFBhbm5pbmcoXCJwYW5uaW5nXCIpO1xuICAgICAgdmFyIHRJeCA9IHRoaXMuYWRkTW9kdWxlKGcpO1xuICAgICAgdmFyIGl4ID0gdGhpcy5sb2FkR2VuZXJhdG9yKGluc3RyRGVmW1wicGFubmluZ1wiXSwgaW5wdXQsIG91dHB1dCk7XG4gICAgICB0aGlzLl9hZGRQYXRjaCh0SXgsIGl4LCBcIlBBTlwiLCBcIlBBTlwiLCBQQU5OSU5HX1RZUEUpO1xuICAgICAgdGhpcy5fYWRkUGF0Y2goaW5wdXQsIHRJeCwgXCJGUkVRXCIsIFwiRlJFUVwiLCBGUkVRVUVOQ1lfVFlQRSk7XG4gICAgICByZXR1cm4gaXg7XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInRyYW5zcG9zZVwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgVHJhbnNwb3NlKFwidHJhbnNwb3NlXCIpO1xuICAgICAgZy5kaWFsc1tcInNlbWl0b25lc1wiXS52YWx1ZSA9IGluc3RyRGVmW1widHJhbnNwb3NlXCJdW1wic2VtaXRvbmVzXCJdIHx8IDA7XG4gICAgICB2YXIgdEl4ID0gdGhpcy5hZGRNb2R1bGUoZyk7XG4gICAgICB2YXIgaXggPSB0aGlzLmxvYWRHZW5lcmF0b3IoaW5zdHJEZWZbXCJ0cmFuc3Bvc2VcIl0sIHRJeCwgb3V0cHV0KTtcbiAgICAgIHRoaXMuX2FkZFBhdGNoKHRJeCwgaXgsIFwiRlJFUVwiLCBcIkZSRVFcIiwgRlJFUVVFTkNZX1RZUEUpO1xuICAgICAgdGhpcy5fYWRkUGF0Y2goaW5wdXQsIHRJeCwgXCJGUkVRXCIsIFwiRlJFUSBJTlwiLCBGUkVRVUVOQ1lfVFlQRSk7XG4gICAgICByZXR1cm4gaXg7XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInNpbmVcIl0gXG4gICAgICB8fCBpbnN0ckRlZltcInRyaWFuZ2xlXCJdIFxuICAgICAgfHwgaW5zdHJEZWZbXCJzcXVhcmVcIl0gXG4gICAgICB8fCBpbnN0ckRlZltcInNhd3Rvb3RoXCJdIFxuICAgICAgfHwgaW5zdHJEZWZbXCJ3aGl0ZV9ub2lzZVwiXVxuICAgICAgfHwgaW5zdHJEZWZbXCJwdWxzZVwiXVxuICAgICAgfHwgaW5zdHJEZWZbXCJ3YXZcIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IEZhY3RvcnkoKS5nZW5lcmF0b3JGcm9tRGVmaW5pdGlvbihpbnN0ckRlZik7XG4gICAgICB2YXIgaXggPSB0aGlzLmFkZE1vZHVsZShnKTtcbiAgICAgIHRoaXMuX2FkZFBhdGNoKGl4LCBvdXRwdXQsIFwiT1VUXCIsIFwiSU5cIiwgQVVESU9fVFlQRSk7XG4gICAgICByZXR1cm4gaXg7XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInZvY29kZXJcIl0pIHtcbiAgICAgIHZhciBzb3VyY2UgPSBuZXcgRmFjdG9yeSgpLmdlbmVyYXRvckZyb21EZWZpbml0aW9uKGluc3RyRGVmW1widm9jb2RlclwiXVtcInNvdXJjZVwiXSlcbiAgICAgIHZhciB2b2NvZGVyID0gbmV3IEZhY3RvcnkoKS5nZW5lcmF0b3JGcm9tRGVmaW5pdGlvbihpbnN0ckRlZltcInZvY29kZXJcIl1bXCJ2b2NvZGVyXCJdKVxuICAgICAgcmV0dXJuIFtdO1xuICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJmaWx0ZXJcIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IEZhY3RvcnkoKS5maWx0ZXJGcm9tRGVmaW5pdGlvbihpbnN0ckRlZltcImZpbHRlclwiXSlcbiAgICAgIHZhciB0SXggPSB0aGlzLmFkZE1vZHVsZShnKTtcbiAgICAgIHZhciBpeCA9IHRoaXMubG9hZEdlbmVyYXRvcihpbnN0ckRlZltcImZpbHRlclwiXSwgaW5wdXQsIHRJeCk7XG4gICAgICB0aGlzLl9hZGRQYXRjaCh0SXgsIG91dHB1dCwgXCJPVVRcIiwgXCJJTlwiLCBBVURJT19UWVBFKTtcbiAgICAgIHJldHVybiBpeDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coaW5zdHJEZWYpO1xuICAgICAgdGhyb3cgJ1Vua25vd24gaW5zdHJ1bWVudCBkZWYnO1xuICAgIH1cbiAgfVxuICBsb2FkKGluc3RyRGVmKSB7XG4gICAgdmFyIG1vZHVsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBtIG9mIGluc3RyRGVmLm1vZHVsZXMpIHtcbiAgICAgIHZhciBnID0gbnVsbDtcbiAgICAgIGlmIChtLnR5cGUgPT0gXCJpbnB1dFwiKSB7XG4gICAgICAgIGcgPSBuZXcgQ2hhbm5lbElucHV0KG0udHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKG0udHlwZSA9PSBcIm91dHB1dFwiKSB7XG4gICAgICAgIGcgPSBuZXcgQ2hhbm5lbE91dHB1dChtLnR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChtLnR5cGUgPT0gXCJsb3cgcGFzcyBmaWx0ZXJcIikge1xuICAgICAgICBnID0gbmV3IEZpbHRlcihtLnR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChtLnR5cGUgPT0gXCJzaW5lXCIgfHwgbS50eXBlID09IFwidHJpYW5nbGVcIikge1xuICAgICAgICBnID0gbmV3IFNhbXBsZUdlbmVyYXRvcihtLnR5cGUpO1xuICAgICAgfVxuICAgICAgaWYgKGcpIHtcbiAgICAgICAgdmFyIG1vZCA9IG5ldyBNb2R1bGUodGhpcywgbS54LCBtLnksIGcpO1xuICAgICAgICBtb2R1bGVzLnB1c2gobW9kKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHBhdGNoZXMgPSBbXTtcbiAgICBmb3IgKHZhciBwIG9mIGluc3RyRGVmLnBhdGNoZXMpIHtcbiAgICAgIHRoaXMuX2FkZFBhdGNoKHAuZnJvbV9tb2R1bGUsIHAudG9fbW9kdWxlLCBwLmZyb21fc29ja2V0LCBwLnRvX3NvY2tldCk7XG4gICAgfVxuICAgIHRoaXMubW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgdGhpcy5wYXRjaGVzID0gcGF0Y2hlcztcbiAgfVxuXG4gIGNvbXBpbGUoKSB7XG4gICAgdmFyIG91dHB1dCA9IG51bGw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBtID0gdGhpcy5tb2R1bGVzW2ldO1xuICAgICAgaWYgKG0udW5pdC50eXBlID09IFwib3V0cHV0XCIpIHtcbiAgICAgICAgb3V0cHV0ID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBxdWV1ZSA9IFtvdXRwdXRdO1xuICAgIHZhciBzZWVuID0ge307XG4gICAgdmFyIGRlcGVuZGVuY2llcyA9IFtdO1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgcSA9IHF1ZXVlWzBdO1xuICAgICAgdmFyIHF1ZXVlID0gcXVldWUuc3BsaWNlKDEpO1xuICAgICAgaWYgKHNlZW5bcV0pIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGRlcGVuZGVuY2llcy5wdXNoKHEpO1xuICAgICAgZm9yICh2YXIgcCBvZiB0aGlzLnBhdGNoZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vZHVsZXNbcV0pIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkJpZyB0cm91YmxlczogdHJ5aW5nIHRvIHJlYWNoIG5vbiBleGlzdGVudCBtb2R1bGU6XCIsIGl4KTtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIHZhciBtb2RTb2NrZXRzID0gdGhpcy5tb2R1bGVzW3FdLnVuaXQuc29ja2V0cztcbiAgICAgICAgaWYgKHAudG8gPT09IHEgJiYgbW9kU29ja2V0c1twLnRvU29ja2V0XSAmJiBtb2RTb2NrZXRzW3AudG9Tb2NrZXRdLmlzSW5wdXQpIHtcbiAgICAgICAgICBpZiAoIXNlZW5bcC5mcm9tXSkge1xuICAgICAgICAgICAgcXVldWUucHVzaChwLmZyb20pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwLmZyb20gPT09IHEgJiYgbW9kU29ja2V0c1twLmZyb21Tb2NrZXRdICYmIG1vZFNvY2tldHNbcC5mcm9tU29ja2V0XS5pc0lucHV0KSB7XG4gICAgICAgICAgaWYgKCFzZWVuW3AudG9dKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKHAudG8pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2VlbltxXSA9IHRydWU7XG4gICAgfVxuICAgIHZhciBnZW5lcmF0b3JzID0ge307XG4gICAgZm9yICh2YXIgaSA9IGRlcGVuZGVuY2llcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGl4ID0gZGVwZW5kZW5jaWVzW2ldO1xuICAgICAgaWYgKCF0aGlzLm1vZHVsZXNbaXhdKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmlnIHRyb3VibGVzOiB0cnlpbmcgdG8gcmVhY2ggbm9uIGV4aXN0ZW50IG1vZHVsZTpcIiwgaXgpO1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgdmFyIHVuaXQgPSB0aGlzLm1vZHVsZXNbaXhdLnVuaXQ7XG4gICAgICB2YXIgZyA9IG51bGw7XG4gICAgICBpZiAodW5pdC50eXBlID09IFwiaW5wdXRcIikge1xuICAgICAgICBnID0gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAodW5pdC50eXBlID09IFwid2F2XCIpIHtcbiAgICAgICAgZyA9IHVuaXQuY29tcGlsZSgpO1xuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJ0cmlhbmdsZVwiIFxuICAgICAgICB8fCB1bml0LnR5cGUgPT0gXCJzaW5lXCIgXG4gICAgICAgIHx8IHVuaXQudHlwZSA9PSBcInNhd1wiIFxuICAgICAgICB8fCB1bml0LnR5cGUgPT0gXCJzcXVhcmVcIiBcbiAgICAgICAgfHwgdW5pdC50eXBlID09IFwid2hpdGVfbm9pc2VcIikge1xuICAgICAgICBnID0ge307XG4gICAgICAgIGdbdW5pdC50eXBlXSA9IHtcbiAgICAgICAgICBcImdhaW5cIjogdW5pdC5kaWFsc1tcImdhaW5cIl0udmFsdWUsXG4gICAgICAgICAgXCJwYW5uaW5nXCI6IHVuaXQuZGlhbHNbXCJwYW5uaW5nXCJdLnZhbHVlLFxuICAgICAgICAgIFwiYXR0YWNrXCI6IHVuaXQuZGlhbHNbXCJhdHRhY2tcIl0udmFsdWUsXG4gICAgICAgICAgXCJkZWNheVwiOiB1bml0LmRpYWxzW1wiZGVjYXlcIl0udmFsdWUsXG4gICAgICAgICAgXCJzdXN0YWluXCI6IHVuaXQuZGlhbHNbXCJzdXN0YWluXCJdLnZhbHVlLFxuICAgICAgICAgIFwicmVsZWFzZVwiOiB1bml0LmRpYWxzW1wicmVsZWFzZVwiXS52YWx1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBpdGNoRm91bmQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgcCBvZiB0aGlzLnBhdGNoZXMpIHtcbiAgICAgICAgICBpZiAocC5kb2VzUGF0Y2hDb25uZWN0VG8oaXgsIFwiRlJFUVwiKSkge1xuICAgICAgICAgICAgcGl0Y2hGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcGcgPSBnZW5lcmF0b3JzW3AuY29ubmVjdHNUbyhpeCwgXCJGUkVRXCIpLm1vZHVsZV07XG4gICAgICAgICAgICBpZiAocGcpIHtcbiAgICAgICAgICAgICAgZ1t1bml0LnR5cGVdW1wiYXV0b19waXRjaFwiXSA9IHBnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXBpdGNoRm91bmQpIHtcbiAgICAgICAgICBnW3VuaXQudHlwZV1bXCJwaXRjaFwiXSA9IHVuaXQuZGlhbHNbXCJwaXRjaFwiXS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJsb3cgcGFzcyBmaWx0ZXJcIikge1xuICAgICAgICBnID0ge307XG4gICAgICAgIGdbXCJmaWx0ZXJcIl0gPSB7XCJscGZcIjoge1wiY3V0b2ZmXCI6IHVuaXQuZGlhbHNbXCJjdXRvZmZcIl0udmFsdWV9fVxuICAgICAgICB2YXIgb24gPSB0aGlzLmNvbXBpbGVHZW5lcmF0b3JzKGdlbmVyYXRvcnMsIGl4LCBcIklOXCIpO1xuICAgICAgICBPYmplY3Qua2V5cyhvbikubWFwKChrKSA9PiB7XG4gICAgICAgICAgZ1tcImZpbHRlclwiXVtrXSA9IG9uW2tdO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodW5pdC50eXBlID09IFwiaGlnaCBwYXNzIGZpbHRlclwiKSB7XG4gICAgICAgIGcgPSB7fTtcbiAgICAgICAgZ1tcImZpbHRlclwiXSA9IHtcImhwZlwiOiB7XCJjdXRvZmZcIjogdW5pdC5kaWFsc1tcImN1dG9mZlwiXS52YWx1ZX19XG4gICAgICAgIHZhciBvbiA9IHRoaXMuY29tcGlsZUdlbmVyYXRvcnMoZ2VuZXJhdG9ycywgaXgsIFwiSU5cIik7XG4gICAgICAgIE9iamVjdC5rZXlzKG9uKS5tYXAoKGspID0+IHtcbiAgICAgICAgICBnW1wiZmlsdGVyXCJdW2tdID0gb25ba107XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJ0cmFuc3Bvc2VcIikge1xuICAgICAgICBnID0ge1widHJhbnNwb3NlXCI6IHtcbiAgICAgICAgICBcInNlbWl0b25lc1wiOiB1bml0LmRpYWxzW1wic2VtaXRvbmVzXCJdLnZhbHVlLFxuICAgICAgICB9fVxuICAgICAgICB2YXIgb24gPSB0aGlzLmNvbXBpbGVHZW5lcmF0b3JzKGdlbmVyYXRvcnMsIGl4LCBcIkZSRVEgSU5cIik7XG4gICAgICAgIGlmIChvbikge1xuICAgICAgICAgIE9iamVjdC5rZXlzKG9uKS5tYXAoKGspID0+IHtcbiAgICAgICAgICAgIGdbXCJ0cmFuc3Bvc2VcIl1ba10gPSBvbltrXTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJwYW5uaW5nXCIpIHtcbiAgICAgICAgZyA9IHtcInBhbm5pbmdcIjoge319XG4gICAgICAgIHZhciBvbiA9IHRoaXMuY29tcGlsZUdlbmVyYXRvcnMoZ2VuZXJhdG9ycywgaXgsIFwiRlJFUSBJTlwiKTtcbiAgICAgICAgaWYgKG9uKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMob24pLm1hcCgoaykgPT4ge1xuICAgICAgICAgICAgZ1tcInBhbm5pbmdcIl1ba10gPSBvbltrXTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJvdXRwdXRcIikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5jb21waWxlR2VuZXJhdG9ycyhnZW5lcmF0b3JzLCBpeCwgXCJJTlwiKTtcbiAgICAgICAgaWYgKHRoaXMubmFtZSkge1xuICAgICAgICAgIHJlc3VsdC5uYW1lID0gdGhpcy5uYW1lXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW5zdHJ1bWVudEJhbmtJbmRleCkge1xuICAgICAgICAgIHJlc3VsdC5pbmRleCA9IHRoaXMuaW5zdHJ1bWVudEJhbmtJbmRleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgZ2VuZXJhdG9yc1tpeF0gPSBnO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbXBpbGVHZW5lcmF0b3JzKGdlbmVyYXRvcnMsIGl4LCBpbnB1dCkge1xuICAgIHZhciBncyA9IFtdO1xuICAgIGZvciAodmFyIHAgb2YgdGhpcy5wYXRjaGVzKSB7XG4gICAgICBpZiAocC5kb2VzUGF0Y2hDb25uZWN0VG8oaXgsIGlucHV0KSkge1xuICAgICAgICBncy5wdXNoKGdlbmVyYXRvcnNbcC5jb25uZWN0c1RvKGl4LCBpbnB1dCkubW9kdWxlXSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIGlmIChncy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBnc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcImNvbWJpbmVkXCI6IGdzfVxuICAgIH1cbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBNb2R1bGVVbml0LCBPdXRwdXRTb2NrZXQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBGUkVRVUVOQ1lfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBDaGFubmVsSW5wdXQgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiRlJFUVwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJGUkVRXCIsIEZSRVFVRU5DWV9UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZU91dHB1dCc7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZVVuaXQsIElucHV0U29ja2V0IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgQVVESU9fVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cblxuZXhwb3J0IGNsYXNzIENoYW5uZWxPdXRwdXQgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiSU5cIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJJTlwiLCBBVURJT19UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZU91dHB1dCc7XG4gIH1cbn1cblxuIiwiXG5pbXBvcnQgeyBTYW1wbGVHZW5lcmF0b3IsIFdhdkdlbmVyYXRvciB9IGZyb20gJy4vc2FtcGxlX2dlbmVyYXRvci5qcyc7XG5pbXBvcnQgeyBGaWx0ZXIgfSBmcm9tICcuL2ZpbHRlci5qcyc7XG5cbmV4cG9ydCBjbGFzcyBGYWN0b3J5IHtcblxuICBnZW5lcmF0b3JGcm9tRGVmaW5pdGlvbihpbnN0ckRlZikge1xuXG4gICAgaWYgKGluc3RyRGVmW1wic2luZVwiXSBcbiAgICAgIHx8IGluc3RyRGVmW1widHJpYW5nbGVcIl0gXG4gICAgICB8fCBpbnN0ckRlZltcInNxdWFyZVwiXSBcbiAgICAgIHx8IGluc3RyRGVmW1wic2F3dG9vdGhcIl0gXG4gICAgICB8fCBpbnN0ckRlZltcIndoaXRlX25vaXNlXCJdKSB7XG4gICAgICB2YXIgdHlwID0gXCJ0cmlhbmdsZVwiO1xuICAgICAgdmFyIGluc3RyID0gbnVsbDtcbiAgICAgIGlmIChpbnN0ckRlZltcInRyaWFuZ2xlXCJdKSB7XG4gICAgICAgIGluc3RyID0gaW5zdHJEZWZbXCJ0cmlhbmdsZVwiXTtcbiAgICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJzaW5lXCJdKSB7XG4gICAgICAgIGluc3RyID0gaW5zdHJEZWZbXCJzaW5lXCJdO1xuICAgICAgICB0eXAgPSBcInNpbmVcIjtcbiAgICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJzcXVhcmVcIl0pIHtcbiAgICAgICAgaW5zdHIgPSBpbnN0ckRlZltcInNxdWFyZVwiXTtcbiAgICAgICAgdHlwID0gXCJzcXVhcmVcIjtcbiAgICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJzYXd0b290aFwiXSkge1xuICAgICAgICBpbnN0ciA9IGluc3RyRGVmW1wic2F3dG9vdGhcIl07XG4gICAgICAgIHR5cCA9IFwic2F3XCI7XG4gICAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1wid2hpdGVfbm9pc2VcIl0pIHtcbiAgICAgICAgaW5zdHIgPSBpbnN0ckRlZltcIndoaXRlX25vaXNlXCJdO1xuICAgICAgICB0eXAgPSBcIndoaXRlX25vaXNlXCI7XG4gICAgICB9XG4gICAgICB2YXIgZyA9IG5ldyBTYW1wbGVHZW5lcmF0b3IodHlwKVxuICAgICAgZy5kaWFsc1tcImF0dGFja1wiXS52YWx1ZSA9IGluc3RyW1wiYXR0YWNrXCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJkZWNheVwiXS52YWx1ZSA9IGluc3RyW1wiZGVjYXlcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcInN1c3RhaW5cIl0udmFsdWUgPSBpbnN0cltcInN1c3RhaW5cIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcInJlbGVhc2VcIl0udmFsdWUgPSBpbnN0cltcInJlbGVhc2VcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcImdhaW5cIl0udmFsdWUgPSBpbnN0cltcImdhaW5cIl0gfHwgMS4wO1xuICAgICAgcmV0dXJuIGc7XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcIndhdlwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgV2F2R2VuZXJhdG9yKCk7XG4gICAgICB2YXIgaW5zdHIgPSBpbnN0ckRlZltcIndhdlwiXTtcbiAgICAgIGcuZmlsZSA9IGluc3RyW1wiZmlsZVwiXSB8fCBcIlwiO1xuICAgICAgZy5pc19waXRjaGVkID0gaW5zdHJbXCJwaXRjaGVkXCJdIHx8IGZhbHNlO1xuICAgICAgZy5iYXNlX3BpdGNoID0gaW5zdHJbXCJiYXNlX3BpdGNoXCJdIHx8IDQ0MC4wO1xuICAgICAgZy5kaWFsc1tcImF0dGFja1wiXS52YWx1ZSA9IGluc3RyW1wiYXR0YWNrXCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJkZWNheVwiXS52YWx1ZSA9IGluc3RyW1wiZGVjYXlcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcInN1c3RhaW5cIl0udmFsdWUgPSBpbnN0cltcInN1c3RhaW5cIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcInJlbGVhc2VcIl0udmFsdWUgPSBpbnN0cltcInJlbGVhc2VcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcImdhaW5cIl0udmFsdWUgPSBpbnN0cltcImdhaW5cIl0gfHwgMS4wO1xuICAgICAgcmV0dXJuIGc7XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInB1bHNlXCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBTYW1wbGVHZW5lcmF0b3IoXCJwdWxzZVwiKTtcbiAgICAgIHZhciBpbnN0ciA9IGluc3RyRGVmW1wicHVsc2VcIl07XG4gICAgICBnLmRpYWxzW1wiYXR0YWNrXCJdLnZhbHVlID0gaW5zdHJbXCJhdHRhY2tcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcImRlY2F5XCJdLnZhbHVlID0gaW5zdHJbXCJkZWNheVwiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wic3VzdGFpblwiXS52YWx1ZSA9IGluc3RyW1wic3VzdGFpblwiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wicmVsZWFzZVwiXS52YWx1ZSA9IGluc3RyW1wicmVsZWFzZVwiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wiZ2FpblwiXS52YWx1ZSA9IGluc3RyW1wiZ2FpblwiXSB8fCAxLjA7XG4gICAgICByZXR1cm4gZztcbiAgICB9XG4gIH1cblxuICBmaWx0ZXJGcm9tRGVmaW5pdGlvbihmaWx0ZXJEZWYpIHtcbiAgICBpZiAoZmlsdGVyRGVmW1wibHBmXCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBGaWx0ZXIoXCJsb3cgcGFzcyBmaWx0ZXJcIilcbiAgICAgIGcuZGlhbHNbXCJjdXRvZmZcIl0udmFsdWUgPSBmaWx0ZXJEZWZbXCJscGZcIl1bXCJjdXRvZmZcIl0gfHwgNTAwMDtcbiAgICAgIHJldHVybiBnO1xuICAgIH0gZWxzZSBpZiAoZmlsdGVyRGVmW1wiZGlzdG9ydGlvblwiXSkge1xuICAgICAgdmFyIGcgPSBuZXcgRmlsdGVyKFwiZGlzdG9ydGlvblwiKVxuICAgICAgcmV0dXJuIGc7XG4gICAgfSBlbHNlIGlmIChmaWx0ZXJEZWZbXCJvdmVyZHJpdmVcIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IEZpbHRlcihcIm92ZXJkcml2ZVwiKVxuICAgICAgcmV0dXJuIGc7XG4gICAgfSBlbHNlIGlmIChmaWx0ZXJEZWZbXCJmbGFuZ2VyXCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBGaWx0ZXIoXCJmbGFuZ2VyXCIpXG4gICAgICByZXR1cm4gZztcbiAgICB9IGVsc2UgaWYgKGZpbHRlckRlZltcImF2ZXJhZ2VcIl0pIHtcbiAgICAgIHZhciBnID0gbmV3IEZpbHRlcihcImF2ZXJhZ2VcIilcbiAgICAgIHJldHVybiBnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhmaWx0ZXJEZWYpO1xuICAgICAgdGhyb3cgJ1Vua25vd24gZmlsdGVyIGRlZic7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGVVbml0LCBJbnB1dFNvY2tldCwgT3V0cHV0U29ja2V0LCBEaWFsIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgQVVESU9fVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXIgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiSU5cIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJJTlwiLCBBVURJT19UWVBFKSxcbiAgICAgIFwiT1VUXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIk9VVFwiLCBBVURJT19UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZUZpbHRlcic7XG4gICAgdGhpcy5kaWFscyA9IHsgfVxuXG4gICAgaWYgKHR5cGUgPT09IFwibG93IHBhc3MgZmlsdGVyXCIgfHwgdHlwZSA9PT0gXCJoaWdoIHBhc3MgZmlsdGVyXCIpIHtcbiAgICAgIHRoaXMudyA9IDE1MDtcbiAgICAgIHRoaXMuZGlhbHNbXCJjdXRvZmZcIl0gPSBuZXcgRGlhbCgyOSwgNTksIFwiQ1VUT0ZGXCIsIDEuMCwgMjIwMDAuMCwgNTAwMC4wKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiZGVsYXlcIikge1xuICAgICAgdGhpcy53ID0gMTcwO1xuICAgICAgdGhpcy5kaWFsc1tcInRpbWVcIl0gPSBuZXcgRGlhbCgyOSwgNTksIFwiVElNRVwiLCAwLjAwMDAxLCA0LjAsIDEuMCk7XG4gICAgICB0aGlzLmRpYWxzW1wiZmFjdG9yXCJdID0gbmV3IERpYWwoNzksIDU5LCBcIkZBQ1RPUlwiLCAwLjAsIDIuMCwgMS4wKTtcbiAgICAgIHRoaXMuZGlhbHNbXCJmZWVkYmFja1wiXSA9IG5ldyBEaWFsKDEyOSwgNTksIFwiRkVFREJBQ0tcIiwgMC4wLCAyLjAsIDAuMCk7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgeyBDaGFubmVsSW5wdXQgfSBmcm9tICcuL2NoYW5uZWxfaW5wdXQuanMnO1xuZXhwb3J0IHsgQ2hhbm5lbE91dHB1dCB9IGZyb20gJy4vY2hhbm5lbF9vdXRwdXQuanMnO1xuZXhwb3J0IHsgRmlsdGVyIH0gZnJvbSAnLi9maWx0ZXIuanMnO1xuZXhwb3J0IHsgU2FtcGxlR2VuZXJhdG9yIH0gZnJvbSAnLi9zYW1wbGVfZ2VuZXJhdG9yLmpzJztcbmV4cG9ydCB7IFRyYW5zcG9zZSB9IGZyb20gJy4vdHJhbnNwb3NlLmpzJztcbmV4cG9ydCB7IFBhbm5pbmcgfSBmcm9tICcuL3Bhbm5pbmcuanMnO1xuZXhwb3J0IHsgRmFjdG9yeSB9IGZyb20gJy4vZmFjdG9yeS5qcyc7XG4iLCJpbXBvcnQgeyBJbnB1dFNvY2tldCwgT3V0cHV0U29ja2V0LCBEaWFsLCBNb2R1bGVVbml0IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgRlJFUVVFTkNZX1RZUEUsIFBBTk5JTkdfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBQYW5uaW5nIGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlRGVyaXZlZCc7XG4gICAgdGhpcy53ID0gMTIwO1xuICAgIHRoaXMuaCA9IDE1MDtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIkZSRVFcIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJGUkVRXCIsIEZSRVFVRU5DWV9UWVBFKSxcbiAgICAgIFwiUEFOXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIlBBTlwiLCBQQU5OSU5HX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmRpYWxzID0ge1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCwgRGlhbCwgTW9kdWxlVW5pdCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IEZSRVFVRU5DWV9UWVBFLCBBVURJT19UWVBFLCBQQU5OSU5HX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgU2FtcGxlR2VuZXJhdG9yIGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlR2VuZXJhdG9yJztcbiAgICB0aGlzLncgPSAyMjA7XG4gICAgdGhpcy5oID0gMjUwO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiRlJFUVwiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIkZSRVFcIiwgRlJFUVVFTkNZX1RZUEUpLFxuICAgICAgXCJQQU5cIjogbmV3IElucHV0U29ja2V0KDc5LCB0aGlzLmggLSAyOSwgXCJQQU5cIiwgUEFOTklOR19UWVBFKSxcbiAgICAgIFwiT1VUXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIk9VVFwiLCBBVURJT19UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscyA9IHtcbiAgICAgIFwicGl0Y2hcIjogbmV3IERpYWwoMjksIDQ5LCBcIkZSRVFcIiwgMC4wLCAyMjAwMC4wLCAwLjApLFxuICAgICAgXCJnYWluXCI6IG5ldyBEaWFsKDc5LCA0OSwgXCJHQUlOXCIsIDAuMCwgNC4wLCAxLjApLFxuICAgICAgXCJwYW5uaW5nXCI6IG5ldyBEaWFsKDEyOSwgNDksIFwiUEFOXCIsIDAuMCwgMS4wLCAwLjUpLFxuICAgICAgXCJhdHRhY2tcIjogbmV3IERpYWwoMjksIDEyMCwgXCJBVFRBQ0tcIiwgMC4wLCAxMC4wLCAwLjEpLFxuICAgICAgXCJkZWNheVwiOiBuZXcgRGlhbCg3OSwgMTIwLCBcIkRFQ0FZXCIsIDAuMCwgMTAuMCwgMC4xKSxcbiAgICAgIFwic3VzdGFpblwiOiBuZXcgRGlhbCgxMjksIDEyMCwgXCJTVVNUQUlOXCIsIDAuMCwgMS4wLCAwLjgpLFxuICAgICAgXCJyZWxlYXNlXCI6IG5ldyBEaWFsKDE3OSwgMTIwLCBcIlJFTEVBU0VcIiwgMC4wLCAxMCwgMC4xKSxcbiAgICB9XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgV2F2R2VuZXJhdG9yIGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFwid2F2XCIpO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVHZW5lcmF0b3InO1xuICAgIHRoaXMudyA9IDIyMDtcbiAgICB0aGlzLmggPSAyNTA7XG4gICAgdGhpcy5maWxlID0gXCJcIjtcbiAgICB0aGlzLmlzX3BpdGNoZWQgPSBmYWxzZTtcbiAgICB0aGlzLmJhc2VfcGl0Y2ggPSA0NDAuMDtcbiAgICAvLyBUT0RPOiBmaWxlIGlucHV0IGFuZCBpc19waXRjaGVkIGJvb2xlYW5cbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIkZSRVFcIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJGUkVRXCIsIEZSRVFVRU5DWV9UWVBFKSxcbiAgICAgIFwiUEFOXCI6IG5ldyBJbnB1dFNvY2tldCg3OSwgdGhpcy5oIC0gMjksIFwiUEFOXCIsIFBBTk5JTkdfVFlQRSksXG4gICAgICBcIk9VVFwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJPVVRcIiwgQVVESU9fVFlQRSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgICBcInBpdGNoXCI6IG5ldyBEaWFsKDI5LCA0OSwgXCJGUkVRXCIsIDAuMCwgMjIwMDAuMCwgMC4wKSxcbiAgICAgIFwiZ2FpblwiOiBuZXcgRGlhbCg3OSwgNDksIFwiR0FJTlwiLCAwLjAsIDQuMCwgMS4wKSxcbiAgICAgIFwicGFubmluZ1wiOiBuZXcgRGlhbCgxMjksIDQ5LCBcIlBBTlwiLCAwLjAsIDEuMCwgMC41KSxcbiAgICAgIFwiYXR0YWNrXCI6IG5ldyBEaWFsKDI5LCAxMjAsIFwiQVRUQUNLXCIsIDAuMCwgMTAuMCwgMC4xKSxcbiAgICAgIFwiZGVjYXlcIjogbmV3IERpYWwoNzksIDEyMCwgXCJERUNBWVwiLCAwLjAsIDEwLjAsIDAuMSksXG4gICAgICBcInN1c3RhaW5cIjogbmV3IERpYWwoMTI5LCAxMjAsIFwiU1VTVEFJTlwiLCAwLjAsIDEuMCwgMC44KSxcbiAgICAgIFwicmVsZWFzZVwiOiBuZXcgRGlhbCgxNzksIDEyMCwgXCJSRUxFQVNFXCIsIDAuMCwgMTAsIDAuMSksXG4gICAgfVxuICB9XG5cbiAgY29tcGlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgXCJ3YXZcIjoge1xuICAgICAgICBcImZpbGVcIjogdGhpcy5maWxlLFxuICAgICAgICBcImdhaW5cIjogdGhpcy5kaWFsc1tcImdhaW5cIl0udmFsdWUsXG4gICAgICAgIFwicGl0Y2hlZFwiOiB0aGlzLmlzX3BpdGNoZWQsXG4gICAgICAgIFwiYmFzZV9waXRjaFwiOiB0aGlzLmJhc2VfcGl0Y2gsXG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCwgRGlhbCwgTW9kdWxlVW5pdCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IEZSRVFVRU5DWV9UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFRyYW5zcG9zZSBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgc3VwZXIodHlwZSk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZURlcml2ZWQnO1xuICAgIHRoaXMudyA9IDEyMDtcbiAgICB0aGlzLmggPSAxNTA7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJGUkVRIElOXCI6IG5ldyBJbnB1dFNvY2tldCgyOSwgdGhpcy5oIC0gMjksIFwiRlJFUSBJTlwiLCBGUkVRVUVOQ1lfVFlQRSksXG4gICAgICBcIkZSRVFcIjogbmV3IE91dHB1dFNvY2tldCh0aGlzLncgLSAyOSwgdGhpcy5oIC0gMjksIFwiRlJFUVwiLCBGUkVRVUVOQ1lfVFlQRSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgICBcInNlbWl0b25lc1wiOiBuZXcgRGlhbCgyOSwgNDksIFwiU0VNSVRPTkVTXCIsIC0yNCwgMjQsIDAuMCksXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBUaGVtZSB9IGZyb20gJy4vdGhlbWUuanMnO1xuaW1wb3J0IHsgSW5zdHJ1bWVudEVkaXRvciwgSW5zdHJ1bWVudCB9IGZyb20gJy4vaW5zdHJ1bWVudF9lZGl0b3IvJztcbmltcG9ydCB7IFRpbWVsaW5lRWRpdG9yLCBDaGFubmVsVHJhY2ssIFJlZ2lzdGVyVHJhY2sgfSBmcm9tICcuL3RpbWVsaW5lX2VkaXRvci8nO1xuaW1wb3J0IHsgQ2hhbm5lbCwgUmVnaXN0ZXIgfSBmcm9tICcuL21vZGVsLyc7XG5pbXBvcnQgeyBTZXF1ZW5jZUVkaXRvciwgUmVnaXN0ZXJTZXF1ZW5jZUVkaXRvciB9IGZyb20gJy4vc2VxdWVuY2VfZWRpdG9yLyc7XG5pbXBvcnQgeyBBUEkgfSBmcm9tICcuL2FwaS8nO1xuXG5jbGFzcyBSZWdpc3RlckRlZmluaXRpb25zIHtcbiAgY29uc3RydWN0b3IoaW5pdFdpdGgpIHtcbiAgICB0aGlzLnJlc2V0KGluaXRXaXRoKTtcbiAgfVxuICByZXNldChpbml0V2l0aCkge1xuICAgIHRoaXMuaW50cyA9IFtdO1xuICAgIHRoaXMuZmxvYXRzID0gW107XG4gICAgdGhpcy5hcnJheXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIHRoaXMuaW50cy5wdXNoKFtdKTtcbiAgICAgIHRoaXMuZmxvYXRzLnB1c2goW10pO1xuICAgICAgdGhpcy5hcnJheXMucHVzaChbXSk7XG4gICAgfVxuICB9XG4gIGFkZChvdGhlclJlZ2lzdGVyRGVmaW5pdGlvbnMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGZvciAodmFyIGRlZlNlcSBvZiBvdGhlclJlZ2lzdGVyRGVmaW5pdGlvbnMuaW50c1tpXSkge1xuICAgICAgICB0aGlzLmludHNbaV0ucHVzaChkZWZTZXEpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgZGVmU2VxIG9mIG90aGVyUmVnaXN0ZXJEZWZpbml0aW9ucy5mbG9hdHNbaV0pIHtcbiAgICAgICAgdGhpcy5mbG9hdHNbaV0ucHVzaChkZWZTZXEpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgZGVmU2VxIG9mIG90aGVyUmVnaXN0ZXJEZWZpbml0aW9ucy5hcnJheXNbaV0pIHtcbiAgICAgICAgdGhpcy5hcnJheXNbaV0ucHVzaChkZWZTZXEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBCbGVlcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKTtcbiAgICB0aGlzLnRoZW1lID0gbmV3IFRoZW1lKCk7XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuY2FudmFzLm9ubW91c2Vkb3duID0gdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKVxuICAgIHRoaXMuY2FudmFzLm9ubW91c2V1cCA9IHRoaXMuaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpXG4gICAgdGhpcy5jYW52YXMub25tb3VzZW1vdmUgPSB0aGlzLmhhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5zZWxlY3RlZEVsZW0gPSBudWxsO1xuICAgIHRoaXMuc3RhcnRTZWxlY3RlZFBvcyA9IHt9O1xuICAgIHRoaXMuc2VsZWN0ZWRQb3MgPSB7fTtcbiAgICB0aGlzLmFwaSA9IG5ldyBBUEkodGhpcyk7XG4gICAgdGhpcy5hcGkuc3RhcnQoKTtcbiAgICB0aGlzLmNoYW5uZWxzID0gW107XG4gICAgdGhpcy5yZWdpc3RlcnMgPSBuZXcgUmVnaXN0ZXJEZWZpbml0aW9ucygpO1xuICAgIHRoaXMudHJhY2tzID0gW107XG4gICAgdGhpcy5vcGVuVGltZWxpbmVFZGl0b3IoKTtcbiAgICB0aGlzLmRyYXcoKTtcbiAgfVxuXG4gIC8vIGFwaSBjYWxsYmFja1xuICBpbml0aWFsaXNlQ2hhbm5lbHMoY2hhbm5lbERlZnMpIHtcbiAgICB0aGlzLmNoYW5uZWxzID0gW107XG4gICAgdGhpcy50cmFja3MgPSBbXTtcbiAgICB2YXIgc2VlblBlcmN1c3Npb25DaGFubmVsID0gZmFsc2U7XG4gICAgZm9yICh2YXIgZGVmIG9mIGNoYW5uZWxEZWZzKSB7XG4gICAgICB2YXIgY2ggPSBuZXcgQ2hhbm5lbChkZWYuY2hhbm5lbCB8fCAwKTtcbiAgICAgIGNoLmxvYWRGcm9tRGVmaW5pdGlvbihkZWYpO1xuICAgICAgdGhpcy5jaGFubmVscy5wdXNoKGNoKTtcbiAgICAgIHRoaXMudHJhY2tzLnB1c2gobmV3IENoYW5uZWxUcmFjayhjaCwgdGhpcykpO1xuICAgICAgaWYgKGNoLmNoYW5uZWxOciA9PSA5KSB7XG4gICAgICAgIHNlZW5QZXJjdXNzaW9uQ2hhbm5lbCA9IHRydWU7XG4gICAgICB9XG4gICAgICBjaC5pbnN0cnVtZW50ID0gbmV3IEluc3RydW1lbnQoKTtcbiAgICAgIGlmIChkZWYuZ2VuZXJhdG9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGluZyBjaGFubmVsIGdlbmVyYXRvclwiLCBkZWYuZ2VuZXJhdG9yKTtcbiAgICAgICAgY2guaW5zdHJ1bWVudC5sb2FkRnJvbURlZmluaXRpb24oZGVmLmdlbmVyYXRvcik7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhcIk5ldyBjaGFubmVsXCIsIGRlZik7XG4gICAgfVxuICAgIGlmICghc2VlblBlcmN1c3Npb25DaGFubmVsKSB7XG4gICAgICB2YXIgY2ggPSBuZXcgQ2hhbm5lbCg5KTtcbiAgICAgIHRoaXMuY2hhbm5lbHMucHVzaChjaCk7XG4gICAgICB0aGlzLnRyYWNrcy5wdXNoKG5ldyBDaGFubmVsVHJhY2soY2gsIHRoaXMpKTtcbiAgICB9XG4gICAgdGhpcy5hcGkucmVxdWVzdFNlcXVlbmNlckRlZigpO1xuICAgIHRoaXMub3BlblRpbWVsaW5lRWRpdG9yKCk7XG4gIH1cbiAgXG4gIC8vIGFwaSBjYWxsYmFja1xuICBpbml0aWFsaXNlU2VxdWVuY2VUcmFja3Moc2VxdWVuY2VzKSB7XG4gICAgdmFyIGNoYW5uZWxTZXF1ZW5jZXMgPSB7fTtcbiAgICBmb3IgKHZhciBjaCBvZiB0aGlzLmNoYW5uZWxzKSB7XG4gICAgICBjaGFubmVsU2VxdWVuY2VzW2NoLmNoYW5uZWxOcl0gPSBbXTtcbiAgICB9XG4gICAgdGhpcy5yZWdpc3RlcnMucmVzZXQoKCkgPT4gW10pO1xuICAgIGZvciAodmFyIHNlcSBvZiBzZXF1ZW5jZXMpIHtcbiAgICAgIHZhciBjaGFubmVsc0FuZFJlZ2lzdGVycyA9IHRoaXMuc2VxdWVuY2VEZWZCeUNoYW5uZWxBbmRSZWdpc3RlcihzZXEpO1xuICAgICAgdmFyIGRlZnMgPSBjaGFubmVsc0FuZFJlZ2lzdGVycy5jaGFubmVsU2VxdWVuY2VzO1xuICAgICAgZm9yICh2YXIgY2ggb2YgdGhpcy5jaGFubmVscykge1xuICAgICAgICBmb3IgKHZhciBzIG9mIGRlZnNbY2guY2hhbm5lbE5yXSkge1xuICAgICAgICAgIGNoYW5uZWxTZXF1ZW5jZXNbY2guY2hhbm5lbE5yXS5wdXNoKHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkZWZzID0gY2hhbm5lbHNBbmRSZWdpc3RlcnMucmVnaXN0ZXJTZXF1ZW5jZXM7XG4gICAgICB0aGlzLnJlZ2lzdGVycy5hZGQoZGVmcyk7XG4gICAgfVxuICAgIGZvciAodmFyIHRyYWNrIG9mIHRoaXMudHJhY2tzKSB7XG4gICAgICBpZiAodHJhY2sgaW5zdGFuY2VvZiBDaGFubmVsVHJhY2spIHtcbiAgICAgICAgdHJhY2suaW5pdGlhbGlzZVNlcXVlbmNlVHJhY2tzKGNoYW5uZWxTZXF1ZW5jZXNbdHJhY2sudW5pdC5jaGFubmVsTnJdKVxuICAgICAgfSBlbHNlIGlmICh0cmFjayBpbnN0YW5jZW9mIFJlZ2lzdGVyVHJhY2spIHtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5yZWdpc3RlcnMuaW50c1tpXS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciB0cmFjayA9IG5ldyBSZWdpc3RlclRyYWNrKG5ldyBSZWdpc3RlcihpLCBcInJlZ2lzdGVyXCIpLCB0aGlzKTtcbiAgICAgICAgdHJhY2suaW5pdGlhbGlzZVNlcXVlbmNlVHJhY2tzKHRoaXMucmVnaXN0ZXJzLmludHNbaV0pO1xuICAgICAgICB0aGlzLnRyYWNrcy5wdXNoKHRyYWNrKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnJlZ2lzdGVycy5mbG9hdHNbaV0ubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgdHJhY2sgPSBuZXcgUmVnaXN0ZXJUcmFjayhuZXcgUmVnaXN0ZXIoaSwgXCJmbG9hdF9yZWdpc3RlclwiKSwgdGhpcyk7XG4gICAgICAgIHRyYWNrLmluaXRpYWxpc2VTZXF1ZW5jZVRyYWNrcyh0aGlzLnJlZ2lzdGVycy5mbG9hdHNbaV0pO1xuICAgICAgICB0aGlzLnRyYWNrcy5wdXNoKHRyYWNrKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnJlZ2lzdGVycy5hcnJheXNbaV0ubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgdHJhY2sgPSBuZXcgUmVnaXN0ZXJUcmFjayhuZXcgUmVnaXN0ZXIoaSwgXCJhcnJheV9yZWdpc3RlclwiKSwgdGhpcyk7XG4gICAgICAgIHRyYWNrLmluaXRpYWxpc2VTZXF1ZW5jZVRyYWNrcyh0aGlzLnJlZ2lzdGVycy5hcnJheXNbaV0pO1xuICAgICAgICB0aGlzLnRyYWNrcy5wdXNoKHRyYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5vcGVuVGltZWxpbmVFZGl0b3IoKTtcbiAgICAvL3RoaXMudXBsb2FkU2VxdWVuY2VyRGVmKCk7XG4gIH1cblxuICBjb21waWxlKCkge1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICBcImJwbVwiOiAxMjAsXG4gICAgICBcImdyYW51bGFyaXR5XCI6IDY0LFxuICAgICAgXCJjaGFubmVsc1wiOiBbXSxcbiAgICAgIFwic2VxdWVuY2VzXCI6IFtdLFxuICAgIH07XG4gICAgZm9yICh2YXIgdHJhY2sgb2YgdGhpcy50cmFja3MpIHtcbiAgICAgIHZhciB0cmFja1Jlc3VsdCA9IHRyYWNrLmNvbXBpbGUoKTtcbiAgICAgIGlmICh0cmFja1Jlc3VsdC50cmFjaykge1xuICAgICAgICByZXN1bHQudHJhY2tzLnB1c2godHJhY2tSZXN1bHQudHJhY2spO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgcyBvZiB0cmFja1Jlc3VsdC5zZXF1ZW5jZXMpIHtcbiAgICAgICAgcmVzdWx0LnNlcXVlbmNlcy5wdXNoKHMpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB1cGxvYWRTZXF1ZW5jZXJEZWYoKSB7XG4gICAgdGhpcy5hcGkuc2V0U2VxdWVuY2VyRGVmKHRoaXMuY29tcGlsZSgpKTtcbiAgfVxuXG4gIHNlcXVlbmNlRGVmQnlDaGFubmVsQW5kUmVnaXN0ZXIoc2VxKSB7XG4gICAgdmFyIGNoYW5uZWxTZXF1ZW5jZXMgPSB7fTtcbiAgICB2YXIgcmVnaXN0ZXJTZXF1ZW5jZXMgPSBuZXcgUmVnaXN0ZXJEZWZpbml0aW9ucygpO1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICBjaGFubmVsU2VxdWVuY2VzOiBjaGFubmVsU2VxdWVuY2VzLFxuICAgICAgcmVnaXN0ZXJTZXF1ZW5jZXM6IHJlZ2lzdGVyU2VxdWVuY2VzLFxuICAgIH1cbiAgICBmb3IgKHZhciBjaCBvZiB0aGlzLmNoYW5uZWxzKSB7XG4gICAgICBjaGFubmVsU2VxdWVuY2VzW2NoLmNoYW5uZWxOcl0gPSBbXTtcbiAgICB9XG4gICAgdmFyIGxlYXZlcyA9IFtcInBsYXlfbm90ZVwiLCBcInBsYXlfbm90ZXNcIiwgXCJ2b2x1bWVcIixcbiAgICAgICAgICAgICAgICAgIFwibHBmX2N1dG9mZlwiLCBcImhwZl9jdXRvZmZcIiwgXCJwYW5uaW5nXCJdO1xuICAgIGZvciAodmFyIGxlYWYgb2YgbGVhdmVzKSB7XG4gICAgICBpZiAoc2VxW2xlYWZdKSB7XG4gICAgICAgIHZhciBzID0gc2VxW2xlYWZdO1xuICAgICAgICBpZiAoY2hhbm5lbFNlcXVlbmNlc1tzLmNoYW5uZWxdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjaGFubmVsU2VxdWVuY2VzW3MuY2hhbm5lbF0ucHVzaChzZXEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWlzc2luZyBjaGFubmVsXCIsIHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VxW1wicmVnaXN0ZXJcIl0pIHtcbiAgICAgIGlmIChzZXEucmVnaXN0ZXIucmVnaXN0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZWdpc3RlclNlcXVlbmNlcy5pbnRzW3NlcS5yZWdpc3Rlci5yZWdpc3Rlcl0ucHVzaChzZXEpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDs7XG4gICAgfSBlbHNlIGlmIChzZXFbXCJmbG9hdF9yZWdpc3RlclwiXSkge1xuICAgICAgaWYgKHNlcS5mbG9hdF9yZWdpc3Rlci5yZWdpc3RlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlZ2lzdGVyU2VxdWVuY2VzLmZsb2F0c1tzZXEuZmxvYXRfcmVnaXN0ZXIucmVnaXN0ZXJdLnB1c2goc2VxKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7O1xuICAgIH0gZWxzZSBpZiAoc2VxW1wiYXJyYXlfcmVnaXN0ZXJcIl0pIHtcbiAgICAgIGlmIChzZXEuYXJyYXlfcmVnaXN0ZXIucmVnaXN0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZWdpc3RlclNlcXVlbmNlcy5hcnJheXNbc2VxLmFycmF5X3JlZ2lzdGVyLnJlZ2lzdGVyXS5wdXNoKHNlcSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0OztcbiAgICB9XG5cblxuICAgIHZhciB3cmFwcGVkU2VxdWVuY2VzID0gW1wicmVwZWF0XCIsIFwiYWZ0ZXJcIiwgXCJiZWZvcmVcIiwgXCJldWNsaWRpYW5cIiwgXCJvZmZzZXRcIl07XG4gICAgZm9yICh2YXIgd3JhcHBlZCBvZiB3cmFwcGVkU2VxdWVuY2VzKSB7XG4gICAgICBpZiAoc2VxW3dyYXBwZWRdKSB7XG4gICAgICAgIGlmICghc2VxW3dyYXBwZWRdLnNlcXVlbmNlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJNaXNzaW5nIHNlcXVlbmNlXCIsIHNlcSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1YlJlc3VsdCA9IHRoaXMuc2VxdWVuY2VEZWZCeUNoYW5uZWxBbmRSZWdpc3RlcihzZXFbd3JhcHBlZF0uc2VxdWVuY2UpXG4gICAgICAgIHZhciBjaCA9IHN1YlJlc3VsdC5jaGFubmVsU2VxdWVuY2VzO1xuICAgICAgICB2YXIgbWVyZ2VyID0gKGRlZlNlcSkgPT4ge1xuICAgICAgICAgIHZhciBtZXJnZWQgPSB7fTtcbiAgICAgICAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMoc2VxKSkge1xuICAgICAgICAgICAgbWVyZ2VkW2tleV0gPSBzZXFba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVyZ2VkLnNlcXVlbmNlID0gZGVmU2VxO1xuICAgICAgICAgIHJldHVybiBtZXJnZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgY2hhbm5lbE5yIG9mIE9iamVjdC5rZXlzKGNoKSkge1xuICAgICAgICAgIHZhciBzZXFzID0gY2hbY2hhbm5lbE5yXTtcbiAgICAgICAgICBpZiAoc2Vxcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBcbiAgICAgICAgICBmb3IgKHZhciBkZWZTZXEgb2Ygc2Vxcykge1xuICAgICAgICAgICAgY2hhbm5lbFNlcXVlbmNlc1tjaGFubmVsTnJdLnB1c2gobWVyZ2VyKGRlZlNlcSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVnaXN0ZXJzID0gc3ViUmVzdWx0LnJlZ2lzdGVyU2VxdWVuY2VzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgICAgICBmb3IgKHZhciBkZWZTZXEgb2YgcmVnaXN0ZXJzLmludHNbaV0pIHtcbiAgICAgICAgICAgIHJlZ2lzdGVyU2VxdWVuY2VzLmludHNbaV0ucHVzaChtZXJnZXIoZGVmU2VxKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyIGRlZlNlcSBvZiByZWdpc3RlcnMuZmxvYXRzW2ldKSB7XG4gICAgICAgICAgICByZWdpc3RlclNlcXVlbmNlcy5mbG9hdHNbaV0ucHVzaChtZXJnZXIoZGVmU2VxKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyIGRlZlNlcSBvZiByZWdpc3RlcnMuYXJyYXlzW2ldKSB7XG4gICAgICAgICAgICByZWdpc3RlclNlcXVlbmNlcy5hcnJheXNbaV0ucHVzaChtZXJnZXIoZGVmU2VxKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZXEuY29tYmluZSkge1xuICAgICAgZm9yICh2YXIgc2VxIG9mIHNlcS5jb21iaW5lKSB7XG4gICAgICAgIHZhciBzdWJSZXN1bHQgPSB0aGlzLnNlcXVlbmNlRGVmQnlDaGFubmVsQW5kUmVnaXN0ZXIoc2VxKTtcbiAgICAgICAgdmFyIGRlZnMgPSBzdWJSZXN1bHQuY2hhbm5lbFNlcXVlbmNlcztcbiAgICAgICAgZm9yICh2YXIgY2ggb2YgdGhpcy5jaGFubmVscykge1xuICAgICAgICAgIGZvciAodmFyIHMgb2YgZGVmc1tjaC5jaGFubmVsTnJdKSB7XG4gICAgICAgICAgICBjaGFubmVsU2VxdWVuY2VzW2NoLmNoYW5uZWxOcl0ucHVzaChzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVnaXN0ZXJTZXF1ZW5jZXMuYWRkKHN1YlJlc3VsdC5yZWdpc3RlclNlcXVlbmNlcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwidW5rbm93biBkZWZcIiwgc2VxKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIG9wZW5JbnN0cnVtZW50RWRpdG9yKGluc3RyKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBuZXcgSW5zdHJ1bWVudEVkaXRvcih0aGlzLCBpbnN0ciwgdGhpcy5vcGVuVGltZWxpbmVFZGl0b3IuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5kcmF3KClcbiAgfVxuICBvcGVuVGltZWxpbmVFZGl0b3IoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBuZXcgVGltZWxpbmVFZGl0b3IodGhpcy50cmFja3MsIHRoaXMpO1xuICAgIHRoaXMuZHJhdygpO1xuICB9XG4gIG9wZW5TZXF1ZW5jZUVkaXRvcihzZXF1ZW5jZSwgY2hhbm5lbE5yKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBuZXcgU2VxdWVuY2VFZGl0b3IodGhpcywgc2VxdWVuY2UsIGNoYW5uZWxOciwgdGhpcy5vcGVuVGltZWxpbmVFZGl0b3IuYmluZCh0aGlzKSlcbiAgICB0aGlzLmRyYXcoKTtcbiAgfVxuICBvcGVuUmVnaXN0ZXJTZXF1ZW5jZUVkaXRvcihzZXF1ZW5jZSwgcmVnaXN0ZXIpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IG5ldyBSZWdpc3RlclNlcXVlbmNlRWRpdG9yKHRoaXMsIHNlcXVlbmNlLCByZWdpc3RlciwgdGhpcy5vcGVuVGltZWxpbmVFZGl0b3IuYmluZCh0aGlzKSlcbiAgICB0aGlzLmRyYXcoKTtcbiAgfVxuXG4gIGhhbmRsZU1vdXNlRG93bihlKSB7XG4gICAgdmFyIGJvdW5kID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB2YXIgeCA9IGUuY2xpZW50WCAtIGJvdW5kLmxlZnQ7IFxuICAgIHZhciB5ID0gZS5jbGllbnRZIC0gYm91bmQudG9wO1xuICAgIHRoaXMuc2VsZWN0ZWRFbGVtID0gbnVsbDtcbiAgICB0aGlzLnNlbGVjdGVkUG9zID0ge307XG4gICAgaWYgKHRoaXMuYWN0aXZlLmhhbmRsZU1vdXNlRG93bikge1xuICAgICAgdmFyIGVsZW0gPSB0aGlzLmFjdGl2ZS5oYW5kbGVNb3VzZURvd24odGhpcywgeCwgeSk7XG4gICAgICBpZiAoZWxlbSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkRWxlbSA9IGVsZW07XG4gICAgICAgIHRoaXMuc3RhcnRTZWxlY3RlZFBvcyA9IHt4LCB5fTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBvcyA9IHt4LCB5fTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVNb3VzZVVwKGUpIHtcbiAgICB2YXIgYm91bmQgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIHZhciB4ID0gZS5jbGllbnRYIC0gYm91bmQubGVmdDsgXG4gICAgdmFyIHkgPSBlLmNsaWVudFkgLSBib3VuZC50b3A7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbGVtKSB7XG4gICAgICB2YXIgZWxlbSA9IHRoaXMuc2VsZWN0ZWRFbGVtO1xuICAgICAgdmFyIHN4ID0gdGhpcy5zdGFydFNlbGVjdGVkUG9zLng7XG4gICAgICB2YXIgc3kgPSB0aGlzLnN0YXJ0U2VsZWN0ZWRQb3MueTtcbiAgICAgIGlmIChzeCA+PSB4IC01ICYmIHN4IDw9IHggKyA1ICYmIHN5ID49IHkgLSA1ICYmIHN5IDw9IHkgKyA1KSB7XG4gICAgICAgIGlmIChlbGVtLmhhbmRsZUNsaWNrKSB7XG4gICAgICAgICAgZWxlbS5oYW5kbGVDbGljayh0aGlzLCB4LCB5KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsZW0uaGFuZGxlRHJvcCkge1xuICAgICAgICAgIGVsZW0uaGFuZGxlRHJvcCh0aGlzLCB4LCB5KTtcbiAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RlZEVsZW0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU1vdXNlTW92ZShlKSB7XG4gICAgdmFyIGJvdW5kID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB2YXIgeCA9IGUuY2xpZW50WCAtIGJvdW5kLmxlZnQ7IFxuICAgIHZhciB5ID0gZS5jbGllbnRZIC0gYm91bmQudG9wO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkRWxlbSkge1xuICAgICAgdmFyIGVsZW0gPSB0aGlzLnNlbGVjdGVkRWxlbTtcbiAgICAgIHZhciBzeCA9IHRoaXMuc2VsZWN0ZWRQb3MueDtcbiAgICAgIHZhciBzeSA9IHRoaXMuc2VsZWN0ZWRQb3MueTtcbiAgICAgIGlmIChzeCA+PSB4IC01ICYmIHN4IDw9IHggKyA1ICYmIHN5ID49IHkgLSA1ICYmIHN5IDw9IHkgKyA1KSB7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWxlbS5oYW5kbGVEcmFnKSB7XG4gICAgICAgICAgZWxlbS5oYW5kbGVEcmFnKHRoaXMsIHggLSBzeCwgeSAtIHN5LCB4LCB5LCBzeCwgc3kpO1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQb3MgPSB7eCwgeX07XG4gICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmF3KCkge1xuICAgIHZhciB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHZhciB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgdmFyIGJvdW5kID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB3aW5kb3dXaWR0aDtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3dIZWlnaHQgLSBib3VuZC50b3A7XG4gICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gdGhpcy50aGVtZS5jb2xvdXJzLkJhY2tncm91bmQ7XG4gICAgYm9keS5zdHlsZS5jb2xvciA9IHRoaXMudGhlbWUuY29sb3Vycy5Gb3JlZ3JvdW5kO1xuICAgIHRoaXMuYWN0aXZlLmRyYXcodGhpcyk7XG4gIH1cbn1cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgdHJ5IHsgXG4gIG5ldyBCbGVlcCgpO1xuICB9IGNhdGNoKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgICBhbGVydChlKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIENoYW5uZWwge1xuICBjb25zdHJ1Y3RvcihjaGFubmVsTnIpIHtcbiAgICB0aGlzLmNoYW5uZWxOciA9IGNoYW5uZWxOcjtcbiAgICB0aGlzLmluc3RydW1lbnQgPSBudWxsO1xuICAgIHRoaXMubmFtZSA9IFwiVW50aXRsZWQgXCIgKyB0aGlzLmNoYW5uZWxOcjtcbiAgICB0aGlzLmxvYWRGcm9tRGVmaW5pdGlvbih7fSk7XG4gIH1cblxuICBsb2FkRnJvbURlZmluaXRpb24oZGVmKSB7XG4gICAgdGhpcy5iYW5rID0gZGVmLmJhbmsgfHwgbnVsbDtcbiAgICB0aGlzLmJhbmtJbmRleCA9IGRlZi5pbnN0cnVtZW50IHx8IG51bGw7XG4gICAgdGhpcy5yZXZlcmIgPSBkZWYucmV2ZXJiIHx8IDA7XG4gICAgdGhpcy5yZXZlcmJUaW1lID0gZGVmLnJldmVyYl90aW1lIHx8IDA7XG4gICAgdGhpcy5yZXZlcmJGZWVkYmFjayA9IGRlZi5yZXZlcmJfZmVlZGJhY2sgfHwgMDtcbiAgICB0aGlzLnRyZW1lbG8gPSBkZWYudHJlbWVsbyB8fCAwO1xuICAgIHRoaXMudm9sdW1lID0gZGVmLnZvbHVtZSB8fCAxMDA7XG4gICAgdGhpcy5wYW5uaW5nID0gZGVmLnBhbm5pbmcgfHwgNjQ7XG4gICAgdGhpcy5scGZDdXRvZmYgPSBkZWYubHBmX2N1dG9mZiB8fCAwO1xuICAgIHRoaXMuaHBmQ3V0b2ZmID0gZGVmLmhwZl9jdXRvZmYgfHwgMDtcbiAgICB0aGlzLmdyYWluID0gZGVmLmdyYWluIHx8IG51bGw7XG4gIH1cbiAgZ2V0Q29tcGlsZVRhcmdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5jaGFubmVsTnI7XG4gIH1cbiAgY29tcGlsZShzZXF1ZW5jZVRyYWNrcykge1xuICAgIHZhciBjaGFubmVsID0ge1xuICAgICAgXCJjaGFubmVsXCI6IHRoaXMuY2hhbm5lbE5yLFxuICAgICAgXCJnZW5lcmF0b3JcIjogdGhpcy5pbnN0cnVtZW50ID8gdGhpcy5pbnN0cnVtZW50LmNvbXBpbGUoKSA6IG51bGwsXG4gICAgICBcImJhbmtcIjogdGhpcy5iYW5rLFxuICAgICAgXCJpbnN0cnVtZW50XCI6IHRoaXMuYmFua0luZGV4LFxuICAgICAgXCJyZXZlcmJcIjogdGhpcy5yZXZlcmIsXG4gICAgICBcInJldmVyYl90aW1lXCI6IHRoaXMucmV2ZXJiVGltZSxcbiAgICAgIFwicmV2ZXJiX2ZlZWRiYWNrXCI6IHRoaXMucmV2ZXJiRmVlZGJhY2ssXG4gICAgICBcInRyZW1lbG9cIjogdGhpcy50cmVtZWxvLFxuICAgICAgXCJ2b2x1bWVcIjogdGhpcy52b2x1bWUsXG4gICAgICBcInBhbm5pbmdcIjogdGhpcy5wYW5uaW5nLFxuICAgICAgXCJscGZfY3V0b2ZmXCI6IHRoaXMubHBmQ3V0b2ZmLFxuICAgICAgXCJocGZfY3V0b2ZmXCI6IHRoaXMuaHBmQ3V0b2ZmLFxuICAgICAgXCJncmFpblwiOiB0aGlzLmdyYWluLFxuICAgIH07XG4gICAgdmFyIHNlcXVlbmNlcyA9IFtdO1xuICAgIGZvciAodmFyIHRyIG9mIHNlcXVlbmNlVHJhY2tzKSB7XG4gICAgICB2YXIgdHJSZXN1bHQgPSB0ci5jb21waWxlKCk7XG4gICAgICBpZiAodHJSZXN1bHQpIHtcbiAgICAgICAgc2VxdWVuY2VzLnB1c2godHJSZXN1bHQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgXCJjaGFubmVsXCI6IGNoYW5uZWwsXG4gICAgICBcInNlcXVlbmNlc1wiOiBzZXF1ZW5jZXMsXG4gICAgfTtcbiAgfVxufVxuIiwiZXhwb3J0IHsgUGF0Y2hhYmxlIH0gZnJvbSAnLi9wYXRjaGFibGUuanMnO1xuZXhwb3J0IHsgUmVnaXN0ZXIgfSBmcm9tICcuL3JlZ2lzdGVyLmpzJztcbmV4cG9ydCB7IENoYW5uZWwgfSBmcm9tICcuL2NoYW5uZWwuanMnO1xuZXhwb3J0ICogZnJvbSAnLi90eXBlcy5qcyc7XG4iLCJpbXBvcnQgeyBQYXRjaCwgTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy8nO1xuXG5leHBvcnQgY2xhc3MgUGF0Y2hhYmxlIHtcbiAgY29uc3RydWN0b3IobW9kdWxlcywgcGF0Y2hlcykge1xuICAgIHRoaXMubW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgdGhpcy5wYXRjaGVzID0gcGF0Y2hlcztcbiAgfVxuICBfYWRkUGF0Y2goZnJvbU1vZHVsZSwgdG9Nb2R1bGUsIGZyb21Tb2NrZXQsIHRvU29ja2V0LCB0eXBlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodG9Nb2R1bGUpKSB7XG4gICAgICBmb3IgKHZhciB0byBvZiB0b01vZHVsZSkge1xuICAgICAgICB0aGlzLl9hZGRQYXRjaChmcm9tTW9kdWxlLCB0bywgZnJvbVNvY2tldCwgdG9Tb2NrZXQsIHR5cGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcCA9IG5ldyBQYXRjaChmcm9tTW9kdWxlLCB0b01vZHVsZSwgZnJvbVNvY2tldCwgdG9Tb2NrZXQsIHR5cGUpO1xuICAgIHRoaXMucGF0Y2hlcy5wdXNoKHApO1xuICB9XG4gIGFkZFBhdGNoKGZyb21Nb2QsIHRvTW9kLCBmcm9tU29ja2V0LCB0b1NvY2tldCkge1xuICAgIHZhciBmcm9tID0gbnVsbDtcbiAgICB2YXIgdG8gPSBudWxsO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbSA9IHRoaXMubW9kdWxlc1tpXTtcbiAgICAgIGlmIChtID09PSBmcm9tTW9kKSB7XG4gICAgICAgIGZyb20gPSBpO1xuICAgICAgfVxuICAgICAgaWYgKG0gPT09IHRvTW9kKSB7XG4gICAgICAgIHRvID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZyb20gPT09IG51bGwgfHwgdG8gPT09IG51bGwgfHwgKGZyb20gPT09IHRvICYmIGZyb21Tb2NrZXQgPT09IHRvU29ja2V0KSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh0aGlzLm1vZHVsZXNbZnJvbV0udW5pdC5zb2NrZXRzW2Zyb21Tb2NrZXRdLnR5cGUgIT0gdGhpcy5tb2R1bGVzW3RvXS51bml0LnNvY2tldHNbdG9Tb2NrZXRdLnR5cGUpIHtcbiAgICAgIGFsZXJ0KFwiV3JvbmcgdHlwZXNcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBwYXRjaCA9IG5ldyBQYXRjaChmcm9tLCB0bywgZnJvbVNvY2tldCwgdG9Tb2NrZXQsIHRoaXMubW9kdWxlc1tmcm9tXS51bml0LnNvY2tldHNbZnJvbVNvY2tldF0udHlwZSk7XG4gICAgdmFyIHJlbW92ZSA9IG51bGw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhdGNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwID0gdGhpcy5wYXRjaGVzW2ldO1xuICAgICAgaWYgKHAuaXNJc29tb3JwaGljKHBhdGNoKSkge1xuICAgICAgICByZW1vdmUgPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlbW92ZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5wYXRjaGVzLnB1c2gocGF0Y2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhdGNoZXMuc3BsaWNlKHJlbW92ZSwgMSk7XG4gICAgfVxuICB9XG4gIGFkZE1vZHVsZSh1bml0KSB7XG4gICAgdmFyIG0gPSBuZXcgTW9kdWxlKHRoaXMsIE1hdGgucmFuZG9tKCkgKiA4MDAgKyAxMDAsIE1hdGgucmFuZG9tKCkgKiA2MDAsIHVuaXQpO1xuICAgIHRoaXMubW9kdWxlcy5wdXNoKG0pO1xuICAgIHJldHVybiB0aGlzLm1vZHVsZXMubGVuZ3RoIC0gMTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJTlRfVFlQRSwgSU5UX0FSUkFZX1RZUEUsIEZMT0FUX1RZUEUgfSBmcm9tICcuL3R5cGVzLmpzJztcblxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyIHtcbiAgY29uc3RydWN0b3IocmVnaXN0ZXIsIHR5cGUpIHtcbiAgICB0aGlzLnJlZ2lzdGVyID0gcmVnaXN0ZXI7XG4gICAgdGhpcy50eXBlID0gdHlwZSB8fCBcInJlZ2lzdGVyXCI7XG4gICAgdGhpcy5zb2NrZXRUeXBlID0gSU5UX1RZUEU7XG4gICAgaWYgKHR5cGUgPT0gXCJhcnJheV9yZWdpc3RlclwiKSB7XG4gICAgICB0aGlzLnNvY2tldFR5cGUgPSBJTlRfQVJSQVlfVFlQRTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJmbG9hdF9yZWdpc3RlclwiKSB7XG4gICAgICB0aGlzLnNvY2tldFR5cGUgPSBGTE9BVF9UWVBFO1xuICAgIH1cbiAgfVxuICBnZXRDb21waWxlVGFyZ2V0KCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGNvbXBpbGUoc2VxdWVuY2VUcmFja3MpIHtcbiAgICB2YXIgc2VxdWVuY2VzID0gW107XG4gICAgZm9yICh2YXIgdHIgb2Ygc2VxdWVuY2VUcmFja3MpIHtcbiAgICAgIHZhciB0clJlc3VsdCA9IHRyLmNvbXBpbGUoKTtcbiAgICAgIGlmICh0clJlc3VsdCkge1xuICAgICAgICBzZXF1ZW5jZXMucHVzaCh0clJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBcInNlcXVlbmNlc1wiOiBzZXF1ZW5jZXMsXG4gICAgfTtcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IEFVRElPX1RZUEUgPSAxO1xuZXhwb3J0IGNvbnN0IEZSRVFVRU5DWV9UWVBFID0gMjtcbmV4cG9ydCBjb25zdCBQQU5OSU5HX1RZUEUgPSAzO1xuZXhwb3J0IGNvbnN0IENMT0NLX1RZUEUgPSA0O1xuZXhwb3J0IGNvbnN0IFRSSUdHRVJfVFlQRSA9IDU7XG5leHBvcnQgY29uc3QgSU5UX1RZUEUgPSA2O1xuZXhwb3J0IGNvbnN0IEZMT0FUX1RZUEUgPSA3O1xuZXhwb3J0IGNvbnN0IElOVF9BUlJBWV9UWVBFID0gODtcbiIsIlxuaW1wb3J0IHsgRWRpdG9yLCBCdXR0b24sIE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IFNlcXVlbmNlIH0gZnJvbSAnLi9zZXF1ZW5jZS5qcyc7XG5pbXBvcnQgeyBTZXF1ZW5jZUlucHV0LCBTZXF1ZW5jZU91dHB1dCwgUHVsc2UsIEV1Y2xpZGlhbiwgUGxheU5vdGUsIFBsYXlOb3RlcywgUmFuZ2UsIFRyYW5zcG9zZSwgUmVnaXN0ZXIsIEludEFycmF5UmVnaXN0ZXJJbmRleCwgVHJhbnNwb3NlSW50QXJyYXksIEludEFycmF5UmVnaXN0ZXIsIE9mZnNldCB9IGZyb20gJy4vbW9kdWxlX3VuaXRzLyc7XG5cbmV4cG9ydCBjbGFzcyBCYXNlU2VxdWVuY2VFZGl0b3IgZXh0ZW5kcyBFZGl0b3Ige1xuICBjb25zdHJ1Y3RvcihhcHAsIHNlcXVlbmNlLCBzZXF1ZW5jZVRhcmdldCwgaGFuZGxlQ2xvc2UpIHtcbiAgICBzdXBlcihhcHAsIHNlcXVlbmNlLCBoYW5kbGVDbG9zZSk7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgaWYgKCFzZXF1ZW5jZSkge1xuICAgICAgc2VxdWVuY2UgPSBuZXcgU2VxdWVuY2Uoc2VxdWVuY2VUYXJnZXQsIFtdLCBbXSk7XG4gICAgICB2YXIgbW9kdWxlcyA9IFtcbiAgICAgICAgbmV3IE1vZHVsZShzZXF1ZW5jZSwgMzAsIDUwLCBuZXcgU2VxdWVuY2VJbnB1dCgnaW5wdXQnKSksIFxuICAgICAgXTtcbiAgICAgIHNlcXVlbmNlLm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgIH1cbiAgICB0aGlzLnRhcmdldCA9IHNlcXVlbmNlO1xuICB9XG4gIGFkZEJ1dHRvbkRlZmluaXRpb25zKGJ1dHRvbkRlZnMpIHtcbiAgICB2YXIgeCA9IDA7XG4gICAgdmFyIHByZXYgPSBudWxsO1xuICAgIHZhciBwYWRkaW5nID0gMDtcbiAgICB2YXIgZ3JvdXBQYWRkaW5nID0gMTU7XG4gICAgZm9yICh2YXIgZGVmIG9mIGJ1dHRvbkRlZnMpIHtcbiAgICAgIHZhciBiID0gbmV3IEJ1dHRvbih4LCB0aGlzLmFwcC50aGVtZS5wYWRkaW5nLCBkZWYub25jbGljay5iaW5kKHRoaXMpLCBkZWYubGFiZWwpO1xuICAgICAgYi5jb2xvdXIgPSB0aGlzLmFwcC50aGVtZS5jb2xvdXJzW2RlZi5jb2xvdXJdIHx8IHRoaXMuYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlR2VuZXJhdG9yO1xuICAgICAgdGhpcy5idXR0b25zLnB1c2goYik7XG4gICAgICBpZiAocHJldiAmJiBwcmV2LmNvbG91ciAhPSBkZWYuY29sb3VyKSB7XG4gICAgICAgIHggKz0gZ3JvdXBQYWRkaW5nO1xuICAgICAgICBiLnggKz0gZ3JvdXBQYWRkaW5nO1xuICAgICAgfVxuICAgICAgeCArPSBiLncgKyBwYWRkaW5nO1xuICAgICAgcHJldiA9IGRlZjtcbiAgICB9XG5cbiAgfVxufVxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlRWRpdG9yIGV4dGVuZHMgQmFzZVNlcXVlbmNlRWRpdG9yIHtcbiAgY29uc3RydWN0b3IoYXBwLCBzZXF1ZW5jZSwgY2hhbm5lbE5yLCBoYW5kbGVDbG9zZSkge1xuICAgIHN1cGVyKGFwcCwgc2VxdWVuY2UsIGNoYW5uZWxOciwgaGFuZGxlQ2xvc2UpO1xuICAgIHZhciBidXR0b25EZWZzID0gW1xuICAgICAgICB7bGFiZWw6IFwi8J2FnVwiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUHVsc2UoNCkpfSxcbiAgICAgICAge2xhYmVsOiBcIvCdhZ5cIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDIpKX0sXG4gICAgICAgIHtsYWJlbDogXCLimalcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDEpKX0sXG4gICAgICAgIHtsYWJlbDogXCLimapcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDAuNSkpfSxcbiAgICAgICAge2xhYmVsOiBcIvCdhaFcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDAuMjUpKX0sXG4gICAgICAgIHtsYWJlbDogXCLwnYWiXCIsIGNvbG91cjogJ01vZHVsZVB1bHNlJywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBQdWxzZSgwLjEyNSkpfSxcbiAgICAgICAge2xhYmVsOiBcIlBVTFNcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKCkpfSxcbiAgICAgICAge2xhYmVsOiBcIkVVQ0xcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IEV1Y2xpZGlhbigpKX0sXG4gICAgICAgIHtsYWJlbDogXCJPRkZTRVRcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IE9mZnNldCgpKX0sXG5cbiAgICAgICAge2xhYmVsOiBcIk5PVEVcIiwgY29sb3VyOiAnTW9kdWxlT3V0cHV0Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBQbGF5Tm90ZShjaGFubmVsTnIpKX0sXG4gICAgICAgIHtsYWJlbDogXCJOT1RFU1wiLCBjb2xvdXI6ICdNb2R1bGVPdXRwdXQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFBsYXlOb3RlcyhjaGFubmVsTnIpKX0sXG4gICAgICAgIHtsYWJlbDogXCJQQU5cIiwgY29sb3VyOiAnTW9kdWxlT3V0cHV0Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzaW5lXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlJFVlwiLCBjb2xvdXI6ICdNb2R1bGVPdXRwdXQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiTFBGXCIsIGNvbG91cjogJ01vZHVsZU91dHB1dCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJIUEZcIiwgY29sb3VyOiAnTW9kdWxlT3V0cHV0Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzaW5lXCIpfSxcblxuICAgICAgICB7bGFiZWw6IFwiU1dFRVBcIiwgY29sb3VyOiAnTW9kdWxlSW50Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBSYW5nZShcInN3ZWVwXCIpKX0sXG4gICAgICAgIHtsYWJlbDogXCJDWUNMRVwiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiUkFOR0VcIiwgY29sb3VyOiAnTW9kdWxlSW50Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBSYW5nZShcInJhbmdlXCIpKX0sXG4gICAgICAgIHtsYWJlbDogXCJGQURFXCIsIGNvbG91cjogJ01vZHVsZUludCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUmFuZ2UoXCJmYWRlIGluXCIpKX0sXG4gICAgICAgIHtsYWJlbDogXCJSQU5EXCIsIGNvbG91cjogJ01vZHVsZUludCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJSRUdcIiwgY29sb3VyOiAnTW9kdWxlSW50Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBSZWdpc3RlcigpKX0sXG4gICAgICAgIHtsYWJlbDogXCJUUkFOU1wiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFRyYW5zcG9zZSgpKX0sXG5cbiAgICAgICAge2xhYmVsOiBcIklOREVYXCIsIGNvbG91cjogJ01vZHVsZUludEFycmF5Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBJbnRBcnJheVJlZ2lzdGVySW5kZXgoKSl9LFxuICAgICAgICB7bGFiZWw6IFwiUkVHXCIsIGNvbG91cjogJ01vZHVsZUludEFycmF5Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBJbnRBcnJheVJlZ2lzdGVyKCkpfSxcbiAgICAgICAge2xhYmVsOiBcIlRSQU5TXCIsIGNvbG91cjogJ01vZHVsZUludEFycmF5Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBUcmFuc3Bvc2VJbnRBcnJheSgpKX0sXG4gICAgXVxuICAgIHRoaXMuYWRkQnV0dG9uRGVmaW5pdGlvbnMoYnV0dG9uRGVmcyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyU2VxdWVuY2VFZGl0b3IgZXh0ZW5kcyBCYXNlU2VxdWVuY2VFZGl0b3Ige1xuICBjb25zdHJ1Y3RvcihhcHAsIHNlcXVlbmNlLCByZWdpc3RlciwgaGFuZGxlQ2xvc2UpIHtcbiAgICBzdXBlcihhcHAsIHNlcXVlbmNlLCByZWdpc3RlciwgaGFuZGxlQ2xvc2UpO1xuICAgIHZhciBidXR0b25EZWZzID0gW1xuICAgICAgICB7bGFiZWw6IFwi8J2FnVwiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUHVsc2UoNCkpfSxcbiAgICAgICAge2xhYmVsOiBcIvCdhZ5cIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDIpKX0sXG4gICAgICAgIHtsYWJlbDogXCLimalcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDEpKX0sXG4gICAgICAgIHtsYWJlbDogXCLimapcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDAuNSkpfSxcbiAgICAgICAge2xhYmVsOiBcIvCdhaFcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDAuMjUpKX0sXG4gICAgICAgIHtsYWJlbDogXCLwnYWiXCIsIGNvbG91cjogJ01vZHVsZVB1bHNlJywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBQdWxzZSgwLjEyNSkpfSxcbiAgICAgICAge2xhYmVsOiBcIlBVTFNcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKCkpfSxcbiAgICAgICAge2xhYmVsOiBcIkVVQ0xcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IEV1Y2xpZGlhbigpKX0sXG4gICAgICAgIHtsYWJlbDogXCJPRkZTRVRcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IE9mZnNldCgpKX0sXG5cbiAgICAgICAge2xhYmVsOiBcIlNXRUVQXCIsIGNvbG91cjogJ01vZHVsZUludCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUmFuZ2UoXCJzd2VlcFwiKSl9LFxuICAgICAgICB7bGFiZWw6IFwiQ1lDTEVcIiwgY29sb3VyOiAnTW9kdWxlSW50Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzaW5lXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlJBTkdFXCIsIGNvbG91cjogJ01vZHVsZUludCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUmFuZ2UoXCJyYW5nZVwiKSl9LFxuICAgICAgICB7bGFiZWw6IFwiRkFERVwiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFJhbmdlKFwiZmFkZSBpblwiKSl9LFxuICAgICAgICB7bGFiZWw6IFwiUkFORFwiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiUkVHXCIsIGNvbG91cjogJ01vZHVsZUludCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUmVnaXN0ZXIoKSl9LFxuICAgICAgICB7bGFiZWw6IFwiVFJBTlNcIiwgY29sb3VyOiAnTW9kdWxlSW50Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBUcmFuc3Bvc2UoKSl9LFxuXG4gICAgICAgIHtsYWJlbDogXCJJTkRFWFwiLCBjb2xvdXI6ICdNb2R1bGVJbnRBcnJheScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgSW50QXJyYXlSZWdpc3RlckluZGV4KCkpfSxcbiAgICAgICAge2xhYmVsOiBcIlJFR1wiLCBjb2xvdXI6ICdNb2R1bGVJbnRBcnJheScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgSW50QXJyYXlSZWdpc3RlcigpKX0sXG4gICAgICAgIHtsYWJlbDogXCJUUkFOU1wiLCBjb2xvdXI6ICdNb2R1bGVJbnRBcnJheScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgVHJhbnNwb3NlSW50QXJyYXkoKSl9LFxuICAgIF1cbiAgICB0aGlzLmFkZEJ1dHRvbkRlZmluaXRpb25zKGJ1dHRvbkRlZnMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGVVbml0LCBJbnB1dFNvY2tldCwgT3V0cHV0U29ja2V0LCBEaWFsIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgVFJJR0dFUl9UWVBFLCBDTE9DS19UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIEV1Y2xpZGlhbiBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcImV1Y2xpZGlhblwiKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIkNMT0NLXCI6IG5ldyBJbnB1dFNvY2tldCgyOSwgdGhpcy5oIC0gMjksIFwiQ0xPQ0tcIiwgQ0xPQ0tfVFlQRSksXG4gICAgICBcIlRSSUdcIjogbmV3IE91dHB1dFNvY2tldCh0aGlzLncgLSAyOSwgdGhpcy5oIC0gMjksIFwiVFJJR1wiLCBUUklHR0VSX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmRpYWxzID0ge1xuICAgICAgXCJwdWxzZXNcIjogbmV3IERpYWwoMjksIDU5LCBcIlBVTFNFU1wiLCAwLjAsIDEwLjAsIDEuMCksXG4gICAgICBcIm92ZXJcIjogbmV3IERpYWwoNzksIDU5LCBcIk9WRVJcIiwgMC4wLCAxMC4wLCAxLjApLFxuICAgICAgXCJkdXJhdGlvblwiOiBuZXcgRGlhbCgxMjksIDU5LCBcIkRVUlwiLCAwLjAsIDEwLjAsIDEuMCksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVQdWxzZSc7XG4gIH1cblxuICBjb21waWxlKGNvbm5lY3Rpb25zKSB7XG4gICAgdmFyIGcgPSB7XCJldWNsaWRpYW5cIjoge1xuICAgICAgICBcInB1bHNlc1wiOiBwYXJzZUZsb2F0KHRoaXMuZGlhbHMucHVsc2VzLnZhbHVlLnRvRml4ZWQoMCkpLFxuICAgICAgICBcIm92ZXJcIjogcGFyc2VGbG9hdCh0aGlzLmRpYWxzLm92ZXIudmFsdWUudG9GaXhlZCgwKSksXG4gICAgICAgIFwiZHVyYXRpb25cIjogdGhpcy5kaWFscy5vdmVyLnZhbHVlLFxuICAgICAgICBcInNlcXVlbmNlXCI6IG51bGwsXG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKChnKSA9PiB7XG4gICAgICByZXR1cm4gKHNlcSkgPT4ge1xuICAgICAgICBnLmV1Y2xpZGlhbi5zZXF1ZW5jZSA9IHNlcTtcbiAgICAgICAgcmV0dXJuIGc7XG4gICAgICB9XG4gICB9KShnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmFuZ2UgfSAgZnJvbSAnLi9yYW5nZS5qcyc7XG5pbXBvcnQgeyBSZWdpc3RlciwgSW50QXJyYXlSZWdpc3RlciB9IGZyb20gJy4vcmVnaXN0ZXIuanMnO1xuaW1wb3J0IHsgSW50QXJyYXlSZWdpc3RlckluZGV4IH0gZnJvbSAnLi9yZWdpc3Rlcl9pbmRleC5qcyc7XG5leHBvcnQgY2xhc3MgRmFjdG9yeSB7XG5cbiAgc2VxdWVuY2VGcm9tRGVmaW5pdGlvbihzZXF1ZW5jZURlZikge1xuXG4gIH1cblxuICBhdXRvbWF0aW9uRnJvbURlZmluaXRpb24oYXV0b21hdGlvbkRlZikge1xuICAgIHZhciByYW5nZXJzID0gW1wicmFuZ2VcIiwgXCJmYWRlX2luXCIsIFwic3dlZXBcIl07XG4gICAgZm9yICh2YXIgcmFuZ2VyIG9mIHJhbmdlcnMpIHtcbiAgICAgIGlmIChhdXRvbWF0aW9uRGVmW3Jhbmdlcl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgZGVmID0gYXV0b21hdGlvbkRlZltyYW5nZXJdO1xuICAgICAgICB2YXIgYSA9IG5ldyBSYW5nZShyYW5nZXIpO1xuICAgICAgICBhLmRpYWxzLmZyb20udmFsdWUgPSBkZWYuZnJvbSB8fCAwO1xuICAgICAgICBhLmRpYWxzLnRvLnZhbHVlID0gZGVmLnRvIHx8IDEyNztcbiAgICAgICAgYS5kaWFscy5zdGVwLnZhbHVlID0gZGVmLnN0ZXAgfHwgMTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChhdXRvbWF0aW9uRGVmW1wicmVnaXN0ZXJcIl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGEgPSBuZXcgUmVnaXN0ZXIoKTtcbiAgICAgIGEuZGlhbHMucmVnaXN0ZXIudmFsdWUgPSBhdXRvbWF0aW9uRGVmW1wicmVnaXN0ZXJcIl0gfHwgMDtcbiAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIlVua25vd24gZGVmaW5pdGlvbiBpbiBmYWN0b3J5OlwiLCBhdXRvbWF0aW9uRGVmKTtcbiAgfVxuICBpbnRBcnJheUF1dG9tYXRpb25Gcm9tRGVmaW5pdGlvbihhdXRvbWF0aW9uRGVmKSB7XG4gICAgaWYgKGF1dG9tYXRpb25EZWZbXCJyZWdpc3RlclwiXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgYSA9IG5ldyBJbnRBcnJheVJlZ2lzdGVyKCk7XG4gICAgICBhLmRpYWxzLnJlZ2lzdGVyLnZhbHVlID0gYXV0b21hdGlvbkRlZltcInJlZ2lzdGVyXCJdIHx8IDA7XG4gICAgICByZXR1cm4gYTtcbiAgICB9IGVsc2UgaWYgKGF1dG9tYXRpb25EZWZbXCJpbmRleFwiXSkge1xuICAgICAgdmFyIGEgPSBuZXcgSW50QXJyYXlSZWdpc3RlckluZGV4KCk7XG4gICAgICBhLmRpYWxzLmluZGV4LnZhbHVlID0gYXV0b21hdGlvbkRlZltcInZhbHVlXCJdIHx8IDA7XG4gICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJVbmtub3duIGludCBhcnJheSBkZWZpbml0aW9uIGluIGZhY3Rvcnk6XCIsIGF1dG9tYXRpb25EZWYpO1xuICB9XG59XG4iLCJleHBvcnQgeyBQdWxzZSB9IGZyb20gJy4vcHVsc2UuanMnO1xuZXhwb3J0IHsgUGxheU5vdGUgfSBmcm9tICcuL3BsYXlfbm90ZS5qcyc7XG5leHBvcnQgeyBQbGF5Tm90ZXMgfSBmcm9tICcuL3BsYXlfbm90ZXMuanMnO1xuZXhwb3J0IHsgU2VxdWVuY2VJbnB1dCB9IGZyb20gJy4vc2VxdWVuY2VfaW5wdXQuanMnO1xuZXhwb3J0IHsgVHJhbnNwb3NlLCBUcmFuc3Bvc2VJbnRBcnJheSB9IGZyb20gJy4vdHJhbnNwb3NlLmpzJztcbmV4cG9ydCB7IEV1Y2xpZGlhbiB9IGZyb20gJy4vZXVjbGlkaWFuLmpzJztcbmV4cG9ydCB7IFJhbmdlIH0gZnJvbSAnLi9yYW5nZS5qcyc7XG5leHBvcnQgeyBSZWdpc3RlciwgSW50QXJyYXlSZWdpc3RlciB9IGZyb20gJy4vcmVnaXN0ZXIuanMnO1xuZXhwb3J0IHsgRmFjdG9yeSB9IGZyb20gJy4vZmFjdG9yeS5qcyc7XG5leHBvcnQgeyBJbnRBcnJheVJlZ2lzdGVySW5kZXggfSBmcm9tICcuL3JlZ2lzdGVyX2luZGV4LmpzJztcbmV4cG9ydCB7IE9mZnNldCB9IGZyb20gJy4vb2Zmc2V0LmpzJztcbmV4cG9ydCB7IFJlZ2lzdGVyT3V0cHV0IH0gZnJvbSAnLi9yZWdpc3Rlcl9vdXRwdXQuanMnO1xuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IFRSSUdHRVJfVFlQRSwgQ0xPQ0tfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBPZmZzZXQgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJvZmZzZXRcIik7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJDTE9DS1wiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIkNMT0NLXCIsIENMT0NLX1RZUEUpLFxuICAgICAgXCJPVVRcIjogbmV3IE91dHB1dFNvY2tldCh0aGlzLncgLSAyOSwgdGhpcy5oIC0gMjksIFwiT1VUXCIsIENMT0NLX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmRpYWxzID0ge1xuICAgICAgXCJvZmZzZXRcIjogbmV3IERpYWwoMjksIDU5LCBcIk9GRlNFVFwiLCAwLjAsIDEyOC4wLCAxLjApLFxuICAgIH1cbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlUHVsc2UnO1xuICB9XG5cbiAgY29tcGlsZShjb25uZWN0aW9ucykge1xuICAgIHZhciBnID0ge1wib2Zmc2V0XCI6IHtcbiAgICAgICAgXCJvZmZzZXRcIjogdGhpcy5kaWFscy5vZmZzZXQudmFsdWUsXG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKChnKSA9PiB7XG4gICAgICByZXR1cm4gKHNlcSkgPT4ge1xuICAgICAgICBnLmV1Y2xpZGlhbi5zZXF1ZW5jZSA9IHNlcTtcbiAgICAgICAgcmV0dXJuIGc7XG4gICAgICB9XG4gICB9KShnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgSW5wdXRTb2NrZXQsIERpYWwgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBUUklHR0VSX1RZUEUsIElOVF9UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFBsYXlOb3RlIGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKGNoYW5uZWxOcikge1xuICAgIHN1cGVyKFwicGxheV9ub3RlXCIpO1xuICAgIHRoaXMuY2hhbm5lbE5yID0gY2hhbm5lbE5yO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiVFJJR1wiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIlRSSUdcIiwgVFJJR0dFUl9UWVBFKSxcbiAgICAgIFwiTk9URVwiOiBuZXcgSW5wdXRTb2NrZXQoNzksIHRoaXMuaCAtIDI5LCBcIk5PVEVcIiwgSU5UX1RZUEUpLFxuICAgICAgXCJWRUxcIjogbmV3IElucHV0U29ja2V0KDEyOSwgdGhpcy5oIC0gMjksIFwiVkVMXCIsIElOVF9UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscyA9IHtcbiAgICAgIFwibm90ZVwiOiBuZXcgRGlhbCgyOSwgNTksIFwiTk9URVwiLCAwLjAsIDEyOC4wLCAxLjApLFxuICAgICAgXCJ2ZWxvY2l0eVwiOiBuZXcgRGlhbCg3OSwgNTksIFwiVkVMXCIsIDAuMCwgMTI4LjAsIDkwLjApLFxuICAgICAgXCJkdXJhdGlvblwiOiBuZXcgRGlhbCgxMjksIDU5LCBcIkRVUlwiLCAwLjAsIDEwLjAsIDEuMCksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVPdXRwdXQnO1xuICB9XG5cbiAgY29tcGlsZShjb25uZWN0aW9ucykge1xuICAgIHZhciBnID0ge1wicGxheV9ub3RlXCI6IHtcbiAgICAgIFwiZHVyYXRpb25cIjogdGhpcy5kaWFsc1tcImR1cmF0aW9uXCJdLnZhbHVlLFxuICAgICAgXCJjaGFubmVsXCI6IHRoaXMuY2hhbm5lbE5yLFxuICAgIH19O1xuICAgIHZhciBvbiA9IGNvbm5lY3Rpb25zW1wiTk9URVwiXTtcbiAgICBpZiAob24ubGVuZ3RoID09PSAwKSB7XG4gICAgICBnW1wicGxheV9ub3RlXCJdW1wibm90ZVwiXSA9IHBhcnNlRmxvYXQodGhpcy5kaWFsc1tcIm5vdGVcIl0udmFsdWUudG9GaXhlZCgwKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdbXCJwbGF5X25vdGVcIl1bXCJhdXRvX25vdGVcIl0gPSBvblswXTtcbiAgICB9XG4gICAgdmFyIG9uID0gY29ubmVjdGlvbnNbXCJWRUxcIl07XG4gICAgaWYgKG9uLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZ1tcInBsYXlfbm90ZVwiXVtcInZlbG9jaXR5XCJdID0gcGFyc2VGbG9hdCh0aGlzLmRpYWxzW1widmVsb2NpdHlcIl0udmFsdWUudG9GaXhlZCgwKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdbXCJwbGF5X25vdGVcIl1bXCJhdXRvX3ZlbG9jaXR5XCJdID0gb25bMF07XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgdmFyIG9uID0gY29ubmVjdGlvbnNbXCJUUklHXCJdO1xuICAgIGZvciAodmFyIG8gb2Ygb24pIHtcbiAgICAgIHJlc3VsdC5wdXNoKG8oZykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGVVbml0LCBJbnB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IFRSSUdHRVJfVFlQRSwgSU5UX1RZUEUsIElOVF9BUlJBWV9UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFBsYXlOb3RlcyBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3RvcihjaGFubmVsTnIpIHtcbiAgICBzdXBlcihcInBsYXlfbm90ZXNcIik7XG4gICAgdGhpcy5jaGFubmVsTnIgPSBjaGFubmVsTnI7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJUUklHXCI6IG5ldyBJbnB1dFNvY2tldCgyOSwgdGhpcy5oIC0gMjksIFwiVFJJR1wiLCBUUklHR0VSX1RZUEUpLFxuICAgICAgXCJOT1RFU1wiOiBuZXcgSW5wdXRTb2NrZXQoNzksIHRoaXMuaCAtIDI5LCBcIk5PVEVTXCIsIElOVF9BUlJBWV9UWVBFKSxcbiAgICAgIFwiVkVMXCI6IG5ldyBJbnB1dFNvY2tldCgxMjksIHRoaXMuaCAtIDI5LCBcIlZFTFwiLCBJTlRfVFlQRSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgICBcInZlbG9jaXR5XCI6IG5ldyBEaWFsKDc5LCA1OSwgXCJWRUxcIiwgMC4wLCAxMjguMCwgOTAuMCksXG4gICAgICBcImR1cmF0aW9uXCI6IG5ldyBEaWFsKDEyOSwgNTksIFwiRFVSXCIsIDAuMCwgMTAuMCwgMS4wKSxcbiAgICB9XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZU91dHB1dCc7XG4gIH1cblxuICBjb21waWxlKGNvbm5lY3Rpb25zKSB7XG4gICAgdmFyIGcgPSB7XCJwbGF5X25vdGVzXCI6IHtcbiAgICAgIFwiZHVyYXRpb25cIjogdGhpcy5kaWFsc1tcImR1cmF0aW9uXCJdLnZhbHVlLFxuICAgICAgXCJjaGFubmVsXCI6IHRoaXMuY2hhbm5lbE5yLFxuICAgIH19O1xuICAgIHZhciBvbiA9IGNvbm5lY3Rpb25zW1wiTk9URVNcIl07XG4gICAgaWYgKG9uLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdbXCJwbGF5X25vdGVzXCJdW1wiYXV0b19ub3Rlc1wiXSA9IG9uWzBdO1xuICAgIH1cbiAgICB2YXIgb24gPSBjb25uZWN0aW9uc1tcIlZFTFwiXTtcbiAgICBpZiAob24ubGVuZ3RoID09PSAwKSB7XG4gICAgICBnW1wicGxheV9ub3Rlc1wiXVtcInZlbG9jaXR5XCJdID0gcGFyc2VGbG9hdCh0aGlzLmRpYWxzW1widmVsb2NpdHlcIl0udmFsdWUudG9GaXhlZCgwKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdbXCJwbGF5X25vdGVzXCJdW1wiYXV0b192ZWxvY2l0eVwiXSA9IG9uWzBdO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSBbXVxuICAgIHZhciBvbiA9IGNvbm5lY3Rpb25zW1wiVFJJR1wiXTtcbiAgICBmb3IgKHZhciBvIG9mIG9uKSB7XG4gICAgICByZXN1bHQucHVzaChvKGcpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IFRSSUdHRVJfVFlQRSwgQ0xPQ0tfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBQdWxzZSBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3RvcihldmVyeSkge1xuICAgIHN1cGVyKFwicHVsc2VcIik7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJDTE9DS1wiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIkNMT0NLXCIsIENMT0NLX1RZUEUpLFxuICAgICAgXCJUUklHXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIlRSSUdcIiwgVFJJR0dFUl9UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscyA9IHtcbiAgICAgIFwiZXZlcnlcIjogbmV3IERpYWwoMjksIDU5LCBcIkVWRVJZXCIsIDAuMCwgMTAuMCwgMS4wKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscy5ldmVyeS52YWx1ZSA9IGV2ZXJ5IHx8IDE7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZVB1bHNlJztcbiAgfVxuXG4gIGNvbXBpbGUoY29ubmVjdGlvbnMpIHtcbiAgICB2YXIgZyA9IHtcInJlcGVhdFwiOiB7XG4gICAgICAgIFwiZXZlcnlcIjogdGhpcy5kaWFsc1tcImV2ZXJ5XCJdLnZhbHVlLFxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuICgoZykgPT4ge1xuICAgICAgcmV0dXJuIChzZXEpID0+IHtcbiAgICAgICAgZy5yZXBlYXQuc2VxdWVuY2UgPSBzZXE7XG4gICAgICAgIHJldHVybiBnO1xuICAgICAgfVxuICAgfSkoZyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZVVuaXQsIE91dHB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IElOVF9UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFJhbmdlIGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIk9VVFwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJPVVRcIiwgSU5UX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmRpYWxzID0ge1xuICAgICAgXCJmcm9tXCI6IG5ldyBEaWFsKDI5LCA1OSwgXCJGUk9NXCIsIDAuMCwgMTI3LjAsIDAuMCksXG4gICAgICBcInRvXCI6IG5ldyBEaWFsKDc5LCA1OSwgXCJUT1wiLCAwLjAsIDEyNy4wLCAxMjcuMCksXG4gICAgICBcInN0ZXBcIjogbmV3IERpYWwoMTI5LCA1OSwgXCJTVEVQXCIsIDAuMCwgMTI4LjAsIDEuMCksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVJbnQnO1xuICB9XG5cbiAgY29tcGlsZShjb25uZWN0aW9ucykge1xuICAgIHZhciBnID0ge307XG4gICAgZ1t0aGlzLnR5cGVdID0ge1xuICAgICAgXCJmcm9tXCI6IHRoaXMuZGlhbHMuZnJvbS52YWx1ZSxcbiAgICAgIFwidG9cIjogdGhpcy5kaWFscy50by52YWx1ZSxcbiAgICAgIFwic3RlcFwiOiB0aGlzLmRpYWxzLnN0ZXAudmFsdWUsXG4gICAgfTtcbiAgICByZXR1cm4gZztcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IElOVF9UWVBFLCBJTlRfQVJSQVlfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmNsYXNzIEJhc2VSZWdpc3RlciBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3Rvcihzb2NrZXRUeXBlKSB7XG4gICAgc3VwZXIoXCJyZWdpc3RlclwiKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIk9VVFwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJPVVRcIiwgc29ja2V0VHlwZSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgICBcInJlZ2lzdGVyXCI6IG5ldyBEaWFsKDI5LCA1OSwgXCJWQUxVRVwiLCAwLCAxNiwgMC4wKSxcbiAgICB9XG4gICAgaWYgKHNvY2tldFR5cGUgPT0gSU5UX1RZUEUpIHtcbiAgICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVJbnQnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlSW50QXJyYXknO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBpbGUoY29ubmVjdGlvbnMpIHtcbiAgICB2YXIgZyA9IHt9O1xuICAgIGdbdGhpcy50eXBlXSA9IHBhcnNlRmxvYXQodGhpcy5kaWFscy5yZWdpc3Rlci52YWx1ZS50b0ZpeGVkKDApKTtcbiAgICByZXR1cm4gZztcbiAgfVxufVxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyIGV4dGVuZHMgQmFzZVJlZ2lzdGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoSU5UX1RZUEUpO1xuICB9XG59XG5leHBvcnQgY2xhc3MgSW50QXJyYXlSZWdpc3RlciBleHRlbmRzIEJhc2VSZWdpc3RlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKElOVF9BUlJBWV9UWVBFKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IElOVF9UWVBFLCBJTlRfQVJSQVlfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmNsYXNzIEJhc2VSZWdpc3RlckluZGV4IGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHNvY2tldFR5cGUpIHtcbiAgICBzdXBlcihcImluZGV4XCIpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiSU5cIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJJTlwiLCBzb2NrZXRUeXBlKSxcbiAgICAgIFwiSU5ERVhcIjogbmV3IElucHV0U29ja2V0KDc5LCB0aGlzLmggLSAyOSwgXCJJTkRFWFwiLCBJTlRfVFlQRSksXG4gICAgICBcIk9VVFwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJPVVRcIiwgc29ja2V0VHlwZSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgICBcImluZGV4XCI6IG5ldyBEaWFsKDc5LCA1OSwgXCJJTkRFWFwiLCAwLCAxNiwgMC4wKSxcbiAgICB9XG4gICAgaWYgKHNvY2tldFR5cGUgPT0gSU5UX1RZUEUpIHtcbiAgICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVJbnQnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlSW50QXJyYXknO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBpbGUoY29ubmVjdGlvbnMpIHtcbiAgICB2YXIgZyA9IHtcImluZGV4XCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBwYXJzZUZsb2F0KHRoaXMuZGlhbHMuaW5kZXgudmFsdWUudG9GaXhlZCgwKSksXG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgYXV0b1ZhbHVlID0gY29ubmVjdGlvbnNbXCJJTkRFWFwiXTtcbiAgICBpZiAoYXV0b1ZhbHVlKSB7XG4gICAgICBpZiAoYXV0b1ZhbHVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAoYXV0b1ZhbHVlWzBdKSB7XG4gICAgICAgICAgZy5pbmRleC5hdXRvX3ZhbHVlID0gYXV0b1ZhbHVlWzBdO1xuICAgICAgICB9IFxuICAgICAgfVxuICAgIH1cbiAgICB2YXIgb24gPSBjb25uZWN0aW9uc1tcIklOXCJdO1xuICAgIGlmICghb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAob24ubGVuZ3RoID09PSAxKSB7XG4gICAgICBpZiAoIW9uWzBdKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKG9uWzBdKSkge1xuICAgICAgICBnW1wiaW5kZXhcIl1ba2V5XSA9IG9uWzBdW2tleV07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiaW5wdXRzIHRvIGluZGV4ICE9IDFcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGc7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludEFycmF5UmVnaXN0ZXJJbmRleCBleHRlbmRzIEJhc2VSZWdpc3RlckluZGV4IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoSU5UX0FSUkFZX1RZUEUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGVVbml0LCBJbnB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IFRSSUdHRVJfVFlQRSwgSU5UX1RZUEUsIElOVF9BUlJBWV9UWVBFfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5cbmV4cG9ydCBjbGFzcyBSZWdpc3Rlck91dHB1dCBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3Rvcih0eXBlLCBzb2NrZXRUeXBlLCByZWdpc3Rlcikge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiVFJJR1wiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIlRSSUdcIiwgVFJJR0dFUl9UWVBFKSxcbiAgICAgIFwiVkFMVUVcIjogbmV3IElucHV0U29ja2V0KDc5LCB0aGlzLmggLSAyOSwgXCJWQUxVRVwiLCBzb2NrZXRUeXBlIHx8IElOVF9UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5yZWdpc3RlciA9IHJlZ2lzdGVyO1xuICAgIHRoaXMuZGlhbHMgPSB7fVxuICAgIGlmIChzb2NrZXRUeXBlICE9IElOVF9BUlJBWV9UWVBFKSB7XG4gICAgICB0aGlzLmRpYWxzW1widmFsdWVcIl0gPSAgbmV3IERpYWwoMjksIDU5LCBcIlZBTFVFXCIsIDAuMCwgMTI4LjAsIDEuMCk7XG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVPdXRwdXQnO1xuICB9XG4gIGNvbXBpbGUoY29ubmVjdGlvbnMpIHtcbiAgICB2YXIgZyA9IHt9O1xuICAgIGdbdGhpcy50eXBlXSA9IHtcbiAgICAgIFwicmVnaXN0ZXJcIjogdGhpcy5yZWdpc3RlcixcbiAgICB9XG5cbiAgICB2YXIgdmFsID0gY29ubmVjdGlvbnNbXCJWQUxVRVwiXTtcbiAgICBpZiAodmFsLmxlbmd0aCA9PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSBlbHNlIGlmICh2YWwubGVuZ3RoID09IDEpIHtcbiAgICAgIGdbdGhpcy50eXBlXVtcImF1dG9fdmFsdWVcIl0gPSB2YWxbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwibW9yZSB0aGFuIG9uZSBpbnB1dCB0byByZWdpc3RlciBzZXRcIik7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIG9uID0gY29ubmVjdGlvbnNbXCJUUklHXCJdO1xuICAgIGZvciAodmFyIG8gb2Ygb24pIHtcbiAgICAgIHJlc3VsdC5wdXNoKG8oZykpXG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgT3V0cHV0U29ja2V0IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgQ0xPQ0tfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBTZXF1ZW5jZUlucHV0IGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIkNMT0NLXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIkNMT0NLXCIsIENMT0NLX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlT3V0cHV0JztcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IElOVF9UWVBFLCBJTlRfQVJSQVlfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmNsYXNzIEJhc2VUcmFuc3Bvc2UgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3Ioc29ja2V0VHlwZSkge1xuICAgIHN1cGVyKFwidHJhbnNwb3NlXCIpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiSU5cIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJJTlwiLCBzb2NrZXRUeXBlKSxcbiAgICAgIFwiT1VUXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIk9VVFwiLCBzb2NrZXRUeXBlKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscyA9IHtcbiAgICAgIFwidHJhbnNwb3NlXCI6IG5ldyBEaWFsKDI5LCA1OSwgXCJWQUxVRVwiLCAtMTI3LjAsIDEyNy4wLCAwLjApLFxuICAgIH1cbiAgICBpZiAoc29ja2V0VHlwZSA9PSBJTlRfVFlQRSkge1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZUludCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVJbnRBcnJheSc7XG4gICAgfVxuICB9XG5cbiAgY29tcGlsZShjb25uZWN0aW9ucykge1xuICAgIHZhciBnID0ge307XG4gICAgZ1t0aGlzLnR5cGVdID0ge1xuICAgICAgXCJ2YWx1ZVwiOiBwYXJzZUZsb2F0KHRoaXMuZGlhbHMudHJhbnNwb3NlLnZhbHVlLnRvRml4ZWQoMCkpLFxuICAgIH07XG4gICAgdmFyIG9uID0gY29ubmVjdGlvbnNbXCJJTlwiXTtcbiAgICBpZiAoIW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKG9uLmxlbmd0aCA9PT0gMSkge1xuICAgICAgaWYgKCFvblswXSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhvblswXSkpIHtcbiAgICAgICAgZ1t0aGlzLnR5cGVdW2tleV0gPSBvblswXVtrZXldO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcImlucHV0cyB0byB0cmFuc3Bvc2UgIT0gMVwiKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZztcbiAgfVxufVxuZXhwb3J0IGNsYXNzIFRyYW5zcG9zZSBleHRlbmRzIEJhc2VUcmFuc3Bvc2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihJTlRfVFlQRSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRyYW5zcG9zZUludEFycmF5IGV4dGVuZHMgQmFzZVRyYW5zcG9zZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKElOVF9BUlJBWV9UWVBFKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGF0Y2hhYmxlLCBDTE9DS19UWVBFLCBJTlRfVFlQRSwgSU5UX0FSUkFZX1RZUEUsIFRSSUdHRVJfVFlQRSB9IGZyb20gJy4uL21vZGVsLyc7XG5pbXBvcnQgeyBGYWN0b3J5LCBTZXF1ZW5jZUlucHV0LCBQbGF5Tm90ZSwgUGxheU5vdGVzLCBQdWxzZSwgRXVjbGlkaWFuLCBUcmFuc3Bvc2UsIFRyYW5zcG9zZUludEFycmF5LCBPZmZzZXQsIFJlZ2lzdGVyT3V0cHV0IH0gZnJvbSAnLi9tb2R1bGVfdW5pdHMvJztcbmltcG9ydCB7IE1vZHVsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IFJlZ2lzdGVyIH0gZnJvbSAnLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlIGV4dGVuZHMgUGF0Y2hhYmxlIHtcbiAgY29uc3RydWN0b3IodGFyZ2V0LCBtb2R1bGVzLCBwYXRjaGVzKSB7XG4gICAgc3VwZXIobW9kdWxlcywgcGF0Y2hlcyk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQgfHwgMTtcbiAgfVxuXG4gIGxvYWRGcm9tRGVmaW5pdGlvbihzZXF1ZW5jZURlZikge1xuXG4gICAgdGhpcy5tb2R1bGVzID0gW1xuICAgICAgbmV3IE1vZHVsZSh0aGlzLCAxMCwgNDAsIG5ldyBTZXF1ZW5jZUlucHV0KCdpbnB1dCcpKSwgXG4gICAgXTtcbiAgICB0aGlzLnBhdGNoZXMgPSBbXTtcblxuICAgIGlmICghc2VxdWVuY2VEZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5sb2FkU2VxdWVuY2Uoc2VxdWVuY2VEZWYsIDApO1xuICB9XG5cbiAgY29tcGlsZSgpIHtcbiAgICB2YXIgcXVldWUgPSBbXTtcbiAgICB2YXIgc2VlbiA9IHt9O1xuICAgIHZhciBkZXBlbmRlbmNpZXMgPSBbXTtcbiAgICB2YXIgb3V0cHV0Tm9kZXMgPSB7XG4gICAgICAgIFwicGxheV9ub3RlXCI6IHRydWUsXG4gICAgICAgIFwicGxheV9ub3Rlc1wiOiB0cnVlLFxuICAgICAgICBcInJlZ2lzdGVyXCI6IHRydWUsXG4gICAgICAgIFwiZmxvYXRfcmVnaXN0ZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJhcnJheV9yZWdpc3RlclwiOiB0cnVlLFxuICAgIH07XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG0gPSB0aGlzLm1vZHVsZXNbaV07XG4gICAgICBpZiAob3V0cHV0Tm9kZXNbbS51bml0LnR5cGVdKSB7XG4gICAgICAgIHF1ZXVlLnB1c2goaSk7XG4gICAgICB9XG4gICAgfVxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgcSA9IHF1ZXVlWzBdO1xuICAgICAgdmFyIHF1ZXVlID0gcXVldWUuc3BsaWNlKDEpO1xuICAgICAgaWYgKHNlZW5bcV0pIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGRlcGVuZGVuY2llcy5wdXNoKHEpO1xuICAgICAgZm9yICh2YXIgcCBvZiB0aGlzLnBhdGNoZXMpIHtcbiAgICAgICAgdmFyIG1vZFNvY2tldHMgPSB0aGlzLm1vZHVsZXNbcV0udW5pdC5zb2NrZXRzO1xuICAgICAgICBpZiAocC50byA9PT0gcSAmJiBtb2RTb2NrZXRzW3AudG9Tb2NrZXRdICYmIG1vZFNvY2tldHNbcC50b1NvY2tldF0uaXNJbnB1dCkge1xuICAgICAgICAgIGlmICghc2VlbltwLmZyb21dKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKHAuZnJvbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHAuZnJvbSA9PT0gcSAmJiBtb2RTb2NrZXRzW3AuZnJvbVNvY2tldF0gJiYgbW9kU29ja2V0c1twLmZyb21Tb2NrZXRdLmlzSW5wdXQpIHtcbiAgICAgICAgICBpZiAoIXNlZW5bcC5mcm9tXSkge1xuICAgICAgICAgICAgcXVldWUucHVzaChwLnRvKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNlZW5bcV0gPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgc2VxdWVuY2VzID0ge307XG4gICAgZm9yICh2YXIgaSA9IGRlcGVuZGVuY2llcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGl4ID0gZGVwZW5kZW5jaWVzW2ldO1xuICAgICAgdmFyIHVuaXQgPSB0aGlzLm1vZHVsZXNbaXhdLnVuaXQ7XG5cbiAgICAgIHZhciBjb25uZWN0aW9ucyA9IHt9O1xuICAgICAgZm9yICh2YXIgc29ja2V0SWQgb2YgT2JqZWN0LmtleXModW5pdC5zb2NrZXRzKSkge1xuICAgICAgICBpZiAodW5pdC5zb2NrZXRzW3NvY2tldElkXS5pc0lucHV0KSB7XG4gICAgICAgICAgY29ubmVjdGlvbnNbc29ja2V0SWRdID0gdGhpcy5nZXRDb25uZWN0ZWRTZXF1ZW5jZXMoc2VxdWVuY2VzLCBpeCwgc29ja2V0SWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodW5pdC50eXBlID09IFwicGxheV9ub3RlXCIgfHwgdW5pdC50eXBlID09IFwicGxheV9ub3Rlc1wiIHx8IHVuaXQgaW5zdGFuY2VvZiBSZWdpc3Rlck91dHB1dCkge1xuICAgICAgICBmb3IgKHZhciBvIG9mIHVuaXQuY29tcGlsZShjb25uZWN0aW9ucykpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChvKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGcgPSB1bml0LmNvbXBpbGUoY29ubmVjdGlvbnMpO1xuICAgICAgICBzZXF1ZW5jZXNbaXhdID0gZztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHJlc3VsdFswXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgXCJjb21iaW5lXCI6IHJlc3VsdCxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcGFyc2VEdXJhdGlvbihkdXJhdGlvbikge1xuICAgIGlmICh0eXBlb2YgZHVyYXRpb24gPT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBkdXJhdGlvbjtcbiAgICB9XG4gICAgdmFyIGdyYW51bGFyaXR5ID0gNjQ7XG4gICAgaWYgKGR1cmF0aW9uID09IFwiVGhpcnR5c2Vjb25kXCIpIHtcbiAgICAgIHJldHVybiAwLjEyNTtcbiAgICB9IGVsc2UgaWYgKGR1cmF0aW9uID09IFwiU2l4dGVlbnRoXCIpIHtcbiAgICAgIHJldHVybiAwLjI1O1xuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPT0gXCJFaWdodFwiKSB7XG4gICAgICByZXR1cm4gMC41O1xuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPT0gXCJRdWFydGVyXCIpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPT0gXCJIYWxmXCIpIHtcbiAgICAgIHJldHVybiAyO1xuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPT0gXCJXaG9sZVwiKSB7XG4gICAgICByZXR1cm4gNDtcbiAgICB9XG4gIH1cblxuICBsb2FkU2VxdWVuY2Uoc2VxdWVuY2VEZWYsIGlucHV0KSB7XG4gICAgaWYgKHNlcXVlbmNlRGVmW1wiYmVmb3JlXCJdKSB7IC8vIHdlIGZpbHRlciBvdXQgYmVmb3JlLCBiZWNhdXNlIHRoaXMgaXMgaGFuZGxlZCBpbiB0aGUgdGltZWxpbmVcbiAgICAgIHJldHVybiB0aGlzLmxvYWRTZXF1ZW5jZShzZXF1ZW5jZURlZltcImJlZm9yZVwiXVtcInNlcXVlbmNlXCJdLCBpbnB1dCk7XG4gICAgfSBlbHNlIGlmIChzZXF1ZW5jZURlZltcImFmdGVyXCJdKSB7IC8vIHdlIGZpbHRlciBvdXQgYWZ0ZXIsIGJlY2F1c2UgdGhpcyBpcyBoYW5kbGVkIGluIHRoZSB0aW1lbGluZVxuICAgICAgcmV0dXJuIHRoaXMubG9hZFNlcXVlbmNlKHNlcXVlbmNlRGVmW1wiYWZ0ZXJcIl1bXCJzZXF1ZW5jZVwiXSwgaW5wdXQpO1xuICAgIH0gZWxzZSBpZiAoc2VxdWVuY2VEZWZbXCJwbGF5X25vdGVcIl0pIHtcbiAgICAgIHZhciBkZWYgPSBzZXF1ZW5jZURlZltcInBsYXlfbm90ZVwiXTtcbiAgICAgIHZhciBnID0gbmV3IFBsYXlOb3RlKHRoaXMudGFyZ2V0KTtcbiAgICAgIGcuZGlhbHMubm90ZS52YWx1ZSA9IGRlZi5ub3RlIHx8IDEuMDtcbiAgICAgIGcuZGlhbHMudmVsb2NpdHkudmFsdWUgPSBkZWYudmVsb2NpdHkgfHwgMS4wO1xuICAgICAgZy5kaWFscy5kdXJhdGlvbi52YWx1ZSA9IHRoaXMucGFyc2VEdXJhdGlvbihkZWYuZHVyYXRpb24pIHx8IDEuMDtcbiAgICAgIHZhciBpeCA9IHRoaXMuYWRkTW9kdWxlKGcpO1xuICAgICAgaWYgKGRlZltcImF1dG9fdmVsb2NpdHlcIl0pIHtcbiAgICAgICAgdmFyIHZJeCA9IHRoaXMubG9hZEF1dG9tYXRpb24oZGVmW1wiYXV0b192ZWxvY2l0eVwiXSk7XG4gICAgICAgIGlmICh2SXggIT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9hZGRQYXRjaChpeCwgdkl4LCBcIlZFTFwiLCBcIk9VVFwiLCBJTlRfVFlQRSk7XG4gICAgICAgIH1cbiAgICAgIH0gXG4gICAgICBpZiAoZGVmW1wiYXV0b19ub3RlXCJdKSB7XG4gICAgICAgIHZhciB2SXggPSB0aGlzLmxvYWRBdXRvbWF0aW9uKGRlZltcImF1dG9fbm90ZVwiXSk7XG4gICAgICAgIGlmICh2SXggIT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9hZGRQYXRjaChpeCwgdkl4LCBcIk5PVEVcIiwgXCJPVVRcIiwgSU5UX1RZUEUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZGVmW1wiZXZlcnlcIl0pIHtcbiAgICAgICAgdmFyIHB1bHNlSXggPSB0aGlzLmFkZE1vZHVsZShuZXcgUHVsc2UodGhpcy5wYXJzZUR1cmF0aW9uKGRlZltcImV2ZXJ5XCJdKSkpO1xuICAgICAgICB0aGlzLl9hZGRQYXRjaChpbnB1dCwgcHVsc2VJeCwgXCJDTE9DS1wiLCBcIkNMT0NLXCIsIENMT0NLX1RZUEUpO1xuICAgICAgICB0aGlzLl9hZGRQYXRjaChpeCwgcHVsc2VJeCwgXCJUUklHXCIsIFwiVFJJR1wiLCBUUklHR0VSX1RZUEUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl4O1xuICAgIH0gZWxzZSBpZiAoc2VxdWVuY2VEZWZbXCJjb21iaW5lXCJdKSB7XG4gICAgICB2YXIgc2VxcyA9IFtdO1xuICAgICAgZm9yICh2YXIgaURlZiBvZiBzZXF1ZW5jZURlZltcImNvbWJpbmVcIl0pIHtcbiAgICAgICAgdmFyIGl4ID0gdGhpcy5sb2FkU2VxdWVuY2UoaURlZiwgaW5wdXQpO1xuICAgICAgICBpZiAoaXgpIHtcbiAgICAgICAgICBzZXFzLnB1c2goaXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VxcztcbiAgICB9IGVsc2UgaWYgKHNlcXVlbmNlRGVmW1wicGxheV9ub3Rlc1wiXSkge1xuICAgICAgdmFyIGRlZiA9IHNlcXVlbmNlRGVmW1wicGxheV9ub3Rlc1wiXTtcbiAgICAgIHZhciBnID0gbmV3IFBsYXlOb3Rlcyh0aGlzLnRhcmdldCk7XG4gICAgICB2YXIgaXggPSB0aGlzLmFkZE1vZHVsZShnKTtcblxuICAgICAgaWYgKGRlZltcImF1dG9fdmVsb2NpdHlcIl0pIHtcbiAgICAgICAgdmFyIHZJeCA9IHRoaXMubG9hZEF1dG9tYXRpb24oZGVmW1wiYXV0b192ZWxvY2l0eVwiXSk7XG4gICAgICAgIGlmICh2SXggIT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9hZGRQYXRjaChpeCwgdkl4LCBcIlZFTFwiLCBcIk9VVFwiLCBJTlRfVFlQRSk7XG4gICAgICAgIH1cbiAgICAgIH0gXG4gICAgICBpZiAoZGVmW1wiYXV0b19ub3Rlc1wiXSkge1xuICAgICAgICB2YXIgdkl4ID0gdGhpcy5sb2FkSW50QXJyYXlBdXRvbWF0aW9uKGRlZltcImF1dG9fbm90ZXNcIl0pO1xuICAgICAgICBpZiAodkl4ICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fYWRkUGF0Y2goaXgsIHZJeCwgXCJOT1RFU1wiLCBcIk9VVFwiLCBJTlRfQVJSQVlfVFlQRSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChkZWZbXCJldmVyeVwiXSkge1xuICAgICAgICB2YXIgcHVsc2VJeCA9IHRoaXMuYWRkTW9kdWxlKG5ldyBQdWxzZSh0aGlzLnBhcnNlRHVyYXRpb24oZGVmW1wiZXZlcnlcIl0pKSk7XG4gICAgICAgIHRoaXMuX2FkZFBhdGNoKGlucHV0LCBwdWxzZUl4LCBcIkNMT0NLXCIsIFwiQ0xPQ0tcIiwgQ0xPQ0tfVFlQRSk7XG4gICAgICAgIHRoaXMuX2FkZFBhdGNoKGl4LCBwdWxzZUl4LCBcIlRSSUdcIiwgXCJUUklHXCIsIFRSSUdHRVJfVFlQRSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXg7XG4gICAgfSBlbHNlIGlmIChzZXF1ZW5jZURlZltcInJlcGVhdFwiXSkge1xuICAgICAgdmFyIGRlZiA9IHNlcXVlbmNlRGVmW1wicmVwZWF0XCJdO1xuICAgICAgdmFyIGcgPSBuZXcgUHVsc2UodGhpcy5wYXJzZUR1cmF0aW9uKGRlZi5ldmVyeSkpO1xuICAgICAgdmFyIGl4ID0gdGhpcy5hZGRNb2R1bGUoZyk7XG4gICAgICB2YXIgYUl4ID0gdGhpcy5sb2FkU2VxdWVuY2UoZGVmLnNlcXVlbmNlKTtcbiAgICAgIGlmIChhSXggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRQYXRjaChpeCwgYUl4LCBcIlRSSUdcIiwgXCJUUklHXCIsIFRSSUdHRVJfVFlQRSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9hZGRQYXRjaChpbnB1dCwgaXgsIFwiQ0xPQ0tcIiwgXCJDTE9DS1wiLCBDTE9DS19UWVBFKTtcbiAgICAgIHJldHVybiBpeDtcbiAgICB9IGVsc2UgaWYgKHNlcXVlbmNlRGVmW1wib2Zmc2V0XCJdKSB7XG4gICAgICAvLyBUT0RPIGZpeD9cbiAgICAgIGNvbnNvbGUubG9nKFwiV0FUQ0ggT1VUIEZPUiBvZmZzZXRcIiwgc2VxdWVuY2VEZWZbXCJvZmZzZXRcIl0pO1xuICAgICAgdmFyIGRlZiA9IHNlcXVlbmNlRGVmW1wib2Zmc2V0XCJdO1xuICAgICAgdmFyIGcgPSBuZXcgT2Zmc2V0KCk7XG4gICAgICBnLmRpYWxzLm9mZnNldC52YWx1ZSA9IGRlZi5vZmZzZXQgfHwgMDtcbiAgICAgIHZhciBpeCA9IHRoaXMuYWRkTW9kdWxlKGcpO1xuICAgICAgdmFyIGFJeCA9IHRoaXMubG9hZFNlcXVlbmNlKGRlZi5zZXF1ZW5jZSk7XG4gICAgICBpZiAoYUl4ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYWRkUGF0Y2goaXgsIGFJeCwgXCJPVVRcIiwgXCJDTE9DS1wiLCBDTE9DS19UWVBFKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2FkZFBhdGNoKGlucHV0LCBpeCwgXCJDTE9DS1wiLCBcIkNMT0NLXCIsIENMT0NLX1RZUEUpO1xuICAgICAgcmV0dXJuIGl4O1xuICAgIH0gZWxzZSBpZiAoc2VxdWVuY2VEZWZbXCJldWNsaWRpYW5cIl0pIHtcbiAgICAgIHZhciBkZWYgPSBzZXF1ZW5jZURlZltcImV1Y2xpZGlhblwiXTtcbiAgICAgIHZhciBnID0gbmV3IEV1Y2xpZGlhbigpO1xuICAgICAgZy5kaWFscy5wdWxzZXMudmFsdWUgPSBkZWYucHVsc2VzIHx8IDE7XG4gICAgICBnLmRpYWxzLm92ZXIudmFsdWUgPSBkZWYub3ZlciB8fCAxO1xuICAgICAgdmFyIGl4ID0gdGhpcy5hZGRNb2R1bGUoZyk7XG4gICAgICB2YXIgYUl4ID0gdGhpcy5sb2FkU2VxdWVuY2UoZGVmLnNlcXVlbmNlKTtcbiAgICAgIHRoaXMuX2FkZFBhdGNoKGl4LCBhSXgsIFwiVFJJR1wiLCBcIlRSSUdcIiwgVFJJR0dFUl9UWVBFKTtcbiAgICAgIHRoaXMuX2FkZFBhdGNoKGlucHV0LCBpeCwgXCJDTE9DS1wiLCBcIkNMT0NLXCIsIENMT0NLX1RZUEUpO1xuICAgICAgcmV0dXJuIGl4O1xuICAgIH0gZWxzZSBpZiAoc2VxdWVuY2VEZWZbXCJhcnJheV9yZWdpc3RlclwiXSkge1xuICAgICAgdmFyIGRlZiA9IHNlcXVlbmNlRGVmLmFycmF5X3JlZ2lzdGVyO1xuICAgICAgdmFyIGcgPSBuZXcgUmVnaXN0ZXJPdXRwdXQoXCJhcnJheV9yZWdpc3RlclwiLCBJTlRfQVJSQVlfVFlQRSwgZGVmLnJlZ2lzdGVyKTtcbiAgICAgIHZhciBpeCA9IHRoaXMuYWRkTW9kdWxlKGcpO1xuICAgICAgaWYgKGRlZltcImF1dG9fdmFsdWVcIl0pIHtcbiAgICAgICAgdmFyIGFJeCA9IHRoaXMubG9hZEludEFycmF5QXV0b21hdGlvbihkZWYuYXV0b192YWx1ZSk7XG4gICAgICAgIGlmIChhSXggIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX2FkZFBhdGNoKGl4LCBhSXgsIFwiVkFMVUVcIiwgXCJPVVRcIiwgSU5UX0FSUkFZX1RZUEUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaXg7XG4gICAgfSBlbHNlIGlmIChzZXF1ZW5jZURlZltcInJlZ2lzdGVyXCJdKSB7XG4gICAgICB2YXIgZGVmID0gc2VxdWVuY2VEZWYucmVnaXN0ZXI7XG4gICAgICB2YXIgZyA9IG5ldyBSZWdpc3Rlck91dHB1dChcInJlZ2lzdGVyXCIsIElOVF9UWVBFLCBkZWYucmVnaXN0ZXIpO1xuICAgICAgZy5kaWFscy52YWx1ZS52YWx1ZSA9IGRlZi52YWx1ZSB8fCAwO1xuICAgICAgdmFyIGl4ID0gdGhpcy5hZGRNb2R1bGUoZyk7XG4gICAgICBpZiAoZGVmW1wiYXV0b192YWx1ZVwiXSkge1xuICAgICAgICB2YXIgYUl4ID0gdGhpcy5sb2FkQXV0b21hdGlvbihkZWYuYXV0b192YWx1ZSk7XG4gICAgICAgIGlmIChhSXggIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX2FkZFBhdGNoKGl4LCBhSXgsIFwiVkFMVUVcIiwgXCJPVVRcIiwgSU5UX1RZUEUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaXg7XG4gICAgfSBlbHNlIGlmIChzZXF1ZW5jZURlZltcInBhbm5pbmdcIl0pIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiVW5zdXBwb3J0ZWQgc2VxdWVuY2UgZGVmXCIsIHNlcXVlbmNlRGVmKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlVuc3VwcG9ydGVkIHNlcXVlbmNlIGRlZlwiLCBzZXF1ZW5jZURlZik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBsb2FkQXV0b21hdGlvbihhdXRvbWF0aW9uRGVmKSB7XG4gICAgLy9jb25zb2xlLmxvZyhcIkxvYWRpbmcgYXV0b21hdGlvblwiLCBhdXRvbWF0aW9uRGVmKTtcbiAgICBpZiAoYXV0b21hdGlvbkRlZltcImJhY2tfYW5kX2ZvcnRoXCJdKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlVuc3VwcG9ydGVkIGF1dG9tYXRpb24gZGVmXCIsIGF1dG9tYXRpb25EZWYpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIGlmIChhdXRvbWF0aW9uRGVmW1wiY3ljbGVcIl0pIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiVW5zdXBwb3J0ZWQgYXV0b21hdGlvbiBkZWZcIiwgYXV0b21hdGlvbkRlZik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2UgaWYgKGF1dG9tYXRpb25EZWZbXCJyYW5kb21cIl0pIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiVW5zdXBwb3J0ZWQgYXV0b21hdGlvbiBkZWZcIiwgYXV0b21hdGlvbkRlZik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2UgaWYgKGF1dG9tYXRpb25EZWZbXCJmYWRlX2luXCJdICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgIHx8IGF1dG9tYXRpb25EZWZbXCJyYW5nZVwiXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICB8fCBhdXRvbWF0aW9uRGVmW1wic3dlZXBcIl0gIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgfHwgYXV0b21hdGlvbkRlZltcInJlZ2lzdGVyXCJdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBhID0gbmV3IEZhY3RvcnkoKS5hdXRvbWF0aW9uRnJvbURlZmluaXRpb24oYXV0b21hdGlvbkRlZik7XG4gICAgICByZXR1cm4gdGhpcy5hZGRNb2R1bGUoYSk7XG4gICAgfSBlbHNlIGlmIChhdXRvbWF0aW9uRGVmW1widHJhbnNwb3NlXCJdKSB7XG4gICAgICB2YXIgYSA9IG5ldyBUcmFuc3Bvc2UoKTtcbiAgICAgIGEuZGlhbHMudHJhbnNwb3NlLnZhbHVlID0gYXV0b21hdGlvbkRlZltcInRyYW5zcG9zZVwiXS52YWx1ZTtcbiAgICAgIHZhciBpeCA9IHRoaXMuYWRkTW9kdWxlKGEpO1xuICAgICAgdmFyIGFJeCA9IHRoaXMubG9hZEF1dG9tYXRpb24oYXV0b21hdGlvbkRlZltcInRyYW5zcG9zZVwiXSk7XG4gICAgICBpZiAoYUl4ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYWRkUGF0Y2goaXgsIGFJeCwgXCJJTlwiLCBcIk9VVFwiLCBJTlRfVFlQRSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiVW5zdXBwb3J0ZWQgYXV0b21hdGlvbiBkZWZcIiwgYXV0b21hdGlvbkRlZik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBsb2FkSW50QXJyYXlBdXRvbWF0aW9uKGF1dG9tYXRpb25EZWYpIHtcbiAgICBpZiAoYXV0b21hdGlvbkRlZltcInRyYW5zcG9zZVwiXSkge1xuICAgICAgdmFyIGEgPSBuZXcgVHJhbnNwb3NlSW50QXJyYXkoKTtcbiAgICAgIGEuZGlhbHMudHJhbnNwb3NlLnZhbHVlID0gYXV0b21hdGlvbkRlZltcInRyYW5zcG9zZVwiXS52YWx1ZTtcbiAgICAgIHZhciBpeCA9IHRoaXMuYWRkTW9kdWxlKGEpO1xuICAgICAgdmFyIGFJeCA9IHRoaXMubG9hZEludEFycmF5QXV0b21hdGlvbihhdXRvbWF0aW9uRGVmW1widHJhbnNwb3NlXCJdKTtcbiAgICAgIGlmIChhSXggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRQYXRjaChpeCwgYUl4LCBcIklOXCIsIFwiT1VUXCIsIElOVF9BUlJBWV9UWVBFKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpeDtcbiAgICB9IGVsc2UgaWYgKGF1dG9tYXRpb25EZWZbXCJyZWdpc3RlclwiXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgYSA9IG5ldyBGYWN0b3J5KCkuaW50QXJyYXlBdXRvbWF0aW9uRnJvbURlZmluaXRpb24oYXV0b21hdGlvbkRlZik7XG4gICAgICByZXR1cm4gdGhpcy5hZGRNb2R1bGUoYSk7XG4gICAgfSBlbHNlIGlmIChhdXRvbWF0aW9uRGVmW1wiaW5kZXhcIl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGEgPSBuZXcgRmFjdG9yeSgpLmludEFycmF5QXV0b21hdGlvbkZyb21EZWZpbml0aW9uKGF1dG9tYXRpb25EZWYpO1xuICAgICAgdmFyIGl4ID0gdGhpcy5hZGRNb2R1bGUoYSk7XG4gICAgICB2YXIgYUl4ID0gdGhpcy5sb2FkSW50QXJyYXlBdXRvbWF0aW9uKGF1dG9tYXRpb25EZWZbXCJpbmRleFwiXSk7XG4gICAgICBpZiAoYUl4ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYWRkUGF0Y2goaXgsIGFJeCwgXCJJTlwiLCBcIk9VVFwiLCBJTlRfQVJSQVlfVFlQRSk7XG4gICAgICB9XG4gICAgICBpZiAoYXV0b21hdGlvbkRlZltcImluZGV4XCJdW1wiYXV0b192YWx1ZVwiXSkge1xuICAgICAgICBhSXggPSB0aGlzLmxvYWRBdXRvbWF0aW9uKGF1dG9tYXRpb25EZWZbXCJpbmRleFwiXVtcImF1dG9fdmFsdWVcIl0pO1xuICAgICAgICBpZiAoIWFJeCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fYWRkUGF0Y2goaXgsIGFJeCwgXCJJTkRFWFwiLCBcIk9VVFwiLCBJTlRfVFlQRSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpeDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJVbnN1cHBvcnRlZCBpbnRlZ2VyIGFycmF5IGF1dG9tYXRpb24gZGVmXCIsIGF1dG9tYXRpb25EZWYpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29ubmVjdGVkU2VxdWVuY2VzKHNlcXVlbmNlcywgaXgsIGlucHV0KSB7XG4gICAgdmFyIGdzID0gW107XG4gICAgZm9yICh2YXIgcCBvZiB0aGlzLnBhdGNoZXMpIHtcbiAgICAgIGlmIChwLmRvZXNQYXRjaENvbm5lY3RUbyhpeCwgaW5wdXQpKSB7XG4gICAgICAgIGdzLnB1c2goc2VxdWVuY2VzW3AuY29ubmVjdHNUbyhpeCwgaW5wdXQpLm1vZHVsZV0pXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncztcbiAgfVxufVxuIiwiaW1wb3J0IHsgQVVESU9fVFlQRSwgRlJFUVVFTkNZX1RZUEUsIFBBTk5JTkdfVFlQRSwgQ0xPQ0tfVFlQRSwgVFJJR0dFUl9UWVBFLCBJTlRfVFlQRSwgSU5UX0FSUkFZX1RZUEUgfSBmcm9tICcuL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBUaGVtZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucGFkZGluZyA9IDA7XG4gICAgdmFyIHNvY2tldENvbG91cnMgPSB7fTtcbiAgICB2YXIgcGF0Y2hDb2xvdXJzID0ge31cbiAgICBzb2NrZXRDb2xvdXJzW0FVRElPX1RZUEVdID0gJ3JnYigxNDAsIDI1NSwgMjU1KSc7XG4gICAgc29ja2V0Q29sb3Vyc1tGUkVRVUVOQ1lfVFlQRV0gPSAncmdiKDI1NSwgMjU1LCAxNDApJztcbiAgICBzb2NrZXRDb2xvdXJzW1BBTk5JTkdfVFlQRV0gPSAncmdiKDI1NSwgMTQwLCAyNTUpJztcbiAgICBzb2NrZXRDb2xvdXJzW0NMT0NLX1RZUEVdID0gJ3JnYigxMDAsIDEwMCwgMjU1KSc7XG4gICAgc29ja2V0Q29sb3Vyc1tUUklHR0VSX1RZUEVdID0gJ3JnYig1MCwgNTAsIDUwKSc7XG4gICAgc29ja2V0Q29sb3Vyc1tJTlRfVFlQRV0gPSAncmdiKDI1NSwgMjU1LCA0MCknO1xuICAgIHNvY2tldENvbG91cnNbSU5UX0FSUkFZX1RZUEVdID0gJ3JnYigyNTUsIDQwLCA0MCknO1xuICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhzb2NrZXRDb2xvdXJzKSkge1xuICAgICAgcGF0Y2hDb2xvdXJzW2tleV0gPSBSR0JfTGluZWFyX1NoYWRlKDAuMSwgc29ja2V0Q29sb3Vyc1trZXldKTtcbiAgICB9XG4gICAgdGhpcy5jb2xvdXJzID0ge1xuICAgICAgT3V0bGluZUNvbG91cjogJyMzMzMnLFxuICAgICAgQmFja2dyb3VuZDogJyM0NDQnLFxuICAgICAgRm9yZWdyb3VuZDogJyNlZWUnLFxuICAgICAgSW5zdHJ1bWVudEVkaXRvckJhY2tncm91bmQ6ICcjZWVlJyxcblxuICAgICAgU29ja2V0QmFja2dyb3VuZDogJyM5ZmYnLFxuICAgICAgU29ja2V0SW5zaWRlOiAnIzk5OScsXG4gICAgICBTb2NrZXRPdXRsaW5lOiAnIzc3NycsXG5cbiAgICAgIFBhdGNoOiAnIzdmZicsXG5cbiAgICAgIE1vZHVsZU91dGxpbmU6ICcjNzc3JyxcbiAgICAgIE1vZHVsZVRleHQ6ICcjNDQ0JyxcbiAgICAgIE1vZHVsZUdlbmVyYXRvcjogJyNmZmYnLFxuICAgICAgTW9kdWxlRmlsdGVyOiAnI2ZmZCcsXG4gICAgICBNb2R1bGVEZXJpdmVkOiAnI2RkZicsXG4gICAgICBNb2R1bGVPdXRwdXQ6ICcjZGZkJyxcbiAgICAgIE1vZHVsZUludDogJyNmZjknLFxuICAgICAgTW9kdWxlRmxvYXQ6ICcjZjlmJyxcbiAgICAgIE1vZHVsZUludEFycmF5OiAnI2Y5OScsXG4gICAgICBNb2R1bGVQdWxzZTogJyNkZGYnLFxuXG4gICAgICBCdXR0b246ICcjY2NjJyxcbiAgICAgIEJ1dHRvblRleHQ6ICcjMzMzJyxcblxuICAgICAgRGlhbDogJyNjY2MnLFxuICAgICAgRGlhbExpbmU6ICcjNDQ0JyxcblxuICAgICAgU29ja2V0czogc29ja2V0Q29sb3VycyxcbiAgICAgIFBhdGNoZXM6IHBhdGNoQ29sb3VycyxcbiAgICB9O1xuICB9XG59XG5cbmNvbnN0IFJHQl9MaW5lYXJfU2hhZGU9KHAsYyk9PntcbiAgICB2YXIgaT1wYXJzZUludCxyPU1hdGgucm91bmQsW2EsYixjLGRdPWMuc3BsaXQoXCIsXCIpLFA9cDwwLHQ9UD8wOjI1NSpwLFA9UD8xK3A6MS1wO1xuICAgIHJldHVyblwicmdiXCIrKGQ/XCJhKFwiOlwiKFwiKStyKGkoYVszXT09XCJhXCI/YS5zbGljZSg1KTphLnNsaWNlKDQpKSpQK3QpK1wiLFwiK3IoaShiKSpQK3QpK1wiLFwiK3IoaShjKSpQK3QpKyhkP1wiLFwiK2Q6XCIpXCIpO1xufVxuIiwiZXhwb3J0IGNsYXNzIENoYW5uZWxTaWRlQmFyIHtcbiAgY29uc3RydWN0b3IoY2hhbm5lbCwgYXBwLCBwYWRkaW5nLCBwYW5lbFdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsO1xuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIHRoaXMucGFkZGluZyA9IHBhZGRpbmc7XG4gICAgdGhpcy5wYW5lbFdpZHRoID0gcGFuZWxXaWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIGRyYXcoYXBwLCBjb2xvck9mZnNldCkge1xuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gJ3JnYigwLCAnICsgKDIwMCAtIGNvbG9yT2Zmc2V0KSArICcsIDApJztcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gJ3JnYig0MCwgNDAsIDQwLCAxLjApJztcbiAgICBhcHAuY3R4LmZpbGxSZWN0KHRoaXMucGFkZGluZywgdGhpcy5wYWRkaW5nLCB0aGlzLnBhbmVsV2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICBhcHAuY3R4LnN0cm9rZVJlY3QodGhpcy5wYWRkaW5nLCB0aGlzLnBhZGRpbmcsIHRoaXMucGFuZWxXaWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSAncmdiKDI1NSwgMjU1LCAyNTUpJztcbiAgICBhcHAuY3R4LmZvbnQgPSAnMTBweCBzYW5zLXNlcmlmJztcbiAgICBhcHAuY3R4LmZpbGxUZXh0KHRoaXMuY2hhbm5lbC5uYW1lLCB0aGlzLnBhZGRpbmcgKyAzLCB0aGlzLnBhZGRpbmcgKyAxMSk7XG4gIH1cblxuICBoYW5kbGVDbGljaygpIHtcbiAgICB0aGlzLmFwcC5vcGVuSW5zdHJ1bWVudEVkaXRvcih0aGlzLmNoYW5uZWwuaW5zdHJ1bWVudCk7XG4gIH1cblxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgdmFyIHBhdGggPSBuZXcgUGF0aDJEKCk7XG4gICAgcGF0aC5yZWN0KDAsIDAsIHRoaXMucGFuZWxXaWR0aCwgdGhpcy5oZWlnaHQgKyB0aGlzLnBhZGRpbmcgKiAyKTtcbiAgICBpZiAoYXBwLmN0eC5pc1BvaW50SW5QYXRoKHBhdGgsIHgsIHkpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJleHBvcnQgeyBDaGFubmVsVHJhY2ssIFJlZ2lzdGVyVHJhY2sgfSBmcm9tICcuL3RyYWNrLmpzJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IENoYW5uZWxUcmFjayB9IGZyb20gJy4vdHJhY2suanMnO1xuaW1wb3J0IHsgQ2hhbm5lbCB9IGZyb20gJy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBUaW1lbGluZUVkaXRvciB7XG4gIGNvbnN0cnVjdG9yKHRyYWNrcywgYXBwKSB7XG4gICAgdGhpcy50cmFja3MgPSB0cmFja3M7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdmFyIGJ1dHRvbkRlZnMgPSBbXG4gICAgICAgIHtsYWJlbDogXCJDSEFOXCIsIGNvbG91cjogJ01vZHVsZVB1bHNlJywgb25jbGljazogdGhpcy5hZGRDaGFubmVsVHJhY2t9LFxuICAgICAgICB7bGFiZWw6IFwiUkVHXCIsIGNvbG91cjogJ01vZHVsZUludCcsIG9uY2xpY2s6ICgpID0+IG51bGx9LFxuICAgICAgICB7bGFiZWw6IFwiRkxUXCIsIGNvbG91cjogJ01vZHVsZUZsb2F0Jywgb25jbGljazogKCkgPT4gbnVsbH0sXG4gICAgICAgIHtsYWJlbDogXCJBUlJcIiwgY29sb3VyOiAnTW9kdWxlSW50QXJyYXknLCBvbmNsaWNrOiAoKSA9PiBudWxsfSxcbiAgICBdO1xuICAgIHRoaXMuYnV0dG9ucyA9IFtdO1xuICAgIHRoaXMuYWRkQnV0dG9uRGVmaW5pdGlvbnMoYnV0dG9uRGVmcyk7XG4gIH1cbiAgYWRkQ2hhbm5lbFRyYWNrKCkge1xuICAgIHZhciBuZXh0Q2hhbm5lbCA9IDA7XG4gICAgZm9yICh2YXIgdHIgb2YgdGhpcy50cmFja3MpIHtcbiAgICAgIGlmICh0ciBpbnN0YW5jZW9mIENoYW5uZWxUcmFjaykge1xuICAgICAgICBpZiAodHIudW5pdC5jaGFubmVsTnIgPj0gbmV4dENoYW5uZWwpIHtcbiAgICAgICAgICBuZXh0Q2hhbm5lbCA9IHRyLnVuaXQuY2hhbm5lbE5yICsgMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB2YXIgY2ggPSBuZXcgQ2hhbm5lbChuZXh0Q2hhbm5lbCk7XG4gICAgdmFyIHRyYWNrID0gbmV3IENoYW5uZWxUcmFjayhjaCwgdGhpcy5hcHApO1xuICAgIHRoaXMuYXBwLnRyYWNrcy5wdXNoKHRyYWNrKTtcbiAgICB0aGlzLmFwcC5kcmF3KClcbiAgfVxuICBhZGRCdXR0b25EZWZpbml0aW9ucyhidXR0b25EZWZzKSB7XG4gICAgdmFyIHggPSAwO1xuICAgIHZhciBwcmV2ID0gbnVsbDtcbiAgICB2YXIgcGFkZGluZyA9IDA7XG4gICAgdmFyIGdyb3VwUGFkZGluZyA9IDEwO1xuICAgIGZvciAodmFyIGRlZiBvZiBidXR0b25EZWZzKSB7XG4gICAgICB2YXIgYiA9IG5ldyBCdXR0b24oeCwgdGhpcy5hcHAudGhlbWUucGFkZGluZywgZGVmLm9uY2xpY2suYmluZCh0aGlzKSwgZGVmLmxhYmVsKTtcbiAgICAgIGIuY29sb3VyID0gdGhpcy5hcHAudGhlbWUuY29sb3Vyc1tkZWYuY29sb3VyXSB8fCB0aGlzLmFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZUdlbmVyYXRvcjtcbiAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGIpO1xuICAgICAgaWYgKHByZXYgJiYgcHJldi5jb2xvdXIgIT0gZGVmLmNvbG91cikge1xuICAgICAgICB4ICs9IGdyb3VwUGFkZGluZztcbiAgICAgICAgYi54ICs9IGdyb3VwUGFkZGluZztcbiAgICAgIH1cbiAgICAgIHggKz0gYi53ICsgcGFkZGluZztcbiAgICAgIHByZXYgPSBkZWY7XG4gICAgfVxuXG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIHZhciBpID0gMDtcbiAgICBmb3IgKHZhciBiIG9mIHRoaXMuYnV0dG9ucykge1xuICAgICAgdmFyIHYgPSBiLmhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpO1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIGUgb2YgdGhpcy50cmFja3MpIHtcbiAgICAgIHZhciB2ID0gZS5oYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5IC0gKDI1ICsgaSAqIChlLmhlaWdodCArIGUucGFkZGluZyAqIDIpKSk7XG4gICAgICBpZiAodikge1xuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICB9XG4gIH1cbiAgZHJhdyhhcHApIHtcbiAgICBhcHAuY3R4LnNhdmUoKTtcbiAgICB2YXIgaSA9IDA7XG5cbiAgICAvLyBEcmF3IHRoZSBidXR0b25zIFxuICAgIGZvciAodmFyIGIgb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICBiLmRyYXcoYXBwKTtcbiAgICB9XG5cbiAgICAvLyBEcmF3IHRoZSB0cmFja3NcbiAgICBmb3IgKHZhciBlIG9mIHRoaXMudHJhY2tzKSB7XG4gICAgICBhcHAuY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTsgLy8gcmVzZXQgdHJhbnNsYXRlXG4gICAgICBhcHAuY3R4LnRyYW5zbGF0ZSgwLCAyNSArIGkgKiAoZS5oZWlnaHQgKyBlLnBhZGRpbmcgKiAyKSk7XG4gICAgICBlLmRyYXcoYXBwKTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgYXBwLmN0eC5yZXN0b3JlKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBSZWdpc3RlclNpZGVCYXIge1xuICBjb25zdHJ1Y3RvcihyZWdpc3RlciwgYXBwLCBwYWRkaW5nLCBwYW5lbFdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnJlZ2lzdGVyID0gcmVnaXN0ZXI7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5wYWRkaW5nID0gcGFkZGluZztcbiAgICB0aGlzLnBhbmVsV2lkdGggPSBwYW5lbFdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgZHJhdyhhcHAsIGNvbG9yT2Zmc2V0KSB7XG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSAncmdiKDAsICcgKyAoMjAwIC0gY29sb3JPZmZzZXQpICsgJywgMCknO1xuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSAncmdiKDQwLCA0MCwgNDAsIDEuMCknO1xuICAgIGFwcC5jdHguZmlsbFJlY3QodGhpcy5wYWRkaW5nLCB0aGlzLnBhZGRpbmcsIHRoaXMucGFuZWxXaWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIGFwcC5jdHguc3Ryb2tlUmVjdCh0aGlzLnBhZGRpbmcsIHRoaXMucGFkZGluZywgdGhpcy5wYW5lbFdpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMjU1LCAyNTUsIDI1NSknO1xuICAgIGFwcC5jdHguZm9udCA9ICcxMHB4IHNhbnMtc2VyaWYnO1xuICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy5yZWdpc3Rlci50eXBlICsgXCIgXCIgKyB0aGlzLnJlZ2lzdGVyLnJlZ2lzdGVyLCB0aGlzLnBhZGRpbmcgKyAzLCB0aGlzLnBhZGRpbmcgKyAxMSk7XG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU2VxdWVuY2UgfSBmcm9tICcuLi9zZXF1ZW5jZV9lZGl0b3Ivc2VxdWVuY2UuanMnO1xuXG5leHBvcnQgY2xhc3MgUmFuZ2Uge1xuICBjb25zdHJ1Y3RvcihzdGFydCwgc3RvcCkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLnN0b3AgPSBzdG9wO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXF1ZW5jZVRyYWNrIHtcbiAgY29uc3RydWN0b3IodGFyZ2V0LCBzZXF1ZW5jZV9kZWYpIHtcbiAgICB0aGlzLnNlcXVlbmNlX2RlZiA9IG51bGw7XG4gICAgdGhpcy5zZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZSh0YXJnZXQpXG4gICAgdGhpcy5zZXF1ZW5jZS5sb2FkRnJvbURlZmluaXRpb24oc2VxdWVuY2VfZGVmKTtcbiAgICB0aGlzLnJhbmdlcyA9IFtdO1xuICB9XG4gIGFkZFJhbmdlKHN0YXJ0LCBzdG9wKSB7XG4gICAgdGhpcy5yYW5nZXMucHVzaChuZXcgUmFuZ2Uoc3RhcnQgPyBzdGFydCA6IDAsIHN0b3AgPyBzdG9wIDogMTAwMDAwMCkpO1xuICB9XG4gIGNvbXBpbGUoKSB7XG4gICAgaWYgKHRoaXMuc2VxdWVuY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlcXVlbmNlLmNvbXBpbGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZHJhdyhhcHAsIHgsIHksIHcsIGgpIHtcbiAgICB2YXIgc2hvd0JhcnMgPSA2NDtcbiAgICB2YXIgcG9pbnRzSW5SYW5nZSA9IHNob3dCYXJzICogNDtcbiAgICB2YXIgc2NhbGluZyA9IHcgLyBwb2ludHNJblJhbmdlO1xuICAgIHZhciBiYXJXaWR0aCA9IDQgKiBzY2FsaW5nO1xuICAgIGZvciAodmFyIHIgb2YgdGhpcy5yYW5nZXMpIHtcbiAgICAgIHZhciBjb2xvck9mZnNldCA9IDEwO1xuICAgICAgdmFyIHdpZHRoID0gTWF0aC5taW4oKHIuc3RvcCAtIHIuc3RhcnQpICogc2NhbGluZywgdyAtIChyLnN0YXJ0ICogc2NhbGluZykpXG4gICAgICBhcHAuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMzUsIDc1LCAnICsgKDIwMCAtIGNvbG9yT2Zmc2V0KSArICcsIDAuMyknO1xuICAgICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoNSwgNSwgJyArICgyMDAgLSBjb2xvck9mZnNldCkgKyAnLCAwLjYpJztcbiAgICAgIGFwcC5jdHguZmlsbFJlY3QoeCArIHIuc3RhcnQgKiBzY2FsaW5nLCB5LCB3aWR0aCwgaCk7XG4gICAgICBhcHAuY3R4LnN0cm9rZVJlY3QoeCArIHIuc3RhcnQgKiBzY2FsaW5nLCB5LCB3aWR0aCwgaCk7XG4gICAgfVxuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSAncmdiKDcwLCA3MCwgNzAsIDAuOCknO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2hvd0JhcnM7IGkrKykge1xuICAgICAgYXBwLmN0eC5zdHJva2VSZWN0KHggKyBpICogYmFyV2lkdGgsIHksIGJhcldpZHRoLCBoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFNlcXVlbmNlVHJhY2sgfSBmcm9tICcuL3NlcXVlbmNlX3RyYWNrLmpzJztcbmltcG9ydCB7IENoYW5uZWwsIFJlZ2lzdGVyIH0gZnJvbSAnLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIEJhc2VTZXF1ZW5jZVRyYWNrcyB7XG5cbiAgY29uc3RydWN0b3IodW5pdCwgYXBwLCBwYWRkaW5nLCBwYW5lbFdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnVuaXQgPSB1bml0O1xuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIHRoaXMucGFkZGluZyA9IHBhZGRpbmc7XG4gICAgdGhpcy5wYW5lbFdpZHRoID0gcGFuZWxXaWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLnNlcXVlbmNlVHJhY2tzID0gW25ldyBTZXF1ZW5jZVRyYWNrKCldO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMudW5pdCBpbnN0YW5jZW9mIENoYW5uZWwpIHtcbiAgICAgIHRoaXMuYXBwLm9wZW5TZXF1ZW5jZUVkaXRvcih0aGlzLnNlcXVlbmNlVHJhY2tzWzBdLnNlcXVlbmNlLCB0aGlzLnVuaXQuZ2V0Q29tcGlsZVRhcmdldCgpKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudW5pdCBpbnN0YW5jZW9mIFJlZ2lzdGVyKSB7XG4gICAgICB0aGlzLmFwcC5vcGVuUmVnaXN0ZXJTZXF1ZW5jZUVkaXRvcih0aGlzLnNlcXVlbmNlVHJhY2tzWzBdLnNlcXVlbmNlLCB0aGlzLnVuaXQpO1xuXG4gICAgfVxuICB9XG5cbiAgZHJhdyhhcHAsIGNvbG9yT2Zmc2V0KSB7XG4gICAgdmFyIGhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIHZhciBwYWRkaW5nID0gdGhpcy5wYWRkaW5nO1xuICAgIHZhciBwYW5lbFdpZHRoID0gdGhpcy5wYW5lbFdpZHRoO1xuICAgIHZhciB0cmFja1dpZHRoID0gYXBwLmNhbnZhcy53aWR0aCAtIHBhbmVsV2lkdGggLSBwYWRkaW5nICogMjtcblxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gJ3JnYigyNTUsICcgKyAoMjAwIC0gY29sb3JPZmZzZXQpICsgJywgMCknO1xuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSAncmdiKDQwLCA0MCwgNDAsIDEuMCknO1xuICAgIGFwcC5jdHguZmlsbFJlY3QocGFkZGluZyArIHBhbmVsV2lkdGgsIHBhZGRpbmcsIHRyYWNrV2lkdGgsIGhlaWdodCk7XG4gICAgYXBwLmN0eC5zdHJva2VSZWN0KHBhZGRpbmcgKyBwYW5lbFdpZHRoLCBwYWRkaW5nLCB0cmFja1dpZHRoLCBoZWlnaHQpO1xuXG4gICAgdmFyIHRyYWNrSGVpZ2h0ID0gaGVpZ2h0IC8gdGhpcy5zZXF1ZW5jZVRyYWNrcy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNlcXVlbmNlVHJhY2tzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgYXBwLmN0eC5zdHJva2VSZWN0KHBhZGRpbmcgKyBwYW5lbFdpZHRoLCBwYWRkaW5nICsgaSAqIHRyYWNrSGVpZ2h0LCB0cmFja1dpZHRoLCB0cmFja0hlaWdodCk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZXF1ZW5jZVRyYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHMgPSB0aGlzLnNlcXVlbmNlVHJhY2tzW2ldO1xuICAgICAgcy5kcmF3KGFwcCwgcGFkZGluZyArIHBhbmVsV2lkdGgsIHBhZGRpbmcgKyBpICogdHJhY2tIZWlnaHQsIHRyYWNrV2lkdGgsIHRyYWNrSGVpZ2h0KTtcbiAgICB9XG5cbiAgICB2YXIgc2hvd0JhcnMgPSA0O1xuICAgIHZhciBwb2ludHNJblJhbmdlID0gc2hvd0JhcnMgKiA0O1xuICAgIHZhciBzY2FsaW5nID0gdHJhY2tXaWR0aCAvIHBvaW50c0luUmFuZ2U7XG4gICAgdmFyIGJhcldpZHRoID0gNCAqIHNjYWxpbmc7XG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSAncmdiKDQwLCA0MCwgNDApJztcbiAgICBhcHAuY3R4LmZvbnQgPSAnMTBweCBtb25vJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNob3dCYXJzOyBpKyspIHtcbiAgICAgIGFwcC5jdHguZmlsbFRleHQoaSArIDEsIHBhZGRpbmcgKyBwYW5lbFdpZHRoICsgMyArIGkgKiBiYXJXaWR0aCwgcGFkZGluZyArIGhlaWdodCAtIDMpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgdmFyIHBhdGggPSBuZXcgUGF0aDJEKCk7XG4gICAgdmFyIHdpZHRoID0gYXBwLmNhbnZhcy53aWR0aCAtIHRoaXMucGFkZGluZyAqIDI7XG4gICAgcGF0aC5yZWN0KHRoaXMucGFuZWxXaWR0aCwgMCwgd2lkdGgsIHRoaXMuaGVpZ2h0ICsgdGhpcy5wYWRkaW5nICogMik7XG4gICAgaWYgKGFwcC5jdHguaXNQb2ludEluUGF0aChwYXRoLCB4LCB5KSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb21waWxlKCkge1xuICAgIHJldHVybiB0aGlzLnVuaXQuY29tcGlsZSh0aGlzLnNlcXVlbmNlVHJhY2tzKTtcbiAgfVxuXG4gIGluaXRpYWxpc2VTZXF1ZW5jZVRyYWNrcyhzZXF1ZW5jZXMpIHtcbiAgICB0aGlzLnNlcXVlbmNlVHJhY2tzID0gW107XG4gICAgZm9yICh2YXIgcyBvZiBzZXF1ZW5jZXMpIHtcbiAgICAgIHZhciBzZWdtZW50ID0ge307XG4gICAgICBpZiAocy5hZnRlcikge1xuICAgICAgICBzZWdtZW50LmFmdGVyID0gcy5hZnRlci5hZnRlcjtcbiAgICAgICAgaWYgKHMuYWZ0ZXIuc2VxdWVuY2UuYmVmb3JlKSB7XG4gICAgICAgICAgc2VnbWVudC5iZWZvcmUgPSBzLmFmdGVyLnNlcXVlbmNlLmJlZm9yZS5iZWZvcmU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocy5iZWZvcmUpIHtcbiAgICAgICAgc2VnbWVudC5iZWZvcmUgPSBzLmJlZm9yZS5iZWZvcmU7XG4gICAgICAgIGlmIChzLmJlZm9yZS5zZXF1ZW5jZS5hZnRlcikge1xuICAgICAgICAgIHNlZ21lbnQuYWZ0ZXIgPSBzLmJlZm9yZS5zZXF1ZW5jZS5hZnRlci5hZnRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHRyYWNrID0gbmV3IFNlcXVlbmNlVHJhY2sodGhpcy51bml0LmdldENvbXBpbGVUYXJnZXQoKSwgcyk7XG4gICAgICB0cmFjay5hZGRSYW5nZShzZWdtZW50LmFmdGVyLCBzZWdtZW50LmJlZm9yZSk7XG4gICAgICB0aGlzLnNlcXVlbmNlVHJhY2tzLnB1c2godHJhY2spO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2hhbm5lbFNlcXVlbmNlVHJhY2tzIGV4dGVuZHMgQmFzZVNlcXVlbmNlVHJhY2tzIHtcbiAgY29uc3RydWN0b3IoY2hhbm5lbCwgYXBwLCBwYWRkaW5nLCBwYW5lbFdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcihjaGFubmVsLCBhcHAsIHBhZGRpbmcsIHBhbmVsV2lkdGgsIGhlaWdodCk7XG4gIH1cbn1cbmV4cG9ydCBjbGFzcyBSZWdpc3RlclNlcXVlbmNlVHJhY2tzIGV4dGVuZHMgQmFzZVNlcXVlbmNlVHJhY2tzIHtcbiAgY29uc3RydWN0b3IocmVnaXN0ZXIsIGFwcCwgcGFkZGluZywgcGFuZWxXaWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIocmVnaXN0ZXIsIGFwcCwgcGFkZGluZywgcGFuZWxXaWR0aCwgaGVpZ2h0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2hhbm5lbFNpZGVCYXIgfSBmcm9tICcuL2NoYW5uZWxfc2lkZWJhci5qcyc7XG5pbXBvcnQgeyBSZWdpc3RlclNpZGVCYXIgfSBmcm9tICcuL3JlZ2lzdGVyX3NpZGViYXIuanMnO1xuaW1wb3J0IHsgQ2hhbm5lbFNlcXVlbmNlVHJhY2tzLCBSZWdpc3RlclNlcXVlbmNlVHJhY2tzIH0gZnJvbSAnLi9zZXF1ZW5jZV90cmFja3MuanMnO1xuXG5leHBvcnQgY2xhc3MgQmFzZVRyYWNrIHtcbiAgY29uc3RydWN0b3IodW5pdCkge1xuICAgIHRoaXMudW5pdCA9IHVuaXQ7XG4gICAgdGhpcy5wYWRkaW5nID0gMDtcbiAgICB0aGlzLmhlaWdodCA9IDc1O1xuICAgIHRoaXMucGFuZWxXaWR0aCA9IDkwO1xuXG4gICAgdGhpcy5zaWRlQmFyID0gbnVsbDtcbiAgICB0aGlzLnNlcXVlbmNlVHJhY2tzID0gbnVsbDtcbiAgfVxuXG4gIGRyYXcoYXBwKSB7XG4gICAgdmFyIGNvbG9yT2Zmc2V0ID0gJyNkZGQnOyBcbiAgICB0aGlzLnNpZGVCYXIuZHJhdyhhcHAsIGNvbG9yT2Zmc2V0KTtcbiAgICB0aGlzLnNlcXVlbmNlVHJhY2tzLmRyYXcoYXBwLCBjb2xvck9mZnNldCk7XG4gIH1cblxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgaWYgKHRoaXMuc2lkZUJhci5oYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2lkZUJhcjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2VxdWVuY2VUcmFja3MuaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlcXVlbmNlVHJhY2tzO1xuICAgIH0gXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGluaXRpYWxpc2VTZXF1ZW5jZVRyYWNrcyhkZWZzKSB7XG4gICAgdGhpcy5zZXF1ZW5jZVRyYWNrcy5pbml0aWFsaXNlU2VxdWVuY2VUcmFja3MoZGVmcyk7XG4gIH1cbiAgY29tcGlsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXF1ZW5jZVRyYWNrcy5jb21waWxlKCk7XG4gIH1cbn1cbmV4cG9ydCBjbGFzcyBDaGFubmVsVHJhY2sgZXh0ZW5kcyBCYXNlVHJhY2sge1xuICBjb25zdHJ1Y3RvcihjaGFubmVsLCBhcHApIHtcbiAgICBzdXBlcihjaGFubmVsKTtcbiAgICB0aGlzLnNpZGVCYXIgPSBuZXcgQ2hhbm5lbFNpZGVCYXIoY2hhbm5lbCwgYXBwLCB0aGlzLnBhZGRpbmcsIHRoaXMucGFuZWxXaWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuc2VxdWVuY2VUcmFja3MgPSBuZXcgQ2hhbm5lbFNlcXVlbmNlVHJhY2tzKGNoYW5uZWwsIGFwcCwgdGhpcy5wYWRkaW5nLCB0aGlzLnBhbmVsV2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyVHJhY2sgZXh0ZW5kcyBCYXNlVHJhY2sge1xuICBjb25zdHJ1Y3RvcihyZWdpc3RlciwgYXBwKSB7XG4gICAgc3VwZXIocmVnaXN0ZXIpO1xuICAgIHRoaXMuc2lkZUJhciA9IG5ldyBSZWdpc3RlclNpZGVCYXIocmVnaXN0ZXIsIGFwcCwgdGhpcy5wYWRkaW5nLCB0aGlzLnBhbmVsV2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLnNlcXVlbmNlVHJhY2tzID0gbmV3IFJlZ2lzdGVyU2VxdWVuY2VUcmFja3MocmVnaXN0ZXIsIGFwcCwgdGhpcy5wYWRkaW5nLCB0aGlzLnBhbmVsV2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==