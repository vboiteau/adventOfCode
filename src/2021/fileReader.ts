import {readFile} from 'fs/promises';
import {EOL} from 'os';

export async function readInputFile(filePath: string): Promise<string> {
  return await readFile(filePath, {encoding: 'utf-8'});
}

export async function readInputFileAsLines(
  filePath: string
): Promise<Array<string>> {
  return (await readInputFile(filePath)).split(EOL).filter(Boolean);
}
