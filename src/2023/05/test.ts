import path from "path";
import { getFileLines } from "../../fileReader";
import { solution01, solution02 } from "./solution";

test.each`
file | expected
${'example.txt'} | ${35}
${'input.txt'} | ${322500873}
`('test problem 1', async ({ file, expected }) => {
    const lines = await getFileLines(path.join(__dirname, file));
    expect(solution01(lines)).toBe(expected);
});

test.each`
file | expected
${'example.txt'} | ${46}
${'input.txt'} | ${108956227}
`('test problem 2', async ({ file, expected }) => {
    const lines = await getFileLines(path.join(__dirname, file));
    expect(solution02(lines)).toBe(expected);
});
