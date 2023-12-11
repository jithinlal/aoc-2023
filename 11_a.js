const fs = require('fs');

const input = fs.readFileSync('11.txt', 'utf8');
const values = input.split('\n');

function findShortestSum(values) {
    let finalArr = []
    let j = 0
    for (let i = 0; i < values.length; i++, j += 1) {
        if (values[i].includes('#')) {
            finalArr[j] = values[i].split('')
        } else {
            finalArr[j] = values[i].split('')
            j += 1
            finalArr[j] = values[i].split('')
        }
    }

    finalArr = transpose(finalArr)
    let climaxArr = []
    let k = 0
    for (let i = 0; i < finalArr.length; i++, k += 1) {
        if (finalArr[i].includes("#")) {
            climaxArr[k] = finalArr[i]
        } else {
            climaxArr[k] = finalArr[i]
            k += 1
            climaxArr[k] = finalArr[i]
        }
    }

    const galaxies = []

    //find locatins of all #
    for (let i = 0; i < climaxArr[0].length; i++) {
        for (let j = 0; j < climaxArr.length; j++) {
            if (climaxArr[j][i] === "#") {
                galaxies.push([i, j]);
            }
        }
    }

    let pathSum = 0;

    //for every pair
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            pathSum += shortestPathOnGrid(galaxies[i], galaxies[j]);
        }
    }

    console.log({pathSum})
}

function shortestPathOnGrid(start, end) {
    const [x1, y1] = start;
    const [x2, y2] = end;

    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

findShortestSum(values)