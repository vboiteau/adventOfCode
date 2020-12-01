import {readInputFileAsLines} from '../fileReader';
import {getPowerConsumption, getLifeSupportRating} from './solution';

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${198}
  ${`${__dirname}/input.txt`}   | ${2743844}
`(
  'Given a input $filePath when calling getPowerConsumption function should receive $expectedResult',
  async ({filePath, expectedResult}) => {
    const reportLines = await readInputFileAsLines(filePath);
    expect(getPowerConsumption(reportLines)).toBe(expectedResult);
  }
);

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${230}
  ${`${__dirname}/input.txt`}   | ${6677951}
`(
  'Given a input $filePath when calling getLifeSupportRating function should receive $expectedResult',
  async ({filePath, expectedResult}) => {
    const reportLines = await readInputFileAsLines(filePath);
    expect(getLifeSupportRating(reportLines)).toBe(expectedResult);
  }
);
