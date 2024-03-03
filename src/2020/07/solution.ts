function getBagMap(bagLines: Array<string>): Record<string, Array<{count: number; type: string}>> {
  return bagLines.reduce((map, bagLine) => {
    const targetBag = /^\w+\s\w+/.exec(bagLine)[0];
    const canContain = (/\d\s\w+\s\w+/g.exec(bagLine) || []).map(
      withNumber => {
        const {count, type} = 
          /(?<count>\d)\s(?<type>\w+\s\w+)/.exec(withNumber).groups;
        return {
          count: parseInt(count),
          type,
        };
      }
    );
    return {
      ...map,
      [targetBag]: canContain,
    };
  }, {});
}

export function countBagsCanContain(bagLines: Array<string>, targetBagType: string): number {
  const bagMap = getBagMap(bagLines);
  const bagsToCheck = [targetBagType];
  let bagCount = 0;
  for (const bagToCheck of bagsToCheck) {
    const parentBags = Object.entries(bagMap)
      .reduce((canContainBags, [bagKey, canContain]) => {
        if (canContain.map(({type}) => type).includes(bagToCheck)) {
          canContainBags.push(bagKey);
        }
        return canContainBags;
      }, [])
      .filter(bag => !bagsToCheck.includes(bag))
      .map(bag => {
        bagsToCheck.push(bag);
        return bag;
      });
    bagCount += parentBags.length;
  }
  return bagCount;
}

export function individualBagRequired(bagLines: Array<string>, targetBagType: string): number {
  const bagMap = getBagMap(bagLines);
  return getCountForBag(1, bagMap, targetBagType) - 1;
}

export function getCountForBag(currentCount: number, bagMap: Record<string, Array<{ count: number; type: string}>>, targetBagType: string): number {
  const canContain = bagMap[targetBagType];
  if (!canContain.length) {
    return currentCount;
  }
  return (
    currentCount +
    canContain.reduce(
      (sum, {type, count}) =>
        sum + getCountForBag(currentCount * count, bagMap, type),
      0
    )
  );
}
