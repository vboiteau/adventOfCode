const sum = (depths: Array<string>) =>
  depths.reduce((sum, depth) => sum + Number.parseInt(depth), 0);

export const getDepthIncreaseWindowCount = (depths: Array<string>, windowSize: number): number =>
  depths.reduce((increaseCount: number, _: string, index: number) => {
    if (
      index === 0 ||
      index > depths.length - windowSize ||
      sum(depths.slice(index, index + windowSize)) <=
        sum(depths.slice(index - 1, index + (windowSize - 1)))
    ) {
      return increaseCount;
    }
    return increaseCount + 1;
  }, 0);
