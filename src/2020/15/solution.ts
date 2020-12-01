export function getNthNumberSpoken(
  nth: number,
  startingNumbers: number[]
): number {
  const sequence: Map<number, number> = startingNumbers.reduce(
    (map, value, index) => {
      map.set(value, index);
      return map;
    },
    new Map()
  );
  let numberToCheck = startingNumbers[startingNumbers.length - 1];
  try {
    let count = startingNumbers.length - 1;
    while (count < nth - 1) {
      const lastSpokenIndex = sequence.get(numberToCheck);
      sequence.set(numberToCheck, count);
      numberToCheck =
        lastSpokenIndex !== undefined ? count - lastSpokenIndex : 0;
      count++;
    }
    return numberToCheck;
  } catch (error) {
    console.error(error);
  }
}
