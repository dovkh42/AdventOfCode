import fs from 'fs';
import readline from 'readline';


const filePath = './day05_input.txt';
const fileStream = fs.createReadStream(filePath);

let result = 0;

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    let hasMirroredChars = false;
    let hasDouble = false;

    for (let i = 0; i < line.length; ++i) {
        if (i && i < line.length - 1 && line[i - 1] === line[i + 1]) {
            hasMirroredChars = true;
        }

        if (i && i < line.length - 2 && line.slice(i + 1).includes(line[i - 1] + line[i])) {
            hasDouble = true;
        }
    }

    if (hasMirroredChars && hasDouble) {
        ++result;
    }
});

rl.on('close', () => {
    console.log(`Answer is: ${result}`);
});