"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("../symbols");
function type(name) {
    return Reflect.metadata(symbols_1.DESIGN_TYPE, name);
}
exports.type = type;
