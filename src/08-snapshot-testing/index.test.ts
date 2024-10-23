// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const array = [1, 2, 3];
  const list = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: null,
          next: null,
        },
      },
    },
  };

  test('should generate linked list from values 1', () => {
    const listFromArray = generateLinkedList(array);
    expect(listFromArray).toStrictEqual(list);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const listFromArray = generateLinkedList(array);
    expect(listFromArray).toMatchSnapshot();
  });
});
