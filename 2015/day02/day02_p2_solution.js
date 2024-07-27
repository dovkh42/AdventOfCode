import fs from 'fs';
import readline from 'readline';


const filePath = './day02_input.txt';

const fileStream = fs.createReadStream(filePath);

let result = 0;

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    const measurements = line.split('x');
    const [a, b, c] = measurements.sort((a, b) => a - b);
    result += 2*a+2*b + (a * b * c);
});

rl.on('close', () => {
    console.log(`Answer is: ${result}`);
});