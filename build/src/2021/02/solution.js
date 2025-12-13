const directionRegex = /(?<direction>forward|down|up)\s(?<strength>\d+)/;
function getPositions(movements) {
  return movements.reduce(
    (endPosition, movement) => {
      if (directionRegex.test(movement)) {
        const {
          groups: { direction, strength },
        } = directionRegex.exec(movement);
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
    { x: 0, y: 0 },
  );
}
export function getPositionProduct(movements) {
  const { x, y } = getPositions(movements);
  return x * y;
}
function getAimPositions(movements) {
  return movements.reduce(
    (endPosition, movement) => {
      if (directionRegex.test(movement)) {
        const {
          groups: { direction, strength },
        } = directionRegex.exec(movement);
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
    { x: 0, y: 0, aim: 0 },
  );
}
export function getAimPositionProduct(movements) {
  const { x, y } = getAimPositions(movements);
  return x * y;
}
