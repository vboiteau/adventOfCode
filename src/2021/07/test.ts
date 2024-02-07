import { readInputFileAsLines } from '../fileReader';
import { getFuelCost, getFibonnaciFuelCost } from './solution';

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${37}
`(
  'Given a input $filePath when calling getFuelCost function should receive $expectedResult',
  async ({ filePath, days, expectedResult }) => {
    const [crabSubmarinePositions] = await readInputFileAsLines(filePath);
    expect(getFuelCost(crabSubmarinePositions)).toBe(expectedResult);
  }
);

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${168}
`(
  'Given a input $filePath when calling getFibonnaciFuelCost function should receive $expectedResult',
  async ({ filePath, days, expectedResult }) => {
    const [crabSubmarinePositions] = await readInputFileAsLines(filePath);
    expect(getFibonnaciFuelCost(crabSubmarinePositions)).toBe(expectedResult);
  }
);
