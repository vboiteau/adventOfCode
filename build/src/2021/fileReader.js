import { readFile } from 'fs/promises';
import { EOL } from 'os';
export async function readInputFile(filePath) {
  return await readFile(filePath, { encoding: 'utf-8' });
}
export async function readInputFileAsLines(filePath) {
  return (await readInputFile(filePath)).split(EOL).filter(Boolean);
}
