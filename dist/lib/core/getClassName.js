"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("../symbols");
const lodash_1 = require("lodash");
exports.logger = console;
function getClassName(input, allowString = true) {
    if (allowString && lodash_1.isString(input)) {
        return input;
    }
    if (typeof input === 'object') {
        const prototype = Object.getPrototypeOf(input);
        if (prototype !== Object.prototype) {
            return getClassName(prototype.constructor);
        }
        throw new TypeError('Can not find the constructor of ' + input);
    }
    return findClassNameByDefinition(input);
}
exports.getClassName = getClassName;
function findClassNameByDefinition(classDefinition) {
    const type = Reflect.getMetadata(symbols_1.DESIGN_TYPE, classDefinition);
    if (typeof type !== 'undefined') {
        return type;
    }
    // Block will be remove in v2.x
    if (lodash_1.isFunction(classDefinition.prototype.getClassName)) {
        exports.logger.warn('Deprecated: .getClassName()', 'is deprecated in najs-binding version 2.0.0, please use @type() instead for class', classDefinition.name);
        return classDefinition.prototype.getClassName.call(classDefinition);
    }
    if (lodash_1.isString(classDefinition['className'])) {
        exports.logger.warn('Deprecated: "static className"', 'is deprecated in najs-binding version 2.0.0, please use @type() instead for class', classDefinition.name);
        return classDefinition['className'];
    }
    if (isFalsy(process.env.OBFUSCABLE_CHECK)) {
        if (typeof process.env.OBFUSCABLE_WARNING === 'undefined' || !isFalsy(process.env.OBFUSCABLE_WARNING)) {
            exports.logger.warn('Class', '"' + classDefinition.name + '"', 'may not be used if you uglify (obfuscate) your script.');
        }
        return classDefinition.name;
    }
    // Block will be remove in v2.x
    throw new TypeError('Please define "className" or "getClassName" for ' + classDefinition);
}
function isFalsy(value) {
    if (typeof value === 'undefined') {
        return true;
    }
    switch (value.toLowerCase().trim()) {
        case '':
        case '0':
        case 'false':
        case 'no':
            return true;
    }
    return false;
}
function setLogger(log) {
    exports.logger = log;
}
exports.setLogger = setLogger;
