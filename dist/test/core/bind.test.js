"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const ClassRegistry_1 = require("../../lib/core/ClassRegistry");
const register_1 = require("../../lib/core/register");
const _1 = require("../../lib/");
describe('bind()', function () {
    describe('@bind(bindToClassName: string)', function () {
        it('should return decorator if 2nd param is missing, and bind Target to bindToClassName', function () {
            let Test1 = class Test1 {
            };
            Test1 = __decorate([
                _1.type('Test1')
            ], Test1);
            register_1.register(Test1);
            let Test1Cached = class Test1Cached {
            };
            Test1Cached.className = 'Test1Cached';
            Test1Cached = __decorate([
                _1.bind('Test1'),
                _1.type('Test1Cached')
            ], Test1Cached);
            expect(ClassRegistry_1.ClassRegistry.has('Test1')).toBe(true);
            expect(ClassRegistry_1.ClassRegistry.has(Test1Cached.className)).toBe(true);
            expect(ClassRegistry_1.ClassRegistry.findOrFail('Test1').concreteClassName).toEqual('Test1Cached');
        });
        it('does not register if class already registered', function () {
            let Test2 = class Test2 {
            };
            Test2 = __decorate([
                _1.type('Test2')
            ], Test2);
            register_1.register(Test2);
            let Test2Cached = class Test2Cached {
            };
            Test2Cached = __decorate([
                _1.bind('Test2'),
                register_1.register(),
                _1.type('Test2Cached')
            ], Test2Cached);
            expect(ClassRegistry_1.ClassRegistry.has('Test2')).toBe(true);
            expect(ClassRegistry_1.ClassRegistry.has(Test2Cached.name)).toBe(true);
            expect(ClassRegistry_1.ClassRegistry.findOrFail('Test2').concreteClassName).toEqual('Test2Cached');
        });
    });
    describe('bind(className: string, instanceCreator: () => any)', function () {
        it('sets to instanceCreator if there is no item in ClassRegistry', function () {
            const instanceCreator = function () {
                return 'any';
            };
            expect(ClassRegistry_1.ClassRegistry.has('NotRegisterYet')).toBe(false);
            _1.bind('NotRegisterYet', instanceCreator);
            expect(ClassRegistry_1.ClassRegistry.has('NotRegisterYet')).toBe(true);
            const item = ClassRegistry_1.ClassRegistry.findOrFail('NotRegisterYet');
            expect(item.className).toEqual('NotRegisterYet');
            expect(item.instanceCreator === instanceCreator).toBe(true);
        });
        it('sets to instanceCreator if there is an item in ClassRegistry', function () {
            let TestInstanceCreator = class TestInstanceCreator {
            };
            TestInstanceCreator = __decorate([
                _1.type('TestInstanceCreator')
            ], TestInstanceCreator);
            register_1.register(TestInstanceCreator);
            const instanceCreator = function () {
                return 'any';
            };
            _1.bind('TestInstanceCreator', instanceCreator);
            const item = ClassRegistry_1.ClassRegistry.findOrFail('TestInstanceCreator');
            expect(item.className).toEqual('TestInstanceCreator');
            expect(item.instanceCreator === instanceCreator).toBe(true);
        });
        it('could not set instanceCreator if the Class is not overridable', function () {
            let IsNotOverridable = class IsNotOverridable {
            };
            IsNotOverridable = __decorate([
                _1.type('IsNotOverridable')
            ], IsNotOverridable);
            register_1.register(IsNotOverridable, 'IsNotOverridable', false);
            try {
                _1.bind('IsNotOverridable', function () { });
            }
            catch (error) {
                expect(error.message).toEqual('Can not override IsNotOverridable');
                return;
            }
            expect('should not reach this line').toBe(true);
        });
    });
    describe('bind(className: string, concrete: string)', function () {
        it('sets to concreteClassName if there is no item in ClassRegistry', function () {
            _1.bind('NotRegisterYetConcrete', 'Test');
            expect(ClassRegistry_1.ClassRegistry.has('NotRegisterYetConcrete')).toBe(true);
            const item = ClassRegistry_1.ClassRegistry.findOrFail('NotRegisterYetConcrete');
            expect(item.className).toEqual('NotRegisterYetConcrete');
            expect(item.concreteClassName).toEqual('Test');
        });
        it('sets to instanceCreator if there is an item in ClassRegistry', function () {
            let TestInstanceCreatorConcrete = class TestInstanceCreatorConcrete {
            };
            TestInstanceCreatorConcrete = __decorate([
                _1.type('TestInstanceCreatorConcrete')
            ], TestInstanceCreatorConcrete);
            register_1.register(TestInstanceCreatorConcrete);
            _1.bind('TestInstanceCreatorConcrete', 'Test');
            const item = ClassRegistry_1.ClassRegistry.findOrFail('TestInstanceCreatorConcrete');
            expect(item.className).toEqual('TestInstanceCreatorConcrete');
            expect(item.concreteClassName).toEqual('Test');
        });
        it('detects circular reference and throw error', function () {
            let CircularReferenceA = class CircularReferenceA {
            };
            CircularReferenceA = __decorate([
                _1.type('CircularReferenceA')
            ], CircularReferenceA);
            register_1.register(CircularReferenceA);
            let CircularReferenceB = class CircularReferenceB {
            };
            CircularReferenceB = __decorate([
                _1.type('CircularReferenceB')
            ], CircularReferenceB);
            register_1.register(CircularReferenceB);
            _1.bind('CircularReferenceA', 'CircularReferenceB');
            try {
                _1.bind('CircularReferenceB', 'CircularReferenceA');
            }
            catch (error) {
                expect(error.message).toEqual('Circular reference detected "CircularReferenceA => CircularReferenceB => CircularReferenceA"');
                return;
            }
            expect('should not reach this line').toBe(true);
        });
    });
});
