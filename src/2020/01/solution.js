export function twoSum(target, list) {
  const first = list.find(number => list.includes(target - number));
  return first && first * (target - first);
}

export function threeSum(target, list) {
  for (const number of list) {
    const mult = twoSum(target - number, list);
    if (mult) {
      return mult * number;
    }
  }
}
