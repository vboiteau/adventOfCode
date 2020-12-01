import {readInputFileAsLines} from '../fileReader';
import {getNumberUsingSegmentA, sumOfTicks} from './solution';

test.each`
  filePath                            | expectedResult
  ${`${__dirname}/simpleExample.txt`} | ${0}
  ${`${__dirname}/example.txt`}       | ${26}
  ${`${__dirname}/input.txt`}         | ${310}
`(
  'Given a input $filePath when calling getFuelCost function should receive $expectedResult',
  async ({filePath, days, expectedResult}) => {
    const ticks = await readInputFileAsLines(filePath);
    expect(getNumberUsingSegmentA(ticks)).toBe(expectedResult);
  }
);

test.each`
  filePath                            | expectedResult
  ${`${__dirname}/simpleExample.txt`} | ${5353}
  ${`${__dirname}/example.txt`}       | ${61229}
  ${`${__dirname}/input.txt`}         | ${915941}
`(
  'Given a input $filePath when calling getFuelCost function should receive $expectedResult',
  async ({filePath, days, expectedResult}) => {
    const ticks = await readInputFileAsLines(filePath);
    expect(sumOfTicks(ticks)).toBe(expectedResult);
  }
);
