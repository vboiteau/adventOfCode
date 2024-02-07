import { getFileLines } from '../../fileReader';
import { resolve, join } from 'path';
import {
  countValidPasswords,
  validateLetterCount,
  validateLetterXOR,
} from './solution';

test.each`
  file           | validator              | expected
  ${'test.txt'}  | ${validateLetterCount} | ${2}
  ${'test.txt'}  | ${validateLetterXOR}   | ${1}
`(
  'Given the file $file when calling countValidPassword with validator $validator then $expected should be returned.',
  async ({ file, validator, expected }) => {
    const filePath = resolve(join(__dirname, file));
    expect(countValidPasswords(await getFileLines(filePath), validator)).toBe(
      expected
    );
  }
);
