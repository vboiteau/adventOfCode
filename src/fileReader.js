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

export function getFilePath(importMetaUrl, relativeFilePath) {
  return resolve(join(getCurrentDirname(importMetaUrl), relativeFilePath));
}

export function getCurrentDirname(importMetaUrl) {
  return dirname(fileURLToPath(importMetaUrl));
}
