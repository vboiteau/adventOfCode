interface homeworkProblem {
  type: 'multiplication' | 'addition';
  values: Array<number>;
}

const convertHomeworkSheet = (input: Array<String>): Array<homeworkProblem> => {
  const homeworkSymbols: Array<Array<string>> = input.map(line => line.split(' ').filter(Boolean));
  if (homeworkSymbols.some(lineSymbols => lineSymbols.length !== homeworkSymbols[0].length)) {
    throw new Error('Inconsistent number of symbols per line');
  }
  let problems: Array<homeworkProblem> = [];
  for (let i = 0; i < homeworkSymbols[0].length; i++) {
    const values: Array<number> = [];
    for (let j = 0; j < homeworkSymbols.length - 1; j++) {
      values.push(Number(homeworkSymbols[j][i]));
    }
    problems.push({
      type: homeworkSymbols[homeworkSymbols.length - 1][i] === '+' ? 'addition' : 'multiplication',
      values,
    });
  }
  return problems;
};

const convertHomeworkSheetV2 = (input: Array<String>): Array<homeworkProblem> => {
  const homeworkSymbols: Array<Array<string>> = input.map(line => line.split(''));
  const numberLines = homeworkSymbols.slice(0, homeworkSymbols.length - 1);
  const numbers = homeworkSymbols[0].map((_, colIndex) => {
    let current = '';
    for (let rowIndex = 0; rowIndex < numberLines.length; rowIndex++) {
      if (numberLines[rowIndex][colIndex] !== ' ') {
        current += numberLines[rowIndex][colIndex];
      }
    }
    return Number(current);
  });
  const problems: Array<homeworkProblem> = [];
  for (let i = 0; i < numbers.length; i++) {
    if (
      homeworkSymbols[homeworkSymbols.length - 1][i] &&
      homeworkSymbols[homeworkSymbols.length - 1][i] !== ' '
    ) {
      problems.push({
        type:
          homeworkSymbols[homeworkSymbols.length - 1][i] === '+' ? 'addition' : 'multiplication',
        values: [],
      });
    }
    if (numbers[i] !== 0) {
      problems[problems.length - 1].values.push(numbers[i]);
    }
  }
  return problems;
};

const getProblemAnswer = (problem: homeworkProblem): number => {
  switch (problem.type) {
    case 'addition':
      return problem.values.reduce((acc, val) => acc + val, 0);
    case 'multiplication':
      return problem.values.reduce((acc, val) => acc * val, 1);
  }
};

export const getHomeworkAnswer01 = (input: Array<String>): number => {
  const homeworkSheet = convertHomeworkSheet(input);
  return homeworkSheet.reduce((acc, problem) => {
    return acc + getProblemAnswer(problem);
  }, 0);
};

export const getHomeworkAnswer02 = (input: Array<String>): number => {
  const homeworkSheet = convertHomeworkSheetV2(input);
  return homeworkSheet.reduce((acc, problem) => {
    return acc + getProblemAnswer(problem);
  }, 0);
};
