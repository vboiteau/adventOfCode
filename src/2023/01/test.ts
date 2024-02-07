import path from 'path';
import { getFileLines } from '../../fileReader';
import { solution01, solution02 } from './solution';

test.each`
  test_file        | expected_value
  ${'example.txt'} | ${142}
`('test problem1', async ({ test_file, expected_value }) => {
  const lines = await getFileLines(path.join(__dirname, test_file));
  expect(solution01(lines)).toEqual(expected_value);
});

test.each`
  test_file        | expected_value
  ${'example2.txt'} | ${281}
`('test problem2', async ({ test_file, expected_value }) => {
  const lines = await getFileLines(path.join(__dirname, test_file));
  expect(solution02(lines)).toEqual(expected_value);
});
