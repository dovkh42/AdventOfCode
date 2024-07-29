import fs from 'fs';
import readline from 'readline';

const filePath = './day19_input.txt';

const fileStream = fs.createReadStream(filePath);

const conversions = {};
let molecule = '';

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    const [input, _unused, output] = line.split(' ');

    if (output) {
        if (!conversions[input]) {
            conversions[input] = [];
        }
        conversions[input].push(output)
    } else if (input) {
        molecule = input
    }
});

rl.on('close', () => {
    let resultsSet = new Set();

    let molArr = Array.from(molecule);
    for (let i = 0; i < molArr.length;) {
        let isDoubleMol = false;
        let conversionDestArr = conversions[molArr[i]];
        if (!conversionDestArr) {
            conversionDestArr = conversions[molArr[i] + molArr[i + 1]]
            if (conversionDestArr) {
                isDoubleMol = true
            } else {
                conversionDestArr = [];
            }
        }
        for (let conversionDest of conversionDestArr) {
            if (isDoubleMol) {
                resultsSet.add((molArr.slice(0, i).concat(conversionDest, molArr.slice(i + 2)).join('')))
            } else {
                resultsSet.add((molArr.slice(0, i).concat(conversionDest, molArr.slice(i + 1)).join('')))
            }

        }
        if (isDoubleMol) {
            i += 2;
        } else {
            i += 1;
        }
    }

    console.log(`Answer is: ${resultsSet.size}`);
});


