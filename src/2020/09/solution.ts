import {twoSum} from '../01/solution.js';

export function getFirstXmasException(
  ports: Array<number>,
  preambleLength: number
): number {
  for (let i = preambleLength, len = ports.length; i < len - 1; i++) {
    const previousPorts = ports.slice(i - preambleLength, i);
    const currentPort = ports[i];
    const found = twoSum(currentPort, previousPorts);
    if (!found) {
      return currentPort;
    }
  }
}

export function getHackValue(
  ports: Array<number>,
  preambleLength: number
): number {
  const exception: number = getFirstXmasException(ports, preambleLength);
  const list: Array<number> = getContiguousSerieAddingToTarget(
    ports,
    exception
  );
  const hackValue: number = Math.min(...list) + Math.max(...list);
  return hackValue;
}

function getContiguousSerieAddingToTarget(
  ports: Array<number>,
  target: number
): Array<number> {
  let startIndex = 0;
  for (let i = 1, len = ports.length; i < len; i++) {
    let sum = getSumBetweenIndex(ports, startIndex, i);
    while (sum > target) {
      startIndex += 1;
      sum = getSumBetweenIndex(ports, startIndex, i);
    }
    if (sum === target) {
      return ports.slice(startIndex, i);
    }
  }
}

function getSumBetweenIndex(
  ports: Array<number>,
  startIndex: number,
  endIndex: number
): number {
  return ports.slice(startIndex, endIndex).reduce((sum, port) => sum + port, 0);
}
