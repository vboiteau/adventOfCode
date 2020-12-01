import {resolve, join} from 'path';
import {getFileLines} from '../../fileReader';
import {fixProgram, getAccumulatorBeforeSecondVisit} from './solution';

test.each`
  file           | beforeSecondVisit
  ${'test.txt'}  | ${5}
  ${'input.txt'} | ${1317}
`(
  'Given a file with instructions $file when getAccumulatorBeforeSecondVisit then the output value should be $beforeSecondVisit.',
  async ({file, beforeSecondVisit}) => {
    const filePath = resolve(join(__dirname, file));
    const fileLines = await getFileLines(filePath);
    expect(getAccumulatorBeforeSecondVisit(fileLines)).toBe(beforeSecondVisit);
  }
);

test.each`
  file           | accumulator
  ${'test.txt'}  | ${8}
  ${'input.txt'} | ${1033}
`(
  'Given a file with instructions $file when fixProgram then the output value should be $accumulator.',
  async ({file, accumulator}) => {
    const filePath = resolve(join(__dirname, file));
    const fileLines = await getFileLines(filePath);
    expect(fixProgram(fileLines)).toBe(accumulator);
  }
);
