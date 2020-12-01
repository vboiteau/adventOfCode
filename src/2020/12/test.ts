import {
  getLastPosition,
  getLastPositionWithWaypoint,
  getMarithanPosition,
} from './solution';
import {resolve, join} from 'path';
import {getFileLines} from '../../fileReader';

test.each`
  file           | lastPosition
  ${'test.txt'}  | ${[17, 8]}
  ${'input.txt'} | ${[-565, 358]}
`(
  'Given a instruction list in $file when geigetLastPosition is called then the returned lastPostion should be $lastPosition',
  async ({file, lastPosition}) => {
    const instructionsFile = resolve(join(__dirname, file));
    const instructions: Array<string> = await getFileLines(instructionsFile);
    expect(getLastPosition(instructions)).toEqual(lastPosition);
  }
);

test.each`
  file           | positionCalculator             | marithanPosition
  ${'test.txt'}  | ${getLastPosition}             | ${25}
  ${'input.txt'} | ${getLastPosition}             | ${923}
  ${'test.txt'}  | ${getLastPositionWithWaypoint} | ${286}
  ${'input.txt'} | ${getLastPositionWithWaypoint} | ${24769}
`(
  'Given a instruction list in $file when geigetLastPosition is called then the returned lastPostion should be $marithanPosition',
  async ({file, marithanPosition, positionCalculator}) => {
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
  ${'input.txt'} | ${[-22839, -1930]}
`(
  'Given a instruction list in $file when getLastPositionWithWaypoint is called then the returned lastPostion should be $lastPosition',
  async ({file, lastPosition}) => {
    const instructionsFile = resolve(join(__dirname, file));
    const instructions: Array<string> = await getFileLines(instructionsFile);
    expect(getLastPositionWithWaypoint(instructions)).toEqual(lastPosition);
  }
);
