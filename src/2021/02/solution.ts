const directionRegex = /(?<direction>forward|down|up)\s(?<strength>\d+)/;

function getPositions(movements: Array<string>): {x: number; y: number} {
  return movements.reduce(
    (endPosition: {x: number; y: number}, movement: string) => {
      if (directionRegex.test(movement)) {
        const {
          groups: {direction, strength},
        } = movement.match(directionRegex) as any;
        if (direction === 'forward') {
          endPosition.x += Number.parseInt(strength);
        }
        if (direction === 'down') {
          endPosition.y += Number.parseInt(strength);
        }
        if (direction === 'up') {
          endPosition.y -= Number.parseInt(strength);
        }
      } else {
        console.log(movement);
      }
      return endPosition;
    },
    {x: 0, y: 0}
  );
}

export function getPositionProduct(movements: Array<string>): number {
  const {x, y} = getPositions(movements);
  return x * y;
}

function getAimPositions(movements: Array<string>): {
  x: number;
  y: number;
  aim: number;
} {
  return movements.reduce(
    (endPosition: {x: number; y: number; aim: number}, movement: string) => {
      if (directionRegex.test(movement)) {
        const {
          groups: {direction, strength},
        } = movement.match(directionRegex) as any;
        if (direction === 'forward') {
          endPosition.x += Number.parseInt(strength);
          endPosition.y += Number.parseInt(strength) * endPosition.aim;
        }
        if (direction === 'down') {
          endPosition.aim += Number.parseInt(strength);
        }
        if (direction === 'up') {
          endPosition.aim -= Number.parseInt(strength);
        }
      } else {
        console.log(movement);
      }
      return endPosition;
    },
    {x: 0, y: 0, aim: 0}
  );
}
export function getAimPositionProduct(movements: Array<string>): number {
  const {x, y} = getAimPositions(movements);
  return x * y;
}
