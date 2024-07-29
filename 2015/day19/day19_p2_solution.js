import fs from 'fs';
import readline from 'readline';

const filePath = './day19_input.txt';

const fileStream = fs.createReadStream(filePath);

const conversions = {};
let destMolecule = '';

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    const [input, _unused, output] = line.split(' ');

    if (output) {
        if (!conversions[output]) {
            conversions[output] = [];
        }
        conversions[output].push(input)
    } else if (input) {
        destMolecule = input
    }
});

rl.on('close', () => {
    //console.log(conversions)
    const reverseKeys = Object.keys(conversions)
    let steps = 0;

    while (destMolecule !== 'e') {
        for (const key of reverseKeys) {
            destMolecule = destMolecule.replace(key, () => {
                ++steps;
                return conversions[key];
            });
        }
    }

    console.log(`Answer is: ${steps}`);
});