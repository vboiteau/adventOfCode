import { getFileLines } from '../../fileReader';
import { resolve, join } from 'path';
import {
  getCumulativeMemoryValue,
  getCumulativeMemoryValueWithMaskedAddress,
} from './solution';

test.each`
  file           | cumulative
  ${'test.txt'}  | ${165}
`(
  'Given a $file with instructions when getCumulativeMemoryValue is called then the returned value should be $cumulative',
  async ({ file, cumulative }) => {
    const instructions: Array<string> = await getFileLines(
      resolve(join(__dirname, file))
    );
    expect(getCumulativeMemoryValue(instructions)).toBe(cumulative);
  }
);

test.each`
  file           | cumulative
  ${'test2.txt'} | ${208}
`(
  'Given a $file with instructions when getCumulativeMemoryValueWithMaskedAddress is called then the returned value should be $cumulative',
  async ({ file, cumulative }) => {
    const instructions: Array<string> = await getFileLines(
      resolve(join(__dirname, file))
    );
    expect(getCumulativeMemoryValueWithMaskedAddress(instructions)).toBe(
      cumulative
    );
  }
);
