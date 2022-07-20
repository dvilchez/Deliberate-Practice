import { add } from '../src/calc';

describe('add', () => {
  it('sums numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});
