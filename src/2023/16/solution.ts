type Direction = 'up' | 'left' | 'down' | 'right';

interface Point {
    x: number;
    y: number;
}

interface RaySegment {
    x: number;
    y: number;
    direction: Direction;
};

const processUp = (layout: Array<String>, x: number, y: number): Array<RaySegment> => {
    switch (layout[y][x]) {
        case '-':
            return [
                {
                    x: x - 1,
                    y: y,
                    direction: 'left'
                },
                {
                    x: x + 1,
                    y: y,
                    direction: 'right'
                }
            ];
        case '\\':
            return [
                {
                    x: x - 1,
                    y: y,
                    direction: 'left'
                }
            ];
        case '/':
            return [
                {
                    x: x + 1,
                    y: y,
                    direction: 'right'
                }
            ];
        case '.':
        case '|':
        default:
            return [
                {
                    x: x,
                    y: y - 1,
                    direction: 'up'
                }
            ]
    }
}

const processRight = (layout: Array<String>, x: number, y: number): Array<RaySegment> => {
    switch (layout[y][x]) {
        case '|':
            return [
                {
                    x: x,
                    y: y - 1,
                    direction: 'up'
                },
                {
                    x: x,
                    y: y + 1,
                    direction: 'down'
                }
            ];
        case '\\':
            return [
                {
                    x: x,
                    y: y + 1,
                    direction: 'down'
                }
            ];
        case '/':
            return [
                {
                    x: x,
                    y: y - 1,
                    direction: 'up'
                }
            ];
        case '.':
        case '-':
        default:
            return [
                {
                    x: x + 1,
                    y: y,
                    direction: 'right'
                }
            ]
    }
}

const processDown = (layout: Array<String>, x: number, y: number): Array<RaySegment> => {
    switch (layout[y][x]) {
        case '-':
            return [
                {
                    x: x - 1,
                    y: y,
                    direction: 'left'
                },
                {
                    x: x + 1,
                    y: y,
                    direction: 'right'
                }
            ];
        case '\\':
            return [
                {
                    x: x + 1,
                    y: y,
                    direction: 'right'
                }
            ];
        case '/':
            return [
                {
                    x: x - 1,
                    y: y,
                    direction: 'left'
                }
            ];
        case '.':
        case '|':
        default:
            return [
                {
                    x: x,
                    y: y + 1,
                    direction: 'down'
                }
            ]
    }
}

const processLeft = (layout: Array<String>, x: number, y: number): Array<RaySegment> => {
    switch (layout[y][x]) {
        case '|':
            return [
                {
                    x: x,
                    y: y - 1,
                    direction: 'up'
                },
                {
                    x: x,
                    y: y + 1,
                    direction: 'down'
                }
            ];
        case '\\':
            return [
                {
                    x: x,
                    y: y - 1,
                    direction: 'up'
                }
            ];
        case '/':
            return [
                {
                    x: x,
                    y: y + 1,
                    direction: 'down'
                }
            ];
        case '.':
        case '-':
        default:
            return [
                {
                    x: x - 1,
                    y: y,
                    direction: 'left'
                }
            ]
    }
}

const processRay = (layout: Array<String>, ray: RaySegment): Array<RaySegment> => {
    const { x, y, direction } = ray;
    switch (direction) {
        case 'up':
            return processUp(layout, x, y);
        case 'right':
            return processRight(layout, x, y);
        case 'down':
            return processDown(layout, x, y);
        case 'left':
        default:
            return processLeft(layout, x, y);
    }
}

const isRayInBound = (ray: RaySegment, layout: Array<string>): boolean => {
    const { x, y } = ray;
    return y >= 0 && y < layout.length && x >= 0 && x < layout[0].length;
}

const isRayAlreadyVisited = (ray: RaySegment, visited: Array<RaySegment>): boolean => {
    return !!visited.find((visitedRay) => visitedRay.x === ray.x && visitedRay.y === ray.y && visitedRay.direction === ray.direction);
}

export const getEnergizedCellsWithEntry = (layout: Array<string>, entryRay: RaySegment): number => {
    const raysToProcess: Array<RaySegment> = [entryRay];
    for (const rayToProcess of raysToProcess) {
        const nextRays = processRay(layout, rayToProcess).filter((ray) => isRayInBound(ray, layout) && !isRayAlreadyVisited(ray, raysToProcess));
        raysToProcess.push(...nextRays);
    }
    const visitedPoints: Array<Point> = raysToProcess.reduce((points, ray) => {
        if (!!points.find((point) => point.x === ray.x && point.y === ray.y)) {
            return points;
        }
        return [...points, { x: ray.x, y: ray.y }];
    }, []);
    return visitedPoints.length;
}

export const getEnergizedCells = (layout: Array<string>): number => {
    const entryRay: RaySegment = {
        x: 0,
        y: 0,
        direction: 'right'
    };
    return getEnergizedCellsWithEntry(layout, entryRay);
}

export const getMaxEnergizedCells = (layout: Array<string>): number => {
    const possibleEntryRays: Array<RaySegment> = [];
    for (let x = 0 ; x < layout[0].length; x++) {
        possibleEntryRays.push({
            x,
            y: 0,
            direction: 'down'
        });
        possibleEntryRays.push({
            x,
            y: layout.length - 1,
            direction: 'up'
        });
    }
    for (let y = 0 ; y < layout.length; y++) {
        possibleEntryRays.push({
            x: 0,
            y,
            direction: 'right'
        });
        possibleEntryRays.push({
            x: layout[0].length - 1,
            y,
            direction: 'left'
        });
    }
    return Math.max(...possibleEntryRays.map(entryRay => getEnergizedCellsWithEntry(layout, entryRay)));
}
