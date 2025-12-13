import Direction from '../../utils/Direction';
import * as GridUtils from '../../utils/Grid';
import * as VectorUtils from '../../utils/Vector';
import * as PointUtils from '../../utils/Point';
export const copy = node => {
  return {
    vector: VectorUtils.copy(node.vector),
    forward_count: node.forward_count,
  };
};
export const equals = (node1, node2) => {
  return (
    VectorUtils.equals(node1.vector, node2.vector) && node1.forward_count === node2.forward_count
  );
};
export const forward = node => {
  return {
    vector: VectorUtils.step(node.vector),
    forward_count: node.forward_count + 1,
  };
};
export const left = node => {
  return {
    vector: VectorUtils.step(VectorUtils.ccw(node.vector)),
    forward_count: 1,
  };
};
export const right = node => {
  return {
    vector: VectorUtils.step(VectorUtils.cw(node.vector)),
    forward_count: 1,
  };
};
export const getToVisitPart1 = (node, grid) => {
  const toVisits =
    node.forward_count < 3 ? [forward(node), left(node), right(node)] : [left(node), right(node)];
  return toVisits.filter(node => GridUtils.pointInGrid(grid, node.vector.point));
};
export const getToVisitPart2 = (node, grid) => {
  if (node.forward_count < 4) {
    return [forward(node)].filter(node => GridUtils.pointInGrid(grid, node.vector.point));
  }
  const toVisits =
    node.forward_count < 10 ? [forward(node), left(node), right(node)] : [left(node), right(node)];
  return toVisits.filter(node => GridUtils.pointInGrid(grid, node.vector.point));
};
export const toKey = node => {
  return [node.vector.point.x, node.vector.point.y, node.vector.direction, node.forward_count].join(
    '_',
  );
};
export const isEndPart1 = (node, grid) => {
  return PointUtils.equals(node.vector.point, GridUtils.getBottomRight(grid));
};
export const isEndPart2 = (node, grid) => {
  return (
    PointUtils.equals(node.vector.point, GridUtils.getBottomRight(grid)) && node.forward_count >= 4
  );
};
export const getCityLeastLavalLost = (cityMap, getToVisit, isEnd) => {
  const grid = GridUtils.read(cityMap, Number);
  const distance_map = {};
  const startPoint = GridUtils.getTopLeft();
  let states = [
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
