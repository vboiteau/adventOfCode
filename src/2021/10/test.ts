import {readInputFileAsLines} from '../fileReader';
import {getCorruptionPoints, getCompletionPoints} from './solution';

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${26397}
  ${`${__dirname}/input.txt`}   | ${413733}
`(
  'Given a input $filePath when calling getCorruptionPoints function should receive $expectedResult',
  async ({filePath, expectedResult}) => {
    const heightMap = await readInputFileAsLines(filePath);
    expect(getCorruptionPoints(heightMap)).toBe(expectedResult);
  }
);

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${288957}
  ${`${__dirname}/input.txt`}   | ${3354640192}
`(
  'Given a input $filePath when calling getCompletionPoints function should receive $expectedResult',
  async ({filePath, expectedResult}) => {
    const heightMap = await readInputFileAsLines(filePath);
    expect(getCompletionPoints(heightMap)).toBe(expectedResult);
  }
);
