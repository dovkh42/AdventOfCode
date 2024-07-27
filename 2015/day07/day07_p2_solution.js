import fs from 'fs';
import readline from 'readline';


const filePath = './day07_input.txt';

const fileStream = fs.createReadStream(filePath);

let result = 0;

const map = {};

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    const instructions = line.split(' ').map((item) => {
        const num = Number(item);
        return isNaN(num) ? item : num;
    });

    const destination = instructions[instructions.length - 1]
    let action = null;
    let operands = [];

    switch (instructions.length) {
        case 4:
            action = instructions[0]; // NOT
            operands.push(instructions[1]);
            break;
        case 5:
            action = instructions[1];
            operands.push(instructions[0], instructions[2]);
            break;
        default:
            operands.push(instructions[0]);
    }

    map[destination] = {
        action,
        operands,
    };
});

rl.on('close', () => {
    const isNumber = (value) => {
        return typeof value === 'number' && !isNaN(value);
    }

    const calculate = (location, map) => {
        location.operands = location.operands.map((operand) => {
            if (!isNumber(operand)) {
                operand = calculate(map[operand], map);
            } else {
                operand = (operand & 0xFFFF) >>> 0;
            }

            return operand

        })

        if (location.action === 'RSHIFT') {
            return location.operands[0] >> location.operands[1];
        }
        if (location.action === 'LSHIFT') {
            return location.operands[0] << location.operands[1];
        }
        if (location.action === 'AND') {
            return location.operands[0] & location.operands[1];
        }
        if (location.action === 'OR') {
            return location.operands[0] | location.operands[1];
        }
        if (location.action === 'NOT') {
            return (~location.operands[0] & 0xFFFF) >>> 0;
        }
        if (location.action === null) {
            return location.operands[0];
        }
    }

   const mapClone = JSON.parse(JSON.stringify(map));

    mapClone['b'].operands = [calculate(map['a'], map)]

    result = calculate(mapClone['a'], mapClone);

    console.log(`Answer is: ${result}`);
});