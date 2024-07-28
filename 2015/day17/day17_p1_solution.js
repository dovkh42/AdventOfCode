import fs from 'fs';
import readline from 'readline';

const filePath = './day17_input.txt';

const fileStream = fs.createReadStream(filePath);

const containers = [];

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    containers.push(Number.parseInt(line));
});

rl.on('close', () => {
    let result = 0;
    containers.sort((a, b) => a - b);

    const findCombinations = (containers, amount) => {
        let combinations = [];

        const rec = (containers, remaining, currentCombination, start = 0) => {
            if (remaining === 0) {
                combinations.push([...currentCombination]);
                return;
            }

            for (let i = start; i < containers.length; ++i) {
                if (remaining >= containers[i]) {
                    currentCombination.push(containers[i]);
                    rec(containers, remaining - containers[i], currentCombination, i+1);
                    currentCombination.pop();
                }
            }
        }

        rec(containers, amount, []);

        return combinations;
    }

    result = findCombinations(containers, 150);

    console.log(`Answer is: ${result.length}`);
});

