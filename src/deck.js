export const sizeX = 10;
export const sizeY = 10;
const maxX = sizeX - 1;
const maxY = sizeY - 1;

// prettier-ignore
const SHIPS = [
  4,
  3, 3,
  2, 2, 2,
  1, 1, 1, 1
];

const random = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

const getSide = (someRandomValue, maxValue, targetSize) => {
  const to = Math.min(maxValue, someRandomValue + targetSize);
  const leftCells = targetSize - (to - someRandomValue);
  const from = Math.max(0, someRandomValue - leftCells);
  return [from, to];
};

const convert = (randomX, randomY, ship, verticalDir) =>
  verticalDir
    ? {
        x1: randomX,
        x2: randomX,
        y1: ship[0],
        y2: ship[1]
      }
    : {
        x1: ship[0],
        x2: ship[1],
        y1: randomY,
        y2: randomY
      };

const createShip = targetSize => {
  const x = random(0, maxX);
  const y = random(0, maxY);
  const size = targetSize - 1;
  const verticalDirection = Math.random() > 0.5;
  let ship;
  if (verticalDirection) {
    ship = getSide(y, maxY, size);
  } else {
    ship = getSide(x, maxX, size);
  }
  return convert(x, y, ship, verticalDirection);
};

export const shipIntersects = ship1 => ship2 => {
  const x1 = Math.max(ship1.x1 - 1, 0);
  const x2 = Math.min(ship1.x2 + 1, maxX);
  const y1 = Math.max(ship1.y1 - 1, 0);
  const y2 = Math.min(ship1.y2 + 1, maxY);
  const intersects = (x, y) => {
    return x >= x1 && x2 >= x && y >= y1 && y2 >= y;
  };
  return intersects(ship2.x1, ship2.y1) || intersects(ship2.x2, ship2.y2);
};

const hasIntersection = (ships, nextShip) => {
  return ships.some(shipIntersects(nextShip));
};

const getNext = (ships, targetSize) => {
  const ship = createShip(targetSize);
  if (!hasIntersection(ships, ship)) {
    return ship;
  }
  return getNext(ships, targetSize);
};

const fill = (deck, nextShip) => {
  for (let rowIndex = nextShip.y1; rowIndex <= nextShip.y2; rowIndex++) {
    const row = deck[rowIndex];
    for (let cellIndex = nextShip.x1; cellIndex <= nextShip.x2; cellIndex++) {
      row[cellIndex] = 1;
    }
  }
};

export const createDeck = () => {
  const resultShips = SHIPS.reduce((acc, target) => {
    const next = getNext(acc, target);
    acc.push(next);
    return acc;
  }, []);
  const result = Array(sizeY)
    .fill()
    .map(() => Array(sizeX).fill(0));
  resultShips.forEach(ship => fill(result, ship));
  return result;
};
