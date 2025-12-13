const parseLines = lines => {
  const regex = /(?<x1>\d+),(?<y1>\d+)\s->\s(?<x2>\d+),(?<y2>\d+)/;
  return lines.map(line => {
    const {
      groups: { x1, y1, x2, y2 },
    } = regex.exec(line);
    return {
      p1: {
        x: Number.parseInt(x1),
        y: Number.parseInt(y1),
      },
      p2: {
        x: Number.parseInt(x2),
        y: Number.parseInt(y2),
      },
    };
  });
};
function getStraightLinePointMap(lines) {
  return lines
    .filter(line => line.p1.x === line.p2.x || line.p1.y === line.p2.y)
    .reduce((map, line) => {
      for (let i = Math.min(line.p1.y, line.p2.y); i <= Math.max(line.p1.y, line.p2.y); i++) {
        for (let j = Math.min(line.p1.x, line.p2.x); j <= Math.max(line.p1.x, line.p2.x); j++) {
          if (!map[i]) {
            map[i] = [];
          }
          if (!map[i][j]) {
            map[i][j] = 0;
          }
          map[i][j] += 1;
        }
      }
      return map;
    }, []);
}
function getDangerousPointsCountFromPointMap(pointMap) {
  return pointMap.reduce(
    (mapSum, row) => mapSum + row.reduce((rowSum, cell) => rowSum + ((cell ?? 0) > 1 ? 1 : 0), 0),
    0,
  );
}
export const getDangerousPointsCount = fileLines => {
  return getDangerousPointsCountFromPointMap(getStraightLinePointMap(parseLines(fileLines)));
};
function getDiagonalLinePoints({ p1, p2 }) {
  if (p1.y > p2.y) {
    return {
      up: p2,
      down: p1,
    };
  }
  return {
    up: p1,
    down: p2,
  };
}
function incrementPointMapWithDiagonal(lines, pointMap) {
  for (const line of lines.filter(({ p1, p2 }) => p1.x !== p2.x && p1.y !== p2.y)) {
    const { up, down } = getDiagonalLinePoints(line);
    for (let i = up.y, j = up.x; i <= down.y; i++) {
      if (!pointMap[i]) {
        pointMap[i] = [];
      }
      if (!pointMap[i][j]) {
        pointMap[i][j] = 0;
      }
      pointMap[i][j] += 1;
      j += up.x > down.x ? -1 : 1;
    }
  }
  return pointMap;
}
export const getDangerousPointsWithDiagonalCount = fileLines => {
  const lines = parseLines(fileLines);
  return getDangerousPointsCountFromPointMap(
    incrementPointMapWithDiagonal(lines, getStraightLinePointMap(lines)),
  );
};
