import {getCurrentDirname, getFileLines} from "./fileReader";
import path from 'path';

export async function sumFuel() {
    return (await listRocketFuel()).reduce((sum, fuel) => sum + fuel, 0);
}

export async function listRocketFuel() {
    const fuelList = await getFileLines(path.resolve(path.join(getCurrentDirname(import.meta.url), 'input.txt')));
    console.log(fuelList.filter(fuel => fuel.length).map(rocketEquation));
    return fuelList.filter(fuel => fuel.length).map(fuel => rocketEquation(parseInt(fuel))); 
}

export function rocketEquation(input) {
    return Math.floor(input / 3) - 2;
}
