function getDistance(finalTime: number, holdTime: number): number {
    return (finalTime - holdTime) * holdTime;
}

function getDistances(finalTime: number): Array<number> {
    return new Array(finalTime).fill(0).map((_, holdTime) => getDistance(finalTime, holdTime));
}

export function solution01([timesLine, distancesLine]: Array<string>) {
    const times = timesLine.split(':')[1].trim().split(' ').filter(Boolean).map(Number);
    const recordDistances = distancesLine.split(':')[1].trim().split(' ').filter(Boolean).map(Number);

    return times.map((time, index) => getDistances(time).filter((distance) => distance > recordDistances[index]))
        .reduce((product, times) => product * times.length, 1);
}

function getHalfDistances(finalTime: number): Array<number> {
    return new Array(finalTime / 2).fill(0).map((_, holdTime) => getDistance(finalTime, holdTime));
}

export function solution02([timesLine, distancesLine]: Array<string>) {
    const time = Number(timesLine.split(':')[1].trim().split(' ').filter(Boolean).map(Number).join(''));
    const recordDistance = Number(distancesLine.split(':')[1].trim().split(' ').filter(Boolean).map(Number).join(''));

    return getHalfDistances(time).filter((distance) => distance > recordDistance).length * 2 + 1;
}
