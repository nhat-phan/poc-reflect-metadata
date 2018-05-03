export function type(name: string): ClassDecorator {
  return Reflect.metadata('design:type', name)
}
