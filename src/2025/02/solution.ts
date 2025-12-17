import { EOL } from 'node:os';

export const solution01 = (text: string): number => {
  const content = text.split(EOL).join('');
  const ranges = content.split(',');
  let invalidNumbers = 0;
  for (const range of ranges) {
    const [start, end] = range.split('-').map(rangeBoundary => {
      return Number(rangeBoundary);
    });
    for (let i = start; i <= end; i++) {
      if (String(i).length % 2 != 0) {
        continue;
      }
      const start = String(i).slice(0, String(i).length / 2);
      const end = String(i).slice(String(i).length / 2, String(i).length);
      if (start === end) {
        invalidNumbers += i;
      }
    }
  }
  return invalidNumbers;
};

export const solution02 = (text: string): number => {
  const content = text.split(EOL).join('');
  const ranges = content.split(',');
  let invalidNumbers = 0;
  for (const range of ranges) {
    const [start, end] = range.split('-').map(rangeBoundary => {
      return Number(rangeBoundary);
    });
    for (let i = start; i <= end; i++) {
      if (evaluateNumberForSolution02(String(i))) {
        invalidNumbers += i;
      }
    }
  }
  return invalidNumbers;
};

const evaluateNumberForSolution02 = (id: string): boolean => {
  const maxLength = id.length;
  for (let targetSplit = 2; targetSplit <= id.length; targetSplit++) {
    const windowLength = maxLength / targetSplit;
    if (windowLength % 1 != 0) {
      continue;
    }
    let windows = [];
    for (let windowStart = 0; windowStart < maxLength; windowStart += windowLength) {
      windows.push(id.slice(windowStart, windowStart + windowLength));
    }
    if ([...new Set(windows)].length === 1) {
      return true;
    }
  }
  return false;
};
