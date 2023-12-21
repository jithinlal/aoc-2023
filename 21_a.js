const fs = require('fs');

const input = fs.readFileSync('21.txt', 'utf8');

const values = input.split('\n')

let tiles = []
let x, y
for (let i = 0; i < values.length; i++) {
    tiles[i] = []
    for (let j = 0; j < values[i].length; j++) {
        if (values[i][j] === "S") {
            x = i
            y = j
        }
        tiles[i][j] = values[i][j]
    }
}

let steps = 64

let paths = 0

let cache = {}

findPaths(tiles, x, y, 0, cache)

Object.keys(cache).forEach(key => {
    if (key.includes(`-iteration-${steps}`)) {
        paths++
    }
})

console.log({paths})

function findPaths(tiles, x, y, iteration, cache) {
    if (steps < iteration) {
        return
    }

    if (x < 0 || x >= tiles.length) {
        return;
    }

    if (y < 0 || y >= tiles[0].length) {
        return
    }

    if (tiles[x][y] === "#") {
        return
    }

    if (cache[`${x}-${y}-iteration-${iteration}`]) {
        return
    }

    cache[`${x}-${y}-iteration-${iteration}`] = true

    findPaths(tiles, x + 1, y, iteration + 1, cache)
    findPaths(tiles, x, y + 1, iteration + 1, cache)
    findPaths(tiles, x - 1, y, iteration + 1, cache)
    findPaths(tiles, x, y - 1, iteration + 1, cache)
}