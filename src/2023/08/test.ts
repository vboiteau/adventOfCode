import path from 'path';
import { getFileLines } from '../../fileReader';
import { solution01, solution02 } from './solution';

test.each`
file | expected
${'example.txt'} | ${2}
${'example2.txt'} | ${6}
${'input.txt'} | ${11567}
`('problem01 $file should return $expected', async ({ file, expected }) => {
    const lines = await getFileLines(path.join(__dirname, file));
    expect(solution01(lines)).toBe(expected);
});

test.each`
file | expected
${'example3.txt'} | ${6}
${'input.txt'} | ${9858474970153}
`('problem02 $file should return $expected', async ({ file, expected }) => {
    const lines = await getFileLines(path.join(__dirname, file));
    expect(solution02(lines)).toBe(expected);
});
