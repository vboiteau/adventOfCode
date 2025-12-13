import { join } from 'path';
import { getFileLines } from '../../fileReader';
import { solution01, solution02 } from './solution';
test.each`
  file               | expected
  ${'example01.txt'} | ${4}
  ${'example02.txt'} | ${8}
`('test problem01 with $file and expect $expected', async ({ file, expected }) => {
  const input = await getFileLines(join(__dirname, file));
  expect(solution01(input)).toEqual(expected);
});
test.each`
  file               | expected
  ${'example03.txt'} | ${4}
  ${'example04.txt'} | ${8}
  ${'example05.txt'} | ${10}
`('test problem02 with $file and expect $expected', async ({ file, expected }) => {
  const input = await getFileLines(join(__dirname, file));
  expect(solution02(input)).toEqual(expected);
});
