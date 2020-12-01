import {getFirstXmasException, getHackValue} from './solution';
import {resolve, join} from 'path';
import {getFileLines} from '../../fileReader';

test.each`
  file           | preambleLength | exception
  ${'test.txt'}  | ${5}           | ${127}
  ${'input.txt'} | ${25}          | ${1124361034}
`(
  'Given a XMAS encrypted file $file with preamble length $preambleLength when getFirstXmasException then the returned exception should be $exception.',
  async ({file, preambleLength, exception}) => {
    const filePath = resolve(join(__dirname, file));
    const ports: Array<number> = (await getFileLines(filePath)).map(port =>
      parseInt(port)
    );
    expect(getFirstXmasException(ports, preambleLength)).toBe(exception);
  }
);

test.each`
  file           | preambleLength | hackValue
  ${'test.txt'}  | ${5}           | ${62}
  ${'input.txt'} | ${25}          | ${129444555}
`(
  'Given a XMAS encrypted file $file with preamble length $preambleLength when getHackValue then the returned hackValue should be $hackValue.',
  async ({file, preambleLength, hackValue}) => {
    const filePath = resolve(join(__dirname, file));
    const ports: Array<number> = (await getFileLines(filePath)).map(port =>
      parseInt(port)
    );
    expect(getHackValue(ports, preambleLength)).toBe(hackValue);
  }
);
