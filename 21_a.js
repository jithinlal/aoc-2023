const fs = require('fs');

const input = fs.readFileSync('21.txt', 'utf8');

const values = input.split('\n')

function d23b(inp) {
    let isValid = (y, x) => !(y < 0 || y >= inp.length || x < 0 || x >= inp[0].length || inp[y][x] == '#');

    let nodes = ["0,1", (inp.length - 1) + "," + (inp[0].length - 2)];
    let nodedist = [];
    for (let i = 0; i < nodes.length; i++) {
        nodedist[i] = {};
        let node = nodes[i].split(",").map(x => (+x));
        let nav = (step, last, y, x) => { //dirs are ULDR
            if (!isValid(y, x)) return;

            let valids = 0;
            if (isValid(y - 1, x)) valids++;
            if (isValid(y + 1, x)) valids++;
            if (isValid(y, x - 1)) valids++;
            if (isValid(y, x + 1)) valids++;
            if (step > 0 && (valids > 2 || y < 1 || y >= inp.length - 1)) {
                if (!nodes.includes(y + "," + x)) nodes.push(y + "," + x);
                nodedist[i][nodes.indexOf(y + "," + x)] = step;
                return;
            }

            if (last != 2 && y > 0) nav(step + 1, 0, y - 1, x);
            if (last != 0 && y < inp.length - 1) nav(step + 1, 2, y + 1, x);
            if (last != 3) nav(step + 1, 1, y, x - 1);
            if (last != 1) nav(step + 1, 3, y, x + 1);
        }

        nav(0, -1, node[0], node[1]);
    }

    console.log(nodes, nodedist);

    let longestp = [];
    let longests = 0;
    let nav2 = (steps, node, prev) => {
        if (node == 1) {
            if (steps > longests) {
                longestp = prev;
                longests = steps;
            }
            return;
        }
        prev.push(node);
        for (let target in nodedist[node]) {
            if (prev.includes(+target)) continue;
            let nprev = [...prev];
            nav2(steps + nodedist[node][target], +target, nprev)
        }
    }
    nav2(0, 0, []);
    console.log(longestp, longests);
}

d23b(values)