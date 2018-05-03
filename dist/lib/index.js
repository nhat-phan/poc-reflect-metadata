"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="contracts/Autoload.ts" />
/// <reference types="reflect-metadata" />
require("reflect-metadata");
var make_1 = require("./core/make");
exports.make = make_1.make;
var bind_1 = require("./core/bind");
exports.bind = bind_1.bind;
var register_1 = require("./core/register");
exports.register = register_1.register;
var singleton_1 = require("./core/singleton");
exports.singleton = singleton_1.singleton;
var autoload_1 = require("./core/autoload");
exports.autoload = autoload_1.autoload;
var extend_1 = require("./core/extend");
exports.extend = extend_1.extend;
var ClassRegistry_1 = require("./core/ClassRegistry");
exports.ClassRegistry = ClassRegistry_1.ClassRegistry;
var getClassName_1 = require("./core/getClassName");
exports.getClassName = getClassName_1.getClassName;
exports.setLogger = getClassName_1.setLogger;
var type_1 = require("./decorators/type");
exports.type = type_1.type;
var symbols_1 = require("./symbols");
exports.Symbols = symbols_1.Symbols;
