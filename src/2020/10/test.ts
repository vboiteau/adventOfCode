import { getDifferentialProduct, getDistinctArrangements } from './solution';
import { resolve, join } from 'path';
import { getFileLines } from '../../fileReader';

test.each`
  file           | product
  ${'test1.txt'} | ${35}
  ${'test2.txt'} | ${220}
`(
  'Given a list of adapters in $file when getDifferentialProduct then the returned differentialProduct should be $product.',
  async ({ file, product }) => {
    const filePath = resolve(join(__dirname, file));
    const adapters: Array<number> = (await getFileLines(filePath)).map(
      (adapter: string) => parseInt(adapter, 10)
    );
    expect(getDifferentialProduct(adapters)).toBe(product);
  }
);

test.each`
  file           | arrangements
  ${'test1.txt'} | ${8}
  ${'test2.txt'} | ${19208}
`(
  'Given a list of adaptesr in $file when getDistinctArrangements is called then the number of distinct arrangements returned should be $arrangements',
  async ({ file, arrangements }) => {
    const filePath = resolve(join(__dirname, file));
    const adapters: Array<number> = (await getFileLines(filePath)).map(
      (adapter: string) => parseInt(adapter, 10)
    );
    expect(getDistinctArrangements(adapters)).toEqual(arrangements);
  }
);
