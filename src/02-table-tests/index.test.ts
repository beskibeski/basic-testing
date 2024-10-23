// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 10, b: 2, action: Action.Add, expected: 12 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 10, b: 3, action: Action.Multiply, expected: 30 },
  { a: 30, b: 3, action: Action.Divide, expected: 10 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 3, b: 2, action: 1, expected: null },
  { a: [], b: 10, action: Action.Multiply, expected: null },
  { a: 2, b: undefined, action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'a, b, action as arguments',
    ({ a, b, action, expected }) => {
      const tested = simpleCalculator({ a, b, action });
      expect(tested).toBe(expected);
    },
  );
});
