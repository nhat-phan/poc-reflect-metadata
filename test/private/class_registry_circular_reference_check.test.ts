import 'jest'
import { class_registry_circular_reference_check } from '../../lib/private/class_registry_circular_reference_check'

const dataset = {
  'returns false if there is circular setup is empty': {
    input: {},
    expected: false
  },
  'returns false if there is no circular setup': {
    input: { A: undefined, B: undefined },
    expected: false
  },
  'not circular case #1': {
    input: { A: 'B', B: undefined },
    expected: false
  },
  'not circular case #2': {
    input: { A: 'B', B: 'C', C: undefined },
    expected: false
  },
  'not circular case #3': {
    input: { A: 'C', B: 'C', C: 'D', D: 'E' },
    expected: false
  },
  'circular reference error case #1 refers itself': {
    input: { A: 'A' },
    expected: ['A', 'A']
  },
  'circular reference error case #2': {
    input: { A: 'B', B: 'A' },
    expected: ['A', 'B', 'A']
  },
  'circular reference error case #3': {
    input: { A: 'B', B: 'C', C: 'A' },
    expected: ['A', 'B', 'C', 'A']
  },
  'circular reference error case #4': {
    input: { A: 'B', B: 'C', C: 'C' },
    expected: ['A', 'B', 'C', 'C']
  },
  'circular reference error case #6': {
    input: { A: 'B', B: 'C', C: 'D', D: 'B' },
    expected: ['A', 'B', 'C', 'D', 'B']
  },
  'circular reference error case #7': {
    input: { A: 'B', B: 'C', C: 'A', D: 'E' },
    expected: ['A', 'B', 'C', 'A']
  },
  'circular reference error case #8': {
    input: { M: 'N', N: 'O', O: 'M', A: 'B', B: 'A' },
    expected: ['M', 'N', 'O', 'M']
  }
}

describe('class_registry_circular_reference_check()', function() {
  for (const name in dataset) {
    it(name, function() {
      expect(class_registry_circular_reference_check(dataset[name].input)).toEqual(dataset[name].expected)
    })
  }
})
