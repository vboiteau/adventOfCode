import { countBagsCanContain, individualBagRequired } from './solution';
import { getFileLines } from '../../fileReader';
import { join, resolve } from 'path';

test.each`
  file           | countCanContain
  ${'test.txt'}  | ${4}
`(
  'Given a input $input when calling function then the result should be returned.',
  async ({ file, countCanContain }) => {
    const fileLines = await getFileLines(resolve(join(__dirname, file)));
    expect(countBagsCanContain(fileLines, 'shiny gold')).toBe(countCanContain);
  }
);

test.each`
  file           | countCanContain
  ${'test2.txt'} | ${126}
`(
  'Given a input $input when calling function then the result should be returned.',
  async ({ file, countCanContain }) => {
    const fileLines = await getFileLines(resolve(join(__dirname, file)));
    expect(individualBagRequired(fileLines, 'shiny gold')).toBe(
      countCanContain
    );
  }
);
