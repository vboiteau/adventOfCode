import { getFileLines } from '@aoc/file-reader';
import { join } from 'path';
import { getEnergizedCells, getMaxEnergizedCells } from './solution';

test.each`
  file             | energizedCells
  ${'example.txt'} | ${46}
`(
  'Given a contraception layout $file when getEnergizedCells then it should return $nergizedCells energized cells',
  async ({ file, energizedCells }) => {
    const layout = await getFileLines(join(__dirname, file));
    expect(getEnergizedCells(layout)).toBe(energizedCells);
  },
);

test.each`
  file             | energizedCells
  ${'example.txt'} | ${51}
`(
  'Given a contraception layout $file when getMaxEnergizedCells then it should return $nergizedCells energized cells',
  async ({ file, energizedCells }) => {
    const layout = await getFileLines(join(__dirname, file));
    expect(getMaxEnergizedCells(layout)).toBe(energizedCells);
  },
);
