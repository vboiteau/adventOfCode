import { getSeatId, getHighestSeatId } from './solution';
import { resolve, join } from 'path';
import { getFileLines } from '../../fileReader';

test.each`
  seat            | id
  ${'BFFFBBFRRR'} | ${567}
  ${'FFFBBBFRRR'} | ${119}
  ${'BBFFBBFRLL'} | ${820}
`(
  'Given a seat $seatIndication when calling the function getSeatId then the return value should be $id',
  ({ seat, id }) => {
    expect(getSeatId(seat)).toBe(id);
  }
);

test.each`
  file           | id
  ${'test.txt'}  | ${820}
`(
  'Given a seat indication list $file when calling the function getHighestSeatId then the return value should be $id',
  async ({ file, id }) => {
    const filePath = resolve(join(__dirname, file));
    expect(getHighestSeatId(await getFileLines(filePath))).toBe(id);
  }
);

