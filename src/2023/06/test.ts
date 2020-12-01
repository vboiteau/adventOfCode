import path from "path";
import { getFileLines } from "../../fileReader";
import { solution01, solution02 } from "./solution";

test.each`
file | expected
${'example.txt'} | ${288}
${'input.txt'} | ${2449062}
`('test problem 1', async ({ file, expected }) => {
    const lines = await getFileLines(path.join(__dirname, file));
    expect(solution01(lines)).toBe(expected);
});

test.each`
file | expected
${'example.txt'} | ${71503}
${'input.txt'} | ${33149631}
`('test problem 2', async ({ file, expected }) => {
    const lines = await getFileLines(path.join(__dirname, file));
    expect(solution02(lines)).toBe(expected);
});
