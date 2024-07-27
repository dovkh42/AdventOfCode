import fs from 'fs';

const fd = fs.openSync('./day01_input.txt', 'r');
const buffer = Buffer.alloc(1);

let floorCount = 0;
let position = 0;
let result = 0;

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
        if (floorCount < 0) {
            result = position + 1;
            break;
        }

        position += bytesRead;
    }
} finally {
    fs.closeSync(fd);
}

console.log(`Answer is: ${result}`);
