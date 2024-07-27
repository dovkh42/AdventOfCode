import fs from 'fs';
import readline from 'readline';

const filePath = './day11_input.txt';

const fileStream = fs.createReadStream(filePath);

let result = 0;
let inputLine;


const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    inputLine = Array.from(line);
});

rl.on('close', () => {
    const incrementPassword = (array) => {
        for (let i = array.length - 1; i > 0; --i) {
            if (array[i] !== 122) {
                ++array[i];
                break;
            } else {
                array[i] = 97;
            }
        }
    }

    const illegalAscii = [105, 108, 111];

    const convertCharArrayToAscii = (array) => {
        return array.map(char => char.charCodeAt(0));
    }

    const convertAsciiArrayToChar= (array) => {
        return array.map((ascii) => String.fromCharCode(ascii));
    }

    let asciiArray = convertCharArrayToAscii(inputLine);

    while (1) {
        let foundDoubles = 0;
        let consecutiveLetters = 0;
        let nextIdxToSearchDoubles = 1;
        let i = 0;

        for (; i < asciiArray.length && !illegalAscii.includes(asciiArray[i]); ++i) {
            if (i >= nextIdxToSearchDoubles && foundDoubles !== 2) {

                if (asciiArray[i] === asciiArray[i - 1]) {
                    ++foundDoubles;
                    nextIdxToSearchDoubles = i + 2;
                }
            }
            if (i && consecutiveLetters !== 2) {
                if (asciiArray[i] - asciiArray[i - 1] === 1) {
                    ++consecutiveLetters
                } else {
                    consecutiveLetters = 0;
                }
            }
        }
        if (i === asciiArray.length && foundDoubles === 2 && consecutiveLetters === 2) {
            break;
        }
        
        incrementPassword(asciiArray);
    }

    result = convertAsciiArrayToChar(asciiArray).join('');

    console.log(`Answer is: ${result}`);
});