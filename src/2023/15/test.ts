import { getFileContent } from '@aoc/file-reader';
import { join } from 'path';
import { getResult, getLensPower } from './solution';

test.each`
  file             | expectedResult
  ${'example.txt'} | ${1320}
`(
  'Given the list of hash in file $file when getResult is ran then return $expectedResult',
  async ({ file, expectedResult }) => {
    const hashList = await getFileContent(join(__dirname, file));
    expect(getResult(hashList)).toBe(expectedResult);
  },
);

test.each`
  file             | expectedResult
  ${'example.txt'} | ${145}
`(
  'Given the list of hash in file $file when getLensPower is ran then return $expectedResult',
  async ({ file, expectedResult }) => {
    const hashList = await getFileContent(join(__dirname, file));
    expect(getLensPower(hashList)).toBe(expectedResult);
  },
);
