import { promises as fsPromises } from 'fs';
import { EOL } from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export async function getFileContent(filePath) {
    return await fsPromises.readFile(filePath, { encoding: 'utf8'});
}

export async function getFileLines(filePath) {
    const fileContent = await getFileContent(filePath);
    return fileContent.split(EOL);
}

export function getCurrentDirname(importMetaUrl) {
    return dirname(fileURLToPath(importMetaUrl));
}
