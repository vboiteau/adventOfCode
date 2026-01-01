import path from 'path';
import { getFileLines } from '@aoc/file-reader';
import { solution01, solution02 } from './solution';

test.each`
  testFile         | expectedValue
  ${'example.txt'} | ${357}
`('Test problem 1', async ({ testFile, expectedValue }) => {
  const lines = await getFileLines(path.join(__dirname, testFile));
  expect(solution01(lines)).toBe(expectedValue);
});

test.each`
  testFile         | expectedValue
  ${'example.txt'} | ${3121910778619}
`('Test problem 2', async ({ testFile, expectedValue }) => {
  const lines = await getFileLines(path.join(__dirname, testFile));
  expect(solution02(lines)).toBe(expectedValue);
});
