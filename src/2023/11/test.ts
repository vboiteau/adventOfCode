import { join } from 'path';
import { getFileLines } from '../../fileReader';
import { solution01 } from './solution';

test.each`
file | expansionFactor | expected
${'example01.txt'} | ${2} | ${374}
${'input.txt'} | ${2} | ${9556896}
${'example01.txt'} | ${10} | ${1030}
${'example01.txt'} | ${100} | ${8410}
${'input.txt'} | ${1_000_000} | ${685038186836}
`('test problem01 with $file with expansionFactor of $expansionFactor and expect $expected', async ({ file, expansionFactor, expected }) => {
    const input = await getFileLines(join(__dirname, file));
    expect(solution01(input, expansionFactor)).toEqual(expected);
});
