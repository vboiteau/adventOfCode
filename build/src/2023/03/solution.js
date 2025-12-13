const notInPoints = (points, point) => {
  return !points.some(({ x, y }) => x === point.x && y === point.y);
};
const getSpottedNumbers = lines => {
  const numbers = [];
  let currentNumber = undefined;
  for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
    if (currentNumber) {
      numbers.push(currentNumber);
    }
    currentNumber = undefined;
    for (let colIndex = 0; colIndex < lines[rowIndex].length; colIndex++) {
      const currentChar = lines[rowIndex][colIndex];
      if (/\d/.test(currentChar)) {
        if (!currentNumber) {
          currentNumber = {
            id: numbers.length,
            number: Number(currentChar),
            points: [{ x: colIndex, y: rowIndex }],
          };
        } else {
          currentNumber = {
            ...currentNumber,
            number: Number(`${currentNumber.number}${currentChar}`),
            points: [...currentNumber.points, { x: colIndex, y: rowIndex }],
          };
        }
      } else if (currentNumber) {
        numbers.push(currentNumber);
        currentNumber = undefined;
      }
    }
  }
  return numbers;
};
export const solution01 = lines => {
  const numbers = getSpottedNumbers(lines);
  const spotsToCheck = getSpotsToCheck(lines);
  console.log(numbers);
  const numbersInSpots = numbers.filter(({ points }) =>
    points.some(({ x, y }) => spotsToCheck.some(({ x: x2, y: y2 }) => x === x2 && y === y2)),
  );
  return numbersInSpots.reduce((sum, { number }) => sum + number, 0);
};
const getSpotsToCheck = lines => {
  let spotsToCheck = [];
  lines.forEach((line, rowIndex) =>
    line.split('').forEach((currentChar, colIndex) => {
      if (!/[^\d.]/.test(currentChar)) {
        return [];
      }
      const params = { rowIndex, colIndex, lines, spotsToCheck };
      checkTopLeft(params);
      checkTop(params);
      checkTopRight(params);
      checkLeft(params);
      checkRight(params);
      checkBottomLeft(params);
      checkBottom(params);
      checkBottomRight(params);
      spotsToCheck = params.spotsToCheck;
    }),
  );
  return spotsToCheck;
};
const isFirstCol = ({ colIndex }) => colIndex === 0;
const isFirstRow = ({ rowIndex }) => rowIndex === 0;
const isLastCol = ({ colIndex, lines }) => colIndex === lines[0].length;
const isLastRow = ({ rowIndex, lines }) => rowIndex === lines.length;
const checkTopLeft = params => {
  if (!isFirstCol(params) || !isFirstRow(params)) {
    const point = { x: params.colIndex - 1, y: params.rowIndex - 1 };
    if (notInPoints(params.spotsToCheck, point)) {
      params.spotsToCheck.push(point);
    }
  }
};
const checkTop = params => {
  if (!isFirstRow(params)) {
    const point = { x: params.colIndex, y: params.rowIndex - 1 };
    if (notInPoints(params.spotsToCheck, point)) {
      params.spotsToCheck.push(point);
    }
  }
};
const checkTopRight = params => {
  if (!isLastCol(params) || !isFirstRow(params)) {
    const point = { x: params.colIndex + 1, y: params.rowIndex - 1 };
    if (notInPoints(params.spotsToCheck, point)) {
      params.spotsToCheck.push(point);
    }
  }
};
const checkLeft = params => {
  if (!isFirstCol(params)) {
    const point = { x: params.colIndex - 1, y: params.rowIndex };
    if (notInPoints(params.spotsToCheck, point)) {
      params.spotsToCheck.push(point);
    }
  }
};
const checkRight = params => {
  if (!isLastCol(params)) {
    const point = { x: params.colIndex + 1, y: params.rowIndex };
    if (notInPoints(params.spotsToCheck, point)) {
      params.spotsToCheck.push(point);
    }
  }
};
const checkBottomLeft = params => {
  if (!isLastRow(params) || isFirstCol(params)) {
    const point = { x: params.colIndex - 1, y: params.rowIndex + 1 };
    if (notInPoints(params.spotsToCheck, point)) {
      params.spotsToCheck.push(point);
    }
  }
};
const checkBottom = params => {
  if (!isLastRow(params)) {
    const point = { x: params.colIndex, y: params.rowIndex + 1 };
    if (notInPoints(params.spotsToCheck, point)) {
      params.spotsToCheck.push(point);
    }
  }
};
const checkBottomRight = params => {
  if (!isLastRow(params) || !isLastCol(params)) {
    const point = { x: params.colIndex + 1, y: params.rowIndex + 1 };
    if (notInPoints(params.spotsToCheck, point)) {
      params.spotsToCheck.push(point);
    }
  }
};
export const solution02 = lines => {
  const numbers = getSpottedNumbers(lines);
  let gearSum = 0;
  for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
    for (let colIndex = 0; colIndex < lines[rowIndex].length; colIndex++) {
      const currentChar = lines[rowIndex][colIndex];
      if (!/[^\d.]/.test(currentChar)) {
        continue;
      }
      const params = { rowIndex, colIndex, lines, spotsToCheck: [] };
      checkTopLeft(params);
      checkTop(params);
      checkTopRight(params);
      checkLeft(params);
      checkRight(params);
      checkBottomLeft(params);
      checkBottom(params);
      checkBottomRight(params);
      if (currentChar === '*') {
        const numbersInSpots = numbers.filter(({ points }) =>
          points.some(({ x, y }) =>
            params.spotsToCheck.some(({ x: x2, y: y2 }) => x === x2 && y === y2),
          ),
        );
        if (numbersInSpots.length === 2) {
          gearSum += numbersInSpots[0].number * numbersInSpots[1].number;
        }
      }
    }
  }
  return gearSum;
};
