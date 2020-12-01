interface NumberSpotted {
    id: number;
    number: number;
    points: Array<Point>;
}

interface Point {
    x: number;
    y: number;
}

const notInPoints = (points: Array<Point>, point: Point): boolean => {
    return !points.some(({ x, y }) => x === point.x && y === point.y);
}

export const solution01 = (lines: Array<string>): number => {
    const numbers: Array<NumberSpotted> = []
    let currentNumber: NumberSpotted | undefined = undefined;
    for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
        if (currentNumber) {
            numbers.push(currentNumber)
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
                        points: [...currentNumber.points, { x: colIndex, y: rowIndex }]
                    };
                }
            } else if (currentNumber) {
                numbers.push(currentNumber);
                currentNumber = undefined;
            }
        }
    }
    const spotsToCheck: Array<Point> = [];
    for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
        for (let colIndex = 0; colIndex < lines[rowIndex].length; colIndex++) {
            const currentChar = lines[rowIndex][colIndex];
            if (/[^\d.]/.test(currentChar)) {
                const isFirstCol = colIndex === 0;
                const isFirstRow = rowIndex === 0;
                const isLastCol = colIndex === lines[rowIndex].length - 1;
                const isLastRow = rowIndex === lines.length - 1;
                if (!isFirstCol || !isFirstRow) {
                    const point: Point = { x: colIndex - 1, y: rowIndex - 1 };
                    if (notInPoints(spotsToCheck, point)) {
                        spotsToCheck.push(point);
                    }
                }
                if (!isFirstRow) {
                    const point: Point = { x: colIndex, y: rowIndex - 1 };
                    if (notInPoints(spotsToCheck, point)) {
                        spotsToCheck.push(point);
                    }
                }
                if (!isLastCol || !isFirstRow) {
                    const point: Point = { x: colIndex + 1, y: rowIndex - 1 };
                    if (notInPoints(spotsToCheck, point)) {
                        spotsToCheck.push(point);
                    }
                }
                if (!isFirstCol) {
                    const point: Point = { x: colIndex - 1, y: rowIndex };
                    if (notInPoints(spotsToCheck, point)) {
                        spotsToCheck.push(point);
                    }
                }
                if (!isLastCol) {
                    const point: Point = { x: colIndex + 1, y: rowIndex };
                    if (notInPoints(spotsToCheck, point)) {
                        spotsToCheck.push(point);
                    }
                }
                if (!isLastRow || isFirstCol) {
                    const point: Point = { x: colIndex - 1, y: rowIndex + 1 };
                    if (notInPoints(spotsToCheck, point)) {
                        spotsToCheck.push(point);
                    }
                }
                if (!isLastRow) {
                    const point: Point = { x: colIndex, y: rowIndex + 1 };
                    if (notInPoints(spotsToCheck, point)) {
                        spotsToCheck.push(point);
                    }
                }
                if (!isLastRow || !isLastCol) {
                    const point: Point = { x: colIndex + 1, y: rowIndex + 1 };
                    if (notInPoints(spotsToCheck, point)) {
                        spotsToCheck.push(point);
                    }
                }
            }
        }
    }
    const numbersInSpots = numbers.filter(({ points }) =>
        points.some(({ x, y }) => spotsToCheck.some(({ x: x2, y: y2 }) => x === x2 && y === y2)));
    return numbersInSpots.reduce((sum, { number }) => sum + number, 0);
}

export const solution02 = (lines: Array<string>): number => {
    const numbers: Array<NumberSpotted> = []
    let currentNumber: NumberSpotted | undefined = undefined;
    for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
        if (currentNumber) {
            numbers.push(currentNumber)
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
                        points: [...currentNumber.points, { x: colIndex, y: rowIndex }]
                    };
                }
            } else if (currentNumber) {
                numbers.push(currentNumber);
                currentNumber = undefined;
            }
        }
    }
    let gearSum = 0;
    for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
        for (let colIndex = 0; colIndex < lines[rowIndex].length; colIndex++) {
            const currentChar = lines[rowIndex][colIndex];
            const symbolSpotsToCheck: Array<Point> = [];
            if (/[^\d.]/.test(currentChar)) {
                const isFirstCol = colIndex === 0;
                const isFirstRow = rowIndex === 0;
                const isLastCol = colIndex === lines[rowIndex].length - 1;
                const isLastRow = rowIndex === lines.length - 1;
                if (!isFirstCol || !isFirstRow) {
                    symbolSpotsToCheck.push({ x: colIndex - 1, y: rowIndex - 1 });
                }
                if (!isFirstRow) {
                    symbolSpotsToCheck.push({ x: colIndex, y: rowIndex - 1 });
                }
                if (!isLastCol || !isFirstRow) {
                    symbolSpotsToCheck.push({ x: colIndex + 1, y: rowIndex - 1 });
                }
                if (!isFirstCol) {
                    symbolSpotsToCheck.push({ x: colIndex - 1, y: rowIndex });
                }
                if (!isLastCol) {
                    symbolSpotsToCheck.push({ x: colIndex + 1, y: rowIndex });
                }
                if (!isLastRow || isFirstCol) {
                    symbolSpotsToCheck.push({ x: colIndex - 1, y: rowIndex + 1 });
                }
                if (!isLastRow) {
                    symbolSpotsToCheck.push({ x: colIndex, y: rowIndex + 1 });
                }
                if (!isLastRow || !isLastCol) {
                    symbolSpotsToCheck.push({ x: colIndex + 1, y: rowIndex + 1 });
                }
                if (currentChar === '*') {
                    const numbersInSpots = numbers.filter(({ points }) =>
                        points.some(({ x, y }) => symbolSpotsToCheck.some(({ x: x2, y: y2 }) => x === x2 && y === y2)));
                    if (numbersInSpots.length === 2) {
                        gearSum += numbersInSpots[0].number * numbersInSpots[1].number;
                    }
                }
            }
        }
    }
    return gearSum;
}
