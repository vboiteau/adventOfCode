const countSumdges = (firstHalf, secondHalf) => {
  return firstHalf.flatMap((line, rowIndex) =>
    line.split('').filter((char, colIndex) => char !== secondHalf[rowIndex][colIndex]),
  ).length;
};
const getReflexionRow = (pattern, expectedSmudge) => {
  const halfPoint = Math.floor(pattern.length / 2);
  for (let rowIndex = 0; rowIndex < pattern.length; rowIndex++) {
    const firstHalf = [];
    const secondHalf = [];
    for (let i = 0; i < halfPoint; i++) {
      const firstHalfIndex = rowIndex - i;
      const secondHalfIndex = rowIndex + i + 1;
      if (firstHalfIndex < 0 || secondHalfIndex >= pattern.length) {
        break;
      }
      firstHalf.push(pattern[firstHalfIndex]);
      secondHalf.push(pattern[secondHalfIndex]);
    }
    if (firstHalf.length && firstHalf.length === secondHalf.length) {
      const foundSmudge = countSumdges(firstHalf, secondHalf);
      if (foundSmudge === expectedSmudge) {
        return rowIndex + 1;
      }
    }
  }
  return 0;
};
const rotatePattern = pattern => {
  const flippedPattern = [];
  for (let col = 0; col < pattern[0].length; col++) {
    let line = '';
    for (const row of pattern) {
      line = line + row[col];
    }
    flippedPattern.push(line);
  }
  return flippedPattern;
};
const getPatternValue = (pattern, expectedSmudge) => {
  const rowReflexion = getReflexionRow(pattern, expectedSmudge);
  if (rowReflexion > 0) {
    return rowReflexion * 100;
  }
  const columnReflexion = getReflexionRow(rotatePattern(pattern), expectedSmudge);
  if (columnReflexion > 0) {
    return columnReflexion;
  }
  return 0;
};
export const getReflexionSummary = (patterns, expectedSmudge) => {
  return patterns.reduce(
    (sum, pattern, index) => sum + getPatternValue(pattern, expectedSmudge),
    0,
  );
};
