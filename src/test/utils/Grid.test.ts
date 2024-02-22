import { createAndFill, getBottomRight, getPointValue, getTopLeft, pointInGrid, read } from "../../utils/Grid";

test('read number grid', () => {
    const input = [
        '123',
        '456',
        '789'
    ];
    const grid = read(input, Number);
    expect(grid).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);
});

test('get grid element', () => {
    expect(getPointValue([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ], { x: 1, y: 1 })).toBe(5);
});

test('getTopLeft', () => {
    expect(getTopLeft()).toEqual({ x: 0, y: 0 });
});
test('getBottomRight', () => {
    expect(getBottomRight([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ])).toEqual({ x: 2, y: 2 });
});

test.each`
point | expected
${{ x: 1, y: 1 }} | ${true}
${{ x: 3, y: 1 }} | ${false}
${{ x: 1, y: 3 }} | ${false}
${{ x: -1, y: 1 }} | ${false}
${{ x: 1, y: -1 }} | ${false}
`('pointInGrid', ({ point, expected }) => {
    expect(pointInGrid([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ], point)).toBe(expected);
});

test('createAndFill', () => {
    expect(createAndFill<number>(2, 2, Infinity)).toEqual([
        [Infinity, Infinity],
        [Infinity, Infinity]
    ]);
});
