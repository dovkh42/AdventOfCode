import fs from 'fs';

const fd = fs.openSync('./day03_input.txt', 'r');
const buffer = Buffer.alloc(1);
let position = 0;

const houses = {
    '0,0': 2,
}

const currentSantaLocation = {
    'x': 0,
    'y': 0,
}

const currentRobotLocation = {
    'x': 0,
    'y': 0,
}

let isSantaTurn = true;

const markVisited = (x, y) => {
    if (Object.prototype.hasOwnProperty.call(houses, `${x},${y}`)) {
        houses[`${x},${y}`] += 1;
    } else {
        houses[`${x},${y}`] = 1;
    }
}

try {
    let bytesRead;
    while ((bytesRead = fs.readSync(fd, buffer, 0, buffer.length, position)) > 0) {
        const char = buffer.toString('utf8', 0, bytesRead);

        if (isSantaTurn) {
            currentSantaLocation.x += (char === '<') * -1 + (char === '>') * 1
            currentSantaLocation.y += (char === '^') * -1 + (char === 'v') * 1
            markVisited(currentSantaLocation.x, currentSantaLocation.y);
        } else {
            currentRobotLocation.x += (char === '<') * -1 + (char === '>') * 1
            currentRobotLocation.y += (char === '^') * -1 + (char === 'v') * 1
            markVisited(currentRobotLocation.x, currentRobotLocation.y);
        }
        isSantaTurn = !isSantaTurn;
        
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
