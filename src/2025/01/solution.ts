export const solution01 = (lines: string[]): number => {
  let current = 50;
  let zeroCount = 0;
  for (const line of lines) {
    const {
      groups: { direction, count },
    } = /^(?<direction>[LR])(?<count>\d+)$/.exec(line);
    switch (direction) {
      case 'L':
        current = (current - Number(count) + 100) % 100;
        break;
      case 'R':
        current = (current + Number(count)) % 100;
        break;
    }
    if (current === 0) {
      zeroCount++;
    }
  }
  return zeroCount;
};

export const solution02 = (lines: string[]): number => {
  let current = 50;
  let zeroCount = 0;
  for (const line of lines) {
    const {
      groups: { direction, countString },
    } = /^(?<direction>[LR])(?<countString>\d+)$/.exec(line);
    const count = Number(countString);
    const fullTurns = Math.floor(count / 100);
    console.log(fullTurns, count);
    zeroCount += fullTurns;
    const countRest = count % 100;
    switch (direction) {
      case 'L':
        const beforeResetL = current - Number(countRest);
        if (beforeResetL <= 0 && current !== 0) {
          zeroCount++;
        }
        current = (beforeResetL + 100) % 100;
        break;
      case 'R':
        const beforeResetR = current + Number(countRest);
        if (beforeResetR >= 100 && current !== 0) {
          zeroCount++;
        }
        current = beforeResetR % 100;
        break;
    }
  }
  return zeroCount;
};
