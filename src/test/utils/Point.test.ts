import Direction from '../../utils/Direction';
import { add, copy, equals, jump } from '../../utils/Point';

test('equals', () => {
  expect(equals({ x: 1, y: 2 }, { x: 1, y: 2 })).toBe(true);
});

test('not equals', () => {
  expect(equals({ x: 2, y: 2 }, { x: 1, y: 2 })).toBe(false);
});

test.each`
  point             | expected
  ${{ x: 1, y: 2 }} | ${{ x: 1, y: 2 }}
`('copy($point) === $expected', ({ point, expected }) => {
  const copied = copy(point);
  point.x = 3;
  point.y = 4;
  expect(copied).toEqual(expected);
});

test.each`
  point             | direction          | expected
  ${{ x: 1, y: 2 }} | ${Direction.NORTH} | ${{ x: 1, y: 1 }}
  ${{ x: 1, y: 2 }} | ${Direction.EAST}  | ${{ x: 2, y: 2 }}
  ${{ x: 1, y: 2 }} | ${Direction.SOUTH} | ${{ x: 1, y: 3 }}
  ${{ x: 1, y: 2 }} | ${Direction.WEST}  | ${{ x: 0, y: 2 }}
`('getAdjacent($point, $direction) === $expected', ({ point, direction, expected }) => {
  expect(jump(point, direction)).toEqual(expected);
});

test.each`
  point             | direction          | jumpSize | expected
  ${{ x: 1, y: 2 }} | ${Direction.NORTH} | ${2}     | ${{ x: 1, y: 0 }}
`('getAdjacent($point, $direction) === $expected', ({ point, direction, jumpSize, expected }) => {
  expect(jump(point, direction, jumpSize)).toEqual(expected);
});

test.each`
  p1                | p2                | expected
  ${{ x: 1, y: 2 }} | ${{ x: 1, y: 2 }} | ${{ x: 2, y: 4 }}
`('add($p1, $p2) === $expected', ({ p1, p2, expected }) => {
  expect(add(p1, p2)).toEqual(expected);
});
