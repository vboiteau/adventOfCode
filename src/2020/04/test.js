import {getFileLines} from '../../fileReader';
import {resolve, join} from 'path';
import {
  validatePassports,
  validatePassportKeys,
  validatePassportValues,
} from './solution';

test.each`
  file           | validator                 | validPassports
  ${'test.txt'}  | ${validatePassportKeys}   | ${2}
  ${'test.txt'}  | ${validatePassportValues} | ${2}
  ${'valid.txt'} | ${validatePassportValues} | ${4}
  ${'input.txt'} | ${validatePassportKeys}   | ${196}
  ${'input.txt'} | ${validatePassportValues} | ${114}
`(
  'Given a file $file when validatePassports with $validator validtor then number of three returned should be $validPassports.',
  async ({file, validPassports, validator}) => {
    const filePath = resolve(join(__dirname, file));
    expect(
      validatePassports(await getFileLines(filePath, false), validator)
    ).toBe(validPassports);
  }
);
