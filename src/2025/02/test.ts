import path from 'path';
import { getFileContent } from '@aoc/file-reader';
import { solution01, solution02 } from './solution';

test.skip.each`
  testFile         | expectedValue
  ${'example.txt'} | ${1227775554}
`('Test problem 1', async ({ testFile, expectedValue }) => {
  const content = await getFileContent(path.join(__dirname, testFile));
  expect(solution01(content)).toBe(expectedValue);
});

test.each`
  testFile         | expectedValue
  ${'example.txt'} | ${4174379265}
`('Test problem 2', async ({ testFile, expectedValue }) => {
  const content = await getFileContent(path.join(__dirname, testFile));
  expect(solution02(content)).toBe(expectedValue);
});
