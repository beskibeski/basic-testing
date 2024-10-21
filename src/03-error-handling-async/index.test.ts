// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const providedValue = 'provided value';
    const value = await resolveValue(providedValue);
    expect(value).toBe(providedValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const providedErrorMessage = 'Error Message';
    const error = () => throwError(providedErrorMessage);
    expect(error).toThrowError(providedErrorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    const error = () => throwError();
    expect(error).toThrowError(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const error = () => throwCustomError();
    expect(error).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const error = () => rejectCustomError();
    expect(error).rejects.toThrowError(MyAwesomeError);
  });
});
