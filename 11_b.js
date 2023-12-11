const fs = require('fs');

const input = fs.readFileSync('11.txt', 'utf8');
const values = input.split('\n');

function findShortestSum(values) {
    const galaxies = []
    const grid = values.map((line) => line.split(""));

    for (let i = 0; i < grid[0].length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[j][i] === "#") {
                galaxies.push([i, j]);
            }
        }
    }

    for (let i = grid.length - 1; i >= 0; i--) {
        let dots = true
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] !== ".") {
                dots = false
                break
            }
        }

        if (dots) {
            for (let k = 0; k < galaxies.length; k++) {
                if (galaxies[k][1] > i) {
                    galaxies[k][1] += 1000000 - 1
                }
            }
        }
    }

    for (let j = grid[0].length - 1; j >= 0; j--) {
        let dots = true;
        for (let i = 0; i < grid.length; i++) {
            if (grid[i][j] !== ".") {
                dots = false;
                break;
            }
        }

        if (dots) {
            for (let k = 0; k < galaxies.length; k++) {
                if (galaxies[k][0] > j) {
                    galaxies[k][0] += 1000000 - 1
                }
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


findShortestSum(values)