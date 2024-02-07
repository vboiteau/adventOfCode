import path from 'path';
import { getFileLines } from '../../fileReader';
import { solution01, solution02 } from './solution';

test.each`
file | expected
${'example.txt'} | ${13}
`('test problem 01', async ({ file, expected }) => {
    const result = await getFileLines(path.join(__dirname, file));
    expect(solution01(result)).toEqual(expected)
});

test.each`
file | expected
${'example.txt'} | ${30}
`('test problem 02', async ({ file, expected }) => {
    const result = await getFileLines(path.join(__dirname, file));
    expect(solution02(result)).toEqual(expected)
});
