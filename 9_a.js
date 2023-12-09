const fs = require('fs');

const input = fs.readFileSync('9.txt', 'utf8');
const values = input.split('\n');


const findDifferences = (history) => {
    const diffs = [];

    for (let i = 1; i < history.length; i += 1) {
        diffs.push(history[i] - history[i - 1])
    }

    return diffs;
};

const findNextValue = (history) => {
    if (history.every(entry => entry === history[0])) {
        return history[0];
    }

    const diffs = findDifferences(history);
    const nextDiff = findNextValue(diffs);


    return history[history.length - 1] + nextDiff;
};

function findOasisSum(lines) {
    const histories = lines.map(line => line.split(' ').map(Number))
    const nextValues = histories.map(findNextValue);

    console.log(nextValues.reduce((a, b) => a + b, 0))
}


findOasisSum(values)