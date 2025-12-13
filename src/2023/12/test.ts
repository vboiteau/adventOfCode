import { join } from 'path';
import { getFileLines } from '@aoc/file-reader';
import { solution } from './solution';

test.each`
  file               | repeatCount | expected
  ${'example01.txt'} | ${1}        | ${21}
  ${'example01.txt'} | ${5}        | ${525152}
`(
  'test problem01 with $file and repeatCount $repeatCount and expect $expected',
  async ({ file, expected, repeatCount }) => {
    const input = await getFileLines(join(__dirname, file));
    expect(solution(input, repeatCount)).toEqual(expected);
  },
);
