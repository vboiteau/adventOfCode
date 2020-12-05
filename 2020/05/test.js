import { getSeatId, getHighestSeatId, findMissingSeat } from './solution';
import {getFilePath, getFileLines} from "../../fileReader";

test.each`
seat | id
${'BFFFBBFRRR'} | ${567}
${'FFFBBBFRRR'} | ${119}
${'BBFFBBFRLL'} | ${820}`(
    'Given a seat $seatIndication when calling the function getSeatId then the return value should be $id',
    ({ seat, id }) => {
        expect(getSeatId(seat)).toBe(id);
    }
);

test.each`
file | id
${'test.txt'} | ${820}
${'input.txt'} | ${965}`(
    'Given a seat indication list $file when calling the function getHighestSeatId then the return value should be $id',
    async ({ file, id }) => {
        const filePath = getFilePath(import.meta.url, file);
        expect(getHighestSeatId(await getFileLines(filePath))).toBe(id);
    }
);

test(
    'Given a complete seat plan except one when findMissingSeat is called then the missing should be returned.',
    async () => {
        const filePath = getFilePath(import.meta.url, 'input.txt');
        expect(findMissingSeat(await getFileLines(filePath))).toBe(524);
    }
);
