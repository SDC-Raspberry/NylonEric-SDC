const sum = require('../scripts/sum');

test('add 99 and 1', () => {
  expect(sum(99, 1)).toBe(100);
});