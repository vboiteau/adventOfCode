import { EOL } from 'os';
const rotateClockWise = panel => {
  const rotatedPanel = [];
  for (let columnIndex = 0; columnIndex < panel[0].length; columnIndex++) {
    let newRow = '';
    for (const row of panel) {
      newRow = row[columnIndex] + newRow;
    }
    rotatedPanel.push(newRow);
  }
  return rotatedPanel;
};
const getStops = panelRow => {
  const stops = [];
  for (let index = 0; index < panelRow.length; index++) {
    if (panelRow[index] === '#') {
      stops.push(index);
    }
  }
  stops.push(panelRow.length);
  return stops;
};
const getRoundRocksBetweenStops = (panelRow, start, end) => {
  let roundRocks = 0;
  for (let index = start; index < end; index++) {
    if (panelRow[index] === 'O') {
      roundRocks++;
    }
  }
  return roundRocks;
};
const getRoundRocksPerRow = panelRow => {
  return getStops(panelRow).reduce(
    (acc, stop, index, stops) => ({
      ...acc,
      [stop]: getRoundRocksBetweenStops(panelRow, index > 0 ? stops[index - 1] : 0, stop),
    }),
    {},
  );
};
const setCharAt = (str, index, chr) => {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
};
const processMovement = (roundRocksPositions, rowLength) => {
  let newRow = '.'.repeat(rowLength);
  for (const [stop, count] of Object.entries(roundRocksPositions)) {
    if (Number(stop) < rowLength) {
      newRow = setCharAt(newRow, Number(stop), '#');
    }
    for (let i = 1; i <= count; i++) {
      newRow = setCharAt(newRow, Number(stop) - i, 'O');
    }
  }
  return newRow;
};
const getRowLoad = roundRocksPositions => {
  return roundRocksPositions
    .split('')
    .reduce((sum, char, index) => sum + (char === 'O' ? index + 1 : 0), 0);
};
const getPanelLoad = panel => {
  return panel.reduce((sum, stops) => sum + getRowLoad(stops), 0);
};
const tiltPanel = panel => {
  const rotatedPanel = rotateClockWise(panel);
  return rotatedPanel.map(row => processMovement(getRoundRocksPerRow(row), row.length));
};
export const getTiltedPanelLoad = panel => {
  return getPanelLoad(tiltPanel(panel));
};
export const getLoadAfterCycles = (panel, cycles) => {
  let rotatedPanel = [...panel];
  const cache = {};
  for (let currentCycle = 0; currentCycle < cycles; currentCycle++) {
    for (let rotationInCycle = 0; rotationInCycle < 4; rotationInCycle++) {
      const currentPanel = rotatedPanel.join(EOL);
      const foundInCache = cache[currentPanel];
      if (foundInCache && foundInCache.rotationIndex === 0) {
        const willHitAtMaxCycle =
          (cycles - currentCycle) / (currentCycle - foundInCache.cycleIndex);
        if (Number.isInteger(willHitAtMaxCycle)) {
          return getPanelLoad(rotateClockWise(rotatedPanel));
        }
      }
      cache[currentPanel] ??= { cycleIndex: currentCycle, rotationIndex: rotationInCycle };
      rotatedPanel = tiltPanel(rotatedPanel);
    }
  }
};
