/* eslint-disable no-useless-escape */
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
    const lineArray = Array.from(line);

    let newLineArray = [];
    newLineArray.push('\"')
    for (let i = 0; i < lineArray.length; ++i) {
        if (lineArray[i] === '\"') {
            newLineArray.push('\\', '\"')
        } else if (lineArray[i] === '\\') {
            newLineArray.push('\\', '\\')
        } else {
            newLineArray.push(lineArray[i])
        }
    }
    newLineArray.push('\"')

    result +=  newLineArray.join('').length - line.length

});

rl.on('close', () => {
    console.log(`Answer is: ${result}`);
});
