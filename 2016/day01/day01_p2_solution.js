import fs from 'fs';

const filePath = './day01_input.txt';
const data = fs.readFileSync(filePath, 'utf8');

const lines = data.split(', ');
let baseX = 0;
let baseY = 0;
let currDirection = null;

const directionsMap = {
    N: {
        R: 'E',
        L: 'W',
    },
    S: {
        R: 'W',
        L: 'E',
    },
    E: {
        R: 'S',
        L: 'N',
    },
    W: {
        R: 'N',
        L: 'S',
    },
}

const visitedCoordinatesMap = {};

const isVisited = (x, y) => {
    return visitedCoordinatesMap[x] && visitedCoordinatesMap[x].includes(y)
}

const initKeyIfNeeded = (baseX) => {
    if (!visitedCoordinatesMap[baseX]) {
        visitedCoordinatesMap[baseX] = [];
    }
}

for (const line of lines) {
    const direction = line.slice(0, 1);
    let distance = Number.parseInt(line.substring(1));
    let nextDirection;
    let firstLocationDistance = 0;

    if (!currDirection) {
        nextDirection = direction === 'R' ? 'E' : 'W';
    } else {
        nextDirection = directionsMap[currDirection][direction];
    }

    switch (nextDirection) {
        case 'N':
            initKeyIfNeeded(baseX);
            for (; 0 < distance && !firstLocationDistance; --distance) {
                if (isVisited(baseX, baseY - 1)) {
                    firstLocationDistance = Math.abs(baseX) + Math.abs(baseY - 1);
                }
                visitedCoordinatesMap[baseX].push(--baseY)
            }
            break;
        case 'S':
            initKeyIfNeeded(baseX);
            for (; 0 < distance && !firstLocationDistance; --distance) {
                if (isVisited(baseX, baseY + 1)) {
                    firstLocationDistance = Math.abs(baseX) + Math.abs(baseY + 1);
                }
                visitedCoordinatesMap[baseX].push(++baseY)
            }
            break;
        case 'E':
            for (; 0 < distance && !firstLocationDistance; --distance) {
                if (isVisited(baseX + 1, baseY)) {
                    firstLocationDistance = Math.abs(baseX + 1) + Math.abs(baseY);
                }
                baseX += 1;
                initKeyIfNeeded(baseX);
                visitedCoordinatesMap[baseX].push(baseY)
            }
            break;
        case 'W':
            for (; 0 < distance && !firstLocationDistance; --distance) {
                if (isVisited(baseX - 1, baseY)) {
                    firstLocationDistance = Math.abs(baseX - 1) + Math.abs(baseY);
                }
                baseX -= 1;
                initKeyIfNeeded(baseX);
                visitedCoordinatesMap[baseX].push(baseY)
            }
            break;
        default:
            break;
    }

    if (firstLocationDistance) {
        console.log(`Answer is: ${firstLocationDistance}`);
        break;
    }

    currDirection = nextDirection;
}
