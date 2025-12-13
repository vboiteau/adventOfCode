import Point from './Point';

type Grid<T> = Array<Array<T>>;

export const read = <T>(input: Array<string>, parse: (s: string) => T): Grid<T> => {
  return input.map(line => line.split('').map(parse));
};

export const createAndFill = <T>(width: number, height: number, value: T): Grid<T> => {
  return Array.from({ length: height }, () => Array.from({ length: width }, () => value));
};

export const getPointValue = <T>(grid: Grid<T>, point: Point): T => grid[point.y][point.x];

export const getTopLeft = (): Point => ({ x: 0, y: 0 });

export const getWidth = <T>(grid: Grid<T>): number => grid[0].length;

export const getHeight = <T>(grid: Grid<T>): number => grid.length;

export const getBottomRight = <T>(grid: Grid<T>): Point => ({
  x: grid[0].length - 1,
  y: grid.length - 1,
});

export const pointInGrid = <T>(grid: Grid<T>, point: Point): boolean =>
  point.x > -1 && point.x < getWidth(grid) && point.y > -1 && point.y < getHeight(grid);

export const setPointValue = <T>(grid: Grid<T>, point: Point, value: T): void => {
  grid[point.y][point.x] = value;
};

export const copy = <T>(grid: Grid<T>): Grid<T> => {
  return grid.map(line => line.slice());
};

export default Grid;
