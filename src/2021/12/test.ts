import {readInputFileAsLines} from '../fileReader';
import {countPaths, countPathsWithDoubleVisits} from './solution';

test.each`
  filePath                           | expectedResult
  ${`${__dirname}/smallExample.txt`} | ${10}
  ${`${__dirname}/example.txt`}      | ${19}
  ${`${__dirname}/input.txt`}        | ${5254}
`(
  'Given a input $filePath when calling countPaths function should receive $expectedResult',
  async ({filePath, step, expectedResult}) => {
    const caveSystem = await readInputFileAsLines(filePath);
    expect(countPaths(caveSystem)).toBe(expectedResult);
  }
);

test.each`
  filePath                           | expectedResult
  ${`${__dirname}/smallExample.txt`} | ${36}
  ${`${__dirname}/example.txt`}      | ${103}
  ${`${__dirname}/input.txt`}        | ${149385}
`(
  'Given a input $filePath when calling countPathsWithDoubleVisits function should receive $expectedResult',
  async ({filePath, step, expectedResult}) => {
    const caveSystem = await readInputFileAsLines(filePath);
    expect(countPathsWithDoubleVisits(caveSystem)).toBe(expectedResult);
  }
);
