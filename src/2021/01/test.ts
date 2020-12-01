import {readInputFileAsLines} from '../fileReader';
import {getDepthIncreaseWindowCount} from './solution';

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${7}
  ${`${__dirname}/input.txt`}   | ${1665}
`(
  'Given a input $filePath when calling getDepthIncreaseCount function should receive $expectedResult',
  async ({filePath, expectedResult}) => {
    const depths = await readInputFileAsLines(filePath);
    expect(getDepthIncreaseWindowCount(depths, 1)).toBe(expectedResult);
  }
);

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${5}
  ${`${__dirname}/input.txt`}   | ${1702}
`(
  'Given a input $filePath when calling getDepthIncreaseWindowCount function should receive $expectedResult',
  async ({filePath, expectedResult}) => {
    const depths = await readInputFileAsLines(filePath);
    expect(getDepthIncreaseWindowCount(depths, 3)).toBe(expectedResult);
  }
);