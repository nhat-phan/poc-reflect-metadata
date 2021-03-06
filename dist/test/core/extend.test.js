"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const ClassRegistry_1 = require("../../lib/core/ClassRegistry");
const register_1 = require("../../lib/core/register");
const make_1 = require("../../lib/core/make");
const _1 = require("../../lib/");
describe('extend()', function () {
    describe('@extend(className: string)', function () {
        it('should return decorator if 2nd param is missing', function () {
            expect(typeof _1.extend('Test1') === 'function').toBe(true);
        });
        it('calls decorated class constructor by instance of Class passed in arg1 when it is created', function () {
            let Test1 = class Test1 {
            };
            Test1 = __decorate([
                _1.type('Test1')
            ], Test1);
            register_1.register(Test1);
            let Test2 = class Test2 {
            };
            Test2 = __decorate([
                _1.type('Test2')
            ], Test2);
            register_1.register(Test2);
            let Test1Wrapper = class Test1Wrapper {
                constructor(instance) {
                    this.instance = instance;
                }
            };
            Test1Wrapper = __decorate([
                _1.extend('Test1'),
                _1.type('Test1Wrapper'),
                __metadata("design:paramtypes", [Test1])
            ], Test1Wrapper);
            let Test2Wrapper = class Test2Wrapper {
                constructor(instance) {
                    this.instance = instance;
                }
            };
            Test2Wrapper = __decorate([
                _1.extend(Test2),
                _1.type('Test2Wrapper'),
                __metadata("design:paramtypes", [Test2])
            ], Test2Wrapper);
            expect(ClassRegistry_1.ClassRegistry.has('Test1')).toBe(true);
            expect(ClassRegistry_1.ClassRegistry.has('Test1Wrapper')).toBe(false);
            expect(typeof ClassRegistry_1.ClassRegistry.findOrFail('Test1').instanceExtending === 'function').toBe(true);
            expect(make_1.make('Test1')).toBeInstanceOf(Test1Wrapper);
            expect(make_1.make('Test1')['instance']).toBeInstanceOf(Test1);
            expect(make_1.make(Test2)).toBeInstanceOf(Test2Wrapper);
            expect(make_1.make(Test2)['instance']).toBeInstanceOf(Test2);
        });
    });
    describe('@extend(className: string, decorator)', function () {
        it('assigns instanceExtending to ClassRegistryItem of className', function () {
            let Test3 = class Test3 {
            };
            Test3 = __decorate([
                _1.type('Test3')
            ], Test3);
            register_1.register(Test3);
            expect(ClassRegistry_1.ClassRegistry.findOrFail('Test3').instanceExtending).toBeUndefined();
            const extending = (instance) => {
                instance;
            };
            _1.extend(Test3, extending);
            expect(ClassRegistry_1.ClassRegistry.findOrFail('Test3').instanceExtending === extending).toBe(true);
        });
        it('can auto register if the extends the first parameter is classDefinition', function () {
            let Test4 = class Test4 {
            };
            Test4 = __decorate([
                _1.type('Test4')
            ], Test4);
            expect(ClassRegistry_1.ClassRegistry.has('Test4')).toBe(false);
            const extending = (instance) => {
                instance;
            };
            _1.extend(Test4, extending);
            expect(ClassRegistry_1.ClassRegistry.findOrFail('Test4').instanceExtending === extending).toBe(true);
        });
        it('should work', function () {
            let Test5 = class Test5 {
            };
            Test5 = __decorate([
                _1.type('Test5')
            ], Test5);
            let Test5Wrapper = class Test5Wrapper {
                constructor(instance) {
                    this.instance = instance;
                }
            };
            Test5Wrapper = __decorate([
                _1.type('Test5Wrapper'),
                __metadata("design:paramtypes", [Test5])
            ], Test5Wrapper);
            const extending = (instance) => {
                return new Test5Wrapper(instance);
            };
            _1.extend(Test5, extending);
            expect(make_1.make(Test5)).toBeInstanceOf(Test5Wrapper);
            expect(make_1.make(Test5)['instance']).toBeInstanceOf(Test5);
            expect(make_1.make(Test5)).toBeInstanceOf(Test5Wrapper);
            expect(make_1.make(Test5)['instance']).toBeInstanceOf(Test5);
        });
    });
});
