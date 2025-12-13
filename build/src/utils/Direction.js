var Direction;
(function (Direction) {
  Direction[(Direction['NORTH'] = 0)] = 'NORTH';
  Direction[(Direction['EAST'] = 1)] = 'EAST';
  Direction[(Direction['SOUTH'] = 2)] = 'SOUTH';
  Direction[(Direction['WEST'] = 3)] = 'WEST';
})(Direction || (Direction = {}));
export const cw = direction => {
  return (direction + 1) % 4;
};
export const ccw = direction => {
  return direction === 0 ? 3 : direction - 1;
};
export default Direction;
