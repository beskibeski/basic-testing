// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const sum = simpleCalculator({ 
      a: 10,
      b: 2,
      action: Action.Add,
    });
    expect(sum).toBe(12);
  });

  test('should subtract two numbers', () => {
    const substraction = simpleCalculator({
      a: 5,
      b: 3,
      action: Action.Subtract,
    });
    expect(substraction).toBe(2);
  });

  test('should multiply two numbers', () => {
    const multiplication = simpleCalculator({
      a: 10,
      b: 3,
      action: Action.Multiply,
    });
    expect(multiplication).toBe(30);
  });

  test('should divide two numbers', () => {
    const division = simpleCalculator({
      a: 30,
      b: 3,
      action: Action.Divide
    });
    expect(division).toBe(10);
  });

  test('should exponentiate two numbers', () => {
    const exponent = simpleCalculator({
      a: 5,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(exponent).toBe(125);
  });

  test('should return null for invalid action', () => {
    const invalidAction = simpleCalculator({ a: 3, b: 2, action: 1 });
    expect(invalidAction).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const invalidArgumentA = simpleCalculator({
      a: [],
      b: 10,
      action: Action.Multiply,
    });
    expect(invalidArgumentA).toBeNull();
    const invalidArgumentB = simpleCalculator({
      a: 2,
      b: undefined,
      action: Action.Multiply,
    });
    expect(invalidArgumentB).toBeNull();
  });
});
