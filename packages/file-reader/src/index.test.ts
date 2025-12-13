import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { promises as fs } from 'fs';
import { join } from 'path';

import {
  getFileContent,
  getFileLines,
  getFileLinesByBlock,
  readInputFile,
  readInputFileAsLines,
} from './index';

const sampleText = ['line1', '', 'line2', 'line3', '', '', 'line4'].join('\n');

describe('@aoc/file-reader', () => {
  const tmpFile = join(__dirname, 'tmp_sample.txt');

  beforeAll(async () => {
    await fs.writeFile(tmpFile, sampleText, { encoding: 'utf8' });
  });

  afterAll(async () => {
    await fs.unlink(tmpFile);
  });

  it('getFileContent reads the file', async () => {
    const content = await getFileContent(tmpFile);
    expect(content).toBe(sampleText);
  });

  it('getFileLines splits lines and filters empty by default', async () => {
    const lines = await getFileLines(tmpFile);
    expect(lines).toEqual(['line1', 'line2', 'line3', 'line4']);
  });

  it('getFileLines can return empty lines when disabled', async () => {
    const lines = await getFileLines(tmpFile, false);
    expect(lines).toEqual(sampleText.split('\n'));
  });

  it('getFileLinesByBlock groups blocks separated by blank lines', async () => {
    const blocks = await getFileLinesByBlock(tmpFile);
    expect(blocks).toEqual([['line1'], ['line2', 'line3'], ['line4']]);
  });

  it('readInputFile and readInputFileAsLines are compatible', async () => {
    const content = await readInputFile(tmpFile);
    expect(content).toBe(sampleText);
    const lines = await readInputFileAsLines(tmpFile);
    expect(lines).toEqual(sampleText.split('\n').filter(Boolean));
  });
});
