import 'jest'
import { type, ClassRegistry, register } from '../../lib'

@type('TestAutoload')
class TestAutoload {}

@type('TestClassName')
class TestClassName {}

class Invalid {}

declare const process: any

describe('register()', function() {
  it('throws an TypeError if the class is not has @type() annotation and if OBFUSCABLE_CHECK is on', function() {
    process.env.OBFUSCABLE_CHECK = true
    try {
      expect(register(Invalid))
    } catch (error) {
      expect(error instanceof TypeError)
      expect(error.message).toEqual('Please define "className" or "getClassName" for ' + Invalid)
      return
    }
    expect('should throw a TypeError').toEqual('')
  })

  describe('<T>(classDefinition: ClassDefinition<T>)', function() {
    it('can registry a class definition which has @type definition', function() {
      register<TestAutoload>(TestAutoload)
      expect(ClassRegistry.findOrFail('TestAutoload')).toEqual({
        className: 'TestAutoload',
        instanceConstructor: TestAutoload,
        overridable: true,
        singleton: false
      })
    })
  })

  describe('<T>(classDefinition: ClassDefinition<T>, className: string)', function() {
    it('can register an class definition with custom name', function() {
      register<TestAutoload>(TestAutoload, 'Najs.TestAutoload')
      expect(ClassRegistry.findOrFail('Najs.TestAutoload')).toEqual({
        className: 'Najs.TestAutoload',
        instanceConstructor: TestAutoload,
        overridable: true,
        singleton: false
      })
    })

    it('we often use this param for overriding the class definition', function() {
      register<TestClassName>(TestClassName, 'Najs.TestAutoload')
      expect(ClassRegistry.findOrFail('Najs.TestAutoload')).toEqual({
        className: 'Najs.TestAutoload',
        instanceConstructor: TestClassName,
        overridable: true,
        singleton: false
      })
    })
  })

  describe('<T>(classDefinition: ClassDefinition<T>, className: string, overridable: boolean)', function() {
    it('can lock the definition, no one can override it', function() {
      register<TestAutoload>(TestAutoload, 'Not-Overridable', false)
      expect(ClassRegistry.findOrFail('Not-Overridable')).toEqual({
        className: 'Not-Overridable',
        instanceConstructor: TestAutoload,
        overridable: false,
        singleton: false
      })
    })

    it('we often use this param for overriding the class definition', function() {
      try {
        register<TestClassName>(TestClassName, 'Not-Overridable')
      } catch (error) {
        expect(error instanceof Error)
        expect(error.message).toEqual('Can not override Not-Overridable')
        return
      }
      expect('should throw an Error').toEqual('')
    })
  })

  describe('<T>(classDefinition: ClassDefinition<T>, className: string, overridable: boolean, singleton: boolean)', function() {
    it('has default value is false', function() {
      register<TestAutoload>(TestAutoload, 'Singleton', true)
      expect(ClassRegistry.findOrFail('Singleton')).toEqual({
        className: 'Singleton',
        instanceConstructor: TestAutoload,
        overridable: true,
        singleton: false
      })
    })

    it('can define a class is singleton', function() {
      register<TestAutoload>(TestAutoload, 'Singleton', false, true)
      expect(ClassRegistry.findOrFail('Singleton')).toEqual({
        className: 'Singleton',
        instanceConstructor: TestAutoload,
        overridable: false,
        singleton: true
      })
    })
  })

  describe('@register(name?: string)', function() {
    it('can be used as a decorator', function() {
      @register()
      @type('A')
      class A {}

      expect(new A()).toBeInstanceOf(A)
      expect(ClassRegistry.findOrFail('A')).toEqual({
        className: 'A',
        instanceConstructor: A,
        overridable: true,
        singleton: false
      })
    })

    it('can be used as a decorator with custom name', function() {
      @register('Cindy')
      class C {}

      expect(new C()).toBeInstanceOf(C)
      expect(ClassRegistry.findOrFail('Cindy')).toEqual({
        className: 'Cindy',
        instanceConstructor: C,
        overridable: true,
        singleton: false
      })
    })
  })
})
