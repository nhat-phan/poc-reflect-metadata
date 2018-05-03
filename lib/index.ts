/// <reference path="contracts/Autoload.ts" />
/// <reference types="reflect-metadata" />
import 'reflect-metadata'

export { make } from './core/make'
export { bind, InstanceCreator } from './core/bind'
export { register } from './core/register'
export { singleton } from './core/singleton'
export { autoload } from './core/autoload'
export { extend, InstanceExtending } from './core/extend'
export { ClassRegistry } from './core/ClassRegistry'
export { IAutoload } from './core/IAutoload'
export { getClassName, setLogger } from './core/getClassName'
export { type } from './decorators/type'
export { Symbols } from './symbols'
