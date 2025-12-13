import Direction from '../../utils/Direction';
import Grid, * as GridUtils from '../../utils/Grid';
import Vector, * as VectorUtils from '../../utils/Vector';
import * as PointUtils from '../../utils/Point';

export interface Node {
  vector: Vector;
  forward_count: number;
}

export interface NavigationState {
  node: Node;
  cost: number;
}

export const copy = (node: Node): Node => {
  return {
    vector: VectorUtils.copy(node.vector),
    forward_count: node.forward_count,
  };
};

export const equals = (node1: Node, node2: Node): boolean => {
  return (
    VectorUtils.equals(node1.vector, node2.vector) && node1.forward_count === node2.forward_count
  );
};

export const forward = (node: Node): Node => {
  return {
    vector: VectorUtils.step(node.vector),
    forward_count: node.forward_count + 1,
  };
};

export const left = (node: Node): Node => {
  return {
    vector: VectorUtils.step(VectorUtils.ccw(node.vector)),
    forward_count: 1,
  };
};

export const right = (node: Node): Node => {
  return {
    vector: VectorUtils.step(VectorUtils.cw(node.vector)),
    forward_count: 1,
  };
};

export const getToVisitPart1 = (node: Node, grid: Grid<number>): Array<Node> => {
  const toVisits =
    node.forward_count < 3 ? [forward(node), left(node), right(node)] : [left(node), right(node)];
  return toVisits.filter(node => GridUtils.pointInGrid(grid, node.vector.point));
};

export const getToVisitPart2 = (node: Node, grid: Grid<number>): Array<Node> => {
  if (node.forward_count < 4) {
    return [forward(node)].filter(node => GridUtils.pointInGrid(grid, node.vector.point));
  }
  const toVisits =
    node.forward_count < 10 ? [forward(node), left(node), right(node)] : [left(node), right(node)];
  return toVisits.filter(node => GridUtils.pointInGrid(grid, node.vector.point));
};

export const toKey = (node: Node): string => {
  return [node.vector.point.x, node.vector.point.y, node.vector.direction, node.forward_count].join(
    '_',
  );
};

export const isEndPart1 = (node: Node, grid: Grid<number>): boolean => {
  return PointUtils.equals(node.vector.point, GridUtils.getBottomRight(grid));
};

export const isEndPart2 = (node: Node, grid: Grid<number>): boolean => {
  return (
    PointUtils.equals(node.vector.point, GridUtils.getBottomRight(grid)) && node.forward_count >= 4
  );
};

export const getCityLeastLavalLost = (
  cityMap: Array<string>,
  getToVisit: (Node: Node, grid: Grid<number>) => Array<Node>,
  isEnd: (node: Node, grid: Grid<number>) => boolean,
): number => {
  const grid = GridUtils.read(cityMap, Number);
  const distance_map: Record<string, number> = {};
  const startPoint = GridUtils.getTopLeft();
  let states: Array<NavigationState> = [
    {
      node: {
        vector: {
          direction: Direction.SOUTH,
          point: startPoint,
        },
        forward_count: 0,
      },
      cost: 0,
    },
    {
      node: {
        vector: {
          direction: Direction.EAST,
          point: startPoint,
        },
        forward_count: 0,
      },
      cost: 0,
    },
  ];
  for (const state of states) {
    distance_map[toKey(state.node)] = 0;
  }
  while (states.length) {
    states = states.toSorted((a, b) => a.cost - b.cost);
    const { node, cost } = states.splice(0, 1)[0];
    if (isEnd(node, grid)) {
      return cost;
    }
    const currentDistance = distance_map[toKey(node)] ?? Infinity;
    if (currentDistance < cost) {
      continue;
    }
    for (const toVisit of getToVisit(node, grid)) {
      const next = {
        node: toVisit,
        cost: cost + GridUtils.getPointValue(grid, toVisit.vector.point),
      };
      const distanceToCompare = distance_map[toKey(toVisit)] ?? Infinity;
      if (distanceToCompare > next.cost) {
        distance_map[toKey(toVisit)] = next.cost;
        states.push(next);
      }
    }
  }
};
