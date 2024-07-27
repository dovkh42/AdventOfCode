import fs from 'fs';

const fd = fs.openSync('./day01_input.txt', 'r');
const buffer = Buffer.alloc(1); // char by char buffer

let floorCount = 0;
let position = 0;

const counter = (char) => {
    switch (char) {
        case '(':
            ++floorCount;
            break;
        case ')':
            --floorCount;
            break;
        default:
            break;
    }
}


try {
    let bytesRead;
    while ((bytesRead = fs.readSync(fd, buffer, 0, buffer.length, position)) > 0) {
        const char = buffer.toString('utf8', 0, bytesRead);

        counter(char)

        position += bytesRead;
    }
} finally {
    fs.closeSync(fd);
}

console.log(`Answer is: ${floorCount}`);
