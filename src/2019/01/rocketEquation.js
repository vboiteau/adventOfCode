import {getFileLines} from '../../fileReader';
import {resolve, join} from 'path';

export async function sumFuel() {
  return (await listRocketFuel()).reduce((sum, fuel) => sum + fuel, 0);
}

export async function listRocketFuel() {
  const fuelList = await getFileLines(resolve(join(__dirname, 'input.txt')));
  return fuelList
    .filter(fuel => fuel.length)
    .map(fuel => rocketEquation(parseInt(fuel)));
}

export function rocketEquation(input) {
  return Math.floor(input / 3) - 2;
}
