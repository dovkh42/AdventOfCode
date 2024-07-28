import fs from 'fs';
import readline from 'readline';


const filePath = './day16_input.txt';

const fileStream = fs.createReadStream(filePath);


const sueMap = {};


const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    let [_unused, ...parts] = line.split(' ');
    let sueNumber = parseInt(parts.shift().slice(0, -1));


    sueMap[sueNumber] = {};
    for (let i = 0; i < parts.length; i += 2) {
        sueMap[sueNumber][parts[i].slice(0, -1)] = Number.parseInt(parts[i + 1]);
    }
});

rl.on('close', () => {
    const tape = {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1
    };
    

    let result = 0;
    const suesArray = Object.values(sueMap);
    for (const [index, sue] of suesArray.entries()) {
        let compounds = Object.keys(sue);
        let matches = 0;

        compounds.forEach((compound) => {
            if (sue[compound] === tape[compound]) {
                ++matches;
            }
        })

        if (matches === 3) {
            result = index+1;
            break;
        }
    }

    console.log(`Answer is: ${result}`);
});