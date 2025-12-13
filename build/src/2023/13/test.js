import { join } from 'path';
import { getFileLinesByBlock } from '../../fileReader';
import { getReflexionSummary } from './solution';
test.each`
  file             | smudge | expected
  ${'example.txt'} | ${0}   | ${405}
  ${'example.txt'} | ${1}   | ${400}
`(
  'Given a list of pattern from $file when getReflexionSummary is called with smudge $smudge then it should return the expected value $expected',
  async ({ file, smudge, expected }) => {
    const input = await getFileLinesByBlock(join(__dirname, file));
    expect(getReflexionSummary(input, smudge)).toBe(expected);
  },
);
