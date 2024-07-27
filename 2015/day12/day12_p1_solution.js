import fs from 'fs';

let res = 0;

const fd = fs.openSync('./day12_input.txt', 'r');
const buffer = Buffer.alloc(1); // Buffer to store one byte (one character)
let position = 0;

try {
    let bytesRead;
    let substring = '';
    while ((bytesRead = fs.readSync(fd, buffer, 0, buffer.length, position)) > 0) {
        const char = buffer.toString('utf8', 0, bytesRead);

        if (char >= '0' && char <= '9' || (char === '-' && substring !== '-')) {
            substring += char
        } else {
            if (substring !== '' && !isNaN(substring)) {
                res += Number.parseInt(substring);
            }
            substring = '';
        }

        position += bytesRead;
    }
} finally {
    fs.closeSync(fd);
}

console.log(`Answer is: ${res}`);
