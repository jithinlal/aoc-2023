const fs = require('fs');

const input = fs.readFileSync('sample.txt', 'utf8');

const values = input.split('\n')

let tiles = []
let sx, sy
let fx, fy
for (let i = 0; i < values.length; i++) {
    tiles[i] = []
    for (let j = 0; j < values[i].length; j++) {
        if (i === 0 && values[i][j] === ".") {
            sx = i
            sy = j
        }
        if (i === values.length - 1 && values[i][j] === ".") {
            fx = i
            fy = j
        }
        tiles[i][j] = values[i][j]
    }
}


let cache = {}
let arr = []

findPaths(tiles, sx, sy, fx, fy, cache, 0, arr)

function findPaths(tiles, sx, sy, fx, fy, cache, count, arr) {
    if (cache[`${sx}-${sy}`]) {
        return count
    }

    if (sx < 0 || sx >= tiles.length) {
        return count
    }

    if (sy < 0 || sy >= tiles[0].length) {
        return count
    }

    if (tiles[sx][sy] === "#") {
        return count
    }

    if (sx === fx && sy === fy) {
        return count
    }

    cache[`${sx}-${sy}`] = true

    if (tiles[sx][sy] === ">") {
        arr.push(findPaths(tiles, sx, sy + 1, fx, fy, cache, count + 1, arr))
    } else if (tiles[sx][sy] === "<") {
        arr.push(findPaths(tiles, sx, sy - 1, fx, fy, cache, count + 1, arr))
    } else if (tiles[sx][sy] === "v") {
        arr.push(findPaths(tiles, sx + 1, sy, fx, fy, cache, count + 1, arr))
    } else if (tiles[sx][sy] === "^") {
        arr.push(findPaths(tiles, sx - 1, sy, fx, fy, cache, count + 1, arr))
    }


    arr.push(findPaths(tiles, sx, sy + 1, fx, fy, cache, count + 1, arr))
    arr.push(findPaths(tiles, sx, sy - 1, fx, fy, cache, count + 1, arr))
    arr.push(findPaths(tiles, sx + 1, sy, fx, fy, cache, count + 1, arr))
    arr.push(findPaths(tiles, sx - 1, sy, fx, fy, cache, count + 1, arr))
}

console.log({arr: Math.max(...arr)})