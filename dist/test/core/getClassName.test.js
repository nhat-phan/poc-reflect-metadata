"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const _1 = require("../../lib/");
const getClassName_1 = require("../../lib/core/getClassName");
describe('.getClassName()', function () {
    it('returns classDefinition if it is a string and allowString = true', function () {
        expect(_1.getClassName('Test', true)).toEqual('Test');
    });
    describe('Deprecated', function () {
        it('can get className from the instance', function () {
            let ClassDefinition = class ClassDefinition {
            };
            ClassDefinition = __decorate([
                _1.type('ClassDefinition')
            ], ClassDefinition);
            expect(_1.getClassName(new ClassDefinition())).toEqual('ClassDefinition');
        });
        it('throw an TypeError if could not resolve Definition from instance', function () {
            try {
                _1.getClassName({});
            }
            catch (error) {
                expect(error).toBeInstanceOf(TypeError);
                expect(error.message).toEqual('Can not find the constructor of [object Object]');
                return;
            }
            expect('should not reach here').toEqual('hum');
        });
        describe('class which has no .getClassName() and static className', function () {
            it('returns Function.name process.env.OBFUSCABLE_CHECK is not set or falsy', function () {
                delete process.env.OBFUSCABLE_CHECK;
                const customLogger = {
                    warn() { }
                };
                _1.setLogger(customLogger);
                class Class {
                }
                expect(_1.getClassName(Class)).toEqual('Class');
            });
            const falsyValues = ['', '0', 'false', 'no'];
            for (const falsyValue of falsyValues) {
                it('returns Function.name process.env.OBFUSCABLE_CHECK is not set or falsy = ' + falsyValue, function () {
                    process.env.OBFUSCABLE_CHECK = falsyValue;
                    const customLogger = {
                        warn() { }
                    };
                    _1.setLogger(customLogger);
                    class Class {
                    }
                    expect(_1.getClassName(Class)).toEqual('Class');
                });
            }
            it('throws an TypeError if process.env.OBFUSCABLE_CHECK is set', function () {
                process.env.OBFUSCABLE_CHECK = true;
                try {
                    class Class {
                    }
                    expect(_1.getClassName(Class)).toEqual('Class');
                }
                catch (error) {
                    expect(error).toBeInstanceOf(TypeError);
                    expect(error.message.indexOf('Please use @type() annotation for class') === 0).toBe(true);
                    delete process.env.OBFUSCABLE_CHECK;
                    return;
                }
                expect('should not reach this line').toEqual('hmm');
            });
            it('displays the warning message if process.env.OBFUSCABLE_WARNING is not found', function () {
                delete process.env.OBFUSCABLE_WARNING;
                const customLogger = {
                    warn() { }
                };
                _1.setLogger(customLogger);
                const warnSpy = Sinon.spy(customLogger, 'warn');
                class Class {
                }
                expect(_1.getClassName(Class)).toEqual('Class');
                expect(warnSpy.called).toBe(true);
            });
            for (const falsyValue of falsyValues) {
                it('does not display the warning message if process.env.OBFUSCABLE_WARNING is falsy = ' + falsyValue, function () {
                    process.env.OBFUSCABLE_WARNING = falsyValue;
                    const customLogger = {
                        warn() { }
                    };
                    _1.setLogger(customLogger);
                    const warnSpy = Sinon.spy(customLogger, 'warn');
                    class Class {
                    }
                    expect(_1.getClassName(Class)).toEqual('Class');
                    expect(warnSpy.calledTwice).toBe(false);
                });
            }
        });
    });
});
describe('.setLogger()', function () {
    it('sets logger for displaying warning message', function () {
        const customLogger = {
            warn() { }
        };
        _1.setLogger(customLogger);
        expect(customLogger === getClassName_1.logger).toBe(true);
    });
});
