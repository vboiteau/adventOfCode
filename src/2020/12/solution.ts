enum Command {
  EAST = 'E',
  FORWARD = 'F',
  LEFT = 'L',
  NORTH = 'N',
  RIGHT = 'R',
  SOUTH = 'S',
  WEST = 'W',
}

interface Instruction {
  command: Command;
  value: number;
}

export function getLastPosition(instructionList: Array<string>): Array<number> {
  let degrees = 0;
  const instructions: Array<Instruction> = instructionList
    .map(
      (instruction: string) =>
        instruction.match(/^(?<command>[A-Z])(?<value>[0-9]+)$/).groups
    )
    .map(({command, value}) => ({
      command,
      value: parseInt(value),
    }));
  return instructions.reduce(
    ([x, y], {command, value}, index) => {
      if (Number.isNaN(x) || Number.isNaN(y)) {
        throw new Error('failed');
      }
      switch (command) {
        case Command.EAST:
          return [x + value, y];
        case Command.FORWARD:
          return [
            x + Math.round(Math.cos(degreesToRad(degrees))) * value,
            y + Math.round(Math.sin(degreesToRad(degrees))) * value,
          ];
        case Command.LEFT:
          degrees -= value;
          return [x, y];
        case Command.NORTH:
          return [x, y - value];
        case Command.RIGHT:
          degrees += value;
          return [x, y];
        case Command.SOUTH:
          return [x, y + value];
        case Command.WEST:
          return [x - value, y];
        default:
          return [x, y];
      }
    },
    [0, 0]
  );
}

export function getLastPositionWithWaypoint(
  instructionList: Array<string>
): Array<number> {
  const degrees = 0;
  let waypoint = [10, -1];
  const instructions: Array<Instruction> = instructionList
    .map(
      (instruction: string) =>
        instruction.match(/^(?<command>[A-Z])(?<value>[0-9]+)$/).groups
    )
    .map(({command, value}) => ({
      command,
      value: parseInt(value),
    }));
  return instructions.reduce(
    ([x, y], {command, value}, index) => {
      if (Number.isNaN(x) || Number.isNaN(y)) {
        throw new Error('failed');
      }
      switch (command) {
        case Command.EAST:
          waypoint[0] += value;
          return [x, y];
        case Command.FORWARD:
          return [x + waypoint[0] * value, y + waypoint[1] * value];
        case Command.LEFT: {
          const radius: number = degreesToRad(-value);
          waypoint = rotatePointFromPointZero(waypoint, radius);
          return [x, y];
        }
        case Command.NORTH:
          waypoint[1] -= value;
          return [x, y];
        case Command.RIGHT: {
          const radius: number = degreesToRad(value);
          waypoint = rotatePointFromPointZero(waypoint, radius);
          return [x, y];
        }
        case Command.SOUTH:
          waypoint[1] += value;
          return [x, y];
        case Command.WEST:
          waypoint[0] -= value;
          return [x, y];
        default:
          return [x, y];
      }
    },
    [0, 0]
  );
}

function rotatePointFromPointZero([x, y], radius: number) {
  return [
    Math.round(x * Math.cos(radius) - y * Math.sin(radius)),
    Math.round(y * Math.cos(radius) + x * Math.sin(radius)),
  ];
}

export function getMarithanPosition(
  instructions: Array<string>,
  positionCalculator
): number {
  const [x, y] = positionCalculator(instructions);
  return Math.abs(x) + Math.abs(y);
}

function degreesToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
