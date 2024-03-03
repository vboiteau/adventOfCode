interface Point {
  rowIndex: number;
  columnIndex: number;
}

const getHeightMap = (heightMapRows: Array<string>): Array<Array<number>> =>
  heightMapRows.map(row =>
    row
      .split('')
      .filter(Boolean)
      .map(height => Number.parseInt(height))
  );

const getLowPoints = (heightMap: Array<Array<number>>): Array<Point> =>
  heightMap.reduce(
    (mapLowPoints: Array<Point>, heightMapRow, rowIndex) => [
      ...mapLowPoints,
      ...heightMapRow.reduce(
        (rowLowPoints: Array<Point>, heightMapCell, columnIndex) => {
          const neighbours: Array<number> = [];
          if (rowIndex > 0) {
            neighbours.push(heightMap[rowIndex - 1][columnIndex]);
          }
          if (rowIndex < heightMap.length - 1) {
            neighbours.push(heightMap[rowIndex + 1][columnIndex]);
          }
          if (columnIndex > 0) {
            neighbours.push(heightMap[rowIndex][columnIndex - 1]);
          }
          if (columnIndex < heightMap[rowIndex].length - 1) {
            neighbours.push(heightMap[rowIndex][columnIndex + 1]);
          }
          if (neighbours.every(neighbour => neighbour > heightMapCell)) {
            return [
              ...rowLowPoints,
              {
                rowIndex,
                columnIndex,
              },
            ];
          }
          return rowLowPoints;
        },
        []
      ),
    ],
    []
  );

const getBassinForLowPoint = (
  heightMap: Array<Array<number>>,
  lowPoint: Point
): Array<Point> => {
  const bassinPoints: Array<Point> = [lowPoint];
  for (const { rowIndex, columnIndex } of bassinPoints) {
    if (
      rowIndex > 0 &&
      canAddToBassin(heightMap, columnIndex, rowIndex - 1, bassinPoints)
    ) {
      bassinPoints.push({
        rowIndex: rowIndex - 1,
        columnIndex,
      });
    }
    if (
      rowIndex < heightMap.length - 1 &&
      canAddToBassin(heightMap, columnIndex, rowIndex + 1, bassinPoints)
    ) {
      bassinPoints.push({
        rowIndex: rowIndex + 1,
        columnIndex,
      });
    }
    if (
      columnIndex > 0 &&
      canAddToBassin(heightMap, columnIndex - 1, rowIndex, bassinPoints)
    ) {
      bassinPoints.push({
        rowIndex,
        columnIndex: columnIndex - 1,
      });
    }
    if (
      columnIndex < heightMap[rowIndex].length - 1 &&
      canAddToBassin(heightMap, columnIndex + 1, rowIndex, bassinPoints)
    ) {
      bassinPoints.push({
        rowIndex,
        columnIndex: columnIndex + 1,
      });
    }
  }
  return bassinPoints;
};

const canAddToBassin = (
  heightMap: Array<Array<number>>,
  columnIndex: number,
  rowIndex: number,
  bassinPoints: Array<Point>
): boolean =>
  heightMap[rowIndex][columnIndex] !== 9 &&
  bassinPoints.every(
    bassinPoint =>
      !(
        bassinPoint.rowIndex === rowIndex &&
        bassinPoint.columnIndex === columnIndex
      )
  );

export const getLowPointSum = (heightMapRows: Array<string>): number => {
  const heightMap: Array<Array<number>> = getHeightMap(heightMapRows);

  const LowPointPositions = getLowPoints(heightMap);

  return LowPointPositions.reduce(
    (sum, {rowIndex, columnIndex}) =>
      sum + (heightMap[rowIndex][columnIndex] + 1),
    0
  );
};

export const getBigBassinsProduct = (heightMapRows: Array<string>): number => {
  const heightMap: Array<Array<number>> = getHeightMap(heightMapRows);

  const LowPointPositions = getLowPoints(heightMap);

  const [first, second, third] = LowPointPositions.map(lowPoint =>
    getBassinForLowPoint(heightMap, lowPoint)
  ).sort((a, b) => b.length - a.length);

  return first.length * second.length * third.length;
};
