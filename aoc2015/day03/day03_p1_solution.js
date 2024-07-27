import fs from 'fs';

const fd = fs.openSync('./day03_input.txt', 'r');
const buffer = Buffer.alloc(1);
let position = 0;

const houses = {
    '0,0': 1,
}

const currentLocation = {
    'x': 0,
    'y': 0,
}

try {
    let bytesRead;
    while ((bytesRead = fs.readSync(fd, buffer, 0, buffer.length, position)) > 0) {
        const char = buffer.toString('utf8', 0, bytesRead);

        currentLocation.x += (char === '<') * -1 + (char === '>') * 1
        currentLocation.y += (char === '^') * -1 + (char === 'v') * 1

        if (Object.prototype.hasOwnProperty.call(houses, `${currentLocation.x},${currentLocation.y}`)) {
            houses[`${currentLocation.x},${currentLocation.y}`] += 1;
        } else {
            houses[`${currentLocation.x},${currentLocation.y}`] = 1;
        }
        
        position += bytesRead;
    }
} finally {
    fs.closeSync(fd);
}

let numOfMultipleVisitedHouses = 0;

for (const key in houses) {
        const numVisited = houses[key];
        if (numVisited) {
            ++numOfMultipleVisitedHouses;
        }
}
console.log(`Answer is: ${numOfMultipleVisitedHouses}`);
