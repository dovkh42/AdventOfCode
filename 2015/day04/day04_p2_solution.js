import crypto from 'crypto';
import fs from 'fs';
import readline from 'readline';

const filePath = './day04_input.txt';
const fileStream = fs.createReadStream(filePath);


const generateMD5Hash = (data) => {
    return crypto.createHash('md5').update(data).digest('hex');
}

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});


let secret;

rl.on('line', (line) => {
    secret = line;
});

rl.on('close', () => {
    console.log(`Secret is: ${secret}`);
    let i = 0;
    for (; !generateMD5Hash(secret + i.toString()).startsWith('000000'); ++i) { /* empty */ };

    console.log(`Answer is: ${i}`);
});

console.log('Reading file asynchronously...');