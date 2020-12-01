const getGamma = (reportLines: Array<string>): string =>
  reportLines
    .reduce((bitSum: Array<number>, line: string) => {
      line
        .split('')
        .forEach((bit, index) => (bitSum[index] += Number.parseInt(bit, 2)));
      return bitSum;
    }, new Array(reportLines[0].length).fill(0))
    .map(bitSum => (bitSum >= reportLines.length / 2 ? '1' : '0'))
    .join('');

const getEpsilon = (reportLines: Array<string>): string =>
  getGamma(reportLines)
    .split('')
    .map(bit => (bit === '1' ? '0' : '1'))
    .join('');

export const getPowerConsumption = (reportLines: Array<string>): number => {
  const gamma: string = getGamma(reportLines);
  const epsilon: string = getEpsilon(reportLines);
  return Number.parseInt(gamma, 2) * Number.parseInt(epsilon, 2);
};

const findUniqueMatch = (
  reportLines: Array<string>,
  readingFunction: (reportLines: Array<string>) => string,
  matchCheckIndex: number
): string => {
  const toMatchStart = `${reportLines[0].substr(0, matchCheckIndex - 1)}${
    readingFunction(reportLines)[matchCheckIndex - 1]
  }`;
  const matches: Array<string> = reportLines.filter(line =>
    line.startsWith(toMatchStart)
  );
  if (matches.length === 1) {
    return matches[0];
  }
  return findUniqueMatch(matches, readingFunction, matchCheckIndex + 1);
};

export const getLifeSupportRating = (reportLines: Array<string>): number => {
  const oxygenGeneratorRating = findUniqueMatch(reportLines, getGamma, 1);
  const co2ScrubberRating = findUniqueMatch(reportLines, getEpsilon, 1);
  return (
    Number.parseInt(oxygenGeneratorRating, 2) *
    Number.parseInt(co2ScrubberRating, 2)
  );
};
