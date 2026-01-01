import path from 'path';
import { getFileLines } from '@aoc/file-reader';
import { getAccessibleRollsCount, getAccessibleRollsUntilStaleCount } from './solution';

test.each`
  testFile         | expectedValue
  ${'example.txt'} | ${13}
`('Test problem 1', async ({ testFile, expectedValue }) => {
  const lines = await getFileLines(path.join(__dirname, testFile));
  expect(getAccessibleRollsCount(lines)).toBe(expectedValue);
});

test.each`
  testFile         | expectedValue
  ${'example.txt'} | ${43}
`('Test problem 2', async ({ testFile, expectedValue }) => {
  const lines = await getFileLines(path.join(__dirname, testFile));
  expect(getAccessibleRollsUntilStaleCount(lines)).toBe(expectedValue);
});
