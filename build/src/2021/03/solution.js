const getGamma = reportLines =>
  reportLines
    .reduce((bitSum, line) => {
      line.split('').forEach((bit, index) => (bitSum[index] += Number.parseInt(bit, 2)));
      return bitSum;
    }, new Array(reportLines[0].length).fill(0))
    .map(bitSum => (bitSum >= reportLines.length / 2 ? '1' : '0'))
    .join('');
const getEpsilon = reportLines =>
  getGamma(reportLines)
    .split('')
    .map(bit => (bit === '1' ? '0' : '1'))
    .join('');
export const getPowerConsumption = reportLines => {
  const gamma = getGamma(reportLines);
  const epsilon = getEpsilon(reportLines);
  return Number.parseInt(gamma, 2) * Number.parseInt(epsilon, 2);
};
const findUniqueMatch = (reportLines, readingFunction, matchCheckIndex) => {
  const toMatchStart = `${reportLines[0].substring(0, matchCheckIndex - 1)}${readingFunction(reportLines)[matchCheckIndex - 1]}`;
  const matches = reportLines.filter(line => line.startsWith(toMatchStart));
  if (matches.length === 1) {
    return matches[0];
  }
  return findUniqueMatch(matches, readingFunction, matchCheckIndex + 1);
};
export const getLifeSupportRating = reportLines => {
  const oxygenGeneratorRating = findUniqueMatch(reportLines, getGamma, 1);
  const co2ScrubberRating = findUniqueMatch(reportLines, getEpsilon, 1);
  return Number.parseInt(oxygenGeneratorRating, 2) * Number.parseInt(co2ScrubberRating, 2);
};
