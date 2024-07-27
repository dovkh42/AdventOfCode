import fs from 'fs';
import readline from 'readline';


const filePath = './day08_input.txt';

const fileStream = fs.createReadStream(filePath);

let result = 0;


const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    const isValidHex = (twoCharString) => {
        const hexByteRegex = /^[0-9a-fA-F]{2}$/;
        return hexByteRegex.test(twoCharString);
    }

    const lineArray = Array.from(line);
    let count = 0;
    for (let i = 1; i < lineArray.length - 1;) {
        if (lineArray[i - 1] === '\\') {
            if (((lineArray[i] === '\\') || (lineArray[i] === '\"'))) {
                i += 2;
                count += i - 1 < lineArray.length -1 ? 1 : 0
                continue;
            }
            if (lineArray[i] === 'x' && i < lineArray.length - 3 && isValidHex(lineArray[i+1] + lineArray[i + 2])) {
                i += 4
                count += i - 1 < lineArray.length - 1 ? 1 : 0
                continue;
            }
        }
        ++count;
        ++i;
    }
    result += line.length - count
    
});

rl.on('close', () => {
    console.log(`Answer is: ${result}`);
});