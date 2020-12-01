const alphaNumberMapping: Record<string, Array<number>> = {
    'one': [1],
    'oneight': [1, 8],
    'two': [2],
    'twone': [2, 1],
    'three': [3],
    'threeight': [3, 8],
    'four': [4],
    'five': [5],
    'fiveight': [5, 8],
    'six': [6],
    'seven': [7],
    'sevenine': [7, 9],
    'eightwo': [8, 2],
    'eighthree': [8, 3],
    'eight': [8],
    'nine': [9],
    'nineight': [9, 8],
};
const getNumbersInLine = (line: string) => {
    return line.match(/\d/g).map(Number);
}
const getAlphaNumbersInLine = (line: string): Array<number> => {
    const numbers = line.match(/1|2|3|4|5|6|7|8|9|oneight|one|twone|two|threeight|three|four|fiveight|five|six|sevenine|seven|eightwo|eighthree|eight|nineight|nine/g).reduce((arr, value) => {
        if (Object.keys(alphaNumberMapping).includes(value)) {
            return [...arr, ...alphaNumberMapping[value]];
        }
        return [...arr, Number(value)];
    }, []);
    return numbers;
}
const getNumberForLine = (line: string): number => {
    const numbers = getNumbersInLine(line);
    return Number(`${numbers[0]}${numbers[numbers.length - 1]}`);
}

const getAlphaNumberForLine = (line: string): number => {
    const numbers = getAlphaNumbersInLine(line);
    return Number(`${numbers[0]}${numbers[numbers.length - 1]}`);
}

export const solution01 = (lines: Array<string>): number => {
    return lines.reduce((sum, line) => sum + getNumberForLine(line), 0);
}

export const solution02 = (lines: Array<string>): Record<string, number> => {
    return lines.reduce((sum, line) => sum + getAlphaNumberForLine(line), 0);
}
