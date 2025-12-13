import { join } from 'path';
import { getFileLines } from '../../fileReader';
import { getLoadAfterCycles, getTiltedPanelLoad } from './solution';

test.each`
  file             | expectedLoad
  ${'example.txt'} | ${136}
`(
  'Given a file $file describing a panel when calculating the load to tilt it then the load should be $expedLoad',
  async ({ file, expectedLoad }) => {
    const panel = await getFileLines(join(__dirname, file));
    expect(getTiltedPanelLoad(panel)).toBe(expectedLoad);
  },
);

test.each`
  file             | cycles           | expectedLoad
  ${'example.txt'} | ${1_000_000_000} | ${64}
`(
  'Given a file $file describing a panel when calculating the load to tilt after $cycles cycles then the load should be $expedLoad',
  async ({ file, cycles, expectedLoad }) => {
    const panel = await getFileLines(join(__dirname, file));
    expect(getLoadAfterCycles(panel, cycles)).toBe(expectedLoad);
  },
);
