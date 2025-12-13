const legalMapping = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};
const corruptionPoint = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};
const completionPoint = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};
const getLineState = input =>
  input
    .split('')
    .filter(Boolean)
    .reduce(
      (lineState, character) => {
        if (lineState.firstCorruption) {
          return lineState;
        }
        if (Object.keys(legalMapping).includes(character)) {
          lineState.endState.push(character);
          return lineState;
        }
        if (legalMapping[lineState.endState[lineState.endState.length - 1]] === character) {
          lineState.endState.pop();
          return lineState;
        }
        lineState.firstCorruption = character;
        return lineState;
      },
      { endState: [], firstCorruption: '' },
    );
export const getCorruptionPoints = input => {
  const lineStates = input.map(getLineState);
  const corruptions = lineStates
    .filter(({ firstCorruption }) => Boolean(firstCorruption))
    .reduce((current, { firstCorruption }) => {
      if (!current[firstCorruption]) {
        current[firstCorruption] = 0;
      }
      current[firstCorruption] += 1;
      return current;
    }, {});
  return Object.entries(corruptions).reduce(
    (sum, [character, occurence]) => sum + corruptionPoint[character] * occurence,
    0,
  );
};
const getAutoCompletionPoint = autoComplete =>
  autoComplete.reduce((sum, character) => sum * 5 + completionPoint[character], 0);
export const getCompletionPoints = input => {
  const lineStates = input.map(getLineState);
  const autoCompletion = lineStates
    .filter(({ firstCorruption }) => !firstCorruption)
    .map(({ endState }) =>
      getAutoCompletionPoint(endState.toReversed().map(character => legalMapping[character])),
    )
    .sort((a, b) => a - b);
  return autoCompletion[Math.floor(autoCompletion.length / 2)];
};
