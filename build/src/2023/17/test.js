import { getFileLines } from '../../fileReader';
import { join } from 'path';
import {
  copy,
  equals,
  forward,
  getCityLeastLavalLost,
  getToVisitPart1,
  getToVisitPart2,
  isEndPart1,
  isEndPart2,
  left,
  right,
  toKey,
} from './solution';
import Direction from '../../utils/Direction';
test.each`
  file              | getToVisit         | isEnd         | expected
  ${'example.txt'}  | ${getToVisitPart1} | ${isEndPart1} | ${102}
  ${'example.txt'}  | ${getToVisitPart2} | ${isEndPart2} | ${94}
  ${'example2.txt'} | ${getToVisitPart2} | ${isEndPart2} | ${71}
`(
  'Given a cityMap in $file when getCityLeastLavaLost then it should return $expected lava lost',
  async ({ file, getToVisit, isEnd, expected }) => {
    const cityMap = await getFileLines(join(__dirname, file));
    expect(getCityLeastLavalLost(cityMap, getToVisit, isEnd)).toEqual(expected);
  },
);
test.each`
  node                                                                                   | expected
  ${{ vector: { point: { x: 1, y: 1 }, direction: Direction.NORTH }, forward_count: 1 }} | ${{ vector: { point: { x: 1, y: 1 }, direction: Direction.NORTH }, forward_count: 1 }}
`('copy($node) === $expected', ({ node, expected }) => {
  const copied = copy(node);
  node.forward_count = 0;
  expect(copied).toEqual(expected);
  expect(node).not.toEqual(expected);
});
test.each`
  n1                                                                                     | n2                                                                                     | expected
  ${{ vector: { point: { x: 1, y: 1 }, direction: Direction.NORTH }, forward_count: 1 }} | ${{ vector: { point: { x: 1, y: 1 }, direction: Direction.NORTH }, forward_count: 1 }} | ${true}
  ${{ vector: { point: { x: 1, y: 1 }, direction: Direction.NORTH }, forward_count: 1 }} | ${{ vector: { point: { x: 1, y: 1 }, direction: Direction.NORTH }, forward_count: 0 }} | ${false}
`('equals($n1, $n2) === $expected', ({ n1, n2, expected }) => {
  expect(equals(n1, n2)).toEqual(expected);
});
test.each`
  node                                                                                   | expected
  ${{ vector: { point: { x: 1, y: 1 }, direction: Direction.NORTH }, forward_count: 1 }} | ${{ vector: { point: { x: 1, y: 0 }, direction: Direction.NORTH }, forward_count: 2 }}
`('forward($node) === $expected', ({ node, expected }) => {
  expect(forward(node)).toEqual(expected);
});
test.each`
  node                                                                                   | expected
  ${{ vector: { point: { x: 1, y: 1 }, direction: Direction.NORTH }, forward_count: 1 }} | ${{ vector: { point: { x: 0, y: 1 }, direction: Direction.WEST }, forward_count: 1 }}
`('left($node) === $expected', ({ node, expected }) => {
  expect(left(node)).toEqual(expected);
});
test.each`
  node                                                                                   | expected
  ${{ vector: { point: { x: 1, y: 1 }, direction: Direction.NORTH }, forward_count: 1 }} | ${{ vector: { point: { x: 2, y: 1 }, direction: Direction.EAST }, forward_count: 1 }}
`('right($node) === $expected', ({ node, expected }) => {
  expect(right(node)).toEqual(expected);
});
test.each`
  node                                                                                  | expected
  ${{ vector: { point: { x: 1, y: 2 }, direction: Direction.WEST }, forward_count: 0 }} | ${'1_2_3_0'}
`('toKey($node) === $expected', ({ node, expected }) => {
  expect(toKey(node)).toEqual(expected);
});
test.each`
  node                                                                                   | grid                                 | expected
  ${{ vector: { point: { x: 2, y: 2 }, direction: Direction.NORTH }, forward_count: 3 }} | ${[[1, 2, 3], [4, 5, 6], [7, 8, 9]]} | ${[{ vector: { point: { x: 1, y: 2 }, direction: Direction.WEST }, forward_count: 1 }]}
`('getToVisit($node, $grid) === $expected', ({ node, grid, expected }) => {
  expect(getToVisitPart1(node, grid)).toEqual(expected);
});
