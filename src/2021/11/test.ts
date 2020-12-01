import {readInputFileAsLines} from '../fileReader';
import {countFlashes, getStepWhenAllFlashes} from './solution';

test.each`
  filePath                      | step   | expectedResult
  ${`${__dirname}/example.txt`} | ${10}  | ${204}
  ${`${__dirname}/example.txt`} | ${100} | ${1656}
  ${`${__dirname}/input.txt`}   | ${100} | ${1688}
`(
  'Given a input $filePath when calling countFlashes function should receive $expectedResult',
  async ({filePath, step, expectedResult}) => {
    const octopusRows = await readInputFileAsLines(filePath);
    expect(countFlashes(octopusRows, step)).toBe(expectedResult);
  }
);

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${195}
  ${`${__dirname}/input.txt`}   | ${403}
`(
  'Given a input $filePath when calling getStepWhenAllFlashes function should receive $expectedResult',
  async ({filePath, expectedResult}) => {
    const octopusRows = await readInputFileAsLines(filePath);
    expect(getStepWhenAllFlashes(octopusRows)).toBe(expectedResult);
  }
);
