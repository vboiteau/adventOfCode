import {promises as fsPromises} from 'fs';
import {EOL} from 'os';
import {dirname, join, resolve} from 'path';
import {fileURLToPath} from 'url';

export async function getFileContent(filePath) {
  return await fsPromises.readFile(filePath, {encoding: 'utf8'});
}

export async function getFileLines(filePath, filterEmpty = true) {
  const fileContent = await getFileContent(filePath);
  return fileContent
    .split(EOL)
    .filter(line => (filterEmpty ? line.length : true));
}

export async function getFileLinesByBlock(filePath) {
  const fileContent = await getFileLines(filePath, false);
  return fileContent.reduce((blocks, line) => {
    if (line.trim() === '') {
      return [...blocks, []];
    }
    return [
      ...blocks.slice(0, -1),
      [...blocks[blocks.length - 1], line]
    ]
  }, [[]]).filter(block => block.length);
}

export function getFilePath(importMetaUrl, relativeFilePath) {
  return resolve(join(getCurrentDirname(importMetaUrl), relativeFilePath));
}

export function getCurrentDirname(importMetaUrl) {
  return dirname(fileURLToPath(importMetaUrl));
}
