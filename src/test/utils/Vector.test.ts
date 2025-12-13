import Direction from '../../utils/Direction';
import { equals, copy, cw, ccw, step } from '../../utils/Vector';

test.each`
  v1                                                       | v2                                                       | expected
  ${{ point: { x: 1, y: 2 }, direction: Direction.NORTH }} | ${{ point: { x: 1, y: 2 }, direction: Direction.NORTH }} | ${true}
  ${{ point: { x: 1, y: 2 }, direction: Direction.NORTH }} | ${{ point: { x: 2, y: 2 }, direction: Direction.NORTH }} | ${false}
  ${{ point: { x: 1, y: 2 }, direction: Direction.NORTH }} | ${{ point: { x: 1, y: 2 }, direction: Direction.SOUTH }} | ${false}
`('equals($v1, $v2) === $expected', ({ v1, v2, expected }) => {
  expect(equals(v1, v2)).toBe(expected);
});

test('copy(vector) === vector', () => {
  const vector = { point: { x: 1, y: 2 }, direction: Direction.NORTH };
  const copied = copy(vector);
  vector.direction = Direction.SOUTH;
  expect(copied).toEqual({ point: { x: 1, y: 2 }, direction: Direction.NORTH });
});

test.each`
  vector                                                   | expected
  ${{ point: { x: 1, y: 2 }, direction: Direction.NORTH }} | ${{ point: { x: 1, y: 2 }, direction: Direction.EAST }}
`('cw($vector) === $expected', ({ vector, expected }) => {
  expect(cw(vector)).toEqual(expected);
});

test.each`
  vector                                                   | expected
  ${{ point: { x: 1, y: 2 }, direction: Direction.NORTH }} | ${{ point: { x: 1, y: 2 }, direction: Direction.WEST }}
`('ccw($vector) === $expected', ({ vector, expected }) => {
  expect(ccw(vector)).toEqual(expected);
});

test.each`
  vector                                                   | expected
  ${{ point: { x: 1, y: 2 }, direction: Direction.NORTH }} | ${{ point: { x: 1, y: 1 }, direction: Direction.NORTH }}
`('step($vector) === $expected', ({ vector, expected }) => {
  expect(step(vector)).toEqual(expected);
});
