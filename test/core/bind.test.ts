import 'jest'
import { ClassRegistry } from '../../lib/core/ClassRegistry'
import { register } from '../../lib/core/register'
import { type, bind } from '../../lib/'

describe('bind()', function() {
  describe('@bind(bindToClassName: string)', function() {
    it('should return decorator if 2nd param is missing, and bind Target to bindToClassName', function() {
      @type('Test1')
      class Test1 {}
      register(Test1)

      @bind('Test1')
      @type('Test1Cached')
      class Test1Cached {
        static className = 'Test1Cached'
      }

      expect(ClassRegistry.has('Test1')).toBe(true)
      expect(ClassRegistry.has(Test1Cached.className)).toBe(true)
      expect(ClassRegistry.findOrFail('Test1').concreteClassName).toEqual('Test1Cached')
    })

    it('does not register if class already registered', function() {
      @type('Test2')
      class Test2 {}
      register(Test2)

      @bind('Test2')
      @register()
      @type('Test2Cached')
      class Test2Cached {}

      expect(ClassRegistry.has('Test2')).toBe(true)
      expect(ClassRegistry.has(Test2Cached.name)).toBe(true)
      expect(ClassRegistry.findOrFail('Test2').concreteClassName).toEqual('Test2Cached')
    })
  })

  describe('bind(className: string, instanceCreator: () => any)', function() {
    it('sets to instanceCreator if there is no item in ClassRegistry', function() {
      const instanceCreator = function() {
        return 'any'
      }

      expect(ClassRegistry.has('NotRegisterYet')).toBe(false)
      bind('NotRegisterYet', instanceCreator)
      expect(ClassRegistry.has('NotRegisterYet')).toBe(true)
      const item = ClassRegistry.findOrFail('NotRegisterYet')
      expect(item.className).toEqual('NotRegisterYet')
      expect(item.instanceCreator === instanceCreator).toBe(true)
    })

    it('sets to instanceCreator if there is an item in ClassRegistry', function() {
      @type('TestInstanceCreator')
      class TestInstanceCreator {}
      register(TestInstanceCreator)

      const instanceCreator = function() {
        return 'any'
      }

      bind('TestInstanceCreator', instanceCreator)
      const item = ClassRegistry.findOrFail('TestInstanceCreator')
      expect(item.className).toEqual('TestInstanceCreator')
      expect(item.instanceCreator === instanceCreator).toBe(true)
    })

    it('could not set instanceCreator if the Class is not overridable', function() {
      @type('IsNotOverridable')
      class IsNotOverridable {}
      register(IsNotOverridable, 'IsNotOverridable', false)
      try {
        bind('IsNotOverridable', function() {})
      } catch (error) {
        expect(error.message).toEqual('Can not override IsNotOverridable')
        return
      }
      expect('should not reach this line').toBe(true)
    })
  })

  describe('bind(className: string, concrete: string)', function() {
    it('sets to concreteClassName if there is no item in ClassRegistry', function() {
      bind('NotRegisterYetConcrete', 'Test')
      expect(ClassRegistry.has('NotRegisterYetConcrete')).toBe(true)
      const item = ClassRegistry.findOrFail('NotRegisterYetConcrete')
      expect(item.className).toEqual('NotRegisterYetConcrete')
      expect(item.concreteClassName).toEqual('Test')
    })

    it('sets to instanceCreator if there is an item in ClassRegistry', function() {
      @type('TestInstanceCreatorConcrete')
      class TestInstanceCreatorConcrete {}
      register(TestInstanceCreatorConcrete)

      bind('TestInstanceCreatorConcrete', 'Test')
      const item = ClassRegistry.findOrFail('TestInstanceCreatorConcrete')
      expect(item.className).toEqual('TestInstanceCreatorConcrete')
      expect(item.concreteClassName).toEqual('Test')
    })

    it('detects circular reference and throw error', function() {
      @type('CircularReferenceA')
      class CircularReferenceA {}
      register(CircularReferenceA)

      @type('CircularReferenceB')
      class CircularReferenceB {}
      register(CircularReferenceB)
      bind('CircularReferenceA', 'CircularReferenceB')
      try {
        bind('CircularReferenceB', 'CircularReferenceA')
      } catch (error) {
        expect(error.message).toEqual(
          'Circular reference detected "CircularReferenceA => CircularReferenceB => CircularReferenceA"'
        )
        return
      }
      expect('should not reach this line').toBe(true)
    })
  })
})
