import fs from 'fs';

const filePath = './day18_input.txt';

const data = fs.readFileSync(filePath, 'utf8');
const rowsData = data.trim().split('\r\n');
let currState = rowsData.map(row => row.split(''));
const rows = rowsData.length;
const cols = currState[0].length;


currState[0][0] = '#';
currState[0][cols - 1] = '#';
currState[rows - 1][0] = '#';
currState[rows - 1][cols - 1] = '#';


const getNextState = (currState) => {
    let nextState = [];
    for (let i = 0; i < rows; ++i) {
        let row = [];
        for (let j = 0; j < cols; ++j) {
            if ((i === 0 && j === 0) || (i === 0 && j === cols - 1) || (i === rows - 1 && j === 0) || (i === rows - 1 && j === cols - 1)) {
                row.push('#');
                continue;
            }
            let countOn = 0;

            if (i > 0 && j > 0 && currState[i - 1][j - 1] === '#') {
                ++countOn;
            }
            if (i > 0 && currState[i - 1][j] === '#') {
                ++countOn;
            }
            if (i > 0 && j < cols - 1 && currState[i - 1][j + 1] === '#') {
                ++countOn;
            }
            if (j > 0 && currState[i][j - 1] === '#') {
                ++countOn;
            }
            if (j < cols - 1 && currState[i][j + 1] === '#') {
                ++countOn;
            }
            if (i < rows - 1 && j > 0 && currState[i + 1][j - 1] === '#') {
                ++countOn;
            }
            if (i < rows - 1 && currState[i + 1][j] === '#') {
                ++countOn;
            }
            if (i < rows - 1 && j < cols - 1 && currState[i + 1][j + 1] === '#') {
                ++countOn;
            }
            if (currState[i][j] === '.' && countOn === 3) {
                row.push('#');
            } else if (currState[i][j] === '#' && (countOn === 2 || countOn === 3)) {
                row.push('#');
            } else {
                row.push('.')
            }
        }
        nextState.push(row);
    }

    return nextState;
}

const getNumOfActiveLights = (currState) => {
    let numOfActiveLights = 0;
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            if (currState[i][j] === '#') {
                ++numOfActiveLights
            }
        }
    }

    return numOfActiveLights;
}


for (let i = 0; i < 100; ++i) {
    currState = getNextState(currState);
}


console.log(`Answer is ${getNumOfActiveLights(currState)}`);