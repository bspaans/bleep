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
      this.w = 30;
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

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/*! exports provided: Dial, Socket, Button, CloseButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dial_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dial.js */ "./src/components/dial.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dial", function() { return _dial_js__WEBPACK_IMPORTED_MODULE_0__["Dial"]; });

/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.js */ "./src/components/socket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Socket", function() { return _socket_js__WEBPACK_IMPORTED_MODULE_1__["Socket"]; });

/* harmony import */ var _button_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./button.js */ "./src/components/button.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _button_js__WEBPACK_IMPORTED_MODULE_2__["Button"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CloseButton", function() { return _button_js__WEBPACK_IMPORTED_MODULE_2__["CloseButton"]; });






/***/ }),

/***/ "./src/components/socket.js":
/*!**********************************!*\
  !*** ./src/components/socket.js ***!
  \**********************************/
/*! exports provided: Socket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Socket", function() { return Socket; });

class Socket {
  constructor(x, y, label) {
    this.x = x;
    this.y = y;
    this.label = label;
    this.radius = 8;
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
    app.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
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

/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module.js */ "./src/instrument_editor/module.js");
/* harmony import */ var _module_units__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module_units */ "./src/instrument_editor/module_units/index.js");
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ */ "./src/components/index.js");






class InstrumentEditor {
  constructor(app, instrument, handleClose) {
    this.app = app;
    this.padding = app.theme.padding;
    this.scale = 1.0
    this.showCompile = true;
    this.selected = null;
    if (!instrument) {
      var modules = [
        new _module_js__WEBPACK_IMPORTED_MODULE_1__["Module"](instrument, 10, 10, new _module_units__WEBPACK_IMPORTED_MODULE_2__["ChannelInput"]('input')), 
        new _module_js__WEBPACK_IMPORTED_MODULE_1__["Module"](instrument, 10, 300, new _module_units__WEBPACK_IMPORTED_MODULE_2__["ChannelOutput"]('output')),
      ];
      instrument.modules = modules;
    }
    this.instrument = instrument;
    this.buttons = [
      new _components___WEBPACK_IMPORTED_MODULE_3__["CloseButton"](10, 10, handleClose, "X"),
      new _components___WEBPACK_IMPORTED_MODULE_3__["Button"](10, 10, this.handleShowCompile.bind(this), "JSON"),
      new _components___WEBPACK_IMPORTED_MODULE_3__["Button"](10, 10, this.handleZoomIn.bind(this), "+"),
      new _components___WEBPACK_IMPORTED_MODULE_3__["Button"](10, 10, this.handleZoomOut.bind(this), "-"),
    ];
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
  }
  handleZoomIn() {
    this.scale *= 2;
    this.app.draw();
  }
  handleZoomOut() {
    this.scale /= 2;
    this.app.draw();
  }
  handleAddFilter(type) {
    var g = new _module_units__WEBPACK_IMPORTED_MODULE_2__["Filter"](type)
    this.instrument.modules.push(new _module_js__WEBPACK_IMPORTED_MODULE_1__["Module"](this.instrument, 120, 120, g));
    this.app.draw();
  }
  handleAddGenerator(type) {
    var g = new _module_units__WEBPACK_IMPORTED_MODULE_2__["SampleGenerator"](type)
    this.instrument.modules.push(new _module_js__WEBPACK_IMPORTED_MODULE_1__["Module"](this.instrument, 120, 120, g));
    this.app.draw();
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
    for (var m of this.instrument.modules) {
      var v = m.handleMouseDown(app, x - this.padding, y - this.padding);
      if (v) {
        this.selected = v;
        return this;
      }
    }
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
  draw(app) {
    var w = app.canvas.width - 2 * this.padding;
    var h = app.canvas.height - 2 * this.padding;
    this.buttons[0].x = w - 20;
    this.buttons[0].y = this.padding;
    this.buttons[1].x = w - 20;
    this.buttons[1].y = this.padding + 25;
    this.buttons[2].x = w - 20;
    this.buttons[2].y = this.padding + 50;
    this.buttons[3].x = w - 20;
    this.buttons[3].y = this.padding + 75;
    app.ctx.save();
    app.ctx.lineWidth = 1;
    
    // Draw the background
    app.ctx.fillStyle = app.theme.colours.InstrumentEditorBackground;
    app.ctx.strokeStyle = app.theme.colours.OutlineColour;
    app.ctx.fillRect(this.padding, this.padding, w, h);
    app.ctx.strokeRect(this.padding, this.padding, w, h);

    app.ctx.scale(this.scale, this.scale);
    // Draw the modules
    for (var m of this.instrument.modules) {
      app.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translate
      app.ctx.translate(this.padding, this.padding);
      m.draw(app);
    }
    app.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translate

    app.ctx.fillStyle = app.theme.colours.Patch;
    app.ctx.strokeStyle = app.theme.colours.Patch;
    // Draw the patches
    for (var p of this.instrument.patches) {
      var fromMod = this.instrument.modules[p.from];
      var toMod = this.instrument.modules[p.to];
      var fromSocket = p.getFromSocket(fromMod);
      var toSocket = p.getToSocket(toMod);
      var fromX = this.padding + fromMod.x + fromSocket.x;
      var fromY = this.padding + fromMod.y + fromSocket.y;
      var toX = this.padding + toMod.x + toSocket.x;
      var toY = this.padding + toMod.y + toSocket.y;
      var pointOffset = 70;
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

    // Draw the buttons 
    for (var b of this.buttons) {
      b.draw(app);
    }

    // Compiled generator
    if (this.showCompile) {
      var txt = JSON.stringify(this.instrument.compile(), null, 2);
      var lineNr = 0;
      app.ctx.fillStyle = app.theme.colours.ModuleText;
      app.ctx.textAlign = "start";
      for (var line of txt.split("\n")) {
        app.ctx.fillText(line, w - 300, 90 + lineNr * 12);
        lineNr++;
      }
      app.ctx.fillText(this.scale, w - 300, 90 + lineNr * 12);
    }
    app.ctx.restore();
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
/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module.js */ "./src/instrument_editor/module.js");
/* harmony import */ var _patch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./patch.js */ "./src/instrument_editor/patch.js");




class Instrument {
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
    var patch = new _patch_js__WEBPACK_IMPORTED_MODULE_2__["Patch"](from, to, fromSocket, toSocket);
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
  loadFromDefinition(instrDef) {
    var modules = [
      new _module_js__WEBPACK_IMPORTED_MODULE_1__["Module"](this, 10, 40, new _module_units__WEBPACK_IMPORTED_MODULE_0__["ChannelInput"]('input')), 
      new _module_js__WEBPACK_IMPORTED_MODULE_1__["Module"](this, 700, 40, new _module_units__WEBPACK_IMPORTED_MODULE_0__["ChannelOutput"]('output')),
    ];
    var patches = [

    ];
    this.modules = modules;
    this.patches = patches;
    var ix = this.loadGenerator(instrDef, 0, 1);
    if (ix) {
      var p = new _patch_js__WEBPACK_IMPORTED_MODULE_2__["Patch"](ix, 0, "FREQ", "FREQ");
      this.patches.push(p);
    }
  }
  loadGenerator(instrDef, input, output) {
    if (instrDef["combined"]) {
      for (var iDef of instrDef["combined"]) {
        var ix = this.loadGenerator(iDef, input, output);
        if (ix) {
          var p = new _patch_js__WEBPACK_IMPORTED_MODULE_2__["Patch"](input, ix, "FREQ", "FREQ");
          this.patches.push(p);
        }
      }
    } else if (instrDef["panning"]) {
      var g = this.loadGenerator(instrDef["panning"], input, output);
      // TODO: add a PANNING generator block
      return g;
    } else if (instrDef["transpose"]) {
      var g = this.loadGenerator(instrDef["transpose"], input, output);
      // TODO: add a TRANSPOSE generator block
      return g;
    } else if (instrDef["wav"]) {
      var m = new _module_js__WEBPACK_IMPORTED_MODULE_1__["Module"](this, 300, 40, new _module_units__WEBPACK_IMPORTED_MODULE_0__["SampleGenerator"]("wav"));
      var p = new _patch_js__WEBPACK_IMPORTED_MODULE_2__["Patch"](this.modules.length, output, "OUT", "IN");
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
      var m = new _module_js__WEBPACK_IMPORTED_MODULE_1__["Module"](this, Math.random() * 800 + 100, Math.random() * 600 + 20, g);
      var p = new _patch_js__WEBPACK_IMPORTED_MODULE_2__["Patch"](this.modules.length, output, "OUT", "IN");
      this.modules.push(m);
      this.patches.push(p);
      return this.modules.length - 1;
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
        var mod = new _module_js__WEBPACK_IMPORTED_MODULE_1__["Module"](this, m.x, m.y, g);
        modules.push(mod);
      }
    }
    var patches = [];
    for (var p of instrDef.patches) {
      var patch = new _patch_js__WEBPACK_IMPORTED_MODULE_2__["Patch"](p.from_module, p.to_module, p.from_socket, p.to_socket);
      patches.push(patch);
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
    var dependencies = [output];
    while (queue.length > 0) {
      var q = queue[0];
      var queue = queue.splice(1);
      for (var p of this.patches) {
        if (p.to === q && (p.toSocket == "IN" || p.toSocket == "FREQ")) {
          if (!seen[p.from]) {
            dependencies.push(p.from);
            queue.push(p.from);
            seen[p.from] = true;
          }
        } else if (p.from === q && (p.fromSocket == "IN" || p.fromSocket == "FREQ")){
          if (!seen[p.to]) {
            dependencies.push(p.to);
            queue.push(p.to);
            seen[p.to] = true;
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
      } else if (unit.type == "triangle" || unit.type == "sine" || unit.type == "saw" || unit.type == "square" || unit.type == "white_noise") {
        g = {};
        g[unit.type] = {
          "attack": unit.dials["attack"].value,
          "decay": unit.dials["decay"].value,
          "sustain": unit.dials["sustain"].value,
          "release": unit.dials["release"].value,
        };
        var pitchFound = false;
        for (var p of this.patches) {
          if (p.to === ix && p.toSocket == "FREQ") {
            pitchFound = true;
            var pg = generators[p.from];
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
      } else if (unit.type == "output") {
        return this.compileGenerators(generators, ix, "IN");
      }
      generators[ix] = g;
    }
    return dependencies;
  }

  compileGenerators(generators, ix, input) {
    var gs = [];
    for (var p of this.patches) {
      if (p.to === ix && p.toSocket === input) {
        gs.push(generators[p.from])
      } else if (p.from == ix && p.fromSocket === input) {
        gs.push(generators[p.to])
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

/***/ "./src/instrument_editor/module.js":
/*!*****************************************!*\
  !*** ./src/instrument_editor/module.js ***!
  \*****************************************/
/*! exports provided: Module */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Module", function() { return Module; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/ */ "./src/components/index.js");


class Module {
  constructor(instrument, x, y, unit) {
    this.instrument = instrument;
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
    if (v instanceof _components___WEBPACK_IMPORTED_MODULE_0__["Socket"]) {
      console.log("dragging a socket");
      v.handleDrag(app, dx, dy, x, y);
    } else if (v instanceof _components___WEBPACK_IMPORTED_MODULE_0__["Dial"]) {
      v.handleDrag(app, dx, dy, x - this.x, y - this.y);
    } else {
      this.x += dx;
      this.y += dy;
    }
  }
  handleDrop(app, x, y) {
    var v = this.selected;
    if (v instanceof _components___WEBPACK_IMPORTED_MODULE_0__["Socket"]) {
      for (var module of this.instrument.modules) {
        for (var key of Object.keys(module.unit.sockets)) {
          var s = module.unit.sockets[key];
          var sx = x - module.x;
          var sy = y - module.y;
          var result = s.handleMouseDown(app, sx, sy);
          if (result) {
            console.log("patching to socket", v.label, "->", result.label);
            this.instrument.addPatch(this, module, v.label, result.label);
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

/***/ "./src/instrument_editor/module_units/channel_input.js":
/*!*************************************************************!*\
  !*** ./src/instrument_editor/module_units/channel_input.js ***!
  \*************************************************************/
/*! exports provided: ChannelInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChannelInput", function() { return ChannelInput; });
/* harmony import */ var _module_unit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module_unit.js */ "./src/instrument_editor/module_units/module_unit.js");
/* harmony import */ var _sockets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sockets.js */ "./src/instrument_editor/module_units/sockets.js");



class ChannelInput extends _module_unit_js__WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(type) {
    super(type);
    this.sockets = {
      "FREQ": new _sockets_js__WEBPACK_IMPORTED_MODULE_1__["Output"](this.w - 29, this.h - 29, "FREQ"),
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
/* harmony import */ var _module_unit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module_unit.js */ "./src/instrument_editor/module_units/module_unit.js");
/* harmony import */ var _sockets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sockets.js */ "./src/instrument_editor/module_units/sockets.js");




class ChannelOutput extends _module_unit_js__WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(type) {
    super(type);
    this.sockets = {
      "IN": new _sockets_js__WEBPACK_IMPORTED_MODULE_1__["Input"](29, this.h - 29),
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
/* harmony import */ var _module_unit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module_unit.js */ "./src/instrument_editor/module_units/module_unit.js");
/* harmony import */ var _sockets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sockets.js */ "./src/instrument_editor/module_units/sockets.js");
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");




class Filter extends _module_unit_js__WEBPACK_IMPORTED_MODULE_0__["ModuleUnit"] {
  constructor(type) {
    super(type);
    this.sockets = {
      "IN": new _sockets_js__WEBPACK_IMPORTED_MODULE_1__["Input"](29, this.h - 29),
      "OUT": new _sockets_js__WEBPACK_IMPORTED_MODULE_1__["Output"](this.w - 29, this.h - 29),
    }
    this.background = 'ModuleFilter';
    this.dials = { }

    if (type === "low pass filter" || type === "high pass filter") {
      this.w = 150;
      this.dials["cutoff"] = new _components___WEBPACK_IMPORTED_MODULE_2__["Dial"](29, 59, "CUTOFF", 1.0, 22000.0, 5000.0);
    } else if (type === "delay") {
      this.w = 170;
      this.dials["time"] = new _components___WEBPACK_IMPORTED_MODULE_2__["Dial"](29, 59, "TIME", 0.00001, 4.0, 1.0);
      this.dials["factor"] = new _components___WEBPACK_IMPORTED_MODULE_2__["Dial"](79, 59, "FACTOR", 0.0, 2.0, 1.0);
      this.dials["feedback"] = new _components___WEBPACK_IMPORTED_MODULE_2__["Dial"](129, 59, "FEEDBACK", 0.0, 2.0, 0.0);
    }
  }
}


/***/ }),

/***/ "./src/instrument_editor/module_units/index.js":
/*!*****************************************************!*\
  !*** ./src/instrument_editor/module_units/index.js ***!
  \*****************************************************/
/*! exports provided: ChannelInput, ChannelOutput, Filter, SampleGenerator */
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







/***/ }),

/***/ "./src/instrument_editor/module_units/module_unit.js":
/*!***********************************************************!*\
  !*** ./src/instrument_editor/module_units/module_unit.js ***!
  \***********************************************************/
/*! exports provided: ModuleUnit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModuleUnit", function() { return ModuleUnit; });
/* harmony import */ var _sockets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sockets.js */ "./src/instrument_editor/module_units/sockets.js");


class ModuleUnit {
  constructor(type) {
    this.type = type;
    this.w = 150;
    this.h = 150;
    this.sockets = {

    };
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
/* harmony import */ var _sockets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sockets.js */ "./src/instrument_editor/module_units/sockets.js");
/* harmony import */ var _module_unit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module_unit.js */ "./src/instrument_editor/module_units/module_unit.js");
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");




class SampleGenerator extends _module_unit_js__WEBPACK_IMPORTED_MODULE_1__["ModuleUnit"] {
  constructor(type) {
    super(type);
    this.background = 'ModuleGenerator';
    this.w = 220;
    this.h = 250;
    this.sockets = {
      "FREQ": new _sockets_js__WEBPACK_IMPORTED_MODULE_0__["Input"](29, this.h - 29, "FREQ"),
      "OUT": new _sockets_js__WEBPACK_IMPORTED_MODULE_0__["Output"](this.w - 29, this.h - 29),
    }
    this.dials = {
      "pitch": new _components___WEBPACK_IMPORTED_MODULE_2__["Dial"](29, 49, "FREQ", 0.0, 22000.0, 0.0),
      "attack": new _components___WEBPACK_IMPORTED_MODULE_2__["Dial"](29, 120, "ATTACK", 0.0, 10.0, 0.1),
      "decay": new _components___WEBPACK_IMPORTED_MODULE_2__["Dial"](79, 120, "DECAY", 0.0, 10.0, 0.1),
      "sustain": new _components___WEBPACK_IMPORTED_MODULE_2__["Dial"](129, 120, "SUSTAIN", 0.0, 1.0, 0.8),
      "release": new _components___WEBPACK_IMPORTED_MODULE_2__["Dial"](179, 120, "RELEASE", 0.0, 10, 0.1),
    }
  }
}



/***/ }),

/***/ "./src/instrument_editor/module_units/sockets.js":
/*!*******************************************************!*\
  !*** ./src/instrument_editor/module_units/sockets.js ***!
  \*******************************************************/
/*! exports provided: Output, Input */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Output", function() { return Output; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return Input; });
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/ */ "./src/components/index.js");

class Output extends _components___WEBPACK_IMPORTED_MODULE_0__["Socket"] {
  constructor(x, y, label) {
    super(x, y)
    this.label = label ? label : "OUT";
  }
}
class Input extends _components___WEBPACK_IMPORTED_MODULE_0__["Socket"] {
  constructor(x, y, label) {
    super(x, y)
    this.label = label ? label : "IN";
  }
}


/***/ }),

/***/ "./src/instrument_editor/patch.js":
/*!****************************************!*\
  !*** ./src/instrument_editor/patch.js ***!
  \****************************************/
/*! exports provided: Patch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Patch", function() { return Patch; });

class Patch {
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
    var i = this.loadInstrumentBank(instrumentBank);
    //this.load(example);
    //this.openTimelineEditor();
    this.openInstrumentEditor(i);
    this.draw();
  }

  loadInstrumentBank(bank) {
    for (var instrDef of bank) {
      var instr = new _instrument_editor___WEBPACK_IMPORTED_MODULE_1__["Instrument"]();
      instr.loadFromDefinition(instrDef);
    }
    return instr;
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

/***/ "./src/theme.js":
/*!**********************!*\
  !*** ./src/theme.js ***!
  \**********************/
/*! exports provided: Theme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Theme", function() { return Theme; });

class Theme {
  constructor() {
    this.padding = 10;
    this.colours = {
      OutlineColour: '#333',
      Background: '#444',
      Foreground: '#eee',
      SocketBackground: '#999',
      SocketInside: '#999',
      SocketOutline: '#777',
      InstrumentEditorBackground: '#eee',
      Patch: '#777',
      ModuleOutline: '#777',
      ModuleText: '#444',
      ModuleGenerator: '#fff',
      ModuleFilter: '#ffd',
      ModuleOutput: '#dfd',
      Button: '#ccc',
      ButtonText: '#333',
      Dial: '#ccc',
      DialLine: '#444',
    };
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc29ja2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvaW5zdHJ1bWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvY2hhbm5lbF9pbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvbW9kdWxlX3VuaXRzL2NoYW5uZWxfb3V0cHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9tb2R1bGVfdW5pdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9tb2R1bGVfdW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zdHJ1bWVudF9lZGl0b3IvbW9kdWxlX3VuaXRzL3NhbXBsZV9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RydW1lbnRfZWRpdG9yL21vZHVsZV91bml0cy9zb2NrZXRzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnN0cnVtZW50X2VkaXRvci9wYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGhlbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbWVsaW5lX2VkaXRvci9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL3NyYy90aW1lbGluZV9lZGl0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbWVsaW5lX2VkaXRvci9zZXF1ZW5jZV90cmFjay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pGTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQOzs7Ozs7Ozs7Ozs7O0FDeENBO0FBQUE7QUFBTztBQUNQO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQUE7QUFBQTs7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZ0VBQWE7QUFDNUM7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQyxtQ0FBbUMsZ0VBQWE7QUFDaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixvQ0FBb0M7QUFDdkQ7QUFDQTtBQUNBLG1CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3JFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXVDOztBQUVoQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJsZWVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsIlxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIG9uQ2xpY2ssIGxhYmVsKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMudyA9IDI1O1xuICAgIHRoaXMuaCA9IDI1O1xuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSBvbkNsaWNrO1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLmNvbG91ciA9IG51bGw7XG4gICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgIHRoaXMudyA9IDMwO1xuICAgIH1cbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIHZhciB3ID0gdGhpcy53O1xuICAgIHZhciBoID0gdGhpcy5oO1xuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuQnV0dG9uO1xuICAgIGlmICh0aGlzLmNvbG91cikge1xuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG91cjtcbiAgICB9XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLk91dGxpbmVDb2xvdXI7XG4gICAgYXBwLmN0eC5saW5lV2lkdGggPSAxO1xuICAgIGFwcC5jdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHcsIGgpO1xuICAgIGFwcC5jdHguc3Ryb2tlUmVjdCh0aGlzLngsIHRoaXMueSwgdywgaCk7XG4gICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgIGFwcC5jdHguZm9udCA9ICcxMHB4IG1vbm8nO1xuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5CdXR0b25UZXh0O1xuICAgICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLmxhYmVsLCB0aGlzLnggKyB3IC8gMiwgdGhpcy55ICsgMTUpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgaWYgKHggPj0gdGhpcy54ICYmIHggPD0gdGhpcy54ICsgdGhpcy53ICYmIHkgPj0gdGhpcy55ICYmIHkgPD0gdGhpcy55ICsgdGhpcy5oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENsb3NlQnV0dG9uIGV4dGVuZHMgQnV0dG9uIHtcbn1cbiIsImV4cG9ydCBjbGFzcyBEaWFsIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgbGFiZWwsIG1pbiwgbWF4LCBjdXJyZW50KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLnJhZGl1cyA9IDE1O1xuICAgIHRoaXMubWluID0gbWluO1xuICAgIHRoaXMubWF4ID0gbWF4O1xuICAgIHRoaXMudmFsdWUgPSBjdXJyZW50O1xuICB9XG4gIGRyYXcoYXBwKSB7XG5cbiAgICAvLyBEcmF3IGRpYWxcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLkRpYWw7XG4gICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcbiAgICBhcHAuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBhcHAuY3R4LmZpbGwoKTtcbiAgICBhcHAuY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgdmFyIHJhbmdlID0gdGhpcy5tYXggLSB0aGlzLm1pbjtcbiAgICB2YXIgdGF1ID0gMiAqIE1hdGguUElcbiAgICB2YXIgdmFsdWUgPSB0YXUgLSAodGF1ICogKHRoaXMudmFsdWUgLSB0aGlzLm1pbikgLyByYW5nZSlcbiAgICBhcHAuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHZhciBkeCA9IE1hdGguc2luKHZhbHVlKSAqIHRoaXMucmFkaXVzO1xuICAgIHZhciBkeSA9IE1hdGguY29zKHZhbHVlKSAqIHRoaXMucmFkaXVzO1xuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5EaWFsTGluZTtcbiAgICBhcHAuY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgYXBwLmN0eC5tb3ZlVG8odGhpcy54LCB0aGlzLnkpO1xuICAgIGFwcC5jdHgubGluZVRvKHRoaXMueCArIGR4LCB0aGlzLnkgKyBkeSk7XG4gICAgYXBwLmN0eC5zdHJva2UoKTtcbiAgICBhcHAuY3R4LmxpbmVXaWR0aCA9IDE7XG5cbiAgICAvLyBEcmF3IGxhYmVsXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVUZXh0O1xuICAgIGFwcC5jdHguZm9udCA9ICcxMHB4IG1vbm8nO1xuICAgIHZhciBjZW50ZXJYID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55IC0gdGhpcy5yYWRpdXMgLSAzO1xuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICBhcHAuY3R4LmZpbGxUZXh0KHRoaXMubGFiZWwsIGNlbnRlclgsIHkpO1xuXG4gICAgLy8gRHJhdyB2YWx1ZVxuICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy52YWx1ZS50b0ZpeGVkKDIpLCBjZW50ZXJYLCB0aGlzLnkgKyB0aGlzLnJhZGl1cyArIDEyKTtcbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgaWYgKHggPj0gdGhpcy54IC0gdGhpcy5yYWRpdXMgJiYgeCA8PSB0aGlzLnggKyB0aGlzLnJhZGl1cyAmJiB5ID49IHRoaXMueSAtIHRoaXMucmFkaXVzICYmIHkgPD0gdGhpcy5yYWRpdXMgKyB0aGlzLnkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuICBoYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4LCB5KSB7XG4gICAgZHggPSB4IC0gdGhpcy54O1xuICAgIGR5ID0geSAtIHRoaXMueTtcbiAgICB2YXIgc2luID0gZHkgLyBNYXRoLnNxcnQoZHkgKiBkeSArIGR4ICogZHgpXG4gICAgdmFyIHNjYWxlZENvcyA9IDEuMCAtIChzaW4gKyAxKSAvIDI7XG4gICAgdmFyIHJhbmdlID0gdGhpcy5tYXggLSB0aGlzLm1pbjtcbiAgICB0aGlzLnZhbHVlID0gcmFuZ2UgKiBzY2FsZWRDb3MgKyB0aGlzLm1pbjtcbiAgICBhcHAuZHJhdygpO1xuICB9XG59XG5cbiIsImV4cG9ydCB7IERpYWwgfSBmcm9tICcuL2RpYWwuanMnO1xuZXhwb3J0IHsgU29ja2V0IH0gZnJvbSAnLi9zb2NrZXQuanMnO1xuZXhwb3J0IHsgQnV0dG9uLCBDbG9zZUJ1dHRvbiB9IGZyb20gJy4vYnV0dG9uLmpzJztcbiIsIlxuZXhwb3J0IGNsYXNzIFNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGxhYmVsKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLnJhZGl1cyA9IDg7XG4gIH1cbiAgZHJhdyhhcHApIHtcbiAgICAvLyBEcmF3IE9jdGFnb25cbiAgICB2YXIgb2N0YV9zaG9ydCA9IDAuMjkyODkzMjE4ODEzNDUyNDc1NTk5MTU1NjM3ODk1MTU7O1xuICAgIHZhciBvY3RhX2xvbmcgPSAxIC0gb2N0YV9zaG9ydDtcbiAgICB2YXIgb2N0YWdvbiA9IHtcbiAgICAgIHNpemU6IDIgKiB0aGlzLnJhZGl1cyArIDQsXG4gICAgfVxuICAgIHZhciB4ID0gdGhpcy54IC0gdGhpcy5yYWRpdXMgLSAyO1xuICAgIHZhciB5ID0gdGhpcy55IC0gdGhpcy5yYWRpdXMgLSAyO1xuICAgIGFwcC5jdHguYmVnaW5QYXRoKCk7XG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Tb2NrZXRCYWNrZ3JvdW5kO1xuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Tb2NrZXRPdXRsaW5lO1xuICAgIGFwcC5jdHgubW92ZVRvKHggKyBvY3RhZ29uLnNpemUgKiBvY3RhX3Nob3J0LCB5KTtcbiAgICBhcHAuY3R4LmxpbmVUbyh4LCB5ICsgb2N0YWdvbi5zaXplICogb2N0YV9zaG9ydCk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCwgeSArIG9jdGFnb24uc2l6ZSAqIG9jdGFfbG9uZyk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCArIG9jdGFnb24uc2l6ZSAqIG9jdGFfc2hvcnQsIHkgKyBvY3RhZ29uLnNpemUpO1xuICAgIGFwcC5jdHgubGluZVRvKHggKyBvY3RhZ29uLnNpemUgKiBvY3RhX2xvbmcsIHkgKyBvY3RhZ29uLnNpemUpO1xuICAgIGFwcC5jdHgubGluZVRvKHggKyBvY3RhZ29uLnNpemUsIHkgKyAgb2N0YWdvbi5zaXplICogb2N0YV9sb25nKTtcbiAgICBhcHAuY3R4LmxpbmVUbyh4ICsgb2N0YWdvbi5zaXplLCB5ICsgb2N0YWdvbi5zaXplICogb2N0YV9zaG9ydCk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCArIG9jdGFnb24uc2l6ZSAqIG9jdGFfbG9uZywgeSk7XG4gICAgYXBwLmN0eC5saW5lVG8oeCArIG9jdGFnb24uc2l6ZSAqIG9jdGFfc2hvcnQsIHkpO1xuICAgIGFwcC5jdHguZmlsbCgpO1xuICAgIGFwcC5jdHguc3Ryb2tlKCk7XG5cbiAgICAvLyBEcmF3IGhvbGVcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuU29ja2V0SW5zaWRlO1xuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuU29ja2V0SW5zaWRlO1xuICAgIGFwcC5jdHguYmVnaW5QYXRoKCk7XG4gICAgYXBwLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgYXBwLmN0eC5maWxsKCk7XG5cbiAgICAvLyBEcmF3IGxhYmVsXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVUZXh0O1xuICAgIGFwcC5jdHguZm9udCA9ICcxMHB4IG1vbm8nO1xuICAgIHZhciBjZW50ZXJYID0gdGhpcy54O1xuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICBhcHAuY3R4LmZpbGxUZXh0KHRoaXMubGFiZWwsIGNlbnRlclgsIHkgLSAzKTtcbiAgfVxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgaWYgKHggPj0gdGhpcy54IC0gdGhpcy5yYWRpdXMgJiYgeCA8PSB0aGlzLnggKyB0aGlzLnJhZGl1cyArIDQgJiYgeSA+PSB0aGlzLnkgLSB0aGlzLnJhZGl1cyAmJiB5IDw9IHRoaXMueSArIHRoaXMucmFkaXVzICsgNCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG4gIGhhbmRsZURyYWcoYXBwLCBkeCwgZHksIHgsIHkpIHtcbiAgICBpZiAodGhpcy5vbkRyYWcpIHtcbiAgICAgIHRoaXMub25EcmFnKGFwcCwgdGhpcywgZHgsIGR5LCB4LCB5KTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCB7IEluc3RydW1lbnQgfSBmcm9tICcuL2luc3RydW1lbnQuanMnO1xuaW1wb3J0IHsgSW5zdHJ1bWVudCB9IGZyb20gJy4vaW5zdHJ1bWVudC5qcyc7XG5pbXBvcnQgeyBNb2R1bGUgfSBmcm9tICcuL21vZHVsZS5qcyc7XG5pbXBvcnQgeyBDaGFubmVsSW5wdXQsIENoYW5uZWxPdXRwdXQsIFNhbXBsZUdlbmVyYXRvciwgRmlsdGVyIH0gZnJvbSAnLi9tb2R1bGVfdW5pdHMnO1xuaW1wb3J0IHsgQ2xvc2VCdXR0b24sIEJ1dHRvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvJztcblxuZXhwb3J0IGNsYXNzIEluc3RydW1lbnRFZGl0b3Ige1xuICBjb25zdHJ1Y3RvcihhcHAsIGluc3RydW1lbnQsIGhhbmRsZUNsb3NlKSB7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5wYWRkaW5nID0gYXBwLnRoZW1lLnBhZGRpbmc7XG4gICAgdGhpcy5zY2FsZSA9IDEuMFxuICAgIHRoaXMuc2hvd0NvbXBpbGUgPSB0cnVlO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgIGlmICghaW5zdHJ1bWVudCkge1xuICAgICAgdmFyIG1vZHVsZXMgPSBbXG4gICAgICAgIG5ldyBNb2R1bGUoaW5zdHJ1bWVudCwgMTAsIDEwLCBuZXcgQ2hhbm5lbElucHV0KCdpbnB1dCcpKSwgXG4gICAgICAgIG5ldyBNb2R1bGUoaW5zdHJ1bWVudCwgMTAsIDMwMCwgbmV3IENoYW5uZWxPdXRwdXQoJ291dHB1dCcpKSxcbiAgICAgIF07XG4gICAgICBpbnN0cnVtZW50Lm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgIH1cbiAgICB0aGlzLmluc3RydW1lbnQgPSBpbnN0cnVtZW50O1xuICAgIHRoaXMuYnV0dG9ucyA9IFtcbiAgICAgIG5ldyBDbG9zZUJ1dHRvbigxMCwgMTAsIGhhbmRsZUNsb3NlLCBcIlhcIiksXG4gICAgICBuZXcgQnV0dG9uKDEwLCAxMCwgdGhpcy5oYW5kbGVTaG93Q29tcGlsZS5iaW5kKHRoaXMpLCBcIkpTT05cIiksXG4gICAgICBuZXcgQnV0dG9uKDEwLCAxMCwgdGhpcy5oYW5kbGVab29tSW4uYmluZCh0aGlzKSwgXCIrXCIpLFxuICAgICAgbmV3IEJ1dHRvbigxMCwgMTAsIHRoaXMuaGFuZGxlWm9vbU91dC5iaW5kKHRoaXMpLCBcIi1cIiksXG4gICAgXTtcbiAgICB2YXIgYnV0dG9uRGVmcyA9IFtcbiAgICAgICAge2xhYmVsOiBcIlNJTlwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNpbmVcIil9LFxuICAgICAgICB7bGFiZWw6IFwiU1FVXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwic3F1YXJlXCIpfSxcbiAgICAgICAge2xhYmVsOiBcIlNBV1wiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEdlbmVyYXRvcihcInNhd1wiKX0sXG4gICAgICAgIHtsYWJlbDogXCJUUklcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJ0cmlhbmdsZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJQV01cIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJwdWxzZVwiKX0sXG4gICAgICAgIHtsYWJlbDogXCJXQVZcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRHZW5lcmF0b3IoXCJ3YXZcIil9LFxuICAgICAgICB7bGFiZWw6IFwiTk9JXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwid2hpdGVfbm9pc2VcIil9LFxuICAgICAgICB7bGFiZWw6IFwiR1JBXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwiZ3JhaW5cIil9LFxuICAgICAgICB7bGFiZWw6IFwiVk9DXCIsIG9uY2xpY2s6ICgpID0+IHRoaXMuaGFuZGxlQWRkR2VuZXJhdG9yKFwidm9jb2RlclwiKX0sXG4gICAgXTtcbiAgICB2YXIgZmlsdGVyRGVmcyA9IFtcbiAgICAgIHtsYWJlbDogXCJMUEZcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJsb3cgcGFzcyBmaWx0ZXJcIil9LFxuICAgICAge2xhYmVsOiBcIkhQRlwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcImhpZ2ggcGFzcyBmaWx0ZXJcIil9LFxuICAgICAge2xhYmVsOiBcIkRMWVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcImRlbGF5XCIpfSxcbiAgICAgIHtsYWJlbDogXCJGTEFcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJmbGFuZ2VyXCIpfSxcbiAgICAgIHtsYWJlbDogXCJESVNcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJkaXN0b3J0aW9uXCIpfSxcbiAgICAgIHtsYWJlbDogXCJPVlJcIiwgb25jbGljazogKCkgPT4gdGhpcy5oYW5kbGVBZGRGaWx0ZXIoXCJvdmVyZHJpdmVcIil9LFxuICAgICAge2xhYmVsOiBcIlRSRVwiLCBvbmNsaWNrOiAoKSA9PiB0aGlzLmhhbmRsZUFkZEZpbHRlcihcInRyZW1lbG9cIil9LFxuICAgIF07XG4gICAgdmFyIHggPSAxMDtcbiAgICBmb3IgKHZhciBkZWYgb2YgYnV0dG9uRGVmcykge1xuICAgICAgdmFyIGIgPSBuZXcgQnV0dG9uKHgsIDAsIGRlZi5vbmNsaWNrLmJpbmQodGhpcyksIGRlZi5sYWJlbCk7XG4gICAgICBiLmNvbG91ciA9IGFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZUdlbmVyYXRvcjtcbiAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGIpO1xuICAgICAgeCArPSBiLncgKyAzO1xuICAgIH1cbiAgICBmb3IgKHZhciBkZWYgb2YgZmlsdGVyRGVmcykge1xuICAgICAgdmFyIGIgPSBuZXcgQnV0dG9uKHgsIDAsIGRlZi5vbmNsaWNrLmJpbmQodGhpcyksIGRlZi5sYWJlbCk7XG4gICAgICBiLmNvbG91ciA9IGFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZUZpbHRlcjtcbiAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGIpO1xuICAgICAgeCArPSBiLncgKyAzO1xuICAgIH1cbiAgfVxuICBoYW5kbGVab29tSW4oKSB7XG4gICAgdGhpcy5zY2FsZSAqPSAyO1xuICAgIHRoaXMuYXBwLmRyYXcoKTtcbiAgfVxuICBoYW5kbGVab29tT3V0KCkge1xuICAgIHRoaXMuc2NhbGUgLz0gMjtcbiAgICB0aGlzLmFwcC5kcmF3KCk7XG4gIH1cbiAgaGFuZGxlQWRkRmlsdGVyKHR5cGUpIHtcbiAgICB2YXIgZyA9IG5ldyBGaWx0ZXIodHlwZSlcbiAgICB0aGlzLmluc3RydW1lbnQubW9kdWxlcy5wdXNoKG5ldyBNb2R1bGUodGhpcy5pbnN0cnVtZW50LCAxMjAsIDEyMCwgZykpO1xuICAgIHRoaXMuYXBwLmRyYXcoKTtcbiAgfVxuICBoYW5kbGVBZGRHZW5lcmF0b3IodHlwZSkge1xuICAgIHZhciBnID0gbmV3IFNhbXBsZUdlbmVyYXRvcih0eXBlKVxuICAgIHRoaXMuaW5zdHJ1bWVudC5tb2R1bGVzLnB1c2gobmV3IE1vZHVsZSh0aGlzLmluc3RydW1lbnQsIDEyMCwgMTIwLCBnKSk7XG4gICAgdGhpcy5hcHAuZHJhdygpO1xuICB9XG4gIGhhbmRsZVNob3dDb21waWxlKCkge1xuICAgIHRoaXMuc2hvd0NvbXBpbGUgPSAhdGhpcy5zaG93Q29tcGlsZTtcbiAgICB0aGlzLmFwcC5kcmF3KCk7XG4gIH1cbiAgaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSkge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgIGZvciAodmFyIGIgb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICB2YXIgdiA9IGIuaGFuZGxlTW91c2VEb3duKGFwcCwgeCwgeSk7XG4gICAgICBpZiAodikge1xuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgbSBvZiB0aGlzLmluc3RydW1lbnQubW9kdWxlcykge1xuICAgICAgdmFyIHYgPSBtLmhhbmRsZU1vdXNlRG93bihhcHAsIHggLSB0aGlzLnBhZGRpbmcsIHkgLSB0aGlzLnBhZGRpbmcpO1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHY7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBoYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4LCB5KSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQuaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZURyb3AoYXBwLCB4LCB5KSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQuaGFuZGxlRHJvcChhcHAsIHggLSB0aGlzLnBhZGRpbmcsIHkgLSB0aGlzLnBhZGRpbmcpO1xuICAgIH1cbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIHZhciB3ID0gYXBwLmNhbnZhcy53aWR0aCAtIDIgKiB0aGlzLnBhZGRpbmc7XG4gICAgdmFyIGggPSBhcHAuY2FudmFzLmhlaWdodCAtIDIgKiB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5idXR0b25zWzBdLnggPSB3IC0gMjA7XG4gICAgdGhpcy5idXR0b25zWzBdLnkgPSB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5idXR0b25zWzFdLnggPSB3IC0gMjA7XG4gICAgdGhpcy5idXR0b25zWzFdLnkgPSB0aGlzLnBhZGRpbmcgKyAyNTtcbiAgICB0aGlzLmJ1dHRvbnNbMl0ueCA9IHcgLSAyMDtcbiAgICB0aGlzLmJ1dHRvbnNbMl0ueSA9IHRoaXMucGFkZGluZyArIDUwO1xuICAgIHRoaXMuYnV0dG9uc1szXS54ID0gdyAtIDIwO1xuICAgIHRoaXMuYnV0dG9uc1szXS55ID0gdGhpcy5wYWRkaW5nICsgNzU7XG4gICAgYXBwLmN0eC5zYXZlKCk7XG4gICAgYXBwLmN0eC5saW5lV2lkdGggPSAxO1xuICAgIFxuICAgIC8vIERyYXcgdGhlIGJhY2tncm91bmRcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLkluc3RydW1lbnRFZGl0b3JCYWNrZ3JvdW5kO1xuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5PdXRsaW5lQ29sb3VyO1xuICAgIGFwcC5jdHguZmlsbFJlY3QodGhpcy5wYWRkaW5nLCB0aGlzLnBhZGRpbmcsIHcsIGgpO1xuICAgIGFwcC5jdHguc3Ryb2tlUmVjdCh0aGlzLnBhZGRpbmcsIHRoaXMucGFkZGluZywgdywgaCk7XG5cbiAgICBhcHAuY3R4LnNjYWxlKHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xuICAgIC8vIERyYXcgdGhlIG1vZHVsZXNcbiAgICBmb3IgKHZhciBtIG9mIHRoaXMuaW5zdHJ1bWVudC5tb2R1bGVzKSB7XG4gICAgICBhcHAuY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTsgLy8gcmVzZXQgdHJhbnNsYXRlXG4gICAgICBhcHAuY3R4LnRyYW5zbGF0ZSh0aGlzLnBhZGRpbmcsIHRoaXMucGFkZGluZyk7XG4gICAgICBtLmRyYXcoYXBwKTtcbiAgICB9XG4gICAgYXBwLmN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7IC8vIHJlc2V0IHRyYW5zbGF0ZVxuXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5QYXRjaDtcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuUGF0Y2g7XG4gICAgLy8gRHJhdyB0aGUgcGF0Y2hlc1xuICAgIGZvciAodmFyIHAgb2YgdGhpcy5pbnN0cnVtZW50LnBhdGNoZXMpIHtcbiAgICAgIHZhciBmcm9tTW9kID0gdGhpcy5pbnN0cnVtZW50Lm1vZHVsZXNbcC5mcm9tXTtcbiAgICAgIHZhciB0b01vZCA9IHRoaXMuaW5zdHJ1bWVudC5tb2R1bGVzW3AudG9dO1xuICAgICAgdmFyIGZyb21Tb2NrZXQgPSBwLmdldEZyb21Tb2NrZXQoZnJvbU1vZCk7XG4gICAgICB2YXIgdG9Tb2NrZXQgPSBwLmdldFRvU29ja2V0KHRvTW9kKTtcbiAgICAgIHZhciBmcm9tWCA9IHRoaXMucGFkZGluZyArIGZyb21Nb2QueCArIGZyb21Tb2NrZXQueDtcbiAgICAgIHZhciBmcm9tWSA9IHRoaXMucGFkZGluZyArIGZyb21Nb2QueSArIGZyb21Tb2NrZXQueTtcbiAgICAgIHZhciB0b1ggPSB0aGlzLnBhZGRpbmcgKyB0b01vZC54ICsgdG9Tb2NrZXQueDtcbiAgICAgIHZhciB0b1kgPSB0aGlzLnBhZGRpbmcgKyB0b01vZC55ICsgdG9Tb2NrZXQueTtcbiAgICAgIHZhciBwb2ludE9mZnNldCA9IDcwO1xuICAgICAgYXBwLmN0eC5saW5lV2lkdGggPSA0O1xuICAgICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGFwcC5jdHgubW92ZVRvKGZyb21YLCBmcm9tWSk7XG4gICAgICBhcHAuY3R4LmJlemllckN1cnZlVG8oXG4gICAgICAgIGZyb21YLCBcbiAgICAgICAgZnJvbVkgKyBwb2ludE9mZnNldCwgXG4gICAgICAgIHRvWCwgXG4gICAgICAgIHRvWSArIHBvaW50T2Zmc2V0LCBcbiAgICAgICAgdG9YLCBcbiAgICAgICAgdG9ZKTtcbiAgICAgIGFwcC5jdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgLy8gRHJhdyB0aGUgYnV0dG9ucyBcbiAgICBmb3IgKHZhciBiIG9mIHRoaXMuYnV0dG9ucykge1xuICAgICAgYi5kcmF3KGFwcCk7XG4gICAgfVxuXG4gICAgLy8gQ29tcGlsZWQgZ2VuZXJhdG9yXG4gICAgaWYgKHRoaXMuc2hvd0NvbXBpbGUpIHtcbiAgICAgIHZhciB0eHQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmluc3RydW1lbnQuY29tcGlsZSgpLCBudWxsLCAyKTtcbiAgICAgIHZhciBsaW5lTnIgPSAwO1xuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSBhcHAudGhlbWUuY29sb3Vycy5Nb2R1bGVUZXh0O1xuICAgICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcInN0YXJ0XCI7XG4gICAgICBmb3IgKHZhciBsaW5lIG9mIHR4dC5zcGxpdChcIlxcblwiKSkge1xuICAgICAgICBhcHAuY3R4LmZpbGxUZXh0KGxpbmUsIHcgLSAzMDAsIDkwICsgbGluZU5yICogMTIpO1xuICAgICAgICBsaW5lTnIrKztcbiAgICAgIH1cbiAgICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy5zY2FsZSwgdyAtIDMwMCwgOTAgKyBsaW5lTnIgKiAxMik7XG4gICAgfVxuICAgIGFwcC5jdHgucmVzdG9yZSgpO1xuICB9XG59XG5cbiIsImltcG9ydCB7IENoYW5uZWxJbnB1dCwgQ2hhbm5lbE91dHB1dCwgRmlsdGVyLCBTYW1wbGVHZW5lcmF0b3IgfSBmcm9tICcuL21vZHVsZV91bml0cyc7XG5pbXBvcnQgeyBNb2R1bGUgfSBmcm9tICcuL21vZHVsZS5qcyc7XG5pbXBvcnQgeyBQYXRjaCB9IGZyb20gJy4vcGF0Y2guanMnO1xuXG5leHBvcnQgY2xhc3MgSW5zdHJ1bWVudCB7XG4gIGNvbnN0cnVjdG9yKG1vZHVsZXMsIHBhdGNoZXMpIHtcbiAgICB0aGlzLm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgIHRoaXMucGF0Y2hlcyA9IHBhdGNoZXM7XG4gIH1cbiAgYWRkUGF0Y2goZnJvbU1vZCwgdG9Nb2QsIGZyb21Tb2NrZXQsIHRvU29ja2V0KSB7XG4gICAgdmFyIGZyb20gPSBudWxsO1xuICAgIHZhciB0byA9IG51bGw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBtID0gdGhpcy5tb2R1bGVzW2ldO1xuICAgICAgaWYgKG0gPT09IGZyb21Nb2QpIHtcbiAgICAgICAgZnJvbSA9IGk7XG4gICAgICB9XG4gICAgICBpZiAobSA9PT0gdG9Nb2QpIHtcbiAgICAgICAgdG8gPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZnJvbSA9PT0gbnVsbCB8fCB0byA9PT0gbnVsbCB8fCAoZnJvbSA9PT0gdG8gJiYgZnJvbVNvY2tldCA9PT0gdG9Tb2NrZXQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdmFyIHBhdGNoID0gbmV3IFBhdGNoKGZyb20sIHRvLCBmcm9tU29ja2V0LCB0b1NvY2tldCk7XG4gICAgdmFyIHJlbW92ZSA9IG51bGw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhdGNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwID0gdGhpcy5wYXRjaGVzW2ldO1xuICAgICAgaWYgKHAuaXNJc29tb3JwaGljKHBhdGNoKSkge1xuICAgICAgICByZW1vdmUgPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlbW92ZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5wYXRjaGVzLnB1c2gocGF0Y2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhdGNoZXMuc3BsaWNlKHJlbW92ZSwgMSk7XG4gICAgfVxuICB9XG4gIGxvYWRGcm9tRGVmaW5pdGlvbihpbnN0ckRlZikge1xuICAgIHZhciBtb2R1bGVzID0gW1xuICAgICAgbmV3IE1vZHVsZSh0aGlzLCAxMCwgNDAsIG5ldyBDaGFubmVsSW5wdXQoJ2lucHV0JykpLCBcbiAgICAgIG5ldyBNb2R1bGUodGhpcywgNzAwLCA0MCwgbmV3IENoYW5uZWxPdXRwdXQoJ291dHB1dCcpKSxcbiAgICBdO1xuICAgIHZhciBwYXRjaGVzID0gW1xuXG4gICAgXTtcbiAgICB0aGlzLm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgIHRoaXMucGF0Y2hlcyA9IHBhdGNoZXM7XG4gICAgdmFyIGl4ID0gdGhpcy5sb2FkR2VuZXJhdG9yKGluc3RyRGVmLCAwLCAxKTtcbiAgICBpZiAoaXgpIHtcbiAgICAgIHZhciBwID0gbmV3IFBhdGNoKGl4LCAwLCBcIkZSRVFcIiwgXCJGUkVRXCIpO1xuICAgICAgdGhpcy5wYXRjaGVzLnB1c2gocCk7XG4gICAgfVxuICB9XG4gIGxvYWRHZW5lcmF0b3IoaW5zdHJEZWYsIGlucHV0LCBvdXRwdXQpIHtcbiAgICBpZiAoaW5zdHJEZWZbXCJjb21iaW5lZFwiXSkge1xuICAgICAgZm9yICh2YXIgaURlZiBvZiBpbnN0ckRlZltcImNvbWJpbmVkXCJdKSB7XG4gICAgICAgIHZhciBpeCA9IHRoaXMubG9hZEdlbmVyYXRvcihpRGVmLCBpbnB1dCwgb3V0cHV0KTtcbiAgICAgICAgaWYgKGl4KSB7XG4gICAgICAgICAgdmFyIHAgPSBuZXcgUGF0Y2goaW5wdXQsIGl4LCBcIkZSRVFcIiwgXCJGUkVRXCIpO1xuICAgICAgICAgIHRoaXMucGF0Y2hlcy5wdXNoKHApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInBhbm5pbmdcIl0pIHtcbiAgICAgIHZhciBnID0gdGhpcy5sb2FkR2VuZXJhdG9yKGluc3RyRGVmW1wicGFubmluZ1wiXSwgaW5wdXQsIG91dHB1dCk7XG4gICAgICAvLyBUT0RPOiBhZGQgYSBQQU5OSU5HIGdlbmVyYXRvciBibG9ja1xuICAgICAgcmV0dXJuIGc7XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcInRyYW5zcG9zZVwiXSkge1xuICAgICAgdmFyIGcgPSB0aGlzLmxvYWRHZW5lcmF0b3IoaW5zdHJEZWZbXCJ0cmFuc3Bvc2VcIl0sIGlucHV0LCBvdXRwdXQpO1xuICAgICAgLy8gVE9ETzogYWRkIGEgVFJBTlNQT1NFIGdlbmVyYXRvciBibG9ja1xuICAgICAgcmV0dXJuIGc7XG4gICAgfSBlbHNlIGlmIChpbnN0ckRlZltcIndhdlwiXSkge1xuICAgICAgdmFyIG0gPSBuZXcgTW9kdWxlKHRoaXMsIDMwMCwgNDAsIG5ldyBTYW1wbGVHZW5lcmF0b3IoXCJ3YXZcIikpO1xuICAgICAgdmFyIHAgPSBuZXcgUGF0Y2godGhpcy5tb2R1bGVzLmxlbmd0aCwgb3V0cHV0LCBcIk9VVFwiLCBcIklOXCIpO1xuICAgICAgdGhpcy5tb2R1bGVzLnB1c2gobSk7XG4gICAgICB0aGlzLnBhdGNoZXMucHVzaChwKTtcbiAgICAgIHJldHVybiB0aGlzLm1vZHVsZXMubGVuZ3RoIC0gMTtcbiAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1widHJpYW5nbGVcIl0gfHwgaW5zdHJEZWZbXCJzcXVhcmVcIl0gfHwgaW5zdHJEZWZbXCJzYXd0b290aFwiXSkge1xuICAgICAgdmFyIHR5cCA9IFwidHJpYW5nbGVcIjtcbiAgICAgIHZhciBpbnN0ciA9IG51bGw7XG4gICAgICBpZiAoaW5zdHJEZWZbXCJ0cmlhbmdsZVwiXSkge1xuICAgICAgICBpbnN0ciA9IGluc3RyRGVmW1widHJpYW5nbGVcIl07XG4gICAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1wic3F1YXJlXCJdKSB7XG4gICAgICAgIGluc3RyID0gaW5zdHJEZWZbXCJzcXVhcmVcIl07XG4gICAgICAgIHR5cCA9IFwic3F1YXJlXCI7XG4gICAgICB9IGVsc2UgaWYgKGluc3RyRGVmW1wic2F3dG9vdGhcIl0pIHtcbiAgICAgICAgaW5zdHIgPSBpbnN0ckRlZltcInNhd3Rvb3RoXCJdO1xuICAgICAgICB0eXAgPSBcInNhd1wiO1xuICAgICAgfVxuICAgICAgdmFyIGcgPSBuZXcgU2FtcGxlR2VuZXJhdG9yKHR5cCk7XG4gICAgICBnLmRpYWxzW1wiYXR0YWNrXCJdLnZhbHVlID0gaW5zdHJbXCJhdHRhY2tcIl0gfHwgMC4wO1xuICAgICAgZy5kaWFsc1tcImRlY2F5XCJdLnZhbHVlID0gaW5zdHJbXCJkZWNheVwiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wic3VzdGFpblwiXS52YWx1ZSA9IGluc3RyW1wic3VzdGFpblwiXSB8fCAwLjA7XG4gICAgICBnLmRpYWxzW1wicmVsZWFzZVwiXS52YWx1ZSA9IGluc3RyW1wicmVsZWFzZVwiXSB8fCAwLjA7XG4gICAgICB2YXIgbSA9IG5ldyBNb2R1bGUodGhpcywgTWF0aC5yYW5kb20oKSAqIDgwMCArIDEwMCwgTWF0aC5yYW5kb20oKSAqIDYwMCArIDIwLCBnKTtcbiAgICAgIHZhciBwID0gbmV3IFBhdGNoKHRoaXMubW9kdWxlcy5sZW5ndGgsIG91dHB1dCwgXCJPVVRcIiwgXCJJTlwiKTtcbiAgICAgIHRoaXMubW9kdWxlcy5wdXNoKG0pO1xuICAgICAgdGhpcy5wYXRjaGVzLnB1c2gocCk7XG4gICAgICByZXR1cm4gdGhpcy5tb2R1bGVzLmxlbmd0aCAtIDE7XG4gICAgfVxuICB9XG4gIGxvYWQoaW5zdHJEZWYpIHtcbiAgICB2YXIgbW9kdWxlcyA9IFtdO1xuICAgIGZvciAodmFyIG0gb2YgaW5zdHJEZWYubW9kdWxlcykge1xuICAgICAgdmFyIGcgPSBudWxsO1xuICAgICAgaWYgKG0udHlwZSA9PSBcImlucHV0XCIpIHtcbiAgICAgICAgZyA9IG5ldyBDaGFubmVsSW5wdXQobS50eXBlKTtcbiAgICAgIH0gZWxzZSBpZiAobS50eXBlID09IFwib3V0cHV0XCIpIHtcbiAgICAgICAgZyA9IG5ldyBDaGFubmVsT3V0cHV0KG0udHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKG0udHlwZSA9PSBcImxvdyBwYXNzIGZpbHRlclwiKSB7XG4gICAgICAgIGcgPSBuZXcgRmlsdGVyKG0udHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKG0udHlwZSA9PSBcInNpbmVcIiB8fCBtLnR5cGUgPT0gXCJ0cmlhbmdsZVwiKSB7XG4gICAgICAgIGcgPSBuZXcgU2FtcGxlR2VuZXJhdG9yKG0udHlwZSk7XG4gICAgICB9XG4gICAgICBpZiAoZykge1xuICAgICAgICB2YXIgbW9kID0gbmV3IE1vZHVsZSh0aGlzLCBtLngsIG0ueSwgZyk7XG4gICAgICAgIG1vZHVsZXMucHVzaChtb2QpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgcGF0Y2hlcyA9IFtdO1xuICAgIGZvciAodmFyIHAgb2YgaW5zdHJEZWYucGF0Y2hlcykge1xuICAgICAgdmFyIHBhdGNoID0gbmV3IFBhdGNoKHAuZnJvbV9tb2R1bGUsIHAudG9fbW9kdWxlLCBwLmZyb21fc29ja2V0LCBwLnRvX3NvY2tldCk7XG4gICAgICBwYXRjaGVzLnB1c2gocGF0Y2gpO1xuICAgIH1cbiAgICB0aGlzLm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgIHRoaXMucGF0Y2hlcyA9IHBhdGNoZXM7XG4gIH1cblxuICBjb21waWxlKCkge1xuICAgIHZhciBvdXRwdXQgPSBudWxsO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbSA9IHRoaXMubW9kdWxlc1tpXTtcbiAgICAgIGlmIChtLnVuaXQudHlwZSA9PSBcIm91dHB1dFwiKSB7XG4gICAgICAgIG91dHB1dCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghb3V0cHV0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgcXVldWUgPSBbb3V0cHV0XTtcbiAgICB2YXIgc2VlbiA9IHt9O1xuICAgIHZhciBkZXBlbmRlbmNpZXMgPSBbb3V0cHV0XTtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHEgPSBxdWV1ZVswXTtcbiAgICAgIHZhciBxdWV1ZSA9IHF1ZXVlLnNwbGljZSgxKTtcbiAgICAgIGZvciAodmFyIHAgb2YgdGhpcy5wYXRjaGVzKSB7XG4gICAgICAgIGlmIChwLnRvID09PSBxICYmIChwLnRvU29ja2V0ID09IFwiSU5cIiB8fCBwLnRvU29ja2V0ID09IFwiRlJFUVwiKSkge1xuICAgICAgICAgIGlmICghc2VlbltwLmZyb21dKSB7XG4gICAgICAgICAgICBkZXBlbmRlbmNpZXMucHVzaChwLmZyb20pO1xuICAgICAgICAgICAgcXVldWUucHVzaChwLmZyb20pO1xuICAgICAgICAgICAgc2VlbltwLmZyb21dID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocC5mcm9tID09PSBxICYmIChwLmZyb21Tb2NrZXQgPT0gXCJJTlwiIHx8IHAuZnJvbVNvY2tldCA9PSBcIkZSRVFcIikpe1xuICAgICAgICAgIGlmICghc2VlbltwLnRvXSkge1xuICAgICAgICAgICAgZGVwZW5kZW5jaWVzLnB1c2gocC50byk7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKHAudG8pO1xuICAgICAgICAgICAgc2VlbltwLnRvXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZWVuW3FdID0gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIGdlbmVyYXRvcnMgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gZGVwZW5kZW5jaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgaXggPSBkZXBlbmRlbmNpZXNbaV07XG4gICAgICB2YXIgdW5pdCA9IHRoaXMubW9kdWxlc1tpeF0udW5pdDtcbiAgICAgIHZhciBnID0gbnVsbDtcbiAgICAgIGlmICh1bml0LnR5cGUgPT0gXCJpbnB1dFwiKSB7XG4gICAgICAgIGcgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJ0cmlhbmdsZVwiIHx8IHVuaXQudHlwZSA9PSBcInNpbmVcIiB8fCB1bml0LnR5cGUgPT0gXCJzYXdcIiB8fCB1bml0LnR5cGUgPT0gXCJzcXVhcmVcIiB8fCB1bml0LnR5cGUgPT0gXCJ3aGl0ZV9ub2lzZVwiKSB7XG4gICAgICAgIGcgPSB7fTtcbiAgICAgICAgZ1t1bml0LnR5cGVdID0ge1xuICAgICAgICAgIFwiYXR0YWNrXCI6IHVuaXQuZGlhbHNbXCJhdHRhY2tcIl0udmFsdWUsXG4gICAgICAgICAgXCJkZWNheVwiOiB1bml0LmRpYWxzW1wiZGVjYXlcIl0udmFsdWUsXG4gICAgICAgICAgXCJzdXN0YWluXCI6IHVuaXQuZGlhbHNbXCJzdXN0YWluXCJdLnZhbHVlLFxuICAgICAgICAgIFwicmVsZWFzZVwiOiB1bml0LmRpYWxzW1wicmVsZWFzZVwiXS52YWx1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBpdGNoRm91bmQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgcCBvZiB0aGlzLnBhdGNoZXMpIHtcbiAgICAgICAgICBpZiAocC50byA9PT0gaXggJiYgcC50b1NvY2tldCA9PSBcIkZSRVFcIikge1xuICAgICAgICAgICAgcGl0Y2hGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcGcgPSBnZW5lcmF0b3JzW3AuZnJvbV07XG4gICAgICAgICAgICBpZiAocGcpIHtcbiAgICAgICAgICAgICAgZ1t1bml0LnR5cGVdW1wiYXV0b19waXRjaFwiXSA9IHBnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXBpdGNoRm91bmQpIHtcbiAgICAgICAgICBnW3VuaXQudHlwZV1bXCJwaXRjaFwiXSA9IHVuaXQuZGlhbHNbXCJwaXRjaFwiXS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJsb3cgcGFzcyBmaWx0ZXJcIikge1xuICAgICAgICBnID0ge307XG4gICAgICAgIGdbXCJmaWx0ZXJcIl0gPSB7XCJscGZcIjoge1wiY3V0b2ZmXCI6IHVuaXQuZGlhbHNbXCJjdXRvZmZcIl0udmFsdWV9fVxuICAgICAgICB2YXIgb24gPSB0aGlzLmNvbXBpbGVHZW5lcmF0b3JzKGdlbmVyYXRvcnMsIGl4LCBcIklOXCIpO1xuICAgICAgICBPYmplY3Qua2V5cyhvbikubWFwKChrKSA9PiB7XG4gICAgICAgICAgZ1tcImZpbHRlclwiXVtrXSA9IG9uW2tdO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodW5pdC50eXBlID09IFwiaGlnaCBwYXNzIGZpbHRlclwiKSB7XG4gICAgICAgIGcgPSB7fTtcbiAgICAgICAgZ1tcImZpbHRlclwiXSA9IHtcImhwZlwiOiB7XCJjdXRvZmZcIjogdW5pdC5kaWFsc1tcImN1dG9mZlwiXS52YWx1ZX19XG4gICAgICAgIHZhciBvbiA9IHRoaXMuY29tcGlsZUdlbmVyYXRvcnMoZ2VuZXJhdG9ycywgaXgsIFwiSU5cIik7XG4gICAgICAgIE9iamVjdC5rZXlzKG9uKS5tYXAoKGspID0+IHtcbiAgICAgICAgICBnW1wiZmlsdGVyXCJdW2tdID0gb25ba107XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh1bml0LnR5cGUgPT0gXCJvdXRwdXRcIikge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21waWxlR2VuZXJhdG9ycyhnZW5lcmF0b3JzLCBpeCwgXCJJTlwiKTtcbiAgICAgIH1cbiAgICAgIGdlbmVyYXRvcnNbaXhdID0gZztcbiAgICB9XG4gICAgcmV0dXJuIGRlcGVuZGVuY2llcztcbiAgfVxuXG4gIGNvbXBpbGVHZW5lcmF0b3JzKGdlbmVyYXRvcnMsIGl4LCBpbnB1dCkge1xuICAgIHZhciBncyA9IFtdO1xuICAgIGZvciAodmFyIHAgb2YgdGhpcy5wYXRjaGVzKSB7XG4gICAgICBpZiAocC50byA9PT0gaXggJiYgcC50b1NvY2tldCA9PT0gaW5wdXQpIHtcbiAgICAgICAgZ3MucHVzaChnZW5lcmF0b3JzW3AuZnJvbV0pXG4gICAgICB9IGVsc2UgaWYgKHAuZnJvbSA9PSBpeCAmJiBwLmZyb21Tb2NrZXQgPT09IGlucHV0KSB7XG4gICAgICAgIGdzLnB1c2goZ2VuZXJhdG9yc1twLnRvXSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIGlmIChncy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBnc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcImNvbWJpbmVkXCI6IGdzfVxuICAgIH1cbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBTb2NrZXQsIERpYWwgfSBmcm9tICcuLi9jb21wb25lbnRzLyc7XG5cbmV4cG9ydCBjbGFzcyBNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihpbnN0cnVtZW50LCB4LCB5LCB1bml0KSB7XG4gICAgdGhpcy5pbnN0cnVtZW50ID0gaW5zdHJ1bWVudDtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy51bml0ID0gdW5pdDtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcbiAgICB0aGlzLnVuaXQuZHJhdyhhcHApO1xuICB9XG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICB2YXIgdiA9IHRoaXMudW5pdC5oYW5kbGVNb3VzZURvd24oYXBwLCB4IC0gdGhpcy54LCB5IC0gdGhpcy55KTtcbiAgICBpZiAoIXYpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZCA9IHY7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSkge1xuICAgIHZhciB2ID0gdGhpcy5zZWxlY3RlZDtcbiAgICBpZiAodiBpbnN0YW5jZW9mIFNvY2tldCkge1xuICAgICAgY29uc29sZS5sb2coXCJkcmFnZ2luZyBhIHNvY2tldFwiKTtcbiAgICAgIHYuaGFuZGxlRHJhZyhhcHAsIGR4LCBkeSwgeCwgeSk7XG4gICAgfSBlbHNlIGlmICh2IGluc3RhbmNlb2YgRGlhbCkge1xuICAgICAgdi5oYW5kbGVEcmFnKGFwcCwgZHgsIGR5LCB4IC0gdGhpcy54LCB5IC0gdGhpcy55KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54ICs9IGR4O1xuICAgICAgdGhpcy55ICs9IGR5O1xuICAgIH1cbiAgfVxuICBoYW5kbGVEcm9wKGFwcCwgeCwgeSkge1xuICAgIHZhciB2ID0gdGhpcy5zZWxlY3RlZDtcbiAgICBpZiAodiBpbnN0YW5jZW9mIFNvY2tldCkge1xuICAgICAgZm9yICh2YXIgbW9kdWxlIG9mIHRoaXMuaW5zdHJ1bWVudC5tb2R1bGVzKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhtb2R1bGUudW5pdC5zb2NrZXRzKSkge1xuICAgICAgICAgIHZhciBzID0gbW9kdWxlLnVuaXQuc29ja2V0c1trZXldO1xuICAgICAgICAgIHZhciBzeCA9IHggLSBtb2R1bGUueDtcbiAgICAgICAgICB2YXIgc3kgPSB5IC0gbW9kdWxlLnk7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHMuaGFuZGxlTW91c2VEb3duKGFwcCwgc3gsIHN5KTtcbiAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhdGNoaW5nIHRvIHNvY2tldFwiLCB2LmxhYmVsLCBcIi0+XCIsIHJlc3VsdC5sYWJlbCk7XG4gICAgICAgICAgICB0aGlzLmluc3RydW1lbnQuYWRkUGF0Y2godGhpcywgbW9kdWxlLCB2LmxhYmVsLCByZXN1bHQubGFiZWwpO1xuICAgICAgICAgICAgYXBwLmRyYXcoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZVVuaXQgfSBmcm9tICcuL21vZHVsZV91bml0LmpzJztcbmltcG9ydCB7IE91dHB1dCB9IGZyb20gJy4vc29ja2V0cy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBDaGFubmVsSW5wdXQgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiRlJFUVwiOiBuZXcgT3V0cHV0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSwgXCJGUkVRXCIpLFxuICAgIH1cbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlT3V0cHV0JztcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlVW5pdCB9IGZyb20gJy4vbW9kdWxlX3VuaXQuanMnO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICcuL3NvY2tldHMuanMnO1xuXG5cbmV4cG9ydCBjbGFzcyBDaGFubmVsT3V0cHV0IGV4dGVuZHMgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcih0eXBlKTtcbiAgICB0aGlzLnNvY2tldHMgPSB7XG4gICAgICBcIklOXCI6IG5ldyBJbnB1dCgyOSwgdGhpcy5oIC0gMjkpLFxuICAgIH1cbiAgICB0aGlzLmJhY2tncm91bmQgPSAnTW9kdWxlT3V0cHV0JztcbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBNb2R1bGVVbml0IH0gZnJvbSAnLi9tb2R1bGVfdW5pdC5qcyc7XG5pbXBvcnQgeyBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnLi9zb2NrZXRzLmpzJztcbmltcG9ydCB7IERpYWwgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXIgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuc29ja2V0cyA9IHtcbiAgICAgIFwiSU5cIjogbmV3IElucHV0KDI5LCB0aGlzLmggLSAyOSksXG4gICAgICBcIk9VVFwiOiBuZXcgT3V0cHV0KHRoaXMudyAtIDI5LCB0aGlzLmggLSAyOSksXG4gICAgfVxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVGaWx0ZXInO1xuICAgIHRoaXMuZGlhbHMgPSB7IH1cblxuICAgIGlmICh0eXBlID09PSBcImxvdyBwYXNzIGZpbHRlclwiIHx8IHR5cGUgPT09IFwiaGlnaCBwYXNzIGZpbHRlclwiKSB7XG4gICAgICB0aGlzLncgPSAxNTA7XG4gICAgICB0aGlzLmRpYWxzW1wiY3V0b2ZmXCJdID0gbmV3IERpYWwoMjksIDU5LCBcIkNVVE9GRlwiLCAxLjAsIDIyMDAwLjAsIDUwMDAuMCk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcImRlbGF5XCIpIHtcbiAgICAgIHRoaXMudyA9IDE3MDtcbiAgICAgIHRoaXMuZGlhbHNbXCJ0aW1lXCJdID0gbmV3IERpYWwoMjksIDU5LCBcIlRJTUVcIiwgMC4wMDAwMSwgNC4wLCAxLjApO1xuICAgICAgdGhpcy5kaWFsc1tcImZhY3RvclwiXSA9IG5ldyBEaWFsKDc5LCA1OSwgXCJGQUNUT1JcIiwgMC4wLCAyLjAsIDEuMCk7XG4gICAgICB0aGlzLmRpYWxzW1wiZmVlZGJhY2tcIl0gPSBuZXcgRGlhbCgxMjksIDU5LCBcIkZFRURCQUNLXCIsIDAuMCwgMi4wLCAwLjApO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IHsgQ2hhbm5lbElucHV0IH0gZnJvbSAnLi9jaGFubmVsX2lucHV0LmpzJztcbmV4cG9ydCB7IENoYW5uZWxPdXRwdXQgfSBmcm9tICcuL2NoYW5uZWxfb3V0cHV0LmpzJztcbmV4cG9ydCB7IEZpbHRlciB9IGZyb20gJy4vZmlsdGVyLmpzJztcbmV4cG9ydCB7IFNhbXBsZUdlbmVyYXRvciB9IGZyb20gJy4vc2FtcGxlX2dlbmVyYXRvci5qcyc7XG4iLCJpbXBvcnQgeyBPdXRwdXQgfSBmcm9tICcuL3NvY2tldHMuanMnO1xuXG5leHBvcnQgY2xhc3MgTW9kdWxlVW5pdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMudyA9IDE1MDtcbiAgICB0aGlzLmggPSAxNTA7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuXG4gICAgfTtcbiAgICB0aGlzLmRpYWxzID0ge307XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gXCJcIjtcbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIHZhciB3ID0gdGhpcy53O1xuICAgIHZhciBoID0gdGhpcy5oO1xuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnNbdGhpcy5iYWNrZ3JvdW5kXTtcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gYXBwLnRoZW1lLmNvbG91cnMuTW9kdWxlT3V0bGluZTtcbiAgICBhcHAuY3R4LmZpbGxSZWN0KDAsIDAsIHcsIGgpO1xuICAgIGFwcC5jdHguc3Ryb2tlUmVjdCgwLCAwLCB3LCBoKTtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IGFwcC50aGVtZS5jb2xvdXJzLk1vZHVsZVRleHQ7XG4gICAgYXBwLmN0eC5mb250ID0gJzE0cHggbW9ubyc7XG4gICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy50eXBlLCB3IC8gMiwgMTQpO1xuICAgIGZvciAodmFyIG8gb2YgT2JqZWN0LmtleXModGhpcy5zb2NrZXRzKSkge1xuICAgICAgdGhpcy5zb2NrZXRzW29dLmRyYXcoYXBwKTtcbiAgICB9XG4gICAgZm9yICh2YXIgbyBvZiBPYmplY3Qua2V5cyh0aGlzLmRpYWxzKSkge1xuICAgICAgdGhpcy5kaWFsc1tvXS5kcmF3KGFwcCk7XG4gICAgfVxuICB9XG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICBmb3IgKHZhciBvIG9mIE9iamVjdC5rZXlzKHRoaXMuc29ja2V0cykpIHtcbiAgICAgIHZhciB2ID0gdGhpcy5zb2NrZXRzW29dLmhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpO1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIG8gb2YgT2JqZWN0LmtleXModGhpcy5kaWFscykpIHtcbiAgICAgIHZhciB2ID0gdGhpcy5kaWFsc1tvXS5oYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KTtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHJldHVybiB2O1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgcGF0aCA9IG5ldyBQYXRoMkQoKTtcbiAgICBwYXRoLnJlY3QoMCwgMCwgdGhpcy53LCB0aGlzLmgpO1xuICAgIGlmIChhcHAuY3R4LmlzUG9pbnRJblBhdGgocGF0aCwgeCwgeSkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnLi9zb2NrZXRzLmpzJztcbmltcG9ydCB7IE1vZHVsZVVuaXQgfSBmcm9tICcuL21vZHVsZV91bml0LmpzJztcbmltcG9ydCB7IERpYWwgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLyc7XG5cbmV4cG9ydCBjbGFzcyBTYW1wbGVHZW5lcmF0b3IgZXh0ZW5kcyBNb2R1bGVVbml0IHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKHR5cGUpO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9ICdNb2R1bGVHZW5lcmF0b3InO1xuICAgIHRoaXMudyA9IDIyMDtcbiAgICB0aGlzLmggPSAyNTA7XG4gICAgdGhpcy5zb2NrZXRzID0ge1xuICAgICAgXCJGUkVRXCI6IG5ldyBJbnB1dCgyOSwgdGhpcy5oIC0gMjksIFwiRlJFUVwiKSxcbiAgICAgIFwiT1VUXCI6IG5ldyBPdXRwdXQodGhpcy53IC0gMjksIHRoaXMuaCAtIDI5KSxcbiAgICB9XG4gICAgdGhpcy5kaWFscyA9IHtcbiAgICAgIFwicGl0Y2hcIjogbmV3IERpYWwoMjksIDQ5LCBcIkZSRVFcIiwgMC4wLCAyMjAwMC4wLCAwLjApLFxuICAgICAgXCJhdHRhY2tcIjogbmV3IERpYWwoMjksIDEyMCwgXCJBVFRBQ0tcIiwgMC4wLCAxMC4wLCAwLjEpLFxuICAgICAgXCJkZWNheVwiOiBuZXcgRGlhbCg3OSwgMTIwLCBcIkRFQ0FZXCIsIDAuMCwgMTAuMCwgMC4xKSxcbiAgICAgIFwic3VzdGFpblwiOiBuZXcgRGlhbCgxMjksIDEyMCwgXCJTVVNUQUlOXCIsIDAuMCwgMS4wLCAwLjgpLFxuICAgICAgXCJyZWxlYXNlXCI6IG5ldyBEaWFsKDE3OSwgMTIwLCBcIlJFTEVBU0VcIiwgMC4wLCAxMCwgMC4xKSxcbiAgICB9XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy8nO1xuZXhwb3J0IGNsYXNzIE91dHB1dCBleHRlbmRzIFNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGxhYmVsKSB7XG4gICAgc3VwZXIoeCwgeSlcbiAgICB0aGlzLmxhYmVsID0gbGFiZWwgPyBsYWJlbCA6IFwiT1VUXCI7XG4gIH1cbn1cbmV4cG9ydCBjbGFzcyBJbnB1dCBleHRlbmRzIFNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGxhYmVsKSB7XG4gICAgc3VwZXIoeCwgeSlcbiAgICB0aGlzLmxhYmVsID0gbGFiZWwgPyBsYWJlbCA6IFwiSU5cIjtcbiAgfVxufVxuIiwiXG5leHBvcnQgY2xhc3MgUGF0Y2gge1xuICBjb25zdHJ1Y3Rvcihmcm9tTW9kdWxlLCB0b01vZHVsZSwgZnJvbVNvY2tldCwgdG9Tb2NrZXQpIHtcbiAgICB0aGlzLmZyb20gPSBmcm9tTW9kdWxlO1xuICAgIHRoaXMudG8gPSB0b01vZHVsZTtcbiAgICB0aGlzLmZyb21Tb2NrZXQgPSBmcm9tU29ja2V0O1xuICAgIHRoaXMudG9Tb2NrZXQgPSB0b1NvY2tldDtcbiAgfVxuICBnZXRGcm9tU29ja2V0KG1vZCkge1xuICAgIHJldHVybiBtb2QudW5pdC5zb2NrZXRzW3RoaXMuZnJvbVNvY2tldF07XG4gIH1cbiAgZ2V0VG9Tb2NrZXQobW9kKSB7XG4gICAgcmV0dXJuIG1vZC51bml0LnNvY2tldHNbdGhpcy50b1NvY2tldF07XG4gIH1cbiAgaXNJc29tb3JwaGljKHApIHtcbiAgICByZXR1cm4gKHRoaXMuZnJvbSA9PSBwLmZyb20gXG4gICAgICAgICYmIHRoaXMudG8gPT0gcC50byBcbiAgICAgICAgJiYgdGhpcy5mcm9tU29ja2V0ID09IHAuZnJvbVNvY2tldCBcbiAgICAgICAgJiYgdGhpcy50b1NvY2tldCA9PSBwLnRvU29ja2V0KSBcbiAgICAgIHx8IFxuICAgICAgKHRoaXMudG8gPT0gcC5mcm9tXG4gICAgICAgICYmIHRoaXMuZnJvbSA9PSBwLnRvIFxuICAgICAgICAmJiB0aGlzLmZyb21Tb2NrZXQgPT0gcC50b1NvY2tldCBcbiAgICAgICAgJiYgdGhpcy50b1NvY2tldCA9PSBwLmZyb21Tb2NrZXQpO1xuICB9XG59XG5cbiIsImltcG9ydCB7IFRoZW1lIH0gZnJvbSAnLi90aGVtZS5qcyc7XG5pbXBvcnQgeyBJbnN0cnVtZW50RWRpdG9yLCBJbnN0cnVtZW50IH0gZnJvbSAnLi9pbnN0cnVtZW50X2VkaXRvci8nO1xuaW1wb3J0IHsgVGltZWxpbmVFZGl0b3IsIENoYW5uZWwgfSBmcm9tICcuL3RpbWVsaW5lX2VkaXRvci8nO1xuXG5leHBvcnQgY2xhc3MgQmxlZXAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XG4gICAgdGhpcy50aGVtZSA9IG5ldyBUaGVtZSgpO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLmNhbnZhcy5vbm1vdXNlZG93biA9IHRoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQodGhpcylcbiAgICB0aGlzLmNhbnZhcy5vbm1vdXNldXAgPSB0aGlzLmhhbmRsZU1vdXNlVXAuYmluZCh0aGlzKVxuICAgIHRoaXMuY2FudmFzLm9ubW91c2Vtb3ZlID0gdGhpcy5oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKVxuICAgIHRoaXMuc2VsZWN0ZWRFbGVtID0gbnVsbDtcbiAgICB0aGlzLnN0YXJ0U2VsZWN0ZWRQb3MgPSB7fTtcbiAgICB0aGlzLnNlbGVjdGVkUG9zID0ge307XG4gICAgdmFyIGkgPSB0aGlzLmxvYWRJbnN0cnVtZW50QmFuayhpbnN0cnVtZW50QmFuayk7XG4gICAgLy90aGlzLmxvYWQoZXhhbXBsZSk7XG4gICAgLy90aGlzLm9wZW5UaW1lbGluZUVkaXRvcigpO1xuICAgIHRoaXMub3Blbkluc3RydW1lbnRFZGl0b3IoaSk7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICBsb2FkSW5zdHJ1bWVudEJhbmsoYmFuaykge1xuICAgIGZvciAodmFyIGluc3RyRGVmIG9mIGJhbmspIHtcbiAgICAgIHZhciBpbnN0ciA9IG5ldyBJbnN0cnVtZW50KCk7XG4gICAgICBpbnN0ci5sb2FkRnJvbURlZmluaXRpb24oaW5zdHJEZWYpO1xuICAgIH1cbiAgICByZXR1cm4gaW5zdHI7XG4gIH1cblxuICBsb2FkKGRhdGEpIHtcbiAgICB0aGlzLmNoYW5uZWxzID0gW107XG4gICAgZm9yICh2YXIgY2ggb2YgZGF0YS5jaGFubmVscykge1xuICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgQ2hhbm5lbChjaC5jaGFubmVsX25yLCB0aGlzLm9wZW5JbnN0cnVtZW50RWRpdG9yLmJpbmQodGhpcykpO1xuICAgICAgY2hhbm5lbC5uYW1lID0gY2gubmFtZTtcbiAgICAgIGNoYW5uZWwuc2VxdWVuY2VfdHJhY2tzID0gY2guc2VxdWVuY2VfdHJhY2tzO1xuICAgICAgaWYgKGNoLmluc3RydW1lbnQpIHtcbiAgICAgICAgY2hhbm5lbC5pbnN0cnVtZW50ID0gbmV3IEluc3RydW1lbnQoKTtcbiAgICAgICAgY2hhbm5lbC5pbnN0cnVtZW50LmxvYWQoY2guaW5zdHJ1bWVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5uZWxzLnB1c2goY2hhbm5lbCk7XG4gICAgfVxuICB9XG5cbiAgb3Blbkluc3RydW1lbnRFZGl0b3IoaW5zdHIpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IG5ldyBJbnN0cnVtZW50RWRpdG9yKHRoaXMsIGluc3RyLCB0aGlzLm9wZW5UaW1lbGluZUVkaXRvci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmRyYXcoKVxuICB9XG4gIG9wZW5UaW1lbGluZUVkaXRvcigpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IG5ldyBUaW1lbGluZUVkaXRvcih0aGlzLmNoYW5uZWxzKTtcbiAgICB0aGlzLmRyYXcoKTtcbiAgfVxuXG4gIGhhbmRsZU1vdXNlRG93bihlKSB7XG4gICAgdmFyIGJvdW5kID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB2YXIgeCA9IGUuY2xpZW50WCAtIGJvdW5kLmxlZnQ7IFxuICAgIHZhciB5ID0gZS5jbGllbnRZIC0gYm91bmQudG9wO1xuICAgIHRoaXMuc2VsZWN0ZWRFbGVtID0gbnVsbDtcbiAgICB0aGlzLnNlbGVjdGVkUG9zID0ge307XG4gICAgaWYgKHRoaXMuYWN0aXZlLmhhbmRsZU1vdXNlRG93bikge1xuICAgICAgdmFyIGVsZW0gPSB0aGlzLmFjdGl2ZS5oYW5kbGVNb3VzZURvd24odGhpcywgeCwgeSk7XG4gICAgICBpZiAoZWxlbSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkRWxlbSA9IGVsZW07XG4gICAgICAgIHRoaXMuc3RhcnRTZWxlY3RlZFBvcyA9IHt4LCB5fTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBvcyA9IHt4LCB5fTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVNb3VzZVVwKGUpIHtcbiAgICB2YXIgYm91bmQgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIHZhciB4ID0gZS5jbGllbnRYIC0gYm91bmQubGVmdDsgXG4gICAgdmFyIHkgPSBlLmNsaWVudFkgLSBib3VuZC50b3A7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRFbGVtKSB7XG4gICAgICB2YXIgZWxlbSA9IHRoaXMuc2VsZWN0ZWRFbGVtO1xuICAgICAgdmFyIHN4ID0gdGhpcy5zdGFydFNlbGVjdGVkUG9zLng7XG4gICAgICB2YXIgc3kgPSB0aGlzLnN0YXJ0U2VsZWN0ZWRQb3MueTtcbiAgICAgIGlmIChzeCA+PSB4IC01ICYmIHN4IDw9IHggKyA1ICYmIHN5ID49IHkgLSA1ICYmIHN5IDw9IHkgKyA1KSB7XG4gICAgICAgIGlmIChlbGVtLmhhbmRsZUNsaWNrKSB7XG4gICAgICAgICAgZWxlbS5oYW5kbGVDbGljayh0aGlzLCB4LCB5KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsZW0uaGFuZGxlRHJvcCkge1xuICAgICAgICAgIGVsZW0uaGFuZGxlRHJvcCh0aGlzLCB4LCB5KTtcbiAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RlZEVsZW0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU1vdXNlTW92ZShlKSB7XG4gICAgdmFyIGJvdW5kID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB2YXIgeCA9IGUuY2xpZW50WCAtIGJvdW5kLmxlZnQ7IFxuICAgIHZhciB5ID0gZS5jbGllbnRZIC0gYm91bmQudG9wO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkRWxlbSkge1xuICAgICAgdmFyIGVsZW0gPSB0aGlzLnNlbGVjdGVkRWxlbTtcbiAgICAgIHZhciBzeCA9IHRoaXMuc2VsZWN0ZWRQb3MueDtcbiAgICAgIHZhciBzeSA9IHRoaXMuc2VsZWN0ZWRQb3MueTtcbiAgICAgIGlmIChzeCA+PSB4IC01ICYmIHN4IDw9IHggKyA1ICYmIHN5ID49IHkgLSA1ICYmIHN5IDw9IHkgKyA1KSB7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWxlbS5oYW5kbGVEcmFnKSB7XG4gICAgICAgICAgZWxlbS5oYW5kbGVEcmFnKHRoaXMsIHggLSBzeCwgeSAtIHN5LCB4LCB5LCBzeCwgc3kpO1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQb3MgPSB7eCwgeX07XG4gICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmF3KCkge1xuICAgIHZhciB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHZhciB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgdmFyIGJvdW5kID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpbmRvd1dpZHRoO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHdpbmRvd0hlaWdodCAtIGJvdW5kLnRvcDtcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gdGhpcy50aGVtZS5jb2xvdXJzLkJhY2tncm91bmQ7XG4gICAgYm9keS5zdHlsZS5jb2xvciA9IHRoaXMudGhlbWUuY29sb3Vycy5Gb3JlZ3JvdW5kO1xuICAgIHRoaXMuYWN0aXZlLmRyYXcodGhpcyk7XG4gIH1cbn1cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgdHJ5IHsgXG4gIG5ldyBCbGVlcCgpO1xuICB9IGNhdGNoKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgICBhbGVydChlKTtcbiAgfVxufVxuIiwiXG5leHBvcnQgY2xhc3MgVGhlbWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBhZGRpbmcgPSAxMDtcbiAgICB0aGlzLmNvbG91cnMgPSB7XG4gICAgICBPdXRsaW5lQ29sb3VyOiAnIzMzMycsXG4gICAgICBCYWNrZ3JvdW5kOiAnIzQ0NCcsXG4gICAgICBGb3JlZ3JvdW5kOiAnI2VlZScsXG4gICAgICBTb2NrZXRCYWNrZ3JvdW5kOiAnIzk5OScsXG4gICAgICBTb2NrZXRJbnNpZGU6ICcjOTk5JyxcbiAgICAgIFNvY2tldE91dGxpbmU6ICcjNzc3JyxcbiAgICAgIEluc3RydW1lbnRFZGl0b3JCYWNrZ3JvdW5kOiAnI2VlZScsXG4gICAgICBQYXRjaDogJyM3NzcnLFxuICAgICAgTW9kdWxlT3V0bGluZTogJyM3NzcnLFxuICAgICAgTW9kdWxlVGV4dDogJyM0NDQnLFxuICAgICAgTW9kdWxlR2VuZXJhdG9yOiAnI2ZmZicsXG4gICAgICBNb2R1bGVGaWx0ZXI6ICcjZmZkJyxcbiAgICAgIE1vZHVsZU91dHB1dDogJyNkZmQnLFxuICAgICAgQnV0dG9uOiAnI2NjYycsXG4gICAgICBCdXR0b25UZXh0OiAnIzMzMycsXG4gICAgICBEaWFsOiAnI2NjYycsXG4gICAgICBEaWFsTGluZTogJyM0NDQnLFxuICAgIH07XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgU2VxdWVuY2VUcmFjayB9IGZyb20gJy4vc2VxdWVuY2VfdHJhY2suanMnOyBcblxuZXhwb3J0IGNsYXNzIENoYW5uZWwge1xuICBjb25zdHJ1Y3RvcihjaGFubmVsTnIsIG9wZW5JbnN0cnVtZW50RWRpdG9yKSB7XG4gICAgdGhpcy5jaGFubmVsTnIgPSBjaGFubmVsTnI7XG4gICAgdGhpcy5pbnN0cnVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnNlcXVlbmNlVHJhY2tzID0gW25ldyBTZXF1ZW5jZVRyYWNrKCldO1xuICAgIHRoaXMubmFtZSA9IFwiVW50aXRsZWQgXCIgKyB0aGlzLmNoYW5uZWxOcjtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5uZWxOcjsgaSsrKSB7XG4gICAgICB0aGlzLnNlcXVlbmNlVHJhY2tzLnB1c2gobmV3IFNlcXVlbmNlVHJhY2soKSk7XG4gICAgfVxuXG4gICAgdGhpcy5oZWlnaHQgPSAxNTA7XG4gICAgdGhpcy5tYXJnaW5Ub3AgPSAxMDtcbiAgICB0aGlzLm9mZnNldCA9ICB0aGlzLmNoYW5uZWxOciAqICh0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luVG9wKTtcbiAgICB0aGlzLnBhZGRpbmcgPSAxMDtcbiAgICB0aGlzLmNoYW5uZWxXaWR0aCA9IDkwO1xuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSAoKSA9PiBvcGVuSW5zdHJ1bWVudEVkaXRvcih0aGlzLmluc3RydW1lbnQpO1xuICB9XG5cbiAgZHJhdyhhcHApIHtcbiAgICB2YXIgY29sb3JPZmZzZXQgPSB0aGlzLmNoYW5uZWxOciAqIDQwO1xuICAgIHZhciBoZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICB2YXIgbWFyZ2luVG9wID0gdGhpcy5tYXJnaW5Ub3A7XG4gICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHZhciBwYWRkaW5nID0gdGhpcy5wYWRkaW5nO1xuICAgIHZhciBjaGFubmVsV2lkdGggPSB0aGlzLmNoYW5uZWxXaWR0aDtcbiAgICB2YXIgdHJhY2tXaWR0aCA9IGFwcC5jYW52YXMud2lkdGggLSBjaGFubmVsV2lkdGggLSBwYWRkaW5nICogMjtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMCwgJyArICgyMDAgLSBjb2xvck9mZnNldCkgKyAnLCAwKSc7XG4gICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoNDAsIDQwLCA0MCwgMS4wKSc7XG4gICAgYXBwLmN0eC5maWxsUmVjdChwYWRkaW5nLCBwYWRkaW5nICsgb2Zmc2V0LCBjaGFubmVsV2lkdGgsIGhlaWdodCk7XG4gICAgYXBwLmN0eC5zdHJva2VSZWN0KHBhZGRpbmcsIHBhZGRpbmcgKyBvZmZzZXQsIGNoYW5uZWxXaWR0aCwgaGVpZ2h0KTtcblxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gJ3JnYigyNTUsICcgKyAoMjAwIC0gY29sb3JPZmZzZXQpICsgJywgMCknO1xuICAgIGFwcC5jdHguZmlsbFJlY3QocGFkZGluZyArIGNoYW5uZWxXaWR0aCwgcGFkZGluZyArIG9mZnNldCwgdHJhY2tXaWR0aCwgaGVpZ2h0KTtcbiAgICBhcHAuY3R4LnN0cm9rZVJlY3QocGFkZGluZyArIGNoYW5uZWxXaWR0aCwgcGFkZGluZyArIG9mZnNldCwgdHJhY2tXaWR0aCwgaGVpZ2h0KTtcblxuICAgIHZhciB0cmFja0hlaWdodCA9IGhlaWdodCAvIHRoaXMuc2VxdWVuY2VUcmFja3MubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZXF1ZW5jZVRyYWNrcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGFwcC5jdHguc3Ryb2tlUmVjdChwYWRkaW5nICsgY2hhbm5lbFdpZHRoLCBwYWRkaW5nICsgb2Zmc2V0ICsgaSAqIHRyYWNrSGVpZ2h0LCB0cmFja1dpZHRoLCB0cmFja0hlaWdodCk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZXF1ZW5jZVRyYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHMgPSB0aGlzLnNlcXVlbmNlVHJhY2tzW2ldO1xuICAgICAgcy5kcmF3KGFwcCwgcGFkZGluZyArIGNoYW5uZWxXaWR0aCwgcGFkZGluZyArIG9mZnNldCArIGkgKiB0cmFja0hlaWdodCwgdHJhY2tXaWR0aCwgdHJhY2tIZWlnaHQpO1xuICAgIH1cblxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gJ3JnYigyNTUsIDI1NSwgMjU1KSc7XG4gICAgYXBwLmN0eC5mb250ID0gJzEwcHggc2Fucy1zZXJpZic7XG4gICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLm5hbWUsIHBhZGRpbmcgKyAzLCBwYWRkaW5nICsgb2Zmc2V0ICsgMTEpO1xuICAgIHZhciBzaG93QmFycyA9IDQ7XG4gICAgdmFyIHBvaW50c0luUmFuZ2UgPSBzaG93QmFycyAqIDQ7XG4gICAgdmFyIHNjYWxpbmcgPSB0cmFja1dpZHRoIC8gcG9pbnRzSW5SYW5nZTtcbiAgICB2YXIgYmFyV2lkdGggPSA0ICogc2NhbGluZztcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoNDAsIDQwLCA0MCknO1xuICAgIGFwcC5jdHguZm9udCA9ICcxMHB4IG1vbm8nO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2hvd0JhcnM7IGkrKykge1xuICAgICAgYXBwLmN0eC5maWxsVGV4dChpICogNCwgcGFkZGluZyArIGNoYW5uZWxXaWR0aCArIDMgKyBpICogYmFyV2lkdGgsIHBhZGRpbmcgKyBvZmZzZXQgKyBoZWlnaHQgLSAzKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KSB7XG4gICAgdmFyIHBhdGggPSBuZXcgUGF0aDJEKCk7XG4gICAgdmFyIHdpZHRoID0gYXBwLmNhbnZhcy53aWR0aCAtIHRoaXMucGFkZGluZyAqIDI7XG4gICAgcGF0aC5yZWN0KHRoaXMucGFkZGluZywgdGhpcy5wYWRkaW5nICsgdGhpcy5vZmZzZXQsIHdpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgaWYgKGFwcC5jdHguaXNQb2ludEluUGF0aChwYXRoLCB4LCB5KSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiZXhwb3J0IHsgQ2hhbm5lbCB9IGZyb20gJy4vY2hhbm5lbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBUaW1lbGluZUVkaXRvciB7XG4gIGNvbnN0cnVjdG9yKGNoYW5uZWxzKSB7XG4gICAgdGhpcy5jaGFubmVscyA9IGNoYW5uZWxzO1xuICB9XG4gIGhhbmRsZU1vdXNlRG93bihhcHAsIHgsIHkpIHtcbiAgICBmb3IgKHZhciBlIG9mIHRoaXMuY2hhbm5lbHMpIHtcbiAgICAgIHZhciB2ID0gZS5oYW5kbGVNb3VzZURvd24oYXBwLCB4LCB5KTtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHJldHVybiB2O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBkcmF3KGFwcCkge1xuICAgIGZvciAodmFyIGUgb2YgdGhpcy5jaGFubmVscykge1xuICAgICAgZS5kcmF3KGFwcCk7XG4gICAgfVxuICB9XG59XG4iLCJcbmV4cG9ydCBjbGFzcyBSYW5nZSB7XG4gIGNvbnN0cnVjdG9yKHN0YXJ0LCBzdG9wKSB7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuc3RvcCA9IHN0b3A7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlVHJhY2sge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNlcXVlbmNlX2RlZiA9IG51bGw7XG4gICAgdGhpcy5yYW5nZXMgPSBbbmV3IFJhbmdlKDAsIDQpLCBuZXcgUmFuZ2UoOSwgMTIpLCBuZXcgUmFuZ2UoMTQsIDI1KSwgbmV3IFJhbmdlKDMwLCAzNCldO1xuICB9XG4gIGRyYXcoYXBwLCB4LCB5LCB3LCBoKSB7XG4gICAgdmFyIHNob3dCYXJzID0gNDtcbiAgICB2YXIgcG9pbnRzSW5SYW5nZSA9IHNob3dCYXJzICogNDtcbiAgICB2YXIgc2NhbGluZyA9IHcgLyBwb2ludHNJblJhbmdlO1xuICAgIHZhciBiYXJXaWR0aCA9IDQgKiBzY2FsaW5nO1xuICAgIGZvciAodmFyIHIgb2YgdGhpcy5yYW5nZXMpIHtcbiAgICAgIHZhciBjb2xvck9mZnNldCA9IDEwO1xuICAgICAgdmFyIHdpZHRoID0gTWF0aC5taW4oKHIuc3RvcCAtIHIuc3RhcnQpICogc2NhbGluZywgdyAtIChyLnN0YXJ0ICogc2NhbGluZykpXG4gICAgICBhcHAuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMzUsIDc1LCAnICsgKDIwMCAtIGNvbG9yT2Zmc2V0KSArICcsIDAuMyknO1xuICAgICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoNSwgNSwgJyArICgyMDAgLSBjb2xvck9mZnNldCkgKyAnLCAwLjYpJztcbiAgICAgIGFwcC5jdHguZmlsbFJlY3QoeCArIHIuc3RhcnQgKiBzY2FsaW5nLCB5LCB3aWR0aCwgaCk7XG4gICAgICBhcHAuY3R4LnN0cm9rZVJlY3QoeCArIHIuc3RhcnQgKiBzY2FsaW5nLCB5LCB3aWR0aCwgaCk7XG4gICAgfVxuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSAncmdiKDcwLCA3MCwgNzAsIDAuOCknO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2hvd0JhcnM7IGkrKykge1xuICAgICAgYXBwLmN0eC5zdHJva2VSZWN0KHggKyBpICogYmFyV2lkdGgsIHksIGJhcldpZHRoLCBoKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=