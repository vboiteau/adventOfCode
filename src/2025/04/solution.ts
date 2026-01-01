type RollPosition = {
  column: number;
  row: number;
};
type RollsRow = Array<boolean>;
type RollsMap = Array<RollsRow>;

const convertToRollsMap = (input: string[]): RollsMap => {
  return input.map(line => line.split('').map(char => char === '@'));
};

const getIsAccessible = (rollsMap: RollsMap, rowIndex: number, colIndex: number): boolean => {
  const rowMaxIndex = rollsMap.length - 1;
  const colMaxIndex = rollsMap[0].length - 1;
  let adjacentRolls = 0;
  if (rowIndex > 0 && rollsMap[rowIndex - 1][colIndex]) {
    adjacentRolls++;
  }
  if (rowIndex > 0 && colIndex < colMaxIndex && rollsMap[rowIndex - 1][colIndex + 1]) {
    adjacentRolls++;
  }
  if (colIndex < colMaxIndex && rollsMap[rowIndex][colIndex + 1]) {
    adjacentRolls++;
  }
  if (rowIndex < rowMaxIndex && colIndex < colMaxIndex && rollsMap[rowIndex + 1][colIndex + 1]) {
    adjacentRolls++;
  }
  if (rowIndex < rowMaxIndex && rollsMap[rowIndex + 1][colIndex]) {
    adjacentRolls++;
  }
  if (rowIndex < rowMaxIndex && colIndex > 0 && rollsMap[rowIndex + 1][colIndex - 1]) {
    adjacentRolls++;
  }
  if (colIndex > 0 && rollsMap[rowIndex][colIndex - 1]) {
    adjacentRolls++;
  }
  if (rowIndex > 0 && colIndex > 0 && rollsMap[rowIndex - 1][colIndex - 1]) {
    adjacentRolls++;
  }
  return adjacentRolls < 4;
};

const getAccessibleRolls = (rollsMap: RollsMap): Array<RollPosition> => {
  let accessibleRolls: Array<RollPosition> = [];
  for (let rowIndex = 0; rowIndex < rollsMap.length; rowIndex++) {
    for (let colIndex = 0; colIndex < rollsMap[rowIndex].length; colIndex++) {
      if (!rollsMap[rowIndex][colIndex]) {
        continue;
      }
      const isAccessible = getIsAccessible(rollsMap, rowIndex, colIndex);
      if (isAccessible) {
        accessibleRolls.push({ row: rowIndex, column: colIndex });
      }
    }
  }
  return accessibleRolls;
};

export const getAccessibleRollsCount = (input: string[]): number => {
  const rollsMap = convertToRollsMap(input);
  const accessibleRolls = getAccessibleRolls(rollsMap);
  return accessibleRolls.length;
};

const removeAccessibleRoll = (rollsMap: RollsMap, rollPositions: Array<RollPosition>): RollsMap => {
  return rollPositions.reduce((map, position) => {
    map[position.row][position.column] = false;
    return map;
  }, rollsMap);
};

export const getAccessibleRollsUntilStaleCount = (input: string[]): number => {
  let rollsMap = convertToRollsMap(input);
  let accessibleRollsCount = 0;
  let accessibleRolls = getAccessibleRolls(rollsMap);
  while (accessibleRolls.length > 0) {
    removeAccessibleRoll(rollsMap, accessibleRolls);
    accessibleRollsCount += accessibleRolls.length;
    accessibleRolls = getAccessibleRolls(rollsMap);
  }
  return accessibleRollsCount;
};
