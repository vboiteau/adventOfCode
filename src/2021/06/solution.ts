const getInitialState = (fishReport: string): Array<number> =>
  fishReport
    .split(',')
    .map(dayUntilDup => Number.parseInt(dayUntilDup))
    .reduce((days, day) => {
      days[day] += 1;
      return days;
    }, new Array(9).fill(0));

export const getNumberOfLanternFishAtNthDay = (
  fishReport: string,
  dayCount: number
): number => {
  let state = getInitialState(fishReport);
  for (let i = 0; i < dayCount; i++) {
    const [dup, ...rest] = state;
    state = [...rest, dup];
    state[6] += dup;
  }
  return state.reduce((sum, day) => sum + day, 0);
};
