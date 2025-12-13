const sum = depths => depths.reduce((sum, depth) => sum + Number.parseInt(depth), 0);
export const getDepthIncreaseWindowCount = (depths, windowSize) =>
  depths.reduce((increaseCount, _, index) => {
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
