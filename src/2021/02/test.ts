import { readInputFileAsLines } from '@aoc/file-reader';
import { getPositionProduct, getAimPositionProduct } from './solution';

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${150}
`(
  'Given a input $filePath when calling getDepthIncreaseCount function should receive $expectedResult',
  async ({ filePath, expectedResult }) => {
    const movements = await readInputFileAsLines(filePath);
    expect(getPositionProduct(movements)).toBe(expectedResult);
  },
);

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${900}
`(
  'Given a input $filePath when calling getDepthIncreaseCount function should receive $expectedResult',
  async ({ filePath, expectedResult }) => {
    const movements = await readInputFileAsLines(filePath);
    expect(getAimPositionProduct(movements)).toBe(expectedResult);
  },
);
