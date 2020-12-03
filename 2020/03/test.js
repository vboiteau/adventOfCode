import {getFilePath, getFileLines} from "../../fileReader";
import {countTreeEncountered, combineSlopes} from './solution';

test.each`
file | rightJump | downJump | treeEncountered
${'test.txt'} | ${3} | ${1} | ${7}
${'input.txt'} | ${3} | ${1} | ${230}
`(
    'Given a file $file when countTreeEncountered then number of three returned should be $treeEncountered.',
    async ({ file, rightJump, downJump, treeEncountered }) => {
        const filePath = getFilePath(import.meta.url, file);
        expect(countTreeEncountered(await getFileLines(filePath), rightJump, downJump)).toBe(treeEncountered);
    }
);

test.each`
file | treeProduct
${'test.txt'} | ${336}
${'input.txt'} | ${9533698720}
`(
    'Given a file $file when combineSlopes with slopes list then tree product should be $treeProduct',
    async ({ file, treeProduct }) => {
        const filePath = getFilePath(import.meta.url, file);
        const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
        expect(combineSlopes(await getFileLines(filePath), slopes)).toBe(treeProduct);
    }
)
