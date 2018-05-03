import 'jest'
import { make, type, register } from '../../lib'

@type('Test')
class Test {
  any?: string

  getSomething() {
    return 'something'
  }

  getFromParent() {
    return 'gift'
  }
}

@type('TestCached')
class TestCached extends Test {
  getSomething() {
    return 'something cached'
  }

  getFromParent() {
    return 'thanks for your ' + super.getFromParent()
  }
}

@type('Singleton')
class Singleton extends Test {}

@type('TestInstanceWithData')
class TestInstanceWithData {
  any: string
  constructor(any?: string) {
    this.any = any || ''
  }

  createClassInstance(data?: Object): TestInstanceWithData {
    const instance = new TestInstanceWithData()
    if (data) {
      for (const name in data) {
        instance[name] = data[name]
      }
    }
    return instance
  }
}

describe('make()', function() {
  register(Test)

  it('throws an ReferenceError if the class definition was not register', function() {
    try {
      expect(make('NotFound'))
    } catch (error) {
      expect(error instanceof ReferenceError)
      expect(error.message).toEqual('NotFound is not found or not registered yet')
      return
    }
    expect('should throw a ReferenceError').toEqual('')
  })

  describe('<T>(classDefinition: ClassDefinition<T>)', function() {
    it('can make an instance of class definition which was register by Najs.register()', function() {
      expect(make(Test)).toBeInstanceOf(Test)
    })

    it('always returns new instance if class definitions was register by Najs.register()', function() {
      expect(make(Test) === make(Test)).toBe(false)
      expect(make<Test>(Test).getSomething()).toEqual('something')
      expect(make<Test>(Test).getFromParent()).toEqual('gift')
    })

    it('always returns same instance of class if it is singleton', function() {
      register(Singleton, 'Singleton', true, true)
      expect(make(Singleton) === make(Singleton)).toBe(true)
      expect(make(Singleton) === make(Singleton)).toBe(true)
      expect(make(Singleton) === make(Singleton)).toBe(true)
      expect(make(Singleton) === make(Singleton)).toBe(true)
    })

    it('always returns newest instance of class definitions was overridden', function() {
      register(TestCached, 'Test')
      expect(make(Test)).toBeInstanceOf(Test)
      expect(make(Test)).toBeInstanceOf(TestCached)
      expect(make<Test>(Test).getSomething()).toEqual('something cached')
      expect(make<TestCached>(Test).getFromParent()).toEqual('thanks for your gift')
    })
  })

  describe('<T>(className: string)', function() {
    it('works same way like passing a class definition', function() {
      expect(make('Test') === make('Test')).toBe(false)
      expect(make('Test')).toBeInstanceOf(Test)
      expect(make('Test')).toBeInstanceOf(TestCached)
      expect(make<Test>('Test').getSomething()).toEqual('something cached')
      expect(make<TestCached>('Test').getFromParent()).toEqual('thanks for your gift')
    })
  })

  describe('<T>(nameOrDefinition: ClassDefinition<T> | string, data: Object)', function() {
    it('does not create instance with data if createClassInstance() is not implemented', function() {
      expect(make<Test>(Test, { any: 'something' }).any).toBeUndefined()
    })

    it('calls createClassInstance() and pass data to create new instance', function() {
      register(TestInstanceWithData)
      expect(make<TestInstanceWithData>(TestInstanceWithData, { any: 'something' }).any).toEqual('something')
    })
  })

  describe('<T>(nameOrDefinition: ClassDefinition<T> | string, args: Array)', function() {
    it('calls constructor with no arguments if not passed', function() {
      expect(make<TestInstanceWithData>(TestInstanceWithData, []).any).toEqual('')
    })

    it('calls constructor with arguments in an array', function() {
      register(TestInstanceWithData)
      expect(make<TestInstanceWithData>(TestInstanceWithData, ['argument']).any).toEqual('argument')
    })
  })
})
