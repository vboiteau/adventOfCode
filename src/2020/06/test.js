import {getFileContent} from '../../fileReader';
import {resolve, join} from 'path';
import {getSumAnsweredAnyone, getSumAnsweredEveryone} from './solution';

test.each`
  file           | sum
  ${'test.txt'}  | ${11}
  ${'input.txt'} | ${6885}
`(
  'Given a file $file when calling getSumAnswered then the return value should be $sum',
  async ({file, sum}) => {
    const path = resolve(join(__dirname, file));
    expect(getSumAnsweredAnyone(await getFileContent(path, false))).toBe(sum);
  }
);

test.each`
  file           | sum
  ${'test.txt'}  | ${6}
  ${'input.txt'} | ${3550}
`(
  'Given a file $file when calling getSumAnswered then the return value should be $sum',
  async ({file, sum}) => {
    const path = resolve(join(__dirname, file));
    expect(getSumAnsweredEveryone(await getFileContent(path, false))).toBe(sum);
  }
);
