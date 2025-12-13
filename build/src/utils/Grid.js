export const read = (input, parse) => {
  return input.map(line => line.split('').map(parse));
};
export const createAndFill = (width, height, value) => {
  return Array.from({ length: height }, () => Array.from({ length: width }, () => value));
};
export const getPointValue = (grid, point) => grid[point.y][point.x];
export const getTopLeft = () => ({ x: 0, y: 0 });
export const getWidth = grid => grid[0].length;
export const getHeight = grid => grid.length;
export const getBottomRight = grid => ({
  x: grid[0].length - 1,
  y: grid.length - 1,
});
export const pointInGrid = (grid, point) =>
  point.x > -1 && point.x < getWidth(grid) && point.y > -1 && point.y < getHeight(grid);
export const setPointValue = (grid, point, value) => {
  grid[point.y][point.x] = value;
};
export const copy = grid => {
  return grid.map(line => line.slice());
};
