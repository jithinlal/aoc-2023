const fs = require('fs');
const file = fs.readFileSync("16.txt", 'utf8');
const lines = file.split(/\r?\n/);

function energize(map, first) {
    let beams = [first];
    const visited = {};

    while (beams.length !== 0) {
        let newBeams = [];
        for (let i = 0; i < beams.length; i++) {
            const beam = beams[i];
            const vkey = `${beam.pos.i}-${beam.pos.j}`;
            if (!visited[vkey]) {
                visited[vkey] = {};
            }
            visited[vkey][beam.dir] = true;
            const current = map[beam.pos.i] ? map[beam.pos.i][beam.pos.j] : null;
            const nextDirs = getNext(current, beam.dir);
            for (const dir of nextDirs) {
                const newBeam = {
                    pos: move(beam.pos, dir),
                    dir: dir,
                };
                if (!map[newBeam.pos.i] || !map[newBeam.pos.i][newBeam.pos.j]) {
                    continue;
                }
                const key = `${newBeam.pos.i}-${newBeam.pos.j}`;
                if (visited[key] && visited[key][dir]) {
                    continue;
                }
                newBeams.push(newBeam);
            }
        }
        beams = newBeams;
    }
    return Object.keys(visited).length;
}

const getNext = (current, dir) => {
    if (!current) {
        return [];
    }
    const map = {
        ".": {r: ["r"], l: ["l"], u: ["u"], d: ["d"]},
        "|": {r: ["u", "d"], l: ["u", "d"], u: ["u"], d: ["d"]},
        "-": {r: ["r"], l: ["l"], u: ["r", "l"], d: ["r", "l"]},
        "/": {r: ["u"], l: ["d"], u: ["r"], d: ["l"]},
        "\\": {r: ["d"], l: ["u"], u: ["l"], d: ["r"]},
    };
    return map[current][dir];
};

const move = (pos, dir) => {
    const result = {
        i: pos.i,
        j: pos.j,
    };
    if (dir === "r") {
        result.j += 1;
    }
    if (dir === "l") {
        result.j -= 1;
    }
    if (dir === "u") {
        result.i -= 1;
    }
    if (dir === "d") {
        result.i += 1;
    }
    return result;
};

function part1() {
    let board = [];
    for (let i = 0; i < lines.length; i++) {
        board.push([]);
        for (let j = 0; j < lines[i].length; j++) {
            board[i].push(lines[i][j]);
        }
    }

    const result = energize(board, {pos: {i: 0, j: 0}, dir: "r"});

    console.log({result})
}

const part2 = () => {
    let board = [];
    for (let i = 0; i < lines.length; i++) {
        board.push([]);
        for (let j = 0; j < lines[i].length; j++) {
            board[i].push(lines[i][j]);
        }
    }
    const firsts = [];
    for (let i = 0; i < board.length; i++) {
        firsts.push({pos: {i: i, j: 0}, dir: "r"});
        firsts.push({pos: {i: i, j: board[i].length - 1}, dir: "l"});
    }
    for (let j = 0; j < board[0].length; j++) {
        firsts.push({pos: {i: 0, j: j}, dir: "d"});
        firsts.push({pos: {i: board.length - 1, j: j}, dir: "u"});
    }
    let max = 0;
    for (const first of firsts) {
        let score = energize(board, first);
        if (score > max) {
            max = score;
        }
    }
    console.log({max})
};

part1()
part2()