import { ClassDefinition } from '../types'
import { register } from './register'
import { ClassRegistry } from './ClassRegistry'
import { ClassRegistryItem } from '../private/ClassRegistryItem'
import { getClassName } from './getClassName'
import { isFunction } from 'lodash'

export type Decorator = (target: any) => any
export type InstanceExtending = (instance: any) => any

export function extend(className: string): Decorator
export function extend<T>(classDefinition: ClassDefinition<T>): Decorator
export function extend(className: string, decorator: InstanceExtending): void
export function extend<T>(classDefinition: ClassDefinition<T>, decorator: InstanceExtending): void
export function extend<T>(abstract: ClassDefinition<T> | string, extendingFunction?: InstanceExtending): any {
  if (typeof extendingFunction === 'undefined') {
    return function(target: any): any {
      extend(<any>abstract, function(instance) {
        return Reflect.construct(target, [instance])
      })
    }
  }

  const className = getClassName(abstract)
  if (isFunction(abstract) && !ClassRegistry.has(className)) {
    register(abstract as ClassDefinition<T>, className)
  }
  const item: ClassRegistryItem = ClassRegistry.findOrFail(className)
  item.instanceExtending = extendingFunction
}
