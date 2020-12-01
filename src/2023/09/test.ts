import path from 'path';
import { getFileLines } from '../../fileReader';
import { solution01, solution02 } from './solution';

test.each`
file | expected
${'example.txt'} | ${114}
${'input.txt'} | ${1901217887}
`('problem01 $file should return $expected', async ({ file, expected }) => {
    const lines = await getFileLines(path.join(__dirname, file));
    expect(solution01(lines)).toBe(expected);
});

test.each`
file | expected
${'example.txt'} | ${2}
${'input.txt'} | ${905}
`('problem01 $file should return $expected', async ({ file, expected }) => {
    const lines = await getFileLines(path.join(__dirname, file));
    expect(solution02(lines)).toBe(expected);
});
