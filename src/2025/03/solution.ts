const getNumbersIndex = (
  numbers: Array<number>,
  targetLength: number,
  currentIndexes: Array<number>,
): Array<number> => {
  if (currentIndexes.length === targetLength) {
    return currentIndexes;
  }
  const haystackStart =
    currentIndexes.length > 0 ? currentIndexes[currentIndexes.length - 1] + 1 : 0;
  const haystack = numbers.slice(
    haystackStart,
    numbers.length - (targetLength - currentIndexes.length - 1),
  );
  const maxValue = Math.max(...haystack);
  const nextIndex = haystack.indexOf(maxValue) + haystackStart;
  return getNumbersIndex(numbers, targetLength, [...currentIndexes, nextIndex]);
};

export const getHighestJoltage = (bank: String, targetLength: number): number => {
  const numbers = bank.split('').map(number => Number(number));
  const indexes = getNumbersIndex(numbers, targetLength, []);
  const number = indexes.reduce((acc, index) => `${acc}${numbers[index]}`, '');
  return Number(number);
};

export const solution01 = (banks: Array<String>): number => {
  return banks.reduce((acc, bank) => acc + getHighestJoltage(bank, 2), 0);
};

export const solution02 = (banks: Array<String>): number => {
  return banks.reduce((acc, bank) => acc + getHighestJoltage(bank, 12), 0);
};
