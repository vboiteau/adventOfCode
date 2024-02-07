import {
  getProductOfBusNumberAndTimeToWait,
  getTimestampWithSequence,
} from './solution';
import { resolve, join } from 'path';
import { getFileContent, getFileLines } from '../../fileReader';

// test.each`
// file | product
// ${'test.txt'} | ${295}
// `(
//   'Given a note file $file when getProductOfBusNumberAndTimeToWait is called then the returned product should be $product',
//   async ({ file, product }) => {
//     const filePath = resolve(join(__dirname, file));
//     const notes: string = (await getFileContent(filePath));
//     expect(getProductOfBusNumberAndTimeToWait(notes)).toEqual(product);
//   }
// );

test.each`
  chain                    | product
  ${'17,x,13,19'}          | ${3417}
  ${'67,7,59,61'}          | ${754018}
  ${'67,x,7,59,61'}        | ${779210}
  ${'67,7,x,59,61'}        | ${1261476}
  ${'1789,37,47,1889'}     | ${1202161486}
  ${'7,13,x,x,59,x,31,19'} | ${1068781}
`(
  'Given a buses $chain when getProductOfBusNumberAndTimeToWait is called then the returned product should be $product',
  async ({ chain, product }) => {
    expect(getTimestampWithSequence(chain.split(','))).toEqual(product);
  }
);
