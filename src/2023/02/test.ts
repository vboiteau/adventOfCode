import path from "path";
import { getFileLines } from "../../fileReader";
import { solution01, solution02 } from "./solution";

test.each`
file | expected 
${'example.txt'} | ${8}
${'input.txt'} | ${2176}
`('test problem1', async ({ file, expected }) => {
    const lines = await getFileLines(path.join(__dirname, file));
    expect(solution01(lines)).toEqual(expected);
});

test.each`
file | expected 
${'example.txt'} | ${2286}
${'input.txt'} | ${63700}
`('test problem1', async ({ file, expected }) => {
    const lines = await getFileLines(path.join(__dirname, file));
    expect(solution02(lines)).toEqual(expected);
});
