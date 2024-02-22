import Direction from "../../utils/Direction";
import { copy, equals, getAdjacent } from "../../utils/Point";

test.each`
p1 | p2 | expected
${{ x: 1, y: 2 }} | ${{ x: 1, y: 2 }} | ${true}
${{ x: 1, y: 2 }} | ${{ x: 2, y: 2 }} | ${false}
`('equals($p1, $p2) === $expected', ({ p1, p2, expected }) => {
    expect(equals(p1, p2)).toBe(expected);
});

test.each`
point | expected
${{ x: 1, y: 2 }} | ${{ x: 1, y: 2 }}
`('copy($point) === $expected', ({ point, expected }) => {
    const copied = copy(point);
    point.x = 3;
    point.y = 4;
    expect(copied).toEqual(expected);
});

test.each`
point | direction | expected
${{ x: 1, y: 2 }} | ${Direction.NORTH} | ${{ x: 1, y: 1 }}
${{ x: 1, y: 2 }} | ${Direction.EAST} | ${{ x: 2, y: 2 }}
${{ x: 1, y: 2 }} | ${Direction.SOUTH} | ${{ x: 1, y: 3 }}
${{ x: 1, y: 2 }} | ${Direction.WEST} | ${{ x: 0, y: 2 }}
`('getAdjacent($point, $direction) === $expected', ({ point, direction, expected }) => {
    expect(getAdjacent(point, direction)).toEqual(expected);
});
