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
const lib_1 = require("../../lib");
let Test = class Test {
    getSomething() {
        return 'something';
    }
    getFromParent() {
        return 'gift';
    }
};
Test = __decorate([
    lib_1.type('Test')
], Test);
let TestCached = class TestCached extends Test {
    getSomething() {
        return 'something cached';
    }
    getFromParent() {
        return 'thanks for your ' + super.getFromParent();
    }
};
TestCached = __decorate([
    lib_1.type('TestCached')
], TestCached);
let Singleton = class Singleton extends Test {
};
Singleton = __decorate([
    lib_1.type('Singleton')
], Singleton);
let TestInstanceWithData = TestInstanceWithData_1 = class TestInstanceWithData {
    constructor(any) {
        this.any = any || '';
    }
    createClassInstance(data) {
        const instance = new TestInstanceWithData_1();
        if (data) {
            for (const name in data) {
                instance[name] = data[name];
            }
        }
        return instance;
    }
};
TestInstanceWithData = TestInstanceWithData_1 = __decorate([
    lib_1.type('TestInstanceWithData'),
    __metadata("design:paramtypes", [String])
], TestInstanceWithData);
describe('make()', function () {
    lib_1.register(Test);
    it('throws an ReferenceError if the class definition was not register', function () {
        try {
            expect(lib_1.make('NotFound'));
        }
        catch (error) {
            expect(error instanceof ReferenceError);
            expect(error.message).toEqual('NotFound is not found or not registered yet');
            return;
        }
        expect('should throw a ReferenceError').toEqual('');
    });
    describe('<T>(classDefinition: ClassDefinition<T>)', function () {
        it('can make an instance of class definition which was register by Najs.register()', function () {
            expect(lib_1.make(Test)).toBeInstanceOf(Test);
        });
        it('always returns new instance if class definitions was register by Najs.register()', function () {
            expect(lib_1.make(Test) === lib_1.make(Test)).toBe(false);
            expect(lib_1.make(Test).getSomething()).toEqual('something');
            expect(lib_1.make(Test).getFromParent()).toEqual('gift');
        });
        it('always returns same instance of class if it is singleton', function () {
            lib_1.register(Singleton, 'Singleton', true, true);
            expect(lib_1.make(Singleton) === lib_1.make(Singleton)).toBe(true);
            expect(lib_1.make(Singleton) === lib_1.make(Singleton)).toBe(true);
            expect(lib_1.make(Singleton) === lib_1.make(Singleton)).toBe(true);
            expect(lib_1.make(Singleton) === lib_1.make(Singleton)).toBe(true);
        });
        it('always returns newest instance of class definitions was overridden', function () {
            lib_1.register(TestCached, 'Test');
            expect(lib_1.make(Test)).toBeInstanceOf(Test);
            expect(lib_1.make(Test)).toBeInstanceOf(TestCached);
            expect(lib_1.make(Test).getSomething()).toEqual('something cached');
            expect(lib_1.make(Test).getFromParent()).toEqual('thanks for your gift');
        });
    });
    describe('<T>(className: string)', function () {
        it('works same way like passing a class definition', function () {
            expect(lib_1.make('Test') === lib_1.make('Test')).toBe(false);
            expect(lib_1.make('Test')).toBeInstanceOf(Test);
            expect(lib_1.make('Test')).toBeInstanceOf(TestCached);
            expect(lib_1.make('Test').getSomething()).toEqual('something cached');
            expect(lib_1.make('Test').getFromParent()).toEqual('thanks for your gift');
        });
    });
    describe('<T>(nameOrDefinition: ClassDefinition<T> | string, data: Object)', function () {
        it('does not create instance with data if createClassInstance() is not implemented', function () {
            expect(lib_1.make(Test, { any: 'something' }).any).toBeUndefined();
        });
        it('calls createClassInstance() and pass data to create new instance', function () {
            lib_1.register(TestInstanceWithData);
            expect(lib_1.make(TestInstanceWithData, { any: 'something' }).any).toEqual('something');
        });
    });
    describe('<T>(nameOrDefinition: ClassDefinition<T> | string, args: Array)', function () {
        it('calls constructor with no arguments if not passed', function () {
            expect(lib_1.make(TestInstanceWithData, []).any).toEqual('');
        });
        it('calls constructor with arguments in an array', function () {
            lib_1.register(TestInstanceWithData);
            expect(lib_1.make(TestInstanceWithData, ['argument']).any).toEqual('argument');
        });
    });
});
var TestInstanceWithData_1;
