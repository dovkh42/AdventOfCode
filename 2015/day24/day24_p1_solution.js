import fs from 'fs';

const filePath = './day24_input.txt';

const data = fs.readFileSync(filePath, 'utf8');

const lines = data.split('\r\n').map(Number);

const sum = lines.reduce((val, acc) => {
    return acc += val;
}, 0)

const groupSum = sum / 3;

let firstGroupCombos = [];


const filterArray = (mainArray, filterArray) => {
    return mainArray.filter((item) => !filterArray.includes(item));
}

const createCombos = (currentCombo, remainingSum, startIdx) => {
    if (remainingSum === 0) {
        firstGroupCombos.push({
            combo: [...currentCombo],
            qe: currentCombo.reduce((val, acc) => {
                return acc *= val;
            }, 1),
            rest: filterArray([...lines], currentCombo),
        });
        return;
    }

    for (let i = startIdx; i < lines.length; ++i) {
        if (lines[i] <= remainingSum) {
            currentCombo.push(lines[i]);
            createCombos(currentCombo, remainingSum - lines[i], i + 1);
            currentCombo.pop();
        }
        
    }
}

createCombos([], groupSum, 0);


const isSubComboPossible = (givenCombo, remainingSum, startIdx) => {
    if (remainingSum === 0) {
        return true;
    }
    if (startIdx >= givenCombo.length) {
        return false;
    }

    for (let i = startIdx; i < givenCombo.length; ++i) {
        if (isSubComboPossible(givenCombo, remainingSum - givenCombo[i], i + 1)) {
            return true;
        }
    }

    return false;
}

let minLen = Infinity;
let winningCombo = null;
const possibleCombos = [];
for (let combo of firstGroupCombos) {
    if (isSubComboPossible(combo.rest, groupSum, 0)) {
        possibleCombos.push(combo);

        if (combo.combo.length < minLen) {
            minLen = combo.combo.length;
            winningCombo = combo;
        }
    }
}

console.log(`Answer is: ${winningCombo.qe}`);