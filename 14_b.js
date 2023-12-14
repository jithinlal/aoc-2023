const fs = require('fs');

const input = fs.readFileSync('14.txt', 'utf8');
const values = input.split('\n');

function findWeight(values) {
    for (let i = 0; i < values.length; i++) {
        values[i] = values[i].split('')
    }

    let billion = 1000000000
    let breakpoint = billion
    let seen = {}

    for (let k = 0; k < billion; k++) {
        cycle(values)

        if (breakpoint === billion) {
            let hash = values.map(l => l.join('')).join()

            if (seen[hash]) {
                let i = seen[hash]
                breakpoint = k + (billion - i) % (k - i) - 1
            } else {
                seen[hash] = k
            }
        }

        if (k === breakpoint) {
            break
        }
    }

    console.log({sum: sum(values)})

}

function cycle(values) {
    let lenI = values.length
    let lenJ = values[0].length

    for (let j = 0; j < lenJ; j++) {
        let blockI = -1
        let ongoing = 0
        for (let i = 0; i < lenI; i++) {
            switch (values[i][j]) {
                case ".":
                    continue
                case "#":
                    for (let x = 0; x < ongoing; x++) {
                        values[blockI + x + 1][j] = "O"
                    }
                    ongoing = 0
                    blockI = i
                    break
                case "O":
                    values[i][j] = "."
                    ongoing++
            }
        }
        for (let x = 0; x < ongoing; x++) {
            values[blockI + x + 1][j] = "O"
        }
    }

    for (let i = 0; i < lenI; i++) {
        let blockJ = -1
        let ongoing = 0
        for (let j = 0; j < lenJ; j++) {
            switch (values[i][j]) {
                case ".":
                    continue
                case "#":
                    for (let x = 0; x < ongoing; x++) {
                        values[i][blockJ + x + 1] = "O"
                    }
                    ongoing = 0
                    blockJ = j
                    break
                case "O":
                    values[i][j] = "."
                    ongoing++
            }
        }
        for (let x = 0; x < ongoing; x++) {
            values[i][blockJ + x + 1] = "O"
        }
    }

    for (let j = 0; j < lenJ; j++) {
        let blockI = lenI
        let ongoing = 0
        for (let i = lenI - 1; i >= 0; i--) {
            switch (values[i][j]) {
                case ".":
                    continue
                case "#":
                    for (let x = 0; x < ongoing; x++) {
                        values[blockI - x - 1][j] = "O"
                    }
                    ongoing = 0
                    blockI = i
                    break
                case "O":
                    values[i][j] = "."
                    ongoing++
            }
        }
        for (let x = 0; x < ongoing; x++) {
            values[blockI - x - 1][j] = "O"
        }
    }

    for (let i = 0; i < lenI; i++) {
        let blockJ = lenJ
        let ongoing = 0
        for (let j = lenJ - 1; j >= 0; j--) {
            switch (values[i][j]) {
                case ".":
                    continue
                case "#":
                    for (let x = 0; x < ongoing; x++) {
                        values[i][blockJ - x - 1] = "O"
                    }
                    ongoing = 0
                    blockJ = j
                    break
                case "O":
                    values[i][j] = "."
                    ongoing++
            }
        }
        for (let x = 0; x < ongoing; x++) {
            values[i][blockJ - x - 1] = "O"
        }
    }
}

function sum(values) {
    let sum = 0
    let x = values.length
    for (let i = 0; i < values.length; i++) {
        let count = 0
        for (let j = 0; j < values[i].length; j++) {
            if (values[i][j] === "O") {
                count++
            }
        }

        sum += count * (x - i)
    }

    return sum
}

findWeight(values)