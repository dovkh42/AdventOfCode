import fs from 'fs';
import readline from 'readline';


const filePath = './day09_input.txt';

const fileStream = fs.createReadStream(filePath);

const graph = {};


const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    const inputParts = line.split(' ');

    if (!graph[inputParts[0]]) {
        graph[inputParts[0]] = {};
    }
    if (!graph[inputParts[2]]) {
        graph[inputParts[2]] = {};
    }

    graph[inputParts[0]][inputParts[2]] = parseInt(inputParts[4]);
    graph[inputParts[2]][inputParts[0]] = parseInt(inputParts[4]);
});

rl.on('close', () => {
    const getPermutations = (array) => {
        if (array.length === 1) return [array];

        const permutations = [];
        for (let i = 0; i < array.length; ++i) {
            const currentElement = array[i];
            const remainingElements = array.slice(0, i).concat(array.slice(i + 1));
            const remainingPermutations = getPermutations(remainingElements);
            for (let permutation of remainingPermutations) {
                permutations.push([currentElement].concat(permutation));
            }
        }
        return permutations;
    }

    const getPathDistance = (graph, path) =>  {
        let distance = 0;
        for (let i = 0; i < path.length - 1; ++i) {
            const from = path[i];
            const to = path[i + 1];
            distance += graph[from][to];
        }
        return distance;
    }

    const findShortestPath = (graph) => {
        const possibleLocations = Object.keys(graph);
        const pathPermutations = getPermutations(possibleLocations);
        let shortestPath = null;
        let shortestDistance = Infinity;

        for (let path of pathPermutations) {
            const currentDistance = getPathDistance(graph, path);
            if (currentDistance < shortestDistance) {
                shortestDistance = currentDistance;
                shortestPath = path;
            }
        }
        return { path: shortestPath, distance: shortestDistance };
    }

    const result = findShortestPath(graph);
    //console.log('Shortest path:', result.path);
    console.log('Shortest distance is:', result.distance);
});

