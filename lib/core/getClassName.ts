import { DESIGN_TYPE } from '../symbols'
import { isString, isFunction } from 'lodash'
declare const process: any
declare const console: any

export let logger: {
  warn(...log: string[]): void
} = console

export function getClassName(input: any, allowString: boolean = true): string {
  if (allowString && isString(input)) {
    return input
  }

  if (typeof input === 'object') {
    const prototype = Object.getPrototypeOf(input)
    if (prototype !== Object.prototype) {
      return getClassName(prototype.constructor)
    }
    throw new TypeError('Can not find the constructor of ' + input)
  }

  return findClassNameByDefinition(input)
}

function findClassNameByDefinition(classDefinition: Function) {
  const type = Reflect.getMetadata(DESIGN_TYPE, classDefinition)
  if (typeof type !== 'undefined') {
    return type
  }

  // Block will be remove in v2.x
  if (isFunction(classDefinition.prototype.getClassName)) {
    logger.warn(
      'Deprecated: .getClassName()',
      'is deprecated in najs-binding version 2.0.0, please use @type() instead for class',
      classDefinition.name
    )

    return classDefinition.prototype.getClassName.call(classDefinition)
  }

  if (isString(classDefinition['className'])) {
    logger.warn(
      'Deprecated: "static className"',
      'is deprecated in najs-binding version 2.0.0, please use @type() instead for class',
      classDefinition.name
    )

    return classDefinition['className']
  }

  if (isFalsy(process.env.OBFUSCABLE_CHECK)) {
    if (typeof process.env.OBFUSCABLE_WARNING === 'undefined' || !isFalsy(process.env.OBFUSCABLE_WARNING)) {
      logger.warn('Class', '"' + classDefinition.name + '"', 'may not be used if you uglify (obfuscate) your script.')
    }
    return classDefinition.name
  }
  // Block will be remove in v2.x

  throw new TypeError('Please define "className" or "getClassName" for ' + classDefinition)
}

function isFalsy(value: string | undefined) {
  if (typeof value === 'undefined') {
    return true
  }
  switch (value.toLowerCase().trim()) {
    case '':
    case '0':
    case 'false':
    case 'no':
      return true
  }
  return false
}

export function setLogger(log: { warn(...log: string[]): void }) {
  logger = log
}
