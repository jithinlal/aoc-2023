const fs = require('fs');

const input = fs.readFileSync('sample.txt', 'utf8');

function solve(input) {
    let part1 = process(parse(input))
    let part2 = process(parse(input, 1))
    return [part1, part2];
}

function parse(input, part) {
    const map = ["R", "D", "L", "U"];
    input = input.split("\n").map((l) => l.split(" "));
    if (part)
        return input.map(([, , c]) => [
            map[c[c.length - 2]],
            parseInt(c.slice(2, -2), 16),
        ]);
    return input.map(([a, b]) => [a, +b]);
}

function process(data) {
    const dirs = {U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1]};
    let r = 0
    let c = 0
    let area = 0
    let peri = 0
    let rp, cp


    for (let i = 0; i < data.length; i++) {
        const dir = dirs[data[i][0]];
        const dist = data[i][1];
        rp = r
        cp = c
        r += dir[0] * dist
        c += dir[1] * dist
        area += cp * r - c * rp
        peri += dist
    }
    return Math.abs(area / 2) + peri / 2 + 1;
}

console.log(solve(input))