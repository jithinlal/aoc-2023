const fs = require('fs');

const input = fs.readFileSync('14.txt', 'utf8');
const values = input.split('\n');

function findWeight(values) {
    for (let i = 0; i < values.length; i++) {
        values[i] = values[i].split('')
    }

    let colLen = values.length
    for (let i = 0; i < values[0].length; i++) {
        let x = 0
        let isDot = values[x][i] === "."

        for (let j = 1; j < colLen; j++) {
            if (isDot) {
                if (values[j][i] === "O") {
                    values[x][i] = values[j][i]
                    values[j][i] = "."
                    x++
                    isDot = values[x][i] === "."
                } else {
                    isDot = values[j][i] === "."
                }
            } else {
                x = j
                isDot = values[j][i] === "."
            }
        }
    }

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

    console.log({sum})

}

findWeight(values)