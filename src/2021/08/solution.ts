interface TickReport {
  numbersDef: Array<string>;
  numbersToDisplay: Array<string>;
}

const parseTick = (tick: string): TickReport => {
  const [numbersDef, numbersToDisplay] = tick.split(' | ');
  return {
    numbersDef: numbersDef
      .split(' ')
      .map(numberDef => numberDef.split('').sort((a, b) => a.localeCompare(b)).join('')),
    numbersToDisplay: numbersToDisplay
      .split(' ')
      .map(numberToDisplay => numberToDisplay.split('').sort((a, b) => a.localeCompare(b)).join('')),
  };
};

export const getNumberUsingSegmentA = (ticks: Array<string>): number => {
  const reports = ticks.map(parseTick);
  return reports
    .map(({numbersToDisplay}) => numbersToDisplay)
    .flat()
    .reduce(
      (sum, numberToDisplay) =>
        sum + ([2, 3, 4, 7].includes(numberToDisplay.length) ? 1 : 0),
      0
    );
};

export const sumOfTicks = (ticks: Array<string>): number =>
  ticks
    .map(parseTick)
    .reduce((sum, tickReport) => sum + getTickValue(tickReport), 0);

const getTickValue = ({numbersDef, numbersToDisplay}: TickReport): number => {
  const numberMap: Array<string> = getNumberMap(numbersDef);
  return getNumberToDisplay(numberMap, numbersToDisplay);
};

const getNumberMap = (numbersDef: Array<string>): Array<string> => {
  const map = [];
  map[1] = getNumberWithUniqueNumberOfSegment(numbersDef, 2);
  map[4] = getNumberWithUniqueNumberOfSegment(numbersDef, 4);
  map[7] = getNumberWithUniqueNumberOfSegment(numbersDef, 3);
  map[8] = getNumberWithUniqueNumberOfSegment(numbersDef, 7);
  map[9] = getNumberWithExtraSegment(numbersDef, [map[4], map[7]], 1, 6, map);
  map[2] = getNumberWithExtraSegment(numbersDef, [map[4]], 3, 5, map);
  map[3] = getNumberWithExtraSegment(numbersDef, [map[2], map[7]], 0, 5, map);
  map[5] = getNumberWithExtraSegment(numbersDef, [map[8]], 0, 5, map);
  map[6] = getNumberWithExtraSegment(numbersDef, [map[5]], 1, 6, map);
  map[0] = getNumberWithExtraSegment(numbersDef, [map[8]], 0, 6, map);
  return map;
};

const getNumberWithUniqueNumberOfSegment = (
  numbersDef: Array<string>,
  segmentCount: number
): string =>
  numbersDef.find(numberDef => numberDef.length === segmentCount) ?? '';

const getNumberWithExtraSegment = (
  numbersDef: Array<string>,
  numbersToCompareAgainst: Array<string>,
  extraCount: number,
  targetLength: number,
  map: Array<string>
): string => {
  const segmentToCompareAgainst = new Set(
    numbersToCompareAgainst
      .map(numberToCompare => numberToCompare.split(''))
      .flat()
  );
  return (
    numbersDef.find(
      numberDef =>
        getMissingSegment(numberDef, segmentToCompareAgainst).length ===
          extraCount &&
        numberDef.length === targetLength &&
        !map.includes(numberDef)
    ) ?? ''
  );
};

const getMissingSegment = (
  numberDef: string,
  segmentToCompareAgainst: Set<string>
): Array<string> =>
  numberDef.split('').filter(segment => !segmentToCompareAgainst.has(segment));

const getNumberToDisplay = (
  numberMap: Array<string>,
  numbersToDisplay: Array<string>
): number =>
  Number.parseInt(
    numbersToDisplay.reduce(
      (current, numberToDisplay) =>
        `${current}${numberMap.indexOf(numberToDisplay)}`,
      ''
    )
  );
