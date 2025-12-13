import { readInputFileAsLines } from '../fileReader';
import { getDangerousPointsCount, getDangerousPointsWithDiagonalCount } from './solution';
test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${5}
`(
  'Given a input $filePath when calling getWinningScore function should receive $expectedResult',
  async ({ filePath, expectedResult }) => {
    const lines = await readInputFileAsLines(filePath);
    expect(getDangerousPointsCount(lines)).toBe(expectedResult);
  },
);
test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${12}
`(
  'Given a input $filePath when calling getWinningScore function should receive $expectedResult',
  async ({ filePath, expectedResult }) => {
    const lines = await readInputFileAsLines(filePath);
    expect(getDangerousPointsWithDiagonalCount(lines)).toBe(expectedResult);
  },
);
