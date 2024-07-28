import fs from 'fs';
import readline from 'readline';

const filePath = './day15_input.txt';

const fileStream = fs.createReadStream(filePath);

const ingredientMap = {};

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    let [ingredient, attributes] = line.split(':');
    attributes = attributes.trim().split(' ').slice(0, -2); // slices calories out

    ingredientMap[ingredient] = {};
    for (let i = 0; i < attributes.length; i += 2) {
        ingredientMap[ingredient][attributes[i]] = parseInt(attributes[i + 1]);
    }
});

rl.on('close', () => {
    const splitNumberIntoPermutations = (number, splitCount) => {
        const permutations = [];

        const generatePermutations = (parts, remaining, currentPermutation) => {
            if (parts === 1) {
                currentPermutation.push(remaining);
                permutations.push([...currentPermutation]);
                currentPermutation.pop();
                return;
            }

            for (let i = 0; i <= remaining; i++) {
                currentPermutation.push(i);
                generatePermutations(parts - 1, remaining - i, currentPermutation);
                currentPermutation.pop();
            }
        }

        generatePermutations(splitCount, number, []);

        return permutations;
    }
    let maxScore = 0;


    const ingredients = Object.keys(ingredientMap);
    const attributes = Object.keys(Object.values(ingredientMap)[0])
    const permutations = splitNumberIntoPermutations(100, ingredients.length);


    permutations.forEach((permutation) => {
        let score = 1;
        let totals = attributes.reduce((acc, key) => {
            acc[key] = 0;
            return acc;
        }, {});

        for (let i = 0; i < ingredients.length; ++i) {
            attributes.forEach((attribute) => {
                totals[attribute] += ingredientMap[ingredients[i]][attribute] * permutation[i];
            });
        }

        for (let attribute in totals) {
            if (totals[attribute] < 0) {
                totals[attribute] = 0;
            }
            score *= totals[attribute];
        }

        if (score > maxScore) {
            maxScore = score;
        }
    })
    console.log(`Answer is: ${maxScore}`);
});
