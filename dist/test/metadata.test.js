"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
require("reflect-metadata");
function className(name) {
    return Reflect.metadata('design:type', name);
}
let Test = class Test {
};
Test = __decorate([
    className('TestClass')
], Test);
let Children = class Children extends Test {
};
Children = __decorate([
    className('ChildrenClass')
], Children);
describe('Reflect.metadata', function () {
    it('should work', function () {
        console.log(Reflect.getMetadata('design:type', Test));
        console.log(Reflect.getMetadata('design:type', Children));
        console.log(Reflect.getMetadata('design:type', Object.getPrototypeOf(new Test()).constructor));
    });
});
