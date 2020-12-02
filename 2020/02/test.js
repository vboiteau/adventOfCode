import {getCurrentDirname, getFileLines} from "../../fileReader";
import path from 'path';
import {countValidPasswords, countValidPasswordsWithLimit} from "./solution";

test(
  'Given the test input when calling getCountOfValidInput then 2 should be returned.',
  async () => {
    const filePath = path.resolve(path.join(getCurrentDirname(import.meta.url), 'test.txt'));
      expect(countValidPasswords((await getFileLines(filePath)).filter(line => line.length))).toBe(2);
  }
);

test(
  'Given the test input when calling getCountOfValidInput then 2 should be returned.',
  async () => {
    const filePath = path.resolve(path.join(getCurrentDirname(import.meta.url), 'input.txt'));
      expect(countValidPasswords((await getFileLines(filePath)).filter(line => line.length))).toBe(622);
  }
);

test(
  'Given the test input when calling getCountOfValidInput then 2 should be returned.',
  async () => {
    const filePath = path.resolve(path.join(getCurrentDirname(import.meta.url), 'test.txt'));
      expect(countValidPasswordsWithLimit((await getFileLines(filePath)).filter(line => line.length))).toBe(1);
  }
);

test(
  'Given the test input when calling getCountOfValidInput then 2 should be returned.',
  async () => {
    const filePath = path.resolve(path.join(getCurrentDirname(import.meta.url), 'input.txt'));
      expect(countValidPasswordsWithLimit((await getFileLines(filePath)).filter(line => line.length))).toBe(263);
  }
);
