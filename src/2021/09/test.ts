import {readInputFileAsLines} from '../fileReader';
import {getLowPointSum, getBigBassinsProduct} from './solution';

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${15}
  ${`${__dirname}/input.txt`}   | ${480}
`(
  'Given a input $filePath when calling getLowPointSum function should receive $expectedResult',
  async ({filePath, expectedResult}) => {
    const heightMap = await readInputFileAsLines(filePath);
    expect(getLowPointSum(heightMap)).toBe(expectedResult);
  }
);

test.each`
  filePath                      | expectedResult
  ${`${__dirname}/example.txt`} | ${1134}
  ${`${__dirname}/input.txt`}   | ${1045660}
`(
  'Given a input $filePath when calling getBigBassinsProduct function should receive $expectedResult',
  async ({filePath, expectedResult}) => {
    const heightMap = await readInputFileAsLines(filePath);
    expect(getBigBassinsProduct(heightMap)).toBe(expectedResult);
  }
);
