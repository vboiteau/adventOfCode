interface Octopus {
  rowIndex: number;
  columnIndex: number;
}

const simulateStep = (octopuses: Array<Array<number>>): Array<Array<number>> => {
  const toIncrement: Array<Octopus> = [];
  for (let i = 0; i < octopuses.length; i++) {
    for (let j = 0; j < octopuses[i].length; j++) {
      toIncrement.push({
        rowIndex: i,
        columnIndex: j,
      });
    }
  }

  for (const { rowIndex, columnIndex } of toIncrement) {
    if (octopuses[rowIndex][columnIndex] > 9) {
      continue;
    }
    octopuses[rowIndex][columnIndex] += 1;
    if (octopuses[rowIndex][columnIndex] > 9) {
      generateNewSteps({
        rowIndex,
        columnIndex,
        octopuses,
        toIncrement,
      });
    }
  }
  return octopuses.map(octopusRow => octopusRow.map(octopus => (octopus >= 10 ? 0 : octopus)));
};

interface GenerateNewStepsParams {
  rowIndex: number;
  columnIndex: number;
  octopuses: Array<Array<number>>;
  toIncrement: Array<{ rowIndex: number; columnIndex: number }>;
}

const generateNewSteps = (params: GenerateNewStepsParams): void => {
  generateTopLeftStep(params);
  generateTopStep(params);
  generateTopRightStep(params);
  generateLeftStep(params);
  generateRightStep(params);
  generateBottomLeftStep(params);
  generateBottomStep(params);
  generateBottomRightStep(params);
};

const generateTopLeftStep = ({
  rowIndex,
  columnIndex,
  octopuses,
  toIncrement,
}: GenerateNewStepsParams) => {
  if (rowIndex > 0 && columnIndex > 0 && octopuses[rowIndex - 1][columnIndex - 1] < 10) {
    toIncrement.push({
      rowIndex: rowIndex - 1,
      columnIndex: columnIndex - 1,
    });
  }
};

const generateTopStep = ({
  rowIndex,
  columnIndex,
  octopuses,
  toIncrement,
}: GenerateNewStepsParams) => {
  if (rowIndex > 0 && octopuses[rowIndex - 1][columnIndex] < 10) {
    toIncrement.push({
      rowIndex: rowIndex - 1,
      columnIndex,
    });
  }
};

const generateTopRightStep = ({
  rowIndex,
  columnIndex,
  octopuses,
  toIncrement,
}: GenerateNewStepsParams) => {
  if (
    rowIndex > 0 &&
    columnIndex < octopuses[rowIndex].length - 1 &&
    octopuses[rowIndex - 1][columnIndex + 1] < 10
  ) {
    toIncrement.push({
      rowIndex: rowIndex - 1,
      columnIndex: columnIndex + 1,
    });
  }
};

const generateLeftStep = ({
  rowIndex,
  columnIndex,
  octopuses,
  toIncrement,
}: GenerateNewStepsParams) => {
  if (columnIndex > 0 && octopuses[rowIndex][columnIndex - 1] < 10) {
    toIncrement.push({
      rowIndex,
      columnIndex: columnIndex - 1,
    });
  }
};

const generateRightStep = ({
  rowIndex,
  columnIndex,
  octopuses,
  toIncrement,
}: GenerateNewStepsParams) => {
  if (columnIndex < octopuses[rowIndex].length - 1 && octopuses[rowIndex][columnIndex + 1] < 10) {
    toIncrement.push({
      rowIndex,
      columnIndex: columnIndex + 1,
    });
  }
};

const generateBottomLeftStep = ({
  rowIndex,
  columnIndex,
  octopuses,
  toIncrement,
}: GenerateNewStepsParams) => {
  if (
    rowIndex < octopuses.length - 1 &&
    columnIndex > 0 &&
    octopuses[rowIndex + 1][columnIndex - 1] < 10
  ) {
    toIncrement.push({
      rowIndex: rowIndex + 1,
      columnIndex: columnIndex - 1,
    });
  }
};

const generateBottomStep = ({
  rowIndex,
  columnIndex,
  octopuses,
  toIncrement,
}: GenerateNewStepsParams) => {
  if (rowIndex < octopuses.length - 1 && octopuses[rowIndex + 1][columnIndex] < 10) {
    toIncrement.push({
      rowIndex: rowIndex + 1,
      columnIndex,
    });
  }
};

const generateBottomRightStep = ({
  rowIndex,
  columnIndex,
  octopuses,
  toIncrement,
}: GenerateNewStepsParams) => {
  if (
    rowIndex < octopuses.length - 1 &&
    columnIndex < octopuses[rowIndex].length - 1 &&
    octopuses[rowIndex + 1][columnIndex + 1] < 10
  ) {
    toIncrement.push({
      rowIndex: rowIndex + 1,
      columnIndex: columnIndex + 1,
    });
  }
};

export const countFlashes = (octopusRows: Array<string>, step: number): number => {
  let octopuses: Array<Array<number>> = octopusRows.map(octopusRow =>
    octopusRow
      .split('')
      .filter(Boolean)
      .map((octopus: string) => Number.parseInt(octopus)),
  );
  let flashes = 0;
  for (let i = 0; i < step; i++) {
    octopuses = simulateStep(octopuses);
    flashes += octopuses.reduce(
      (mapSum, row) =>
        mapSum + row.reduce((rowSum, octopus) => rowSum + (octopus === 0 ? 1 : 0), 0),
      0,
    );
  }
  return flashes;
};

export const getStepWhenAllFlashes = (octopusRows: Array<string>): number => {
  let octopuses: Array<Array<number>> = octopusRows.map(octopusRow =>
    octopusRow
      .split('')
      .filter(Boolean)
      .map((octopus: string) => Number.parseInt(octopus)),
  );
  let lastFlash = 0;
  let step = 0;
  while (lastFlash !== 100) {
    octopuses = simulateStep(octopuses);
    lastFlash = octopuses.reduce(
      (mapSum, row) =>
        mapSum + row.reduce((rowSum, octopus) => rowSum + (octopus === 0 ? 1 : 0), 0),
      0,
    );
    step += 1;
  }
  return step;
};
