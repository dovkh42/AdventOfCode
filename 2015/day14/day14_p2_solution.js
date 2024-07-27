import fs from 'fs';
import readline from 'readline';

const filePath = './day14_input.txt';

const fileStream = fs.createReadStream(filePath);

let result = 0;
const deerMap = {};


const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    const parts = line.split(' ');
    const name = parts[0];
    const speed = parseInt(parts[3]);
    const flySeconds = parseInt(parts[6]);
    const restSeconds = parseInt(parts[parts.length - 2]);

    deerMap[name] = {
        speed,
        flySeconds,
        restSeconds,
        state: {
            distance: 0,
            mode: 'flying',
            secTilFly: 0,
            secTilRest: flySeconds,
            score: 0
        }
    }
});

rl.on('close', () => {
    for (let i = 0; i < 2503; ++i) {
        let currentMax = 0;
        let leader = [];
        for (let deer of Object.values(deerMap)) {
            if (deer.state.secTilRest) {
                deer.state.distance += deer.speed;
                --deer.state.secTilRest;
            } else if (deer.state.mode === 'flying') {
                deer.state.secTilFly = deer.restSeconds;
                deer.state.mode = 'resting';
            }

            if (deer.state.secTilFly) {
                --deer.state.secTilFly;
            } else if (deer.state.mode === 'resting') {
                deer.state.secTilRest = deer.flySeconds - 1;
                deer.state.mode = 'flying';
                deer.state.distance += deer.speed;
            }

            if (deer.state.distance > currentMax) {
                currentMax = deer.state.distance;
                leader = [deer];
            } else if (deer.state.distance === currentMax) {
                leader.push(deer);
            }
        }

        leader.forEach((deer) => {
            deer.state.score += 1;
        })
    }


    for (let deer of Object.values(deerMap)) {
        if (deer.state.score > result) {
            result = deer.state.score;
        }
    }
    console.log(`Answer is: ${result}`);
});