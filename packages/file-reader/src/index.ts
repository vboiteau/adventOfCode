import { promises as fs } from 'fs';
import { EOL } from 'os';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

export async function getFileContent(filePath: string): Promise<string> {
  return await fs.readFile(filePath, { encoding: 'utf8' });
}

export async function getFileLines(filePath: string, filterEmpty = true): Promise<string[]> {
  const fileContent = await getFileContent(filePath);
  return fileContent.split(EOL).filter((line: string) => (filterEmpty ? line.length : true));
}

export async function getFileLinesByBlock(filePath: string): Promise<string[][]> {
  const fileContent = await getFileLines(filePath, false);
  return fileContent
    .reduce<string[][]>(
      (blocks, line) => {
        if (line.trim() === '') {
          return [...blocks, []];
        }
        return [...blocks.slice(0, -1), [...(blocks[blocks.length - 1] ?? []), line]];
      },
      [[]],
    )
    .filter((block: string[]) => block.length > 0);
}

export function getFilePath(importMetaUrl: string, relativeFilePath: string): string {
  return resolve(join(getCurrentDirname(importMetaUrl), relativeFilePath));
}

export function getCurrentDirname(importMetaUrl: string): string {
  return dirname(fileURLToPath(importMetaUrl));
}

// compatibility helpers from src/2021/fileReader.ts
import { readFile as readFilePromises } from 'fs/promises';
export async function readInputFile(filePath: string): Promise<string> {
  return await readFilePromises(filePath, { encoding: 'utf-8' });
}
export async function readInputFileAsLines(filePath: string): Promise<string[]> {
  return (await readInputFile(filePath)).split(EOL).filter(Boolean);
}
