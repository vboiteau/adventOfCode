function getBagMap(bagLines) {
  return bagLines.reduce((map, bagLine) => {
    const targetBag = bagLine.match(/^\w+\s\w+/)[0];
    const canContain = (bagLine.match(/\d\s\w+\s\w+/g) || []).map(
      withNumber => {
        const {count, type} = withNumber.match(
          /(?<count>\d)\s(?<type>\w+\s\w+)/
        ).groups;
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

export function countBagsCanContain(bagLines, targetBagType): Test {
  const bagMap = getBagMap(bagLines);
  const bagsToCheck = [targetBagType];
  let bagCount = 0;
  for (let i = 0; i < bagsToCheck.length; i++) {
    const bagToCheck = bagsToCheck[i];
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

export function individualBagRequired(bagLines, targetBagType): Test {
  const bagMap = getBagMap(bagLines);
  return getCountForBag(1, bagMap, targetBagType) - 1;
}

export function getCountForBag(currentCount, bagMap, targetBagType) {
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
