import {
  getOccupiedSeatAtTheEnd,
  SeatState,
  countOccupiedSeatAround,
  countOccupiedNextSeat,
} from './solution';
import { resolve, join } from 'path';
import { getFileLines } from '../../fileReader';

test.each`
  file           | counter                    | maxOccupied | occupiedSeats
  ${'test.txt'}  | ${countOccupiedSeatAround} | ${4}        | ${37}
  ${'test.txt'}  | ${countOccupiedNextSeat}   | ${5}        | ${26}
`(
  'Given a seat plan in $file when getOccupiedSeatAtTheEnd is called then the returned occupiedSeats should be $occupiedSeat',
  async ({ file, occupiedSeats, counter, maxOccupied }) => {
    const seatPlanFile = resolve(join(__dirname, file));
    const seatPlan: Array<Array<SeatState>> = (
      await getFileLines(seatPlanFile)
    ).map((seatRow: string) => seatRow.split(''));
    expect(getOccupiedSeatAtTheEnd(seatPlan, counter, maxOccupied)).toBe(
      occupiedSeats
    );
  }
);
