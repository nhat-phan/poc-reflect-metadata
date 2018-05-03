"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
require("reflect-metadata");
// function type(name: string) {
//   return Reflect.metadata('design:type', name)
// }
// function getClassName(this: Object) {
//   console.log('get class name in Object.prototype')
//   return Reflect.getMetadata('design:type', Object.getPrototypeOf(this).constructor)
// }
// Object.prototype['getClassName'] = getClassName
// interface Test extends Najs.Contracts.Autoload {}
// @type('TestClass')
// class Test {}
// @type('ChildrenClass')
// class Children extends Test {}
// class NotDefined {
//   getClassName() {}
// }
// declare const console: any
describe('Reflect.metadata', function () {
    it('should work', function () {
        // console.log(new Test().getClassName())
        // console.log(new Children().getClassName())
        // console.log(new NotDefined().getClassName())
        // console.log(Object.getPrototypeOf(new Test()).getClassName === getClassName)
        // console.log(Object.getPrototypeOf(new Children()).getClassName === getClassName)
        // console.log(Object.getPrototypeOf(new NotDefined()).getClassName === getClassName)
    });
});
