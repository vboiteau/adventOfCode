const getEmptyColumnIndexes = map => {
  const emptyRowIndexes = [];
  for (let i = 0; i < map[0].length; i++) {
    if (map.every(row => row[i] === '.')) {
      emptyRowIndexes.push(i);
    }
  }
  return emptyRowIndexes;
};
const getEmptyRowIndexes = map => {
  return map
    .map((row, index) => (row.every(cell => cell === '.') ? index : undefined))
    .filter(rowIndex => rowIndex !== undefined);
};
export const getMinDistance = ([firstPoint, ...otherPoints]) => {
  return (
    otherPoints.reduce((sum, current) => {
      return sum + Math.abs(firstPoint.x - current.x) + Math.abs(firstPoint.y - current.y);
    }, 0) + (otherPoints.length ? getMinDistance(otherPoints) : 0)
  );
};
export const solution01 = (input, valueOfEmpty) => {
  const map = input.map(line => line.split(''));
  const emptyRowIndexes = getEmptyRowIndexes(map);
  const emptyColumnIndexes = getEmptyColumnIndexes(map);
  let galaxyPoints = [];
  let currentRow = 0;
  for (let y = 0; y < map.length; y++) {
    let currentColumn = 0;
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '#') {
        galaxyPoints = [...galaxyPoints, { x: currentColumn, y: currentRow }];
      }
      currentColumn += emptyColumnIndexes.includes(x) ? valueOfEmpty : 1;
    }
    currentRow += emptyRowIndexes.includes(y) ? valueOfEmpty : 1;
  }
  return getMinDistance(galaxyPoints);
};
