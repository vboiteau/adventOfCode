import Direction, { ccw, cw } from '../../utils/Direction';
test('equals', () => {
  expect(Direction.NORTH).toBe(Direction.NORTH);
});
test.each`
  direction          | expected
  ${Direction.NORTH} | ${Direction.EAST}
  ${Direction.EAST}  | ${Direction.SOUTH}
  ${Direction.SOUTH} | ${Direction.WEST}
  ${Direction.WEST}  | ${Direction.NORTH}
`('cw($direction) === $expected', ({ direction, expected }) => {
  expect(cw(direction)).toBe(expected);
});
test.each`
  direction          | expected
  ${Direction.NORTH} | ${Direction.WEST}
  ${Direction.WEST}  | ${Direction.SOUTH}
  ${Direction.SOUTH} | ${Direction.EAST}
  ${Direction.EAST}  | ${Direction.NORTH}
`('ccw($direction) === $expected', ({ direction, expected }) => {
  expect(ccw(direction)).toBe(expected);
});
