import fs from 'fs';
import readline from 'readline';


const filePath = './day02_input.txt';

const fileStream = fs.createReadStream(filePath);

let result = 0;

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

// read line by line
rl.on('line', (line) => {
    const [l, w, h] = line.split('x');
    result += 2 * (l * w + l * h + w * h) + Math.min(l*w, l*h, w*h);
});

rl.on('close', () => {
    console.log(`Answer is: ${result}`);
});