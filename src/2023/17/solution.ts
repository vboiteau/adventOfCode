import { EOL } from 'os';
type Direction = 'up' | 'down' | 'left' | 'right';

interface VisitedState {
    x: number;
    y: number;
    cityBlockValue: number;
    visited: boolean;
    lavaLostSinceStart: number;
    direction?: Direction;
    forwardCount?: number;
}

interface Boundary {
    height: number;
    width: number;
}

export const getNextNodeToVisit = (visitedStates: Array<VisitedState>): VisitedState | undefined => {
    return visitedStates.filter((state) => !state.visited && state.lavaLostSinceStart !== Infinity)
        .sort((a, b) => a.lavaLostSinceStart - b.lavaLostSinceStart)[0];
}

const getUnvisitedNeighbours = (current: VisitedState, visitedStates: Array<VisitedState>, boundaries: Boundary): Array<VisitedState> => {
    const neighbours: Record<Direction, VisitedState | undefined> = {
        'up': {...visitedStates.find((state) => state.x === current.x && state.y === current.y - 1)},
        'down': {...visitedStates.find((state) => state.x === current.x && state.y === current.y + 1)},
        'left': {...visitedStates.find((state) => state.x === current.x - 1 && state.y === current.y)},
        'right': {...visitedStates.find((state) => state.x === current.x + 1 && state.y === current.y)},
    };
    for (const direction of Object.keys(neighbours) as Array<Direction>) {
        if (neighbours[direction] && neighbours[direction].cityBlockValue + current.lavaLostSinceStart < neighbours[direction].lavaLostSinceStart) {
            neighbours[direction].lavaLostSinceStart = neighbours[direction].cityBlockValue + current.lavaLostSinceStart;
            neighbours[direction].direction = direction;
            neighbours[direction].forwardCount = current.direction === direction ? (current.forwardCount ?? 0) + 1 : 0;
        } else {
            neighbours[direction] = undefined;
        }
    }
    return Object.values(neighbours).filter(neighbour => Boolean(neighbour) && !neighbour.visited && neighbour.forwardCount < 3);
}

export const getCityLeastLavalLost = (cityMap: Array<string>): number => {
    const boundaries: Boundary = {
        height: cityMap.length,
        width: cityMap[0].length,
    };
    const visitedStates: Array<VisitedState> = cityMap.flatMap((row, y) => row.split('').map((cell, x) => ({
        x,
        y,
        cityBlockValue: Number(cell),
        visited: false,
        lavaLostSinceStart: x === 0 && y === 0 ? Number(cell) : Infinity,
    })));
    let nextNodeToVisit;
    while ((nextNodeToVisit = getNextNodeToVisit(visitedStates))) {
        if (nextNodeToVisit.x === 5 && nextNodeToVisit.y === 1) {
            console.log('22', nextNodeToVisit, visitedStates.filter(({ visited, lavaLostSinceStart }) => !visited && lavaLostSinceStart !== Infinity));
        }
        if (nextNodeToVisit.x === 5 && nextNodeToVisit.y === 0) {
            console.log('25', nextNodeToVisit, visitedStates.filter(({ visited, lavaLostSinceStart }) => !visited && lavaLostSinceStart !== Infinity));
        }
        nextNodeToVisit.visited = true;
        const unvisitedNeighbours = getUnvisitedNeighbours(nextNodeToVisit, visitedStates, boundaries);
        unvisitedNeighbours.forEach((neighbour) => {
            const index = visitedStates.findIndex((state) => state.x === neighbour.x && state.y === neighbour.y);
            visitedStates[index] = neighbour;
        });
    }
    console.log(visitedStates.find((state) => state.x === boundaries.width - 1 && state.y === boundaries.height - 1));
    return 0;
};
