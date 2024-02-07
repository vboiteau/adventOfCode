import path from 'path';
import { getFileLines } from '../../fileReader';
import { solution01, solution02 } from './solution';

test.each`
file | expected
${'example.txt'} | ${6440}
`('problem01 $file should return $expected', async ({ file, expected }) => {
    const lines = await getFileLines(path.join(__dirname, file));
    expect(solution01(lines)).toBe(expected);
});

test.each`
file | expected
${'example.txt'} | ${5905}
`('problem02 $file should return $expected', async ({ file, expected }) => {
    const lines = await getFileLines(path.join(__dirname, file));
    expect(solution02(lines)).toBe(expected);
});
