import {readInputFileAsLines} from '../fileReader';
import {getLosingScore, getWinningScore} from './solution';

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${4512}
  ${`${__dirname}/input.txt`}   | ${41503}
`(
  'Given a input $filePath when calling getWinningScore function should receive $expectedResult',
  async ({filePath, expectedResult}) => {
    const reportLines = await readInputFileAsLines(filePath);
    expect(getWinningScore(reportLines)).toBe(expectedResult);
  }
);

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${1924}
  ${`${__dirname}/input.txt`}   | ${3178}
`(
  'Given a input $filePath when calling getLastWinningScore function should receive $expectedResult',
  async ({filePath, expectedResult}) => {
    const reportLines = await readInputFileAsLines(filePath);
    expect(getLosingScore(reportLines)).toBe(expectedResult);
  }
);
