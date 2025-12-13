const fibonacci = (num: number): number => {
  let a: number = 1;
  let sum: number = 0;

  while (num >= a) {
    sum += a;
    a++;
  }

  return sum;
};

export const getFuelCost = (crabSubmarinePositions: string): number => {
  const positions: Array<number> = crabSubmarinePositions
    .split(',')
    .map(position => Number.parseInt(position))
    .sort((a, b) => a - b);
  const min = positions[0];
  const max = positions[positions.length - 1];
  const fuelCosts = [];
  for (let i = min; i <= max; i++) {
    fuelCosts[i] = positions.reduce((fuelCost, position) => fuelCost + Math.abs(position - i), 0);
  }

  return Math.min(...fuelCosts);
};

export const getFibonnaciFuelCost = (crabSubmarinePositions: string): number => {
  const positions: Array<number> = crabSubmarinePositions
    .split(',')
    .map(position => Number.parseInt(position))
    .sort((a, b) => a - b);
  const min = positions[0];
  const max = positions[positions.length - 1];
  const fuelCosts = [];
  for (let i = min; i <= max; i++) {
    fuelCosts[i] = positions.reduce(
      (fuelCost, position) => fuelCost + fibonacci(Math.abs(position - i)),
      0,
    );
  }

  return Math.min(...fuelCosts);
};
