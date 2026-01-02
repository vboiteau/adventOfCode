import path from 'path';
import { getFileLines } from '@aoc/file-reader';
import { getHomeworkAnswer01, getHomeworkAnswer02 } from './solution';

test.each`
  testFile         | expectedValue
  ${'example.txt'} | ${4277556}
`('Test problem 1', async ({ testFile, expectedValue }) => {
  const lines = await getFileLines(path.join(__dirname, testFile));
  expect(getHomeworkAnswer01(lines)).toBe(expectedValue);
});

test.each`
  testFile         | expectedValue
  ${'example.txt'} | ${3263827}
`('Test problem 2', async ({ testFile, expectedValue }) => {
  const lines = await getFileLines(path.join(__dirname, testFile));
  expect(getHomeworkAnswer02(lines)).toBe(expectedValue);
});
