import 'jest'
import 'reflect-metadata'

function className(name: string) {
  return Reflect.metadata('design:type', name)
}

@className('TestClass')
class Test {}

@className('ChildrenClass')
class Children extends Test {}

declare const console: any

describe('Reflect.metadata', function() {
  it('should work', function() {
    console.log(Reflect.getMetadata('design:type', Test))
    console.log(Reflect.getMetadata('design:type', Children))
    console.log(Reflect.getMetadata('design:type', Object.getPrototypeOf(new Test()).constructor))
  })
})
