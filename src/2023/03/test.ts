import path from "path";
import { getFileLines } from "../../fileReader";
import { solution01, solution02 } from "./solution";

test.each`
file | expected
${'example.txt'} | ${4361}
${'input.txt'} | ${525119}
`('test problem 1', async ({ file, expected }) => {
    const lines = await getFileLines(path.join(__dirname, file));
    expect(solution01(lines)).toBe(expected);
});

test.each`
file | expected
${'example.txt'} | ${467835}
${'input.txt'} | ${76504829}
`('test problem 1', async ({ file, expected }) => {
    const lines = await getFileLines(path.join(__dirname, file));
    expect(solution02(lines)).toBe(expected);
});
