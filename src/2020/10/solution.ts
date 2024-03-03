export function getDifferentialProduct(adapters: Array<number>): number {
  const joltages: Array<number> = buildJoltagesList(adapters);
  const differential: Array<number> = joltages.reduce(
    (diff: Array<number>, joltage: number, index: number) => {
      if (index > 0) {
        const difference = joltage - joltages[index - 1];
        if (diff[difference] === undefined) {
          diff[difference] = 1;
        } else {
          diff[difference] += 1;
        }
      }
      return diff;
    },
    []
  );
  return differential[1] * differential[3];
}

export function getDistinctArrangements(adapters: Array<number>): number {
  const joltages: Array<number> = buildJoltagesList(adapters);
  return joltages
    .reduce(
      (arrangements: Array<number>, joltage: number, index: number) => {
        if (index > 0) {
          const previousJoltage: number = joltages[index - 1];
          arrangements = branchArrangementsWithJump(
            joltages,
            joltage,
            previousJoltage,
            arrangements,
            1
          );
          arrangements = branchArrangementsWithJump(
            joltages,
            joltage,
            previousJoltage,
            arrangements,
            2
          );
          arrangements[joltage] += arrangements[previousJoltage];
        } else {
          arrangements[0] = 1;
        }
        return arrangements;
      },
      new Array(joltages[joltages.length - 1] + 1).fill(0)
    )
    .pop();
}

export function branchArrangementsWithJump(
  joltages: Array<number>,
  joltage: number,
  previousJoltage: number,
  arrangements: Array<number>,
  jump: number
): Array<number> {
  if (previousJoltage === joltage - 1 && joltages.includes(joltage + jump)) {
    arrangements[joltage + jump] += arrangements[previousJoltage];
  }
  return arrangements;
}

function buildJoltagesList(adapters: Array<number>): Array<number> {
  const joltages = [0, ...adapters.toSorted((a, b) => a - b)];
  joltages.push(joltages[joltages.length - 1] + 3);
  return joltages;
}
