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
    if (ix) {
      var s = this.modules[ix].instrument.sockets;
      var candidate = null;
      if (s) {
        for (var key of Object.keys(s)) {
          if (s[key].type === "FREQ") {
            candidate = key;
          }
        }
        var p = new _components___WEBPACK_IMPORTED_MODULE_1__["Patch"](ix, 0, "FREQ", key, _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]);
        this.patches.push(p);
      }
    }
  }
  loadGenerator(instrDef, input, output) {
    if (instrDef["combined"]) {
      for (var iDef of instrDef["combined"]) {
        var ix = this.loadGenerator(iDef, input, output);
        if (ix) {
          var p = new _components___WEBPACK_IMPORTED_MODULE_1__["Patch"](input, ix, "FREQ", "FREQ", _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]);
          this.patches.push(p);
        }
      }
    } else if (instrDef["panning"]) {
      var g = new _module_units__WEBPACK_IMPORTED_MODULE_0__["Panning"]("panning");
      var m = new _components___WEBPACK_IMPORTED_MODULE_1__["Module"](this, Math.random() * 800 + 100, Math.random() * 600, g);
      this.modules.push(m);
      var tIx = this.modules.length - 1;

      var ix = this.loadGenerator(instrDef["panning"], input, output);
      var p = new _components___WEBPACK_IMPORTED_MODULE_1__["Patch"](tIx, ix, "PAN", "PAN", _model___WEBPACK_IMPORTED_MODULE_2__["PANNING_TYPE"]);
      this.patches.push(p);
      var p = new _components___WEBPACK_IMPORTED_MODULE_1__["Patch"](input, tIx, "FREQ", "FREQ", _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]);
      this.patches.push(p);
      var p = new _components___WEBPACK_IMPORTED_MODULE_1__["Patch"](input, ix, "FREQ", "FREQ", _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]);
      this.patches.push(p);

    } else if (instrDef["transpose"]) {
      var g = new _module_units__WEBPACK_IMPORTED_MODULE_0__["Transpose"]("transpose");
      g.dials["semitones"].value = instrDef["transpose"]["semitones"] || 0;
      var m = new _components___WEBPACK_IMPORTED_MODULE_1__["Module"](this, Math.random() * 800 + 100, Math.random() * 600, g);
      this.modules.push(m);

      var tIx = this.modules.length - 1;
      var ix = this.loadGenerator(instrDef["transpose"], tIx, output);
      var p = new _components___WEBPACK_IMPORTED_MODULE_1__["Patch"](tIx, ix, "FREQ", "FREQ", _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]);
      this.patches.push(p);
      var p = new _components___WEBPACK_IMPORTED_MODULE_1__["Patch"](input, tIx, "FREQ", "FREQ IN", _model___WEBPACK_IMPORTED_MODULE_2__["FREQUENCY_TYPE"]);
      this.patches.push(p);
    } else if (instrDef["wav"]) {
      var m = new _components___WEBPACK_IMPORTED_MODULE_1__["Module"](this, 300, 40, new _module_units__WEBPACK_IMPORTED_MODULE_0__["SampleGenerator"]("wav"));
      var p = new _components___WEBPACK_IMPORTED_MODULE_1__["Patch"](this.modules.length, output, "OUT", "IN", _model___WEBPACK_IMPORTED_MODULE_2__["AUDIO_TYPE"]);
      this.modules.push(m);
      this.patches.push(p);
      return this.modules.length - 1;
    } else if (instrDef["triangle"] || instrDef["square"] || instrDef["sawtooth"]) {
      var typ = "triangle";
      var instr = null;
      if (instrDef["triangle"]) {
        instr = instrDef["triangle"];
      } else if (instrDef["square"]) {
        instr = instrDef["square"];
        typ = "square";
      } else if (instrDef["sawtooth"]) {
        instr = instrDef["sawtooth"];
        typ = "saw";
      }
      var g = new _module_units__WEBPACK_IMPORTED_MODULE_0__["SampleGenerator"](typ);
      g.dials["attack"].value = instr["attack"] || 0.0;
      g.dials["decay"].value = instr["decay"] || 0.0;
      g.dials["sustain"].value = instr["sustain"] || 0.0;
      g.dials["release"].value = instr["release"] || 0.0;
      g.dials["gain"].value = instr["gain"] || 1.0;
      var m = new _components___WEBPACK_IMPORTED_MODULE_1__["Module"](this, Math.random() * 800 + 100, Math.random() * 600 + 20, g);
      var p = new _components___WEBPACK_IMPORTED_MODULE_1__["Patch"](this.modules.length, output, "OUT", "IN", _model___WEBPACK_IMPORTED_MODULE_2__["AUDIO_TYPE"]);
      this.modules.push(m);
      this.patches.push(p);
      return this.modules.length - 1;
    } else {
      throw 'Unknown instrument def ' + instrDef;
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
        var modSockets = this.modules[q].unit.sockets;
        if (p.to === q && modSockets[p.toSocket].isInput) {
          if (!seen[p.from]) {
            queue.push(p.from);
          }
        } else if (p.from === q && modSockets[p.fromSocket].isInput) {
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
/*! exports provided: ChannelInput, ChannelOutput, Filter, SampleGenerator, Transpose, Panning */
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
/*! exports provided: SampleGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SampleGenerator", function() { return SampleGenerator; });
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
    this.channels = [new _timeline_editor___WEBPACK_IMPORTED_MODULE_2__["Channel"](1, this.openInstrumentEditor.bind(this))];
    var bank = this.loadInstrumentBank(instrumentBank);
    //this.load(example);
    //this.openTimelineEditor();
    //this.openInstrumentEditor(bank.instruments[0]);
    this.openSequenceEditor(null, 1);
    this.draw();
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
/* harmony import */ var _patchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patchable.js */ "./src/model/patchable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Patchable", function() { return _patchable_js__WEBPACK_IMPORTED_MODULE_1__["Patchable"]; });

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

/* harmony import */ var _range_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./range.js */ "./src/sequence_editor/module_units/range.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return _range_js__WEBPACK_IMPORTED_MODULE_4__["Range"]; });







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

    this.height = 150;
    this.marginTop = 10;
    this.offset =  this.channelNr * (this.height + this.marginTop);
    this.padding = 10;
    this.channelWidth = 90;
    this.handleClick = () => openInstrumentEditor(this.instrument);
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
    this.ranges = [new Range(0, 4), new Range(9, 12), new Range(14, 25), new Range(30, 34)];
  }
  draw(app, x, y, w, h) {
    var showBars = 4;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZWRpdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9tb2R1bGVfdW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL2JhbmsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvY2hhbm5lbF9pbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvbW9kdWxlX3VuaXRzL2NoYW5uZWxfb3V0cHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9wYW5uaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvc2FtcGxlX2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvbW9kdWxlX3VuaXRzL3RyYW5zcG9zZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL3BhdGNoYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXF1ZW5jZV9lZGl0b3IvbW9kdWxlX3VuaXRzL3BsYXlfbm90ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy9wdWxzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy9yYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL21vZHVsZV91bml0cy9zZXF1ZW5jZV9pbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VxdWVuY2VfZWRpdG9yL3NlcXVlbmNlLmpzIiwid2VicGFjazovLy8uL3NyYy90aGVtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGltZWxpbmVfZWRpdG9yL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbWVsaW5lX2VkaXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGltZWxpbmVfZWRpdG9yL3NlcXVlbmNlX3RyYWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakZPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7Ozs7Ozs7Ozs7Ozs7QUN4Q0E7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDekRBO0FBQUE7QUFBQTtBQUFBO0FBQWtEO0FBQ2I7O0FBRTlCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsc0RBQVc7QUFDckIsVUFBVSxpREFBTTtBQUNoQixVQUFVLGlEQUFNO0FBQ2hCLFVBQVUsaURBQU07QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsaURBQU07QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBaUM7QUFDK0I7QUFDZDtBQUNmO0FBQ0U7QUFDUztBQUNU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Q3ZEO0FBQ0E7QUFDQSxtQkFBbUIsZ0NBQWdDO0FBQ25EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1Qzs7QUFFaEM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJibGVlcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4uanNcIik7XG4iLCJcbmV4cG9ydCBjbGFzcyBCdXR0b24ge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBvbkNsaWNrLCBsYWJlbCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLncgPSAyNTtcbiAgICB0aGlzLmggPSAyNTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gb25DbGljaztcbiAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgdGhpcy5jb2xvdXIgPSBudWxsO1xuICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICB0aGlzLncgPSAzNTtcbiAgICB9XG4gIH1cbiAgZHJhdyhhcHApIHtcbiAgICB2YXIgdyA9IHRoaXMudztcbiAgICB2YXIgaCA9IHRoaXMuaDtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLkJ1dHRvbjtcbiAgICBpZiAodGhpcy5jb2xvdXIpIHtcbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvdXI7XG4gICAgfVxuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5PdXRsaW5lQ29sb3VyO1xuICAgIGFwcC5jdHgubGluZVdpZHRoID0gMTtcbiAgICBhcHAuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB3LCBoKTtcbiAgICBhcHAuY3R4LnN0cm9rZVJlY3QodGhpcy54LCB0aGlzLnksIHcsIGgpO1xuICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICBhcHAuY3R4LmZvbnQgPSAnMTBweCBtb25vJztcbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuQnV0dG9uVGV4dDtcbiAgICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy5sYWJlbCwgdGhpcy54ICsgdyAvIDIsIHRoaXMueSArIDE1KTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIGlmICh4ID49IHRoaXMueCAmJiB4IDw9IHRoaXMueCArIHRoaXMudyAmJiB5ID49IHRoaXMueSAmJiB5IDw9IHRoaXMueSArIHRoaXMuaCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDbG9zZUJ1dHRvbiBleHRlbmRzIEJ1dHRvbiB7XG59XG4iLCJleHBvcnQgY2xhc3MgRGlhbCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGxhYmVsLCBtaW4sIG1heCwgY3VycmVudCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgdGhpcy5yYWRpdXMgPSAxNTtcbiAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLnZhbHVlID0gY3VycmVudDtcbiAgfVxuICBkcmF3KGFwcCkge1xuXG4gICAgLy8gRHJhdyBkaWFsXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5EaWFsO1xuICAgIGFwcC5jdHguYmVnaW5QYXRoKCk7XG4gICAgYXBwLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgYXBwLmN0eC5maWxsKCk7XG4gICAgYXBwLmN0eC5jbG9zZVBhdGgoKTtcblxuICAgIHZhciByYW5nZSA9IHRoaXMubWF4IC0gdGhpcy5taW47XG4gICAgdmFyIHRhdSA9IDIgKiBNYXRoLlBJXG4gICAgdmFyIHZhbHVlID0gdGF1IC0gKHRhdSAqICh0aGlzLnZhbHVlIC0gdGhpcy5taW4pIC8gcmFuZ2UpXG4gICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcbiAgICB2YXIgZHggPSBNYXRoLnNpbih2YWx1ZSkgKiB0aGlzLnJhZGl1cztcbiAgICB2YXIgZHkgPSBNYXRoLmNvcyh2YWx1ZSkgKiB0aGlzLnJhZGl1cztcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuRGlhbExpbmU7XG4gICAgYXBwLmN0eC5saW5lV2lkdGggPSAyO1xuICAgIGFwcC5jdHgubW92ZVRvKHRoaXMueCwgdGhpcy55KTtcbiAgICBhcHAuY3R4LmxpbmVUbyh0aGlzLnggKyBkeCwgdGhpcy55ICsgZHkpO1xuICAgIGFwcC5jdHguc3Ryb2tlKCk7XG4gICAgYXBwLmN0eC5saW5lV2lkdGggPSAxO1xuXG4gICAgLy8gRHJhdyBsYWJlbFxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlVGV4dDtcbiAgICBhcHAuY3R4LmZvbnQgPSAnMTBweCBtb25vJztcbiAgICB2YXIgY2VudGVyWCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueSAtIHRoaXMucmFkaXVzIC0gMztcbiAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLmxhYmVsLCBjZW50ZXJYLCB5KTtcblxuICAgIC8vIERyYXcgdmFsdWVcbiAgICBhcHAuY3R4LmZpbGxUZXh0KHRoaXMudmFsdWUudG9GaXhlZCgyKSwgY2VudGVyWCwgdGhpcy55ICsgdGhpcy5yYWRpdXMgKyAxMik7XG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIGlmICh4ID49IHRoaXMueCAtIHRoaXMucmFkaXVzICYmIHggPD0gdGhpcy54ICsgdGhpcy5yYWRpdXMgJiYgeSA+PSB0aGlzLnkgLSB0aGlzLnJhZGl1cyAmJiB5IDw9IHRoaXMucmFkaXVzICsgdGhpcy55KSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cbiAgaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSkge1xuICAgIGR4ID0geCAtIHRoaXMueDtcbiAgICBkeSA9IHkgLSB0aGlzLnk7XG4gICAgdmFyIHNpbiA9IGR5IC8gTWF0aC5zcXJ0KGR5ICogZHkgKyBkeCAqIGR4KVxuICAgIHZhciBzY2FsZWRDb3MgPSAxLjAgLSAoc2luICsgMSkgLyAyO1xuICAgIHZhciByYW5nZSA9IHRoaXMubWF4IC0gdGhpcy5taW47XG4gICAgdGhpcy52YWx1ZSA9IHJhbmdlICogc2NhbGVkQ29zICsgdGhpcy5taW47XG4gICAgYXBwLmRyYXcoKTtcbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBDbG9zZUJ1dHRvbiwgQnV0dG9uIH0gZnJvbSAnLi9idXR0b24uanMnO1xuaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnLi9tb2R1bGUuanMnO1xuXG5leHBvcnQgY2xhc3MgRWRpdG9yIHtcbiAgY29uc3RydWN0b3IoYXBwLCB0YXJnZXQsIGhhbmRsZUNsb3NlKSB7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5wYWRkaW5nID0gYXBwLnRoZW1lLnBhZGRpbmc7XG4gICAgdGhpcy5zY2FsZSA9IDEuMFxuICAgIHRoaXMuc2hvd0NvbXBpbGUgPSB0cnVlO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuYnV0dG9ucyA9IFtcbiAgICAgIG5ldyBDbG9zZUJ1dHRvbigxMCwgMTAsIGhhbmRsZUNsb3NlLCBcIlhcIiksXG4gICAgICBuZXcgQnV0dG9uKDEwLCAxMCwgdGhpcy5oYW5kbGVTaG93Q29tcGlsZS5iaW5kKHRoaXMpLCBcIkpTT05cIiksXG4gICAgICBuZXcgQnV0dG9uKDEwLCAxMCwgdGhpcy5oYW5kbGVab29tSW4uYmluZCh0aGlzKSwgXCIrXCIpLFxuICAgICAgbmV3IEJ1dHRvbigxMCwgMTAsIHRoaXMuaGFuZGxlWm9vbU91dC5iaW5kKHRoaXMpLCBcIi1cIiksXG4gICAgXTtcbiAgfVxuICBoYW5kbGVBZGRVbml0KGNvbnN0cnVjdG9yKSB7XG4gICAgdmFyIGcgPSBjb25zdHJ1Y3RvcigpXG4gICAgdGhpcy50YXJnZXQubW9kdWxlcy5wdXNoKG5ldyBNb2R1bGUodGhpcy50YXJnZXQsIE1hdGgucmFuZG9tKCkgKiA3MDAsIE1hdGgucmFuZG9tKCkgKiA2MDAsIGcpKTtcbiAgICB0aGlzLmFwcC5kcmF3KCk7XG4gIH1cbiAgaGFuZGxlWm9vbUluKCkge1xuICAgIHRoaXMuc2NhbGUgKz0gLjFcbiAgICB0aGlzLmFwcC5kcmF3KCk7XG4gIH1cbiAgaGFuZGxlWm9vbU91dCgpIHtcbiAgICB0aGlzLnNjYWxlIC09IC4xO1xuICAgIHRoaXMuYXBwLmRyYXcoKTtcbiAgfVxuICBoYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4LCB5KSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQuaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZURyb3AoYXBwLCB4LCB5KSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQuaGFuZGxlRHJvcChhcHAsIHggLSB0aGlzLnBhZGRpbmcsIHkgLSB0aGlzLnBhZGRpbmcpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVTaG93Q29tcGlsZSgpIHtcbiAgICB0aGlzLnNob3dDb21waWxlID0gIXRoaXMuc2hvd0NvbXBpbGU7XG4gICAgdGhpcy5hcHAuZHJhdygpO1xuICB9XG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICBmb3IgKHZhciBiIG9mIHRoaXMuYnV0dG9ucykge1xuICAgICAgdmFyIHYgPSBiLmhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpO1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIG0gb2YgdGhpcy50YXJnZXQubW9kdWxlcykge1xuICAgICAgdmFyIHYgPSBtLmhhbmRsZU1vdXNlRG93bihhcHAsIHggLSB0aGlzLnBhZGRpbmcsIHkgLSB0aGlzLnBhZGRpbmcpO1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHY7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIHZhciB3ID0gYXBwLmNhbnZhcy53aWR0aCAtIDIgKiB0aGlzLnBhZGRpbmc7XG4gICAgdmFyIGggPSBhcHAuY2FudmFzLmhlaWdodCAtIDIgKiB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5idXR0b25zWzBdLnggPSB3IC0gdGhpcy5idXR0b25zWzBdLncgKyB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5idXR0b25zWzBdLnkgPSB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5idXR0b25zWzFdLnggPSB3IC0gdGhpcy5idXR0b25zWzFdLncgKyB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5idXR0b25zWzFdLnkgPSB0aGlzLnBhZGRpbmcgKyAyNTtcbiAgICB0aGlzLmJ1dHRvbnNbMl0ueCA9IHcgLSB0aGlzLmJ1dHRvbnNbMl0udyArIHRoaXMucGFkZGluZztcbiAgICB0aGlzLmJ1dHRvbnNbMl0ueSA9IHRoaXMucGFkZGluZyArIDUwO1xuICAgIHRoaXMuYnV0dG9uc1szXS54ID0gdyAtIHRoaXMuYnV0dG9uc1szXS53ICsgdGhpcy5wYWRkaW5nO1xuICAgIHRoaXMuYnV0dG9uc1szXS55ID0gdGhpcy5wYWRkaW5nICsgNzU7XG4gICAgYXBwLmN0eC5zYXZlKCk7XG4gICAgYXBwLmN0eC5saW5lV2lkdGggPSAxO1xuICAgIFxuICAgIC8vIERyYXcgdGhlIGJhY2tncm91bmRcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLkluc3RydW1lbnRFZGl0b3JCYWNrZ3JvdW5kO1xuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5PdXRsaW5lQ29sb3VyO1xuICAgIGFwcC5jdHguZmlsbFJlY3QodGhpcy5wYWRkaW5nLCB0aGlzLnBhZGRpbmcsIHcsIGgpO1xuXG4gICAgLy8gRHJhdyB0aGUgYnV0dG9ucyBcbiAgICBmb3IgKHZhciBiIG9mIHRoaXMuYnV0dG9ucykge1xuICAgICAgYi5kcmF3KGFwcCk7XG4gICAgfVxuXG4gICAgLy8gRHJhdyB0aGUgY29tcGlsZWQgZ2VuZXJhdG9yIEpTT05cbiAgICBpZiAodGhpcy5zaG93Q29tcGlsZSkge1xuICAgICAgdmFyIHR4dCA9IEpTT04uc3RyaW5naWZ5KHRoaXMudGFyZ2V0LmNvbXBpbGUoKSwgbnVsbCwgMik7XG4gICAgICB2YXIgbGluZU5yID0gMDtcbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlVGV4dDtcbiAgICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJzdGFydFwiO1xuICAgICAgZm9yICh2YXIgbGluZSBvZiB0eHQuc3BsaXQoXCJcXG5cIikpIHtcbiAgICAgICAgYXBwLmN0eC5maWxsVGV4dChsaW5lLCB3IC0gMzAwLCA5MCArIGxpbmVOciAqIDEyKTtcbiAgICAgICAgbGluZU5yKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRHJhdyB0aGUgbW9kdWxlc1xuICAgIGZvciAodmFyIG0gb2YgdGhpcy50YXJnZXQubW9kdWxlcykge1xuICAgICAgYXBwLmN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7IC8vIHJlc2V0IHRyYW5zbGF0ZVxuICAgICAgYXBwLmN0eC5zY2FsZSh0aGlzLnNjYWxlLCB0aGlzLnNjYWxlKTtcbiAgICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMucGFkZGluZywgdGhpcy5wYWRkaW5nKTtcbiAgICAgIG0uZHJhdyhhcHApO1xuICAgIH1cbiAgICBhcHAuY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTsgLy8gcmVzZXQgdHJhbnNsYXRlXG4gICAgYXBwLmN0eC5zY2FsZSh0aGlzLnNjYWxlLCB0aGlzLnNjYWxlKTtcblxuXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5QYXRjaDtcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuUGF0Y2g7XG5cbiAgICAvLyBEcmF3IHRoZSBwYXRjaGVzXG4gICAgZm9yICh2YXIgcCBvZiB0aGlzLnRhcmdldC5wYXRjaGVzKSB7XG4gICAgICB2YXIgZnJvbU1vZCA9IHRoaXMudGFyZ2V0Lm1vZHVsZXNbcC5mcm9tXTtcbiAgICAgIHZhciB0b01vZCA9IHRoaXMudGFyZ2V0Lm1vZHVsZXNbcC50b107XG4gICAgICB2YXIgZnJvbVNvY2tldCA9IHAuZ2V0RnJvbVNvY2tldChmcm9tTW9kKTtcbiAgICAgIHZhciB0b1NvY2tldCA9IHAuZ2V0VG9Tb2NrZXQodG9Nb2QpO1xuICAgICAgdmFyIGZyb21YID0gdGhpcy5wYWRkaW5nICsgZnJvbU1vZC54ICsgZnJvbVNvY2tldC54O1xuICAgICAgdmFyIGZyb21ZID0gdGhpcy5wYWRkaW5nICsgZnJvbU1vZC55ICsgZnJvbVNvY2tldC55O1xuICAgICAgdmFyIHRvWCA9IHRoaXMucGFkZGluZyArIHRvTW9kLnggKyB0b1NvY2tldC54O1xuICAgICAgdmFyIHRvWSA9IHRoaXMucGFkZGluZyArIHRvTW9kLnkgKyB0b1NvY2tldC55O1xuICAgICAgdmFyIHBvaW50T2Zmc2V0ID0gNzA7XG5cbiAgICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBwLmdldENvbG9yKGFwcC50aGVtZSk7XG4gICAgICBhcHAuY3R4LmxpbmVXaWR0aCA9IDQ7XG4gICAgICBhcHAuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgYXBwLmN0eC5tb3ZlVG8oZnJvbVgsIGZyb21ZKTtcbiAgICAgIGFwcC5jdHguYmV6aWVyQ3VydmVUbyhcbiAgICAgICAgZnJvbVgsIFxuICAgICAgICBmcm9tWSArIHBvaW50T2Zmc2V0LCBcbiAgICAgICAgdG9YLCBcbiAgICAgICAgdG9ZICsgcG9pbnRPZmZzZXQsIFxuICAgICAgICB0b1gsIFxuICAgICAgICB0b1kpO1xuICAgICAgYXBwLmN0eC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBhcHAuY3R4LnJlc3RvcmUoKTtcbiAgfVxufVxuIiwiZXhwb3J0IHsgRGlhbCB9IGZyb20gJy4vZGlhbC5qcyc7XG5leHBvcnQgeyBTb2NrZXQsIElucHV0U29ja2V0LCBPdXRwdXRTb2NrZXQgfSBmcm9tICcuL3NvY2tldC5qcyc7XG5leHBvcnQgeyBCdXR0b24sIENsb3NlQnV0dG9uIH0gZnJvbSAnLi9idXR0b24uanMnO1xuZXhwb3J0IHsgUGF0Y2ggfSBmcm9tICcuL3BhdGNoLmpzJztcbmV4cG9ydCB7IE1vZHVsZSB9IGZyb20gJy4vbW9kdWxlLmpzJztcbmV4cG9ydCB7IE1vZHVsZVVuaXQgfSBmcm9tICcuL21vZHVsZV91bml0LmpzJztcbmV4cG9ydCB7IEVkaXRvciB9IGZyb20gJy4vZWRpdG9yLmpzJztcbiIsImltcG9ydCB7IFNvY2tldCB9IGZyb20gJy4vc29ja2V0LmpzJztcbmltcG9ydCB7IERpYWwgfSBmcm9tICcuL2RpYWwuanMnO1xuXG5leHBvcnQgY2xhc3MgTW9kdWxlIHtcbiAgY29uc3RydWN0b3IodGFyZ2V0LCB4LCB5LCB1bml0KSB7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMudW5pdCA9IHVuaXQ7XG4gICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gIH1cbiAgZHJhdyhhcHApIHtcbiAgICBhcHAuY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XG4gICAgdGhpcy51bml0LmRyYXcoYXBwKTtcbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgdmFyIHYgPSB0aGlzLnVuaXQuaGFuZGxlTW91c2VEb3duKGFwcCwgeCAtIHRoaXMueCwgeSAtIHRoaXMueSk7XG4gICAgaWYgKCF2KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWQgPSB2O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGhhbmRsZURyYWcoYXBwLCBkeCwgZHksIHgsIHkpIHtcbiAgICB2YXIgdiA9IHRoaXMuc2VsZWN0ZWQ7XG4gICAgaWYgKHYgaW5zdGFuY2VvZiBTb2NrZXQpIHtcbiAgICAgIHYuaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSk7XG4gICAgfSBlbHNlIGlmICh2IGluc3RhbmNlb2YgRGlhbCkge1xuICAgICAgdi5oYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4IC0gdGhpcy54LCB5IC0gdGhpcy55KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54ICs9IGR4O1xuICAgICAgdGhpcy55ICs9IGR5O1xuICAgIH1cbiAgfVxuICBoYW5kbGVEcm9wKGFwcCwgeCwgeSkge1xuICAgIHZhciB2ID0gdGhpcy5zZWxlY3RlZDtcbiAgICBpZiAodiBpbnN0YW5jZW9mIFNvY2tldCkge1xuICAgICAgZm9yICh2YXIgbW9kdWxlIG9mIHRoaXMudGFyZ2V0Lm1vZHVsZXMpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKG1vZHVsZS51bml0LnNvY2tldHMpKSB7XG4gICAgICAgICAgdmFyIHMgPSBtb2R1bGUudW5pdC5zb2NrZXRzW2tleV07XG4gICAgICAgICAgdmFyIHN4ID0geCAtIG1vZHVsZS54O1xuICAgICAgICAgIHZhciBzeSA9IHkgLSBtb2R1bGUueTtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcy5oYW5kbGVNb3VzZURvd24oYXBwLCBzeCwgc3kpO1xuICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmFkZFBhdGNoKHRoaXMsIG1vZHVsZSwgdi5sYWJlbCwgcmVzdWx0LmxhYmVsKTtcbiAgICAgICAgICAgIGFwcC5kcmF3KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMudyA9IDE1MDtcbiAgICB0aGlzLmggPSAxNTA7XG4gICAgdGhpcy5zb2NrZXRzID0ge307XG4gICAgdGhpcy5kaWFscyA9IHt9O1xuICAgIHRoaXMuYmFja2dyb3VuZCA9IFwiXCI7XG4gIH1cbiAgZHJhdyhhcHApIHtcbiAgICB2YXIgdyA9IHRoaXMudztcbiAgICB2YXIgaCA9IHRoaXMuaDtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzW3RoaXMuYmFja2dyb3VuZF07XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZU91dGxpbmU7XG4gICAgYXBwLmN0eC5maWxsUmVjdCgwLCAwLCB3LCBoKTtcbiAgICBhcHAuY3R4LnN0cm9rZVJlY3QoMCwgMCwgdywgaCk7XG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVUZXh0O1xuICAgIGFwcC5jdHguZm9udCA9ICcxNHB4IG1vbm8nO1xuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICBhcHAuY3R4LmZpbGxUZXh0KHRoaXMudHlwZSwgdyAvIDIsIDE0KTtcbiAgICBmb3IgKHZhciBvIG9mIE9iamVjdC5rZXlzKHRoaXMuc29ja2V0cykpIHtcbiAgICAgIHRoaXMuc29ja2V0c1tvXS5kcmF3KGFwcCk7XG4gICAgfVxuICAgIGZvciAodmFyIG8gb2YgT2JqZWN0LmtleXModGhpcy5kaWFscykpIHtcbiAgICAgIHRoaXMuZGlhbHNbb10uZHJhdyhhcHApO1xuICAgIH1cbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgZm9yICh2YXIgbyBvZiBPYmplY3Qua2V5cyh0aGlzLnNvY2tldHMpKSB7XG4gICAgICB2YXIgdiA9IHRoaXMuc29ja2V0c1tvXS5oYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KTtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHJldHVybiB2O1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBvIG9mIE9iamVjdC5rZXlzKHRoaXMuZGlhbHMpKSB7XG4gICAgICB2YXIgdiA9IHRoaXMuZGlhbHNbb10uaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSk7XG4gICAgICBpZiAodikge1xuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHBhdGggPSBuZXcgUGF0aDJEKCk7XG4gICAgcGF0aC5yZWN0KDAsIDAsIHRoaXMudywgdGhpcy5oKTtcbiAgICBpZiAoYXBwLmN0eC5pc1BvaW50SW5QYXRoKHBhdGgsIHgsIHkpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cblxuICAvLyBjb25uZWN0aW9ucyBpcyBhIHt9IG1hcHBpbmcgdGhpcyB1bml0J3MgaW5wdXQgc29ja2V0IElEcyBcbiAgLy8gdG8gYSBsaXN0IG9mIGNvbm5lY3RlZCB1bml0cy5cbiAgLy9cbiAgY29tcGlsZShjb25uZWN0aW9ucykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbiIsImV4cG9ydCBjbGFzcyBQYXRjaCB7XG4gIGNvbnN0cnVjdG9yKGZyb21Nb2R1bGUsIHRvTW9kdWxlLCBmcm9tU29ja2V0LCB0b1NvY2tldCwgdHlwZSkge1xuICAgIHRoaXMuZnJvbSA9IGZyb21Nb2R1bGU7XG4gICAgdGhpcy50byA9IHRvTW9kdWxlO1xuICAgIHRoaXMuZnJvbVNvY2tldCA9IGZyb21Tb2NrZXQ7XG4gICAgdGhpcy50b1NvY2tldCA9IHRvU29ja2V0O1xuICAgIGlmICghdHlwZSkge1xuICAgICAgdGhyb3cgJ01pc3NpbmcgdHlwZSBpbiBQYXRjaCc7XG4gICAgfVxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cbiAgZ2V0RnJvbVNvY2tldChtb2QpIHtcbiAgICByZXR1cm4gbW9kLnVuaXQuc29ja2V0c1t0aGlzLmZyb21Tb2NrZXRdO1xuICB9XG4gIGdldFRvU29ja2V0KG1vZCkge1xuICAgIHJldHVybiBtb2QudW5pdC5zb2NrZXRzW3RoaXMudG9Tb2NrZXRdO1xuICB9XG4gIGlzSXNvbW9ycGhpYyhwKSB7XG4gICAgcmV0dXJuICh0aGlzLmZyb20gPT0gcC5mcm9tIFxuICAgICAgICAmJiB0aGlzLnRvID09IHAudG8gXG4gICAgICAgICYmIHRoaXMuZnJvbVNvY2tldCA9PSBwLmZyb21Tb2NrZXQgXG4gICAgICAgICYmIHRoaXMudG9Tb2NrZXQgPT0gcC50b1NvY2tldCkgXG4gICAgICB8fCBcbiAgICAgICh0aGlzLnRvID09IHAuZnJvbVxuICAgICAgICAmJiB0aGlzLmZyb20gPT0gcC50byBcbiAgICAgICAgJiYgdGhpcy5mcm9tU29ja2V0ID09IHAudG9Tb2NrZXQgXG4gICAgICAgICYmIHRoaXMudG9Tb2NrZXQgPT0gcC5mcm9tU29ja2V0KTtcbiAgfVxuICBkb2VzUGF0Y2hDb25uZWN0VG8obW9kdWxlLCBzb2NrZXQpIHtcbiAgICByZXR1cm4gKHRoaXMuZnJvbSA9PSBtb2R1bGUgJiYgdGhpcy5mcm9tU29ja2V0ID09IHNvY2tldCkgfHxcbiAgICAgICh0aGlzLnRvID09IG1vZHVsZSAmJiB0aGlzLnRvU29ja2V0ID09IHNvY2tldClcbiAgfVxuICBjb25uZWN0c1RvKG1vZHVsZSwgc29ja2V0KSB7XG4gICAgaWYgKHRoaXMuZnJvbSA9PSBtb2R1bGUgJiYgdGhpcy5mcm9tU29ja2V0ID09IHNvY2tldCkge1xuICAgICAgcmV0dXJuIHttb2R1bGU6IHRoaXMudG8sIHNvY2tldDogdGhpcy50b1NvY2tldH1cbiAgICB9XG4gICAgcmV0dXJuIHttb2R1bGU6IHRoaXMuZnJvbSwgc29ja2V0OiB0aGlzLmZyb21Tb2NrZXR9XG4gIH1cbiAgZ2V0Q29sb3IodGhlbWUpIHtcbiAgICBpZiAodGhlbWUuY29sb3Vycy5QYXRjaGVzW3RoaXMudHlwZV0pIHtcbiAgICAgIHJldHVybiB0aGVtZS5jb2xvdXJzLlBhdGNoZXNbdGhpcy50eXBlXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoZW1lLmNvbG91cnMuUGF0Y2g7XG4gIH1cbn1cblxuIiwiZXhwb3J0IGNsYXNzIFNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGxhYmVsLCB0eXBlLCBpc0lucHV0KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLnJhZGl1cyA9IDg7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmlzSW5wdXQgPSBpc0lucHV0O1xuICAgIGlmICghdHlwZSkge1xuICAgICAgdGhyb3cgJ01pc3NpbmcgU29ja2V0IHR5cGUgZm9yIFNvY2tldCB3aXRoIGxhYmVsOiAnICsgbGFiZWw7XG4gICAgfVxuICAgIGlmIChpc0lucHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93ICdNaXNzaW5nIFNvY2tldCBpc0lucHV0IGZvciBTb2NrZXQgd2l0aCBsYWJlbDogJyArIGxhYmVsO1xuICAgIH1cbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIC8vIERyYXcgT2N0YWdvblxuICAgIHZhciBvY3RhX3Nob3J0ID0gMC4yOTI4OTMyMTg4MTM0NTI0NzU1OTkxNTU2Mzc4OTUxNTs7XG4gICAgdmFyIG9jdGFfbG9uZyA9IDEgLSBvY3RhX3Nob3J0O1xuICAgIHZhciBvY3RhZ29uID0ge1xuICAgICAgc2l6ZTogMiAqIHRoaXMucmFkaXVzICsgNCxcbiAgICB9XG4gICAgdmFyIHggPSB0aGlzLnggLSB0aGlzLnJhZGl1cyAtIDI7XG4gICAgdmFyIHkgPSB0aGlzLnkgLSB0aGlzLnJhZGl1cyAtIDI7XG4gICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLlNvY2tldEJhY2tncm91bmQ7XG4gICAgaWYgKGFwcC50aGVtZS5jb2xvdXJzLlNvY2tldHNbdGhpcy50eXBlXSkgeyBcbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuU29ja2V0c1t0aGlzLnR5cGVdO1xuICAgIH1cbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuU29ja2V0T3V0bGluZTtcbiAgICBhcHAuY3R4Lm1vdmVUbyh4ICsgb2N0YWdvbi5zaXplICogb2N0YV9zaG9ydCwgeSk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCwgeSArIG9jdGFnb24uc2l6ZSAqIG9jdGFfc2hvcnQpO1xuICAgIGFwcC5jdHgubGluZVRvKHgsIHkgKyBvY3RhZ29uLnNpemUgKiBvY3RhX2xvbmcpO1xuICAgIGFwcC5jdHgubGluZVRvKHggKyBvY3RhZ29uLnNpemUgKiBvY3RhX3Nob3J0LCB5ICsgb2N0YWdvbi5zaXplKTtcbiAgICBhcHAuY3R4LmxpbmVUbyh4ICsgb2N0YWdvbi5zaXplICogb2N0YV9sb25nLCB5ICsgb2N0YWdvbi5zaXplKTtcbiAgICBhcHAuY3R4LmxpbmVUbyh4ICsgb2N0YWdvbi5zaXplLCB5ICsgIG9jdGFnb24uc2l6ZSAqIG9jdGFfbG9uZyk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCArIG9jdGFnb24uc2l6ZSwgeSArIG9jdGFnb24uc2l6ZSAqIG9jdGFfc2hvcnQpO1xuICAgIGFwcC5jdHgubGluZVRvKHggKyBvY3RhZ29uLnNpemUgKiBvY3RhX2xvbmcsIHkpO1xuICAgIGFwcC5jdHgubGluZVRvKHggKyBvY3RhZ29uLnNpemUgKiBvY3RhX3Nob3J0LCB5KTtcbiAgICBhcHAuY3R4LmZpbGwoKTtcbiAgICBhcHAuY3R4LnN0cm9rZSgpO1xuXG4gICAgLy8gRHJhdyBob2xlXG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLlNvY2tldEluc2lkZTtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLlNvY2tldEluc2lkZTtcbiAgICBhcHAuY3R4LmJlZ2luUGF0aCgpO1xuICAgIGFwcC5jdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cyAtIDIsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBhcHAuY3R4LmZpbGwoKTtcblxuICAgIC8vIERyYXcgbGFiZWxcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZVRleHQ7XG4gICAgYXBwLmN0eC5mb250ID0gJzEwcHggbW9ubyc7XG4gICAgdmFyIGNlbnRlclggPSB0aGlzLng7XG4gICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy5sYWJlbCwgY2VudGVyWCwgeSAtIDMpO1xuICB9XG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICBpZiAoeCA+PSB0aGlzLnggLSB0aGlzLnJhZGl1cyAmJiB4IDw9IHRoaXMueCArIHRoaXMucmFkaXVzICsgNCAmJiB5ID49IHRoaXMueSAtIHRoaXMucmFkaXVzICYmIHkgPD0gdGhpcy55ICsgdGhpcy5yYWRpdXMgKyA0KSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cbiAgaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSkge1xuICAgIGlmICh0aGlzLm9uRHJhZykge1xuICAgICAgdGhpcy5vbkRyYWcoYXBwLCB0aGlzLCBkeCwgZHksIHgsIHkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXRTb2NrZXQgZXh0ZW5kcyBTb2NrZXQge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBsYWJlbCwgdHlwZSkge1xuICAgIHN1cGVyKHgsIHksIGxhYmVsLCB0eXBlLCB0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0U29ja2V0IGV4dGVuZHMgU29ja2V0IHtcbiAgY29uc3RydWN0b3IoeCwgeSwgbGFiZWwsIHR5cGUpIHtcbiAgICBzdXBlcih4LCB5LCBsYWJlbCwgdHlwZSwgZmFsc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbnN0cnVtZW50IH0gZnJvbSAnLi9pbnN0cnVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEJhbmsge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluc3RydW1lbnRzID0ge307XG4gIH1cbiAgbG9hZEZyb21EZWZpbml0aW9uKGRlZikge1xuICAgIGZvciAodmFyIGluc3RyRGVmIG9mIGRlZikge1xuICAgICAgdmFyIGluc3RyID0gbmV3IEluc3RydW1lbnQoKTtcbiAgICAgIGluc3RyLmxvYWRGcm9tRGVmaW5pdGlvbihpbnN0ckRlZik7XG4gICAgICBpZiAoaW5zdHIuaW5zdHJ1bWVudEJhbmtJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmluc3RydW1lbnRzW2luc3RyLmluc3RydW1lbnRCYW5rSW5kZXhdID0gaW5zdHI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCJleHBvcnQgeyBCYW5rIH0gZnJvbSAnLi9iYW5rLmpzJztcbmV4cG9ydCB7IEluc3RydW1lbnQgfSBmcm9tICcuL2luc3RydW1lbnQuanMnO1xuaW1wb3J0IHsgSW5zdHJ1bWVudCB9IGZyb20gJy4vaW5zdHJ1bWVudC5qcyc7XG5pbXBvcnQgeyBDaGFubmVsSW5wdXQsIENoYW5uZWxPdXRwdXQsIFNhbXBsZUdlbmVyYXRvciwgRmlsdGVyLCBUcmFuc3Bvc2UsIFBhbm5pbmd9IGZyb20gJy4vbW9kdWxlX3VuaXRzJztcbmltcG9ydCB7IEJ1dHRvbiwgRWRpdG9yLCBNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzLyc7XG5cbmV4cG9ydCBjbGFzcyBJbnN0cnVtZW50RWRpdG9yIGV4dGVuZHMgRWRpdG9yIHtcbiAgY29uc3RydWN0b3IoYXBwLCBpbnN0cnVtZW50LCBoYW5kbGVDbG9zZSkge1xuICAgIHN1cGVyKGFwcCwgaW5zdHJ1bWVudCwgaGFuZGxlQ2xvc2UpO1xuICAgIGlmICghaW5zdHJ1bWVudCkge1xuICAgICAgaW5zdHJ1bWVudCA9IG5ldyBJbnN0cnVtZW50KFtdLCBbXSk7XG4gICAgICB2YXIgbW9kdWxlcyA9IFtcbiAgICAgICAgbmV3IE1vZHVsZShpbnN0cnVtZW50LCAzMCwgMzAsIG5ldyBDaGFubmVsSW5wdXQoJ2lucHV0JykpLCBcbiAgICAgICAgbmV3IE1vZHVsZShpbnN0cnVtZW50LCA4MDAsIDMwLCBuZXcgQ2hhbm5lbE91dHB1dCgnb3V0cHV0JykpLFxuICAgICAgXTtcbiAgICAgIGluc3RydW1lbnQubW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgfVxuICAgIHRoaXMudGFyZ2V0ID0gaW5zdHJ1bWVudDtcbiAgICB2YXIgYnV0dG9uRGVmcyA9IFtcbiAgICAgICAge2xhYmVsOiBcIlNJTlwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiU1FVXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic3F1YXJlXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlNBV1wiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNhd1wiKX0sXG4gICAgICAgIHtsYWJlbDogXCJUUklcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJ0cmlhbmdsZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJQV01cIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJwdWxzZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJXQVZcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJ3YXZcIil9LFxuICAgICAgICB7bGFiZWw6IFwiTk9JXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwid2hpdGVfbm9pc2VcIil9LFxuICAgICAgICB7bGFiZWw6IFwiR1JBXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwiZ3JhaW5cIil9LFxuICAgICAgICB7bGFiZWw6IFwiVk9DXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwidm9jb2RlclwiKX0sXG4gICAgXTtcbiAgICB2YXIgZmlsdGVyRGVmcyA9IFtcbiAgICAgIHtsYWJlbDogXCJMUEZcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJsb3cgcGFzcyBmaWx0ZXJcIil9LFxuICAgICAge2xhYmVsOiBcIkhQRlwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcImhpZ2ggcGFzcyBmaWx0ZXJcIil9LFxuICAgICAge2xhYmVsOiBcIkRMWVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcImRlbGF5XCIpfSxcbiAgICAgIHtsYWJlbDogXCJGTEFcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJmbGFuZ2VyXCIpfSxcbiAgICAgIHtsYWJlbDogXCJESVNcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJkaXN0b3J0aW9uXCIpfSxcbiAgICAgIHtsYWJlbDogXCJPVlJcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJvdmVyZHJpdmVcIil9LFxuICAgICAge2xhYmVsOiBcIlRSRVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcInRyZW1lbG9cIil9LFxuICAgIF07XG4gICAgdmFyIGRlcml2ZWREZWZzID0gW1xuICAgICAge2xhYmVsOiBcIlRSQVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFRyYW5zcG9zZShcInRyYW5zcG9zZVwiKSl9LFxuICAgICAge2xhYmVsOiBcIlBBTlwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFBhbm5pbmcoXCJwYW5uaW5nXCIpKX0sXG4gICAgXTtcbiAgICB2YXIgeCA9IDEwO1xuICAgIGZvciAodmFyIGRlZiBvZiBidXR0b25EZWZzKSB7XG4gICAgICB2YXIgYiA9IG5ldyBCdXR0b24oeCwgMCwgZGVmLm9uY2xpY2suYmluZCh0aGlzKSwgZGVmLmxhYmVsKTtcbiAgICAgIGIuY29sb3VyID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlR2VuZXJhdG9yO1xuICAgICAgdGhpcy5idXR0b25zLnB1c2goYik7XG4gICAgICB4ICs9IGIudyArIDM7XG4gICAgfVxuICAgIGZvciAodmFyIGRlZiBvZiBmaWx0ZXJEZWZzKSB7XG4gICAgICB2YXIgYiA9IG5ldyBCdXR0b24oeCwgMCwgZGVmLm9uY2xpY2suYmluZCh0aGlzKSwgZGVmLmxhYmVsKTtcbiAgICAgIGIuY29sb3VyID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlRmlsdGVyO1xuICAgICAgdGhpcy5idXR0b25zLnB1c2goYik7XG4gICAgICB4ICs9IGIudyArIDM7XG4gICAgfVxuICAgIGZvciAodmFyIGRlZiBvZiBkZXJpdmVkRGVmcykge1xuICAgICAgdmFyIGIgPSBuZXcgQnV0dG9uKHgsIDAsIGRlZi5vbmNsaWNrLmJpbmQodGhpcyksIGRlZi5sYWJlbCk7XG4gICAgICBiLmNvbG91ciA9IGFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZURlcml2ZWQ7XG4gICAgICB0aGlzLmJ1dHRvbnMucHVzaChiKTtcbiAgICAgIHggKz0gYi53ICsgMztcbiAgICB9XG4gIH1cbiAgaGFuZGxlQWRkRmlsdGVyKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBGaWx0ZXIodHlwZSkpO1xuICB9XG4gIGhhbmRsZUFkZEdlbmVyYXRvcih0eXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgU2FtcGxlR2VuZXJhdG9yKHR5cGUpKTtcbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBDaGFubmVsSW5wdXQsIENoYW5uZWxPdXRwdXQsIEZpbHRlciwgU2FtcGxlR2VuZXJhdG9yLCBUcmFuc3Bvc2UsIFBhbm5pbmcgfSBmcm9tICcuL21vZHVsZV91bml0cyc7XG5pbXBvcnQgeyBQYXRjaCwgTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgUGF0Y2hhYmxlLCBBVURJT19UWVBFLCBGUkVRVUVOQ1lfVFlQRSwgUEFOTklOR19UWVBFIH0gZnJvbSAnLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIEluc3RydW1lbnQgZXh0ZW5kcyBQYXRjaGFibGUge1xuICBjb25zdHJ1Y3Rvcihtb2R1bGVzLCBwYXRjaGVzKSB7XG4gICAgc3VwZXIobW9kdWxlcywgcGF0Y2hlcyk7XG4gICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICB0aGlzLmluc3RydW1lbnRCYW5rSW5kZXggPSBudWxsO1xuICB9XG4gIGxvYWRGcm9tRGVmaW5pdGlvbihpbnN0ckRlZikge1xuICAgIHZhciBtb2R1bGVzID0gW1xuICAgICAgbmV3IE1vZHVsZSh0aGlzLCAxMCwgNDAsIG5ldyBDaGFubmVsSW5wdXQoJ2lucHV0JykpLCBcbiAgICAgIG5ldyBNb2R1bGUodGhpcywgNzAwLCA0MCwgbmV3IENoYW5uZWxPdXRwdXQoJ291dHB1dCcpKSxcbiAgICBdO1xuICAgIHZhciBwYXRjaGVzID0gW1xuXG4gICAgXTtcbiAgICB0aGlzLm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgIHRoaXMucGF0Y2hlcyA9IHBhdGNoZXM7XG4gICAgaWYgKGluc3RyRGVmLm5hbWUpIHtcbiAgICAgIHRoaXMubmFtZSA9IGluc3RyRGVmLm5hbWU7XG4gICAgfVxuICAgIGlmIChpbnN0ckRlZi5pbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmluc3RydW1lbnRCYW5rSW5kZXggPSBpbnN0ckRlZi5pbmRleDtcbiAgICB9XG4gICAgdmFyIGl4ID0gdGhpcy5sb2FkR2VuZXJhdG9yKGluc3RyRGVmLCAwLCAxKTtcbiAgICBpZiAoaXgpIHtcbiAgICAgIHZhciBzID0gdGhpcy5tb2R1bGVzW2l4XS5pbnN0cnVtZW50LnNvY2tldHM7XG4gICAgICB2YXIgY2FuZGlkYXRlID0gbnVsbDtcbiAgICAgIGlmIChzKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhzKSkge1xuICAgICAgICAgIGlmIChzW2tleV0udHlwZSA9PT0gXCJGUkVRXCIpIHtcbiAgICAgICAgICAgIGNhbmRpZGF0ZSA9IGtleTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHAgPSBuZXcgUGF0Y2goaXgsIDAsIFwiRlJFUVwiLCBrZXksIEZSRVFVRU5DWV9UWVBFKTtcbiAgICAgICAgdGhpcy5wYXRjaGVzLnB1c2gocCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGxvYWRHZW5lcmF0b3IoaW5zdHJEZWYsIGlucHV0LCBvdXRwdXQpIHtcbiAgICBpZiAoaW5zdHJEZWZbXCJjb21iaW5lZFwiXSkge1xuICAgICAgZm9yICh2YXIgaURlZiBvZiBpbnN0ckRlZltcImNvbWJpbmVkXCJdKSB7XG4gICAgICAgIHZhciBpeCA9IHRoaXMubG9hZEdlbmVyYXRvcihpRGVmLCBpbnB1dCwgb3V0cHV0KTtcbiAgICAgICAgaWYgKGl4KSB7XG4gICAgICAgICAgdmFyIHAgPSBuZXcgUGF0Y2goaW5wdXQsIGl4LCBcIkZSRVFcIiwgXCJGUkVRXCIsIEZSRVFVRU5DWV9UWVBFKTtcbiAgICAgICAgICB0aGlzLnBhdGNoZXMucHVzaChwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJwYW5uaW5nXCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBQYW5uaW5nKFwicGFubmluZ1wiKTtcbiAgICAgIHZhciBtID0gbmV3IE1vZHVsZSh0aGlzLCBNYXRoLnJhbmRvbSgpICogODAwICsgMTAwLCBNYXRoLnJhbmRvbSgpICogNjAwLCBnKTtcbiAgICAgIHRoaXMubW9kdWxlcy5wdXNoKG0pO1xuICAgICAgdmFyIHRJeCA9IHRoaXMubW9kdWxlcy5sZW5ndGggLSAxO1xuXG4gICAgICB2YXIgaXggPSB0aGlzLmxvYWRHZW5lcmF0b3IoaW5zdHJEZWZbXCJwYW5uaW5nXCJdLCBpbnB1dCwgb3V0cHV0KTtcbiAgICAgIHZhciBwID0gbmV3IFBhdGNoKHRJeCwgaXgsIFwiUEFOXCIsIFwiUEFOXCIsIFBBTk5JTkdfVFlQRSk7XG4gICAgICB0aGlzLnBhdGNoZXMucHVzaChwKTtcbiAgICAgIHZhciBwID0gbmV3IFBhdGNoKGlucHV0LCB0SXgsIFwiRlJFUVwiLCBcIkZSRVFcIiwgRlJFUVVFTkNZX1RZUEUpO1xuICAgICAgdGhpcy5wYXRjaGVzLnB1c2gocCk7XG4gICAgICB2YXIgcCA9IG5ldyBQYXRjaChpbnB1dCwgaXgsIFwiRlJFUVwiLCBcIkZSRVFcIiwgRlJFUVVFTkNZX1RZUEUpO1xuICAgICAgdGhpcy5wYXRjaGVzLnB1c2gocCk7XG5cbiAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1widHJhbnNwb3NlXCJdKSB7XG4gICAgICB2YXIgZyA9IG5ldyBUcmFuc3Bvc2UoXCJ0cmFuc3Bvc2VcIik7XG4gICAgICBnLmRpYWxzW1wic2VtaXRvbmVzXCJdLnZhbHVlID0gaW5zdHJEZWZbXCJ0cmFuc3Bvc2VcIl1bXCJzZW1pdG9uZXNcIl0gfHwgMDtcbiAgICAgIHZhciBtID0gbmV3IE1vZHVsZSh0aGlzLCBNYXRoLnJhbmRvbSgpICogODAwICsgMTAwLCBNYXRoLnJhbmRvbSgpICogNjAwLCBnKTtcbiAgICAgIHRoaXMubW9kdWxlcy5wdXNoKG0pO1xuXG4gICAgICB2YXIgdEl4ID0gdGhpcy5tb2R1bGVzLmxlbmd0aCAtIDE7XG4gICAgICB2YXIgaXggPSB0aGlzLmxvYWRHZW5lcmF0b3IoaW5zdHJEZWZbXCJ0cmFuc3Bvc2VcIl0sIHRJeCwgb3V0cHV0KTtcbiAgICAgIHZhciBwID0gbmV3IFBhdGNoKHRJeCwgaXgsIFwiRlJFUVwiLCBcIkZSRVFcIiwgRlJFUVVFTkNZX1RZUEUpO1xuICAgICAgdGhpcy5wYXRjaGVzLnB1c2gocCk7XG4gICAgICB2YXIgcCA9IG5ldyBQYXRjaChpbnB1dCwgdEl4LCBcIkZSRVFcIiwgXCJGUkVRIElOXCIsIEZSRVFVRU5DWV9UWVBFKTtcbiAgICAgIHRoaXMucGF0Y2hlcy5wdXNoKHApO1xuICAgIH0gZWxzZSBpZiAoaW5zdHJEZWZbXCJ3YXZcIl0pIHtcbiAgICAgIHZhciBtID0gbmV3IE1vZHVsZSh0aGlzLCAzMDAsIDQwLCBuZXcgU2FtcGxlR2VuZXJhdG9yKFwid2F2XCIpKTtcbiAgICAgIHZhciBwID0gbmV3IFBhdGNoKHRoaXMubW9kdWxlcy5sZW5ndGgsIG91dHB1dCwgXCJPVVRcIiwgXCJJTlwiLCBBVURJT19UWVBFKTtcbiAgICAgIHRoaXMubW9kdWxlcy5wdXNoKG0pO1xuICAgICAgdGhpcy5wYXRjaGVzLnB1c2gocCk7XG4gICAgICByZXR1cm4gdGhpcy5tb2R1bGVzLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInRyaWFuZ2xlXCJdIHx8IGluc3RyRGVmW1wic3F1YXJlXCJdIHx8IGluc3RyRGVmW1wic2F3dG9vdGhcIl0pIHtcbiAgICAgIHZhciB0eXAgPSBcInRyaWFuZ2xlXCI7XG4gICAgICB2YXIgaW5zdHIgPSBudWxsO1xuICAgICAgaWYgKGluc3RyRGVmW1widHJpYW5nbGVcIl0pIHtcbiAgICAgICAgaW5zdHIgPSBpbnN0ckRlZltcInRyaWFuZ2xlXCJdO1xuICAgICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInNxdWFyZVwiXSkge1xuICAgICAgICBpbnN0ciA9IGluc3RyRGVmW1wic3F1YXJlXCJdO1xuICAgICAgICB0eXAgPSBcInNxdWFyZVwiO1xuICAgICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInNhd3Rvb3RoXCJdKSB7XG4gICAgICAgIGluc3RyID0gaW5zdHJEZWZbXCJzYXd0b290aFwiXTtcbiAgICAgICAgdHlwID0gXCJzYXdcIjtcbiAgICAgIH1cbiAgICAgIHZhciBnID0gbmV3IFNhbXBsZUdlbmVyYXRvcih0eXApO1xuICAgICAgZy5kaWFsc1tcImF0dGFja1wiXS52YWx1ZSA9IGluc3RyW1wiYXR0YWNrXCJdIHx8IDAuMDtcbiAgICAgIGcuZGlhbHNbXCJkZWNheVwiXS52YWx1ZSA9IGluc3RyW1wiZGVjYXlcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcInN1c3RhaW5cIl0udmFsdWUgPSBpbnN0cltcInN1c3RhaW5cIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcInJlbGVhc2VcIl0udmFsdWUgPSBpbnN0cltcInJlbGVhc2VcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcImdhaW5cIl0udmFsdWUgPSBpbnN0cltcImdhaW5cIl0gfHwgMS4wO1xuICAgICAgdmFyIG0gPSBuZXcgTW9kdWxlKHRoaXMsIE1hdGgucmFuZG9tKCkgKiA4MDAgKyAxMDAsIE1hdGgucmFuZG9tKCkgKiA2MDAgKyAyMCwgZyk7XG4gICAgICB2YXIgcCA9IG5ldyBQYXRjaCh0aGlzLm1vZHVsZXMubGVuZ3RoLCBvdXRwdXQsIFwiT1VUXCIsIFwiSU5cIiwgQVVESU9fVFlQRSk7XG4gICAgICB0aGlzLm1vZHVsZXMucHVzaChtKTtcbiAgICAgIHRoaXMucGF0Y2hlcy5wdXNoKHApO1xuICAgICAgcmV0dXJuIHRoaXMubW9kdWxlcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyAnVW5rbm93biBpbnN0cnVtZW50IGRlZiAnICsgaW5zdHJEZWY7XG4gICAgfVxuICB9XG4gIGxvYWQoaW5zdHJEZWYpIHtcbiAgICB2YXIgbW9kdWxlcyA9IFtdO1xuICAgIGZvciAodmFyIG0gb2YgaW5zdHJEZWYubW9kdWxlcykge1xuICAgICAgdmFyIGcgPSBudWxsO1xuICAgICAgaWYgKG0udHlwZSA9PSBcImlucHV0XCIpIHtcbiAgICAgICAgZyA9IG5ldyBDaGFubmVsSW5wdXQobS50eXBlKTtcbiAgICAgIH0gZWxzZSBpZiAobS50eXBlID09IFwib3V0cHV0XCIpIHtcbiAgICAgICAgZyA9IG5ldyBDaGFubmVsT3V0cHV0KG0udHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKG0udHlwZSA9PSBcImxvdyBwYXNzIGZpbHRlclwiKSB7XG4gICAgICAgIGcgPSBuZXcgRmlsdGVyKG0udHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKG0udHlwZSA9PSBcInNpbmVcIiB8fCBtLnR5cGUgPT0gXCJ0cmlhbmdsZVwiKSB7XG4gICAgICAgIGcgPSBuZXcgU2FtcGxlR2VuZXJhdG9yKG0udHlwZSk7XG4gICAgICB9XG4gICAgICBpZiAoZykge1xuICAgICAgICB2YXIgbW9kID0gbmV3IE1vZHVsZSh0aGlzLCBtLngsIG0ueSwgZyk7XG4gICAgICAgIG1vZHVsZXMucHVzaChtb2QpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgcGF0Y2hlcyA9IFtdO1xuICAgIGZvciAodmFyIHAgb2YgaW5zdHJEZWYucGF0Y2hlcykge1xuICAgICAgdGhpcy5hZGRQYXRjaChwLmZyb21fbW9kdWxlLCBwLnRvX21vZHVsZSwgcC5mcm9tX3NvY2tldCwgcC50b19zb2NrZXQpO1xuICAgIH1cbiAgICB0aGlzLm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgIHRoaXMucGF0Y2hlcyA9IHBhdGNoZXM7XG4gIH1cblxuICBjb21waWxlKCkge1xuICAgIHZhciBvdXRwdXQgPSBudWxsO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbSA9IHRoaXMubW9kdWxlc1tpXTtcbiAgICAgIGlmIChtLnVuaXQudHlwZSA9PSBcIm91dHB1dFwiKSB7XG4gICAgICAgIG91dHB1dCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghb3V0cHV0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgcXVldWUgPSBbb3V0cHV0XTtcbiAgICB2YXIgc2VlbiA9IHt9O1xuICAgIHZhciBkZXBlbmRlbmNpZXMgPSBbXTtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHEgPSBxdWV1ZVswXTtcbiAgICAgIHZhciBxdWV1ZSA9IHF1ZXVlLnNwbGljZSgxKTtcbiAgICAgIGlmIChzZWVuW3FdKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBkZXBlbmRlbmNpZXMucHVzaChxKTtcbiAgICAgIGZvciAodmFyIHAgb2YgdGhpcy5wYXRjaGVzKSB7XG4gICAgICAgIHZhciBtb2RTb2NrZXRzID0gdGhpcy5tb2R1bGVzW3FdLnVuaXQuc29ja2V0cztcbiAgICAgICAgaWYgKHAudG8gPT09IHEgJiYgbW9kU29ja2V0c1twLnRvU29ja2V0XS5pc0lucHV0KSB7XG4gICAgICAgICAgaWYgKCFzZWVuW3AuZnJvbV0pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2gocC5mcm9tKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocC5mcm9tID09PSBxICYmIG1vZFNvY2tldHNbcC5mcm9tU29ja2V0XS5pc0lucHV0KSB7XG4gICAgICAgICAgaWYgKCFzZWVuW3AudG9dKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKHAudG8pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2VlbltxXSA9IHRydWU7XG4gICAgfVxuICAgIHZhciBnZW5lcmF0b3JzID0ge307XG4gICAgZm9yICh2YXIgaSA9IGRlcGVuZGVuY2llcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGl4ID0gZGVwZW5kZW5jaWVzW2ldO1xuICAgICAgdmFyIHVuaXQgPSB0aGlzLm1vZHVsZXNbaXhdLnVuaXQ7XG4gICAgICB2YXIgZyA9IG51bGw7XG4gICAgICBpZiAodW5pdC50eXBlID09IFwiaW5wdXRcIikge1xuICAgICAgICBnID0gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAodW5pdC50eXBlID09IFwid2F2XCIpIHtcbiAgICAgICAgZyA9IHtcIndhdlwiOiB7XG4gICAgICAgICAgXCJmaWxlXCI6IFwiXCIsXG4gICAgICAgIH19O1xuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJ0cmlhbmdsZVwiIFxuICAgICAgICB8fCB1bml0LnR5cGUgPT0gXCJzaW5lXCIgXG4gICAgICAgIHx8IHVuaXQudHlwZSA9PSBcInNhd1wiIFxuICAgICAgICB8fCB1bml0LnR5cGUgPT0gXCJzcXVhcmVcIiBcbiAgICAgICAgfHwgdW5pdC50eXBlID09IFwid2hpdGVfbm9pc2VcIikge1xuICAgICAgICBnID0ge307XG4gICAgICAgIGdbdW5pdC50eXBlXSA9IHtcbiAgICAgICAgICBcImdhaW5cIjogdW5pdC5kaWFsc1tcImdhaW5cIl0udmFsdWUsXG4gICAgICAgICAgXCJwYW5uaW5nXCI6IHVuaXQuZGlhbHNbXCJwYW5uaW5nXCJdLnZhbHVlLFxuICAgICAgICAgIFwiYXR0YWNrXCI6IHVuaXQuZGlhbHNbXCJhdHRhY2tcIl0udmFsdWUsXG4gICAgICAgICAgXCJkZWNheVwiOiB1bml0LmRpYWxzW1wiZGVjYXlcIl0udmFsdWUsXG4gICAgICAgICAgXCJzdXN0YWluXCI6IHVuaXQuZGlhbHNbXCJzdXN0YWluXCJdLnZhbHVlLFxuICAgICAgICAgIFwicmVsZWFzZVwiOiB1bml0LmRpYWxzW1wicmVsZWFzZVwiXS52YWx1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBpdGNoRm91bmQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgcCBvZiB0aGlzLnBhdGNoZXMpIHtcbiAgICAgICAgICBpZiAocC5kb2VzUGF0Y2hDb25uZWN0VG8oaXgsIFwiRlJFUVwiKSkge1xuICAgICAgICAgICAgcGl0Y2hGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcGcgPSBnZW5lcmF0b3JzW3AuY29ubmVjdHNUbyhpeCwgXCJGUkVRXCIpLm1vZHVsZV07XG4gICAgICAgICAgICBpZiAocGcpIHtcbiAgICAgICAgICAgICAgZ1t1bml0LnR5cGVdW1wiYXV0b19waXRjaFwiXSA9IHBnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXBpdGNoRm91bmQpIHtcbiAgICAgICAgICBnW3VuaXQudHlwZV1bXCJwaXRjaFwiXSA9IHVuaXQuZGlhbHNbXCJwaXRjaFwiXS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJsb3cgcGFzcyBmaWx0ZXJcIikge1xuICAgICAgICBnID0ge307XG4gICAgICAgIGdbXCJmaWx0ZXJcIl0gPSB7XCJscGZcIjoge1wiY3V0b2ZmXCI6IHVuaXQuZGlhbHNbXCJjdXRvZmZcIl0udmFsdWV9fVxuICAgICAgICB2YXIgb24gPSB0aGlzLmNvbXBpbGVHZW5lcmF0b3JzKGdlbmVyYXRvcnMsIGl4LCBcIklOXCIpO1xuICAgICAgICBPYmplY3Qua2V5cyhvbikubWFwKChrKSA9PiB7XG4gICAgICAgICAgZ1tcImZpbHRlclwiXVtrXSA9IG9uW2tdO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodW5pdC50eXBlID09IFwiaGlnaCBwYXNzIGZpbHRlclwiKSB7XG4gICAgICAgIGcgPSB7fTtcbiAgICAgICAgZ1tcImZpbHRlclwiXSA9IHtcImhwZlwiOiB7XCJjdXRvZmZcIjogdW5pdC5kaWFsc1tcImN1dG9mZlwiXS52YWx1ZX19XG4gICAgICAgIHZhciBvbiA9IHRoaXMuY29tcGlsZUdlbmVyYXRvcnMoZ2VuZXJhdG9ycywgaXgsIFwiSU5cIik7XG4gICAgICAgIE9iamVjdC5rZXlzKG9uKS5tYXAoKGspID0+IHtcbiAgICAgICAgICBnW1wiZmlsdGVyXCJdW2tdID0gb25ba107XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJ0cmFuc3Bvc2VcIikge1xuICAgICAgICBnID0ge1widHJhbnNwb3NlXCI6IHtcbiAgICAgICAgICBcInNlbWl0b25lc1wiOiB1bml0LmRpYWxzW1wic2VtaXRvbmVzXCJdLnZhbHVlLFxuICAgICAgICB9fVxuICAgICAgICB2YXIgb24gPSB0aGlzLmNvbXBpbGVHZW5lcmF0b3JzKGdlbmVyYXRvcnMsIGl4LCBcIkZSRVEgSU5cIik7XG4gICAgICAgIGlmIChvbikge1xuICAgICAgICAgIE9iamVjdC5rZXlzKG9uKS5tYXAoKGspID0+IHtcbiAgICAgICAgICAgIGdbXCJ0cmFuc3Bvc2VcIl1ba10gPSBvbltrXTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJwYW5uaW5nXCIpIHtcbiAgICAgICAgZyA9IHtcInBhbm5pbmdcIjoge319XG4gICAgICAgIHZhciBvbiA9IHRoaXMuY29tcGlsZUdlbmVyYXRvcnMoZ2VuZXJhdG9ycywgaXgsIFwiRlJFUSBJTlwiKTtcbiAgICAgICAgaWYgKG9uKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMob24pLm1hcCgoaykgPT4ge1xuICAgICAgICAgICAgZ1tcInBhbm5pbmdcIl1ba10gPSBvbltrXTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJvdXRwdXRcIikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5jb21waWxlR2VuZXJhdG9ycyhnZW5lcmF0b3JzLCBpeCwgXCJJTlwiKTtcbiAgICAgICAgaWYgKHRoaXMubmFtZSkge1xuICAgICAgICAgIHJlc3VsdC5uYW1lID0gdGhpcy5uYW1lXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW5zdHJ1bWVudEJhbmtJbmRleCkge1xuICAgICAgICAgIHJlc3VsdC5pbmRleCA9IHRoaXMuaW5zdHJ1bWVudEJhbmtJbmRleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgZ2VuZXJhdG9yc1tpeF0gPSBnO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbXBpbGVHZW5lcmF0b3JzKGdlbmVyYXRvcnMsIGl4LCBpbnB1dCkge1xuICAgIHZhciBncyA9IFtdO1xuICAgIGZvciAodmFyIHAgb2YgdGhpcy5wYXRjaGVzKSB7XG4gICAgICBpZiAocC5kb2VzUGF0Y2hDb25uZWN0VG8oaXgsIGlucHV0KSkge1xuICAgICAgICBncy5wdXNoKGdlbmVyYXRvcnNbcC5jb25uZWN0c1RvKGl4LCBpbnB1dCkubW9kdWxlXSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIGlmIChncy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBnc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcImNvbWJpbmVkXCI6IGdzfVxuICAgIH1cbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBNb2R1bGVVbml0LCBPdXRwdXRTb2NrZXQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBGUkVRVUVOQ1lfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBDaGFubmVsSW5wdXQgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiRlJFUVwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJGUkVRXCIsIEZSRVFVRU5DWV9UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZU91dHB1dCc7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZVVuaXQsIElucHV0U29ja2V0IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgQVVESU9fVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cblxuZXhwb3J0IGNsYXNzIENoYW5uZWxPdXRwdXQgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiSU5cIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJJTlwiLCBBVURJT19UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZU91dHB1dCc7XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IEFVRElPX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgRmlsdGVyIGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIklOXCI6IG5ldyBJbnB1dFNvY2tldCgyOSwgdGhpcy5oIC0gMjksIFwiSU5cIiwgQVVESU9fVFlQRSksXG4gICAgICBcIk9VVFwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJPVVRcIiwgQVVESU9fVFlQRSksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVGaWx0ZXInO1xuICAgIHRoaXMuZGlhbHMgPSB7IH1cblxuICAgIGlmICh0eXBlID09PSBcImxvdyBwYXNzIGZpbHRlclwiIHx8IHR5cGUgPT09IFwiaGlnaCBwYXNzIGZpbHRlclwiKSB7XG4gICAgICB0aGlzLncgPSAxNTA7XG4gICAgICB0aGlzLmRpYWxzW1wiY3V0b2ZmXCJdID0gbmV3IERpYWwoMjksIDU5LCBcIkNVVE9GRlwiLCAxLjAsIDIyMDAwLjAsIDUwMDAuMCk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcImRlbGF5XCIpIHtcbiAgICAgIHRoaXMudyA9IDE3MDtcbiAgICAgIHRoaXMuZGlhbHNbXCJ0aW1lXCJdID0gbmV3IERpYWwoMjksIDU5LCBcIlRJTUVcIiwgMC4wMDAwMSwgNC4wLCAxLjApO1xuICAgICAgdGhpcy5kaWFsc1tcImZhY3RvclwiXSA9IG5ldyBEaWFsKDc5LCA1OSwgXCJGQUNUT1JcIiwgMC4wLCAyLjAsIDEuMCk7XG4gICAgICB0aGlzLmRpYWxzW1wiZmVlZGJhY2tcIl0gPSBuZXcgRGlhbCgxMjksIDU5LCBcIkZFRURCQUNLXCIsIDAuMCwgMi4wLCAwLjApO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IHsgQ2hhbm5lbElucHV0IH0gZnJvbSAnLi9jaGFubmVsX2lucHV0LmpzJztcbmV4cG9ydCB7IENoYW5uZWxPdXRwdXQgfSBmcm9tICcuL2NoYW5uZWxfb3V0cHV0LmpzJztcbmV4cG9ydCB7IEZpbHRlciB9IGZyb20gJy4vZmlsdGVyLmpzJztcbmV4cG9ydCB7IFNhbXBsZUdlbmVyYXRvciB9IGZyb20gJy4vc2FtcGxlX2dlbmVyYXRvci5qcyc7XG5leHBvcnQgeyBUcmFuc3Bvc2UgfSBmcm9tICcuL3RyYW5zcG9zZS5qcyc7XG5leHBvcnQgeyBQYW5uaW5nIH0gZnJvbSAnLi9wYW5uaW5nLmpzJztcbiIsImltcG9ydCB7IElucHV0U29ja2V0LCBPdXRwdXRTb2NrZXQsIERpYWwsIE1vZHVsZVVuaXQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBGUkVRVUVOQ1lfVFlQRSwgUEFOTklOR19UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFBhbm5pbmcgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVEZXJpdmVkJztcbiAgICB0aGlzLncgPSAxMjA7XG4gICAgdGhpcy5oID0gMTUwO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiRlJFUVwiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIkZSRVFcIiwgRlJFUVVFTkNZX1RZUEUpLFxuICAgICAgXCJQQU5cIjogbmV3IE91dHB1dFNvY2tldCh0aGlzLncgLSAyOSwgdGhpcy5oIC0gMjksIFwiUEFOXCIsIFBBTk5JTkdfVFlQRSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBJbnB1dFNvY2tldCwgT3V0cHV0U29ja2V0LCBEaWFsLCBNb2R1bGVVbml0IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgRlJFUVVFTkNZX1RZUEUsIEFVRElPX1RZUEUsIFBBTk5JTkdfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBTYW1wbGVHZW5lcmF0b3IgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVHZW5lcmF0b3InO1xuICAgIHRoaXMudyA9IDIyMDtcbiAgICB0aGlzLmggPSAyNTA7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJGUkVRXCI6IG5ldyBJbnB1dFNvY2tldCgyOSwgdGhpcy5oIC0gMjksIFwiRlJFUVwiLCBGUkVRVUVOQ1lfVFlQRSksXG4gICAgICBcIlBBTlwiOiBuZXcgSW5wdXRTb2NrZXQoNzksIHRoaXMuaCAtIDI5LCBcIlBBTlwiLCBQQU5OSU5HX1RZUEUpLFxuICAgICAgXCJPVVRcIjogbmV3IE91dHB1dFNvY2tldCh0aGlzLncgLSAyOSwgdGhpcy5oIC0gMjksIFwiT1VUXCIsIEFVRElPX1RZUEUpLFxuICAgIH1cbiAgICB0aGlzLmRpYWxzID0ge1xuICAgICAgXCJwaXRjaFwiOiBuZXcgRGlhbCgyOSwgNDksIFwiRlJFUVwiLCAwLjAsIDIyMDAwLjAsIDAuMCksXG4gICAgICBcImdhaW5cIjogbmV3IERpYWwoNzksIDQ5LCBcIkdBSU5cIiwgMC4wLCA0LjAsIDEuMCksXG4gICAgICBcInBhbm5pbmdcIjogbmV3IERpYWwoMTI5LCA0OSwgXCJQQU5cIiwgMC4wLCAxLjAsIDAuNSksXG4gICAgICBcImF0dGFja1wiOiBuZXcgRGlhbCgyOSwgMTIwLCBcIkFUVEFDS1wiLCAwLjAsIDEwLjAsIDAuMSksXG4gICAgICBcImRlY2F5XCI6IG5ldyBEaWFsKDc5LCAxMjAsIFwiREVDQVlcIiwgMC4wLCAxMC4wLCAwLjEpLFxuICAgICAgXCJzdXN0YWluXCI6IG5ldyBEaWFsKDEyOSwgMTIwLCBcIlNVU1RBSU5cIiwgMC4wLCAxLjAsIDAuOCksXG4gICAgICBcInJlbGVhc2VcIjogbmV3IERpYWwoMTc5LCAxMjAsIFwiUkVMRUFTRVwiLCAwLjAsIDEwLCAwLjEpLFxuICAgIH1cbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBJbnB1dFNvY2tldCwgT3V0cHV0U29ja2V0LCBEaWFsLCBNb2R1bGVVbml0IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgRlJFUVVFTkNZX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgVHJhbnNwb3NlIGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlRGVyaXZlZCc7XG4gICAgdGhpcy53ID0gMTIwO1xuICAgIHRoaXMuaCA9IDE1MDtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIkZSRVEgSU5cIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJGUkVRIElOXCIsIEZSRVFVRU5DWV9UWVBFKSxcbiAgICAgIFwiRlJFUVwiOiBuZXcgT3V0cHV0U29ja2V0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJGUkVRXCIsIEZSRVFVRU5DWV9UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscyA9IHtcbiAgICAgIFwic2VtaXRvbmVzXCI6IG5ldyBEaWFsKDI5LCA0OSwgXCJTRU1JVE9ORVNcIiwgLTI0LCAyNCwgMC4wKSxcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFRoZW1lIH0gZnJvbSAnLi90aGVtZS5qcyc7XG5pbXBvcnQgeyBJbnN0cnVtZW50RWRpdG9yLCBJbnN0cnVtZW50LCBCYW5rIH0gZnJvbSAnLi9pbnN0cnVtZW50X2VkaXRvci8nO1xuaW1wb3J0IHsgVGltZWxpbmVFZGl0b3IsIENoYW5uZWwgfSBmcm9tICcuL3RpbWVsaW5lX2VkaXRvci8nO1xuaW1wb3J0IHsgU2VxdWVuY2VFZGl0b3IgfSBmcm9tICcuL3NlcXVlbmNlX2VkaXRvci8nO1xuXG5leHBvcnQgY2xhc3MgQmxlZXAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XG4gICAgdGhpcy50aGVtZSA9IG5ldyBUaGVtZSgpO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLmNhbnZhcy5vbm1vdXNlZG93biA9IHRoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQodGhpcylcbiAgICB0aGlzLmNhbnZhcy5vbm1vdXNldXAgPSB0aGlzLmhhbmRsZU1vdXNlVXAuYmluZCh0aGlzKVxuICAgIHRoaXMuY2FudmFzLm9ubW91c2Vtb3ZlID0gdGhpcy5oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKVxuICAgIHRoaXMuc2VsZWN0ZWRFbGVtID0gbnVsbDtcbiAgICB0aGlzLnN0YXJ0U2VsZWN0ZWRQb3MgPSB7fTtcbiAgICB0aGlzLnNlbGVjdGVkUG9zID0ge307XG4gICAgdGhpcy5jaGFubmVscyA9IFtuZXcgQ2hhbm5lbCgxLCB0aGlzLm9wZW5JbnN0cnVtZW50RWRpdG9yLmJpbmQodGhpcykpXTtcbiAgICB2YXIgYmFuayA9IHRoaXMubG9hZEluc3RydW1lbnRCYW5rKGluc3RydW1lbnRCYW5rKTtcbiAgICAvL3RoaXMubG9hZChleGFtcGxlKTtcbiAgICAvL3RoaXMub3BlblRpbWVsaW5lRWRpdG9yKCk7XG4gICAgLy90aGlzLm9wZW5JbnN0cnVtZW50RWRpdG9yKGJhbmsuaW5zdHJ1bWVudHNbMF0pO1xuICAgIHRoaXMub3BlblNlcXVlbmNlRWRpdG9yKG51bGwsIDEpO1xuICAgIHRoaXMuZHJhdygpO1xuICB9XG5cbiAgbG9hZEluc3RydW1lbnRCYW5rKGJhbmspIHtcbiAgICByZXR1cm4gbmV3IEJhbmsoKS5sb2FkRnJvbURlZmluaXRpb24oYmFuayk7XG4gIH1cblxuICBsb2FkKGRhdGEpIHtcbiAgICB0aGlzLmNoYW5uZWxzID0gW107XG4gICAgZm9yICh2YXIgY2ggb2YgZGF0YS5jaGFubmVscykge1xuICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgQ2hhbm5lbChjaC5jaGFubmVsX25yLCB0aGlzLm9wZW5JbnN0cnVtZW50RWRpdG9yLmJpbmQodGhpcykpO1xuICAgICAgY2hhbm5lbC5uYW1lID0gY2gubmFtZTtcbiAgICAgIGNoYW5uZWwuc2VxdWVuY2VfdHJhY2tzID0gY2guc2VxdWVuY2VfdHJhY2tzO1xuICAgICAgaWYgKGNoLmluc3RydW1lbnQpIHtcbiAgICAgICAgY2hhbm5lbC5pbnN0cnVtZW50ID0gbmV3IEluc3RydW1lbnQoKTtcbiAgICAgICAgY2hhbm5lbC5pbnN0cnVtZW50LmxvYWQoY2guaW5zdHJ1bWVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5uZWxzLnB1c2goY2hhbm5lbCk7XG4gICAgfVxuICB9XG5cbiAgb3Blbkluc3RydW1lbnRFZGl0b3IoaW5zdHIpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IG5ldyBJbnN0cnVtZW50RWRpdG9yKHRoaXMsIGluc3RyLCB0aGlzLm9wZW5UaW1lbGluZUVkaXRvci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmRyYXcoKVxuICB9XG4gIG9wZW5UaW1lbGluZUVkaXRvcigpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IG5ldyBUaW1lbGluZUVkaXRvcih0aGlzLmNoYW5uZWxzKTtcbiAgICB0aGlzLmRyYXcoKTtcbiAgfVxuICBvcGVuU2VxdWVuY2VFZGl0b3Ioc2VxdWVuY2UsIGNoYW5uZWxOcikge1xuICAgIHRoaXMuYWN0aXZlID0gbmV3IFNlcXVlbmNlRWRpdG9yKHRoaXMsIHNlcXVlbmNlLCBjaGFubmVsTnIsIHRoaXMub3BlblRpbWVsaW5lRWRpdG9yLmJpbmQodGhpcykpXG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICBoYW5kbGVNb3VzZURvd24oZSkge1xuICAgIHZhciBib3VuZCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgdmFyIHggPSBlLmNsaWVudFggLSBib3VuZC5sZWZ0OyBcbiAgICB2YXIgeSA9IGUuY2xpZW50WSAtIGJvdW5kLnRvcDtcbiAgICB0aGlzLnNlbGVjdGVkRWxlbSA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3RlZFBvcyA9IHt9O1xuICAgIGlmICh0aGlzLmFjdGl2ZS5oYW5kbGVNb3VzZURvd24pIHtcbiAgICAgIHZhciBlbGVtID0gdGhpcy5hY3RpdmUuaGFuZGxlTW91c2VEb3duKHRoaXMsIHgsIHkpO1xuICAgICAgaWYgKGVsZW0pIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEVsZW0gPSBlbGVtO1xuICAgICAgICB0aGlzLnN0YXJ0U2VsZWN0ZWRQb3MgPSB7eCwgeX07XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQb3MgPSB7eCwgeX07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTW91c2VVcChlKSB7XG4gICAgdmFyIGJvdW5kID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB2YXIgeCA9IGUuY2xpZW50WCAtIGJvdW5kLmxlZnQ7IFxuICAgIHZhciB5ID0gZS5jbGllbnRZIC0gYm91bmQudG9wO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkRWxlbSkge1xuICAgICAgdmFyIGVsZW0gPSB0aGlzLnNlbGVjdGVkRWxlbTtcbiAgICAgIHZhciBzeCA9IHRoaXMuc3RhcnRTZWxlY3RlZFBvcy54O1xuICAgICAgdmFyIHN5ID0gdGhpcy5zdGFydFNlbGVjdGVkUG9zLnk7XG4gICAgICBpZiAoc3ggPj0geCAtNSAmJiBzeCA8PSB4ICsgNSAmJiBzeSA+PSB5IC0gNSAmJiBzeSA8PSB5ICsgNSkge1xuICAgICAgICBpZiAoZWxlbS5oYW5kbGVDbGljaykge1xuICAgICAgICAgIGVsZW0uaGFuZGxlQ2xpY2sodGhpcywgeCwgeSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbGVtLmhhbmRsZURyb3ApIHtcbiAgICAgICAgICBlbGVtLmhhbmRsZURyb3AodGhpcywgeCwgeSk7XG4gICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuc2VsZWN0ZWRFbGVtID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVNb3VzZU1vdmUoZSkge1xuICAgIHZhciBib3VuZCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgdmFyIHggPSBlLmNsaWVudFggLSBib3VuZC5sZWZ0OyBcbiAgICB2YXIgeSA9IGUuY2xpZW50WSAtIGJvdW5kLnRvcDtcbiAgICBpZiAodGhpcy5zZWxlY3RlZEVsZW0pIHtcbiAgICAgIHZhciBlbGVtID0gdGhpcy5zZWxlY3RlZEVsZW07XG4gICAgICB2YXIgc3ggPSB0aGlzLnNlbGVjdGVkUG9zLng7XG4gICAgICB2YXIgc3kgPSB0aGlzLnNlbGVjdGVkUG9zLnk7XG4gICAgICBpZiAoc3ggPj0geCAtNSAmJiBzeCA8PSB4ICsgNSAmJiBzeSA+PSB5IC0gNSAmJiBzeSA8PSB5ICsgNSkge1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsZW0uaGFuZGxlRHJhZykge1xuICAgICAgICAgIGVsZW0uaGFuZGxlRHJhZyh0aGlzLCB4IC0gc3gsIHkgLSBzeSwgeCwgeSwgc3gsIHN5KTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkUG9zID0ge3gsIHl9O1xuICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhdygpIHtcbiAgICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB2YXIgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIHZhciBib3VuZCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB3aW5kb3dXaWR0aDtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3dIZWlnaHQgLSBib3VuZC50b3A7XG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZCA9IHRoaXMudGhlbWUuY29sb3Vycy5CYWNrZ3JvdW5kO1xuICAgIGJvZHkuc3R5bGUuY29sb3IgPSB0aGlzLnRoZW1lLmNvbG91cnMuRm9yZWdyb3VuZDtcbiAgICB0aGlzLmFjdGl2ZS5kcmF3KHRoaXMpO1xuICB9XG59XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIHRyeSB7IFxuICBuZXcgQmxlZXAoKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gICAgYWxlcnQoZSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBBVURJT19UWVBFID0gMTtcbmV4cG9ydCBjb25zdCBGUkVRVUVOQ1lfVFlQRSA9IDI7XG5leHBvcnQgY29uc3QgUEFOTklOR19UWVBFID0gMztcbmV4cG9ydCBjb25zdCBDTE9DS19UWVBFID0gNDtcbmV4cG9ydCBjb25zdCBUUklHR0VSX1RZUEUgPSA1O1xuZXhwb3J0IGNvbnN0IElOVF9UWVBFID0gNjtcbmV4cG9ydCB7IFBhdGNoYWJsZSB9IGZyb20gJy4vcGF0Y2hhYmxlLmpzJztcbiIsImltcG9ydCB7IFBhdGNoIH0gZnJvbSAnLi4vY29tcG9uZW50cy8nO1xuXG5leHBvcnQgY2xhc3MgUGF0Y2hhYmxlIHtcbiAgY29uc3RydWN0b3IobW9kdWxlcywgcGF0Y2hlcykge1xuICAgIHRoaXMubW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgdGhpcy5wYXRjaGVzID0gcGF0Y2hlcztcbiAgfVxuICBhZGRQYXRjaChmcm9tTW9kLCB0b01vZCwgZnJvbVNvY2tldCwgdG9Tb2NrZXQpIHtcbiAgICB2YXIgZnJvbSA9IG51bGw7XG4gICAgdmFyIHRvID0gbnVsbDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG0gPSB0aGlzLm1vZHVsZXNbaV07XG4gICAgICBpZiAobSA9PT0gZnJvbU1vZCkge1xuICAgICAgICBmcm9tID0gaTtcbiAgICAgIH1cbiAgICAgIGlmIChtID09PSB0b01vZCkge1xuICAgICAgICB0byA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmcm9tID09PSBudWxsIHx8IHRvID09PSBudWxsIHx8IChmcm9tID09PSB0byAmJiBmcm9tU29ja2V0ID09PSB0b1NvY2tldCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy5tb2R1bGVzW2Zyb21dLnVuaXQuc29ja2V0c1tmcm9tU29ja2V0XS50eXBlICE9IHRoaXMubW9kdWxlc1t0b10udW5pdC5zb2NrZXRzW3RvU29ja2V0XS50eXBlKSB7XG4gICAgICBhbGVydChcIldyb25nIHR5cGVzXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcGF0Y2ggPSBuZXcgUGF0Y2goZnJvbSwgdG8sIGZyb21Tb2NrZXQsIHRvU29ja2V0LCB0aGlzLm1vZHVsZXNbZnJvbV0udW5pdC5zb2NrZXRzW2Zyb21Tb2NrZXRdLnR5cGUpO1xuICAgIHZhciByZW1vdmUgPSBudWxsO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcCA9IHRoaXMucGF0Y2hlc1tpXTtcbiAgICAgIGlmIChwLmlzSXNvbW9ycGhpYyhwYXRjaCkpIHtcbiAgICAgICAgcmVtb3ZlID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyZW1vdmUgPT09IG51bGwpIHtcbiAgICAgIHRoaXMucGF0Y2hlcy5wdXNoKHBhdGNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXRjaGVzLnNwbGljZShyZW1vdmUsIDEpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJcbmltcG9ydCB7IEVkaXRvciwgQnV0dG9uLCBNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBTZXF1ZW5jZSB9IGZyb20gJy4vc2VxdWVuY2UuanMnO1xuaW1wb3J0IHsgU2VxdWVuY2VJbnB1dCwgU2VxdWVuY2VPdXRwdXQsIFB1bHNlLCBQbGF5Tm90ZSwgUmFuZ2UgfSBmcm9tICcuL21vZHVsZV91bml0cy8nO1xuXG5leHBvcnQgY2xhc3MgU2VxdWVuY2VFZGl0b3IgZXh0ZW5kcyBFZGl0b3Ige1xuICBjb25zdHJ1Y3RvcihhcHAsIHNlcXVlbmNlLCBjaGFubmVsTnIsIGhhbmRsZUNsb3NlKSB7XG4gICAgc3VwZXIoYXBwLCBzZXF1ZW5jZSwgaGFuZGxlQ2xvc2UpO1xuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIGlmICghc2VxdWVuY2UpIHtcbiAgICAgIHNlcXVlbmNlID0gbmV3IFNlcXVlbmNlKFtdLCBbXSwgY2hhbm5lbE5yKTtcbiAgICAgIHZhciBtb2R1bGVzID0gW1xuICAgICAgICBuZXcgTW9kdWxlKHNlcXVlbmNlLCAzMCwgNTAsIG5ldyBTZXF1ZW5jZUlucHV0KCdpbnB1dCcpKSwgXG4gICAgICBdO1xuICAgICAgc2VxdWVuY2UubW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgfVxuICAgIHRoaXMudGFyZ2V0ID0gc2VxdWVuY2U7XG4gICAgdmFyIGJ1dHRvbkRlZnMgPSBbXG4gICAgICAgIHtsYWJlbDogXCLwnYWdXCIsIGNvbG91cjogJ01vZHVsZVB1bHNlJywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRVbml0KCgpID0+IG5ldyBQdWxzZSg0KSl9LFxuICAgICAgICB7bGFiZWw6IFwi8J2FnlwiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUHVsc2UoMikpfSxcbiAgICAgICAge2xhYmVsOiBcIuKZqVwiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUHVsc2UoMSkpfSxcbiAgICAgICAge2xhYmVsOiBcIuKZqlwiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUHVsc2UoMC41KSl9LFxuICAgICAgICB7bGFiZWw6IFwi8J2FoVwiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUHVsc2UoMC4yNSkpfSxcbiAgICAgICAge2xhYmVsOiBcIvCdhaJcIiwgY29sb3VyOiAnTW9kdWxlUHVsc2UnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFB1bHNlKDAuMTI1KSl9LFxuICAgICAgICB7bGFiZWw6IFwiUFVMU1wiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUHVsc2UoKSl9LFxuICAgICAgICB7bGFiZWw6IFwiRVVDTFwiLCBjb2xvdXI6ICdNb2R1bGVQdWxzZScsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJOT1RFXCIsIGNvbG91cjogJ01vZHVsZU91dHB1dCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUGxheU5vdGUoKSl9LFxuICAgICAgICB7bGFiZWw6IFwiUEFOXCIsIGNvbG91cjogJ01vZHVsZU91dHB1dCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJSRVZcIiwgY29sb3VyOiAnTW9kdWxlT3V0cHV0Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzaW5lXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIkxQRlwiLCBjb2xvdXI6ICdNb2R1bGVPdXRwdXQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiSFBGXCIsIGNvbG91cjogJ01vZHVsZU91dHB1dCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG5cbiAgICAgICAge2xhYmVsOiBcIlNXRUVQXCIsIGNvbG91cjogJ01vZHVsZUludCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUmFuZ2UoXCJzd2VlcFwiKSl9LFxuICAgICAgICB7bGFiZWw6IFwiQ1lDTEVcIiwgY29sb3VyOiAnTW9kdWxlSW50Jywgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJzaW5lXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlJBTkdFXCIsIGNvbG91cjogJ01vZHVsZUludCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkVW5pdCgoKSA9PiBuZXcgUmFuZ2UoXCJyYW5nZVwiKSl9LFxuICAgICAgICB7bGFiZWw6IFwiRkFERVwiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZFVuaXQoKCkgPT4gbmV3IFJhbmdlKFwiZmFkZSBpblwiKSl9LFxuICAgICAgICB7bGFiZWw6IFwiUkFORFwiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiUkVHXCIsIGNvbG91cjogJ01vZHVsZUludCcsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic2luZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJUUkFOU1wiLCBjb2xvdXI6ICdNb2R1bGVJbnQnLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgIF1cblxuICAgIHZhciB4ID0gMDtcbiAgICB2YXIgcHJldiA9IG51bGw7XG4gICAgdmFyIHBhZGRpbmcgPSAwO1xuICAgIHZhciBncm91cFBhZGRpbmcgPSAxNTtcbiAgICBmb3IgKHZhciBkZWYgb2YgYnV0dG9uRGVmcykge1xuICAgICAgdmFyIGIgPSBuZXcgQnV0dG9uKHgsIGFwcC50aGVtZS5wYWRkaW5nLCBkZWYub25jbGljay5iaW5kKHRoaXMpLCBkZWYubGFiZWwpO1xuICAgICAgYi5jb2xvdXIgPSBhcHAudGhlbWUuY29sb3Vyc1tkZWYuY29sb3VyXSB8fCBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVHZW5lcmF0b3I7XG4gICAgICB0aGlzLmJ1dHRvbnMucHVzaChiKTtcbiAgICAgIGlmIChwcmV2ICYmIHByZXYuY29sb3VyICE9IGRlZi5jb2xvdXIpIHtcbiAgICAgICAgeCArPSBncm91cFBhZGRpbmc7XG4gICAgICAgIGIueCArPSBncm91cFBhZGRpbmc7XG4gICAgICB9XG4gICAgICB4ICs9IGIudyArIHBhZGRpbmc7XG4gICAgICBwcmV2ID0gZGVmO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IHsgUHVsc2UgfSBmcm9tICcuL3B1bHNlLmpzJztcbmV4cG9ydCB7IFBsYXlOb3RlIH0gZnJvbSAnLi9wbGF5X25vdGUuanMnO1xuZXhwb3J0IHsgU2VxdWVuY2VJbnB1dCB9IGZyb20gJy4vc2VxdWVuY2VfaW5wdXQuanMnO1xuZXhwb3J0IHsgUmFuZ2UgfSBmcm9tICcuL3JhbmdlLmpzJztcbiIsImltcG9ydCB7IE1vZHVsZVVuaXQsIElucHV0U29ja2V0LCBEaWFsIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgVFJJR0dFUl9UWVBFLCBJTlRfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBQbGF5Tm90ZSBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcInBsYXlfbm90ZVwiKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIlRSSUdcIjogbmV3IElucHV0U29ja2V0KDI5LCB0aGlzLmggLSAyOSwgXCJUUklHXCIsIFRSSUdHRVJfVFlQRSksXG4gICAgICBcIk5PVEVcIjogbmV3IElucHV0U29ja2V0KDc5LCB0aGlzLmggLSAyOSwgXCJOT1RFXCIsIElOVF9UWVBFKSxcbiAgICAgIFwiVkVMXCI6IG5ldyBJbnB1dFNvY2tldCgxMjksIHRoaXMuaCAtIDI5LCBcIlZFTFwiLCBJTlRfVFlQRSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgICBcIm5vdGVcIjogbmV3IERpYWwoMjksIDU5LCBcIk5PVEVcIiwgMC4wLCAxMjguMCwgMS4wKSxcbiAgICAgIFwidmVsb2NpdHlcIjogbmV3IERpYWwoNzksIDU5LCBcIlZFTFwiLCAwLjAsIDEwLjAsIDEuMCksXG4gICAgICBcImR1cmF0aW9uXCI6IG5ldyBEaWFsKDEyOSwgNTksIFwiRFVSXCIsIDAuMCwgMTAuMCwgMS4wKSxcbiAgICB9XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZU91dHB1dCc7XG4gIH1cblxuICBjb21waWxlKGNvbm5lY3Rpb25zKSB7XG4gICAgdmFyIGcgPSB7XCJwbGF5X25vdGVcIjoge1xuICAgICAgXCJkdXJhdGlvblwiOiB0aGlzLmRpYWxzW1wiZHVyYXRpb25cIl0udmFsdWUsXG4gICAgICBcImNoYW5uZWxcIjogdGhpcy5jaGFubmVsTnIsXG4gICAgfX07XG4gICAgdmFyIG9uID0gY29ubmVjdGlvbnNbXCJOT1RFXCJdO1xuICAgIGlmIChvbi5sZW5ndGggPT09IDApIHtcbiAgICAgIGdbXCJwbGF5X25vdGVcIl1bXCJub3RlXCJdID0gdGhpcy5kaWFsc1tcIm5vdGVcIl0udmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdbXCJwbGF5X25vdGVcIl1bXCJhdXRvX25vdGVcIl0gPSBvblswXTtcbiAgICB9XG4gICAgdmFyIG9uID0gY29ubmVjdGlvbnNbXCJWRUxcIl07XG4gICAgaWYgKG9uLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZ1tcInBsYXlfbm90ZVwiXVtcInZlbG9jaXR5XCJdID0gdGhpcy5kaWFsc1tcInZlbG9jaXR5XCJdLnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBnW1wicGxheV9ub3RlXCJdW1wiYXV0b192ZWxvY2l0eVwiXSA9IG9uWzBdO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSBbXVxuICAgIHZhciBvbiA9IGNvbm5lY3Rpb25zW1wiVFJJR1wiXTtcbiAgICBmb3IgKHZhciBvIG9mIG9uKSB7XG4gICAgICByZXN1bHQucHVzaChvKGcpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgSW5wdXRTb2NrZXQsIE91dHB1dFNvY2tldCwgRGlhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvJztcbmltcG9ydCB7IFRSSUdHRVJfVFlQRSwgQ0xPQ0tfVFlQRSB9IGZyb20gJy4uLy4uL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBQdWxzZSBleHRlbmRzIE1vZHVsZVVuaXQge1xuICBjb25zdHJ1Y3RvcihldmVyeSkge1xuICAgIHN1cGVyKFwicHVsc2VcIik7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJDTE9DS1wiOiBuZXcgSW5wdXRTb2NrZXQoMjksIHRoaXMuaCAtIDI5LCBcIkNMT0NLXCIsIENMT0NLX1RZUEUpLFxuICAgICAgXCJUUklHXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIlRSSUdcIiwgVFJJR0dFUl9UWVBFKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscyA9IHtcbiAgICAgIFwiZXZlcnlcIjogbmV3IERpYWwoMjksIDU5LCBcIkVWRVJZXCIsIDAuMCwgMTAuMCwgMS4wKSxcbiAgICB9XG4gICAgdGhpcy5kaWFscy5ldmVyeS52YWx1ZSA9IGV2ZXJ5IHx8IDE7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZVB1bHNlJztcbiAgfVxuXG4gIGNvbXBpbGUoY29ubmVjdGlvbnMpIHtcbiAgICB2YXIgZSA9IHtcImV2ZXJ5XCI6IHRoaXMuZGlhbHNbXCJldmVyeVwiXS52YWx1ZX07XG4gICAgcmV0dXJuICgoZSkgPT4gKCh0KSA9PiB7XG4gICAgICBmb3IgKHZhciBvIG9mIE9iamVjdC5rZXlzKHQpKSB7XG4gICAgICAgIGVbb10gPSB0W29dO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdCA9IHtcInJlcGVhdFwiOiBlfTtcbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9KSkoZSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCwgT3V0cHV0U29ja2V0LCBEaWFsIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuaW1wb3J0IHsgSU5UX1RZUEUgfSBmcm9tICcuLi8uLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgUmFuZ2UgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiT1VUXCI6IG5ldyBPdXRwdXRTb2NrZXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5LCBcIk9VVFwiLCBJTlRfVFlQRSksXG4gICAgfVxuICAgIHRoaXMuZGlhbHMgPSB7XG4gICAgICBcImZyb21cIjogbmV3IERpYWwoMjksIDU5LCBcIkZST01cIiwgMC4wLCAxMjcuMCwgMC4wKSxcbiAgICAgIFwidG9cIjogbmV3IERpYWwoNzksIDU5LCBcIlRPXCIsIDAuMCwgMTI3LjAsIDEyNy4wKSxcbiAgICAgIFwic3RlcFwiOiBuZXcgRGlhbCgxMjksIDU5LCBcIlNURVBcIiwgMC4wLCAxMjguMCwgMS4wKSxcbiAgICB9XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJ01vZHVsZUludCc7XG4gIH1cblxuICBjb21waWxlKGNvbm5lY3Rpb25zKSB7XG4gICAgdmFyIGcgPSB7fTtcbiAgICBnW3RoaXMudHlwZV0gPSB7XG4gICAgICBcImZyb21cIjogdGhpcy5kaWFscy5mcm9tLnZhbHVlLFxuICAgICAgXCJ0b1wiOiB0aGlzLmRpYWxzLnRvLnZhbHVlLFxuICAgICAgXCJzdGVwXCI6IHRoaXMuZGlhbHMuc3RlcC52YWx1ZSxcbiAgICB9O1xuICAgIHJldHVybiBnO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGVVbml0LCBPdXRwdXRTb2NrZXQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5pbXBvcnQgeyBDTE9DS19UWVBFIH0gZnJvbSAnLi4vLi4vbW9kZWwvJztcblxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlSW5wdXQgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiQ0xPQ0tcIjogbmV3IE91dHB1dFNvY2tldCh0aGlzLncgLSAyOSwgdGhpcy5oIC0gMjksIFwiQ0xPQ0tcIiwgQ0xPQ0tfVFlQRSksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVPdXRwdXQnO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQYXRjaGFibGUgfSBmcm9tICcuLi9tb2RlbC8nO1xuXG5leHBvcnQgY2xhc3MgU2VxdWVuY2UgZXh0ZW5kcyBQYXRjaGFibGUge1xuICBjb25zdHJ1Y3Rvcihtb2R1bGVzLCBwYXRjaGVzLCBjaGFubmVsTnIpIHtcbiAgICBzdXBlcihtb2R1bGVzLCBwYXRjaGVzKTtcbiAgICB0aGlzLmNoYW5uZWxOciA9IGNoYW5uZWxOciB8fCAxO1xuICB9XG4gIGNvbXBpbGUoKSB7XG4gICAgdmFyIHF1ZXVlID0gW107XG4gICAgdmFyIHNlZW4gPSB7fTtcbiAgICB2YXIgZGVwZW5kZW5jaWVzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG0gPSB0aGlzLm1vZHVsZXNbaV07XG4gICAgICBpZiAobS51bml0LnR5cGUgPT0gXCJwbGF5X25vdGVcIikge1xuICAgICAgICBxdWV1ZS5wdXNoKGkpO1xuICAgICAgfVxuICAgIH1cbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHEgPSBxdWV1ZVswXTtcbiAgICAgIHZhciBxdWV1ZSA9IHF1ZXVlLnNwbGljZSgxKTtcbiAgICAgIGlmIChzZWVuW3FdKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBkZXBlbmRlbmNpZXMucHVzaChxKTtcbiAgICAgIGZvciAodmFyIHAgb2YgdGhpcy5wYXRjaGVzKSB7XG4gICAgICAgIHZhciBtb2RTb2NrZXRzID0gdGhpcy5tb2R1bGVzW3FdLnVuaXQuc29ja2V0cztcbiAgICAgICAgaWYgKHAudG8gPT09IHEgJiYgbW9kU29ja2V0c1twLnRvU29ja2V0XS5pc0lucHV0KSB7XG4gICAgICAgICAgaWYgKCFzZWVuW3AuZnJvbV0pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2gocC5mcm9tKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocC5mcm9tID09PSBxICYmIG1vZFNvY2tldHNbcC5mcm9tU29ja2V0XS5pc0lucHV0KSB7XG4gICAgICAgICAgaWYgKCFzZWVuW3AuZnJvbV0pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2gocC50byk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZWVuW3FdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIHNlcXVlbmNlcyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSBkZXBlbmRlbmNpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBpeCA9IGRlcGVuZGVuY2llc1tpXTtcbiAgICAgIHZhciB1bml0ID0gdGhpcy5tb2R1bGVzW2l4XS51bml0O1xuXG4gICAgICB2YXIgY29ubmVjdGlvbnMgPSB7fTtcbiAgICAgIGZvciAodmFyIHNvY2tldElkIG9mIE9iamVjdC5rZXlzKHVuaXQuc29ja2V0cykpIHtcbiAgICAgICAgaWYgKHVuaXQuc29ja2V0c1tzb2NrZXRJZF0uaXNJbnB1dCkge1xuICAgICAgICAgIGNvbm5lY3Rpb25zW3NvY2tldElkXSA9IHRoaXMuZ2V0Q29ubmVjdGVkU2VxdWVuY2VzKHNlcXVlbmNlcywgaXgsIHNvY2tldElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHVuaXQudHlwZSA9PSBcInBsYXlfbm90ZVwiKSB7XG4gICAgICAgIGZvciAodmFyIG8gb2YgdW5pdC5jb21waWxlKGNvbm5lY3Rpb25zKSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKG8pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZyA9IHVuaXQuY29tcGlsZShjb25uZWN0aW9ucyk7XG4gICAgICAgIHNlcXVlbmNlc1tpeF0gPSBnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGdldENvbm5lY3RlZFNlcXVlbmNlcyhzZXF1ZW5jZXMsIGl4LCBpbnB1dCkge1xuICAgIHZhciBncyA9IFtdO1xuICAgIGZvciAodmFyIHAgb2YgdGhpcy5wYXRjaGVzKSB7XG4gICAgICBpZiAocC5kb2VzUGF0Y2hDb25uZWN0VG8oaXgsIGlucHV0KSkge1xuICAgICAgICBncy5wdXNoKHNlcXVlbmNlc1twLmNvbm5lY3RzVG8oaXgsIGlucHV0KS5tb2R1bGVdKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZ3M7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFVRElPX1RZUEUsIEZSRVFVRU5DWV9UWVBFLCBQQU5OSU5HX1RZUEUsIENMT0NLX1RZUEUsIFRSSUdHRVJfVFlQRSwgSU5UX1RZUEUgfSBmcm9tICcuL21vZGVsLyc7XG5cbmV4cG9ydCBjbGFzcyBUaGVtZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucGFkZGluZyA9IDA7XG4gICAgdmFyIHNvY2tldENvbG91cnMgPSB7fTtcbiAgICB2YXIgcGF0Y2hDb2xvdXJzID0ge31cbiAgICBzb2NrZXRDb2xvdXJzW0FVRElPX1RZUEVdID0gJ3JnYigxNDAsIDI1NSwgMjU1KSc7XG4gICAgc29ja2V0Q29sb3Vyc1tGUkVRVUVOQ1lfVFlQRV0gPSAncmdiKDI1NSwgMjU1LCAxNDApJztcbiAgICBzb2NrZXRDb2xvdXJzW1BBTk5JTkdfVFlQRV0gPSAncmdiKDI1NSwgMTQwLCAyNTUpJztcbiAgICBzb2NrZXRDb2xvdXJzW0NMT0NLX1RZUEVdID0gJ3JnYigxMDAsIDEwMCwgMjU1KSc7XG4gICAgc29ja2V0Q29sb3Vyc1tUUklHR0VSX1RZUEVdID0gJ3JnYig1MCwgNTAsIDUwKSc7XG4gICAgc29ja2V0Q29sb3Vyc1tJTlRfVFlQRV0gPSAncmdiKDI1NSwgMjU1LCA0MCknO1xuICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhzb2NrZXRDb2xvdXJzKSkge1xuICAgICAgcGF0Y2hDb2xvdXJzW2tleV0gPSBSR0JfTGluZWFyX1NoYWRlKDAuMSwgc29ja2V0Q29sb3Vyc1trZXldKTtcbiAgICB9XG4gICAgdGhpcy5jb2xvdXJzID0ge1xuICAgICAgT3V0bGluZUNvbG91cjogJyMzMzMnLFxuICAgICAgQmFja2dyb3VuZDogJyM0NDQnLFxuICAgICAgRm9yZWdyb3VuZDogJyNlZWUnLFxuICAgICAgSW5zdHJ1bWVudEVkaXRvckJhY2tncm91bmQ6ICcjZWVlJyxcblxuICAgICAgU29ja2V0QmFja2dyb3VuZDogJyM5ZmYnLFxuICAgICAgU29ja2V0SW5zaWRlOiAnIzk5OScsXG4gICAgICBTb2NrZXRPdXRsaW5lOiAnIzc3NycsXG5cbiAgICAgIFBhdGNoOiAnIzdmZicsXG5cbiAgICAgIE1vZHVsZU91dGxpbmU6ICcjNzc3JyxcbiAgICAgIE1vZHVsZVRleHQ6ICcjNDQ0JyxcbiAgICAgIE1vZHVsZUdlbmVyYXRvcjogJyNmZmYnLFxuICAgICAgTW9kdWxlRmlsdGVyOiAnI2ZmZCcsXG4gICAgICBNb2R1bGVEZXJpdmVkOiAnI2RkZicsXG4gICAgICBNb2R1bGVPdXRwdXQ6ICcjZGZkJyxcbiAgICAgIE1vZHVsZUludDogJyNmZjknLFxuICAgICAgTW9kdWxlUHVsc2U6ICcjZGRmJyxcblxuICAgICAgQnV0dG9uOiAnI2NjYycsXG4gICAgICBCdXR0b25UZXh0OiAnIzMzMycsXG5cbiAgICAgIERpYWw6ICcjY2NjJyxcbiAgICAgIERpYWxMaW5lOiAnIzQ0NCcsXG5cbiAgICAgIFNvY2tldHM6IHNvY2tldENvbG91cnMsXG4gICAgICBQYXRjaGVzOiBwYXRjaENvbG91cnMsXG4gICAgfTtcbiAgfVxufVxuXG5jb25zdCBSR0JfTGluZWFyX1NoYWRlPShwLGMpPT57XG4gICAgdmFyIGk9cGFyc2VJbnQscj1NYXRoLnJvdW5kLFthLGIsYyxkXT1jLnNwbGl0KFwiLFwiKSxQPXA8MCx0PVA/MDoyNTUqcCxQPVA/MStwOjEtcDtcbiAgICByZXR1cm5cInJnYlwiKyhkP1wiYShcIjpcIihcIikrcihpKGFbM109PVwiYVwiP2Euc2xpY2UoNSk6YS5zbGljZSg0KSkqUCt0KStcIixcIityKGkoYikqUCt0KStcIixcIityKGkoYykqUCt0KSsoZD9cIixcIitkOlwiKVwiKTtcbn1cbiIsImltcG9ydCB7IFNlcXVlbmNlVHJhY2sgfSBmcm9tICcuL3NlcXVlbmNlX3RyYWNrLmpzJzsgXG5cbmV4cG9ydCBjbGFzcyBDaGFubmVsIHtcbiAgY29uc3RydWN0b3IoY2hhbm5lbE5yLCBvcGVuSW5zdHJ1bWVudEVkaXRvcikge1xuICAgIHRoaXMuY2hhbm5lbE5yID0gY2hhbm5lbE5yO1xuICAgIHRoaXMuaW5zdHJ1bWVudCA9IG51bGw7XG4gICAgdGhpcy5zZXF1ZW5jZVRyYWNrcyA9IFtuZXcgU2VxdWVuY2VUcmFjaygpXTtcbiAgICB0aGlzLm5hbWUgPSBcIlVudGl0bGVkIFwiICsgdGhpcy5jaGFubmVsTnI7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFubmVsTnI7IGkrKykge1xuICAgICAgdGhpcy5zZXF1ZW5jZVRyYWNrcy5wdXNoKG5ldyBTZXF1ZW5jZVRyYWNrKCkpO1xuICAgIH1cblxuICAgIHRoaXMuaGVpZ2h0ID0gMTUwO1xuICAgIHRoaXMubWFyZ2luVG9wID0gMTA7XG4gICAgdGhpcy5vZmZzZXQgPSAgdGhpcy5jaGFubmVsTnIgKiAodGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpblRvcCk7XG4gICAgdGhpcy5wYWRkaW5nID0gMTA7XG4gICAgdGhpcy5jaGFubmVsV2lkdGggPSA5MDtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gKCkgPT4gb3Blbkluc3RydW1lbnRFZGl0b3IodGhpcy5pbnN0cnVtZW50KTtcbiAgfVxuXG4gIGRyYXcoYXBwKSB7XG4gICAgdmFyIGNvbG9yT2Zmc2V0ID0gdGhpcy5jaGFubmVsTnIgKiA0MDtcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgdmFyIG1hcmdpblRvcCA9IHRoaXMubWFyZ2luVG9wO1xuICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB2YXIgcGFkZGluZyA9IHRoaXMucGFkZGluZztcbiAgICB2YXIgY2hhbm5lbFdpZHRoID0gdGhpcy5jaGFubmVsV2lkdGg7XG4gICAgdmFyIHRyYWNrV2lkdGggPSBhcHAuY2FudmFzLndpZHRoIC0gY2hhbm5lbFdpZHRoIC0gcGFkZGluZyAqIDI7XG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSAncmdiKDAsICcgKyAoMjAwIC0gY29sb3JPZmZzZXQpICsgJywgMCknO1xuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSAncmdiKDQwLCA0MCwgNDAsIDEuMCknO1xuICAgIGFwcC5jdHguZmlsbFJlY3QocGFkZGluZywgcGFkZGluZyArIG9mZnNldCwgY2hhbm5lbFdpZHRoLCBoZWlnaHQpO1xuICAgIGFwcC5jdHguc3Ryb2tlUmVjdChwYWRkaW5nLCBwYWRkaW5nICsgb2Zmc2V0LCBjaGFubmVsV2lkdGgsIGhlaWdodCk7XG5cbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMjU1LCAnICsgKDIwMCAtIGNvbG9yT2Zmc2V0KSArICcsIDApJztcbiAgICBhcHAuY3R4LmZpbGxSZWN0KHBhZGRpbmcgKyBjaGFubmVsV2lkdGgsIHBhZGRpbmcgKyBvZmZzZXQsIHRyYWNrV2lkdGgsIGhlaWdodCk7XG4gICAgYXBwLmN0eC5zdHJva2VSZWN0KHBhZGRpbmcgKyBjaGFubmVsV2lkdGgsIHBhZGRpbmcgKyBvZmZzZXQsIHRyYWNrV2lkdGgsIGhlaWdodCk7XG5cbiAgICB2YXIgdHJhY2tIZWlnaHQgPSBoZWlnaHQgLyB0aGlzLnNlcXVlbmNlVHJhY2tzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2VxdWVuY2VUcmFja3MubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBhcHAuY3R4LnN0cm9rZVJlY3QocGFkZGluZyArIGNoYW5uZWxXaWR0aCwgcGFkZGluZyArIG9mZnNldCArIGkgKiB0cmFja0hlaWdodCwgdHJhY2tXaWR0aCwgdHJhY2tIZWlnaHQpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2VxdWVuY2VUcmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzID0gdGhpcy5zZXF1ZW5jZVRyYWNrc1tpXTtcbiAgICAgIHMuZHJhdyhhcHAsIHBhZGRpbmcgKyBjaGFubmVsV2lkdGgsIHBhZGRpbmcgKyBvZmZzZXQgKyBpICogdHJhY2tIZWlnaHQsIHRyYWNrV2lkdGgsIHRyYWNrSGVpZ2h0KTtcbiAgICB9XG5cbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMjU1LCAyNTUsIDI1NSknO1xuICAgIGFwcC5jdHguZm9udCA9ICcxMHB4IHNhbnMtc2VyaWYnO1xuICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy5uYW1lLCBwYWRkaW5nICsgMywgcGFkZGluZyArIG9mZnNldCArIDExKTtcbiAgICB2YXIgc2hvd0JhcnMgPSA0O1xuICAgIHZhciBwb2ludHNJblJhbmdlID0gc2hvd0JhcnMgKiA0O1xuICAgIHZhciBzY2FsaW5nID0gdHJhY2tXaWR0aCAvIHBvaW50c0luUmFuZ2U7XG4gICAgdmFyIGJhcldpZHRoID0gNCAqIHNjYWxpbmc7XG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSAncmdiKDQwLCA0MCwgNDApJztcbiAgICBhcHAuY3R4LmZvbnQgPSAnMTBweCBtb25vJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNob3dCYXJzOyBpKyspIHtcbiAgICAgIGFwcC5jdHguZmlsbFRleHQoaSAqIDQsIHBhZGRpbmcgKyBjaGFubmVsV2lkdGggKyAzICsgaSAqIGJhcldpZHRoLCBwYWRkaW5nICsgb2Zmc2V0ICsgaGVpZ2h0IC0gMyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIHZhciBwYXRoID0gbmV3IFBhdGgyRCgpO1xuICAgIHZhciB3aWR0aCA9IGFwcC5jYW52YXMud2lkdGggLSB0aGlzLnBhZGRpbmcgKiAyO1xuICAgIHBhdGgucmVjdCh0aGlzLnBhZGRpbmcsIHRoaXMucGFkZGluZyArIHRoaXMub2Zmc2V0LCB3aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIGlmIChhcHAuY3R4LmlzUG9pbnRJblBhdGgocGF0aCwgeCwgeSkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImV4cG9ydCB7IENoYW5uZWwgfSBmcm9tICcuL2NoYW5uZWwuanMnO1xuXG5leHBvcnQgY2xhc3MgVGltZWxpbmVFZGl0b3Ige1xuICBjb25zdHJ1Y3RvcihjaGFubmVscykge1xuICAgIHRoaXMuY2hhbm5lbHMgPSBjaGFubmVscztcbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgZm9yICh2YXIgZSBvZiB0aGlzLmNoYW5uZWxzKSB7XG4gICAgICB2YXIgdiA9IGUuaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSk7XG4gICAgICBpZiAodikge1xuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZHJhdyhhcHApIHtcbiAgICBmb3IgKHZhciBlIG9mIHRoaXMuY2hhbm5lbHMpIHtcbiAgICAgIGUuZHJhdyhhcHApO1xuICAgIH1cbiAgfVxufVxuIiwiXG5leHBvcnQgY2xhc3MgUmFuZ2Uge1xuICBjb25zdHJ1Y3RvcihzdGFydCwgc3RvcCkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLnN0b3AgPSBzdG9wO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXF1ZW5jZVRyYWNrIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZXF1ZW5jZV9kZWYgPSBudWxsO1xuICAgIHRoaXMucmFuZ2VzID0gW25ldyBSYW5nZSgwLCA0KSwgbmV3IFJhbmdlKDksIDEyKSwgbmV3IFJhbmdlKDE0LCAyNSksIG5ldyBSYW5nZSgzMCwgMzQpXTtcbiAgfVxuICBkcmF3KGFwcCwgeCwgeSwgdywgaCkge1xuICAgIHZhciBzaG93QmFycyA9IDQ7XG4gICAgdmFyIHBvaW50c0luUmFuZ2UgPSBzaG93QmFycyAqIDQ7XG4gICAgdmFyIHNjYWxpbmcgPSB3IC8gcG9pbnRzSW5SYW5nZTtcbiAgICB2YXIgYmFyV2lkdGggPSA0ICogc2NhbGluZztcbiAgICBmb3IgKHZhciByIG9mIHRoaXMucmFuZ2VzKSB7XG4gICAgICB2YXIgY29sb3JPZmZzZXQgPSAxMDtcbiAgICAgIHZhciB3aWR0aCA9IE1hdGgubWluKChyLnN0b3AgLSByLnN0YXJ0KSAqIHNjYWxpbmcsIHcgLSAoci5zdGFydCAqIHNjYWxpbmcpKVxuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSAncmdiKDM1LCA3NSwgJyArICgyMDAgLSBjb2xvck9mZnNldCkgKyAnLCAwLjMpJztcbiAgICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSAncmdiKDUsIDUsICcgKyAoMjAwIC0gY29sb3JPZmZzZXQpICsgJywgMC42KSc7XG4gICAgICBhcHAuY3R4LmZpbGxSZWN0KHggKyByLnN0YXJ0ICogc2NhbGluZywgeSwgd2lkdGgsIGgpO1xuICAgICAgYXBwLmN0eC5zdHJva2VSZWN0KHggKyByLnN0YXJ0ICogc2NhbGluZywgeSwgd2lkdGgsIGgpO1xuICAgIH1cbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gJ3JnYig3MCwgNzAsIDcwLCAwLjgpJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNob3dCYXJzOyBpKyspIHtcbiAgICAgIGFwcC5jdHguc3Ryb2tlUmVjdCh4ICsgaSAqIGJhcldpZHRoLCB5LCBiYXJXaWR0aCwgaCk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9