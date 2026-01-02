import path from 'path';
import { getFileLines } from '@aoc/file-reader';
import { getAvailableFreshIngredientsCount, getTotalFreshIngredientsCount } from './solution';

test.each`
  testFile         | expectedValue
  ${'example.txt'} | ${3}
`('Test problem 1', async ({ testFile, expectedValue }) => {
  const lines = await getFileLines(path.join(__dirname, testFile));
  expect(getAvailableFreshIngredientsCount(lines)).toBe(expectedValue);
});

test.each`
  testFile         | expectedValue
  ${'example.txt'} | ${14}
`('Test problem 2', async ({ testFile, expectedValue }) => {
  const lines = await getFileLines(path.join(__dirname, testFile));
  expect(getTotalFreshIngredientsCount(lines)).toBe(expectedValue);
});
