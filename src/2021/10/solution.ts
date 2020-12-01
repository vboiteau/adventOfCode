const legalMapping: {[key: string]: string} = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const corruptionPoint: {[key: string]: number} = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const completionPoint: {[key: string]: number} = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

interface LineState {
  endState: Array<string>;
  firstCorruption: string;
}

const getLineState = (input: string): LineState =>
  input
    .split('')
    .filter(Boolean)
    .reduce(
      (lineState: LineState, character: string) => {
        if (lineState.firstCorruption) {
          return lineState;
        }
        if (Object.keys(legalMapping).includes(character)) {
          lineState.endState.push(character);
          return lineState;
        }
        if (
          legalMapping[lineState.endState[lineState.endState.length - 1]] ===
          character
        ) {
          lineState.endState.pop();
          return lineState;
        }
        lineState.firstCorruption = character;
        return lineState;
      },
      {endState: [], firstCorruption: ''}
    );

export const getCorruptionPoints = (input: Array<string>): number => {
  const lineStates = input.map(getLineState);
  const corruptions = lineStates
    .filter(({firstCorruption}) => Boolean(firstCorruption))
    .reduce(
      (current, {firstCorruption}) => {
        if (!current[firstCorruption]) {
          current[firstCorruption] = 0;
        }
        current[firstCorruption] += 1;
        return current;
      },
      {} as {[key: string]: number}
    );
  return Object.entries(corruptions).reduce(
    (sum, [character, occurence]) =>
      sum + corruptionPoint[character] * occurence,
    0
  );
};

const getAutoCompletionPoint = (autoComplete: Array<string>): number =>
  autoComplete.reduce(
    (sum, character) => sum * 5 + completionPoint[character],
    0
  );

export const getCompletionPoints = (input: Array<string>): number => {
  const lineStates = input.map(getLineState);
  const autoCompletion = lineStates
    .filter(({firstCorruption}) => !firstCorruption)
    .map(({endState}) =>
      getAutoCompletionPoint(
        endState.reverse().map(character => legalMapping[character])
      )
    )
    .sort((a, b) => a - b);
  return autoCompletion[Math.floor(autoCompletion.length / 2)];
};
