import fs from 'fs';
import readline from 'readline';


const filePath = './day05_input.txt';
const fileStream = fs.createReadStream(filePath);

let result = 0;

const forbiddenStrings = ['ab', 'cd', 'pq', 'xy'];
const vowels = ['a', 'e', 'o', 'u', 'i'];

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    let vowelCount = 0;
    let hasForbiddenString = false;
    let hasDouble = 0;

    for (let i = 0; i < line.length; ++i) {
        const char = line[i];

        if (vowels.includes(char)) {
            ++vowelCount;
        }

        if (i && line[i] === line[i - 1]) {
            ++hasDouble;
        }

        if (i && forbiddenStrings.includes(line[i - 1] + line[i])) {
            hasForbiddenString = true;
        }
    }

    if (vowelCount>=3 && hasDouble && !hasForbiddenString) {
        ++result;
    }
    


});

rl.on('close', () => {
    console.log(`Answer is: ${result}`);
});
