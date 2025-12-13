const continueWall = {
  L: '7',
  7: 'L',
  F: 'J',
  J: 'F',
};
const parseMapInteraction = input => {
  switch (input) {
    case '|':
    case '-':
    case 'L':
    case 'J':
    case '7':
    case 'F':
    case '.':
    case 'S':
      return input;
    default:
      throw new Error(`Invalid map interaction: ${input}`);
  }
};
const findStartingPoint = map => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 'S') {
        return { x, y };
      }
    }
  }
  throw new Error('No starting point found');
};
const filterInbounds = (map, points) => {
  return points.filter(point => {
    return point.x >= 0 && point.x < map[0].length && point.y >= 0 && point.y < map.length;
  });
};
const getLinkedPoints = (mapInstructions, point) => {
  switch (mapInstructions[point.y][point.x]) {
    case '|':
      return filterInbounds(mapInstructions, [
        {
          x: point.x,
          y: point.y - 1,
        },
        {
          x: point.x,
          y: point.y + 1,
        },
      ]);
    case '-':
      return filterInbounds(mapInstructions, [
        {
          x: point.x - 1,
          y: point.y,
        },
        {
          x: point.x + 1,
          y: point.y,
        },
      ]);
    case 'L':
      return filterInbounds(mapInstructions, [
        {
          x: point.x,
          y: point.y - 1,
        },
        {
          x: point.x + 1,
          y: point.y,
        },
      ]);
    case 'J':
      return filterInbounds(mapInstructions, [
        {
          x: point.x,
          y: point.y - 1,
        },
        {
          x: point.x - 1,
          y: point.y,
        },
      ]);
    case '7':
      return filterInbounds(mapInstructions, [
        {
          x: point.x,
          y: point.y + 1,
        },
        {
          x: point.x - 1,
          y: point.y,
        },
      ]);
    case 'F':
      return filterInbounds(mapInstructions, [
        {
          x: point.x,
          y: point.y + 1,
        },
        {
          x: point.x + 1,
          y: point.y,
        },
      ]);
    default:
      return [];
  }
};
const pointsEqual = (point1, point2) => {
  return point1.x === point2.x && point1.y === point2.y;
};
const getPointsInLoop = mapInstructions => {
  const startingPoint = findStartingPoint(mapInstructions);
  const visitedPoints = [startingPoint];
  const pointsAroundStartingPoint = filterInbounds(mapInstructions, [
    {
      x: startingPoint.x,
      y: startingPoint.y - 1,
    },
    {
      x: startingPoint.x + 1,
      y: startingPoint.y,
    },
    {
      x: startingPoint.x,
      y: startingPoint.y + 1,
    },
    {
      x: startingPoint.x - 1,
      y: startingPoint.y,
    },
  ]);
  let currentPoint = startingPoint;
  let nextPoint = pointsAroundStartingPoint.find(point => {
    return getLinkedPoints(mapInstructions, point).some(cursor =>
      pointsEqual(cursor, currentPoint),
    );
  });
  while (
    (!pointsEqual(currentPoint, startingPoint) || visitedPoints.length === 1) &&
    visitedPoints.length < mapInstructions.length * mapInstructions[0].length
  ) {
    if (!nextPoint) {
      throw new Error('No next point found');
    }
    const newNextPoint = getLinkedPoints(mapInstructions, nextPoint).find(point => {
      return !pointsEqual(visitedPoints[visitedPoints.length - 1], point);
    });
    currentPoint = nextPoint;
    visitedPoints.push(nextPoint);
    nextPoint = newNextPoint;
  }
  return visitedPoints;
};
export const solution01 = input => {
  const mapInstructions = input.map(line => line.split('').map(parseMapInteraction));
  const visitedPoints = getPointsInLoop(mapInstructions);
  return Math.floor(visitedPoints.length / 2);
};
export const solution02 = input => {
  const mapInstructions = input.map(line => line.split('').map(parseMapInteraction));
  const visitedPoints = getPointsInLoop(mapInstructions);
  const newInstructions = mapInstructions.map((line, y) =>
    line.map((instruction, x) => {
      if (instruction === 'S') {
        return '7';
      }
      if (visitedPoints.every(point => !pointsEqual(point, { x, y }))) {
        return '.';
      }
      return instruction;
    }),
  );
  return newInstructions.reduce((acc, line) => {
    return acc + getInsidePixels(line);
  }, 0);
};
const getInsidePixels = instructions => {
  let crossedLine = 0;
  let lastCorner = undefined;
  return instructions.reduce((sum, instruction) => {
    if (['L', 'J', '7', 'F'].includes(instruction)) {
      if (lastCorner) {
        if (continueWall[lastCorner] === instruction) {
          crossedLine++;
        }
        lastCorner = undefined;
      } else if (!lastCorner) {
        lastCorner = instruction;
      }
    }
    if ('|' === instruction) {
      crossedLine++;
    }
    if ('.' === instruction && crossedLine % 2) {
      return sum + 1;
    }
    return sum;
  }, 0);
};
