import {
  getLastPosition,
  getLastPositionWithWaypoint,
  getMarithanPosition,
} from './solution';
import { resolve, join } from 'path';
import { getFileLines } from '../../fileReader';

test.each`
  file           | lastPosition
  ${'test.txt'}  | ${[17, 8]}
`(
  'Given a instruction list in $file when geigetLastPosition is called then the returned lastPostion should be $lastPosition',
  async ({ file, lastPosition }) => {
    const instructionsFile = resolve(join(__dirname, file));
    const instructions: Array<string> = await getFileLines(instructionsFile);
    expect(getLastPosition(instructions)).toEqual(lastPosition);
  }
);

test.each`
  file           | positionCalculator             | marithanPosition
  ${'test.txt'}  | ${getLastPosition}             | ${25}
  ${'test.txt'}  | ${getLastPositionWithWaypoint} | ${286}
`(
  'Given a instruction list in $file when geigetLastPosition is called then the returned lastPostion should be $marithanPosition',
  async ({ file, marithanPosition, positionCalculator }) => {
    const instructionsFile = resolve(join(__dirname, file));
    const instructions: Array<string> = await getFileLines(instructionsFile);
    expect(getMarithanPosition(instructions, positionCalculator)).toEqual(
      marithanPosition
    );
  }
);

test.each`
  file           | lastPosition
  ${'test.txt'}  | ${[214, 72]}
`(
  'Given a instruction list in $file when getLastPositionWithWaypoint is called then the returned lastPostion should be $lastPosition',
  async ({ file, lastPosition }) => {
    const instructionsFile = resolve(join(__dirname, file));
    const instructions: Array<string> = await getFileLines(instructionsFile);
    expect(getLastPositionWithWaypoint(instructions)).toEqual(lastPosition);
  }
);
