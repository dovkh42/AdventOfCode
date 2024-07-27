import fs from 'fs';
import readline from 'readline';


const filePath = './day06_input.txt';

const fileStream = fs.createReadStream(filePath);

let result = 0;

const board = Array.from(Array(1000), () => new Array(1000).fill(0));


const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    const instructions = line.split(' ');
    const action = instructions.length === 4 ? instructions[0] : instructions[1];
    const [firstX, firstY] = instructions[instructions.length - 3].split(',').map(Number);
    const [lastX, lastY] = instructions[instructions.length - 1].split(',').map(Number);

        for (let y = firstY; y <= lastY; ++y) {
            for (let x = firstX; x <= lastX; ++x) {
            if (action === 'on') {
                board[x][y] = 1;
            }
            else if (action === 'off') {
                board[x][y] = 0;
            }
            else if (action === 'toggle') {
                board[x][y] = !board[x][y];
            } else {
                throw new Error;
            }
        }
    }
});

rl.on('close', () => {
    for (let y = 0; y < 1000; ++y) {
        for (let x = 0; x < 1000; ++x) {
            result += board[x][y];
        }
    }
    console.log(`Answer is: ${result}`);
});
