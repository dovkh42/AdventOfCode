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

for (const line of lines) {
    const direction = line.slice(0, 1);
    const distance = Number.parseInt(line.substring(1));
    let nextDirection;

    if (!currDirection) {
        nextDirection = direction === 'R' ? 'E' : 'W';
    } else {
        nextDirection = directionsMap[currDirection][direction];
    }
    switch (nextDirection) {
        case 'N':
            baseY -= distance;
            break;
        case 'S':
            baseY += distance;
            break;
        case 'E':
            baseX += distance;
            break;
        case 'W':
            baseX -= distance;
            break;
        default:
            break;
    }
    currDirection = nextDirection;
}
console.log(`Answer is: ${Math.abs(baseX) + Math.abs(baseY)}`);
