enum Direction {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

export const cw = (direction: Direction): Direction => {
  return (direction + 1) % 4;
};

export const ccw = (direction: Direction): Direction => {
  return direction === 0 ? 3 : direction - 1;
};

export default Direction;
