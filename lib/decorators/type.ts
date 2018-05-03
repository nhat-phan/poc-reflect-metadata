import { DESIGN_TYPE } from '../symbols'

export function type(name: string): ClassDecorator {
  return Reflect.metadata(DESIGN_TYPE, name)
}
